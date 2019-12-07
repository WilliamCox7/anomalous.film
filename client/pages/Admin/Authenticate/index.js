import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Authenticate = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const { token } = getParams(window.location.href);
    localStorage.setItem("token", token);
    setToken(token);
  }, [message]);

  function setToken(token) {
    axios.get(`/auth/admin?token=${token}`)
    .then((response) => setMessage(response.data))
    .catch((err) => setMessage("Could not authenticate"));
  }

  return (
    <div>
      {message}
    </div>
  );
}

export default Authenticate;

function getParams(loc) {
  let params = {};
  let parts = loc.substring(loc.indexOf("?")+1).split("&");
  parts.forEach((p) => {
    let [key, value] = p.split("=");
    params[key] = value;
  });
  return params;
}