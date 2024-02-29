export const log = (message: string) => {
  const currentDate = new Date();
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  console.log(`[${hours}:${minutes}:${seconds}] ${message}`);
};
