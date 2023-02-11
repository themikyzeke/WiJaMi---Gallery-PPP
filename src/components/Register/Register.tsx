import { useMutation } from "@tanstack/react-query";
import { FormEvent, FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../contexts/apiClientContext";
import { errorAlert, successAlert } from "../../utils/alerts";

export const Register:FunctionComponent = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const axios = useAxios();

  const sendRegister = useMutation(() =>
    axios.post("register", { username: name, password: pass })
  );

  const handleSubmit = (e:FormEvent<any>) => {
    e.preventDefault();
    console.log(name);
  };

  const navigate = useNavigate();

  return (
<section id="login">
  <div className="newbody">
    <div className="box">
    <form>
    <h4>Join WiJaMi community!</h4>
    <h6>To create an account, fill out your data</h6>
    <div className="inputBox" onSubmit={handleSubmit}>
    <input
          value={name}
          onChange={(e: { target: { value: any } }) => setName(e.target.value)}
          type="text"
          id="name"
          name="name"
          required
        />
				<span>Login</span>
				<i></i>
			</div>
      <div className="inputBox">
      <input
          value={pass}
          onChange={(e: { target: { value: any } }) => setPass(e.target.value)}
          type="password"
          id="password"
          name="password"
          required
        />
				<span>Password</span>
				<i></i>
			</div>
      <div className="links">
				<a>Already have an account?</a>
				<a href="/login">Log in here!</a>
			</div>

      <input
          onClick={() => {
            sendRegister.mutate(undefined, {
              onSuccess: () => {
                navigate("/login");
                successAlert("User registered! You can log in now!")
              },
              onError: ()=>{
                errorAlert("An error occurred!")
              }
            });
          }}
          type="submit"
          value="Register"
        />
        </form>
    </div>
    </div>
    </section>
  );
};
