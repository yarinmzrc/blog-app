import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
