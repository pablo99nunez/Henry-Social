import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import User from "./Pages/User/User";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import PostDetail from "./Pages/PostDetail/PostDetail";
import useLogin from "./Hooks/useLogin";
import Payment from "./Components/Present/Payment";
import NotFound from "./Pages/NotFound/NotFound";
import Verification from "./Pages/Verification/Verification";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Admin from "./Pages/Admin/Admin";

export enum USER_ACTION {
  signUp,
  logIn,
}

function App() {
  useLogin();

  const [action, setAction] = useState(USER_ACTION.logIn);

  const handleActionChange = (e?: any) => {
    let act;
    if (e.target.value) {
      act = e.target.value === "logIn" ? 1 : 0;
      return setAction(act);
    }
    act = action ? USER_ACTION.signUp : USER_ACTION.logIn;
    setAction(act);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/landing"
          element={<LandingPage handleActionChange={handleActionChange} />}
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Login
              USER_ACTION={USER_ACTION}
              action={action}
              handleActionChange={handleActionChange}
            />
          }
        />
        <Route path="/profile/:username" element={<User />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
