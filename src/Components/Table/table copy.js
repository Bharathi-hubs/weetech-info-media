import React, { useState } from "react";
import { MdEditSquare, MdDelete } from 'react-icons/md';
import { HiPlusCircle } from 'react-icons/hi';
import { IoSave } from 'react-icons/io5';
import { Link } from "react-router-dom";

const EditableTable = () => {
  const [data, setData] = useState([
    { id: 1, addOnItems: "Bharathi", orderBy: "1", amount: "23.00" },
    { id: 2, addOnItems: "Mahi", orderBy: "2", amount: "34.00" },
    { id: 3, addOnItems: "Thiya", orderBy: "3", amount: "12.00" },
  ]);

  const [editIndex, setEditIndex] = useState(-1);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    setData([
      ...data,
      { id: Math.floor(Math.random() * 1000), name: "", amount: "" },
    ]);
    setEditIndex(data.length);
  };

  const handleUpdate = (rowData) => {
    const newData = [...data];
    newData[editIndex] = rowData;
    setData(newData);
    setEditIndex(-1);
  };

  const handleCancel = () => {
    setEditIndex(-1);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <div />
        <h1 className="text-center mt-3">CRUD OPERATION</h1>
        <Link to='/product-selector'><button className="btn btn-info text-light">Selector Page</button></Link>
      </div>
      <div className=" card p-3 mt-5 mb-5">
        <table class="table">
          <thead>
            <tr>
              <th scope="row">ID</th>
              <th scope="row">Add on Items</th>
              <th scope="row">Order By</th>
              <th scope="row">Amount</th>
              <th scope="row">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) =>
              editIndex === index ? (
                <EditableRow
                  key={row.id}
                  editData={row}
                  handleUpdate={handleUpdate}
                  handleCancel={handleCancel}
                />
              ) : (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.addOnItems}</td>
                  <td>{row.orderBy}</td>
                  <td><strong>€</strong>&nbsp;{row.amount}</td>
                  <td>
                    <button onClick={() => handleEdit(index)} className="alert alert-primary m-2 rounded p-1"><MdEditSquare /></button>
                    <button onClick={() => handleDelete(row.id)} className="alert alert-danger m-2 rounded p-1"><MdDelete /></button>
                  </td>
                </tr>
                // <table class="table">
                //   <thead>
                //     <tr>
                //       <th scope="col">#</th>
                //       <th scope="col">First</th>
                //       <th scope="col">Last</th>
                //       <th scope="col">Handle</th>
                //     </tr>
                //   </thead>
                //   <tbody>
                //     <tr>
                //       <th scope="row">1</th>
                //       <td>Mark</td>
                //       <td>Otto</td>
                //       <td>@mdo</td>
                //     </tr>
                //     <tr>
                //       <th scope="row">2</th>
                //       <td>Jacob</td>
                //       <td>Thornton</td>
                //       <td>@fat</td>
                //     </tr>
                //     <tr>
                //       <th scope="row">3</th>
                //       <td>Larry</td>
                //       <td>the Bird</td>
                //       <td>@twitter</td>
                //     </tr>
                //   </tbody>
                // </table>
              )
            )}
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          <button onClick={handleAdd} className="alert alert-primary m-2 rounded p-2">< HiPlusCircle /></button>
        </div>  </div>
    </div>
  );
};

const EditableRow = ({ editData, handleUpdate, handleCancel }) => {
  const [row, setRow] = useState(editData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRow({ ...row, [name]: value });
  };

  const handleSave = () => {
    handleUpdate(row);
  };

  return (
    <>
      <tr>
        <td>
          <input
            className="form-control"
            type="number"
            name="id"
            value={row.id}
            onChange={handleChange}
          />
        </td>
        <td>
          <input
            className="form-control"
            type="text"
            name="addOnItems"
            value={row.addOnItems}
            onChange={handleChange}
          />
        </td>
        <td>
          <input
            className="form-control"
            type="number"
            name="orderBy"
            value={row.orderBy}
            onChange={handleChange}
          />
        </td>
        <td>
          <input
            className="form-control"
            type="number"
            name="amount"
            value={row.amount}
            onChange={handleChange}
          />
        </td>
        <td>
          <button onClick={handleSave} className="alert alert-primary m-2 rounded p-1"><IoSave /></button>
          <button onClick={handleCancel} className="alert alert-danger m-2 rounded p-1"><MdDelete /></button>
        </td>
      </tr>
    </>
  );
};

export default EditableTable;
