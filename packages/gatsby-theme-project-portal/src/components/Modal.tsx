import React, { FunctionComponent } from "react"
import { createPortal } from "react-dom"
import { SearchBar } from "./SearchBar"
import { SearchPageLayout } from "../layouts"
import { TopicType } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

export interface ModalProps {
  closeModal
}
export const Modal: FunctionComponent<ModalProps> = ({
  closeModal,
}: ModalProps) => {
  return (
    <>
      {createPortal(
        <div className="modal">
          <div className="fixed inset-0 z-40 w-auto h-auto my-6 mx-auto max-w-3xl max-h-fit">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}

              {/*body*/}
              <div className="relative p-6 flex-auto"></div>
              {/*footer*/}
            </div>
          </div>
          <div
            className="opacity-20 fixed inset-0 z-60 bg-black"
            onClick={closeModal}
          ></div>
        </div>,
        document.body
      )}
    </>
  )
}
