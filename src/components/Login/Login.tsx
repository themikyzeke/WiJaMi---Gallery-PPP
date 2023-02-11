import React, { useCallback, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../contexts/apiClientContext";
import { useToken } from "../../contexts/authTokenContext";
import { successAlert } from "../../utils/alerts";

export const Login = (props: any) => {
  const navigate = useNavigate();
  const axios = useAxios();
  const [_, setToken] = useToken();

  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const sendLogin = useMutation(() =>
    axios.post<string>("login", { username: name, password: pass })
  );

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(name);
  };

  return (
    
<section id="login">
  <div className="newbody">
    <div className="box">
    <form>
    <h4>Log in to get started.</h4>
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
				<a>Don’t have an account?</a>
				<a href="/register">Register here!</a>
			</div>

      <input
          onClick={() => {
            sendLogin.mutate(undefined, {
              onSuccess: ({ data }) => {
                setToken(data);
                successAlert("Welcome! You're now logged in!");
                navigate("/");
              },
            });
          }}
          type="submit"
          value="Login"
        />
        </form>
    </div>
    </div>
    </section>
  );
};
