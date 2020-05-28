import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Search = styled.input`
    margin-left: 5px;
    font-size: 1rem;
    border-radius: 5px;
    padding: 10px;
    width: 300px;
    border: 1px solid black;
    margin-bottom: 30px;
    background-color: transparent;
`
const Button = styled.button`
    font-size: 1rem;
    width: 60px;
    padding: 10px;
    margin-left: 20px;
    border-radius: 5px;
    box-shadow: 7px 7px 10px #888888;
`

export default function SearchForm() {

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios
            .get("https://secret-recipe-cookbook.herokuapp.com/recipes")
            .then(response => {

                const recipe = response.data.results.filter(recipe =>
                    recipe.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setData(recipe);
            });
    }, [searchTerm]);

    const changeHandler = event => {
        setSearchTerm(event.target.value);
    }

    return (
        <div className="search-form">
                <Search 
                    type="text"
                    name="search"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={changeHandler}
                />
            <Button type="submit">Go</Button>

            {data.map((recipe => {
                return (
                <div className="info">
                <h3>{recipe.category}</h3>
                <h3>{recipe.name}</h3>
                </div>
                )
            }))}
        </div>
        

        )
}

