import { useEffect, useRef } from 'react';
import LiquidGlass from 'liquid-glass-effect';

/**
 * Custom React hook for liquid glass effect
 * @param {Object} options - LiquidGlass configuration options
 * @returns {Object} { ref, glassInstance, updateEffect }
 */
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

  // Update effect options
  const updateEffect = {
    shadow: (params) => glassInstanceRef.current?.updateShadow(params),
    tint: (params) => glassInstanceRef.current?.updateTint(params),
    frost: (blur) => glassInstanceRef.current?.updateFrost(blur),
    distortion: (params) => glassInstanceRef.current?.updateDistortion(params),
    outerShadow: (params) => glassInstanceRef.current?.updateOuterShadow(params),
  };

  return {
    ref: elementRef,
    glassInstance: glassInstanceRef.current,
    updateEffect
  };
}

/**
 * Example component using the custom hook
 */
export function GlassCardWithHook({ children, options }) {
  const { ref } = useLiquidGlass(options);

  return (
    <div ref={ref} style={{ padding: '30px', color: 'white' }}>
      {children}
    </div>
  );
}

/**
 * Example with interactive controls
 */
export function InteractiveGlassCard() {
  const { ref, updateEffect } = useLiquidGlass({
    frostBlur: '5px',
    tintColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '20px'
  });

  const handleBlurChange = (e) => {
    updateEffect.frost(`${e.target.value}px`);
  };

  const handleDistortionChange = (e) => {
    updateEffect.distortion({ strength: parseFloat(e.target.value) });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div ref={ref} style={{ padding: '30px', color: 'white' }}>
        <h2>Interactive Glass Effect</h2>
        <p>Use the controls below to adjust the effect</p>
      </div>

      <div style={{ color: 'white' }}>
        <label>
          Blur: <input type="range" min="0" max="30" defaultValue="5" onChange={handleBlurChange} />
        </label>
        <br />
        <label>
          Distortion: <input type="range" min="0" max="200" defaultValue="77" onChange={handleDistortionChange} />
        </label>
      </div>
    </div>
  );
}
