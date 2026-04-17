import React from "react";
import { useLang } from "../language/langContext";
import { CheckOutlined, HighlightOutlined } from '@ant-design/icons';
import {Alert, Button, DatePicker, Form, Input, Radio, Typography} from 'antd';
const { Paragraph } = Typography;

export default function AboutCaregiver({ user }) {
    const { t } = useLang();
    const [form] = Form.useForm();

    React.useEffect(() => {
        if (user) {
            form.setFieldsValue({
                email: user.email,
                name: user.profile.name,
                address: user.profile.address,
                phone: user.profile.phone,
            });
        }
    }, [user]);
    return (
        <div>
            <Typography.Title level={1} style={{ marginLeft: 50 }}>
                About
            </Typography.Title>
            <Form
                form={form}
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: "100%", marginTop: 60 }}

            >
                <Form.Item label={t("signup.email")} name="email">
                    <Input readOnly  />
                </Form.Item>

                <Form.Item label={t("signup.name")} name="name">
                    <Input readOnly  />
                </Form.Item>

                <Form.Item label={t("signup.address")} name="address">
                    <Input readOnly  />
                </Form.Item>

                <Form.Item label={t("signup.phone")} name="phone">
                    <Input readOnly  />
                </Form.Item>
            </Form>

        </div>
    );
}


