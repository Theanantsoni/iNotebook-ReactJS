import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = credentials;

    const response = await fetch("http://localhost:5000/api/auth/createuser", {

      method: "POST",
      headers: {
        'Content-type': 'application/json',
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ name, email, password })
    })

    const json = await response.json()
    console.log(json)

    if (json.success) {
      //Save the authtoken and Redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Account Successfully Created ", "success")
      navigate("/");
    }
    else {
      props.showAlert("Invalid credentials.", "danger")
    }
  }

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="mt-3">
      <h2>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>

        <div className="container mb-3">
          <label htmlFor="name" className="form-label">Enter Name</label>
          <input type="name" className="form-control" onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} id="password" name="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="cpassword" className="form-control" onChange={onChange} id="cpassword" name="cpassword" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
