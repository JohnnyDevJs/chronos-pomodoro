import type { ReactNode } from 'react'
import { Bounce, ToastContainer } from 'react-toastify'

type MessagesContainerProps = {
  children: ReactNode
}
export function MessagesContainer({ children }: MessagesContainerProps) {
  return (
    <>
      {children}

      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
    </>
  )
}
