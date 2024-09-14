export const truncate = (input?: string, maxLength: number = 15) => {
  if (!input) return "";

  if (input.length <= maxLength) {
    return input;
  }
  return input.substring(0, maxLength - 3) + "...";
};
