import {useLocation, useNavigate} from "react-router-dom";
import React from "react";
import {useLang} from "../language/langContext.jsx";

import { Button, Form, Input} from 'antd';


const onFinish = (values) => { console.log(values); };
const onFinishFailed = (errorInfo) => { console.log(errorInfo); };
export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { lang, setLang, t } = useLang();




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
                    <Button type="primary" htmlType="submit">
                        {t("login.submit")}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}