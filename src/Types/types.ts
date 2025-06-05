export interface ProjectData {
  modelId: string;
  downloads: string[];
}

export interface ModelQualityMetric {
  modelId: string;
  average: number;
  pdr: number;
}

export interface TrendingModel {
  modelId: string;
  downloads: number;
  likes: number;
  lastModified: string;
  tags: string[];
}

export interface HuggingFaceAPIModel {
  id: string;
  downloads?: number;
  likes?: number;
  lastModified: string;
  tags?: string[];
}
