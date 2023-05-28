import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface ISimpleAccordion {
  description: string
  colors: string[]
  categories: string[]
}

const SimpleAccordion: React.FC<ISimpleAccordion> = ({ description, colors, categories }) => {
  return (
    <div>
      <Accordion sx={{ backgroundColor: '#ECEBEB', marginBottom: '1rem' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Parameters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Colors: {Array(colors).join(', ')}
            <br />
            Categories: {Array(categories).join(', ')}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: '#ECEBEB' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h6">Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {description}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default SimpleAccordion
