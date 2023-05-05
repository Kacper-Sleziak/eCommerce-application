import LowerNavbar from './LowerNavbar'
import UpperNavbar from './UpperNavbar'

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <UpperNavbar />
      <LowerNavbar />
    </div>
  )
}

export default Navbar
