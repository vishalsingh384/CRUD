import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {

    const [book, setBook]=useState({
        title:'',
        desc:'',
        cover:'',
        price:null
    });

    const navigate=useNavigate();

    const handleChange=(e)=>{
        setBook((prev)=>({...prev, [e.target.name]:e.target.value}));
    }

    const handleClick=async()=>{
        try {
            await axios.post("http://localhost:8800/books", book);
            alert("Book added successfully");
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleClickHome=()=>{
        navigate('/');
    }

  return (
    <div className='form'>
        <input type="text" placeholder='title' onChange={handleChange} name='title'/>
        <input type="text" placeholder='description' onChange={handleChange} name='desc'/>
        <input type="text" placeholder='cover image' onChange={handleChange} name='cover'/>
        <input type="number" placeholder='price' onChange={handleChange} name='price'/>
        <button onClick={handleClick}>Add</button>
        <button onClick={handleClickHome}>Home</button>
        </div>
  )
}

export default Add