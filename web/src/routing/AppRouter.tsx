import React, { useEffect } from "react";
import moment from "moment";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/login/LoginPage";
import CreateQuestionPage from "../pages/create_question/CreateQuestionPage";
import QuestionDetailPage from "../pages/question_detail/QuestionDetailPage";
import InforUserPage from "../pages/infor_user/InforUserPage";
import NewfeedsPage from "../pages/newfeeds/NewfeedsPage";

const AppRouter: React.FC = () => {
    let user_token = typeof window !== 'undefined'
        && (window.localStorage.getItem("auth_token"))
        ? (window.localStorage.getItem("auth_token"))
        : "";
    useEffect(() => {
        if (localStorage?.getItem("login_time")) {
            /// check thời gian hết hạn của token
            var login_time = moment(localStorage.getItem("login_time"));
            var now = moment();
            var diff = login_time.diff(now, 'hours', true);
            if (Math.abs(diff) > 3) {   /// token hết hạn sau 3 tiếng
                localStorage.removeItem("auth_token");
                localStorage.removeItem("login_time");
                window.location.reload();
            }
        }
    }, [])
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
                <Route path="/infor-user" element={!user_token ?
                    <Navigate to={'/'} />
                    : <InforUserPage />
                }
                />
                <Route path="*"
                    element={user_token ?
                        <Navigate to={'/'} />
                        : <Navigate to={'/login'} />
                    }
                />
                <Route path="/register"


               />

               <Route path="/newfeeds" element={<NewfeedsPage/>} 
               />
            </Routes>
        </Router>
    );
};

export default AppRouter;
