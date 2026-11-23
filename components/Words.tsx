import { Fragment } from "react";

type Props = {
  text: string;
  /** Extra classes for the moving inner span (e.g. "hero-word"). */
  innerClass?: string;
};

/**
 * Splits text into masked words. Each word sits in an overflow-hidden wrapper
 * (.word) so the inner span can slide up into view. Server-renderable.
 */
export function Words({ text, innerClass = "" }: Props) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="word">
            <span className={`word-inner ${innerClass}`}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
