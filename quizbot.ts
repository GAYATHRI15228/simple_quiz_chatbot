import { ComponentDialog, TextPrompt, WaterfallDialog, WaterfallStepContext } from 'botbuilder-dialogs';

const TEXT_PROMPT = 'textPrompt';
const WATERFALL_DIALOG = 'waterfallDialog';
let correct = 0;
let incorrect = 0;

export class QuizDialog extends ComponentDialog {
  constructor() {
    super('quizDialog');

    this.addDialog(new TextPrompt(TEXT_PROMPT))
     .addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
        this.Question1.bind(this),
        this.Question2.bind(this),
        this.Question3.bind(this),
        this.Question4.bind(this),
        this.Question5.bind(this),
        this.FinalStep.bind(this)
      ]));

    this.initialDialogId = WATERFALL_DIALOG;
  }

  private async Question1(step: WaterfallStepContext) {
    const question = 'There is a tank whose 1/7 th part is filled with fuel. If 22 liters of fuel is poured into the tank, the indicator rises to 1/5 th mark of the tank. So what is the total capacity of the tank?';
    const options = [
      { text: 'A) 385', value: 'A' },
      { text: 'B) 344', value: 'B' },
      { text: 'C) 200', value: 'C' },
      { text: 'D) 100', value: 'D' }
    ];

    await this.Ques(step, question, options);

    return await step.prompt(TEXT_PROMPT, `Answer the Question.`);
  }

  private async Question2(step: WaterfallStepContext) {
    const userAnswer = step.result;
    if (userAnswer.toUpperCase() === 'A' || userAnswer.toUpperCase() === 'a') {
      await step.context.sendActivity(`Correct!`);
      correct++;
    } else {
      incorrect++;
    }

    const question = 'Find the number of divisors of 1728(including 1 and the number itself).';
    const options = [
      { text: 'A) 20', value: 'A' },
      { text: 'B) 30', value: 'B' },
      { text: 'C) 28', value: 'C' },
      { text: 'D) 10', value: 'D' }
    ];

    await this.Ques(step, question, options);

    return await step.prompt(TEXT_PROMPT, `Answer the Question.`);
  }
  private async Question3(step: WaterfallStepContext) {
    const userAnswer = step.result;
    if (userAnswer.toUpperCase() === 'A' || userAnswer.toUpperCase() === 'a') {
      await step.context.sendActivity(`Correct!`);
      correct++;
    } else {
      incorrect++;
    }

    const question = 'Which of the following numbers must be added to 5678 to give a remainder 35 when divided by 460? ';
    const options = [
      { text: 'A) 797', value: 'A' },
      { text: 'B) 300', value: 'B' },
      { text: 'C) 928', value: 'C' },
      { text: 'D) 150', value: 'D' }
    ];

    await this.Ques(step, question, options);

    return await step.prompt(TEXT_PROMPT, `Answer the Question.`);
  }
  private async Question4(step: WaterfallStepContext) {
    const userAnswer = step.result;
    if (userAnswer.toUpperCase() === 'B' || userAnswer.toUpperCase() === 'b') {
      await step.context.sendActivity(`Correct!`);
      correct++;
    } else {
      incorrect++;
    }

    const question = 'In the given series: 70, 54, 45, 41……. What will be the next number? ';
    const options = [
      { text: 'A) 79', value: 'A' },
      { text: 'B) 40', value: 'B' },
      { text: 'C) 98', value: 'C' },
      { text: 'D) 10', value: 'D' }
    ];

    await this.Ques(step, question, options);

    return await step.prompt(TEXT_PROMPT, `Answer the Question.`);
  }
  private async Question5(step: WaterfallStepContext) {
    const userAnswer = step.result;
    if (userAnswer.toUpperCase() === 'C' || userAnswer.toUpperCase() === 'c') {
      await step.context.sendActivity(`Correct!`);
      correct++;
    } else {
      incorrect++;
    }

    const question = '. Let a number ‘x’ when divided by 406 leaves a remainder 115. What will be the number when the number is divided by 29? ';
    const options = [
      { text: 'A) 77', value: 'A' },
      { text: 'B) 30', value: 'B' },
      { text: 'C) 28', value: 'C' },
      { text: 'D) 50', value: 'D' }
    ];

    await this.Ques(step, question, options);

    return await step.prompt(TEXT_PROMPT, `Answer the Question.`);
  }

  private async Ques(step: WaterfallStepContext, question: string, options: { text: string; value: string }[]) {
    await step.context.sendActivity({
      text: question,
      attachments: [
        {
          contentType: 'application/vnd.microsoft.card.hero',
          content: {
            title: question,
            buttons: options.map((option) => ({
              type: 'postBack',
              title: option.text,
              value: option.value
            }))
          }
        }
      ]
    });
  }

  private async FinalStep(step: WaterfallStepContext) {
    await step.context.sendActivity(`Correct Answer:${correct} and incorrect Answer:${incorrect}`);
    return await step.endDialog();
  }
}