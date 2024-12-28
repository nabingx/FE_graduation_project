import axios from "axios";
import { useState } from "react";
import { observer } from "mobx-react";
import { Button, Form, Input, Modal } from "antd";

import LoadingScreen from '../../components/LoadingScreen';

import "./Login.css";

import { apiURL } from "../../common/constant";
import { apiConfig } from "../../common/service/BaseService";
import StorageService from "../../common/service/StorageService";
import { loginStore } from "./LoginStore"; // Import LoginStore

const LoginPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Trạng thái modal
    const [form] = Form.useForm(); // Form quản lý trong modal

    const handleSubmit = (values: { username: string; password: string }) => {
        setLoading(true);
        const apiBody = {
            identifier: values.username,
            password: values.password,
        };
        axios.post(
            `${apiURL}/login`,
            apiBody,
            {
                headers: apiConfig,
            },
        )
            .then((response: any) => {
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

    const handleRegister = async () => {
        try {
            const values = await form.validateFields(); // Lấy dữ liệu từ form modal
            loginStore.dataRegister = { ...values }; // Gán dữ liệu vào store
            setLoading(true);
            await loginStore.fetchRegister(); // Gọi API từ store
            setIsModalVisible(false); // Đóng modal nếu thành công
            form.resetFields(); // Reset form
        } catch (errorInfo) {
            console.error("Validation Failed:", errorInfo);
        } finally {
            setLoading(false);
        }
    };

    const handleShowModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Đóng modal
        form.resetFields(); // Reset form khi đóng modal
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
                        <Button
                            type="primary"
                            htmlType="button"
                            style={{ marginTop: "20px", backgroundColor: "yellow", color: "black" }}
                            onClick={handleShowModal}
                        >
                            Register
                        </Button>
                    </Form.Item>

                    {error &&
                        <span style={{ color: 'red' }}>
                            Login failed! Please check your username and password.
                        </span>
                    }
                </Form>
            </div>

            {/* Modal đăng ký */}
            <Modal
                title="Register"
                visible={isModalVisible}
                onOk={handleRegister} // Xử lý khi nhấn "Xác nhận"
                onCancel={handleCancel} // Xử lý khi nhấn "Hủy"
                okText="Register"
                cancelText="Cancel"
            >
                <Form form={form} layout="vertical" name="register-form">
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please input your email!" },
                            { type: "email", message: "Please enter a valid email!" },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input placeholder="Enter your username" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: "Please input your password!" },
                            { min: 6, message: "Password must be at least 6 characters!" },
                        ]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default observer(LoginPage);
