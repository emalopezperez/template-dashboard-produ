export const isFormComplete = (data: any) => {
  return Object.values(data).every((value: any) => value.trim() !== "");
};
