import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import List from "../../utils/List" 
import "./../../styles/Search.module.css";

function Search() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="main">
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search by title, author or genre"
        />
      </div>
      <List input={inputText} />
    </div>
  );
}

export default Search;
