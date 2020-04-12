import React from "react"

import "./require-wide-screen.scss"
import rotateIcon from '../images/icons/rotate-device.svg'

const RequireWideScreen = (props) => (
    <>
        <div className={`request-rotate-message d-${props.minScreenWidth}-none d-table`}>
            <div className="text-center message-box d-table-cell align-middle">
                <img className="rotate-icon" src={rotateIcon} alt="icon of phone moving from portrait to landscape"/>
                <div className="footnote message py-3 mx-auto">This content requires a wider screen. Please rotate your device or widen your window</div>
            </div>
        </div>
        <div className={`d-none d-${props.minScreenWidth}-block`}>
            {props.children}
        </div>
    </>
)

export default RequireWideScreen
