import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import CourseItem from '../CourseItem'

const apiStatusConstants = {
  INITIAL: 'initial',
  PROGRESS: 'progress',
  SUCCESS: 'success',
  FAILURE: 'failure',
}

class Home extends Component {
  state = {coursesData: [], apiStatus: apiStatusConstants.INITIAL}

  componentDidMount() {
    this.getCoursesData()
  }

  getCoursesData = async () => {
    this.setState({apiStatus: apiStatusConstants.PROGRESS})

    const apiUrl = `https://apis.ccbp.in/te/courses`

    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))

      this.setState({
        coursesData: updatedData,
        apiStatus: apiStatusConstants.SUCCESS,
      })
      console.log(data)
    } else {
      this.setState({apiStatus: apiStatusConstants.FAILURE})
    }
  }

  onClickRetryButton = () => {
    this.getCoursesData()
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="courses-loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {coursesData} = this.state
    return (
      <ul className="list-container">
        {coursesData.map(course => (
          <CourseItem courseDetails={course} key={course.id} />
        ))}
      </ul>
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
    const {coursesData, apiStatus} = this.state
    console.log(apiStatus)
    console.log(coursesData)
    return (
      <>
        <Header />
        <div className="courses-container">
          <h1 className="courses-heading">Courses</h1>
          {this.renderPageDetails()}
        </div>
      </>
    )
  }
}

export default Home
