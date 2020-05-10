import React from "react"
import { Link } from "gatsby"
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import LaunchIcon from '@material-ui/icons/Launch';
import twitterIcon from '../images/icons/twitter-icon-blue.svg'
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/pages/contact.scss"

const Contact = () => (
  <Layout pageClassName="contact-page">
    <SEO title="Contact" />
    <Container>
        <Row>
            <Col md={6} lg={5} id="contact-form">
                <h1>Contact Us</h1>
                <Form method="post" action="https://getform.io/f/7fc595e4-0150-4678-bfc2-1dbab05c76f3">
                    <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" autoComplete="email"/>
                    <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" autoComplete="name"/>
                    <Form.Label>I'm contacting you to...</Form.Label>
                        <Form.Control as="select" name="purpose">
                            <option>Offer feedback</option>
                            <option>Ask a question</option>
                            <option>Get involved</option>
                            <option>Something else</option>
                        </Form.Control>
                    <Form.Label>Message (required)</Form.Label>
                        <Form.Control as="textarea" rows={5} name="message" />
                    {/*<Form.Check type="checkbox" label="I'd like to know when OpenOUSD is updated" name="email-opt-in"/>*/}
                    <Button className="cta mt-3" variant="primary" type="submit">Send Message</Button>
                </Form>
            </Col>
            <Col md={{ span:5, offset: 1 }}>
                <div id="email-signup" className="pt-5 pt-md-0">
                    <h1>Sign Up For Email Updates</h1>
                    <Form method="post" action="https://getform.io/f/7fc595e4-0150-4678-bfc2-1dbab05c76f3">
                        <Form.Label>Be the first to know when new data is released.</Form.Label>
                        <Form.Control type="hidden" name="purpose" value="Email Signup"/>
                        <Form.Control type="email" name="email" autocomplete="email" placeholder="Email" />
                        <Form.Control type="hidden" name="email-opt-in" value="on"/>
                        <Button className="cta mt-3" variant="primary" type="submit">Sign Up</Button>
                    </Form>
                </div>
                <div className="pt-5">
                    <h1>Get Updates On Twitter <img src={twitterIcon} id="twitter-icon" alt="twitter icon"/></h1>
                    <div>Follow <a href="https://twitter.com/OpenOUSD" target="_blank" rel="noopener noreferrer">
                        @OpenOUSD</a> or <a href="https://twitter.com/OAKEDUretweets" target="_blank" rel="noopener noreferrer">
                        @OAKEDUretweets</a> for updates.
                    </div>
                </div>
                <div className="pt-5">
                    <h1>Join Us In-Person</h1>
                    <div>OpenOakland meets every Tues,{' '}
                        6:30pm at Oakland City Hall.
                    </div>
                </div>
                <a href="https://www.meetup.com/OpenOakland/events/" target="_blank" rel="noopener noreferrer">
                    RSVP on Meetup <LaunchIcon/>
                </a>
                <div className="pt-5">
                    <h1>Looking for data?</h1>
                    <p><Link to="/about-data/">View OpenOUSD data and code.</Link></p>
                </div>
            </Col>
        </Row>
        <Row>

        </Row>
        <Row></Row>
    </Container>

  </Layout>
)

export default Contact
