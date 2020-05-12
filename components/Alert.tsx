import Container from "components/Container"
import React from "react"

const Alert: React.FC = () => {
  return (
    <div className="text-white border-b bg-accent-7 border-accent-7">
      <Container>
        <div className="py-2 text-sm text-center">
          Это превью версия сайта.{" "}
          <a
            href="/api/exit-preview"
            className="underline transition-colors duration-200 hover:text-cyan"
          >
            Нажмите сюда
          </a>{" "}
          чтобы выйти из превью.
        </div>
      </Container>
    </div>
  )
}

export default Alert
