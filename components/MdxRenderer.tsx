import { MDXRemote } from "next-mdx-remote/rsc";
import Callout from "@/components/mdx/Callout";
import DefinitionBox from "@/components/mdx/DefinitionBox";
import ConceptCard from "@/components/mdx/ConceptCard";

interface MdxRendererProps {
  source: string;
}

const components = {
  Callout,
  DefinitionBox,
  ConceptCard,
};

export default function MdxRenderer({ source }: MdxRendererProps) {
  return (
    <div className="prose-apple" id="article-body">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
