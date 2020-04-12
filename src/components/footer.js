import React from "react"
import { Link } from 'gatsby'

import "./footer.scss"
import logo from '../images/logo_open-oakland_white.svg'


const Footer = () => (
    <footer className="footer">
        <p><strong>Created by</strong> <img id="footerlogo" src={logo} alt="OpenOakland logo"></img></p>
        <p className="py-3">OpenOUSD is an ongoing project.{' '}
        Please report problems and share feedback on the <Link to="/contact/">contact page</Link></p>

        <p>© {new Date().getFullYear()}</p>

    </footer>
)

export default Footer
