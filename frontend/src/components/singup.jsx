import React, { useState } from "react";
import {useLang} from "../language/langContext.jsx";

import { Button, DatePicker, Form, Input, Radio, Alert } from 'antd';



export default function SignUp({ setUser }) {
    const { lang, setLang, t } = useLang();
    const [role, setRole] = useState("PATIENT");
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);
    const [success, setSuccess] = useState(null);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email:      values.email,
                    password:   values.password,
                    role:       role,
                    name:       values.name,
                    address:    values.address,
                    phone:      values.phone,
                    diagnosis:  values.diagnosis,
                    birth_date: values.birth_date ? values.birth_date.format('YYYY-MM-DD') : null
                })
            });

            const data = await response.json();


            if (role === 'CAREGIVER') {
                setSuccess(data.data.message);
                return;
            }

            localStorage.setItem('accessToken', data.data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.data.user));
            setUser(data.data.user);

            console.log(data.data)

            if (!data.success) {
                setError(data.error.message);
            }

        } catch (err) {
            console.log(err);
            setError('Server error, please try again');
        } finally {
            setLoading(false);
        }
    };
    const handleRoleChange = (e) => {
        const newRole = e.target.value;
        setRole(newRole);

        form.resetFields();
    };
    return (

        <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
        >


            {error && (
                <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                    <Alert message={error} type="error" showIcon />
                </Form.Item>
            )}

            {success && (
                <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                    <Alert message={success} type="success" showIcon />
                </Form.Item>
            )}
            <Form.Item label={t("signup.role")}>
                <Radio.Group  value={role} onChange={handleRoleChange}>
                    <Radio value="PATIENT">{t("signup.patient")}</Radio>
                    <Radio value="CAREGIVER">{t("signup.caregiver")}</Radio>
                </Radio.Group>
            </Form.Item>

            {/*<Form.Item label={t("signup.email")} name="email">*/}
            {/*    <Input />*/}
            {/*</Form.Item>*/}

            {/*<Form.Item label={t("signup.password")} name="password">*/}
            {/*    <Input.Password placeholder={t("signup.password_placeholder")} />*/}
            {/*</Form.Item>*/}

            {/*<Form.Item label={t("signup.name")} name="name">*/}
            {/*    <Input />*/}
            {/*</Form.Item>*/}

            {/*<Form.Item label={t("signup.address")} name="address">*/}
            {/*    <Input />*/}
            {/*</Form.Item>*/}

            {/*<Form.Item label={t("signup.phone")} name="phone">*/}
            {/*    <Input />*/}
            {/*</Form.Item>*/}

            {/*<Form.Item label={t("signup.diagnosis")} name="diagnosis">*/}
            {/*    <Input disabled={role !== "PATIENT"} />*/}
            {/*</Form.Item>*/}

            {/*<Form.Item label={t("signup.birth_date")} name="birth_date">*/}
            {/*    <DatePicker disabled={role !== "PATIENT"} />*/}
            {/*</Form.Item>*/}





            <Form.Item
                label={t("signup.email")}
                name="email"
                rules={[{ required: true, message: t("signup.email_required") }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={t("signup.password")}
                name="password"
                rules={[{ required: true, message: t("signup.password_required") }]}
            >
                <Input.Password placeholder={t("signup.password_placeholder")} />
            </Form.Item>

            <Form.Item
                label={t("signup.name")}
                name="name"
                rules={[{ required: true, message: t("signup.name_required") }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={t("signup.address")}
                name="address"
                rules={[{ required: true, message: t("signup.address_required") }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={t("signup.phone")}
                name="phone"
                rules={[{ required: true, message: t("signup.phone_required") }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={t("signup.diagnosis")}
                name="diagnosis"
                rules={
                    role === "PATIENT"
                        ? [{ required: true, message: t("signup.diagnosis_required") }]
                        : []
                }
            >
                <Input disabled={role !== "PATIENT"} />
            </Form.Item>

            <Form.Item
                label={t("signup.birth_date")}
                name="birth_date"
                rules={
                    role === "PATIENT"
                        ? [{ required: true, message: t("signup.birth_date_required") }]
                        : []
                }
            >
                <DatePicker disabled={role !== "PATIENT"} />
            </Form.Item>






            <Form.Item label={null}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {t("signup.submit")}
                </Button>
            </Form.Item>
        </Form>
    );
}