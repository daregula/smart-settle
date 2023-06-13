import React, { useState } from 'react'
import axios from "axios";
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';

export const Survey = () => {
    const userID = useGetUserID();

    const [response, setResponse] = useState({
        salary: "",
        employment: "",
        education: "",
        weather: "",
        transportation: "",
        userOwner: userID
    });

    const navigate = useNavigate()


    const handleChange = (e) => {
        const {name, value} = e.target;
        setResponse({...response, [name] : value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3001/responses", response);
            alert("Responses stored")
            navigate("/results")
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='survey'>
            <h1>Survery</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor='salary'> Salary </label>
                <input type='text' id='salary' name='salary' onChange={handleChange}></input>

                <label htmlFor='employment'> Employment </label>
                <input type='text' id='employment' name='employment' onChange={handleChange}></input>

                <label htmlFor='education'> Education </label>
                <input type='text' id='education' name='education' onChange={handleChange}></input>

                <label htmlFor='weather'> Weather </label>
                <input type='text' id='weather' name='weather' onChange={handleChange}></input>

                <label htmlFor='transportation'> Transportation </label>
                <input type='text' id='transportation' name='transportation' onChange={handleChange}></input>

                <button type='submit'> Submit </button>
            </form>
        </div>
    )
}