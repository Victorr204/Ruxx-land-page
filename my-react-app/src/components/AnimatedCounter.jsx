import { useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

export default function AnimatedCounter({ end, duration = 2000, suffix = "", prefix = "" }) {
  const [ref, isInView] = useInView();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
