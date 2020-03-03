import React from "react"

import "./footer.scss"
import logo from '../images/logo_open-oakland_white.svg'


const Footer = () => (
    <footer className="footer">
        <p><strong>Created by</strong> <img id="footerlogo" src={logo} alt="OpenOakland logo"></img></p>
        <p>Disclaimer: This site is in beta. Please report bugs and suggestions to ousdbudget@openoakland.org</p>

        <p>© {new Date().getFullYear()}</p>

    </footer>
)

export default Footer