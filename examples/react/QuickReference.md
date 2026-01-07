# React Quick Reference Guide

## 🎯 Three Ways to Use Liquid Glass Effect in React

### 1. Direct Implementation (Simple)

**Best for**: One-off components, simple use cases

```jsx
import React, { useEffect, useRef } from 'react';
import LiquidGlass from 'liquid-glass-effect';

function MyComponent() {
  const ref = useRef(null);

  useEffect(() => {
    const glass = new LiquidGlass(ref.current, {
      frostBlur: '8px',
      borderRadius: '16px'
    });

    return () => glass.destroy();
  }, []);

  return <div ref={ref}>Content</div>;
}
```

**Pros**: ✅ Simple, straightforward
**Cons**: ❌ Not reusable, repetitive code

---

### 2. Custom Hook (Recommended)

**Best for**: Reusable across multiple components

```jsx
// useLiquidGlass.js
import { useEffect, useRef } from 'react';
import LiquidGlass from 'liquid-glass-effect';

export function useLiquidGlass(options = {}) {
  const elementRef = useRef(null);
  const glassRef = useRef(null);

  useEffect(() => {
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

  return {
    ref: elementRef,
    updateEffect: {
      frost: (blur) => glassRef.current?.updateFrost(blur),
      tint: (params) => glassRef.current?.updateTint(params),
      distortion: (params) => glassRef.current?.updateDistortion(params),
    }
  };
}

// Usage
function MyComponent() {
  const { ref } = useLiquidGlass({ frostBlur: '10px' });
  return <div ref={ref}>Content</div>;
}
```

**Pros**: ✅ Reusable, clean, updatable
**Cons**: ❌ Extra file/setup

---

### 3. Wrapper Component

**Best for**: Consistent styling, design system

```jsx
// GlassCard.jsx
import { useLiquidGlass } from './useLiquidGlass';

export function GlassCard({ children, blur = '8px', className = '' }) {
  const { ref } = useLiquidGlass({
    frostBlur: blur,
    borderRadius: '16px',
    tintColor: 'rgba(255, 255, 255, 0.2)'
  });

  return (
    <div ref={ref} className={className} style={{ padding: '20px', color: 'white' }}>
      {children}
    </div>
  );
}

// Usage - Super clean!
function App() {
  return (
    <GlassCard blur="12px">
      <h2>Title</h2>
      <p>Content</p>
    </GlassCard>
  );
}
```

**Pros**: ✅ Cleanest API, consistent design
**Cons**: ❌ Less flexible

---

## 📋 Common Patterns

### Pattern 1: Static Glass Effect

Just apply once, never change:

```jsx
function Card() {
  const { ref } = useLiquidGlass({ frostBlur: '10px' });
  return <div ref={ref}>Static content</div>;
}
```

### Pattern 2: Interactive Controls

User can adjust the effect:

```jsx
function InteractiveCard() {
  const { ref, updateEffect } = useLiquidGlass({ frostBlur: '5px' });

  return (
    <>
      <div ref={ref}>Content with adjustable blur</div>
      <input
        type="range"
        min="0"
        max="30"
        onChange={(e) => updateEffect.frost(`${e.target.value}px`)}
      />
    </>
  );
}
```

### Pattern 3: Conditional Glass

Apply effect based on state:

```jsx
function ConditionalCard() {
  const [enabled, setEnabled] = useState(false);
  const ref = useRef(null);
  const glassRef = useRef(null);

  useEffect(() => {
    if (enabled && ref.current && !glassRef.current) {
      glassRef.current = new LiquidGlass(ref.current, { frostBlur: '10px' });
    } else if (!enabled && glassRef.current) {
      glassRef.current.destroy();
      glassRef.current = null;
    }

    return () => glassRef.current?.destroy();
  }, [enabled]);

  return (
    <>
      <button onClick={() => setEnabled(!enabled)}>Toggle Glass</button>
      <div ref={ref}>Content</div>
    </>
  );
}
```

### Pattern 4: Multiple Instances

Different effects on different elements:

```jsx
function Dashboard() {
  const header = useLiquidGlass({ frostBlur: '5px', borderRadius: '12px' });
  const sidebar = useLiquidGlass({ frostBlur: '10px', borderRadius: '0' });
  const card = useLiquidGlass({ frostBlur: '8px', borderRadius: '16px' });

  return (
    <div className="dashboard">
      <header ref={header.ref}>Header</header>
      <aside ref={sidebar.ref}>Sidebar</aside>
      <main ref={card.ref}>Content</main>
    </div>
  );
}
```

---

## 🎨 Styling Integration

### With Styled Components

```jsx
import styled from 'styled-components';

const StyledCard = styled.div`
  padding: 30px;
  color: white;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

function GlassCard() {
  const { ref } = useLiquidGlass();
  return <StyledCard ref={ref}>Content</StyledCard>;
}
```

### With Tailwind CSS

```jsx
function GlassCard() {
  const { ref } = useLiquidGlass({ borderRadius: '16px' });

  return (
    <div ref={ref} className="p-8 text-white hover:scale-105 transition-transform">
      Content
    </div>
  );
}
```

### With CSS Modules

```jsx
import styles from './Card.module.css';

function GlassCard() {
  const { ref } = useLiquidGlass();
  return <div ref={ref} className={styles.card}>Content</div>;
}
```

---

## ⚡ Performance Tips

### ✅ DO

```jsx
// Memoize options object
const options = useMemo(() => ({
  frostBlur: '8px',
  borderRadius: '16px'
}), []);

const { ref } = useLiquidGlass(options);

// Limit instances
<GlassCard /> // Only 3-4 per page on mobile

// Use lower blur values
useLiquidGlass({ frostBlur: '5px' }) // Better than '20px'
```

### ❌ DON'T

```jsx
// Don't create new options every render
const { ref } = useLiquidGlass({
  frostBlur: computeBlur() // Computed on every render!
});

// Don't use too many instances
{items.map(item => <GlassCard key={item.id} />)} // 50+ cards = bad

// Don't forget cleanup
useEffect(() => {
  new LiquidGlass(ref.current);
  // ❌ No cleanup!
}, []);
```

---

## 🔧 Debugging Checklist

Effect not showing?

- [ ] Background has color/gradient
- [ ] Element has content/dimensions
- [ ] Using Chrome/Edge browser
- [ ] No z-index conflicts
- [ ] Called `destroy()` in cleanup

Performance issues?

- [ ] Reduced blur amount
- [ ] Limited number of instances
- [ ] Disabled on mobile if needed

TypeScript errors?

- [ ] Installed `@types/react`
- [ ] Imported types correctly
- [ ] Typed ref as `HTMLDivElement`

---

## 📱 Responsive Example

```jsx
function ResponsiveGlass() {
  const isMobile = window.innerWidth < 768;

  const { ref } = useLiquidGlass({
    frostBlur: isMobile ? '4px' : '10px', // Less blur on mobile
    distortionStrength: isMobile ? 30 : 77, // Less distortion
  });

  return <div ref={ref}>Responsive glass effect</div>;
}
```

---

## 🎯 Framework-Specific Tips

### Next.js (App Router)

```jsx
'use client'; // Required!

import { useLiquidGlass } from '@/hooks/useLiquidGlass';

export default function Page() {
  const { ref } = useLiquidGlass();
  return <div ref={ref}>Next.js 14+ Glass Card</div>;
}
```

### Next.js (Pages Router)

```jsx
// Works without 'use client' in pages directory
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

---

## 📚 Full Examples

See complete implementations in:
- [BasicExample.jsx](./BasicExample.jsx) - Minimal setup
- [CustomHook.jsx](./CustomHook.jsx) - Reusable hook
- [AdvancedExample.jsx](./AdvancedExample.jsx) - Buttons, modals, grids
- [TypeScriptExample.tsx](./TypeScriptExample.tsx) - Full TypeScript
