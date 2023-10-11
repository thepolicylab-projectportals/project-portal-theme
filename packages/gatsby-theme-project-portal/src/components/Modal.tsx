import React, { FunctionComponent } from "react"
import { createPortal } from "react-dom"
import { SearchPageLayout } from "../layouts"

export interface ModalProps {
  closeModal
  data
}
export const Modal: FunctionComponent<ModalProps> = ({
  closeModal,
  data,
}: ModalProps) => {
  return (
    <>
      {createPortal(
        <div className="modal">
          <div
            className="fixed inset-0 z-40 w-auto my-6 mx-auto max-w-3xl max-h-fit"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none max-h-screen overflow-y-auto">
              <SearchPageLayout searchNodes={data} />
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
