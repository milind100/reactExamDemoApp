import './Sidebar.css';
import { CgLogOut } from "react-icons/cg"

import { NavLink, useNavigate } from 'react-router-dom';
import userIcon from "../../assets/userIcon.jpeg"

const Sidebar = ({ navItems }) => {

  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');
  const email = localStorage.getItem('email');


  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate("/login")
  }


  return (
    <>
      <nav className="sidebar">
        <header>

          <div className="profile_info">
            <h4>{role?.toUpperCase()}</h4>
            <img src={userIcon} className="profile_image" alt="" />
          </div>
          <div className="image-text">

            <div className="text logo-text">
              <span className="name text-center">{name}</span>
              <span className="name text-center">{email}</span>
              {/* <span className="profession">Web developer</span> */}
            </div>
          </div>
          <i className="toggle" />
        </header>


        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">


              {
                navItems.map((item) => {
                  const { to, name, icon } = item
                  return <li className="nav-link" key={to}>
                    <NavLink to={to}>
                      {/* <LuLayoutDashboard className="icon" size={30} /> */}
                      {icon}
                      <span className="text nav-text">{name}</span>
                    </NavLink>
                  </li>
                })
              }

            </ul>
          </div>

          <div className="bottom-content">
            <li className="">
              <a onClick={() => logout()}>
                <CgLogOut className="icon" size={30} />
                <span className="text nav-text"


                >Logout</span>
              </a>
            </li>

          </div>
        </div>
      </nav>

      <section className="home">
        <div className="text">Dashboard Sidebar</div>
      </section>
    </>



  )
}

export default Sidebar


