import React, { useEffect, useRef, useState } from 'react';
import LiquidGlass, { LiquidGlassOptions } from 'liquid-glass-effect';

/**
 * TypeScript version of the custom hook
 */
export function useLiquidGlass(options?: LiquidGlassOptions) {
  const elementRef = useRef<HTMLDivElement>(null);
  const glassInstanceRef = useRef<LiquidGlass | null>(null);

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
    shadow: (params: Parameters<LiquidGlass['updateShadow']>[0]) =>
      glassInstanceRef.current?.updateShadow(params),
    tint: (params: Parameters<LiquidGlass['updateTint']>[0]) =>
      glassInstanceRef.current?.updateTint(params),
    frost: (blur: string) =>
      glassInstanceRef.current?.updateFrost(blur),
    distortion: (params: Parameters<LiquidGlass['updateDistortion']>[0]) =>
      glassInstanceRef.current?.updateDistortion(params),
    outerShadow: (params: Parameters<LiquidGlass['updateOuterShadow']>[0]) =>
      glassInstanceRef.current?.updateOuterShadow(params),
  };

  return {
    ref: elementRef,
    glassInstance: glassInstanceRef.current,
    updateEffect
  };
}

/**
 * Typed props for Glass Card component
 */
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  options?: LiquidGlassOptions;
  style?: React.CSSProperties;
}

/**
 * Type-safe Glass Card Component
 */
export function GlassCard({ children, className = '', options, style }: GlassCardProps) {
  const { ref } = useLiquidGlass(options);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/**
 * Interactive Controls Component with full TypeScript support
 */
interface ControlsState {
  blur: number;
  distortion: number;
  frequency: number;
  tintOpacity: number;
  tintColor: string;
}

export function GlassControlPanel() {
  const { ref, updateEffect } = useLiquidGlass({
    frostBlur: '8px',
    tintColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '20px',
    distortionStrength: 77
  });

  const [controls, setControls] = useState<ControlsState>({
    blur: 8,
    distortion: 77,
    frequency: 0.008,
    tintOpacity: 0.3,
    tintColor: '#ffffff'
  });

  const handleBlurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setControls(prev => ({ ...prev, blur: value }));
    updateEffect.frost(`${value}px`);
  };

  const handleDistortionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setControls(prev => ({ ...prev, distortion: value }));
    updateEffect.distortion({ strength: value });
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setControls(prev => ({ ...prev, frequency: value }));
    updateEffect.distortion({ frequency: value });
  };

  const handleTintColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    setControls(prev => ({ ...prev, tintColor: hex }));

    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    const color = `rgba(${r}, ${g}, ${b}, ${controls.tintOpacity})`;
    updateEffect.tint({ color });
  };

  const handleTintOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setControls(prev => ({ ...prev, tintOpacity: value }));
    updateEffect.tint({ opacity: value });
  };

  return (
    <div
      ref={ref}
      style={{
        padding: '30px',
        color: 'white',
        maxWidth: '500px'
      }}
    >
      <h3 style={{ marginBottom: '20px' }}>Glass Effect Controls</h3>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          Frost Blur: {controls.blur}px
        </label>
        <input
          type="range"
          min="0"
          max="30"
          value={controls.blur}
          onChange={handleBlurChange}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          Distortion: {controls.distortion}
        </label>
        <input
          type="range"
          min="0"
          max="200"
          value={controls.distortion}
          onChange={handleDistortionChange}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          Frequency: {controls.frequency.toFixed(3)}
        </label>
        <input
          type="range"
          min="0"
          max="0.05"
          step="0.001"
          value={controls.frequency}
          onChange={handleFrequencyChange}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          Tint Color
        </label>
        <input
          type="color"
          value={controls.tintColor}
          onChange={handleTintColorChange}
          style={{ width: '100%', height: '40px', cursor: 'pointer' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          Tint Opacity: {controls.tintOpacity.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={controls.tintOpacity}
          onChange={handleTintOpacityChange}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
}

/**
 * Main App Component
 */
export default function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <GlassControlPanel />
    </div>
  );
}
