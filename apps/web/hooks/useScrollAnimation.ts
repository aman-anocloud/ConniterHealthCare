// useScrollAnimation — triggers 'visible' class when element enters viewport
'use client';
import { useEffect, useRef } from 'react';

export function useScrollAnimation(threshold = 0.12) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('in-view');
                    observer.unobserve(el); // fire once
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return ref;
}

// useCountUp — count up to a number when element enters view
export function useCountUp(end: number, duration = 1800) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    observer.unobserve(el);
                    let start = 0;
                    const step = end / (duration / 16);
                    const timer = setInterval(() => {
                        start = Math.min(start + step, end);
                        el.textContent = Math.floor(start).toLocaleString();
                        if (start >= end) clearInterval(timer);
                    }, 16);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [end, duration]);

    return ref;
}
