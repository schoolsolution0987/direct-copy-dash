import { useRef, useState, useEffect, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Netflix-style horizontal row: snap scrolling, edge fades and hover arrows.
 */
const RowSlider = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = () => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    return () => el.removeEventListener("scroll", sync);
  }, []);

  const page = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.85, 320), behavior: "smooth" });
  };

  return (
    <div className="group/row relative">
      {!atStart && (
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => page(-1)}
          className="absolute left-0 top-1/2 z-20 -translate-y-1/2 h-11 w-11 rounded-full bg-black/70 border border-white/15 text-white flex items-center justify-center opacity-0 transition-opacity group-hover/row:opacity-100 hover:bg-black/90"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      {!atEnd && (
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => page(1)}
          className="absolute right-0 top-1/2 z-20 -translate-y-1/2 h-11 w-11 rounded-full bg-black/70 border border-white/15 text-white flex items-center justify-center opacity-0 transition-opacity group-hover/row:opacity-100 hover:bg-black/90"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
};

export default RowSlider;
