export const log = (message: string) => {
  const currentDate = new Date();
  console.log(
    `[${currentDate.getUTCHours}:${currentDate.getUTCMinutes}:${currentDate.getUTCSeconds}] ${message}`
  );
};
