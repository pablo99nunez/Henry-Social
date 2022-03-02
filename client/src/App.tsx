import { Route, Routes } from "react-router-dom";

import User from "./Pages/User/User";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import PostDetail from "./Pages/PostDetail/PostDetail";
import useLogin from "./Hooks/useLogin";
import Payment from "./Components/Present/Payment";
import { io } from "socket.io-client";

const url = import.meta.env.PROD
  ? "https://henry-social-back.herokuapp.com"
  : "http://localhost:3001";
export const socket = io(url, { autoConnect: false });

function App() {
  useLogin();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile/:username" element={<User />}></Route>
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/Payment" element={<Payment />} />
      </Routes>
    </div>
  );
}

export default App;
