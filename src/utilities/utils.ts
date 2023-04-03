export function generateRandomInt(min: number, max: number): number {
  const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomInt;
}