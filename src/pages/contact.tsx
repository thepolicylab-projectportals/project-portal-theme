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
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    // This code will actually post to netlify
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state }),
    })
      .then(() => navigate("/thank-you/"))
      .catch((error) => alert(error))
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
            <span className="text-red"> *</span>
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
            <span className="text-red"> *</span>
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
