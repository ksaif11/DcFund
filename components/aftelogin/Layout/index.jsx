import { ToastContainer } from "react-toastify"

import Topbar from "./Topbar"
import Sidebar from "./Sidebar"

const Layout = ({ children }) => {
  return (
    <div className="my-2 flex w-full gap-2">
      <Sidebar />
      <div className="mx-auto w-full px-4 pb-2 lg:max-w-[800px] xl:max-w-[1200px]">
        <Topbar />
        {children}
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={false}
          progress={undefined}
          theme="dark"
          toastClassName="bg-neutral-800"
          className="w-full max-w-[400px]"
        />
      </div>
    </div>
  )
}

export default Layout
