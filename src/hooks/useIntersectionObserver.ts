import React, { useRef, useState, useEffect } from 'react';

export const useIntersectionObserver = <T extends HTMLElement = HTMLDivElement>(
  props: { once?: boolean; margin?: number } = {}
): [React.RefObject<T>, boolean] => {
  const defaults = {
    margin: 200,
    once: true,
  };
  const targetRef = useRef<T>(null);
  const [isIntersected, setIsIntersected] = useState(false);
  const once = props.once ?? defaults.once;
  const margin = props.margin ?? defaults.margin;

  useEffect(() => {
    if (!targetRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      changes => {
        changes.forEach(change => {
          setIsIntersected(change.isIntersecting);

          if (change.isIntersecting && once) {
            observer.disconnect();
          }
        });
      },
      { rootMargin: `0px 0px -${margin}px` }
    );

    const handleScroll = () => {
      if (!targetRef?.current) {
        return;
      }

      observer.observe(targetRef?.current);
      window.removeEventListener('scroll', handleScroll);
    };
    window.addEventListener('scroll', handleScroll);

    return () => observer.disconnect();
  }, [margin, once]);

  return [targetRef, isIntersected];
};
