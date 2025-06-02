import { useEffect, useState } from "react";

interface ModelDetails {
  modelId: string;
  author?: string;
  downloads?: number;
  likes?: number;
  tags?: string[];
  lastModified?: string;
  cardData?: {
    contributors?: string[];
  };
  siblings?: { rilename: string }[];
}

const fetchModelDetails = async (modelId: string): Promise<ModelDetails> => {
  const response = await fetch(`https://huggingface.co/api/models/${modelId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch details for model: ${modelId}`);
  }
  const data = await response.json();
  return {
    modelId: data.id,
    author: data.author,
    downloads: data.downloads,
    likes: data.likes,
    tags: data.tags,
    lastModified: data.lastModified,
    cardData: data.cardData,
    siblings: data.siblings,
  };
};

export const ModelModal = ({ modelId }: { modelId: string }) => {
  const [modelDetails, setModelDetails] = useState<ModelDetails | null>(null);

  useEffect(() => {
    fetchModelDetails(modelId)
      .then(setModelDetails)
      .catch((error) => {
        console.error(error);
        setModelDetails(null);
      });
  }, [modelId]);

  if (!modelDetails) {
    return <div>Loading...</div>;
  }

  return <div>ModelModal</div>;
};
