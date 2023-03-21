// Import necessary modules
import axios from "axios";
import { useEffect, useState } from "react";
import Buttons from "./Buttons";
import FilterDropdown from "./FilterDropdown";
import Pagination from "./Pagination";

// Define a functional component
export default function CountriesList() {

// Define state variables
const [filteredC, setFilteredC] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [countriesPerPage] = useState(10);
const [select, setSelect] = useState('default');
const [countries, setCountries] = useState([]);


//fetch data with axios start

useEffect(() => {
  axios
    .get(`https://restcountries.com/v2/all?fields=name,region,area`)
    .then((response) => {
      setCountries(response.data);
    });
}, []);

//fetch data with axios end

// Define functions for pagination
const indexOfLast = currentPage * countriesPerPage;
const indexOfFirst = indexOfLast - countriesPerPage;
const shownCountries = filteredC.length>0 ? filteredC.slice(indexOfFirst, indexOfLast) : countries.slice(indexOfFirst, indexOfLast);
const paginate = (pageNumber) => {
setCurrentPage(pageNumber);
}

// Define sorting functions
const sortA = () => {
const countriesCopy = [...countries];
const filteredCCopy = [...filteredC];
setCountries(countriesCopy.sort((a, b) => (a.name > b.name ? 1 : -1)));
setFilteredC(filteredCCopy.sort((a, b) => (a.name > b.name ? 1 : -1)));
shownCountries.sort((a, b) => (a.name > b.name ? 1 : -1));
};

const sortD = () => {
const countriesCopy = [...countries];
const filteredCCopy = [...filteredC];
setCountries(countriesCopy.sort((a, b) => (a.name > b.name ? -1 : 1)));
setFilteredC(filteredCCopy.sort((a, b) => (a.name > b.name ? -1 : 1)));
};

// Define reset function
const resetAll = () => {
setFilteredC([]);
setCurrentPage(1);
setSelect('default');
};

// Define handleInput function
const changeSelect = (e) => {
setSelect(e.target.value);
}

const handleInput = (e) => {
switch (e.target.value) {
case "oceania":
const filteredC = countries.filter(
(country) => country.region === "Oceania");
setFilteredC(filteredC);
setCurrentPage(1);
break;
case "smaller":
  const filteredC1 = countries.filter((country) => country.area < 65300);
  setFilteredC(filteredC1);
  setCurrentPage(1);
break;

default:
}
};

// Render the component
return (
<>
{/* Upper block */}
<div className="upper-block">Countries</div>
  {/* Buttons */}
  <Buttons sortA={sortA} sortD={sortD} resetAll={resetAll}></Buttons>

  {/* FilterDropdown */}
  <FilterDropdown handleInput={handleInput} select={select} changeSelect={changeSelect}></FilterDropdown>

  {/* Display countries */}
  <ul className="list-item-father">
    {shownCountries.map((country, i) => (
      <li className="list-item" key={i}>
        <span className="name">{country.name}</span>
        <span className="region">{country.region}</span>
        <span className="area">{country.area}</span>
     
        </li>
    ))}
  </ul>
  {/* Pagination Component */}
  <Pagination 
    countriesPerPage={countriesPerPage} 
    totalCountries={filteredC.length>0 ? filteredC.length : countries.length} 
    paginate={paginate} 
    currentPage={currentPage} 
    setCurrentPage={setCurrentPage}
  />

</>
);
}
// Exporting the component as the default export of the module
