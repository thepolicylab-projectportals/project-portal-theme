import React, { FunctionComponent } from "react"
import { SearchPageLayout } from "../layouts"
import { FaTimesCircle } from "react-icons/fa"
import { Link } from "gatsby"
import Modal from "react-modal"

export interface ModalProps {
  data
}
export const SearchModal: FunctionComponent<ModalProps> = ({
  data,
}: ModalProps) => {
  const modalCloseTimeout = 300
  const [isModalOpen, setModalOpen] = React.useState(false)
  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.58)",
    },
    content: {
      maxWidth: "960px",
      margin: "32px auto",
    },
  }
  return (
    <>
      <li className="nav-item">
        <button
          className="flex items-center p-5 leading-snug text-white
                  hover:opacity-75 xl:text-black xl:px-3 xl:py-2"
          onClick={(e) => {
            e.stopPropagation()
            setModalOpen(true)
          }}
        >
          <span className="text-nav pb-1 ml-2 border-b-2 border-transparent hover:border-primary">
            Quick Search
          </span>
        </button>
      </li>
      <Modal
        isOpen={isModalOpen}
        style={modalStyles}
        onRequestClose={closeModal}
        contentLabel="Modal"
        closeTimeoutMS={modalCloseTimeout}
      >
        <Link
          to="/"
          aria-label="close modal"
          onClick={(e) => {
            e.preventDefault()
            closeModal()
          }}
        >
          <span className="pt-1">
            <FaTimesCircle className="text-primary text-xl" />
          </span>
        </Link>
        <SearchPageLayout searchNodes={data} />
      </Modal>
    </>
  )
}
