import { MDXRemote } from "next-mdx-remote/rsc";
import Callout from "@/components/mdx/Callout";
import DefinitionBox from "@/components/mdx/DefinitionBox";
import ConceptCard from "@/components/mdx/ConceptCard";
import FigureBlock from "@/components/mdx/FigureBlock";
import KeyInsight from "@/components/mdx/KeyInsight";
import MethodsSummary from "@/components/mdx/MethodsSummary";
import ComparisonTable from "@/components/mdx/ComparisonTable";
import InfoCard from "@/components/mdx/InfoCard";
import { H2, H3 } from "@/components/mdx/Heading";

interface MdxRendererProps {
  source: string;
}

const components = {
  h2: H2,
  h3: H3,
  Callout,
  DefinitionBox,
  ConceptCard,
  FigureBlock,
  KeyInsight,
  MethodsSummary,
  ComparisonTable,
  InfoCard,
};

export default function MdxRenderer({ source }: MdxRendererProps) {
  return (
    <div className="prose-apple" id="article-body">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
