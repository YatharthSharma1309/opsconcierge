import { Card, CardDescription, CardTitle } from "@/components/ui/card";

type InterviewQuestionListProps = {
  questions: string[];
};

export function InterviewQuestionList({ questions }: InterviewQuestionListProps) {
  if (questions.length === 0) return null;

  return (
    <Card>
      <CardTitle>Interview questions</CardTitle>
      <CardDescription>
        Written from the gaps on this resume. Use them when you choose to interview.
      </CardDescription>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-foreground">
        {questions.map((question) => (
          <li key={question}>{question}</li>
        ))}
      </ol>
    </Card>
  );
}
