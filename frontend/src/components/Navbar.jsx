import LowerNavbar from './LowerNavbar'
import UpperNavbar from './UpperNavbar'

const Navbar = () => {
  return (
    <div className="navbar">
      <UpperNavbar name="Kot" />
      <LowerNavbar />
    </div>
  )
}

export default Navbar
