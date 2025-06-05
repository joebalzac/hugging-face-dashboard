import { useEffect, useState } from "react";
import type { HuggingFaceAPIModel, TrendingModel } from "../Types/types";

const useSearchModels = (query: string) => {
  const [models, setModels] = useState<TrendingModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchSearch = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://huggingface.co/api/models?search=${query}`
        );
        const data = await res.json();

        const mapped: TrendingModel[] = (data as HuggingFaceAPIModel[]).map(
          (model) => ({
            modelId: model.id,
            downloads: model.downloads ?? 0,
            likes: model.likes ?? 0,
            lastModified: model.lastModified,
            tags: model.tags ?? [],
          })
        );
      } catch (err) {
        if (err) {
          console.log("an unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };
  });

  return;
};

export default useSearchModels;
