import React from "react"
import Alert from "./Alert"
import Footer from "./Footer"
import Meta from "./Meta"

interface Props {
  preview: boolean
}

const Layout: React.FC<Props> = ({ preview, children }) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        {preview && <Alert />}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
export default Layout
