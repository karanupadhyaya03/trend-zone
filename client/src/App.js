import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Club from "./components/Club";
import User from "./components/User";
import NoPage from "./components/NoPage";
import style from "./App.css";

export default function App() {
  return (
    <div className="App" style={style}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="clubs/:id" element={<Club />} />
          <Route path="users/:id" element={<User />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
