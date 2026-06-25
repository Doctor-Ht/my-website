export interface BiologyTopic {
  name: string;
  slug: string;
  children?: BiologyTopic[];
  icon?: string;
}

export const biologyTopics: BiologyTopic[] = [
  {
    name: "分子生物学",
    slug: "molecular-biology",
    icon: "🧬",
    children: [
      { name: "DNA 复制", slug: "dna-replication" },
      { name: "转录与 RNA", slug: "transcription" },
      { name: "翻译与蛋白质", slug: "translation" },
      { name: "基因表达调控", slug: "gene-regulation" },
    ],
  },
  {
    name: "遗传学",
    slug: "genetics",
    icon: "🧫",
    children: [
      { name: "孟德尔遗传", slug: "mendelian-genetics" },
      { name: "染色体与连锁", slug: "chromosomes" },
      { name: "群体遗传学", slug: "population-genetics" },
      { name: "表观遗传学", slug: "epigenetics" },
    ],
  },
  {
    name: "生物技术",
    slug: "biotechnology",
    icon: "🔬",
    children: [
      { name: "CRISPR-Cas9", slug: "crispr" },
      { name: "PCR 技术", slug: "pcr" },
      { name: "基因测序", slug: "sequencing" },
      { name: "克隆与载体", slug: "cloning" },
    ],
  },
  {
    name: "细胞生物学",
    slug: "cell-biology",
    icon: "🦠",
    children: [
      { name: "细胞膜与运输", slug: "cell-membrane" },
      { name: "细胞信号转导", slug: "signal-transduction" },
      { name: "细胞周期与分裂", slug: "cell-cycle" },
      { name: "细胞凋亡", slug: "apoptosis" },
    ],
  },
  {
    name: "生态与进化",
    slug: "ecology-evolution",
    icon: "🌿",
    children: [
      { name: "自然选择", slug: "natural-selection" },
      { name: "物种形成", slug: "speciation" },
      { name: "生态系统", slug: "ecosystem" },
    ],
  },
];

export function getBiologyTopic(slug: string): BiologyTopic | undefined {
  for (const topic of biologyTopics) {
    if (topic.slug === slug) return topic;
    if (topic.children) {
      const child = topic.children.find((c) => c.slug === slug);
      if (child) return child;
    }
  }
  return undefined;
}
