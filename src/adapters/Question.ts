export type Question = {
    id: string;
    type: string;
    category: string;
    difficulty: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
}

export class QuestionsAdapter{
  public readonly questions: Question[];

  constructor(data: any){
    this.questions = data.map((q: any)=>{
      const quest = {
        id: q.id,
        type: q.type,
        category: q.category,
        difficulty: q.difficulty,
        question: q.question,
        correctAnswer: q.correctAnswer,
        incorrectAnswers: q.incorrectAnswers.map((ans: string)=>ans),
     }
      return quest;
    })
  }

}
