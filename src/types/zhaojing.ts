export type SourceType =
  | "selected-md"
  | "pdf-catalog"
  | "manual-analysis"
  | "ai-assisted"
  | "unknown";

export type VerificationStatus = "draft" | "needs-verification" | "verified";

export type SourceRef = {
  sourceType: SourceType;
  sourceName: string;
  catalogNos?: number[];
  originalTitle?: string;
  note?: string;
  verificationStatus: VerificationStatus;
};

export type Dynasty = {
  id: string;
  name: string;
  englishName: string;
  periodLabel: string;
  order: number;
  summary: string;
  themeColor: string;
  coverImage?: string;
  visualKeywords: string[];
  sourceRefs: SourceRef[];
};

export type WorkImages = {
  original: string;
  thumbnail: string;
  alt: string;
  credit?: string;
  license?: string;
};

export type PaletteColorRole =
  | "primary"
  | "secondary"
  | "accent"
  | "background"
  | "line";

export type PaletteColor = {
  id: string;
  name: string;
  hex: string;
  role: PaletteColorRole;
  semanticNote: string;
  usageSuggestion: string;
};

export type PaletteGroup = {
  id: string;
  title: string;
  description: string;
  colors: PaletteColor[];
};

export type PatternAnnotation = {
  id: string;
  name: string;
  category: "center" | "border" | "corner" | "figure" | "geometry" | "other";
  description: string;
  culturalMeaning: string;
  designTranslation: string;
};

export type ColorHotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  colorId: string;
  note: string;
};

export type PatternHotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  patternId: string;
  note: string;
};

export type GeneCard = {
  title: string;
  structureKeywords: string[];
  patternKeywords: string[];
  colorKeywords: string[];
  culturalKeywords: string[];
  designSuggestions: string[];
};

export type CatalogEntry = {
  id: string;
  dynastyId: string;
  workId: string;
  catalogNos: number[];
  sourceName: string;
  title: string;
};

export type Work = {
  id: string;
  dynastyId: string;
  title: string;
  shortTitle: string;
  cave: string;
  location: string;
  periodLabel: string;
  catalogNos: number[];
  isFeatured: boolean;
  oneLineSummary: string;
  description: string;
  images: WorkImages;
  tags: string[];
  motifs: string[];
  palettes: PaletteGroup[];
  patterns: PatternAnnotation[];
  colorHotspots: ColorHotspot[];
  patternHotspots: PatternHotspot[];
  geneCard: GeneCard | null;
  sourceRefs: SourceRef[];
};
