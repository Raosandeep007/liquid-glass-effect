/**
 * LiquidGlass - iOS-inspired liquid glass effect library
 * Creates customizable glass morphism effects with distortion and blur
 */

class LiquidGlass {
  constructor(element, options = {}) {
    if (!element) {
      throw new Error("LiquidGlass requires a valid DOM element");
    }

    this.element = element;
    this.options = {
      // Inner shadow settings
      shadowOffset: options.shadowOffset || "0px",
      shadowBlur: options.shadowBlur || "20px",
      shadowSpread: options.shadowSpread || "-5px",
      shadowColor: options.shadowColor || "rgba(255, 255, 255, 0.8)",

      // Glass tint
      tintColor: options.tintColor || "rgba(255, 255, 255, 0.4)",
      tintOpacity: options.tintOpacity || 0.4,

      // Frost blur
      frostBlur: options.frostBlur || "2px",

      // Noise distortion
      noiseFrequency: options.noiseFrequency || 0.008,
      distortionStrength: options.distortionStrength || 77,

      // Outer shadow
      outerShadowBlur: options.outerShadowBlur || "24px",
      outerShadowColor: options.outerShadowColor || "rgba(0, 0, 0, 0.2)",

      // Border radius
      borderRadius: options.borderRadius || "20px",

      // Draggable
      draggable: options.draggable || false,
    };

    this.svgFilterId = `glass-distortion-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    this.init();
  }

  init() {
    // Add CSS class
    this.element.classList.add("liquid-glass");

    // Create and inject SVG filter
    this.createSVGFilter();

    // Apply styles
    this.applyStyles();

    // Setup draggable if enabled
    if (this.options.draggable) {
      this.makeDraggable();
    }
  }

  createSVGFilter() {
    // Check if SVG container exists, if not create it
    let svgContainer = document.getElementById("liquid-glass-svg-filters");

    if (!svgContainer) {
      svgContainer = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgContainer.setAttribute("id", "liquid-glass-svg-filters");
      svgContainer.style.position = "absolute";
      svgContainer.style.width = "0";
      svgContainer.style.height = "0";
      document.body.appendChild(svgContainer);
    }

    // Create filter
    const filter = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "filter"
    );
    filter.setAttribute("id", this.svgFilterId);
    filter.setAttribute("x", "0%");
    filter.setAttribute("y", "0%");
    filter.setAttribute("width", "100%");
    filter.setAttribute("height", "100%");

    // Create turbulence
    const turbulence = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "feTurbulence"
    );
    turbulence.setAttribute("type", "fractalNoise");
    turbulence.setAttribute("baseFrequency", this.options.noiseFrequency);
    turbulence.setAttribute("numOctaves", "3");
    turbulence.setAttribute("result", "noise");

    // Create blur
    const blur = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "feGaussianBlur"
    );
    blur.setAttribute("in", "noise");
    blur.setAttribute("stdDeviation", "0.6");
    blur.setAttribute("result", "blurred");

    // Create displacement
    const displacement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "feDisplacementMap"
    );
    displacement.setAttribute("in", "SourceGraphic");
    displacement.setAttribute("in2", "blurred");
    displacement.setAttribute("scale", this.options.distortionStrength);
    displacement.setAttribute("xChannelSelector", "R");
    displacement.setAttribute("yChannelSelector", "G");

    filter.appendChild(turbulence);
    filter.appendChild(blur);
    filter.appendChild(displacement);
    svgContainer.appendChild(filter);

    this.svgFilter = filter;
  }

  applyStyles() {
    const el = this.element;

    // Set CSS variables
    el.style.setProperty("--shadow-offset", this.options.shadowOffset);
    el.style.setProperty("--shadow-blur", this.options.shadowBlur);
    el.style.setProperty("--shadow-spread", this.options.shadowSpread);
    el.style.setProperty("--shadow-color", this.options.shadowColor);
    el.style.setProperty("--tint-color", this.options.tintColor);
    el.style.setProperty("--frost-blur", this.options.frostBlur);
    el.style.setProperty("--outer-shadow-blur", this.options.outerShadowBlur);
    el.style.setProperty("--outer-shadow-color", this.options.outerShadowColor);
    el.style.setProperty("--border-radius", this.options.borderRadius);
    el.style.setProperty("--glass-filter-url", `url(#${this.svgFilterId})`);
  }

  makeDraggable() {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    const onMouseDown = (e) => {
      isDragging = true;
      startX = e.clientX || e.touches?.[0]?.clientX;
      startY = e.clientY || e.touches?.[0]?.clientY;

      const rect = this.element.getBoundingClientRect();
      initialX = rect.left;
      initialY = rect.top;

      this.element.style.cursor = "grabbing";
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;

      const currentX = e.clientX || e.touches?.[0]?.clientX;
      const currentY = e.clientY || e.touches?.[0]?.clientY;

      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      this.element.style.position = "absolute";
      this.element.style.left = `${initialX + deltaX}px`;
      this.element.style.top = `${initialY + deltaY}px`;
    };

    const onMouseUp = () => {
      isDragging = false;
      this.element.style.cursor = "grab";
    };

    this.element.style.cursor = "grab";
    this.element.addEventListener("mousedown", onMouseDown);
    this.element.addEventListener("touchstart", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchend", onMouseUp);

    // Store cleanup function
    this.cleanup = () => {
      this.element.removeEventListener("mousedown", onMouseDown);
      this.element.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchend", onMouseUp);
    };
  }

  // Update methods
  updateShadow({ blur, spread, color, offset } = {}) {
    if (blur !== undefined) {
      this.options.shadowBlur = blur;
      this.element.style.setProperty("--shadow-blur", blur);
    }
    if (spread !== undefined) {
      this.options.shadowSpread = spread;
      this.element.style.setProperty("--shadow-spread", spread);
    }
    if (color !== undefined) {
      this.options.shadowColor = color;
      this.element.style.setProperty("--shadow-color", color);
    }
    if (offset !== undefined) {
      this.options.shadowOffset = offset;
      this.element.style.setProperty("--shadow-offset", offset);
    }
  }

  updateTint({ color, opacity } = {}) {
    if (color !== undefined) {
      this.options.tintColor = color;
      this.element.style.setProperty("--tint-color", color);
    }
    if (opacity !== undefined) {
      this.options.tintOpacity = opacity;
      // Update the alpha channel of tint color if it's rgba
      const rgbaMatch = this.options.tintColor.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)/
      );
      if (rgbaMatch) {
        const newColor = `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${opacity})`;
        this.element.style.setProperty("--tint-color", newColor);
      }
    }
  }

  updateFrost(blur) {
    this.options.frostBlur = blur;
    this.element.style.setProperty("--frost-blur", blur);
  }

  updateDistortion({ frequency, strength } = {}) {
    if (frequency !== undefined) {
      this.options.noiseFrequency = frequency;
      const turbulence = this.svgFilter.querySelector("feTurbulence");
      if (turbulence) {
        turbulence.setAttribute("baseFrequency", frequency);
      }
    }
    if (strength !== undefined) {
      this.options.distortionStrength = strength;
      const displacement = this.svgFilter.querySelector("feDisplacementMap");
      if (displacement) {
        displacement.setAttribute("scale", strength);
      }
    }
  }

  updateOuterShadow({ blur, color } = {}) {
    if (blur !== undefined) {
      this.options.outerShadowBlur = blur;
      this.element.style.setProperty("--outer-shadow-blur", blur);
    }
    if (color !== undefined) {
      this.options.outerShadowColor = color;
      this.element.style.setProperty("--outer-shadow-color", color);
    }
  }

  destroy() {
    // Remove SVG filter
    if (this.svgFilter && this.svgFilter.parentNode) {
      this.svgFilter.parentNode.removeChild(this.svgFilter);
    }

    // Remove class
    this.element.classList.remove("liquid-glass");

    // Clean up event listeners if draggable
    if (this.cleanup) {
      this.cleanup();
    }

    // Remove inline styles
    const stylesToRemove = [
      "--shadow-offset",
      "--shadow-blur",
      "--shadow-spread",
      "--shadow-color",
      "--tint-color",
      "--frost-blur",
      "--outer-shadow-blur",
      "--outer-shadow-color",
      "--border-radius",
      "--glass-filter-url",
    ];

    stylesToRemove.forEach((prop) => {
      this.element.style.removeProperty(prop);
    });
  }
}

// Auto-inject CSS if not already present
if (typeof document !== "undefined") {
  const styleId = "liquid-glass-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .liquid-glass {
        position: relative;
        overflow: hidden;
        border-radius: var(--border-radius, 20px);
        box-shadow: 0 0 var(--outer-shadow-blur, 24px) var(--outer-shadow-color, rgba(0, 0, 0, 0.2));
      }

      .liquid-glass::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        box-shadow: inset var(--shadow-offset, 0px) var(--shadow-offset, 0px)
                    var(--shadow-blur, 20px) var(--shadow-spread, -5px)
                    var(--shadow-color, rgba(255, 255, 255, 0.8));
        background: var(--tint-color, rgba(255, 255, 255, 0.4));
        pointer-events: none;
        z-index: 1;
      }

      .liquid-glass::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        backdrop-filter: blur(var(--frost-blur, 2px));
        -webkit-backdrop-filter: blur(var(--frost-blur, 2px));
        filter: var(--glass-filter-url);
        pointer-events: none;
        z-index: 0;
      }

      .liquid-glass > * {
        position: relative;
        z-index: 2;
      }
    `;
    document.head.appendChild(style);
  }
}

export default LiquidGlass;
