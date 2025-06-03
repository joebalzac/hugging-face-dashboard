import { useState } from "react";
import "./App.css";
import { ModelQualityCard } from "./Components/ModelQualityCard";
import useGetModelQuality from "./Hooks/useTrendingModels";
import { ModelModal } from "./Components/ModelModal";

function App() {
  const { models, isLoading } = useGetModelQuality();
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  const handleSelectedModel = (id: string) => {
    setSelectedModelId(id);
  };

  return (
    <>
      {isLoading && <div>Loading....</div>}

      <h1 className="mb-20">Trending Hugging Face Models</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {models.map((model) => (
          <div>
            <ModelQualityCard
              key={model.modelId}
              {...model}
              onClick={() => handleSelectedModel(model.modelId)}
            />

            <div>
              {selectedModelId === model.modelId && (
                <div>
                  <ModelModal
                    modelId={model.modelId}
                    onClose={() => setSelectedModelId(null)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {}
    </>
  );
}

export default App;
