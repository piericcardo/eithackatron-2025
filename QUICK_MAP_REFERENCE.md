# Quick Map API Reference

## Current Setup (CARTO)

### Light Mode Tiles
```
https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png
```

### Dark Mode Tiles
```
https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
```

### Attribution
```
&copy; OpenStreetMap contributors &copy; CARTO
```

---

## Why CARTO?

✅ **100% Free** - No API key, no registration, no limits  
✅ **Production Ready** - Used by thousands of apps worldwide  
✅ **Fast & Reliable** - Global CDN with CloudFlare  
✅ **Beautiful Design** - Professional map styling  
✅ **Dark Mode** - Native support for light/dark themes  

---

## Quick Switch to Other Free Providers

### OpenStreetMap (Basic)
```typescript
url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
attribution='&copy; OpenStreetMap contributors'
```
⚠️ Not recommended for high-traffic sites

### CARTO Voyager (Alternative Style)
```typescript
url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
attribution='&copy; OpenStreetMap contributors &copy; CARTO'
```

---

## Testing Checklist

✅ Map loads in browser  
✅ Light mode works  
✅ Dark mode works  
✅ Zoom controls functional  
✅ Neighborhood polygons visible  
✅ Click interactions work  
✅ No console errors  

---

## Need Help?

- **CARTO Docs**: https://carto.com/basemaps/
- **Leaflet Providers**: https://leaflet-extras.github.io/leaflet-providers/preview/
- **Issue?** Check browser console for errors

