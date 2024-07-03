import { useContext, useRef, useState, useEffect } from "react";
import { FaAngleRight, FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/AuthProvider";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const LogIn = () => {
  const { signIn, user, loader, error, setLoader } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const toast = useRef(null);
  console.log("User state in LogIn component:", user);

  useEffect(() => {
    if (user) {
      console.log("Navigating to dashboard");
      navigate("/dashboard");
    }
  }, [user, navigate]);

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

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const form = e.target;
    const formData = {
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const response = await signIn(formData);
      console.log("Response from signIn:", response);
      if (response.status === 200) {
        setLoader(false);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "User signed in successfully",
          life: 3000,
        });
        form.reset();
        navigate("/dashboard");
      }
    } catch (e) {
      console.log(e);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };


  return (
    <>
      <div className="flex justify-center gap-20 items-center ml-10">
        <div>
          <h2 className="text-4xl text-center mb-10">Log In</h2>
          <form onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center gap-2 md:w-[600px] mb-4">
              <FaEnvelope />
              <input
                type="text"
                name="email"
                className="grow md:w-[600px]"
                placeholder="Email"
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 md:w-[600px] mb-4">
              <FaLock />
              <input
                type={show ? "text" : "password"}
                name="password"
                className="grow md:w-[600px]"
                placeholder="Password"
                required
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
                value="Login"
              />
              <FaAngleRight />
            </label>
            <p>
              Don't have an account?{" "}
              <span>
                <Link to={"/signup"}>SignUp</Link>
              </span>
            </p>
          </form>
        </div>
        <div>
          <img
            src="https://images.pexels.com/photos/2911260/pexels-photo-2911260.jpeg"
            alt="Sign-Up to Nexile Digital - SaaS"
            className="h-screen w-[700px]"
          />
        </div>
        <Toast ref={toast} />
      </div>
      {loader && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle bg-[#0000002c] align-middle items-center"
          open
        >
          <div className="modal-overlay"></div>
          <div className="modal-box">
            <span className="loading loading-ring loading-lg"></span>
            <h3 className="font-bold text-lg">Loading...</h3>
          </div>
        </dialog>
      )}
    </>
  );
};

export default LogIn;
