import React, { Component } from "react"
import { graphql, navigate } from "gatsby"
import { Navbar, SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"
import { HeaderWithImage } from "../components/HeaderWithImage"

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
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-lg font-bold text-black"
          >
            Full name
          </label>
          <input
            aria-label="Full name"
            name="name"
            id="name"
            placeholder="Start typing"
            required
            type="text"
            className="w-full px-3 py-2 leading-tight text-black border shadow appearance-none focus:outline-none focus:shadow-outline"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-bold text-black"
          >
            Email address
          </label>
          <input
            aria-label="Full name"
            name="email"
            id="email"
            placeholder="example@example.com"
            required
            type="email"
            className="w-full px-3 py-2 leading-tight text-black border shadow appearance-none focus:outline-none focus:shadow-outline"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="subject"
            className="block mb-2 text-lg font-bold text-black"
          >
            Subject
          </label>
          <input
            aria-label="Subject"
            name="subject"
            id="subject"
            placeholder="Start typing"
            required
            type="text"
            className="w-full px-3 py-2 leading-tight text-black border shadow appearance-none focus:outline-none focus:shadow-outline"
            value={this.state.subject}
            onChange={this.handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="block mb-2 text-lg font-bold text-black"
          >
            Message
          </label>
          <textarea
            aria-label="Message"
            name="message"
            id="message"
            placeholder="Start typing"
            required
            className="w-full h-48 px-3 py-2 leading-tight text-black border shadow appearance-none focus:outline-none focus:shadow-outline"
            value={this.state.message}
            onChange={this.handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="px-6 py-4 text-lg font-bold text-white bg-rust-500 hover:bg-rust-800 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    )
  }
}

export default ({ data }: ContactProps) => {
  return (
    <Layout>
      <SiteMetadata
        title="Project Portal - Contact Us"
        description="Questions from East Evidencia"
      />

      <Navbar activePage="Contact" />

      <HeaderWithImage
        title="Contact"
        lede=""
        imageSrc={data.bgImage.childImageSharp.resize.src}
      />

      <div className="container pt-6 overflow-hidden bg-white">
        <div className="flex flex-wrap">
          <div className="lg:w-2/3 sm:w-full">
            <h2 className="mb-8 text-2xl font-bold leading-loose tracking-tight text-black dark:text-white lg:text-5xl">
              Want to talk to the Office of Innovation? We'd love to hear from
              you!
            </h2>

            <p className="leading-normal text-md lg:text-lg">
              Check out our frequently asked questions. Please direct
              project-specific questions to points of contact listed for
              individual projects. We're happy to discuss questions about the
              partnerships pilot, general questions about working with the City
              of San Antonio, and ideas for how we can improve this site.
            </p>
          </div>
        </div>
      </div>

      <div className="container pt-6 overflow-hidden bg-white">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-2/3">
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ContactQuery {
    bgImage: file(relativePath: { regex: "/bg-contact.png/" }) {
      childImageSharp {
        resize(width: 1536, height: 352) {
          src
        }
      }
    }
  }
`
