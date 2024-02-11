import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-cont">
    <div className="Header-cont">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
    </div>
    <img
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="oops-heading">Page Not Found</h1>
    <p className="oops-para">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
