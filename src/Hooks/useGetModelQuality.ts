import { useEffect, useState } from "react";
import type { ModelQualityMetric } from "../Types/types";
import { fetchProjectData } from "./fetchModelData";

const MODEL_IDS = ["bert-base-uncased", "gpt2", "distilbert-base-uncased"];

const useGetModelQuality = () => {
  const [data, setData] = useState<ModelQualityMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      const results = await Promise.all(
        MODEL_IDS.map(async (modelId) => {
          const model = await fetchProjectData(modelId);
          const scores = simulateScores(model);

          const average =
            scores.reduce((sum, score) => sum + score, 0) / scores.length;

          const pdrScores = scores.filter((s) => s <= 2);
          const pdr =
            pdrScores.length > 0
              ? pdrScores.reduce((sum, s) => sum + s, 0) / pdrScores.length
              : 0;

          return { modelId, average, pdr };
        })
      );
      setData(results);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return { data, isLoading };
};

const simulateScores = (total: number): number[] =>
  Array(5)
    .fill(0)
    .map(() => Math.floor((Math.random() * total) / 10));

export default useGetModelQuality;
