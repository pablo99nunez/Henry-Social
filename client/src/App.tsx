import { Route, Routes } from "react-router-dom";

import User from "./Pages/User/User";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import PostDetail from "./Pages/PostDetail/PostDetail";
import useLogin from "./Hooks/useLogin";
import Payment from "./Components/Present/Payment";
import NotFound from "./Pages/NotFound/NotFound";
import LandingPage from "./Pages/LandingPage/LandingPage";

function App() {
  useLogin();
  return (
    <div className="App">
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:username" element={<User />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
