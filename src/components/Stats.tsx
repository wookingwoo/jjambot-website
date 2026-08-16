import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 19, suffix: "종", label: "활용 국방부 공공데이터" },
  { value: 73000, suffix: "+", label: "군 생활 정보" },
  { value: 2, suffix: "가지", label: "서비스 채널" },
  { value: 24, suffix: "시간", label: "실시간 응답" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(value * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="stat-value">
      {display.toLocaleString()}
      <em>{suffix}</em>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <Reveal>
          <div className="stats-grid">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <CountUp value={s.value} suffix={s.suffix} />
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
