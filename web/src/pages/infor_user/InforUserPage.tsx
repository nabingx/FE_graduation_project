import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { infoStore } from "./InforStore";
import { toJS } from "mobx";
import "./Infor.scss";
import DefaultLayout from "../../components/layout/default_layout";
import { Form, Input, Button, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const InforUserPage = () => {
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
    const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [infoForm] = Form.useForm();

    useEffect(() => {
        infoStore.fetchGetInfoUser(); // Fetch thông tin người dùng
    }, []);

    const handleChangePassword = () => {
        setIsPasswordModalVisible(true); // Hiển thị modal thay đổi mật khẩu
    };

    const handleCancelPassword = () => {
        setIsPasswordModalVisible(false); // Ẩn modal thay đổi mật khẩu
        form.resetFields(); // Reset giá trị form
    };

    const handleOkPassword = async () => {
        try {
            const values = await form.validateFields();
            infoStore.dataChangePassword.password = values.currentPassword;
            infoStore.dataChangePassword.new_password = values.newPassword;

            await infoStore.fetchChangePassword(); // Gọi hàm trong store để thay đổi mật khẩu
            setIsPasswordModalVisible(false); // Đóng modal nếu thành công
            form.resetFields(); // Reset form
        } catch (errorInfo) {
            console.error("Validation Failed:", errorInfo);
        }
    };

    const handleChangeInfo = () => {
        setIsInfoModalVisible(true); // Hiển thị modal thay đổi thông tin cá nhân
        infoForm.setFieldsValue(toJS(infoStore.inforUser)); // Đặt giá trị mặc định
    };

    const handleCancelInfo = () => {
        setIsInfoModalVisible(false); // Ẩn modal thay đổi thông tin cá nhân
        infoForm.resetFields(); // Reset giá trị form
    };

    const handleOkInfo = async () => {
        try {
            const values = await infoForm.validateFields();
            infoStore.dataChangeInfor = values; // Gán dữ liệu từ form
            await infoStore.fetchChangeAvatarUser(); // Gọi API để cập nhật thông tin
            setIsInfoModalVisible(false); // Đóng modal nếu thành công
        } catch (errorInfo) {
            console.error("Validation Failed:", errorInfo);
        }
    };

    return (
        <DefaultLayout>
            <div className="infor-user">
                <div className="title-infor">Thông tin cá nhân</div>
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
                            <Form.Item>
                                <Button
                                    type="default"
                                    onClick={handleChangeInfo}
                                    className="change-info-button"
                                >
                                    Thay đổi thông tin cá nhân
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>

            {/* Modal thay đổi mật khẩu */}
            <Modal
                title="Thay đổi mật khẩu"
                visible={isPasswordModalVisible}
                onOk={handleOkPassword}
                onCancel={handleCancelPassword}
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

            {/* Modal thay đổi thông tin cá nhân */}
            <Modal
                title="Thay đổi thông tin cá nhân"
                open={isInfoModalVisible}
                onOk={handleOkInfo}
                onCancel={handleCancelInfo}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form form={infoForm} layout="vertical">
                    <Form.Item
                        label="Tên người dùng"
                        name="username"
                        rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
                    >
                        <Input placeholder="Nhập tên người dùng" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Vui lòng nhập email!" },
                            { type: "email", message: "Email không hợp lệ!" },
                        ]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>
                    <Form.Item
                        label="Avatar"
                        name="avatar"
                        rules={[{ required: true, message: "Vui lòng chọn ảnh đại diện!" }]}
                    >
                        <Upload
                            maxCount={1}
                            beforeUpload={() => false}
                            listType="picture"
                        >
                            <Button icon={<UploadOutlined />}>Tải lên ảnh đại diện</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </DefaultLayout>
    );
};

export default observer(InforUserPage);
