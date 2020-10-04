import React from "react"
import { graphql } from 'gatsby'
import { Link } from "gatsby-plugin-intl"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import LaunchIcon from "@material-ui/icons/Launch"
import twitterIcon from "../images/icons/twitter-icon-blue.svg"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/pages/contact.scss"

const Contact = ({ data }) => {
  const { title, content } = data.contentfulPage

  const {
    contactUs,
    signUpForUpdates,
    submitButton,
    signUpButton,
    formInputs,
    contentBlocks,
    meetupRsvpLink,
    viewDataLink,
  } = content

  const formInputForName = name => formInputs.find(input => input.name === name)
  const emailFormInput = formInputForName("email")
  const nameFormInput = formInputForName("name")
  const purposeFormInput = formInputForName("purpose")
  const messageFormInput = formInputForName("message")
  const signUpForUpdatesFormInput = formInputForName("signUpForUpdates")

  const contentBlockForID = id =>
    contentBlocks.find(contentBlock => contentBlock.blockId === id)
  const twitterContentBlock = contentBlockForID("twitter")
  const meetupContentBlock = contentBlockForID("meetup")
  const dataSourceContentBlock = contentBlockForID("dataSource")

  return (
    <Layout pageClassName="contact-page">
      <SEO title={title} />
      <Container>
        <Row>
          <Col md={6} lg={5} id="contact-form">
            <h1>{contactUs}</h1>
            <Form
              method="post"
              action="https://getform.io/f/7fc595e4-0150-4678-bfc2-1dbab05c76f3"
            >
              <Form.Label>{emailFormInput.label}</Form.Label>
              <Form.Control type="email" name="email" autoComplete="email" />
              <Form.Label>{nameFormInput.label}</Form.Label>
              <Form.Control type="text" name="name" autoComplete="name" />
              <Form.Label>{purposeFormInput.label}</Form.Label>
              <Form.Control as="select" name="purpose">
                {purposeFormInput.selectOptions.map(option => (
                  <option>{option}</option>
                ))}
              </Form.Control>
              <Form.Label>{messageFormInput.label}</Form.Label>
              <Form.Control as="textarea" rows={5} name="message" />
              {/*<Form.Check type="checkbox" label="I'd like to know when OpenOUSD is updated" name="email-opt-in"/>*/}
              <Button className="cta mt-3" variant="primary" type="submit">
                {submitButton}
              </Button>
            </Form>
          </Col>
          <Col md={{ span: 5, offset: 1 }}>
            <div id="email-signup" className="pt-5 pt-md-0">
              <h1>{signUpForUpdates}</h1>
              <Form
                method="post"
                action="https://getform.io/f/7fc595e4-0150-4678-bfc2-1dbab05c76f3"
              >
                <Form.Label>{signUpForUpdatesFormInput.label}</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  autocomplete="email"
                  placeholder={signUpForUpdatesFormInput.placeholderText}
                />
                <Form.Control type="hidden" name="email-opt-in" value="on" />
                <Button className="cta mt-3" variant="primary" type="submit">
                  {signUpButton}
                </Button>
              </Form>
            </div>
            <div className="pt-5">
              <div>
                <h1>
                  {twitterContentBlock.heading}{" "}
                  <img src={twitterIcon} id="twitter-icon" alt="twitter icon" />
                </h1>
                <div>
                  {documentToReactComponents(twitterContentBlock.content.json)}
                </div>
              </div>
              <div className="pt-4">
                <h1>{meetupContentBlock.heading}</h1>
                <div>
                  {documentToReactComponents(meetupContentBlock.content.json)}
                  <a
                    href="https://www.meetup.com/OpenOakland/events/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {meetupRsvpLink} <LaunchIcon />
                  </a>
                </div>
              </div>
              <div className="pt-4">
                <h1>{dataSourceContentBlock.heading}</h1>
                <p>
                  <Link to="/about-data/">{viewDataLink}</Link>
                </p>
                <div>
                  {documentToReactComponents(
                    dataSourceContentBlock.content.json
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row></Row>
        <Row></Row>
      </Container>
    </Layout>
  )
}

export default Contact

// https://app.contentful.com/spaces/tqd0xcamk1ij/entries/41a8uyVvOiMFBBdqG2G6sU
export const query = graphql`
  query ContactPage($language: String) {
    contentfulPage(slug: { eq: "contact" }, node_locale: { eq: $language }) {
      title
      content {
        ... on ContentfulContactPageContent {
          contactUs
          signUpForUpdates
          submitButton
          signUpButton
          viewDataLink
          meetupRsvpLink
          formInputs {
            name
            label
            selectOptions
            placeholderText
          }
          contentBlocks {
            blockId
            heading
            content {
              json
            }
          }
        }
      }
    }
  }
`
