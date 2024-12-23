import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/login/LoginPage";
import CreateQuestionPage from "../pages/create_question/CreateQuestionPage";
import QuestionDetailPage from "../pages/question_detail/QuestionDetailPage";

const AppRouter: React.FC = () => {
    let user_token = typeof window !== 'undefined'
        && (window.localStorage.getItem("auth_token"))
        ? (window.localStorage.getItem("auth_token"))
        : "";
    return (
        <Router>
            <Routes>
                <Route path='/'
                    element={user_token ?
                        <Navigate to={"/question_detail"} />
                        : <Navigate to={"/login"} />
                    }
                />
                <Route path="/login" element={
                    user_token ?
                        <Navigate to={'/'} />
                        : <LoginPage />
                }
                />
                <Route path="/create_question" element={!user_token ?
                    <Navigate to={'/'} />
                    : <CreateQuestionPage />
                }
                />
                <Route path="/question_detail" element={!user_token ?
                    <Navigate to={'/'} />
                    : <QuestionDetailPage />
                }
                />
                <Route path="*"
                    element={user_token ?
                        <Navigate to={'/'} />
                        : <Navigate to={'/login'} />
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;
