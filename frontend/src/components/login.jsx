import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {useLang} from "../language/langContext.jsx";

import { Button, Form, Input, Alert } from 'antd';





export default function Login({ setUser }) {
    const navigate = useNavigate();
    const { t } = useLang();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(null);


    const onFinish = async (values) => {
        setLoading(true);
        setError(null);
        setInfo(null);

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                credentials: 'include',
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

            //
            // if (role === 'CAREGIVER' && !profile.approved) {
            //     setInfo(t("login.caregiver_pending")); // "Please wait for confirmation"
            //     return;
            // }
            //
            // if (role === 'PATIENT' && !profile.active) {
            //     setError(t("login.patient_inactive")); // "Your account is deactivated"
            //     return;
            // }
            //
            //
            //
            // localStorage.setItem('accessToken', data.data.accessToken);
            // localStorage.setItem('user', JSON.stringify(data.data.user));
            //
            // setUser(data.data.user);


            const { user, accessToken } = data.data;
            const { role, profile } = user;

            if (role === 'CAREGIVER' && !profile.approved) {
                setInfo(t("login.caregiver_pending"));
                return;
            }

            if (role === 'PATIENT' && !profile.active) {
                setError(t("login.patient_inactive"));
                return;
            }

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);

            console.log(data.data.user)
            // const role = data.data.user.role;

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

                {error && (
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Alert message={error} type="error" showIcon />
                    </Form.Item>
                )}
                {info && (
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Alert message={info} type="warning" showIcon />
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