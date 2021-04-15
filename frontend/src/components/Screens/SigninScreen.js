import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../actions/userActions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

export default function SinginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSingin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSingin;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign in</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox var="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign in
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer?{" "}
            <Link to={`/register?redirect=${redirect}`}>
              Create your account?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
