import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/pages/contact.scss"

const Contact = () => (
  <Layout>
    <SEO title="Contact" />
    <div id="mc_embed_signup">
        <form action="https://github.us19.list-manage.com/subscribe/post?u=cf9c7f8bf87464a4c5dd0f135&amp;id=916f1af57b" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" novalidate>
            <div id="mc_embed_signup_scroll">
                <label for="mce-EMAIL">Subscribe To Email Updates</label>
                <input type="email" value="" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required/>
                <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true">
                    <input type="text" name="b_cf9c7f8bf87464a4c5dd0f135_916f1af57b" tabindex="-1" value=""/>
                </div>
                <div className="clear">
                    <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"/>
                </div>
            </div>
        </form>
    </div>
  </Layout>
)

export default Contact
