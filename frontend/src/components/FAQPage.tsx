import { Stack } from '@mui/material';
import { useAddAnswerMutation, useGetQAQuery } from '../store/services/OfferListDataApi';
import QuestionAnswerAccordion from './QuestionAnswerAccordion';
import { useEffect } from 'react';

interface IFAQPageProps {
  productId: number
}

const FAQPage = ({ productId }: IFAQPageProps) => {

  const { data: qaData } = useGetQAQuery(productId)
  const [postAnswer, postAnswerResult] = useAddAnswerMutation()

  useEffect(() => {
    console.log({ qaData });
    if (qaData) {
      console.log(Object.values(qaData))

    }
    console.log({ productId });

  }, [qaData])

  const addAnswer = (answer: string, questionId: number) => {
    postAnswer({
      questionId,
      answer
    })
    console.log('add answer')
  }

  return (
    <Stack spacing={3}>
      {qaData ? Object.values(qaData).map((qa) => (
        <QuestionAnswerAccordion
          // @ts-ignore
          question={qa.question}
          // @ts-ignore
          questionId={parseInt(qa.id, 10)}
          // @ts-ignore
          answer={qa.answer}
          addAnswer={addAnswer}
        />
      )) : <></>
      }
    </Stack>
  );
};

export default FAQPage;
