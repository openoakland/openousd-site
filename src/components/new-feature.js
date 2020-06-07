import React from "react"
import { Link } from 'gatsby'

// import "./footer.scss"
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';


const NewFeature = (props) => {

    return (
        <div className="mt-4">
            <h3>{props.heading}</h3>
            <div>{props.date}</div>
            <img src={props.image} className="pt-3"/>
            <div className="pt-3">{props.description}</div>
            <div className="pt-3"><Link to={props.path}>See it in action <ArrowRightAlt/></Link></div>
        </div>
    )
}

export default NewFeature
