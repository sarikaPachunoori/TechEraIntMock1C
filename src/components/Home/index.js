import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    list: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getResults()
  }

  getResults = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = ' https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      this.setState({list: updatedData, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-cont" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCoursesView = () => {
    const {list} = this.state

    return (
      <ul className="list-cont">
        {list.map(course => (
          <li className="list-item-cont" key={course.id}>
            <img
              src={course.logoUrl}
              className="course-logo"
              alt={course.name}
            />
            <Link to={`/courses/${course.id}`} className="link">
              <p className="name">{course.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="Failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="oops-heading">Oops! Something Went Wrong</h1>
      <p className="oops-para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="button" onClick={this.getResults}>
        Retry
      </button>
    </div>
  )

  renderHomePage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCoursesView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="Header-cont">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
        </div>
        <h1 className="heading">Courses</h1>
        <div className="bottom-cont">{this.renderHomePage()}</div>
      </div>
    )
  }
}

export default Home
