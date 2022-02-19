import React, { useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import User from "./Pages/User/User";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import PostDetail from "./Pages/PostDetail/PostDetail";
import useLogin from "./Hooks/useLogin";
import useisLogged from "./Hooks/useisLogged";
import { useNavigate } from "react-router";

function App() {
  useLogin();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile/:username" element={<User />}></Route>
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </div>
  );
}

export default App;
