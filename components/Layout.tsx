import Alert from "components/Alert"
import Footer from "components/Footer"
import Meta from "components/Meta"
import React from "react"

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
