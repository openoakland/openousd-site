import React from "react"
import { Link } from 'gatsby-plugin-intl'

// import "./footer.scss"
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';


const NewFeature = (props) => {

    return (
        <div className="mt-4">
            <h3>{props.heading}</h3>
            <div>{props.date}</div>
            <img src={props.image} alt={props.image_titles} className="mw-100 pt-3"/>
            <div className="pt-3">{props.description}</div>
            {props.pagePath ? <div className="pt-3"><Link to={props.pagePath}>{props.pagePathLinkName} <ArrowRightAlt/></Link></div> : ''}
        </div>
    )
}

export default NewFeature