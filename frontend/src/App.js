import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout'; // Import the new Layout component
import Register from './components/register';
import Login from './components/login';

function App() {
    return (
        <Router>
            <AuthProvider>
               
                <Layout />
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
