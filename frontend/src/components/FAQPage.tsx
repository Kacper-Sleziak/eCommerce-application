import { Stack, Typography } from '@mui/material'
import {
  useAddAnswerMutation,
  useAddQuestionMutation,
  useGetQAQuery,
} from '../store/services/OfferListDataApi'
import QuestionAnswerAccordion from './QuestionAnswerAccordion'
import AskQuestionAccordion from './AskQuestionAccordion'

interface IFAQPageProps {
  productId: number
}

const FAQPage = ({ productId }: IFAQPageProps) => {
  const { data: qaData, refetch: refetchQaData } = useGetQAQuery(productId)
  const [postAnswer] = useAddAnswerMutation()
  const [postQuestion] = useAddQuestionMutation()

  const addAnswer = (answer: string, questionId: number) => {
    postAnswer({
      questionId,
      answer,
    })
    refetchQaData()
  }

  const addQuestion = (question: string) => {
    postQuestion({
      product_id: productId,
      question,
    })
    refetchQaData()
  }

  return (
    <Stack spacing={3}>
      <AskQuestionAccordion addQuestion={addQuestion} />
      {qaData ? (
        Object.values(qaData)?.map((qa) => (
          <QuestionAnswerAccordion
            // @ts-expect-error
            key={parseInt(qa.id, 10)}
            // @ts-expect-error
            question={qa.question}
            // @ts-expect-error
            questionId={parseInt(qa.id, 10)}
            // @ts-expect-error
            answer={qa.answer}
            addAnswer={addAnswer}
          />
        ))
      ) : (
        <Typography>No questions asked</Typography>
      )}
    </Stack>
  )
}

export default FAQPage
