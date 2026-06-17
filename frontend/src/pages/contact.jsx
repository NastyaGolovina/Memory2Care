import React, { useEffect, useState } from "react";
import {
    Layout, theme, Row, Col, Typography,
    Form, Input, Button, Checkbox, Card,
    Space, Divider, Spin, Alert
} from "antd";
import {
    MailOutlined, EnvironmentOutlined,
    ClockCircleOutlined, SendOutlined
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useLang } from "../language/useLang.js";

import gileadLogo from "../assets/Gilead-logo-footer.png";
import uptLogo    from "../assets/upt.png";
import riseLogo   from "../assets/Logo-Rise-Health-Negat-Cor-300.png";
import bgAsset    from "../assets/Asset-6fundo.png";

const { Content, Footer } = Layout;
const { Title, Text, Link, Paragraph } = Typography;
const { TextArea } = Input;

const API_BASE = "http://localhost:3000/api/page/get";

const ELEMENT_IDS = [
    "contact_title", "contact_intro",
    "contact_form_title", "contact_form_desc",
    "contact_field_name", "contact_field_email",
    "contact_field_subject", "contact_field_message",
    "contact_field_privacy", "contact_btn_send",
    "contact_other_title",
    "contact_email_label", "contact_email_value",
    "contact_address_label", "contact_address_1", "contact_address_2",
    "contact_hours_label", "contact_hours_days", "contact_hours_time",
    "contact_map_title", "contact_map_btn",
    "contact_privacy_required", "contact_name_required",
    "contact_email_required", "contact_subject_required",
    "contact_message_required", "contact_success",

    "footer_project_title", "footer_project_description",
    "footer_contact_title", "footer_contact_university",
    "footer_contact_address", "footer_contact_city",
    "footer_contact_email", "footer_links_title",
    "footer_funding_label", "footer_funding_name",
    "footer_promoter_title", "footer_funding_title", "footer_copyright",
];

async function fetchAllContent(lang) {
    const results = await Promise.all(
        ELEMENT_IDS.map((id) =>
            fetch(`${API_BASE}?element_id=${encodeURIComponent(id)}&language=${encodeURIComponent(lang.toUpperCase())}`)
                .then((r) => r.json())
                .catch(() => ({ data: null }))
        )
    );
    const data = {};
    ELEMENT_IDS.forEach((id, i) => { data[id] = results[i]?.data?.text ?? ""; });
    return data;
}

function MultilineText({ text, style }) {
    return (
        <>
            {(text || "").split("\n").map((line, i) => (
                <Text key={i} style={{ display: "block", ...style }}>{line}</Text>
            ))}
        </>
    );
}


function MailboxIllustration() {
    return (
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Столбик */}
            <rect x="54" y="60" width="12" height="36" rx="3" fill="#b5a18e" />
            {/* Ящик */}
            <rect x="20" y="20" width="80" height="50" rx="8" fill="#7c5cbf" />
            {/* Крышка */}
            <path d="M20 28 Q60 48 100 28" stroke="#5a3fa0" strokeWidth="2" fill="none" />
            {/* Щель для писем */}
            <rect x="38" y="52" width="44" height="5" rx="2" fill="#5a3fa0" />
            {/* Конверт */}
            <rect x="35" y="30" width="50" height="34" rx="4" fill="#f0ece4" />
            <path d="M35 30 L60 50 L85 30" stroke="#7c5cbf" strokeWidth="2" fill="none" />
            {/* Ручка */}
            <rect x="92" y="38" width="12" height="8" rx="4" fill="#40c4b0" />
        </svg>
    );
}

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/qpjbVFrpQu7R5s2A6"
export default function ContactPage() {
    const { slug } = useParams();
    const { lang, t } = useLang();
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    const [content, setContent] = useState(null);
    const [form] = Form.useForm();
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setContent(null);
        fetchAllContent(lang).then(setContent);
    }, [lang]);

    if (!content) {
        return (
            <Layout style={{ minHeight: "84vh" }}>
                <Content style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "84vh" }}>
                    <Spin size="large" />
                </Content>
            </Layout>
        );
    }

    const ct = (key) => content[key] || "";


    const onFinish = async (values) => {
        setSending(true);
        setSuccess(false);

        try {
            const res = await fetch('http://localhost:3000/api/contact/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name:    values.name,
                    email:   values.email,
                    subject: values.subject,
                    message: values.message,
                }),
            });

            const json = await res.json();

            if (!json.success) {
                throw new Error(json.error?.message || 'Failed to send');
            }

            setSuccess(true);
            form.resetFields();

        } catch (err) {

            console.error(err);
        } finally {
            setSending(false);
        }
    };

    return (
        <Layout style={{ minHeight: "84vh" }}>
            <Content style={{ padding: "0 48px" }}>
                <div style={{ background: colorBgContainer, minHeight: 280, padding: 24, borderRadius: borderRadiusLG }}>

                    {/* ── Заголовок страницы ── */}
                    <Row align="middle" gutter={24} style={{ marginBottom: 8 }}>
                        <Col>
                            <MailboxIllustration />
                        </Col>
                        <Col>
                            <Title style={{ marginBottom: 8 }}>{ct("contact_title")}</Title>
                            <Paragraph style={{ fontSize: 16, maxWidth: 600, marginBottom: 0 }}>
                                {ct("contact_intro")}
                            </Paragraph>
                        </Col>
                    </Row>

                    <Divider />

                    <Row gutter={[48, 40]}>
                        {/* ── Форма ── */}
                        <Col xs={24} lg={14}>
                            <Title level={2}>{ct("contact_form_title")}</Title>
                            <Paragraph type="secondary" style={{ marginBottom: 24 }}>
                                {ct("contact_form_desc")}
                            </Paragraph>

                            {success && (
                                <Alert
                                    message={ct("contact_success")}
                                    type="success"
                                    showIcon
                                    style={{ marginBottom: 24 }}
                                    closable
                                    onClose={() => setSuccess(false)}
                                />
                            )}

                            <Form form={form} layout="vertical" onFinish={onFinish}>
                                <Row gutter={16}>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label={ct("contact_field_name")}
                                            name="name"
                                            rules={[{ required: true, message: ct("contact_name_required") }]}
                                        >
                                            <Input size="large" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label={ct("contact_field_email")}
                                            name="email"
                                            rules={[
                                                { required: true, message: ct("contact_email_required") },
                                                { type: "email",  message: ct("contact_email_required") },
                                            ]}
                                        >
                                            <Input size="large" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item
                                    label={ct("contact_field_subject")}
                                    name="subject"
                                    rules={[{ required: true, message: ct("contact_subject_required") }]}
                                >
                                    <Input size="large" />
                                </Form.Item>

                                <Form.Item
                                    label={ct("contact_field_message")}
                                    name="message"
                                    rules={[{ required: true, message: ct("contact_message_required") }]}
                                >
                                    <TextArea rows={6} size="large" />
                                </Form.Item>

                                <Form.Item
                                    name="privacy"
                                    valuePropName="checked"
                                    rules={[{
                                        validator: (_, value) =>
                                            value ? Promise.resolve() : Promise.reject(ct("contact_privacy_required"))
                                    }]}
                                >
                                    <Checkbox>{ct("contact_field_privacy")}</Checkbox>
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        icon={<SendOutlined />}
                                        loading={sending}
                                    >
                                        {ct("contact_btn_send")}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>

                        {/* ── Контактная информация ── */}
                        <Col xs={24} lg={10}>
                            <Title level={2}>{ct("contact_other_title")}</Title>

                            <Space direction="vertical" size={24} style={{ width: "100%" }}>
                                {/* Email */}
                                <Card size="small">
                                    <Space align="start">
                                        <MailOutlined style={{ fontSize: 22, color: "#7c5cbf", marginTop: 2 }} />
                                        <div>
                                            <Text strong>{ct("contact_email_label")}</Text>
                                            <br />
                                            <Link href={`mailto:${ct("contact_email_value")}`}>
                                                {ct("contact_email_value")}
                                            </Link>
                                        </div>
                                    </Space>
                                </Card>

                                {/* Address */}
                                <Card size="small">
                                    <Space align="start">
                                        <EnvironmentOutlined style={{ fontSize: 22, color: "#7c5cbf", marginTop: 2 }} />
                                        <div>
                                            <Text strong>{ct("contact_address_label")}</Text>
                                            <div style={{ marginTop: 6 }}>
                                                <MultilineText text={ct("contact_address_1")} style={{ fontSize: 13 }} />
                                            </div>
                                            <Text type="secondary" style={{ fontSize: 12 }}>or</Text>
                                            <div style={{ marginTop: 4 }}>
                                                <MultilineText text={ct("contact_address_2")} style={{ fontSize: 13 }} />
                                            </div>
                                        </div>
                                    </Space>
                                </Card>

                                {/* Hours */}
                                <Card size="small">
                                    <Space align="start">
                                        <ClockCircleOutlined style={{ fontSize: 22, color: "#7c5cbf", marginTop: 2 }} />
                                        <div>
                                            <Text strong>{ct("contact_hours_label")}</Text>
                                            <br />
                                            <Text>{ct("contact_hours_days")}</Text>
                                            <br />
                                            <Text>{ct("contact_hours_time")}</Text>
                                        </div>
                                    </Space>
                                </Card>
                            </Space>
                        </Col>
                    </Row>

                    <Divider />


                    <Title level={2}>{ct("contact_map_title")}</Title>

                    <Card style={{marginTop: 16, overflow: "hidden", padding: 0}} bodyStyle={{padding: 0}}>
                        <iframe
                            title="Portucalense University"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2748.7507443467457!2d-8.6069488!3d41.180290199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd246468d8db928b%3A0xd13ab2b46036a1f!2sUPT%20-%20Universidade%20Portucalense!5e1!3m2!1sru!2spt!4v1781606604492!5m2!1sru!2spt"
                            width="100%"
                            height="380"
                            style={{border: 0, display: "block"}}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />


                    </Card>

                    <div style={{marginTop: 16, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap"}}>
                        <img src={uptLogo} alt="UPT" style={{height: 40}}/>
                        <div>
                            <MultilineText text={ct("contact_address_1")} style={{fontSize: 13}}/>
                        </div>
                        <Button
                            type="primary"
                            icon={<EnvironmentOutlined />}
                            href={GOOGLE_MAPS_URL}
                            target="_blank"
                        >
                            {ct("contact_map_btn")}
                        </Button>
                    </div>

                </div>
            </Content>

            {/* ── Footer ── */}
            <div style={{ margin: "0 48px" }}>
                <Footer style={{ background: colorBgContainer, borderTop: "1px solid #f0f0f0", padding: "24px 48px" }}>
                    <Row gutter={[32, 32]}>
                        <Col xs={24} md={8}>
                            <Title level={4} style={{ marginTop: 0 }}>{ct("footer_project_title")}</Title>
                            <Text type="secondary">{ct("footer_project_description")}</Text>
                        </Col>
                        <Col xs={24} md={8}>
                            <Title level={5}>{ct("footer_contact_title")}</Title>
                            <Space direction="vertical" size={4}>
                                <Text type="secondary">{ct("footer_contact_university")}</Text>
                                <Text type="secondary">{ct("footer_contact_address")}</Text>
                                <Text type="secondary">{ct("footer_contact_city")}</Text>
                                <Link href={`mailto:${ct("footer_contact_email")}`}>{ct("footer_contact_email")}</Link>
                            </Space>
                        </Col>
                        <Col xs={24} md={8}>
                            <Title level={5}>{ct("footer_links_title")}</Title>
                            <Space direction="vertical">
                                <Link href="/about">{t("nav.about")}</Link>
                                <Link href="/team-partners">{t("nav.team_partners")}</Link>
                                <Link href="/contact">{t("nav.contact")}</Link>
                            </Space>
                        </Col>
                    </Row>

                    <Divider />

                    <Row gutter={[32, 24]}>
                        <Col xs={24} md={12}>
                            <Title level={5}>{ct("footer_promoter_title")}</Title>
                            <Space size="large" wrap>
                                <img src={uptLogo}  alt="UPT"         style={{ height: 45 }} />
                                <img src={riseLogo} alt="RISE-Health" style={{ height: 45 }} />
                                <img src={bgAsset}  alt="BG Asset"    style={{ height: 45 }} />
                            </Space>
                        </Col>
                        <Col xs={24} md={12}>
                            <Title level={5}>{ct("footer_funding_title")}</Title>
                            <Text type="secondary" style={{ display: "block", marginBottom: 10 }}>{ct("footer_funding_label")}</Text>
                            <Space size="large" align="center">
                                <img src={gileadLogo} alt="Gilead GÉNESE" style={{ height: 55 }} />
                                <Text type="secondary">{ct("footer_funding_name")}</Text>
                            </Space>
                        </Col>
                    </Row>

                    <Divider />

                    <div style={{ textAlign: "center" }}>
                        <Text type="secondary">© {new Date().getFullYear()} {ct("footer_copyright")}</Text>
                    </div>
                </Footer>
            </div>
        </Layout>
    );
}