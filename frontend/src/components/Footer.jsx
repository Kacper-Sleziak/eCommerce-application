import React from 'react'
import '../styles/footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <div className="rightFotter">
        <p>Nazwa firmy</p>
        <address>
          ulica. xxxxx nr X <br />
          Wrocław
        </address>
        <p className="copywright">
          © 2023 Post-lease. Wszelkie prawa zastrzeżone.{' '}
        </p>
      </div>
      <div className="footerNavbarShortcut">
        <a href="https://www.google.pl/">Automotive</a>
        <a href="https://www.google.pl/">Electronics</a>
        <a href="https://www.google.pl/">Office furniture</a>
        <a href="https://www.google.pl/">White goods</a>
        <a href="https://www.google.pl/">Contact</a>
      </div>
    </div>
  )
}

export default Footer
