import React, { useState, useEffect } from 'react';

export default function Account() {
    const url = 'https://localhost:7080/api/Customers/1'
    const [data, setData] = useState([]);
    const objectAsArray = Object.entries(data);
  useEffect(() => {
   
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  console.log(data)
  return (
    <div>
    {objectAsArray.map(([key, value]) => (
      <p key={key}>{key}: {value}</p>
      
    ))}
  </div>
);
  
}