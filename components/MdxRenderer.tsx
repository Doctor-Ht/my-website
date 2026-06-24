import { MDXRemote } from "next-mdx-remote/rsc";

interface MdxRendererProps {
  source: string;
}

export default function MdxRenderer({ source }: MdxRendererProps) {
  return (
    <div className="prose-apple">
      <MDXRemote source={source} />
    </div>
  );
}
