import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
        <nav>
            appbar
        </nav>
        <Outlet/>
    </>
  )
}

export default Layout