import { useState } from "react";
import { FaAngleRight, FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";

const AddUser = () => {
  const [show, setShow] = useState(false)

  const handleSubmit =(e)=>{
    e.preventDefault()
    console.log(e.target.email.value, e.target.name.value, e.target.password.value, e.target.file.value, e.target.role.value)
  }
  return (
    <div className="flex justify-center gap-20 items-center ml-10">
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
              type={show? "text" : "password"}
              name="password"
              className="grow md:w-[600px]"
              placeholder="Password"
            />
           
            {show ? (
                  <div onClick={() => setShow(false)}><FaEyeSlash/></div>
                ) : (
                  <div onClick={() => setShow(true)}><FaEye/></div>
             )}
          </label>
          <label className="input input-bordered flex items-center gap-2 md:w-[600px] mb-4">
          <select className="w-full max-w-full" name="role">
            <option disabled selected>
              You are a?
            </option>
            <option>Manager</option>
            <option>Owner</option>
            <option>Employee</option>
          </select></label>
          <input
            type="file"
            name="file"
            className="file-input file-input-bordered w-full mb-4"
          />
        <label className="input input-bordered flex items-center gap-2 md:w-[600px] mb-4">
            <input
              type="submit"
              className="grow md:w-[600px] cursor-pointer"
              placeholder="Password"
            />
            <FaAngleRight/>
          </label>
        <p>Already have an account? <span>Login</span></p>
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
    </div>
  );
};

export default AddUser;
