export interface GetQuestionsUrlI{
  amount: string;
  category: string;
  difficulty: string;
} 
export interface GetAnyQuestionsUrlI{
  amount: string;
} 

export function getQuestionsUrl({ amount, category,difficulty }: GetQuestionsUrlI){
  return `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=boolean`
}