import React,{ useState, useEffect } from 'react';
import { Link } from "react-router-dom";


export default function Search(props) {
  const [searchtext, setSearchtext] = useState("");
  return (
    <>
      <div className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">  
          <div className="input-group">
            <input type="text" onChange={(e) => {setSearchtext(e.target.value);props.search(searchtext);}} className="form-control border-0 small" placeholder="Search ...." aria-label="Search" aria-describedby="basic-addon2"/>   
          </div>  
        </div>  
      </>
    );
  }