import React, { useState } from "react";
import { Input } from "../Input/Input";
import { LoginUserName ,LoginPassword} from "../../store/Globals";
import { useNavigate } from "react-router";

export const Login = () => {
  const [admin, setAdmin] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (admin === LoginUserName && password === LoginPassword){
        localStorage.setItem("isAdmin",true)
        alert("Success")
        navigate("/")
        navigate(0)
    }else{
        alert("Please Enter a Valid USername and Password")
    }
  }

  return (
    <div className="Login cardStyle container my-5 loginCardStyle p-3">
      <h4 className="mb-2 text-center">Welcome to Our DashBoard! 👋</h4>
      <p className="mb-0 text-center">Please use "Admin" and "123698745" for username and password</p>
      <p className="mb-4 text-center">Or sign-in to your account to start</p>
      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          name="name"
          type="text"
          value={admin}
          setValue={setAdmin}
          inputClass={"textStartImp"}
        />
        <Input
          label="Password"
          name="name"
          type="password"
          value={password}
          setValue={setPassword}
          inputClass={"textStartImp"}
        />

        <div className="mb-3">
          <button className="btn btn-primary d-grid w-100" type="submit">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};
