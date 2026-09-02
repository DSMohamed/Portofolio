import React, { useEffect, useRef, useState, useCallback } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface LiquidRevealProps {
  baseImageSrc?: string;
  chromeImageSrc?: string;
  className?: string;
  onPointerActive?: (isActive: boolean) => void;
}

interface TrailNode {
  x: number;
  y: number;
  radius: number;
  targetRadius: number;
  opacity: number;
}

const TRAIL_LENGTH = 6;
const BASE_RADIUS = 85;
const MAX_RADIUS = 145;
const IDLE_TIMEOUT_MS = 1000;

export const LiquidReveal: React.FC<LiquidRevealProps> = ({
  baseImageSrc = '/base.png',
  chromeImageSrc = '/chrome.png',
  className = '',
  onPointerActive,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const topLayerRef = useRef<HTMLDivElement | null>(null);
  const chromaticRedRef = useRef<HTMLDivElement | null>(null);
  const chromaticBlueRef = useRef<HTMLDivElement | null>(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const [imagesLoaded, setImagesLoaded] = useState({ base: false, chrome: false });
  const [isInteracting, setIsInteracting] = useState(false);

  // Animation state stored in refs to prevent React re-renders during 60fps RAF loop
  const animState = useRef({
    pointerX: 0,
    pointerY: 0,
    prevPointerX: 0,
    prevPointerY: 0,
    isPointerInside: false,
    lastMoveTime: 0,
    idleStartTime: 0,
    width: 1200,
    height: 800,
    rafId: 0,
    trail: Array.from({ length: TRAIL_LENGTH }, () => ({
      x: 600,
      y: 400,
      radius: BASE_RADIUS,
      targetRadius: BASE_RADIUS,
      opacity: 1,
    })) as TrailNode[],
  });

  // Handle image load tracking
  const handleBaseLoad = () => setImagesLoaded(prev => ({ ...prev, base: true }));
  const handleChromeLoad = () => setImagesLoaded(prev => ({ ...prev, chrome: true }));

  // Pointer move handler (supports mouse, pen, and touch seamlessly)
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const state = animState.current;
    state.pointerX = x;
    state.pointerY = y;
    state.isPointerInside = true;
    state.lastMoveTime = performance.now();

    if (!isInteracting) {
      setIsInteracting(true);
      onPointerActive?.(true);
    }
  }, [prefersReducedMotion, isInteracting, onPointerActive]);

  const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const state = animState.current;
    state.pointerX = e.clientX - rect.left;
    state.pointerY = e.clientY - rect.top;
    state.prevPointerX = state.pointerX;
    state.prevPointerY = state.pointerY;
    state.isPointerInside = true;
    state.lastMoveTime = performance.now();

    setIsInteracting(true);
    onPointerActive?.(true);
  }, [prefersReducedMotion, onPointerActive]);

  const handlePointerLeave = useCallback(() => {
    const state = animState.current;
    state.isPointerInside = false;
    state.lastMoveTime = performance.now() - (IDLE_TIMEOUT_MS * 0.8);
    setIsInteracting(false);
    onPointerActive?.(false);
  }, [onPointerActive]);

  // Main animation loop
  useEffect(() => {
    if (prefersReducedMotion) {
      // Clean up masks if reduced motion is enabled
      if (topLayerRef.current) {
        topLayerRef.current.style.maskImage = 'none';
        topLayerRef.current.style.webkitMaskImage = 'none';
      }
      return;
    }

    const updateContainerDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        animState.current.width = rect.width || window.innerWidth;
        animState.current.height = rect.height || window.innerHeight;
      }
    };

    updateContainerDimensions();
    window.addEventListener('resize', updateContainerDimensions);

    // Initial center coordinate setup
    const state = animState.current;
    const initX = state.width * 0.5;
    const initY = state.height * 0.42;
    state.pointerX = initX;
    state.pointerY = initY;
    state.prevPointerX = initX;
    state.prevPointerY = initY;
    state.lastMoveTime = 0;
    state.idleStartTime = performance.now();
    state.trail.forEach(node => {
      node.x = initX;
      node.y = initY;
      node.radius = BASE_RADIUS;
      node.targetRadius = BASE_RADIUS;
    });

    const animate = (now: number) => {
      const timeSec = now * 0.001;
      const { width, height } = state;
      const timeSinceMove = now - state.lastMoveTime;
      const isIdle = !state.isPointerInside || timeSinceMove > IDLE_TIMEOUT_MS;

      let targetX = state.pointerX;
      let targetY = state.pointerY;
      let targetRadius = BASE_RADIUS;

      if (isIdle) {
        // Slow cinematic organic Lissajous drift curve when idle
        const t = (now - state.idleStartTime) * 0.0009;
        const centerX = width * 0.5;
        const centerY = height * 0.42; // Focal point around the face/helmet center

        const driftRangeX = Math.min(width * 0.16, 140);
        const driftRangeY = Math.min(height * 0.12, 100);

        targetX = centerX + Math.sin(t * 0.9) * driftRangeX + Math.cos(t * 1.7) * (driftRangeX * 0.35);
        targetY = centerY + Math.cos(t * 0.8) * driftRangeY + Math.sin(t * 1.5) * (driftRangeY * 0.4);

        targetRadius = BASE_RADIUS * 0.95 + Math.sin(t * 2.2) * 12;
      } else {
        // Active pointer calculation with momentum
        const dx = state.pointerX - state.prevPointerX;
        const dy = state.pointerY - state.prevPointerY;
        const speed = Math.sqrt(dx * dx + dy * dy);

        // Dynamic radius scales with pointer speed
        targetRadius = Math.min(MAX_RADIUS, BASE_RADIUS + speed * 1.4);

        // Store current pointer as previous for next delta calculation
        state.prevPointerX = state.pointerX;
        state.prevPointerY = state.pointerY;
      }

      // 1. Lerp lead node toward target
      const lead = state.trail[0];
      const leadLerp = isIdle ? 0.05 : 0.22;
      lead.x += (targetX - lead.x) * leadLerp;
      lead.y += (targetY - lead.y) * leadLerp;
      lead.targetRadius = targetRadius;
      lead.radius += (lead.targetRadius - lead.radius) * 0.18;

      // 2. Progressive lerp for trailing liquid nodes
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const prev = state.trail[i - 1];
        const curr = state.trail[i];

        // Fluid organic sinusoidal ripple along the tail
        const waveX = Math.sin(timeSec * 4.2 + i * 1.1) * (2.8 * (i / TRAIL_LENGTH));
        const waveY = Math.cos(timeSec * 3.8 + i * 0.9) * (2.8 * (i / TRAIL_LENGTH));

        const followLerp = isIdle ? 0.09 : 0.32;
        curr.x += (prev.x + waveX - curr.x) * followLerp;
        curr.y += (prev.y + waveY - curr.y) * followLerp;

        // Radius tapers along the tail
        const scaleFactor = Math.max(0.2, 1 - (i / TRAIL_LENGTH) * 0.72);
        curr.targetRadius = lead.radius * scaleFactor;
        curr.radius += (curr.targetRadius - curr.radius) * 0.16;
      }

      // 3. Build CSS radial gradient mask strings
      // We create multi-stop radial gradient masks to progressively erase the top base layer
      const maskGradients: string[] = [];
      const fringeGradients: string[] = [];

      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const node = state.trail[i];
        const r = Math.max(4, node.radius);
        
        // Liquid soft falloff stops:
        // Center is fully transparent (erases base, shows chrome underneath)
        // Edge transitions smoothly to black (base image remains visible)
        const rCore = (r * 0.75).toFixed(1);
        const rMid = (r * 1.05).toFixed(1);
        const rSoft = (r + 26).toFixed(1);
        const rEnd = (r + 58).toFixed(1);

        const x = node.x.toFixed(1);
        const y = node.y.toFixed(1);

        maskGradients.push(
          `radial-gradient(circle at ${x}px ${y}px, transparent 0px, transparent ${rCore}px, rgba(0, 0, 0, 0.25) ${rMid}px, rgba(0, 0, 0, 0.75) ${rSoft}px, black ${rEnd}px)`
        );

        // Chromatic fringe ring gradient (visible mainly around primary nodes)
        if (i < 3) {
          const ringInner = Math.max(0, r - 6).toFixed(1);
          const ringCore = r.toFixed(1);
          const ringOuter = (r + 9).toFixed(1);
          const ringFade = (r + 20).toFixed(1);

          fringeGradients.push(
            `radial-gradient(circle at ${x}px ${y}px, transparent 0px, transparent ${ringInner}px, black ${ringCore}px, black ${ringOuter}px, transparent ${ringFade}px)`
          );
        }
      }

      const maskValue = maskGradients.join(', ');
      const fringeMaskValue = fringeGradients.join(', ');

      // 4. Update top base layer mask directly in DOM for smooth 60fps
      if (topLayerRef.current) {
        topLayerRef.current.style.webkitMaskImage = maskValue;
        topLayerRef.current.style.maskImage = maskValue;
        topLayerRef.current.style.webkitMaskComposite = 'destination-in';
        topLayerRef.current.style.maskComposite = 'intersect';
      }

      // 5. Update chromatic aberration fringe layers
      if (chromaticRedRef.current) {
        chromaticRedRef.current.style.webkitMaskImage = fringeMaskValue;
        chromaticRedRef.current.style.maskImage = fringeMaskValue;
        chromaticRedRef.current.style.webkitMaskComposite = 'source-over';
        chromaticRedRef.current.style.maskComposite = 'add';
      }

      if (chromaticBlueRef.current) {
        chromaticBlueRef.current.style.webkitMaskImage = fringeMaskValue;
        chromaticBlueRef.current.style.maskImage = fringeMaskValue;
        chromaticBlueRef.current.style.webkitMaskComposite = 'source-over';
        chromaticBlueRef.current.style.maskComposite = 'add';
      }

      state.rafId = requestAnimationFrame(animate);
    };

    state.rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(state.rafId);
      window.removeEventListener('resize', updateContainerDimensions);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative w-full h-full overflow-hidden select-none touch-none ${className}`}
      style={{ touchAction: 'none' }}
      aria-label="Interactive liquid reveal portrait showcasing human and chrome helmet versions"
    >
      {/* 1. BOTTOM LAYER: Chrome Helmeted Version (Visible under the liquid tear) */}
      <div className="absolute inset-0 z-0 bg-[#08080a]">
        <img
          src={chromeImageSrc}
          alt="Mohamed Chrome Helmeted Vision"
          onLoad={handleChromeLoad}
          className={`w-full h-full object-cover object-center transition-opacity duration-700 pointer-events-none ${
            imagesLoaded.chrome ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* 2. CHROMATIC ABERRATION FRINGE: Red Channel Offset */}
      {!prefersReducedMotion && (
        <div
          ref={chromaticRedRef}
          aria-hidden="true"
          className="absolute inset-0 z-[5] pointer-events-none mix-blend-screen opacity-65 translate-x-[2px] filter drop-shadow(0 0 4px rgba(239, 68, 68, 0.4))"
        >
          <img
            src={chromeImageSrc}
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: 'hue-rotate(330deg) saturate(1.8) contrast(1.1)' }}
          />
        </div>
      )}

      {/* 3. CHROMATIC ABERRATION FRINGE: Cyan/Blue Channel Offset */}
      {!prefersReducedMotion && (
        <div
          ref={chromaticBlueRef}
          aria-hidden="true"
          className="absolute inset-0 z-[6] pointer-events-none mix-blend-screen opacity-65 -translate-x-[2px] filter drop-shadow(0 0 4px rgba(6, 182, 212, 0.4))"
        >
          <img
            src={chromeImageSrc}
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: 'hue-rotate(170deg) saturate(1.8) contrast(1.1)' }}
          />
        </div>
      )}

      {/* 4. TOP LAYER: Normal Human Portrait (Erased dynamically by CSS mask) */}
      <div
        ref={topLayerRef}
        className="absolute inset-0 z-10 pointer-events-none bg-transparent will-change-[mask-image]"
      >
        <img
          src={baseImageSrc}
          alt="Mohamed Portrait"
          onLoad={handleBaseLoad}
          className={`w-full h-full object-cover object-center transition-opacity duration-700 pointer-events-none ${
            imagesLoaded.base ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* 5. CINEMATIC GRADIENT VIGNETTE & CONTRAST EDGES */}
      <div 
        className="absolute inset-0 z-[15] pointer-events-none bg-gradient-to-t from-[#08080a] via-transparent to-[#08080a]/50"
        aria-hidden="true" 
      />
      <div 
        className="absolute inset-0 z-[15] pointer-events-none bg-gradient-to-r from-[#08080a]/70 via-transparent to-[#08080a]/70" 
        aria-hidden="true" 
      />

      {/* Interactive Liquid Cue Pill */}
      <div 
        className={`absolute bottom-6 right-6 z-[16] transition-all duration-500 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md bg-black/40 text-[11px] font-mono tracking-wider text-zinc-400 ${
          isInteracting ? 'opacity-40 translate-y-1' : 'opacity-90 translate-y-0'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span>HOVER / TOUCH TO REVEAL AUGMENTATION</span>
      </div>
    </div>
  );
};
