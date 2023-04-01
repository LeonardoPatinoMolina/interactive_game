export class QuestionCount{
  easy: string;
  medium: string;
  hard: string;
  data: {easy: string, medium: string, hard: string};

  constructor(data: any){
    const qCount = data.category_question_count;
    this.easy = qCount.total_easy_question_count;
    this.medium = qCount.total_medium_question_count;
    this.hard = qCount.total_hard_question_count;
    this.data = {
      easy: this.easy,
      medium: this.medium,
      hard: this.hard
    }
  }
}