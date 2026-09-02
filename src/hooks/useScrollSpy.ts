import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[], offset = 120): { activeId: string; hasScrolled: boolean } {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || 'hero');
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 60);

      const elements = sectionIds
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((item): item is { id: string; el: HTMLElement } => item.el !== null);

      for (let i = elements.length - 1; i >= 0; i--) {
        const { id, el } = elements[i];
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset) {
          setActiveId(id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return { activeId, hasScrolled };
}
