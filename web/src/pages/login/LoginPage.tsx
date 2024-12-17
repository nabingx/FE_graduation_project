import React from "react";
import { observer } from "mobx-react";
import { Button, Form, Input } from "antd";
import "./Login.css";

const LoginPage = () => {
    const handleSubmit = (values: { username: string; password: string }) => {
        console.log("Form Submitted:", values);
        // Gọi tới hàm trong LoginStore
    };

    return (
        <div className="login-page">
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
                </Form>
            </div>
            <div className="image-container">
                <img src="/public/assets/images/quesstion.jpg" alt="Login Illustration" />
                <div>
                    Hello vui ver vui vẻ mai hanh phuc
                </div>
            </div>
        </div>
    );
};

export default observer(LoginPage);
