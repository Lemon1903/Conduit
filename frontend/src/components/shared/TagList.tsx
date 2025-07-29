import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface TagListProps {
  tags: Array<string>;
  shouldTruncate?: boolean;
  classNames?: {
    container?: string;
    tag?: string;
  };
}

function TagList({ tags, shouldTruncate = false, classNames }: TagListProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const [visibleCount, setVisibleCount] = useState(tags.length);
  const [measureTick, setMeasureTick] = useState(0);

  // Trigger a second measurement after tags change
  useEffect(() => {
    setMeasureTick((tick) => tick + 1);
  }, [tags]);

  useEffect(() => {
    if (!containerRef.current || !shouldTruncate) return;

    const raf = requestAnimationFrame(() => {
      const container = containerRef.current!;
      const tagElements = container.querySelectorAll("li");

      if (tagElements.length === 0) return;

      const containerWidth = container.offsetWidth;

      const plusTag = document.createElement("li");
      plusTag.className = "tag-default tag-pill tag-outline";
      plusTag.style.visibility = "hidden";
      container.appendChild(plusTag);

      let totalWidth = 0;
      let lastFitting = tags.length;

      for (let i = 0; i < tags.length; i++) {
        const tagEl = tagElements[i];
        totalWidth += tagEl.offsetWidth;

        if (totalWidth > containerWidth) {
          plusTag.textContent = `+${tags.length - i}`;

          while (totalWidth - tagEl.offsetWidth + plusTag.offsetWidth > containerWidth) {
            totalWidth -= tagElements[i - 1].offsetWidth;
            i--;
          }

          lastFitting = i;
          break;
        }
      }

      container.removeChild(plusTag);
      setVisibleCount(lastFitting);
    });

    return () => cancelAnimationFrame(raf);
  }, [tags, shouldTruncate, measureTick]);

  const hiddenCount = tags.length - visibleCount;

  return (
    <ul ref={containerRef} className={cn("tag-list !max-w-none", classNames?.container)}>
      {tags.slice(0, visibleCount + 1).map((tag, idx) =>
        idx === visibleCount && hiddenCount > 0 ? (
          <li
            key={`plus-${hiddenCount}`}
            className={cn("tag-default tag-pill tag-outline", classNames?.tag)}
          >
            +{hiddenCount}
          </li>
        ) : (
          <li key={tag} className={cn("tag-default tag-pill tag-outline", classNames?.tag)}>
            {tag}
          </li>
        ),
      )}
    </ul>
  );
}

export default TagList;
