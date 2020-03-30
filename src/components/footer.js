import React from "react"
import { Link } from 'gatsby'

import "./footer.scss"
import logo from '../images/logo_open-oakland_white.svg'


const Footer = () => (
    <footer className="footer">
        <p><strong>Created by</strong> <img id="footerlogo" src={logo} alt="OpenOakland"></img></p>
        <p>Disclaimer: This site is in beta. Please report bugs and share feedback on <Link to="/contact">our contact page</Link></p>

        <p>© {new Date().getFullYear()}</p>

    </footer>
)

export default Footer
