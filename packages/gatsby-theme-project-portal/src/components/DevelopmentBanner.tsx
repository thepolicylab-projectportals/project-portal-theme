import React from "react"
import { Link } from "gatsby"

export const DevelopmentBanner: React.FC = () => {
  return (
    <div className="py-6 overflow-hidden bg-warning text-center">
      <h4>
        ⚠️ This is a beta site.{" "}
        <Link to="/contact" className="underline hover:no-underline">
          We welcome feedback!
        </Link>{" "}
        ⚠️
      </h4>
    </div>
  )
}
