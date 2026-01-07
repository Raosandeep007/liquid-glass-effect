import React, { useEffect, useRef } from 'react';
import LiquidGlass from 'liquid-glass-effect';

/**
 * Basic example - Simple glass card component
 */
function GlassCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const glassRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      // Initialize the glass effect
      glassRef.current = new LiquidGlass(cardRef.current, {
        frostBlur: '8px',
        tintColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        distortionStrength: 50
      });
    }

    // Cleanup on unmount
    return () => {
      if (glassRef.current) {
        glassRef.current.destroy();
      }
    };
  }, []);

  return (
    <div ref={cardRef} className={className}>
      {children}
    </div>
  );
}

/**
 * Usage example
 */
function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <GlassCard className="card">
        <h2>Welcome</h2>
        <p>This is a glass morphism card using liquid-glass-effect!</p>
      </GlassCard>
    </div>
  );
}

export default App;
