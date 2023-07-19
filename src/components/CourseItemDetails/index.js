import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  INITIAL: 'initial',
  PROGRESS: 'progress',
  SUCCESS: 'success',
  FAILURE: 'failure',
}

class CourseItemDetails extends Component {
  state = {course: [], apiStatus: apiStatusConstants.INITIAL}

  componentDidMount() {
    this.getCourseItemDetails()
  }

  getCourseItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.PROGRESS})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      console.log(updatedData)
      this.setState({
        course: updatedData,
        apiStatus: apiStatusConstants.SUCCESS,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.FAILURE})
    }
  }

  onClickRetryButton = () => {
    this.getCourseItemDetails()
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="courses-loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {course} = this.state
    console.log(course)
    const {description, imageUrl, name} = course
    return (
      <div className="course-details-container">
        <img src={imageUrl} className="image" alt={name} />
        <div className="content-container">
          <h1 className="heading">{name}</h1>
          <p className="paragraph">{description}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-paragraph">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderPageDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.SUCCESS:
        return this.renderSuccessView()
      case apiStatusConstants.FAILURE:
        return this.renderFailureView()

      case apiStatusConstants.PROGRESS:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderPageDetails()}
      </>
    )
  }
}

export default CourseItemDetails
