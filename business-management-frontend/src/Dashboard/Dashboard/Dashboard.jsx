import { useContext, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaAnglesRight, FaArrowRightFromBracket, FaMoneyBill, FaSuitcase } from "react-icons/fa6";
import { IoIosPeople, IoMdChatbubbles } from "react-icons/io";
import { MdDashboardCustomize, MdEvent, MdPayment } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../Components/AuthProvider";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);
  const [show, setShow] = useState(false)
  const toggleMenu = () => {
    setShow(prevShow => !prevShow);
  };
  const dashboardIcon = (
    <div className="flex flex-col gap-3">
      <img
        src="https://i.ibb.co/BcH5sjJ/Nexile-Digital-Logo.png"
        alt="Company logo Nexile Digital"
        className="rounded w-[40px] opacity-60 h-[40px]"
      />
      <li className="bg-[#2c2c2c] text-[#bdbdbd] text-center p-2 flex justify-center text-xl rounded">
        <MdDashboardCustomize />
      </li>
      <li className="bg-[#2c2c2c] text-[#bdbdbd] text-center p-2 flex justify-center text-xl rounded">
        <FaSuitcase />
      </li>
      <li className="bg-[#2c2c2c] text-[#bdbdbd] text-center p-2 flex justify-center text-xl rounded">
        <RiAdminFill />
      </li>
      <li className="bg-[#2c2c2c] text-[#bdbdbd] text-center p-2 flex justify-center text-xl rounded">
        <IoIosPeople />
      </li>
      <li className="bg-[#2c2c2c] text-[#bdbdbd] text-center p-2 flex justify-center text-xl rounded">
        <IoMdChatbubbles />
      </li>
      <li className="bg-[#2c2c2c] text-[#bdbdbd] text-center p-2 flex justify-center text-xl rounded">
        <FaMoneyBill />
      </li>
      <li className="bg-[#2c2c2c] text-[#bdbdbd] text-center p-2 flex justify-center text-xl rounded">
        <MdEvent />
      </li>
      <li className="bg-[#2c2c2c] text-[#bdbdbd] text-center p-2 flex justify-center text-xl rounded">
        <MdPayment />
      </li>
      <hr />
      <Link to="/">
        <li className="bg-[#2c2c2c] text-[#bdbdbd] text-center p-2 flex justify-center text-xl rounded">
          <FaHome />
        </li>
      </Link>
    </div>
  );
  const dashboardMenu = (
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 z-10 flex gap-3">
      <li>
        <img
          src="https://i.ibb.co/3TR9vNf/Untitled-9.png"
          alt="Company logo Nexile Digital"
          className="rounded w-full h-full mb-5"
        />
      </li>
      <li>
        <span className="text-center p-3 flex justify-start text-xl rounded">
          <FaSuitcase /> Businesses
        </span>
      </li>
      <li>
        <span className="text-center p-3 flex justify-start text-xl rounded">
          <RiAdminFill />
          Manager
        </span>
      </li>
      <li>
        <span className="text-center p-3 flex justify-start text-xl rounded">
          <IoIosPeople />
          Employee
        </span>
      </li>
      <li>
        <span className="text-center p-3 flex justify-start text-xl rounded">
          <IoMdChatbubbles />
          Chat
        </span>
      </li>
      <li>
        <span className="text-center p-3 flex justify-start text-xl rounded">
          <FaMoneyBill />
          Finance
        </span>
      </li>
      <li>
        <span className="text-center p-3 flex justify-start text-xl rounded">
          <MdEvent />
          Event
        </span>
      </li>
      <li>
        <span className="text-center p-3 flex justify-start text-xl rounded">
          <MdPayment />
          Payment
        </span>
      </li>
    </ul>
  );
  const hanldeLogOut =()=>{
    logOut()
  }

  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Page content here */}
          <div className="flex gap-20">
            <div className="bg-black h-screen p-3 flex flex-col justify-between items-center">
              {dashboardIcon}
              <div className="avatar online relative">
                <div className="w-8 rounded-full" onClick={toggleMenu} onMouseEnter={toggleMenu}>
                  <img src={user?.avatar} />
                </div>
                <ul className={`menu menu-sm bg-base-200 rounded-box w-56 absolute left-10 top-0 ${show ? "block" : "hidden"}`}>
                <li>
                  <a className="flex justify-between font-semibold" onClick={hanldeLogOut}><span>Log Out </span><FaArrowRightFromBracket />
                  </a>
                </li>
              </ul>
              </div>
              <label
                htmlFor="my-drawer"
                className="p-3 bg-[#3d3d3d] border-0 drawer-button rounded-full text-white text-xl"
              >
                <FaAnglesRight />
              </label>
            </div>
            <div className="flex justify-center items-center text-center w-full">
              <Outlet />
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          {dashboardMenu}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
