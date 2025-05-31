import "./App.css";
import { ModelQualityCard } from "./Components/ModelQualityCard";
import useGetModelQuality from "./Hooks/useGetModelQuality";

function App() {
  const { data, isLoading } = useGetModelQuality();
  return (
    <>
      {isLoading && <div>Loading....</div>}

      {data.map((model) => (
        <ModelQualityCard key={model.modelId} {...model} onClick={(modelId) => console.log(`Model clicked: ${modelId}`)} />
      ))}
    </>
  );
}

export default App;
