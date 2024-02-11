import {Component} from 'react'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const courseStatusView = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {
    courseList: [],
    courseStatus: courseStatusView.initial,
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({courseStatus: courseStatusView.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const res = await fetch(`https://apis.ccbp.in/te/courses/${id}`)

    if (res.ok === true) {
      const dat = await res.json()
      const updatedCourse = {
        id: dat.course_details.id,
        name: dat.course_details.name,
        imageUrl: dat.course_details.image_url,
        description: dat.course_details.description,
      }
      console.log(updatedCourse)

      this.setState({
        courseList: updatedCourse,
        courseStatus: courseStatusView.success,
      })
    } else {
      this.setState({courseStatus: courseStatusView.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-cont" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCoursesDetailView = () => {
    const {courseList} = this.state
    return (
      <ul>
        <li className="view-cont">
          <div className="img-cont">
            <img
              className="image"
              src={courseList.imageUrl}
              alt={courseList.name}
            />
          </div>
          <div className="desc-cont">
            <h1 className="course-heading ">{courseList.name}</h1>
            <p className="desc">{courseList.description}</p>
          </div>
        </li>
      </ul>
    )
  }

  renderCourseFailureView = () => (
    <div className="Failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="oops-heading">Oops! Something Went Wrong</h1>
      <p className="oops-para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="button" onClick={this.getCourseDetails}>
        Retry
      </button>
    </div>
  )

  renderCourseViewPage = () => {
    const {courseStatus} = this.state

    switch (courseStatus) {
      case courseStatusView.success:
        return this.renderCoursesDetailView()
      case courseStatusView.failure:
        return this.renderCourseFailureView()
      case courseStatusView.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div className="Header-cont">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
        </div>
        {this.renderCourseViewPage()}
      </div>
    )
  }
}

export default CourseItemDetails
