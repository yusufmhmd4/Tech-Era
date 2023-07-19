import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        className="failure-image"
        alt="not found"
      />
      <h1 className="failure-heading">Page Not Found</h1>
      <p className="failure-paragraph">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
