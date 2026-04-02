import React, { useState } from "react";
import {useLang} from "../language/langContext.jsx";

import {Button, DatePicker, Form, Input, Radio} from 'antd';



export default function SignUp() {
    const { lang, setLang, t } = useLang();
    const [role, setRole] = useState("PATIENT");





    return (

        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
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
            <Form.Item label={t("signup.role")}>
                <Radio.Group  value={role} onChange={(e) => setRole(e.target.value)}>
                    <Radio value="PATIENT">{t("signup.patient")}</Radio>
                    <Radio value="CAREGIVER">{t("signup.caregiver")}</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label={t("signup.email")}>
                <Input />
            </Form.Item>
            <Form.Item label={t("signup.password")}>
                <Input.Password placeholder={t("signup.password_placeholder")} />
            </Form.Item>
            <Form.Item label={t("signup.name")}>
                <Input />
            </Form.Item>
            <Form.Item label={t("signup.address")}>
                <Input />
            </Form.Item>
            <Form.Item label={t("signup.phone")}>
                <Input />
            </Form.Item>
            <Form.Item label={t("signup.diagnosis")}>
                <Input disabled={role !== "PATIENT"}/>
            </Form.Item>
            <Form.Item label={t("signup.birth_date")}>
                <DatePicker disabled={role !== "PATIENT"}/>
            </Form.Item>
            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    {t("signup.submit")}
                </Button>
            </Form.Item>
        </Form>
    );
}