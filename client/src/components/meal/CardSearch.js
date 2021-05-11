import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import TextInput from '../form/TextInput';
import axios from 'axios';

function CardSearch(props) {
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recipe, setRecipe] = useState({name: '', ingredientsNeededIds: []});
  function handleSearchChange(e) {
    setSearchKey(e.target.value);
    searchRecipes(e.target.value);
  }

  async function searchRecipes(key) {
    try {
      const searchResponse = await axios.get(`http://localhost:5000/recipe?search=${key}`);
      console.log({searchResponse})
      setSearchResults(searchResponse.data);
    } catch(error) {
      console.log({error})
    }
  }

  function onResultClick(result) {
    setSearchKey(result.name);
    setRecipe(result);
  }

  function saveRecipe() {
    props.addExisting(recipe);
    props.setMode('view');
  }

  return (
    <>
      <input type="text" className="bg-gray-100 p-2 border-b-2 border-green-500 mb-5" placeholder="Search your recipes" value={searchKey} onChange={handleSearchChange}/>
      {searchResults.length > 0 ? 
        <div>
          {searchResults.map(result => <p onClick={() => onResultClick(result)}>{result.name}</p>)}
        </div>
      : null}
      <div></div>
      <div className="flex space-x-5">
        <button className="card-btn" onClick={saveRecipe} type="button">Save</button>
      </div>
    </>
  )
}
   
export default CardSearch;
