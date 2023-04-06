import React, { useState } from "react";
/**------------------------------Dependencies------------------------------------ */
import { Link } from "react-router-dom";
/**------------------------------Icons------------------------------------ */
import { MdEditSquare, MdDelete } from 'react-icons/md';
import { HiPlusCircle } from 'react-icons/hi';
import { IoSave } from 'react-icons/io5';

const EditableTable = () => {

    //Table Initial state
    const [data, setData] = useState([
        { id: 1, addOnItems: "Sprit 200 ml", orderBy: "1", checked: false, amount: "23.00" },
        { id: 2, addOnItems: "7Up 250ml", orderBy: "2", checked: true, amount: "34.00" },
        { id: 3, addOnItems: "Maaza 400ml", orderBy: "3", checked: false, amount: "12.00" },
    ]);
    const [editIndex, setEditIndex] = useState(-1);

    //Checkbox OnChange

    //   const handleCheckboxChange = (id) => {
    //     setData(
    //       data.map((item) =>
    //         item.id === id ? { ...item, checked: !item.checked } : item
    //       )
    //     );
    //   };

    // Delete 
    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };


    // Add 
    const handleAdd = () => {
        setData([
            ...data,
            { id: Math.floor(Math.random() * 1000), name: "", amount: "" },
        ]);
        setEditIndex(data.length);
    };

    //Update
    const handleUpdate = (rowData) => {
        const newData = [...data];
        newData[editIndex] = rowData;
        setData(newData);
        setEditIndex(-1);
    };

    //Cancel
    const handleCancel = () => {
        setEditIndex(-1);
    };

    //Edit
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
                            {/* <th scope="row">Default Select</th> */}
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
                                    {/* <td>
                    <input
                      type="checkbox"
                      checked={row.checked}
                      onChange={() => handleCheckboxChange(row.id)}
                    />
                  </td> */}
                                    <td>
                                        <button onClick={() => handleEdit(index)} className="alert alert-primary m-2 rounded p-1"><MdEditSquare /></button>
                                        <button onClick={() => handleDelete(row.id)} className="alert alert-danger m-2 rounded p-1"><MdDelete /></button>
                                    </td>
                                </tr>
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


    //Checkbox Event

    // const handleCheckboxChange = (id) => {
    //     setRow(
    //         row.map((item) =>
    //             item.id === id ? { ...item, checked: !item.checked } : item
    //         )
    //     );
    // };

    //Onchange Event
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRow({ ...row, [name]: value });
    };

    //Save
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
                {/* <td>
          <input
            type="checkbox"
            checked={row.checked}
            onChange={() => handleCheckboxChange(row.id)}
          />
        </td> */}
                <td>
                    <button onClick={handleSave} className="alert alert-primary m-2 rounded p-1"><IoSave /></button>
                    <button onClick={handleCancel} className="alert alert-danger m-2 rounded p-1"><MdDelete /></button>
                </td>
            </tr>
        </>
    );
};

export default EditableTable;
