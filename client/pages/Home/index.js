import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Styles from './styles';

const Home = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('/history')
    .then((response) => setHistory(response.data));
  }, []);

  let display = history.map((item) => {
    return <div key={item.id}>{item.title}</div>;
  });

  return (
    <div>
      {display}
      <style jsx>{Styles}</style>
    </div>
  );
}

export default Home;
