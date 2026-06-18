import React, { useEffect, useState } from "react";
import {
    Layout, theme, Row, Col, Typography,
    Card, Button, Space, Divider, Spin
} from "antd";
import { useNavigate } from "react-router-dom";
import { useLang } from "../language/useLang.js";

import gileadLogo from "../assets/Gilead-logo-footer.png";
import uptLogo    from "../assets/upt.png";
import riseLogo   from "../assets/Logo-Rise-Health-Negat-Cor-300.png";
import bgAsset    from "../assets/Asset-6fundo.png";

const { Content, Footer } = Layout;
const { Title, Text, Link } = Typography;

const API_BASE = "http://localhost:3000/api/page/get";

const ELEMENT_IDS = [
    "about_prospective_title",
    "about_prospective_text",
    "about_why_title",
    "about_why_text",
    "about_stages_title",
    "about_stages_intro",
    "about_stage1_title",
    "about_stage1_text",
    "about_stage2_title",
    "about_stage2_text",
    "about_stage3_title",
    "about_stage3_text",
    "about_stage4_title",
    "about_stage4_text",

    "footer_project_title",
    "footer_project_description",
    "footer_contact_title",
    "footer_contact_university",
    "footer_contact_address",
    "footer_contact_city",
    "footer_contact_email",
    "footer_links_title",
    "footer_funding_label",
    "footer_funding_name",
    "footer_promoter_title",
    "footer_funding_title",
    "footer_copyright",
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
    ELEMENT_IDS.forEach((id, i) => {
        data[id] = results[i]?.data?.text ?? "";
    });
    return data;
}

// Рендерит текст с \n как отдельные параграфы
function MultilineText({ text, style }) {
    return (
        <>
            {text.split("\n").map((line, i) => (
                <p key={i} style={{ margin: "0 0 8px 0", ...style }}>{line}</p>
            ))}
        </>
    );
}

const STAGES = [
    { title: "about_stage1_title", text: "about_stage1_text" },
    { title: "about_stage2_title", text: "about_stage2_text" },
    { title: "about_stage3_title", text: "about_stage3_text" },
    { title: "about_stage4_title", text: "about_stage4_text" },
];

export default function AboutPage() {
    const navigate = useNavigate();
    const { lang, t } = useLang();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [content, setContent] = useState(null);

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

    return (
        <Layout style={{ minHeight: "84vh" }}>
            <Content style={{ padding: "0 48px" }}>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {/* ── Верхние два блока ── */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <div style={{ padding: 16, background: "#fff" }}>
                                <Title>{ct("about_prospective_title")}</Title>
                                <div style={{ marginTop: 30, fontSize: 18 }}>
                                    <MultilineText text={ct("about_prospective_text")} />
                                </div>
                            </div>
                        </Col>

                        <Col span={12}>
                            <div style={{ padding: 16, background: "#fff" }}>
                                <Title>{ct("about_why_title")}</Title>
                                <div style={{ marginTop: 30, fontSize: 18 }}>
                                    <MultilineText text={ct("about_why_text")} />
                                </div>
                            </div>
                        </Col>
                    </Row>


                    <Row>
                        <Divider />
                        <div style={{ textAlign: "center", width: "100%" }}>
                            <Title>{ct("about_stages_title")}</Title>
                            <p style={{ marginTop: 30, fontSize: 15 }}>{ct("about_stages_intro")}</p>
                        </div>

                        {STAGES.map(({ title, text }) => (
                            <Card key={title} style={{ width: "100%", marginTop: 25 }}>
                                <div style={{ display: "flex", width: "100%" }}>
                                    <div style={{ flex: 7 }}>
                                        <Title level={3}>{ct(title)}</Title>
                                        <div style={{ fontSize: 15 }}>
                                            <MultilineText text={ct(text)} />
                                        </div>
                                    </div>
                                    <div style={{ flex: 3, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                        <Button type="primary" onClick={() => navigate("/account")}>
                                            {t("nav.participate")}
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </Row>
                </div>
            </Content>

            {/* ── Footer ── */}
            <div style={{ margin: "0 48px" }}>
                <Footer
                    style={{
                        background: colorBgContainer,
                        borderTop: "1px solid #f0f0f0",
                        padding: "24px 48px",
                    }}
                >
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
                                <Link href={`mailto:${ct("footer_contact_email")}`}>
                                    {ct("footer_contact_email")}
                                </Link>
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
                            <Text type="secondary" style={{ display: "block", marginBottom: 10 }}>
                                {ct("footer_funding_label")}
                            </Text>
                            <Space size="large" align="center">
                                <img src={gileadLogo} alt="Gilead GÉNESE" style={{ height: 55 }} />
                                <Text type="secondary">{ct("footer_funding_name")}</Text>
                            </Space>
                        </Col>
                    </Row>

                    <Divider />

                    <div style={{ textAlign: "center" }}>
                        <Text type="secondary">
                            © {new Date().getFullYear()} {ct("footer_copyright")}
                        </Text>
                    </div>
                </Footer>
            </div>
        </Layout>
    );
}