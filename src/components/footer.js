import React from "react"
import { Link } from 'gatsby'

import "./footer.scss"
import logo from '../images/logo_open-oakland_white.svg'


const Footer = () => (
    <footer className="footer">
        <p>
            <span className="mr-2">Created by</span>
            <a href="https://openoakland.org/" target="_blank" rel="noopener noreferrer">
                <img id="footerlogo" src={logo} alt="OpenOakland logo"></img>
            </a>
        </p>
        <p className="py-3">OpenOUSD is an ongoing project.{' '}
        Please report problems and share feedback on the <Link to="/contact/">contact page</Link>.</p>
        <p className="pb-2"><Link to="/about-data/">View OpenOUSD data and code.</Link></p>

        <p>© {new Date().getFullYear()}</p>

    </footer>
)

export default Footer
