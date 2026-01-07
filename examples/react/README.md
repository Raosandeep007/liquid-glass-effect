# React Examples for Liquid Glass Effect

This directory contains comprehensive React examples showing how to use the `liquid-glass-effect` package in React applications.

## 📁 Files

1. **[BasicExample.jsx](BasicExample.jsx)** - Simple usage with a basic glass card component
2. **[CustomHook.jsx](CustomHook.jsx)** - Custom React hook (`useLiquidGlass`) for reusable logic
3. **[AdvancedExample.jsx](AdvancedExample.jsx)** - Complete examples with buttons, modals, and grids
4. **[TypeScriptExample.tsx](TypeScriptExample.tsx)** - Full TypeScript implementation with type safety

## 🚀 Quick Start

### Installation

```bash
npm install liquid-glass-effect
```

### Basic Usage

```jsx
import React, { useEffect, useRef } from 'react';
import LiquidGlass from 'liquid-glass-effect';

function GlassCard() {
  const cardRef = useRef(null);

  useEffect(() => {
    const glass = new LiquidGlass(cardRef.current, {
      frostBlur: '8px',
      tintColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '16px'
    });

    return () => glass.destroy();
  }, []);

  return (
    <div ref={cardRef} style={{ padding: '30px', color: 'white' }}>
      <h2>Glass Card</h2>
      <p>Beautiful glass morphism effect!</p>
    </div>
  );
}
```

## 🎨 Custom Hook Pattern (Recommended)

Create a reusable hook:

```jsx
// useLiquidGlass.js
import { useEffect, useRef } from 'react';
import LiquidGlass from 'liquid-glass-effect';

export function useLiquidGlass(options = {}) {
  const elementRef = useRef(null);
  const glassInstanceRef = useRef(null);

  useEffect(() => {
    if (elementRef.current && !glassInstanceRef.current) {
      glassInstanceRef.current = new LiquidGlass(elementRef.current, options);
    }

    return () => {
      if (glassInstanceRef.current) {
        glassInstanceRef.current.destroy();
        glassInstanceRef.current = null;
      }
    };
  }, []);

  const updateEffect = {
    shadow: (params) => glassInstanceRef.current?.updateShadow(params),
    tint: (params) => glassInstanceRef.current?.updateTint(params),
    frost: (blur) => glassInstanceRef.current?.updateFrost(blur),
    distortion: (params) => glassInstanceRef.current?.updateDistortion(params),
  };

  return { ref: elementRef, updateEffect };
}
```

Use it in your components:

```jsx
import { useLiquidGlass } from './useLiquidGlass';

function MyComponent() {
  const { ref } = useLiquidGlass({
    frostBlur: '10px',
    borderRadius: '20px'
  });

  return <div ref={ref}>Content here</div>;
}
```

## 📚 Component Examples

### Glass Button

```jsx
function GlassButton({ children, onClick }) {
  const { ref } = useLiquidGlass({
    frostBlur: '4px',
    tintColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '12px'
  });

  return (
    <button ref={ref} onClick={onClick} style={{ padding: '12px 24px', color: 'white' }}>
      {children}
    </button>
  );
}
```

### Draggable Glass Modal

```jsx
function GlassModal({ isOpen, onClose, children }) {
  const { ref } = useLiquidGlass({
    draggable: true,
    frostBlur: '12px',
    borderRadius: '24px'
  });

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }}>
      <div ref={ref} style={{ padding: '40px', color: 'white' }}>
        {children}
      </div>
    </div>
  );
}
```

### Interactive Controls

```jsx
function InteractiveGlass() {
  const { ref, updateEffect } = useLiquidGlass({
    frostBlur: '5px',
    borderRadius: '16px'
  });

  return (
    <div>
      <div ref={ref} style={{ padding: '30px' }}>
        <h2>Adjustable Glass Effect</h2>
      </div>

      <input
        type="range"
        min="0"
        max="30"
        onChange={(e) => updateEffect.frost(`${e.target.value}px`)}
      />
    </div>
  );
}
```

## 🔷 TypeScript Support

```tsx
import LiquidGlass, { LiquidGlassOptions } from 'liquid-glass-effect';

interface GlassCardProps {
  children: React.ReactNode;
  options?: LiquidGlassOptions;
}

function GlassCard({ children, options }: GlassCardProps) {
  const { ref } = useLiquidGlass(options);
  return <div ref={ref}>{children}</div>;
}
```

## 🎯 Best Practices

### 1. Always Clean Up

```jsx
useEffect(() => {
  const glass = new LiquidGlass(element, options);

  // IMPORTANT: Clean up on unmount
  return () => glass.destroy();
}, []);
```

### 2. Use Refs Correctly

```jsx
// ✅ Good - using ref
const ref = useRef(null);
useEffect(() => {
  if (ref.current) {
    const glass = new LiquidGlass(ref.current, options);
    return () => glass.destroy();
  }
}, []);

// ❌ Bad - direct DOM query
useEffect(() => {
  const element = document.querySelector('.glass');
  new LiquidGlass(element, options);
}, []);
```

### 3. Prevent Multiple Initializations

```jsx
const glassRef = useRef(null);

useEffect(() => {
  // Check if already initialized
  if (elementRef.current && !glassRef.current) {
    glassRef.current = new LiquidGlass(elementRef.current, options);
  }

  return () => {
    if (glassRef.current) {
      glassRef.current.destroy();
      glassRef.current = null;
    }
  };
}, []);
```

### 4. Background Requirements

The glass effect requires a background to blur. Make sure your app has a colorful background:

```jsx
function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <GlassCard>Content</GlassCard>
    </div>
  );
}
```

## 🎨 Styling Tips

### CSS-in-JS Integration

```jsx
import styled from 'styled-components';

const StyledGlassCard = styled.div`
  padding: 30px;
  color: white;

  &:hover {
    transform: translateY(-5px);
    transition: transform 0.3s ease;
  }
`;

function GlassCard() {
  const { ref } = useLiquidGlass();
  return <StyledGlassCard ref={ref}>Content</StyledGlassCard>;
}
```

### Tailwind CSS

```jsx
function GlassCard() {
  const { ref } = useLiquidGlass({
    frostBlur: '8px',
    borderRadius: '16px'
  });

  return (
    <div ref={ref} className="p-8 text-white hover:scale-105 transition-transform">
      Content
    </div>
  );
}
```

## 🌐 Framework Integrations

### Next.js

```jsx
'use client'; // Required for Next.js App Router

import { useLiquidGlass } from '@/hooks/useLiquidGlass';

export default function Page() {
  const { ref } = useLiquidGlass();
  return <div ref={ref}>Next.js Glass Card</div>;
}
```

### Remix

```jsx
import { useLiquidGlass } from '~/hooks/useLiquidGlass';

export default function Route() {
  const { ref } = useLiquidGlass();
  return <div ref={ref}>Remix Glass Card</div>;
}
```

## ⚡ Performance Tips

1. **Limit instances** - Use sparingly, especially on mobile
2. **Lower blur values** - Better performance with `frostBlur: '5px'` vs `'20px'`
3. **Reduce distortion** - Lower `distortionStrength` improves FPS
4. **Memoize options** - Use `useMemo` for complex option objects

```jsx
const options = useMemo(() => ({
  frostBlur: '8px',
  tintColor: computeColor(),
  borderRadius: '16px'
}), [dependencies]);

const { ref } = useLiquidGlass(options);
```

## 🐛 Troubleshooting

### Effect not visible?

- Ensure there's a colorful background behind the element
- Check browser compatibility (Chrome/Edge recommended)
- Verify the element has content/dimensions

### Performance issues?

- Reduce `frostBlur` value
- Lower `distortionStrength`
- Limit number of glass elements on page

### TypeScript errors?

- Install type definitions: `npm install --save-dev @types/react`
- Ensure proper imports: `import LiquidGlass, { LiquidGlassOptions } from 'liquid-glass-effect'`

## 📖 See Also

- [Main README](../../README.md) - Full API documentation
- [Usage Guide](../../USAGE.md) - General usage instructions
- [Basic Demo](../index.html) - Vanilla JavaScript example

## 📄 License

MIT - Same as the main package
