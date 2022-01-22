import '../assets/Navbar.css'

function Navbar() {
  return (
    <div id="navbar-container">
      <input className="navbar-button" type="button" value="Characters" />
      <input className="navbar-button" type="button" value="Series" />
      <input className="navbar-button" type="button" value="Comics" />
    </div>
  )
}

export default Navbar;