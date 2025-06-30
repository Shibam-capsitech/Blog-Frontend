import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ViewPost from "./pages/ViewAllPost";
import ViewPostInDetails from "./pages/ViewPostDetails";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/view-post" element={<ViewPost />} />
        <Route path="/view-post/:id" element={<ViewPostInDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
