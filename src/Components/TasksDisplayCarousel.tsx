import { useState } from "react";

interface SiblingFile {
  rfilename: string;
}

export const TasksDisplayCarousel = ({ files }: { files: SiblingFile[] }) => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : files.length - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % files.length);
  };

  if (!files.length) return <p>No Files Available</p>;

  return (
    <div>
      <p>
        <strong>File:</strong> {files[index].rfilename}
      </p>
      <div style={{ marginTop: "0.5rem" }}>
        <button onClick={handlePrev} style={{ marginRight: "1rem" }}>
          Back
        </button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};
