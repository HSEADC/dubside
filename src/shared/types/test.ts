import testsDataRaw from '@/assets/data/tests/tests.json';

export type TestId = keyof typeof testsDataRaw;
export type Answer = {
  answer: string;
  count: string;
};

export type Question = {
  question: string;
  answers: Answer[];
};

export type TestData = {
  heading: string;
  timing: string;
  hardness: 'easy' | 'normal' | 'hard';
  img: string;
  questions: Question[];
};

export type C_TestAnswersProps = {
  test: TestData | null;
  questionNumber: number;
  checked: boolean[];
  setChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
  changeQuestion: (toCount: number) => void;
};
