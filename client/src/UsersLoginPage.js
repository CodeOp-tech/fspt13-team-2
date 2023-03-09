import { useState } from "react";
import axios from 'axios';

const HOSTNAME = "http://localhost:5050"

export default function UsersLoginPage() {
  const [credentials, setCredentials] = useState({
    nick: "",
    password: ""
  })

  const {nick, password} = credentials;

  const handleChange = (e) => {
    const {name, value} = e.target;
    setCredentials({...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios(`${HOSTNAME}/users/login`, {
        method: "POST",
        data: credentials
      });
    
      //store it locally
      localStorage.setItem("token", data.token);
      console.log(data.message, data.token);
    } catch (error) {
      console.log(error)
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
  }

  const requestData = async () => {
    try {
      const { data } = await axios(`${HOSTNAME}/users/profile`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
    });

    console.log(data.message);
  } catch (error) {
    console.log(error)
  }
};

    return (
      <div>
        <div className="container mx-auto px-10">

          <input
          value={nick}
          onChange={handleChange}
          name="nick"
          type="text"
          className="form-control mb-2 input input-sm input-bordered w-full max-w-xs"
          />
          <input
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2 input input-sm input-bordered w-full max-w-xs"
          />

          <div className="btn-group">
          <button className="btn btn-primary" onClick={login}>
            Log in
          </button>
          <button className="btn btn-primary" onClick={logout}>
            Log out
          </button>
        </div>
        </div>

        <div className="text-center p-4">
          <button className="btn btn-outline secondary" onClick={requestData}>
            Request protected data
          </button>
        </div>
      </div>
    )
}
