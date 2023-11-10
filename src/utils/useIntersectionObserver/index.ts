import React, { useEffect } from "react";

interface IUseIntersectionObserverProps {
  target: React.MutableRefObject<HTMLElement | null>;
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
  root?: React.MutableRefObject<HTMLElement | null>;
  rootMargin?: string;
}

function useIntersectionObserver({
  enabled = true,
  onIntersect,
  root,
  rootMargin = "-300px",
  target,
  threshold = 0.1,
}: IUseIntersectionObserverProps) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [target.current, enabled]);
}

export { useIntersectionObserver };
