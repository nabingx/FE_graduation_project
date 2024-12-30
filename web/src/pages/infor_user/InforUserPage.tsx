import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { infoStore } from "./InforStore";
import { toJS } from "mobx";
import "./Infor.scss";
import DefaultLayout from "../../components/layout/default_layout";
import { Form, Input, Button, Modal } from "antd";

const InforUserPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        infoStore.fetchGetInfoUser(); // Fetch thông tin người dùng
    }, []);

    const handleChangePassword = () => {
        setIsModalVisible(true); // Hiển thị modal khi nhấn nút
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Ẩn modal
        form.resetFields(); // Reset giá trị form
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            infoStore.dataChangePassword.password = values.currentPassword;
            infoStore.dataChangePassword.new_password = values.newPassword;

            await infoStore.fetchChangeInfoUser(); // Gọi hàm trong store để thay đổi mật khẩu
            setIsModalVisible(false); // Đóng modal nếu thành công
            form.resetFields(); // Reset form
        } catch (errorInfo) {
            console.error("Validation Failed:", errorInfo);
        }
    };

    return (
        <DefaultLayout>
            <div className="infor-user">
                <div className="title-infor">Thông tin cá nhân </div>
                <div className="infor-detail">
                    <div className="infor-detail__item">
                        <div className="infor-detail__avatar">
                            <img src={infoStore.inforUser.avatar} alt="avatar" />
                        </div>
                        <Form layout="vertical" className="infor-detail__form">
                            <Form.Item label="Tên người dùng">
                                <Input value={infoStore.inforUser.username} readOnly />
                            </Form.Item>
                            <Form.Item label="Email">
                                <Input value={infoStore.inforUser.email} readOnly />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={handleChangePassword}
                                    className="change-password-button"
                                >
                                    Thay đổi mật khẩu
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>

            {/* Modal hiển thị khi nhấn "Thay đổi mật khẩu" */}
            <Modal
                title="Thay đổi mật khẩu"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Mật khẩu hiện tại"
                        name="currentPassword"
                        rules={[
                            { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu hiện tại" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[
                            { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu mới" />
                    </Form.Item>
                </Form>
            </Modal>
        </DefaultLayout>
    );
};

export default observer(InforUserPage);
