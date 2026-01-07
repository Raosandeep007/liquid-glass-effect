# Usage Guide

## Quick Setup

### 1. Install the package

```bash
npm install liquid-glass-effect
```

### 2. Import in your project

```javascript
import LiquidGlass from 'liquid-glass-effect';
```

### 3. Apply to an element

```javascript
const glass = new LiquidGlass(document.querySelector('.my-element'));
```

## Testing Locally

To test the demo locally:

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Open the demo in your browser
open examples/index.html
```

Or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Then navigate to http://localhost:8000/examples/
```

## Publishing to npm

1. Update version in [package.json](package.json)
2. Build the package: `npm run build`
3. Login to npm: `npm login`
4. Publish: `npm publish`

## Development

```bash
# Watch mode for development
npm run dev
```

## Common Issues

### Browser Compatibility

The effect requires `backdrop-filter` support. If the effect doesn't appear:

- Use Chrome, Edge, or another Chromium-based browser
- Check that backdrop-filter is enabled
- Verify the element has a background behind it to blur

### SVG Filters Not Working

If distortion isn't visible:

- Check browser console for errors
- Ensure the SVG filter container is in the DOM
- Try reducing `distortionStrength` to see if it's too subtle

### Performance Issues

If the effect is laggy:

- Reduce `frostBlur` value
- Lower `distortionStrength`
- Limit number of glass elements on the page
- Test on a device with better GPU support

## Examples

See [examples/index.html](examples/index.html) for a complete working demo with interactive controls.
