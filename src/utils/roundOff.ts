// function for rounding off the number
export const roundOff = (value: number, precision: number): number => {
  const multiplier = 10 ** (precision || 0);
  return Math.round(value * multiplier) / multiplier;
};
