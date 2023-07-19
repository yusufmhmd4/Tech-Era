import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails
  return (
    <li className="list-element">
      <Link to={`courses/${id}`} className="item">
        <img src={logoUrl} alt={name} className="item-image" />
        <p className="item-name">{name}</p>
      </Link>
    </li>
  )
}

export default CourseItem
