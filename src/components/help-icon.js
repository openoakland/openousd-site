import React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import HelpOutline from '@material-ui/icons/HelpOutline';
import './icon.scss'

// TODO style the tooltip
const HelpIcon  = ({tooltipText, placement = 'top'}) => {

    function renderTooltip(props) {
        // show={props.show.toString() is needed due to a bug in react-bootstrap
        // without it we get a 'Warning: Received true for a non-boolean attribute show.' error
        return <Tooltip {...props} show={props.show.toString()}>{tooltipText}</Tooltip>;
    }

    return (
        <OverlayTrigger
        placement={placement}
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <HelpOutline className="icon"/>
        </OverlayTrigger>
  )}
  
  HelpIcon.propTypes = {
      tooltipText: PropTypes.string.isRequired
  }
  
  export default HelpIcon