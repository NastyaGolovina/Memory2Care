import React, { useState } from "react";
import {useLang} from "../language/langContext.jsx";

import { Button, DatePicker, Form, Input, Radio, Alert } from 'antd';



export default function SignUp() {
    const { lang, setLang, t } = useLang();
    const [role, setRole] = useState("PATIENT");
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);


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
            console.log(data);

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

    return (

        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
        >
            {/*<Form.Item label="Role">*/}
            {/*    <Radio.Group>*/}
            {/*        <Radio value="Patient"> Patient </Radio>*/}
            {/*        <Radio value="Caregiver"> Caregiver </Radio>*/}
            {/*    </Radio.Group>*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label="Email">*/}
            {/*    <Input />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item  label="password">*/}
            {/*    <Input.Password placeholder="input password" />*/}
            {/*</Form.Item >*/}
            {/*<Form.Item label="name">*/}
            {/*    <Input />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label="address">*/}
            {/*    <Input />*/}
            {/*</Form.Item>*/}

            {/*<Form.Item label="phone">*/}
            {/*    <Input />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label="diagnosis">*/}
            {/*    <Input />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label="birth_date">*/}
            {/*    <DatePicker />*/}
            {/*</Form.Item>*/}


            {/*<Form.Item label={null}>*/}
            {/*    <Button type="primary" htmlType="submit">*/}
            {/*        Submit*/}
            {/*    </Button>*/}
            {/*</Form.Item>*/}

            {error && (
                <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                    <Alert message={error} type="error" showIcon />
                </Form.Item>
            )}
            <Form.Item label={t("signup.role")}>
                <Radio.Group  value={role} onChange={(e) => setRole(e.target.value)}>
                    <Radio value="PATIENT">{t("signup.patient")}</Radio>
                    <Radio value="CAREGIVER">{t("signup.caregiver")}</Radio>
                </Radio.Group>
            </Form.Item>
            {/*<Form.Item label={t("signup.email")}>*/}
            {/*    <Input />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label={t("signup.password")}>*/}
            {/*    <Input.Password placeholder={t("signup.password_placeholder")} />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label={t("signup.name")}>*/}
            {/*    <Input />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label={t("signup.address")}>*/}
            {/*    <Input />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label={t("signup.phone")}>*/}
            {/*    <Input />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label={t("signup.diagnosis")}>*/}
            {/*    <Input disabled={role !== "PATIENT"}/>*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label={t("signup.birth_date")}>*/}
            {/*    <DatePicker disabled={role !== "PATIENT"}/>*/}
            {/*</Form.Item>*/}



            <Form.Item label={t("signup.email")} name="email">
                <Input />
            </Form.Item>

            <Form.Item label={t("signup.password")} name="password">
                <Input.Password placeholder={t("signup.password_placeholder")} />
            </Form.Item>

            <Form.Item label={t("signup.name")} name="name">
                <Input />
            </Form.Item>

            <Form.Item label={t("signup.address")} name="address">
                <Input />
            </Form.Item>

            <Form.Item label={t("signup.phone")} name="phone">
                <Input />
            </Form.Item>

            <Form.Item label={t("signup.diagnosis")} name="diagnosis">
                <Input disabled={role !== "PATIENT"} />
            </Form.Item>

            <Form.Item label={t("signup.birth_date")} name="birth_date">
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