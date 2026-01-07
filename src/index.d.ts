/**
 * Options for configuring the LiquidGlass effect
 */
export interface LiquidGlassOptions {
  /** Inner shadow offset (default: '0px') */
  shadowOffset?: string;
  /** Inner shadow blur radius (default: '20px') */
  shadowBlur?: string;
  /** Inner shadow spread radius (default: '-5px') */
  shadowSpread?: string;
  /** Inner shadow color (default: 'rgba(255, 255, 255, 0.8)') */
  shadowColor?: string;

  /** Glass tint color with opacity (default: 'rgba(255, 255, 255, 0.4)') */
  tintColor?: string;
  /** Glass tint opacity (default: 0.4) */
  tintOpacity?: number;

  /** Backdrop frost blur amount (default: '2px') */
  frostBlur?: string;

  /** SVG noise frequency for distortion (default: 0.008) */
  noiseFrequency?: number;
  /** Distortion displacement strength (default: 77) */
  distortionStrength?: number;

  /** Outer shadow blur radius (default: '24px') */
  outerShadowBlur?: string;
  /** Outer shadow color (default: 'rgba(0, 0, 0, 0.2)') */
  outerShadowColor?: string;

  /** Border radius (default: '20px') */
  borderRadius?: string;

  /** Enable draggable behavior (default: false) */
  draggable?: boolean;
}

/**
 * Shadow update parameters
 */
export interface ShadowUpdateParams {
  blur?: string;
  spread?: string;
  color?: string;
  offset?: string;
}

/**
 * Tint update parameters
 */
export interface TintUpdateParams {
  color?: string;
  opacity?: number;
}

/**
 * Distortion update parameters
 */
export interface DistortionUpdateParams {
  frequency?: number;
  strength?: number;
}

/**
 * Outer shadow update parameters
 */
export interface OuterShadowUpdateParams {
  blur?: string;
  color?: string;
}

/**
 * LiquidGlass class for creating iOS-inspired glass morphism effects
 */
export default class LiquidGlass {
  /**
   * The DOM element with the glass effect applied
   */
  element: HTMLElement;

  /**
   * Current configuration options
   */
  options: Required<LiquidGlassOptions>;

  /**
   * Unique ID for the SVG filter
   */
  svgFilterId: string;

  /**
   * Reference to the SVG filter element
   */
  svgFilter: SVGFilterElement;

  /**
   * Cleanup function for event listeners (if draggable)
   */
  cleanup?: () => void;

  /**
   * Creates a new LiquidGlass instance
   * @param element - The DOM element to apply the effect to
   * @param options - Configuration options
   * @throws Error if element is not provided
   */
  constructor(element: HTMLElement, options?: LiquidGlassOptions);

  /**
   * Initialize the glass effect
   */
  init(): void;

  /**
   * Create and inject the SVG filter into the DOM
   */
  createSVGFilter(): void;

  /**
   * Apply CSS styles and variables to the element
   */
  applyStyles(): void;

  /**
   * Enable draggable behavior for the glass element
   */
  makeDraggable(): void;

  /**
   * Update inner shadow properties
   * @param params - Shadow parameters to update
   */
  updateShadow(params?: ShadowUpdateParams): void;

  /**
   * Update glass tint properties
   * @param params - Tint parameters to update
   */
  updateTint(params?: TintUpdateParams): void;

  /**
   * Update frost blur amount
   * @param blur - New blur value
   */
  updateFrost(blur: string): void;

  /**
   * Update distortion effect properties
   * @param params - Distortion parameters to update
   */
  updateDistortion(params?: DistortionUpdateParams): void;

  /**
   * Update outer shadow properties
   * @param params - Outer shadow parameters to update
   */
  updateOuterShadow(params?: OuterShadowUpdateParams): void;

  /**
   * Remove the glass effect and clean up resources
   */
  destroy(): void;
}
