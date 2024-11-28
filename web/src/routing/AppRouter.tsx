import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/dang-nhap" element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
