import React, { useEffect, useState } from "react";
import "../css/data.css";

const Data = () => {
  const [tableData, setTableData] = useState([]);
    console.log("Hello");
    
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        setTableData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const DisplayDetails = () => {
    return tableData.map((data, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{data.ProGroupName}</td>
          <td>{data.Location}</td>
          <td>{data.Vendor}</td>
          <td>{data.ProCode}</td>
          <td>{data.Description}</td>
          <td>{data.PSMQty}</td>
          <td>{data.STOCK}</td>
          <td>{data.FL}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <section className="table-section">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Location</th>
              <th>Vendor</th>
              <th>ProCode</th>
              <th>Description</th>
              <th>PSMQty</th>
              <th>STOCK</th>
              <th>FL</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? <DisplayDetails /> : "No table data yet"}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Data;
