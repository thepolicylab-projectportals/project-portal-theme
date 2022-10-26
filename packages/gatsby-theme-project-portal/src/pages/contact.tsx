import React, { Component } from "react"
import { graphql, navigate } from "gatsby"
import { MarkdownText } from "../components"
import { Layout } from "../layouts"
import { HeaderWithImage } from "../components"
import { useStaticText } from "../hooks"
import ReCAPTCHA from "react-google-recaptcha"

const encode = (data: { [Key: string]: string }) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

interface ContactProps {
  data: {
    site: {
      siteMetadata: {
        recaptchaSiteKey
      }
    }
    bgImage: {
      childImageSharp: {
        resize: {
          src: string
        }
      }
    }
  }
}

interface ContactFormState {
  name: string
  email: string
  subject: string
  message: string
  recaptchaSiteKey: string
  captchaSuccess: boolean
}

const errorLabelShownClassName = "font-bold text-red"

const errorLabelHiddenClassName = "font-bold text-red hidden"

const standardInputBoxStartClassName =
  "w-full text-contact px-3 py-2 leading-tight text-black shadow appearance-none outline-transparent focus:outline-none focus:shadow-outline"

const messageInputBoxStartClassName =
  "w-full text-contact h-48 px-3 py-2 leading-tight text-black shadow appearance-none outline-transparent focus:outline-none focus:shadow-outline"

const standardInputBoxErrorClassName =
  "w-full text-contact px-3 py-2 leading-tight text-black border-2 border-red shadow appearance-none outline-transparent focus:outline-none focus:shadow-outline"

const messageInputBoxErrorClassName =
  "w-full text-contact h-48 px-3 py-2 leading-tight text-black border-2 border-red shadow appearance-none focus:outline-none focus:shadow-outline"

function changeCheck(event) {
  //job of changeCheck is to remove all error messages that
  //may have been brought up from a previous submit attempt
  if (event.target.name != "subject") {
    document.getElementById(event.target.name + "ErrorLabel").className =
      errorLabelHiddenClassName
    document.getElementById(event.target.name).className =
      standardInputBoxStartClassName

    if (event.target.name == "message") {
      document.getElementById(event.target.name).className =
        messageInputBoxStartClassName
    } else {
      document.getElementById(event.target.name).className =
        standardInputBoxStartClassName
    }

    if (event.target.name == "email") {
      document.getElementById("invalidEmailErrorLabel").className =
        errorLabelHiddenClassName
    }
  }
}

function submitCheck(state) {
  //job of submitCheck is to display error messages for all
  //incorrectly filled out required fields
  var nameCheck = true
  var emailCheck = true
  var messageCheck = true

  //check name is filled out
  if (state.name == "") {
    document.getElementById("nameErrorLabel").className =
      errorLabelShownClassName
    document.getElementById("name").className = standardInputBoxErrorClassName
    nameCheck = false
  }
  //check email is filled out AND if filled out, it is in proper email format
  if (state.email == "") {
    document.getElementById("emailErrorLabel").className =
      errorLabelShownClassName
    document.getElementById("email").className = standardInputBoxErrorClassName
    emailCheck = false
  }
  //if email exists, make sure it is valid email format
  else {
    if (!document.getElementById("email").validity.valid) {
      document.getElementById("invalidEmailErrorLabel").className =
        errorLabelShownClassName
      document.getElementById("email").className =
        standardInputBoxErrorClassName
      emailCheck = false
    }
  }
  //check message is filled out
  if (state.message == "") {
    document.getElementById("messageErrorLabel").className =
      errorLabelShownClassName
    document.getElementById("message").className = messageInputBoxErrorClassName
    messageCheck = false
  }
  return nameCheck && emailCheck && messageCheck
}

class ContactForm extends Component {
  state: ContactFormState

  constructor(recaptcha, props) {
    super(recaptcha, props)
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
      recaptchaSiteKey: recaptcha.recaptcha,
      captchaSuccess: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCaptcha = this.handleCaptcha.bind(this)
  }

  handleChange(event) {
    changeCheck(event)
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    //to prevent browser reload/refresh during submit
    event.preventDefault()
    if (submitCheck(this.state)) {
      // This code will actually post to netlify
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...this.state }),
      })
        .then(() => navigate("/thank-you/"))
        .catch((error) => alert(error))
    }
  }

  handleCaptcha(event) {
    this.setState({ captchaSuccess: true })
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        name="contact"
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-contact font-bold text-black"
          >
            Full name
          </label>
          <input
            aria-label="Full name"
            name="name"
            id="name"
            placeholder="John Doe"
            required
            type="text"
            className="w-full text-contact px-3 py-2 leading-tight text-black border shadow appearance-none focus:outline-none focus:shadow-outline"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-contact font-bold text-black"
          >
            Email address
            <span className="text-red"> *</span>
          </label>
          <label id="emailErrorLabel" className={errorLabelHiddenClassName}>
            Please enter your email address
          </label>
          <label
            id="invalidEmailErrorLabel"
            className={errorLabelHiddenClassName}
          >
            Please enter a valid email address
          </label>
          <input
            aria-label="Full name"
            name="email"
            id="email"
            placeholder="example@example.com"
            required
            type="email"
            className="w-full text-contact px-3 py-2 leading-tight text-black border shadow appearance-none focus:outline-none focus:shadow-outline"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="subject"
            className="block mb-2 text-contact font-bold text-black"
          >
            Subject
          </label>
          <input
            aria-label="Subject"
            name="subject"
            id="subject"
            placeholder="I want to get in touch about ..."
            required
            type="text"
            className="w-full text-contact px-3 py-2 leading-tight text-black border shadow appearance-none focus:outline-none focus:shadow-outline"
            value={this.state.subject}
            onChange={this.handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="block mb-2 text-contact font-bold text-black"
          >
            Message
          </label>
          <textarea
            aria-label="Message"
            name="message"
            id="message"
            placeholder=""
            required
            className="w-full text-contact h-48 px-3 py-2 leading-tight text-black border shadow appearance-none focus:outline-none focus:shadow-outline"
            value={this.state.message}
            onChange={this.handleChange}
          />
        </div>

        <ReCAPTCHA
          sitekey={this.state.recaptchaSiteKey}
          onChange={this.handleCaptcha}
        />

        <div className="flex mt-4 items-center justify-between">
          <button
            className="btn"
            type="submit"
            disabled={!this.state.captchaSuccess}
          >
            Submit
          </button>
        </div>
      </form>
    )
  }
}

export default ({ data }: ContactProps) => {
  console.log(data)
  return (
    <Layout
      activePage="Contact"
      title={useStaticText().contact.title}
      description={useStaticText().contact.lede}
    >
      <main>
        <header>
          <HeaderWithImage
            title="Contact"
            lede=""
            imageSrc={data.bgImage?.childImageSharp.resize.src}
          />
        </header>

        <article className="w-full pt-5 px-8 lg:px-16 xl:px-24 lg:w-2/3">
          <h1 className="mt-8 mb-2 text-h2 font-bold">
            {useStaticText().contact.title}
          </h1>
          <MarkdownText
            className="mb-10 leading-normal text-body lg:text-body"
            text={useStaticText().contact.lede}
          />
          <ContactForm recaptcha={data.site.siteMetadata?.recaptchaSiteKey} />
        </article>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query ContactQuery {
    site {
      siteMetadata {
        recaptchaSiteKey
      }
    }
    bgImage: file(
      name: { eq: "contact" }
      extension: { in: ["png", "jpg", "jpeg"] }
      sourceInstanceName: { eq: "themeImages" }
    ) {
      childImageSharp {
        resize(width: 1536) {
          src
        }
      }
    }
  }
`
