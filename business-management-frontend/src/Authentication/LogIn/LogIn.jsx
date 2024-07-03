import { useContext, useRef, useState } from "react";
import {
  FaAngleRight,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/AuthProvider";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/saga-blue/theme.css"; // or any other theme you prefer
import "primereact/resources/primereact.min.css";

const LogIn = () => {
  const { signIn, user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const toast = useRef(null);
  const [loader, setLoader] = useState(false);
  
  console.log(user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    const form = e.target;
    console.log(form, form.email.value, form.password.value);
    const formData = new FormData();
    formData.append("email", form.email.value);
    formData.append("password", form.password.value);
    console.log(formData)
    try {
     const response = await signIn(formData);
     setLoader(false)
     toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "User signed up successfully",
      life: 3000,
    });
      console.log(response)
      form.reset();
      navigate("/dashboard");
    } catch (e) {
      console.log(e.response.data);
      setLoader(false)
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: e.response?.data?.error||"User sign up Failed",
        life: 3000,
      });
    }
  };
  return (
   <>
    <div className="flex justify-center gap-20 items-center ml-10">
      {/* form */}
      <div>
        <h2 className="text-4xl text-center mb-10">Log In</h2>
        <form action="" onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 md:w-[600px] mb-4">
            <FaEnvelope />
            <input
              type="text"
              name="email"
              className="grow md:w-[600px]"
              placeholder="Email"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 md:w-[600px] mb-4">
            <FaLock />
            <input
              type={show ? "text" : "password"}
              name="password"
              className="grow md:w-[600px]"
              placeholder="Password"
            />

            {show ? (
              <div onClick={() => setShow(false)}>
                <FaEyeSlash />
              </div>
            ) : (
              <div onClick={() => setShow(true)}>
                <FaEye />
              </div>
            )}
          </label>
          
          <label className="input input-bordered flex items-center gap-2 md:w-[600px] mb-4">
            <input
              type="submit"
              className="grow md:w-[600px] cursor-pointer"
              placeholder="Password"
            />
            <FaAngleRight />
          </label>
          <p>
            Don't have an account? <span><Link to={"/signup"}>SignUp</Link></span>
          </p>
        </form>
      </div>
      {/* Image */}
      <div>
        <img
          src="https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg"
          alt="Sign-Up to Nexile Digital - SaaS"
          className="h-screen w-[700px]"
        />
      </div>
      <Toast ref={toast} />
    </div>
    {loader && (<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle bg-[#0000002c] align-middle items-center" open>
      <div className="modal-overlay"></div>
      <div className="modal-box">
      <span className="loading loading-ring loading-lg"></span>
      <h3 className="font-bold text-lg">Loading...</h3>
        {/* You can add additional content or styling here */}
      </div>
    </dialog>)}</>
  );
};

export default LogIn;
