import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { FaUser, FaTags, FaFileAlt, FaUsers } from "react-icons/fa";

interface ModelDetails {
  modelId: string;
  author?: string;
  tags?: string[];
  lastModified?: string;
  cardData?: {
    contributors?: string[];
  };
  siblings?: { rfilename: string }[];
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
    tags: data.tags,
    lastModified: data.lastModified,
    cardData: data.cardData,
    siblings: data.siblings,
  };
};

export const ModelModal = ({
  modelId,
  onClose,
}: {
  modelId: string;
  onClose: () => void;
}) => {
  const [modelDetails, setModelDetails] = useState<ModelDetails | null>(null);

  useEffect(() => {
    fetchModelDetails(modelId)
      .then(setModelDetails)
      .catch((error) => {
        console.error(error);
        setModelDetails(null);
      });
  }, [modelId]);

  if (!modelDetails) return <div>Loading...</div>;

  const formattedDate = modelDetails.lastModified
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(modelDetails.lastModified))
    : "N/A";

  return (
    <div className="flex flex-col items-start">
      <button
        onClick={onClose}
        style={{ float: "right", border: "none", background: "transparent" }}
      >
        <IoClose size={24} />
      </button>

      <h2>{modelDetails.modelId}</h2>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FaUser /> <strong>Author:</strong>
        </div>
        {modelDetails.author || "N/A"}
      </div>

      <div className="flex items-center gap-4">
        <FaTags /> <strong>Tags:</strong>{" "}
        {modelDetails.tags?.slice(0, 5).join(", ") || "N/A"}
      </div>

      <div className="flex items-center gap-4">
        <MdOutlineTipsAndUpdates /> <strong>Last Modified:</strong>{" "}
        {formattedDate}
      </div>

      <div className="flex items-center gap-4">
        <FaUsers /> <strong>Contributors:</strong>{" "}
        {modelDetails.cardData?.contributors?.slice(0, 5).join(", ") || "N/A"}
      </div>

      <div>
        <FaFileAlt /> <strong>Files:</strong>{" "}
        {modelDetails.siblings
          ?.map((file) => file.rfilename)
          .slice(0, 5)
          .join(", ") || "N/Aaaaa"}
      </div>
    </div>
  );
};
