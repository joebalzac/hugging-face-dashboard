export interface ProjectData {
  modelId: string;
  downloads: string[];
}

export interface ModelQualityMetric {
  modelId: string;
  average: number;
  pdr: number;
}
