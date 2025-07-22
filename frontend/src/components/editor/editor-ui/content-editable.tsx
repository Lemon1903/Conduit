import { ContentEditable as LexicalContentEditable } from "@lexical/react/LexicalContentEditable";
import { type JSX } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  placeholder: string;
  className?: string;
  placeholderClassName?: string;
  editable?: boolean;
}

export function ContentEditable({
  placeholder,
  className,
  placeholderClassName,
  editable = true,
  ...props
}: Props): JSX.Element {
  return (
    <LexicalContentEditable
      className={
        className ??
        "ContentEditable__root relative block min-h-72 overflow-auto" +
          (editable ? " px-8 py-4" : "") +
          " focus:outline-none"
      }
      aria-placeholder={placeholder}
      placeholder={
        <div
          className={
            placeholderClassName ??
            `text-muted-foreground pointer-events-none absolute top-0 left-0 overflow-hidden px-8 py-[18px] text-ellipsis select-none`
          }
        >
          {placeholder}
        </div>
      }
      {...props}
    />
  );
}
