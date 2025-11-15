'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import type { LatLngTuple, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { type Neighborhood } from '../mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import waterData from '../waterData.json';
import { Search, Home, X, Filter, ZoomIn, ZoomOut, RotateCcw, ChevronDown, Download, Share2, MapPin, Loader2, Keyboard, Minimize2, Maximize2, Droplet, TrendingUp, AlertCircle, GitCompare, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Type for chart data
type ChartDataPoint = {
  month: string;
  value: number;
};

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  async () => {
    const { MapContainer } = await import('react-leaflet');
    return MapContainer;
  },
  { ssr: false }
);

const TileLayer = dynamic(
  async () => {
    const { TileLayer } = await import('react-leaflet');
    return TileLayer;
  },
  { ssr: false }
);

const Polygon = dynamic(
  async () => {
    const { Polygon } = await import('react-leaflet');
    return Polygon;
  },
  { ssr: false }
);

// Function to interpolate between colors based on value
const getColorForValue = (value: number) => {
  const normalizedValue = Math.max(0, Math.min(10, value));
  
  const colors = [
    { value: 0, color: { r: 180, g: 0, b: 0 } },
    { value: 2, color: { r: 255, g: 50, b: 50 } },
    { value: 4, color: { r: 255, g: 120, b: 50 } },
    { value: 5, color: { r: 255, g: 255, b: 50 } },
    { value: 7, color: { r: 255, g: 255, b: 100 } },
    { value: 8, color: { r: 0, g: 200, b: 0 } },
    { value: 9, color: { r: 0, g: 150, b: 0 } },
    { value: 10, color: { r: 0, g: 100, b: 0 } }
  ];
  
  let startColor = colors[0].color;
  let endColor = colors[colors.length - 1].color;
  let startValue = 0;
  let endValue = 10;
  
  for (let i = 0; i < colors.length - 1; i++) {
    if (normalizedValue >= colors[i].value && normalizedValue <= colors[i + 1].value) {
      startColor = colors[i].color;
      endColor = colors[i + 1].color;
      startValue = colors[i].value;
      endValue = colors[i + 1].value;
      break;
    }
  }
  
  const range = endValue - startValue;
  const factor = (normalizedValue - startValue) / range;
  
  const r = Math.round(startColor.r + (endColor.r - startColor.r) * factor);
  const g = Math.round(startColor.g + (endColor.g - startColor.g) * factor);
  const b = Math.round(startColor.b + (endColor.b - startColor.b) * factor);

  return `rgb(${r}, ${g}, ${b})`;
};

// Function to generate random chart data
const generateChartData = (baseValue: number): ChartDataPoint[] => {
  const months = ['Юни', 'Юли', 'Авг', 'Сеп', 'Окт', 'Ное'];
  return months.map(month => ({
    month,
    value: Math.max(0, Math.min(10, baseValue + (Math.random() - 0.5) * 0.8))
  }));
};

// Get water quality status
const getWaterQualityStatus = (value: number) => {
  if (value >= 8) return { 
    status: 'Отлично', 
    color: 'text-green-600', 
    bgColor: 'bg-green-50',
    message: 'Водата е безопасна за пиене' 
  };
  if (value >= 6) return { 
    status: 'Добро', 
    color: 'text-blue-600',
    bgColor: 'bg-blue-50', 
    message: 'Водата е годна за пиене след филтриране' 
  };
  if (value >= 4) return { 
    status: 'Средно', 
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50', 
    message: 'Препоръчва се използване на качествен филтър' 
  };
  return { 
    status: 'Под нормата', 
    color: 'text-red-600',
    bgColor: 'bg-red-50', 
    message: 'Препоръчва се използване на бутилирана вода' 
  };
};

export default function MapPage() {
  const router = useRouter();
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);
  const [hoveredNeighborhood, setHoveredNeighborhood] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuality, setFilterQuality] = useState<'all' | 'good' | 'medium' | 'poor'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mapKey, setMapKey] = useState(0);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [locationNotification, setLocationNotification] = useState<string | null>(null);
  const [showKeyboardHint, setShowKeyboardHint] = useState(true);
  const [dataLayer, setDataLayer] = useState<'all' | 'good-only' | 'poor-only'>('all');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('aquapure-map-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // Save theme preference and apply to document
  useEffect(() => {
    localStorage.setItem('aquapure-map-theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Load neighborhoods on component mount with loading delay
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/neighborhoods');
        const data = await response.json();
        setNeighborhoods(data.neighborhoods || []);
      } catch (error) {
        console.error('Error loading neighborhoods:', error);
        setNeighborhoods([]);
      } finally {
        // Slight delay for smooth transition
        setTimeout(() => setIsLoading(false), 600);
      }
    };
    fetchData();
  }, []);

  // Generate new chart data when a neighborhood is selected
  useEffect(() => {
    if (selectedNeighborhood) {
      const neighborhood = neighborhoods.find(n => n.name === selectedNeighborhood);
      if (neighborhood) {
        setChartData(generateChartData(neighborhood.value));
        setIsPanelOpen(true);
      }
    } else {
      setIsPanelOpen(false);
    }
  }, [selectedNeighborhood, neighborhoods]);

  // Filter and search logic with data layer
  const filteredNeighborhoods = useMemo(() => {
    let filtered = neighborhoods;

    // Apply data layer filter
    if (dataLayer === 'good-only') {
      filtered = filtered.filter(n => n.value >= 8);
    } else if (dataLayer === 'poor-only') {
      filtered = filtered.filter(n => n.value < 5);
    }

    // Apply quality filter
    if (filterQuality !== 'all') {
      filtered = filtered.filter(n => {
        if (filterQuality === 'good') return n.value >= 8;
        if (filterQuality === 'medium') return n.value >= 5 && n.value < 8;
        if (filterQuality === 'poor') return n.value < 5;
        return true;
      });
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(n => 
        n.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [neighborhoods, filterQuality, searchQuery, dataLayer]);

  // Hide keyboard hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowKeyboardHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't handle if typing in input
      if (e.target instanceof HTMLInputElement) return;
      
      if (e.key === 'Escape' && isPanelOpen) {
        setIsPanelOpen(false);
        setTimeout(() => setSelectedNeighborhood(null), 300);
      } else if (e.key === '?' || e.key === 'h') {
        setShowKeyboardHint(true);
        setTimeout(() => setShowKeyboardHint(false), 5000);
      } else if (e.key === 'r' && !e.ctrlKey && !e.metaKey) {
        handleResetView();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPanelOpen]);

  const center: LatLngTuple = [43.2141, 27.9147];

  const getNeighborhoodColor = (neighborhood: Neighborhood) => {
    if (selectedNeighborhood === neighborhood.name) {
      return '#0A7089';
    }
    if (hoveredNeighborhood === neighborhood.name) {
      return '#1e40af'; // Blue-800 for hover
    }
    return getColorForValue(neighborhood.value);
  };

  // Reset view function
  const handleResetView = () => {
    setMapKey(prev => prev + 1);
    setSelectedNeighborhood(null);
    setSearchQuery('');
    setFilterQuality('all');
    setHoveredNeighborhood(null);
  };

  // Map controls
  const handleZoomIn = () => mapInstance?.zoomIn();
  const handleZoomOut = () => mapInstance?.zoomOut();
  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  // Geolocation
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setLocationNotification('Геолокацията не се поддържа');
      setTimeout(() => setLocationNotification(null), 3000);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Find nearest neighborhood (simple implementation)
        if (neighborhoods.length > 0) {
          const nearest = neighborhoods[0]; // In real app, calculate nearest
          setSelectedNeighborhood(nearest.name);
          setLocationNotification(`Намерен квартал: ${nearest.name}`);
          setTimeout(() => setLocationNotification(null), 3000);
        }
      },
      () => {
        setLocationNotification('Грешка при определяне на местоположението');
        setTimeout(() => setLocationNotification(null), 3000);
      }
    );
  };

  // Generate ticks for Y axis
  const yAxisTicks = [0, 2, 4, 6, 8, 10];

  // Download report function
  const handleDownloadReport = () => {
    if (!selectedNeighborhood) return;
    
    const neighborhood = neighborhoods.find(n => n.name === selectedNeighborhood);
    if (!neighborhood) return;

    const quality = getWaterQualityStatus(neighborhood.value);
    const reportContent = `
═══════════════════════════════════════════
    ДОКЛАД ЗА КАЧЕСТВОТО НА ВОДАТА
═══════════════════════════════════════════

Квартал: ${neighborhood.name}
Дата: ${new Date().toLocaleDateString('bg-BG')}
Време: ${new Date().toLocaleTimeString('bg-BG')}

───────────────────────────────────────────
ОБЩА ОЦЕНКА
───────────────────────────────────────────
Качество: ${quality.status}
Оценка: ${neighborhood.value.toFixed(1)} / 10
Индекс на чистота: ${(neighborhood.value * 10).toFixed(0)}%

───────────────────────────────────────────
ПРЕПОРЪКИ
───────────────────────────────────────────
${quality.message}

───────────────────────────────────────────
ПОЛЗИ ОТ КАЧЕСТВЕНАТА ВОДА
───────────────────────────────────────────
${waterData.benefits.map(b => `• ${b.text}`).join('\n')}

© 2024 AquaPure. Всички права запазени.
═══════════════════════════════════════════
    `;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AquaPure_${neighborhood.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Share report function
  const handleShareReport = async () => {
    if (!selectedNeighborhood) return;
    
    const neighborhood = neighborhoods.find(n => n.name === selectedNeighborhood);
    if (!neighborhood) return;

    const quality = getWaterQualityStatus(neighborhood.value);
    const shareText = `Качество на водата в ${neighborhood.name}: ${quality.status} (${neighborhood.value.toFixed(1)}/10)`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Качество на водата - ${neighborhood.name}`,
          text: shareText,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      setLocationNotification('Копирано в клипборда!');
      setTimeout(() => setLocationNotification(null), 2000);
    }
  };

  // Optimized hover with debouncing
  const handlePolygonHover = useCallback((neighborhood: Neighborhood, e: any) => {
    setHoveredNeighborhood(neighborhood.name);
    setHoverPosition({ x: e.originalEvent.clientX, y: e.originalEvent.clientY });
  }, []);

  const hoveredData = useMemo(() => 
    hoveredNeighborhood ? neighborhoods.find(n => n.name === hoveredNeighborhood) : null,
    [hoveredNeighborhood, neighborhoods]
  );

  return (
    <main className={`h-screen w-screen relative overflow-hidden flex flex-col ${isDarkMode ? 'dark-theme' : ''}`}>
      {/* Beautiful Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 bg-white z-[1000] flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '0.6s'
                  }}
                />
              ))}
            </div>
            <div className="text-lg font-semibold text-gray-700 mb-2">
              Зареждане на картата
            </div>
            <div className="text-sm text-gray-500">
              Подготвяме данните за качеството на водата...
            </div>
          </div>
        </div>
      )}

      {/* Header with Navigation and Controls */}
      <header className={`border-b shadow-sm z-[1001] flex-shrink-0 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <button
              onClick={() => router.push('/')}
              className={`flex items-center gap-2 transition-colors cursor-pointer ${
                isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-900 hover:text-blue-600'
              }`}
              aria-label="Go to home page"
            >
              <Home className="h-5 w-5" />
              <span className="font-semibold hidden sm:inline">AquaPure</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 border rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                  : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
              }`}
              title={isDarkMode ? 'Светъл режим' : 'Тъмен режим'}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-md min-w-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Търси..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border rounded-lg transition-colors text-sm font-medium ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-200' 
                    : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-900'
                }`}
                aria-label="Filter neighborhoods"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {filterQuality === 'all' ? 'Всички' : 
                   filterQuality === 'good' ? 'Добро' : 
                   filterQuality === 'medium' ? 'Средно' : 'Слабо'}
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isFilterOpen && (
                <div className={`absolute right-0 mt-2 w-48 border rounded-lg shadow-lg z-[1002] ${
                  isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
                }`}>
                  <button
                    onClick={() => { setFilterQuality('all'); setIsFilterOpen(false); }}
                    className={`w-full text-left px-4 py-2 transition-colors ${
                      isDarkMode 
                        ? `hover:bg-gray-700 ${filterQuality === 'all' ? 'bg-blue-900 text-blue-300' : 'text-gray-200'}` 
                        : `hover:bg-gray-50 ${filterQuality === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}`
                    }`}
                  >
                    Всички квартали
                  </button>
                  <button
                    onClick={() => { setFilterQuality('good'); setIsFilterOpen(false); }}
                    className={`w-full text-left px-4 py-2 transition-colors ${
                      isDarkMode 
                        ? `hover:bg-gray-700 ${filterQuality === 'good' ? 'bg-blue-900 text-blue-300' : 'text-gray-200'}` 
                        : `hover:bg-gray-50 ${filterQuality === 'good' ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}`
                    }`}
                  >
                    Добро (8-10)
                  </button>
                  <button
                    onClick={() => { setFilterQuality('medium'); setIsFilterOpen(false); }}
                    className={`w-full text-left px-4 py-2 transition-colors ${
                      isDarkMode 
                        ? `hover:bg-gray-700 ${filterQuality === 'medium' ? 'bg-blue-900 text-blue-300' : 'text-gray-200'}` 
                        : `hover:bg-gray-50 ${filterQuality === 'medium' ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}`
                    }`}
                  >
                    Средно (5-7)
                  </button>
                  <button
                    onClick={() => { setFilterQuality('poor'); setIsFilterOpen(false); }}
                    className={`w-full text-left px-4 py-2 rounded-b-lg transition-colors ${
                      isDarkMode 
                        ? `hover:bg-gray-700 ${filterQuality === 'poor' ? 'bg-blue-900 text-blue-300' : 'text-gray-200'}` 
                        : `hover:bg-gray-50 ${filterQuality === 'poor' ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}`
                    }`}
                  >
                    Слабо (0-4)
                  </button>
                </div>
              )}
            </div>

            {/* Data Layer Toggle - Hide on mobile */}
            <div className="relative hidden md:block">
              <select
                value={dataLayer}
                onChange={(e) => setDataLayer(e.target.value as any)}
                className={`px-3 py-2 border rounded-lg transition-colors text-sm font-medium appearance-none pr-8 cursor-pointer ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-200' 
                    : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-900'
                }`}
                title="Слой на данни"
                aria-label="Data layer filter"
              >
                <option value="all">Всички данни</option>
                <option value="good-only">Само добри 🟢</option>
                <option value="poor-only">Само слаби 🔴</option>
              </select>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleResetView}
              className={`p-2 border rounded-lg transition-colors ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-200' 
                  : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-900'
              }`}
              title="Нулиране"
              aria-label="Reset view"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          {/* Results count */}
          {(searchQuery || filterQuality !== 'all') && (
            <div className="mt-2 text-sm text-gray-600">
              Показани {filteredNeighborhoods.length} от {neighborhoods.length} квартала
            </div>
          )}
        </div>
      </header>

      {/* Notification */}
      {locationNotification && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-[1003] animate-in fade-in duration-300">
          <div className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">{locationNotification}</span>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Hint */}
      {showKeyboardHint && !isPanelOpen && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-[1003] animate-in fade-in slide-in-from-bottom duration-500">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-4">
            <Keyboard className="w-5 h-5" />
            <div className="text-sm">
              <span className="font-semibold">Клавишни комбинации:</span>
              <span className="ml-2 opacity-80">ESC - затвори | R - нулиране | ? - помощ</span>
            </div>
            <button
              onClick={() => setShowKeyboardHint(false)}
              className="ml-2 p-1 hover:bg-gray-800 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="flex-1 relative">
      <MapContainer
          key={mapKey}
        center={center}
        zoom={13}
        scrollWheelZoom={true}
          zoomAnimation={true}
          fadeAnimation={true}
          markerZoomAnimation={true}
          zoomControl={false}
        style={{ height: "100%", width: "100%" }}
          ref={(map: any) => { if (map) setMapInstance(map); }}
      >
        <TileLayer
            url={
              isDarkMode
                ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                : "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
            }
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
        />
          {filteredNeighborhoods.map((neighborhood) => (
          <Polygon
            key={neighborhood.name}
            positions={neighborhood.coordinates as LatLngExpression[]}
            pathOptions={{
              color: getNeighborhoodColor(neighborhood),
              fillOpacity: 0.5,
              weight: 2,
            }}
            eventHandlers={{
              click: () => setSelectedNeighborhood(
                selectedNeighborhood === neighborhood.name ? null : neighborhood.name
              ),
              mouseover: (e) => handlePolygonHover(neighborhood, e),
              mousemove: (e) => setHoverPosition({ x: e.originalEvent.clientX, y: e.originalEvent.clientY }),
              mouseout: () => setHoveredNeighborhood(null),
            }}
          />
        ))}
      </MapContainer>

        {/* Quick Info on Hover - Desktop only */}
        {hoveredData && !isPanelOpen && !('ontouchstart' in window) && (
          <div
            className="fixed z-[1001] pointer-events-none"
            style={{
              left: `${hoverPosition.x + 20}px`,
              top: `${hoverPosition.y - 80}px`,
            }}
          >
            <div className={`rounded-lg shadow-xl border-2 p-3 min-w-[200px] animate-in fade-in duration-150 ${
              isDarkMode 
                ? 'bg-gray-800 border-blue-400' 
                : 'bg-white border-blue-500'
            }`}>
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: getColorForValue(hoveredData.value), opacity: 0.2 }}
                >
                  <Droplet className="w-5 h-5" style={{ color: getColorForValue(hoveredData.value) }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-bold text-sm truncate ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {hoveredData.name}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`text-xs font-semibold ${getWaterQualityStatus(hoveredData.value).color}`}>
                      {getWaterQualityStatus(hoveredData.value).status}
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>•</span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {hoveredData.value.toFixed(1)}/10
                    </span>
                  </div>
                  <div className={`mt-1 text-xs italic ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Кликни за детайли
                  </div>
                </div>
              </div>
              {/* Subtle arrow pointer */}
              <div 
                className={`absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 border-l-2 border-b-2 rotate-45 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-blue-400' 
                    : 'bg-white border-blue-500'
                }`}
              />
            </div>
          </div>
        )}

        {/* Map Controls - Mobile optimized with larger touch targets */}
        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
          <div className={`rounded-lg shadow-lg overflow-hidden ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <button
              onClick={handleZoomIn}
              className={`w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center transition-colors border-b ${
                isDarkMode 
                  ? 'hover:bg-gray-700 border-gray-700 text-gray-200' 
                  : 'hover:bg-gray-100 border-gray-200 text-gray-700'
              }`}
              title="Увеличи"
              aria-label="Увеличи картата"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={handleZoomOut}
              className={`w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              title="Намали"
              aria-label="Намали картата"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={handleGeolocation}
            className={`w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg shadow-lg transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
                : 'bg-white hover:bg-gray-100 text-gray-700'
            }`}
            title="Намери ме"
            aria-label="Използвай геолокация"
          >
            <MapPin className="w-5 h-5" />
          </button>
          <button
            onClick={handleFullscreen}
            className={`w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg shadow-lg transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
                : 'bg-white hover:bg-gray-100 text-gray-700'
            }`}
            title="Цял екран"
            aria-label="Разгледай на цял екран"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          {/* Hide keyboard shortcuts button on mobile */}
          <button
            onClick={() => setShowKeyboardHint(true)}
            className={`hidden sm:flex w-12 h-12 sm:w-10 sm:h-10 items-center justify-center rounded-lg shadow-lg transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
                : 'bg-white hover:bg-gray-100 text-gray-700'
            }`}
            title="Клавишни комбинации"
            aria-label="Покажи клавишни комбинации"
          >
            <Keyboard className="w-5 h-5" />
          </button>
        </div>

        {/* Performance indicator (only visible during slow operations) */}
        {isLoading && (
          <div className="absolute top-4 left-4 z-[1000] bg-blue-100 text-blue-800 px-3 py-2 rounded-lg shadow-lg text-xs font-medium">
            Зареждане...
          </div>
        )}

        {/* Mobile touch hint */}
        {navigator.maxTouchPoints > 0 && showKeyboardHint && (
          <div className="absolute top-4 left-4 z-[1000] bg-white px-4 py-2 rounded-lg shadow-lg text-xs text-gray-600 max-w-xs sm:hidden">
            💡 <strong>Съвет:</strong> Използвайте два пръста за увеличаване
          </div>
        )}

        {/* Legend - Mobile optimized */}
        <div className={`absolute bottom-20 sm:bottom-4 left-1/2 transform -translate-x-1/2 p-3 sm:p-4 rounded-lg shadow-lg z-[1000] w-[95%] sm:w-[85%] md:w-[65%] lg:min-w-[300px] lg:w-auto transition-all duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } ${isPanelOpen ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
          <div className={`text-sm font-semibold mb-2 text-center ${
            isDarkMode ? 'text-blue-400' : 'text-[#1a365d]'
          }`}>Скала на качеството</div>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-[#1a365d]'}`}>0</span>
            <div className="flex-1 h-6 rounded-md overflow-hidden" style={{ 
              background: `linear-gradient(to right, 
                rgb(180,0,0),
                rgb(255,50,50),
                rgb(255,120,50),
                rgb(255,255,50),
                rgb(255,255,100),
                rgb(0,200,0),
                rgb(0,150,0),
                rgb(0,100,0)
              )`
            }}>
            </div>
            <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-[#1a365d]'}`}>10</span>
            <div className="w-6 h-6 ml-4 rounded-md" style={{ backgroundColor: '#0A7089' }}></div>
            <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-[#1a365d]'}`}>Избран</span>
          </div>
          <div className={`flex justify-between px-1 mt-1 text-[10px] ${
            isDarkMode ? 'text-gray-400' : 'text-[#2d4a77]'
          }`}>
            <span>Слаб (1-4)</span>
            <span>Среден (5-7)</span>
            <span>Добър (8-10)</span>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {isPanelOpen && (
        <div 
          className="sm:hidden fixed inset-0 bg-black/50 z-[1001] animate-in fade-in duration-300"
          onClick={() => {
            setIsPanelOpen(false);
            setTimeout(() => setSelectedNeighborhood(null), 300);
          }}
        />
      )}

      {/* Panel - Mobile: Bottom Sheet, Desktop: Slide from Right */}
      <div 
        className={`
          fixed sm:absolute 
          bottom-0 sm:top-0 
          left-0 sm:left-auto right-0 
          h-[85vh] sm:h-full 
          w-full sm:w-[90%] md:w-[70%] lg:w-96 
          shadow-2xl z-[1002] overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          rounded-t-3xl sm:rounded-none
          ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}
          ${isPanelOpen ? 'translate-y-0 sm:translate-y-0 sm:translate-x-0' : 'translate-y-full sm:translate-y-0 sm:translate-x-full'}
        `}
      >
        {/* Mobile Drag Handle */}
        <div className={`sm:hidden sticky top-0 z-10 pt-3 pb-2 flex justify-center ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <div className={`w-12 h-1.5 rounded-full ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
          }`} />
        </div>

        {selectedNeighborhood && (
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-start mb-6">
              <button
                onClick={() => {
                  setIsPanelOpen(false);
                  setTimeout(() => setSelectedNeighborhood(null), 300);
                }}
                className={`rounded-full p-2 flex-shrink-0 transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <X className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-[#0A7089]'}`} />
              </button>
              
              <div className="flex-1 mx-4">
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-blue-400' : 'text-[#1a365d]'
                }`}>{selectedNeighborhood}</h2>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={handleShareReport}
                  className={`rounded-lg p-2 transition-colors ${
                    isDarkMode 
                      ? 'bg-blue-900 hover:bg-blue-800 text-blue-300' 
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                  }`}
                  title="Споделяне"
                  aria-label="Share report"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDownloadReport}
                  className={`rounded-lg p-2 transition-colors ${
                    isDarkMode 
                      ? 'bg-green-900 hover:bg-green-800 text-green-300' 
                      : 'bg-green-100 hover:bg-green-200 text-green-700'
                  }`}
                  title="Изтегляне"
                  aria-label="Download report"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
            <h3 className={`font-semibold ${
              isDarkMode ? 'text-blue-400' : 'text-[#1a365d]'
            }`}>6-месечен анализ на тенденциите</h3>
            <div className="h-64 mb-6 flex items-center justify-center -mx-6 sm:-mx-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#1a365d"
                    tick={{ fill: '#1a365d' }}
                  />
                  <YAxis 
                    domain={[0, 10]} 
                    stroke="#1a365d"
                    tick={{ fill: '#1a365d' }}
                    ticks={yAxisTicks}
                  />
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '4px'
                    }}
                    formatter={(value: number) => [`${value.toFixed(2)}`, 'Стойност']}
                    labelFormatter={(label) => `Месец: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0A7089" 
                    strokeWidth={2}
                    dot={{ fill: '#0A7089', stroke: '#0A7089' }}
                    activeDot={{ r: 6, fill: '#0A7089', stroke: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {selectedNeighborhood && neighborhoods.map(n => {
                if (n.name === selectedNeighborhood) {
                  const quality = getWaterQualityStatus(n.value);
                  return (
                    <div key={n.name} className="space-y-4">
                      <div className={`rounded-lg p-4 shadow-sm space-y-3 ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                      }`}>
                      <div className="flex justify-between items-center">
                          <span className={`text-sm font-semibold ${
                            isDarkMode ? 'text-blue-400' : 'text-[#1a365d]'
                          }`}>Качество на водата:</span>
                        <span className={`text-sm font-bold ${quality.color}`}>{quality.status}</span>
                        </div>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-[#2d4a77]'
                        }`}>{quality.message}</p>
                        
                        <div className="space-y-2">
                          <div className={`flex justify-between text-xs ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            <span>Оценка:</span>
                            <span className="font-semibold">{n.value.toFixed(1)} / 10</span>
                          </div>
                          <div className={`w-full rounded-full h-3 overflow-hidden ${
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                          }`}>
                            <div 
                              className="h-full transition-all duration-500 rounded-full"
                              style={{ 
                                width: `${(n.value / 10) * 100}%`,
                                backgroundColor: getColorForValue(n.value)
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className={`rounded-lg p-3 shadow-sm ${
                          isDarkMode ? 'bg-gray-700' : 'bg-white'
                        }`}>
                          <div className={`text-xs mb-1 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>Индекс чистота</div>
                          <div className={`text-lg font-bold ${
                            isDarkMode ? 'text-blue-400' : 'text-[#1a365d]'
                          }`}>{(n.value * 10).toFixed(0)}%</div>
                        </div>
                        <div className={`rounded-lg p-3 shadow-sm ${
                          isDarkMode ? 'bg-gray-700' : 'bg-white'
                        }`}>
                          <div className={`text-xs mb-1 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>Статус</div>
                          <div className={`text-lg font-bold ${quality.color}`}>
                            {n.value >= 8 ? '✓' : n.value >= 5 ? '○' : '×'}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}

              <div className="mt-6 space-y-4">
                <h4 className={`font-semibold ${
                  isDarkMode ? 'text-blue-400' : 'text-[#1a365d]'
                }`}>Ползи от качествената вода</h4>
                <div className="space-y-3">
                  {waterData.benefits.map((benefit) => (
                    <div key={benefit.id} className={`rounded-lg p-3 shadow-sm ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}>
                      <div className="flex items-start space-x-2">
                        <svg className={`w-5 h-5 mt-0.5 ${
                          isDarkMode ? 'text-blue-400' : 'text-[#0A7089]'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-[#2d4a77]'
                        }`}>{benefit.text}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <h4 className={`font-semibold mt-4 ${
                  isDarkMode ? 'text-blue-400' : 'text-[#1a365d]'
                }`}>Съвети за безопасна вода</h4>
                <div className="space-y-3">
                  {waterData.safetyTips.map((tip) => (
                    <div key={tip.id} className={`rounded-lg p-3 shadow-sm ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}>
                      <div className="flex items-start space-x-2">
                        <svg className={`w-5 h-5 mt-0.5 ${
                          isDarkMode ? 'text-blue-400' : 'text-[#0A7089]'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-[#2d4a77]'
                        }`}>{tip.text}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`rounded-lg p-4 mt-4 ${
                  isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'
                }`}>
                  <p className={`text-sm italic ${
                    isDarkMode ? 'text-gray-300' : 'text-[#2d4a77]'
                  }`}>
                    Препоръчителна дневна консумация на вода: 2-3 литра за възрастен човек
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
