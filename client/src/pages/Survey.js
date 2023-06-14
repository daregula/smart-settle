import React, { useState } from 'react'
import axios from "axios";
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';
import '../styles/Survey.css'


export const Survey = () => {
    const userID = useGetUserID();

    const [response, setResponse] = useState({
        salary: "1",
        employment: "1",
        education: "1",
        weather: "1",
        transportation: "1",
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
    console.log(response)

    return (
        
        <div className='survey'>
            
            <h1>Survey</h1>
            <form id="form" onSubmit={onSubmit}>
                <div class="form-control">
                    <label htmlFor='salary'> Salary </label>
                    <input type='text' id='salary' name='salary' onChange={handleChange}></input>
                </div>
                <div class="form-control">
                    <label htmlFor='employment'> Employment </label>
                    <select type='text' id='employment' name='employment' onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                
                <div class="form-control">
                    <label htmlFor='education'> Education </label>
                    <select type='text' id='education' name='education' onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div class="form-control">
                    <label htmlFor='weather'> Weather </label>
                    <select type='text' id='weather' name='weather' onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div class="form-control">
                    <label htmlFor='transportation'> Transportation </label>
                    <select type='text' id='transportation' name='transportation' onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                    <button type='submit'> Submit </button>
            </form>
            
        </div>
    )
}