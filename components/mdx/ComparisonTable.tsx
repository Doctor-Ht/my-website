interface ComparisonTableProps {
  headers?: string[];
  rows?: string[][];
}

export default function ComparisonTable({ headers = [], rows = [] }: ComparisonTableProps) {
  if (!headers.length || !rows.length) {
    return (
      <div className="my-8 not-prose p-4 text-center text-sm text-[var(--color-text-tertiary)] border border-dashed border-[var(--color-border-light)] rounded-xl">
        表格数据为空
      </div>
    );
  }
  return (
    <div className="my-8 not-prose overflow-x-auto rounded-xl border border-[var(--glass-border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--glass-bg-strong)]">
            {headers.map((h, i) => (
              <th
                key={i}
                className={`px-4 py-3 text-left font-semibold text-[var(--color-text)] ${
                  i === 0 ? "rounded-tl-xl" : ""
                } ${i === headers.length - 1 ? "rounded-tr-xl" : ""}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={`border-t border-[var(--glass-border)] transition-colors hover:bg-[var(--glass-bg)] ${
                ri % 2 === 1 ? "bg-[var(--color-bg-secondary)]/30" : ""
              }`}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-4 py-3 text-[var(--color-text-secondary)] leading-relaxed ${
                    ci === 0 ? "font-medium text-[var(--color-text)]" : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
