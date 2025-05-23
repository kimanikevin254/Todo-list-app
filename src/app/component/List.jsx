'use client';
import React, { useState } from 'react';
import '../styles/page.css'; // Import your CSS file

const List = () => {
    const [userInput, setUserInput] = useState('');
    const [list, setList] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Track index of item to edit

    // Set a user input value
    const updateInput = (value) => {
        setUserInput(value);
    };

    // Add or edit item
    const handleAction = () => {
        if (userInput.trim() === '') return; // Avoid adding empty items

        if (editIndex !== null) {
            // Edit existing item
            const updatedList = list.map((item, index) =>
                index === editIndex ? { ...item, value: userInput } : item
            );
            setList(updatedList);
            setEditIndex(null); // Reset edit mode
        } else {
            // Add new item
            const newItem = {
                id: Math.random(), // Consider using a more reliable ID generator
                value: userInput,
            };
            setList([...list, newItem]);
        }

        setUserInput(''); // Clear input field
    };

    // Function to delete item from list using id to delete
    const deleteItem = (id) => {
        const updatedList = list.filter((item) => item.id !== id);
        setList(updatedList);
    };

    // Function to enable editing mode
    const startEdit = (index) => {
        setUserInput(list[index].value);
        setEditIndex(index); // Set the index of the item to be edited
    };

  return (
    <>
    <div className='container'>
            <div className='subTitle'>
                TODO LIST
            </div>
            <div className='inputContainer'>   
                <input className='inputField'
                    placeholder={editIndex !== null ? "Edit item..." : "Add item..."}
                    value={userInput}
                    onChange={(e) => updateInput(e.target.value)}
                />
                <button className='button'
                    onClick={handleAction}
                >
                    {editIndex !== null ? 'Update' : 'ADD'}
                </button>
            </div>
            <div className='listContainer'>
                {list.length > 0 ? (
                    list.map((item, index) => (
                        <div
                            key={item.id} className='listItem'>
                            <span className='listText'>{item.value}</span>
                            <span>
                                <button className='buttonDelete'
                                    onClick={() => deleteItem(item.id)}
                                >
                                    Delete
                                </button>
                                <button className='buttonEdit'
                                    onClick={() => startEdit(index)}
                                >
                                    Edit
                                </button>
                            </span>
                        </div>
                    ))
                ) : (
                    <div className='noItems'>
                        No items in the list
                    </div>
                )}
            </div>
        </div>

    </>

  )
}

export default List
