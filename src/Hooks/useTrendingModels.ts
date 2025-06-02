import { useEffect, useState } from "react";

export interface TrendingModel {
  modelId: string;
  downloads: number;
  likes: number;
  lastModified: string;
  tags: string[];
}

interface HuggingFaceAPIModel {
  id: string;
  downloads?: number;
  likes?: number;
  lastModified: string;
  tags?: string[];
}

const useTrendingModels = () => {
  const [models, setModels] = useState<TrendingModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        "https://huggingface.co/api/models?sort=downloads&limit=20"
      );
      const data: HuggingFaceAPIModel[] = await res.json();
      console.log("big data", data);

      const mapped: TrendingModel[] = data.map((model) => ({
        modelId: model.id,
        downloads: model.downloads ?? 0,
        likes: model.likes ?? 0,
        lastModified: model.lastModified ?? "",
        tags: model.tags ?? [],
      }));

      setModels(mapped);
    } catch {
      console.log("unable to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return { models, isLoading };
};

export default useTrendingModels;
