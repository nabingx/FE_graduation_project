import axios from "axios";
import { useState } from "react";
import { observer } from "mobx-react";
import { Button, Form, Input } from "antd";

import LoadingScreen from '../../components/LoadingScreen';

import "./Login.css";

import { apiURL } from "../../common/constant";
import { apiConfig } from "../../common/service/BaseService";
import StorageService from "../../common/service/StorageService";

const LoginPage = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const handleSubmit = (values: { username: string; password: string }) => {
        console.log("Form Submitted:", values);
        setLoading(true);
        const apiBody = {
            identifier: values.username,
            password: values.password,
        }
        axios.post(`${apiURL}/login`,
            apiBody,
            {
                headers: apiConfig,
            },
        )
            .then((response: any) => {
                console.log(response);
                if (response?.data?.token) {
                    // Lưu token vào localStorage
                    StorageService.saveToken(response?.data?.token);
                    window.location.href = '/question_detail';
                } else {
                    setError(true);
                }
                setLoading(false);
            })
            .catch(err => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    };

    return (
        <div className="login-page">
            <LoadingScreen loading={loading} />
            <div className="form-container">
                <Form
                    name="login-form"
                    layout="vertical"
                    onFinish={handleSubmit}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        style={{ fontSize: '20px' }}
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>

                    {error &&
                        <span style={{ color: 'red' }}>
                            Login failed! Please check your username and password.
                        </span>
                    }
                </Form>
            </div>
        </div>
    );
};

export default observer(LoginPage);
