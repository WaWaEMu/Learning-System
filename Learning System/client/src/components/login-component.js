import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = (props) => {
    let { currentUser, setCurrentUser } = props;
    const navigate = useNavigate();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [eMsg, setEMsg] = useState("");

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleLogin = () => {
        AuthService.login(email, password)
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                window.alert("Login succesfully, you are now redirected to the profile page.")
                setCurrentUser(AuthService.getCurrentUser());
                navigate("/profile");
            })
            .catch((e) => {
                console.log(e.response);
                setEMsg(e.response.data);
            })
    }

    return (
        <div style={{ padding: "3rem" }} className="col-md-12">
            <div className="form-group">
                {eMsg && <div className="alert alert-danger" role="alert">{eMsg}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input onChange={ handleChangeEmail } type="text" className="form-control" name="email"/>
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input onChange={ handleChangePassword } type="password" className="form-control" name="password"/>
            </div>
            <br />
            <div className="form-group">
                <button onClick={ handleLogin } className="btn btn-primary btn-block">
                    <span>Login</span>
                </button>
            </div>
        </div>
    )
}

export default LoginComponent;