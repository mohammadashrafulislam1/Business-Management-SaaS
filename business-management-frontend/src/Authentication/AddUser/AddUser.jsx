import { useContext, useRef, useState, useEffect } from "react";
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

const AddUser = () => {
  const { signUp, user, loader, error, 
    setLoader } = useContext(AuthContext);
  useEffect(() => {
      if (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error,
          life: 3000,
        });
      }
  }, [error]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  const toast = useRef(null);
  console.log(user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();
    formData.append("email", form.email.value);
    formData.append("name", form.name.value);
    formData.append("password", form.password.value);
    formData.append("role", "owner");
    formData.append("avatar", form.avatar.files[0]);
    console.log(formData);
    try {
     const response = await signUp(formData);
     console.log(response)
     if(response.status ===201){
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "User signed up successfully.",
          life: 3000,
        });
      form.reset();
      navigate("/login");
      setLoader(false)}
      else{
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "User sign up Failed",
          life: 3000,
        })
      }
    } catch (e) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error||"User sign up Failed",
        life: 3000,
      });
      setLoader(false)
    }
  };
  return (
    <div className="flex justify-center gap-20 items-center ml-10">
      {loader && (<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle bg-[#0000002c] align-middle items-center" open>
      <div className="modal-overlay"></div>
      <div className="modal-box">
      <span className="loading loading-ring loading-lg"></span>
      <h3 className="font-bold text-lg">Loading...</h3>
        {/* You can add additional content or styling here */}
      </div>
    </dialog>)}
      {/* form */}
      <div>
        <h2 className="text-4xl text-center mb-10">Sign Up</h2>
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
            <FaUser />
            <input
              type="text"
              name="name"
              className="grow md:w-[600px]"
              placeholder="Full Name"
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
          <input
            type="file"
            name="avatar"
            className="file-input file-input-bordered w-full mb-4"
            required
          />
          <label className="input input-bordered flex items-center gap-2 md:w-[600px] mb-4">
            <input
              type="submit"
              className="grow md:w-[600px] cursor-pointer"
              placeholder="Password"
            />
            <FaAngleRight />
          </label>
          <p>
            Already have an account? <span><Link to="/login">Login</Link></span>
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
  );
};

export default AddUser;
