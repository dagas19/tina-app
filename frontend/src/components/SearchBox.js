import React, { useState } from "react";

export default function SearchBox(props) {
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="input-group" onSubmit={submitHandler}>
      <div className="form-outline">
        <input
          type="text"
          name="q"
          id="q"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <button className="btn btn-dark btn-lg" type="submit">
        <i className="fa fa-search"></i>
      </button>
    </form>
  );
}
