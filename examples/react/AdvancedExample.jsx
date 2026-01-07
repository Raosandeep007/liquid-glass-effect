import React, { useState } from 'react';
import { useLiquidGlass } from './CustomHook';

/**
 * Reusable Glass Button Component
 */
export function GlassButton({ children, onClick }) {
  const { ref } = useLiquidGlass({
    frostBlur: '4px',
    tintColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    shadowBlur: '15px'
  });

  return (
    <button
      ref={ref}
      onClick={onClick}
      style={{
        padding: '12px 24px',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500'
      }}
    >
      {children}
    </button>
  );
}

/**
 * Draggable Glass Modal
 */
export function GlassModal({ isOpen, onClose, children }) {
  const { ref } = useLiquidGlass({
    draggable: true,
    frostBlur: '12px',
    tintColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: '24px',
    outerShadowBlur: '40px'
  });

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div
        ref={ref}
        style={{
          padding: '40px',
          maxWidth: '500px',
          width: '90%',
          color: 'white',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: 'white',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '18px'
          }}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

/**
 * Glass Card Grid
 */
export function GlassCardGrid({ items }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      padding: '20px'
    }}>
      {items.map((item, index) => (
        <GlassCardItem key={index} {...item} />
      ))}
    </div>
  );
}

function GlassCardItem({ title, description, blur = '6px' }) {
  const { ref } = useLiquidGlass({
    frostBlur: blur,
    tintColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '16px'
  });

  return (
    <div ref={ref} style={{ padding: '24px', color: 'white', minHeight: '150px' }}>
      <h3 style={{ marginBottom: '10px' }}>{title}</h3>
      <p style={{ opacity: 0.9 }}>{description}</p>
    </div>
  );
}

/**
 * Complete Demo App
 */
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const cardData = [
    { title: 'Light Blur', description: 'Subtle glass effect with minimal blur', blur: '3px' },
    { title: 'Medium Blur', description: 'Balanced glass effect', blur: '6px' },
    { title: 'Heavy Blur', description: 'Strong frosted glass effect', blur: '12px' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '40px' }}>
          Liquid Glass Effect - React Examples
        </h1>

        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <GlassButton onClick={() => setModalOpen(true)}>
            Open Glass Modal
          </GlassButton>
        </div>

        <GlassCardGrid items={cardData} />

        <GlassModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <h2>Draggable Glass Modal</h2>
          <p style={{ marginTop: '20px', lineHeight: '1.6' }}>
            This modal has the glass effect applied and is draggable!
            Try dragging it around the screen.
          </p>
          <p style={{ marginTop: '15px', opacity: 0.8 }}>
            The backdrop blur and distortion create a beautiful frosted glass appearance.
          </p>
        </GlassModal>
      </div>
    </div>
  );
}
