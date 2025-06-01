import React from "react";
import { Navbar } from "./components";
import {  Routes, Route } from "react-router-dom";
import { Home, Blog } from "./pages";

import Layout from "./pages/Admin/Layout";
import Dashboard from "./pages/Admin/Dashboard";
import AddBlog from "./pages/Admin/AddBlog";
import BlogList from "./pages/Admin/BlogList";
import Comments from './pages/Admin/Comments'
import Login from "./components/admin/Login";

import { Toaster } from "react-hot-toast"

import { useAppContext } from "./context/AppContext"

const App = () => {

  const { token } = useAppContext();
  return (
    <>
    <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={token ? <Layout /> : <Login />}>
            <Route index element={<Dashboard />}/>
            <Route path="addBlog" element={<AddBlog />}/>
            <Route path="listBlog" element={<BlogList />}/>
            <Route path="comments" element={<Comments />}/>
          </Route>
        </Routes>
    </>
  );
};

export default App;
