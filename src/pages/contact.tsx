import React, { Component } from "react"
import { graphql, navigate } from "gatsby"
import { MarkdownText } from "../components"
import { Layout } from "../layouts/Layout"
import { HeaderWithImage } from "../components/HeaderWithImage"
import language from "site/language.json"

const encode = (data: { [Key: string]: string }) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

interface ContactProps {
  data: {
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
}

function changeCheck() {
  //job of changeCheck is to remove all error messages that
  //may have been brought up from a previous submit attempt
  if (event.target.name != "subject") {
    document.getElementById(event.target.name + "ErrorLabel").className =
      "font-bold text-red-600 hidden"
    document.getElementById(event.target.name).className =
      "w-full text-contact px-3 py-2 leading-tight text-black shadow appearance-none outline-transparent focus:outline-none focus:shadow-outline"

    if (event.target.name == "email") {
      document.getElementById("invalidEmailErrorLabel").className =
        "font-bold text-red-600 hidden"
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
      "font-bold text-red-600"
    document.getElementById("name").className =
      "w-full text-contact px-3 py-2 leading-tight text-black border-2 border-red-500 shadow appearance-none outline-transparent focus:outline-none focus:shadow-outline"
    nameCheck = false
  }
  //check email is filled out AND if filled out, it is in proper email format
  if (state.email == "") {
    document.getElementById("emailErrorLabel").className =
      "font-bold text-red-600"
    document.getElementById("email").className =
      "w-full text-contact px-3 py-2 leading-tight text-black border-2 border-red-500 shadow appearance-none outline-transparent focus:outline-none focus:shadow-outline"
    emailCheck = false
  }
  //if email exists, make sure it is valid email format
  else {
    if (!document.getElementById("email").validity.valid) {
      document.getElementById("invalidEmailErrorLabel").className =
        "font-bold text-red-600"
      document.getElementById("email").className =
        "w-full text-contact px-3 py-2 leading-tight text-black border-2 border-red-500 shadow appearance-none outline-transparent focus:outline-none focus:shadow-outline"
      emailCheck = false
    }
  }
  //check message is filled out
  if (state.message == "") {
    document.getElementById("messageErrorLabel").className =
      "font-bold text-red-600"
    document.getElementById("message").className =
      "w-full text-contact px-3 py-2 leading-tight text-black border-2 border-red-500 shadow appearance-none outline-transparent focus:outline-none focus:shadow-outline"
    messageCheck = false
  }
  return nameCheck && emailCheck && messageCheck
}

class ContactForm extends Component {
  state: ContactFormState

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        name="contact"
        novalidate=""
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-contact font-bold text-black"
          >
            Full name
          </label>
          <label id="nameErrorLabel" className="font-bold text-red-600 hidden">
            FULL NAME REQUIRED TO SUBMIT
          </label>
          <input
            aria-label="Full name"
            name="name"
            id="name"
            placeholder="John Doe"
            required=""
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
          </label>
          <label id="emailErrorLabel" className="font-bold text-red-600 hidden">
            EMAIL ADDRESS REQUIRED TO SUBMIT
          </label>
          <label
            id="invalidEmailErrorLabel"
            className="font-bold text-red-600 hidden"
          >
            MUST INPUT PROPER EMAIL ADDRESS
          </label>
          <input
            aria-label="Full name"
            name="email"
            id="email"
            placeholder="example@example.com"
            required=""
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
            required=""
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
          <label
            id="messageErrorLabel"
            className="font-bold text-red-600 hidden"
          >
            MESSAGE REQUIRED TO SUBMIT
          </label>
          <textarea
            aria-label="Message"
            name="message"
            id="message"
            placeholder=""
            required=""
            className="w-full text-contact h-48 px-3 py-2 leading-tight text-black border shadow appearance-none focus:outline-none focus:shadow-outline"
            value={this.state.message}
            onChange={this.handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    )
  }
}

export default ({ data }: ContactProps) => {
  return (
    <Layout
      activePage="Contact"
      title={language.contact.title}
      description={language.contact.lede}
    >
      <HeaderWithImage
        title="Contact"
        lede=""
        imageSrc={data.bgImage.childImageSharp.resize.src}
      />

      <article className="w-full pt-5 px-8 lg:px-16 xl:px-24 lg:w-2/3">
        <h1 className="mt-8 mb-2 text-h2 font-bold">
          {language.contact.title}
        </h1>
        <MarkdownText
          className="mb-10 leading-normal text-body lg:text-body"
          text={language.contact.lede}
        />
        <ContactForm />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query ContactQuery {
    bgImage: file(relativePath: { regex: "/^contact.jpg$/" }) {
      childImageSharp {
        resize(width: 1536) {
          src
        }
      }
    }
  }
`
