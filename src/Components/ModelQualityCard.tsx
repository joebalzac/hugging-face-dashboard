import type { ModelQualityMetric } from "../Types/types";

interface Props extends ModelQualityMetric {
  onClick: (modelId: string) => void;
}

export const ModelQualityCard: React.FC<Props> = ({
  modelId,
  average,
  pdr,
  onClick,
}) => {
  return (
    <div onClick={() => onClick(modelId)}>
      <h3>{modelId}</h3>
      <p>
        <strong>Average Score: </strong>
        {average.toFixed(2)}
      </p>
      <p>
        <strong>PDR (≤ 2):</strong> {pdr.toFixed(2)}
      </p>
    </div>
  );
};
