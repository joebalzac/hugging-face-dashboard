import { CiHeart } from "react-icons/ci";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { PiDownloadSimple } from "react-icons/pi";

interface Props {
  modelId: string;
  downloads: number;
  likes: number;
  lastModified: string;
  tags: string[];
  onClick: (modelId: string) => void;
}
export const ModelQualityCard: React.FC<Props> = ({
  modelId,
  downloads,
  likes,
  lastModified,
  tags,
  onClick,
}) => {
  return (
    <div>
      <div
        onClick={() => onClick(modelId)}
        className="flex items-center justify-between p-2 border border-b-black cursor-pointer bg-linear-to-br group relative z-0 mx-auto flex-col  overflow-hidden hover:shadow-inner from-indigo-600 to-blue-600 shadow-sm dark:bg-gray-900 hover:brightness-110 rounded-md"
      >
        <h3>{modelId}</h3>
        <div className="flex items-center gap-2">
          <PiDownloadSimple />
          <p>Downloads: {downloads.toLocaleString()}</p>
        </div>
        <div className="flex items-center gap-2">
          <CiHeart />
          <p>{likes}</p>
        </div>

        <div className="flex items-center gap-2">
          <MdOutlineTipsAndUpdates />
          <p>{new Date(lastModified).toLocaleString()}</p>
        </div>
        <div>
          {tags.slice(0, 3).map((tag) => (
            <span key={tag}></span>
          ))}
        </div>
      </div>
    </div>
  );
};
