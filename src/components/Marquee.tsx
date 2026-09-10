import { Fragment } from "react";

/** CSS-only infinite marquee. Children are rendered twice and the track is
 * translated -50%, so the loop is seamless with no JS and no layout reads.
 *
 * `repeat` is how many copies go inside each of those two groups: the loop only
 * looks continuous while one group is at least as wide as the screen, so a
 * short line (a wordmark, say) needs repeating on wide monitors or a gap sails
 * past. `duration` is the time for one copy to cross, so the speed stays put
 * however many copies there are. */
export default function Marquee({
  children,
  duration = "40s",
  repeat = 1,
  className = "",
}: {
  children: React.ReactNode;
  duration?: string;
  repeat?: number;
  className?: string;
}) {
  /** `display: contents` keeps the layout identical to a bare Fragment while
   * giving the duplicate copies something to hang aria-hidden on — a screen
   * reader should hear the line once, not once per copy. */
  const group = (exposed: boolean) =>
    Array.from({ length: repeat }, (_, i) => (
      <Fragment key={i}>
        {exposed && i === 0 ? (
          children
        ) : (
          <span aria-hidden className="contents">
            {children}
          </span>
        )}
      </Fragment>
    ));

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        style={
          {
            "--marquee-duration": `${parseFloat(duration) * repeat}s`,
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{group(true)}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {group(false)}
        </div>
      </div>
    </div>
  );
}
