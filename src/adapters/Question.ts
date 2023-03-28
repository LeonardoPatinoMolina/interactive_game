export type Question = {
    type: string;
    category: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export class QuestionsAdapter{
  public readonly questions: Question[];

  constructor(data: any){
    this.questions = data.results.map((q: any)=>{
      const quest = {
        type: this.decodeText(q.type),
        category: this.decodeText(q.category),
        difficulty: this.decodeText(q.difficulty),
        question: this.decodeText(q.question),
        correct_answer: this.decodeText(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((ans: string)=>this.decodeText(ans)),
     }
      return quest;
    })
  }

  private decodeText(text: string){
    const decoT = atob(text);
    // const newText = decoT.replace(/\\\\/g, '');
    const newText = decoT.replace(/\\(.)/g, '$1');
    return newText;
  }
}