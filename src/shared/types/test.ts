import testsDataRaw from '@/assets/data/tests/tests.json';

export type TestId = keyof typeof testsDataRaw;
export type Hardness = 'easy' | 'normal' | 'hard' | 'multiple';

type BaseTestData = {
  heading: string;
  timing: string;
  hardness: Hardness;
  img?: string;
};

export type ClassicAnswer = {
  answer: string;
  count: string;
};

export type ClassicQuestion = {
  question: string;
  answers: ClassicAnswer[];
};

export type ClassicTestData = BaseTestData & {
  type: 'classic';
  questions: ClassicQuestion[];
};

export type MultipleOutcome = {
  id: string;
  title: string;
  description: string;
  img?: string;
};

export type MultipleAnswer = {
  answer: string;
  outcomeId: string;
  score: number;
};

export type MultipleQuestion = {
  question: string;
  answers: MultipleAnswer[];
};

export type MultipleTestData = BaseTestData & {
  type: 'multiple';
  outcomes: MultipleOutcome[];
  questions: MultipleQuestion[];
};

export type TestData = ClassicTestData | MultipleTestData;

export const isClassicTest = (test: TestData): test is ClassicTestData => test.type === 'classic';

export const isMultipleTest = (test: TestData): test is MultipleTestData => test.type === 'multiple';

export type C_TestAnswersProps = {
  test: ClassicTestData;
  questionNumber: number;
  checked: boolean[];
  setChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
  changeQuestion: (toCount: number) => void;
};
