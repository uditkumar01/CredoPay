import { useRef } from "react";

export interface IScrollToProps {
  scrollToId: string;
  children: React.ReactNode;
  focus?: boolean;
}
export function ScrollTo({
  children,
  scrollToId,
  focus,
}: IScrollToProps): JSX.Element {
  const prevTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const onClickScrollTo = (): void => {
    const scrollToEl = document.getElementById(scrollToId);
    if (!scrollToEl) return;
    // scroll to element with top offset 100px
    scrollToEl.scrollIntoView({
      behavior: "smooth", // smooth scroll
      block: "center", // "center" vertical alignment
      inline: "center", // "center" horizontal alignment
    });
    if (!focus) return;
    // add border to the element
    scrollToEl.classList.add("transition-all", "duration-200", "ease-in-out");
    scrollToEl.setAttribute(
      "style",
      "animation: focus-ring-animate 1s ease-in-out; border-radius: 0.2rem;"
    );

    if (prevTimeoutId.current) clearTimeout(prevTimeoutId.current);

    prevTimeoutId.current = setTimeout(() => {
      scrollToEl.removeAttribute("style");
    }, 1000);
  };
  return (
    <div className="cursor-pointer" onClick={onClickScrollTo}>
      {children}
    </div>
  );
}
