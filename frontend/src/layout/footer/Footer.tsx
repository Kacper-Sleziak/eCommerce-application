import React from 'react'
import { Typography } from '@mui/material'
import '../../styles/layout/footer.css'

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="rightFotter">
        <Typography variant="h6" sx={{ marginTop: '1rem' }}>
          Post-lease Company
        </Typography>
        <address>
          wybrzeże Stanisława Wyspiańskiego 27 <br />
          50-370 Wrocław
        </address>
        <p className="copywright">© 2023 Post-lease. All rights reserved. </p>
      </div>
      <div className="footerNavbarShortcut">
        <a href="http://localhost:3000/">Automotive</a>
        <a href="http://localhost:3000/">Electronics</a>
        <a href="http://localhost:3000/">Office furniture</a>
        <a href="http://localhost:3000/">White goods</a>
        <a href="http://localhost:3000/">Contact</a>
      </div>
    </div>
  )
}

export default Footer
