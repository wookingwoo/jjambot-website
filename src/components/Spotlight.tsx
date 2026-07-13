import { type HTMLAttributes, type MouseEvent } from "react";

/** 커서를 따라 라디얼 글로우가 움직이는 카드 래퍼 (.spot) */
export default function Spotlight({
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLElement>) {
  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <article className={`spot ${className}`} onMouseMove={onMouseMove} {...rest}>
      {children}
    </article>
  );
}
