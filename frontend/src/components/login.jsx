import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {useLang} from "../language/langContext.jsx";

import { Button, Form, Input, Alert } from 'antd';





export default function Login() {
    const navigate = useNavigate();
    const { t } = useLang();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                credentials: 'include', // чтобы refresh token cookie сохранился
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: values.username,
                    password: values.password
                })
            });

            const data = await response.json();

            if (!data.success) {
                setError(data.error.message);
                return;
            }

            localStorage.setItem('accessToken', data.data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.data.user));

            console.log(data.data.user.role)
            const role = data.data.user.role;
            // if (role === 'ADMIN')     navigate('...');
            // if (role === 'PATIENT')   navigate('...');
            // if (role === 'CAREGIVER') navigate('...');

        } catch (err) {
            setError('Server error, please try again');
        } finally {
            setLoading(false);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh"
            }}
        >
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 800, width: "100%" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {/*<Form.Item*/}
                {/*    label="Username"*/}
                {/*    name="username"*/}
                {/*    rules={[{ required: true, message: 'Please input your username!' }]}*/}
                {/*>*/}
                {/*    <Input />*/}
                {/*</Form.Item>*/}

                {/*<Form.Item*/}
                {/*    label="Password"*/}
                {/*    name="password"*/}
                {/*    rules={[{ required: true, message: 'Please input your password!' }]}*/}
                {/*>*/}
                {/*    <Input.Password />*/}
                {/*</Form.Item>*/}



                {/*<Form.Item label={null}>*/}
                {/*    <Button type="primary" htmlType="submit">*/}
                {/*        Submit*/}
                {/*    </Button>*/}
                {/*</Form.Item>*/}
                {error && (
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Alert message={error} type="error" showIcon />
                    </Form.Item>
                )}


                <Form.Item
                    label={t("login.username")}
                    name="username"
                    rules={[{ required: true, message: t("login.username_required") }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={t("login.password")}
                    name="password"
                    rules={[{ required: true, message: t("login.password_required") }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {t("login.submit")}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}