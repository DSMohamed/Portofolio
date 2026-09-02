import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = { threshold: 0.15, triggerOnce: true }
) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options.triggerOnce) {
          observer.unobserve(el);
        }
      } else if (!options.triggerOnce) {
        setIsVisible(false);
      }
    }, {
      threshold: options.threshold ?? 0.15,
      rootMargin: options.rootMargin ?? '0px',
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.triggerOnce]);

  return { elementRef, isVisible };
}
