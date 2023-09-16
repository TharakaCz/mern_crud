import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import DelteUser from "./pages/DeleteUser";
import EditUser from "./pages/EditUser";
import Home from "./pages/Home";
import ShowUsers from "./pages/ShowUsers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/create" element={<CreateUser />} />
      <Route path="/user/details/:id" element={<ShowUsers />} />
      <Route path="/user/edit/:id" element={<EditUser />} />
      <Route path="/user/delete/:id" element={<DelteUser />} />
    </Routes>
  );
}

export default App;
