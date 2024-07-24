import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {

    const [book, setBook]=useState({
        title:'',
        desc:'',
        cover:'',
        price:null
    });

    const navigate=useNavigate();
    const {id}=useParams();

    const handleChange=(e)=>{
        setBook((prev)=>({...prev, [e.target.name]:e.target.value}));
    }

    const handleClick=async()=>{
        try {
            await axios.put("http://localhost:8800/books/"+id, book);
            alert("Book updated successfully");
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    }


  return (
    <div className='form'>
        <input type="text" placeholder='title' onChange={handleChange} name='title'/>
        <input type="text" placeholder='description' onChange={handleChange} name='desc'/>
        <input type="text" placeholder='cover image' onChange={handleChange} name='cover'/>
        <input type="number" placeholder='price' onChange={handleChange} name='price'/>
        <button onClick={handleClick}>Update</button>
        </div>
  )
}

export default Update