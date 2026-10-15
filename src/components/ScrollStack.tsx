import React, { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export interface ScrollStackItemProps {
  children: React.ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
}) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

export interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 50,
  itemScale = 0.025,
  itemStackDistance = 20,
  stackPosition = '12%',
  scaleEndPosition = '6%',
  baseScale = 0.90,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
}) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const initialTopsRef = useRef<number[]>([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    if (end === start) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return typeof value === 'number' ? value : parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0,
        containerHeight: window.innerHeight || 800,
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 800,
      };
    }
  }, [useWindowScroll]);

  // Measures true un-transformed natural layout tops using offsetTop
  const updateInitialTops = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const currentScrollY = window.scrollY || window.pageYOffset || 0;
    const containerTop = scrollerRect.top + currentScrollY;

    // card.offsetTop is relative to scroller/inner and NEVER affected by CSS transform
    initialTopsRef.current = cardsRef.current.map((card) => {
      let offsetTop = card.offsetTop;
      let parent = card.offsetParent as HTMLElement | null;
      while (parent && parent !== scroller && scroller.contains(parent)) {
        offsetTop += parent.offsetTop;
        parent = parent.offsetParent as HTMLElement | null;
      }
      return containerTop + offsetTop;
    });
  }, []);

  const updateCardTransforms = useCallback((currentScrollTop?: number) => {
    const cards = cardsRef.current;
    const totalCards = cards.length;
    if (!totalCards || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const scrollTop = currentScrollTop !== undefined
      ? currentScrollTop
      : (window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0);
    const containerHeight = window.innerHeight || 800;

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    // Ensure we have accurate natural tops
    if (initialTopsRef.current.length !== totalCards || initialTopsRef.current[0] === undefined) {
      updateInitialTops();
    }

    // Unified pinEnd: all cards stay in the stack until the LAST card has arrived + hold distance
    const lastCardTop = initialTopsRef.current[totalCards - 1] || 0;
    const lastCardPinStart = lastCardTop - stackPositionPx - itemStackDistance * (totalCards - 1);
    const deckHoldDistance = Math.min(160, Math.max(80, containerHeight * 0.2));
    const unifiedPinEnd = lastCardPinStart + deckHoldDistance;

    cards.forEach((card, i) => {
      if (!card) return;

      const cardTop = initialTopsRef.current[i] || 0;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = unifiedPinEnd;

      // Scale progress: scales slightly down as subsequent cards arrive
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < totalCards; j++) {
          const jCardTop = initialTopsRef.current[j] || 0;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      // Smooth floating-point GPU transform with no rounding deadbands
      const transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotate(${rotation}deg)`;
      const filter = blur > 0 ? `blur(${blur.toFixed(1)}px)` : '';

      if (card.style.transform !== transform) {
        card.style.transform = transform;
      }
      if (filter && card.style.filter !== filter) {
        card.style.filter = filter;
      } else if (!filter && card.style.filter) {
        card.style.filter = '';
      }

      if (i === totalCards - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    updateInitialTops,
  ]);

  const setupLenis = useCallback(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: isMobile ? 1 : 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Direct synchronous lockstep RAF loop:
    // Both Lenis scroll and card transforms update in the exact same frame with zero delay!
    const raf = (time: number) => {
      lenis.raf(time);
      updateCardTransforms(lenis.scroll);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    return lenis;
  }, [updateCardTransforms]);

  const lastWidthRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);

  const handleResize = useCallback(() => {
    const currentWidth = window.innerWidth;
    const widthChanged = Math.abs(currentWidth - lastWidthRef.current) > 10;

    // Only recalculate initial tops if screen width actually changed,
    // ignoring vertical height changes caused by mobile address bar collapse
    if (widthChanged) {
      lastWidthRef.current = currentWidth;
      updateInitialTops();
    }
    const currentScroll = lenisRef.current ? lenisRef.current.scroll : window.scrollY;
    updateCardTransforms(currentScroll);
  }, [updateInitialTops, updateCardTransforms]);

  useLayoutEffect(() => {
    const cards = Array.from(
      document.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];

    cardsRef.current = cards;

    cards.forEach((card, i) => {
      card.style.zIndex = `${i + 1}`;
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
    });

    updateInitialTops();

    setupLenis();

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      initialTopsRef.current = [];
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    setupLenis,
    updateInitialTops,
    updateCardTransforms,
    handleResize,
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;