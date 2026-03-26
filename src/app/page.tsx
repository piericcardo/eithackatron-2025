'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, 
  Shield, 
  Leaf, 
  Truck, 
  Star, 
  CheckCircle, 
  Award, 
  Clock, 
  Heart, 
  Recycle,
  Zap,
  Sparkles,
  Menu,
  X,
  Beaker,
  Ban,
  Waves,
  Container
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AnimatedComponent } from "@/components/ui/animated-component";
import { ScrollingLogos } from "@/components/ui/scrolling-logos";
import { CursorWaterEffect } from "@/components/ui/cursor-water-effect";
import { AnimatedArrow } from "@/components/ui/animated-arrow";
import { useState } from "react";

export default function WaterCompanyLanding() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#products", label: "Продукти", icon: <Star className="h-5 w-5" /> },
    { href: "#about", label: "За нас", icon: <Heart className="h-5 w-5" /> },
    { href: "#delivery", label: "Доставка", icon: <Truck className="h-5 w-5" /> },
    { href: "#water-quality", label: "Проверка на Водата", icon: <Shield className="h-5 w-5" /> }
  ];

  // Partner/Supporter logos
  const partnerLogos = [
    { name: "Partner 1", image: "/logo (1).svg" },
    { name: "Partner 2", image: "/logo (2).svg" },
    { name: "Partner 3", image: "/logo (3).svg" },
    { name: "Partner 4", image: "/logo (4).svg" },
    { name: "Partner 5", image: "/logo (5).svg" },
    { name: "Partner 6", image: "/logo (6).svg" },
    { name: "Partner 7", image: "/logo (7).svg" },
    { name: "Partner 8", image: "/logo (8).svg" },
    { name: "Partner 9", image: "/logo (9).svg" },
    { name: "Partner 10", image: "/logo (10).svg" },
    { name: "Partner 11", image: "/logo (11).svg" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Cursor Water Effect */}
      <CursorWaterEffect />
      
      {/* Header */}
      <AnimatedComponent delay={0.2}>
        <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center justify-center gap-2">
                <Droplets className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-blue-900">AquaPure</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex gap-4 sm:gap-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="text-sm font-medium hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-10 w-10 text-blue-900 hover:bg-blue-50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
              <div className="md:hidden absolute left-0 right-0 top-[64px] bg-white border-b shadow-lg animate-in slide-in-from-top duration-300">
                <nav className="container mx-auto max-w-7xl">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 text-lg font-medium hover:text-blue-600 hover:bg-blue-50 transition-colors py-4 px-4 border-b border-gray-100 last:border-none"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </header>
      </AnimatedComponent>

      <main className="flex-1">
        {/* Hero Section - Benefits Focused */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <AnimatedComponent delay={0.4}>
                <div className="flex flex-col justify-center space-y-6">
                  <div className="space-y-4">
                    <Badge className="bg-blue-600 text-white hover:bg-blue-700 text-sm px-4 py-1">
                      Технология с Активирана Алумина
                    </Badge>
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-900">
                      Вода без Флуорид и Микропластмаси
                    </h1>
                    <p className="max-w-[600px] text-gray-700 md:text-xl leading-relaxed">
                      Премиум вода, филтрирана с <strong>активирана алумина</strong> за ефективно намаляване на флуорид. 
                      Съхранена в <strong>стъклени бутилки</strong> за минимален риск от микропластмаси и чист вкус във всяка глътка.
                    </p>
                  </div>

                  {/* Key Benefits Grid */}
                  <div className="grid grid-cols-2 gap-3 py-4">
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-green-100 p-2">
                        <Ban className="h-4 w-4 text-green-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">Без Флуорид</p>
                        <p className="text-xs text-gray-600">100% елиминиран</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-100 p-2">
                        <Shield className="h-4 w-4 text-blue-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">Без Микропластмаси</p>
                        <p className="text-xs text-gray-600">Стъклени бутилки</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-purple-100 p-2">
                        <Beaker className="h-4 w-4 text-purple-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">Минерален Баланс</p>
                        <p className="text-xs text-gray-600">Естествен състав</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-cyan-100 p-2">
                        <Waves className="h-4 w-4 text-cyan-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">Активирана Алумина</p>
                        <p className="text-xs text-gray-600">Селективна филтрация</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button 
                      size="lg" 
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all text-base px-8"
                      onClick={() => window.location.href = '#products'}
                    >
                      <Container className="h-5 w-5 mr-2" />
                      Виж Продуктите
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 bg-white text-base px-8"
                      onClick={() => window.location.href = '/map'}
                    >
                      <Shield className="h-5 w-5 mr-2" />
                      Провери Водата
                    </Button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Безплатна Доставка</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Научно Тествана</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Еко Опаковка</span>
                    </div>
                  </div>
                </div>
              </AnimatedComponent>
              <AnimatedComponent delay={0.6}>
                <div className="flex items-center justify-center">
                  <Image
                    src="/AquaPureImg.png"
                    width="500"
                    height="600"
                    alt="Премиум бутилки с вода"
                    unoptimized
                    className="mx-auto aspect-[5/6] overflow-hidden rounded-xl object-cover"
                  />
                </div>
              </AnimatedComponent>
            </div>
          </div>
        </section>

        {/* Partner Logos Section */}
        <section className="w-full py-8 bg-white border-y border-gray-100">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <AnimatedComponent>
              <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
                Доверени от водещи организации
              </p>
            </AnimatedComponent>
          </div>
          <ScrollingLogos logos={partnerLogos} />
        </section>

        {/* How It Works Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            {/* Section Header */}
            <AnimatedComponent>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
                  Как Работи Нашата Технология
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Научно доказан процес за най-чиста и здравословна вода
                </p>
              </div>
            </AnimatedComponent>

            {/* Row 1: Microplastics (Text Left, Image Right) */}
            <div className="relative mb-20 lg:mb-32">
              {/* Animated Arrow */}
              <AnimatedArrow direction="right" className="pointer-events-none" />

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Text Content */}
                <AnimatedComponent delay={0.2}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-blue-900 mb-6">
                        🚫 Микропластмаси
                      </h3>
                      
                      <div className="mb-6">
                        <h4 className="text-xl font-semibold text-red-700 mb-3">
                          Опасностите от Микропластмасите
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>Пластмасовите бутилки отделят микроскопични частици в водата при топлина и светлина</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>Микропластмасите се натрупват в човешкото тяло и могат да причинят хормонални нарушения</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>Научни изследвания свързват микропластмасите с възпаления и имунни проблеми</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-semibold text-green-700 mb-3">
                          Предимствата на Вода без Микропластмаси
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>Стъклените бутилки са химически инертни и не отделят нежелани частици във водата</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>Защитава хормоналната система и общото здраве</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>Еко-съобразно решение - стъклото е многократно използваемо и напълно рециклируемо</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AnimatedComponent>

                {/* Image */}
                <AnimatedComponent delay={0.4} direction="right">
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center p-4">
                      <Image
                        src="/43591_2022_26_Fig1_HTML.png"
                        alt="Диаграма на замърсяване с микропластмаси"
                        width={1200}
                        height={800}
                        quality={95}
                        className="w-full h-auto object-contain"
                        priority
                      />
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-3 font-medium">Диаграма на замърсяване с микропластмаси</p>
                  </div>
                </AnimatedComponent>
              </div>
            </div>

            {/* Row 2: Fluoride (Image Left, Text Right) */}
            <div className="relative mb-20 lg:mb-32">
              {/* Animated Arrow */}
              <AnimatedArrow direction="left" className="pointer-events-none" />

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Image */}
                <AnimatedComponent delay={0.2} direction="left" className="lg:order-1">
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center p-4">
                      <Image
                        src="/unnamed.jpg"
                        alt="Химична структура на флуорида"
                        width={3200}
                        height={3200}
                        quality={100}
                        unoptimized
                        className="w-full h-full object-contain"
                        style={{
                          imageRendering: '-webkit-optimize-contrast',
                          WebkitFontSmoothing: 'antialiased',
                          transform: 'translateZ(0)',
                          willChange: 'transform'
                        }}
                      />
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-3 font-medium">Химична структура на флуорида</p>
                  </div>
                </AnimatedComponent>

                {/* Text Content */}
                <AnimatedComponent delay={0.4} className="lg:order-2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-blue-900 mb-6">
                        ⚠️ Флуорид
                      </h3>
                      
                      <div className="mb-6">
                        <h4 className="text-xl font-semibold text-red-700 mb-3">
                          Защо Флуоридът е Проблем
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>Флуоридът в питейната вода може да се натрупва в организма с годините</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>Свързан е с проблеми в щитовидната жлеза и неврологично развитие</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>Прекомерното количество може да причини флуороза на зъбите и костите</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-semibold text-green-700 mb-3">
                          Ползите от Вода без Флуорид
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>Филтрацията с активирана алумина е специализирана за понижаване на флуорида</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>Подкрепя здравословната функция на щитовидната жлеза</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>Чиста, безопасна вода без натрупване на токсини</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AnimatedComponent>
              </div>
            </div>

            {/* Row 3: Essential Minerals (Text Left, Image Right) */}
            <div className="relative mb-20 lg:mb-32">
              {/* Animated Arrow */}
              <AnimatedArrow direction="right" className="pointer-events-none" />

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Text Content */}
                <AnimatedComponent delay={0.2}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-blue-900 mb-6">
                        💎 Минерален Баланс
                      </h3>
                      
                      <div className="mb-6">
                        <h4 className="text-xl font-semibold text-red-700 mb-3">
                          Защо Минералният Баланс е Важен
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>Водата с небалансиран състав може да не осигурява оптимална ежедневна хидратация</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>Недостатъчните нива на калций и магнезий влияят на костите и сърдечно-съдовата система</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>Дългосрочният минерален дефицит може да доведе до умора и мускулен дискомфорт</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-semibold text-green-700 mb-3">
                          Как Осигуряваме Качествена Вода
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>Използваме активирана алумина за целенасочено намаляване на флуорида</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>Съхраняваме водата в стъклени бутилки за чист вкус и стабилно качество</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>Фокус върху безопасна и постоянна хидратация всеки ден</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AnimatedComponent>

                {/* Image */}
                <AnimatedComponent delay={0.4} direction="right">
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center p-4">
                      <Image
                        src="/Magnesium_is_an_important_mineral.jpg"
                        alt="Диаграма на минералните ползи"
                        width={3200}
                        height={3200}
                        quality={100}
                        unoptimized
                        className="w-full h-full object-contain"
                        style={{
                          imageRendering: '-webkit-optimize-contrast',
                          WebkitFontSmoothing: 'antialiased',
                          transform: 'translateZ(0)',
                          willChange: 'transform'
                        }}
                      />
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-3 font-medium">Диаграма на минералните ползи</p>
                  </div>
                </AnimatedComponent>
              </div>
            </div>

            {/* Row 4: Problem → Solution (Highlighted Section) */}
            <AnimatedComponent delay={0.2}>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl shadow-xl p-8 md:p-12 border-2 border-green-200">
                <h3 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">
                  Нашите Решения
                </h3>
                
                <div className="space-y-8 max-w-4xl mx-auto">
                  {/* Problem Solution 1 */}
                  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-white/60 rounded-xl p-6 shadow-sm">
                    <div className="flex-1">
                      <p className="text-base md:text-lg font-semibold text-red-700">
                        <span className="text-2xl mr-2">⚠️</span>
                        Микропластмаси от пластмасови бутилки
                      </p>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <svg className="w-8 h-8 md:w-8 md:h-8 text-green-600 rotate-90 md:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-base md:text-lg font-semibold text-green-700">
                        <span className="text-2xl mr-2">✓</span>
                        Стъклени бутилки - без контакт с пластмаса
                      </p>
                    </div>
                  </div>

                  {/* Problem Solution 2 */}
                  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-white/60 rounded-xl p-6 shadow-sm">
                    <div className="flex-1">
                      <p className="text-base md:text-lg font-semibold text-red-700">
                        <span className="text-2xl mr-2">⚠️</span>
                        Флуорид и химикали в обикновената вода
                      </p>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <svg className="w-8 h-8 md:w-8 md:h-8 text-green-600 rotate-90 md:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-base md:text-lg font-semibold text-green-700">
                        <span className="text-2xl mr-2">✓</span>
                        Активирана алумина - селективно намаляване на флуорида
                      </p>
                    </div>
                  </div>

                  {/* Problem Solution 3 */}
                  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-white/60 rounded-xl p-6 shadow-sm">
                    <div className="flex-1">
                      <p className="text-base md:text-lg font-semibold text-red-700">
                        <span className="text-2xl mr-2">⚠️</span>
                        Непостоянно качество при стандартна филтрация
                      </p>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <svg className="w-8 h-8 md:w-8 md:h-8 text-green-600 rotate-90 md:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-base md:text-lg font-semibold text-green-700">
                        <span className="text-2xl mr-2">✓</span>
                        Контролиран процес за стабилен минерален баланс
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedComponent>
          </div>
        </section>

        {/* Features Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <AnimatedComponent>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-900">Защо да изберете AquaPure?</h2>
                  <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Открийте разликата с нашите премиум водни решения и изключително обслужване.
                  </p>
                </div>
              </div>
            </AnimatedComponent>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <AnimatedComponent delay={0.2}>
                <Card className="border-blue-100 hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    <Shield className="h-12 w-12 text-blue-600" />
                    <h3 className="text-xl font-bold text-blue-900">Модерно Пречистване</h3>
                    <p className="text-center text-gray-600">
                      Нашият 7-степенен процес на пречистване премахва 99.9% от замърсителите, като запазва важните минерали.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedComponent>
              <AnimatedComponent delay={0.3}>
                <Card className="border-blue-100 hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    <Award className="h-12 w-12 text-yellow-600" />
                    <h3 className="text-xl font-bold text-blue-900">Премиум Качество</h3>
                    <p className="text-center text-gray-600">
                      Сертифицирано качество на водата, надвишаващо индустриалните стандарти за чистота и вкус.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedComponent>
              <AnimatedComponent delay={0.4}>
                <Card className="border-blue-100 hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    <Clock className="h-12 w-12 text-blue-600" />
                    <h3 className="text-xl font-bold text-blue-900">24/7 Обслужване</h3>
                    <p className="text-center text-gray-600">
                      Денонощна клиентска поддръжка и гъвкави графици за доставка според вашите нужди.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedComponent>
              <AnimatedComponent delay={0.5}>
                <Card className="border-blue-100 hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    <Heart className="h-12 w-12 text-red-600" />
                    <h3 className="text-xl font-bold text-blue-900">Здравословни Ползи</h3>
                    <p className="text-center text-gray-600">
                      Богата на минерали вода, която поддържа вашето здраве и оптимална хидратация.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedComponent>
              <AnimatedComponent delay={0.6}>
                <Card className="border-blue-100 hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    <Recycle className="h-12 w-12 text-green-600" />
                    <h3 className="text-xl font-bold text-blue-900">Еко-съзнателни</h3>
                    <p className="text-center text-gray-600">
                      Устойчиви практики и рециклируеми опаковки за защита на околната среда.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedComponent>
              <AnimatedComponent delay={0.7}>
                <Card className="border-blue-100 hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    <Sparkles className="h-12 w-12 text-purple-600" />
                    <h3 className="text-xl font-bold text-blue-900">Кристално Чиста</h3>
                    <p className="text-center text-gray-600">
                      Насладете се на най-чистия и освежаващ вкус във всяка капка от нашата премиум вода.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedComponent>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <AnimatedComponent>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-900">Нашите Продукти</h2>
                  <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Изберете от нашата гама премиум водни продукти, създадени за всяка нужда.
                  </p>
                </div>
              </div>
            </AnimatedComponent>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Large Image */}
              <AnimatedComponent delay={0.2} className="lg:w-1/2">
                <div className="relative h-[600px] w-full">
                  <Image
                    src="/bottles.png"
                    alt="Колекция от премиум бутилки с вода"
                    fill
                    unoptimized
                    className="object-contain"
                    priority
                  />
                </div>
              </AnimatedComponent>

              {/* Product Options */}
              <div className="lg:w-1/2 flex flex-col gap-4">
                <AnimatedComponent delay={0.3}>
                  <Card className="bg-white hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold text-blue-900 mb-1">Бутилки 500мл</h3>
                      <p className="text-sm text-gray-600 mb-2">Пакет от 24 бутилки. Идеални за хидратация в движение.</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-600">0,79€</span>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Поръчай</Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedComponent>

                <AnimatedComponent delay={0.4}>
                  <Card className="bg-white hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold text-blue-900 mb-1">Бутилки 1Л</h3>
                      <p className="text-sm text-gray-600 mb-2">Пакет от 12 бутилки. Идеални за ежедневна консумация.</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-600">1,20€</span>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Поръчай</Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedComponent>

                <AnimatedComponent delay={0.5}>
                  <Card className="bg-white hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold text-blue-900 mb-1">Галони 19Л</h3>
                      <p className="text-sm text-gray-600 mb-2">Перфектни за офиси и големи семейства. Дълготраен запас.</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-600">2,05€</span>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Поръчай</Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedComponent>

                <AnimatedComponent delay={0.6}>
                  <Card className="bg-white hover:shadow-lg transition-shadow border-2 border-blue-600">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-blue-900">Персонализирана Поръчка</h3>
                        <Badge className="bg-blue-600">По поръчка</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Персонализирани водни решения според вашите нужди.</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-blue-600">Свържете се с нас</span>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Запитване</Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedComponent>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <AnimatedComponent>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-900">
                    Какво Казват Нашите Клиенти
                  </h2>
                </div>
              </div>
            </AnimatedComponent>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <AnimatedComponent delay={0.2}>
                  <Card className="border-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4">
                        "Изключително съм впечатлен от качеството на водата и професионалното обслужване. Доставките са винаги навреме и персоналът е изключително любезен."
                      </p>
                      <div className="font-semibold text-blue-900">Георги Иванов</div>
                      <div className="text-sm text-gray-500">Бизнес Клиент</div>
                    </CardContent>
                  </Card>
                </AnimatedComponent>

                <AnimatedComponent delay={0.4}>
                  <Card className="border-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4">
                        "Като майка на две деца, качеството на водата е от първостепенно значение за мен. AquaPure предоставя най-чистата вода, която някога сме пили. Препоръчвам горещо!"
                      </p>
                      <div className="font-semibold text-blue-900">Мария Петрова</div>
                      <div className="text-sm text-gray-500">Семеен Клиент</div>
                    </CardContent>
                  </Card>
                </AnimatedComponent>

                <AnimatedComponent delay={0.6}>
                  <Card className="border-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4">
                        "Използваме AquaPure за нашия фитнес център от 2 години. Клиентите ни оценяват високо качеството на водата, а обслужването е безупречно. Перфектно бизнес партньорство!"
                      </p>
                      <div className="font-semibold text-blue-900">Димитър Стоянов</div>
                      <div className="text-sm text-gray-500">Фитнес Център Управител</div>
                    </CardContent>
                  </Card>
                </AnimatedComponent>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="water-quality" className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <AnimatedComponent>
              <div className="flex flex-col items-center justify-center space-y-8">
                {/* Main Heading */}
                <div className="space-y-4 max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                    Проверете Качеството на Водата във Вашия Район
                  </h2>
                  <p className="mx-auto text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Въведете вашия код за достъп и разберете подробна информация за качеството на водата във вашия квартал.
                  </p>
                </div>

                {/* Access Code Form */}
                <div className="w-full max-w-md space-y-4">
                  <form className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <Input 
                        type="text" 
                        placeholder="Въведете вашия код за достъп" 
                        className="bg-white text-center text-lg h-12"
                      />
                      <p className="text-sm text-blue-100 text-center">
                        Нямате код? Закупете един от нашите види и намерете кода си.
                      </p>
                    </div>
                    <Button 
                      type="submit" 
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-blue-50 w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/map';
                      }}
                    >
                      Провери Качеството на Водата
                    </Button>
                  </form>
                </div>
              </div>
            </AnimatedComponent>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-2">
                <Droplets className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-blue-900">AquaPure</span>
              </div>
              <p className="text-sm text-gray-600">
                Предоставяме чисти, качествени водни решения за по-здравословно утре.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col space-y-3">
              <h3 className="font-semibold text-blue-900">Бързи Връзки</h3>
              <div className="flex flex-col space-y-2">
                <Link href="#products" className="text-sm text-gray-600 hover:text-blue-600">Продукти</Link>
                <Link href="#water-quality" className="text-sm text-gray-600 hover:text-blue-600">Качество на Водата</Link>
                <Link href="/map" className="text-sm text-gray-600 hover:text-blue-600">Карта на Качеството</Link>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col space-y-3">
              <h3 className="font-semibold text-blue-900">Свържете се с Нас</h3>
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-gray-600">Телефон: 0800 12 345</p>
                <p className="text-sm text-gray-600">Имейл: info@aquapure.bg</p>
                <p className="text-sm text-gray-600">Работно време: Пон-Пет 9:00-18:00</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">© 2024 AquaPure. Всички права запазени.</p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Политика за Поверителност</Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Общи Условия</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
