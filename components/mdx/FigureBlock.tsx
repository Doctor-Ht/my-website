interface FigureBlockProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  number?: number;
}

export default function FigureBlock({
  src,
  alt,
  caption,
  credit,
  number,
}: FigureBlockProps) {
  return (
    <figure className="my-8 not-prose">
      <div className="card-glass overflow-hidden rounded-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
      {(caption || credit || number) && (
        <figcaption className="mt-3 text-center text-sm text-[var(--color-text-tertiary)] leading-relaxed">
          {number && (
            <span className="font-semibold text-[var(--color-accent)] mr-2">
              图 {number}
            </span>
          )}
          {caption && <span>{caption}</span>}
          {credit && (
            <span className="block mt-1 text-xs text-[var(--color-text-tertiary)] opacity-70">
              图片来源: {credit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
