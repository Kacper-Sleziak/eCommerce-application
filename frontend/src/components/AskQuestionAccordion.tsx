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

interface IAskQuestionAccordionProps {
  addQuestion(question: string): void
}

const AskQuestionAccordion = ({ addQuestion }: IAskQuestionAccordionProps) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const [questionText, setQuestionText] = useState<string>('')

  const handleAccordionChange = () => {
    setExpanded(!expanded)
  }

  return (
    <Accordion expanded={expanded} onChange={handleAccordionChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Ask a question about this product:</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <TextField
            autoComplete="given-question"
            name="question"
            required
            fullWidth
            id="question-textfield"
            label="Type your question"
            autoFocus
            color="secondary"
            value={questionText}
            onChange={(e) => {
              setQuestionText(e.target.value)
            }}
          />

          <Button
            color="secondary"
            variant="outlined"
            onClick={() => {
              addQuestion(questionText)
              setQuestionText('')
            }}
          >
            Post Question
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}

export default AskQuestionAccordion
