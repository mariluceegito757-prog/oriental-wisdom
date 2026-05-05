import type { MDXComponents } from "mdx/types";
import { GlossaryTooltip } from "@/components/chinese-culture/glossary-tooltip";
import { PinyinBadge } from "@/components/chinese-culture/pinyin-badge";

export const MdxComponents: MDXComponents = {
  GlossaryTooltip,
  PinyinBadge,
  h1: ({ children, ...props }) => (
    <h1 className="mt-10 mb-4 font-serif text-3xl font-bold text-ink" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="mt-8 mb-3 font-serif text-2xl font-bold text-ink" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-6 mb-2 font-serif text-xl font-semibold text-ink" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="my-4 leading-relaxed text-ink-muted" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }) => {
    const isExternal = typeof href === "string" && (href.startsWith("http://") || href.startsWith("https://"));
    return (
      <a
        href={href}
        className="text-vermilion underline decoration-vermilion/30 underline-offset-2 transition-colors hover:decoration-vermilion"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: ({ children, ...props }) => (
    <ul className="my-4 list-disc space-y-1 pl-6 text-ink-muted" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-4 list-decimal space-y-1 pl-6 text-ink-muted" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 border-l-4 border-vermilion/30 bg-ink/3 px-6 py-4 rounded-r-lg italic text-ink-light"
      {...props}
    >
      {children}
    </blockquote>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-ink" {...props}>
      {children}
    </strong>
  ),
  code: ({ children, ...props }) => (
    <code
      className="rounded bg-ink/8 px-1.5 py-0.5 text-sm text-vermilion-dark"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg bg-ink p-4 text-sm text-paper"
      tabIndex={0}
      {...props}
    >
      {children}
    </pre>
  ),
  img: ({ src, alt, ...props }) => (
    <img
      src={src}
      alt={alt ?? ""}
      className="my-6 rounded-lg max-w-full h-auto"
      loading="lazy"
      {...props}
    />
  ),
  hr: (props) => (
    <hr className="my-8 border-ink/12" {...props} />
  ),
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      scope="col"
      className="border border-ink/12 bg-ink/5 px-4 py-2 text-left font-semibold text-ink"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="border border-ink/12 px-4 py-2 text-ink-muted"
      {...props}
    >
      {children}
    </td>
  ),
};
