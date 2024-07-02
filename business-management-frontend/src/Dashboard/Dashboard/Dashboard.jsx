import { FaAnglesRight } from "react-icons/fa6";
import { Outlet } from "react-router-dom";

const Dashboard = () => {

    const dashboardIcon = <div>
                  <h1 className="btn">Logo</h1>
                  <h1>hu</h1>
                  <h1>hu</h1>
    </div>
    return (
        <>
            <div className="drawer drawer-mobile">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Page content here */}
                    <div className="flex gap-20">
                        <div className="bg-black h-screen p-3 flex flex-col justify-between items-end">
                            {dashboardIcon}
                            <label htmlFor="my-drawer" className="btn bg-[#3d3d3d] border-0 drawer-button rounded-full text-white text-xl">
                                <FaAnglesRight />
                            </label>
                        </div>
                        <div className="flex justify-center items-center text-center w-full">
                            <Outlet />
                        </div>
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
