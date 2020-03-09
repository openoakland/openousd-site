import React from "react"
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import LaunchIcon from '@material-ui/icons/Launch';
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/pages/contact.scss"

const Contact = () => (
  <Layout pageClassName="contact-page">
    <SEO title="Contact" />
    <Container>
        <Row>
            <Col md={6} lg={5} id="contact-form">
                <h1>Contact us</h1>
                <Form method="post" action="https://getform.io/f/7fc595e4-0150-4678-bfc2-1dbab05c76f3">
                    <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" />
                    <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" />
                    <Form.Label>I'm contacting you to...</Form.Label>
                        <Form.Control as="select" name="purpose">
                            <option>Offer feedback</option>
                            <option>Ask a question</option>
                            <option>Make a donation</option>
                            <option>Something else</option>
                        </Form.Control>
                    <Form.Label>Message*</Form.Label>
                        <Form.Control as="textarea" rows={5} name="message" />
                    <Form.Check type="checkbox" label="I'd like to know when OpenOUSD is updated" name="email-opt-in"/>
                    <Button className="cta" variant="primary" type="submit">Send Message</Button>
                </Form>
            </Col>
            <Col md={{ span:5, offset: 1 }}>
                <div id="email-signup">
                    <h1>Sign up for email updates</h1>
                    <Form method="post" action="https://getform.io/f/7fc595e4-0150-4678-bfc2-1dbab05c76f3">
                        <Form.Label>Be the first to know when new data is released.</Form.Label>
                        <Form.Control type="hidden" name="purpose" value="Email Signup"/>
                        <Form.Control type="email" name="email" placeholder="Email" />
                        <Form.Control type="hidden" name="email-opt-in" value="on"/>
                        <Button className="cta" variant="primary" type="submit">Sign Up</Button>
                    </Form>
                </div>
                <div id="openoakland-meeting">
                    <h1>Join us in-person</h1>
                    <div>OpenOakland meets every Tues,{' '}
                        6:30pm at Oakland City Hall.
                    </div>
                </div>
                <a href="https://www.meetup.com/OpenOakland/events/" target="_blank" rel="noopener noreferrer">
                    RSVP on Meetup <LaunchIcon/>
                </a>
            </Col>
        </Row>
        <Row>

        </Row>
        <Row></Row>
    </Container>

  </Layout>
)

export default Contact
