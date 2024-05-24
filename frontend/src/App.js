import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./HomePage.js";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import ChatPage from "./ChatPage";
import './input.css';

function App() {
    const [users, setUsers] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8800");
            setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, [setUsers]);

    return (
        <Router>
            <Routes>
                <Route
                    exact
                    path="/CRUD"
                    element={
                        <div className="w-full max-w-xl mx-auto mt-8 flex flex-col items-center space-y-4">
                            <h2 className="text-2xl font-bold">USUÁRIOS</h2>
                            <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
                            <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
                        </div>
                    }
                />
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage getUsers={getUsers} />} />
                <Route path="/chat" element={<ChatPage />} />

            </Routes>
            <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
        </Router>
    );
}

export default App;
