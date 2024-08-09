import { Link, Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="">
        {/* bottom nav 만큼 빼기 */}
        <div className="h-[calc(100vh-3.75rem)]">
            <Outlet/>
        </div>
        <nav className="border flex w-full justify-around items-center ">
            <Link className="p-2 m-2 border" to="/">home</Link>
            {/* <Link className="p-2 m-2 border" to="/setting">setting</Link> */}
            <Link className="p-2 m-2 border" to="/test">test</Link>
        </nav>
    </div>
  )
}

export default Layout