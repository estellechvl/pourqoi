import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import Home from "./components/home";
import Edit from "./components/edit";



const Pourqoi = (): React.JSX.Element => {


  return (
      <div className="c-pourqoi">

          <nav>
              <ul>
                  <li>
                      <Link to="/">Home</Link>
                  </li>
                  <li>
                      <Link to="/edit">Edit Ingredients</Link>
                  </li>
              </ul>
          </nav>

          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/edit" element={<Edit/>}/>
          </Routes>

      </div>
  );
}

export default Pourqoi;
