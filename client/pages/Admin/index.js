import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setToken(token);
    else getAuth();
  }, []);

  function setToken(token) {
    axios.get(`/auth/admin?token=${token}`)
    .then((response) => setMessage(response.data))
    .catch(getAuth);
  }

  function getAuth() {
    axios.get('/auth');
    setMessage("An Email has been sent to your inbox");
  }

  return (
    <div>
      {message}
    </div>
  );
}

export default Admin;
