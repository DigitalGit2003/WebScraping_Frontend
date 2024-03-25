import React from 'react'


export default function Home() {

  const retData = async () => {
    var response = await fetch(`http://127.0.0.1:5050/product/netmeds`, {
      method: "get",
    });
    response = await response.json();
    console.log(response.results);
  };

  return (
    <div>
      <h1>Hello,</h1>

      <button type="button" onClick={retData}>
        button
      </button>
    </div>
  );
}
