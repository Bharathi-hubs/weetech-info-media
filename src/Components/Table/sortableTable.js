import { isClickableInput } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";

const Sort = () => {
    const [data, setData] = useState([
        { id: 1, name: "John Doe", email: "john.doe@example.com", isActive: true },
        { id: 2, name: "Jane Doe", email: "jane.doe@example.com", isActive: false },
        { id: 3, name: "Bob Smith", email: "bob.smith@example.com", isActive: true },
    ]);

    const [editIndex, setEditIndex] = useState(-1);
    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const handleAdd = () => {
        setData([
            ...data,
            { id: Math.floor(Math.random() * 1000), name: "", email: "", isActive: false },
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

    console.log("isActive", data.isActive);
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Active</th>
                        <th>Action</th>
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
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td>
                                    <input type="checkbox" className="custom-control-input form-control" id="customCheck6" name="Usage" checked={row.isActive} value={row.isActive} />
                                </td>
                                <td>
                                    <button onClick={() => handleEdit(index)}>Edit</button>
                                    <button onClick={() => handleDelete(row.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
            <button onClick={handleAdd}>Add</button>
        </div>
    );
};
const EditableRow = ({ editData, handleUpdate, handleCancel }) => {
    const [row, setRow] = useState(editData);
    const [isChecked, setIsChecked] = useState(false)
    const handleOnChecked = () => {
        setIsChecked(!isChecked);

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRow({ ...row, [name]: value });

    };

    const handleSave = () => {
        handleUpdate(row);
    };

    return (
        <tr>
            <td>
                <input
                    type="number"
                    name="id"
                    value={row.id}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="name"
                    value={row.name}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="email"
                    value={row.email}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input type="checkbox" className="custom-control-input form-control" id="customCheck6" name="Usage" checked={isChecked} value={row.isActive} onChange={handleOnChecked} />
            </td>
            <td>
                <button onClick={handleSave
                    (row.isActive)}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </td>
        </tr>
    );
};

export default Sort;