import { useState } from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from '@mui/material'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

interface IQuestionAnswerAccordionProps {
  question: string
  questionId: number
  answer: string
  addAnswer(answer: string, questionId: number): void
}

const QuestionAnswerAccordion = ({
  question,
  answer,
  addAnswer,
  questionId,
}: IQuestionAnswerAccordionProps) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const [answerText, setAnswerText] = useState<string>('')

  const handleAccordionChange = () => {
    setExpanded(!expanded)
  }

  return (
    <Accordion
      expanded={expanded}
      onChange={handleAccordionChange}
      sx={{ backgroundColor: '#ECEBEB' }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">
          <b>Question: </b>
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Typography>Answer: {answer}</Typography>
          <TextField
            autoComplete="given-answer"
            name="answer"
            required
            fullWidth
            id="answer-textfield"
            label="Type your answer"
            autoFocus
            color="secondary"
            value={answerText}
            onChange={(e) => {
              setAnswerText(e.target.value)
            }}
            sx={{ backgroundColor: '#fff', borderRadius: '30px' }}
          />

          <Button
            color="secondary"
            onClick={() => {
              addAnswer(answerText, questionId)
              setAnswerText('')
            }}
            sx={{
              background: '#FCA311',
              color: '#FFF',
              borderRadius: '10px',
              boxSizing: 'border-box',
              textTransform: 'none',
              '&:hover': {
                background: '#121D35',
              },
            }}
          >
            Answer
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}

export default QuestionAnswerAccordion
