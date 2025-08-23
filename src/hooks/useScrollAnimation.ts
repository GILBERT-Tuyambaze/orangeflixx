import { useEffect, useState } from 'react';

export function useScrollAnimation() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-scroll-id');
          if (id && entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with scroll-fade-in class
    const elements = document.querySelectorAll('.scroll-fade-in[data-scroll-id]');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return visibleElements;
}