export const fetchProjectData = async (modelId: string) => {
  const res = await fetch(`https://huggingface.co/api/models/${modelId}`);
  if (!res.ok) throw Error("Failed to fetch data");
  return res.json();
};
