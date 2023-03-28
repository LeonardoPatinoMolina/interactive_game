export function generateRandomInt(min: number, max: number): number {
  const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomInt;
}

export const generateConfigRandom = (): string=>{
  let difficulty: string;
  const diffN = generateRandomInt(1,3);
  if(diffN === 1) difficulty = 'easy';
  if(diffN === 2) difficulty = 'medium';
  else difficulty = 'hard';
  console.log(generateRandomInt(1, 50));
  return `${generateRandomInt(1, 50)}/${generateRandomInt(9, 32)}/${difficulty}`
  
}