import React, { Component } from "react"
import { graphql } from "gatsby"
import { Navbar, SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"
import { HeaderWithImage } from "../components/HeaderWithImage"

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

interface ConcactFormState {
  name: string
  email: string
  subject: string
  message: string
}

class ContactForm extends Component {
  state: ConcactFormState

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
    }

    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangeSubject = this.handleChangeSubject.bind(this)
    this.handleChangeMessage = this.handleChangeMessage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value })
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value })
  }

  handleChangeSubject(event) {
    this.setState({ subject: event.target.value })
  }

  handleChangeMessage(event) {
    this.setState({ message: event.target.value })
  }

  handleSubmit(event) {
    alert(
      `${this.state.name} ${this.state.email} ${this.state.subject} ${this.state.message}`
    )
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-black text-lg font-bold mb-2"
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
            className="shadow appearance-none border w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            value={this.state.name}
            onChange={this.handleChangeName}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-black text-lg font-bold mb-2"
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
            className="shadow appearance-none border w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            value={this.state.email}
            onChange={this.handleChangeEmail}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="subject"
            className="block text-black text-lg font-bold mb-2"
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
            className="shadow appearance-none border w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            value={this.state.subject}
            onChange={this.handleChangeSubject}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-black text-lg font-bold mb-2"
          >
            Message
          </label>
          <textarea
            aria-label="Message"
            name="message"
            id="message"
            placeholder="Start typing"
            required
            className="shadow appearance-none border w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline h-48"
            value={this.state.message}
            onChange={this.handleChangeMessage}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-rust-500 hover:bg-rust-200 text-white text-lg font-bold py-4 px-6 focus:outline-none focus:shadow-outline"
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

      <Navbar />

      <HeaderWithImage
        title="Contact"
        lede=""
        imageSrc={data.bgImage.childImageSharp.resize.src}
      />

      <div className="container pt-6 overflow-hidden bg-white">
        <div className="flex flex-wrap">
          <div className="lg:w-2/3 sm:w-full">
            <h2 className="text-2xl font-bold text-black dark:text-white tracking-tight leading-loose lg:text-5xl mb-8">
              Want to talk to the Office of Innovation? We'd love to hear from
              you!
            </h2>

            <p className="text-md lg:text-lg leading-normal">
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
          <div className="lg:w-2/3 w-full">
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
