import { Link } from "react-router-dom"
const Header = ({ loggedIn, setLoggedIn }) => {
  if (loggedIn) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
    
        <div className="container">
          <Link className="navbar-brand me-2" to="/">
            <img src="https://img.icons8.com/ios/50/null/kiwi-bird.png"/>
          </Link>
  
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" >Chitter</a>
              </li>
            </ul>
  
            <div className="d-flex align-items-center">
              <Link to="/" onClick={() => setLoggedIn(false) }>
                <button type="button" className="btn btn-primary me-3" >
                Log Out
                </button>
                </Link>
            </div>
          </div>
        </div>
      </nav>
    )
    
  } else {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
    
        <div className="container">
          <Link className="navbar-brand me-2" to="/">
            <img src="https://img.icons8.com/ios/50/null/kiwi-bird.png"/>
          </Link>
  
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" >Chitter</a>
              </li>
            </ul>
  
            <div className="d-flex align-items-center">
              <Link to="/login">
              <button type="button" className="btn btn-light px-3 me-2">
                Login
                </button>
              </Link>
              <Link to="/register">
              <button type="button" className="btn btn-primary me-3">
                Sign up for free
                </button>
                </Link>
            </div>
          </div>
        </div>
      </nav>
    )
    
  }
}

export default Header