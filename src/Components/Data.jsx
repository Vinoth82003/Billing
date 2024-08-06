import React, { useEffect, useState } from "react";
import "../css/data.css";

const Data = () => {
  const [tableData, setTableData] = useState([]);
  const [isForm, setIsForm] = useState(false);
  const [fileName, setFileName] = useState(""); // New state for storing file name

  const getSheet = () => {
    setTableData([]);
    fetch(`https://billing-backend-psi.vercel.app/api/products/`)
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const downloadSheet = () => {
    const data = tableData;
    const csvData = data.map((item) =>
      [
        item.Description,
        item["Pending Qty"],
        item["Pending Wt"],
        item["Po No~EO"],
      ].join(",")
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Description,Pending Qty,Pending Wt,Po No~EO", ...csvData].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFileName(file.name); // Update the state with the file name
    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target.result;
      // Parse CSV content here and update the tableData state
      console.log(contents);
      // Example: convert CSV to JSON (implement your own logic here)
    };

    reader.readAsText(file);
  };

  useEffect(() => {
    getSheet();
  }, []);

  const DisplayDetails = () => {
    return tableData.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.Description}</td>
        <td>{item["Pending Qty"]}</td>
        <td>{item["Pending Wt"]}</td>
        <td>{item["Po No~EO"]}</td>
      </tr>
    ));
  };

  const Table = () => (
    <>
      <div className="buttons-container">
        <button type="button" onClick={getSheet}>
          Refresh Sheet
        </button>
        <button type="button" onClick={downloadSheet}>
          Download Sheet
        </button>
        <button type="button" onClick={() => setIsForm(true)}>
          Update Sheet
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Weight</th>
            <th>Po No</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            <DisplayDetails />
          ) : (
            <tr>
              <td colSpan="5">
                <h3 className="load">Loading.......please wait</h3>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );

  const UpdateForm = () => (
    <>
      <form action="#" className="form">
        <button type="button" onClick={() => setIsForm(false)}>
          Close
        </button>
        <label htmlFor="fileUpload" className="file-upload-label">
          Update File
        </label>
        <input
          type="file"
          id="fileUpload"
          className="file-upload-input"
          onChange={handleFileUpload}
          hidden
        />
        <div className="file-upload-placeholder">
          Drag and drop a file here or click to select a file
        </div>
        {fileName && <p>Selected file: {fileName}</p>}
      </form>
    </>
  );

  return (
    <section className="table-section">
      {isForm ? <UpdateForm /> : <Table />}
    </section>
  );
};

export default Data;
