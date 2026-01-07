# Liquid Glass Effect

A lightweight JavaScript library for creating iOS-inspired liquid glass visual effects with customizable parameters. Features backdrop blur, SVG-based distortion, inner shadows, and tint overlays.

## Features

- **Zero Dependencies** - Pure JavaScript implementation
- **Lightweight** - Minimal footprint
- **Customizable** - Full control over all visual parameters
- **Dynamic Updates** - Change effect properties in real-time
- **TypeScript Support** - Full type definitions included
- **Draggable** - Optional drag-and-drop functionality

## Browser Support

This library uses `backdrop-filter` and SVG filters, which work best on Chromium-based browsers (Chrome, Edge, Opera). Safari and Firefox may have limited support.

**Recommended:** Chrome >= 90, Edge >= 90

## Installation

```bash
npm install liquid-glass-effect
```

## Quick Start

### HTML

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .glass-card {
      width: 300px;
      height: 200px;
      padding: 30px;
      color: white;
    }
  </style>
</head>
<body>
  <div class="glass-card">
    <h2>Liquid Glass</h2>
    <p>Beautiful glass morphism effect</p>
  </div>

  <script type="module">
    import LiquidGlass from './path/to/liquid-glass-effect';

    const element = document.querySelector('.glass-card');
    const glass = new LiquidGlass(element, {
      frostBlur: '8px',
      tintColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '24px'
    });
  </script>
</body>
</html>
```

### JavaScript/ES6

```javascript
import LiquidGlass from 'liquid-glass-effect';

// Basic usage
const glass = new LiquidGlass(document.querySelector('.my-element'));

// With custom options
const glass = new LiquidGlass(element, {
  // Inner shadow
  shadowBlur: '30px',
  shadowSpread: '-8px',
  shadowColor: 'rgba(255, 255, 255, 0.9)',

  // Glass tint
  tintColor: 'rgba(255, 255, 255, 0.3)',

  // Frost blur
  frostBlur: '10px',

  // Distortion
  noiseFrequency: 0.01,
  distortionStrength: 50,

  // Border
  borderRadius: '16px',

  // Make it draggable
  draggable: true
});
```

## API Reference

### Constructor

```javascript
new LiquidGlass(element, options)
```

#### Parameters

- `element` (HTMLElement, required) - The DOM element to apply the effect to
- `options` (Object, optional) - Configuration options

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `shadowOffset` | string | `'0px'` | Inner shadow offset |
| `shadowBlur` | string | `'20px'` | Inner shadow blur radius |
| `shadowSpread` | string | `'-5px'` | Inner shadow spread radius |
| `shadowColor` | string | `'rgba(255, 255, 255, 0.8)'` | Inner shadow color |
| `tintColor` | string | `'rgba(255, 255, 255, 0.4)'` | Glass tint overlay color |
| `tintOpacity` | number | `0.4` | Glass tint opacity (0-1) |
| `frostBlur` | string | `'2px'` | Backdrop blur amount |
| `noiseFrequency` | number | `0.008` | SVG noise frequency for distortion |
| `distortionStrength` | number | `77` | Distortion displacement strength |
| `outerShadowBlur` | string | `'24px'` | Outer shadow blur radius |
| `outerShadowColor` | string | `'rgba(0, 0, 0, 0.2)'` | Outer shadow color |
| `borderRadius` | string | `'20px'` | Border radius |
| `draggable` | boolean | `false` | Enable drag-and-drop |

### Methods

#### `updateShadow({ blur, spread, color, offset })`

Update inner shadow properties.

```javascript
glass.updateShadow({
  blur: '25px',
  spread: '-10px',
  color: 'rgba(255, 255, 255, 1)'
});
```

#### `updateTint({ color, opacity })`

Update glass tint properties.

```javascript
glass.updateTint({
  color: 'rgba(100, 200, 255, 0.5)',
  opacity: 0.5
});
```

#### `updateFrost(blur)`

Update frost blur amount.

```javascript
glass.updateFrost('15px');
```

#### `updateDistortion({ frequency, strength })`

Update distortion effect properties.

```javascript
glass.updateDistortion({
  frequency: 0.012,
  strength: 100
});
```

#### `updateOuterShadow({ blur, color })`

Update outer shadow properties.

```javascript
glass.updateOuterShadow({
  blur: '30px',
  color: 'rgba(0, 0, 0, 0.3)'
});
```

#### `destroy()`

Remove the effect and clean up resources.

```javascript
glass.destroy();
```

## Examples

### Interactive Controls

```javascript
import LiquidGlass from 'liquid-glass-effect';

const glass = new LiquidGlass(document.querySelector('.card'));

// Connect to range input
document.querySelector('#blur-slider').addEventListener('input', (e) => {
  glass.updateFrost(`${e.target.value}px`);
});

document.querySelector('#distortion-slider').addEventListener('input', (e) => {
  glass.updateDistortion({ strength: e.target.value });
});
```

### Multiple Instances

```javascript
import LiquidGlass from 'liquid-glass-effect';

document.querySelectorAll('.glass-card').forEach(element => {
  new LiquidGlass(element, {
    frostBlur: '5px',
    borderRadius: '12px'
  });
});
```

### Dynamic Backgrounds

```javascript
const glass = new LiquidGlass(element);

// Change background
document.body.style.backgroundImage = 'url(new-image.jpg)';
// The glass effect automatically adapts to the new background
```

## TypeScript

Full TypeScript support is included:

```typescript
import LiquidGlass, { LiquidGlassOptions } from 'liquid-glass-effect';

const options: LiquidGlassOptions = {
  frostBlur: '10px',
  draggable: true
};

const glass = new LiquidGlass(element, options);
```

## CSS Classes

The library automatically adds the `.liquid-glass` class to elements. You can use this for additional styling:

```css
.liquid-glass {
  /* Your custom styles */
  transition: transform 0.3s ease;
}

.liquid-glass:hover {
  transform: scale(1.02);
}
```

## Performance Tips

1. **Limit instances** - Glass effects are GPU-intensive. Use sparingly on mobile devices.
2. **Reduce blur** - Lower `frostBlur` values improve performance
3. **Optimize distortion** - Lower `distortionStrength` and `noiseFrequency` for better performance
4. **Static backgrounds** - Work better than animated backgrounds

## Credits

Inspired by [archisvaze/liquid-glass](https://github.com/archisvaze/liquid-glass) and the iOS design language.

Glass distortion filter technique adapted from chakachuk's CodePen demo.

## License

MIT License - feel free to use in personal and commercial projects.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

For issues and questions, please visit the [GitHub Issues page](https://github.com/yourusername/liquid-glass-effect/issues).
