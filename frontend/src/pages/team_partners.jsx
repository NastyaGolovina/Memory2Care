import React, { useEffect, useState } from "react";
import {
    Layout, theme, Row, Col, Typography,
    Card, Avatar, Space, Divider, Spin, Tag
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { LinkOutlined, BankOutlined } from "@ant-design/icons";
import { useLang } from "../language/useLang.js";

import gileadLogo from "../assets/Gilead-logo-footer.svg";
import uptLogo    from "../assets/upt.png";
import riseLogo   from "../assets/Logo-Rise-Health-Negat-Cor-300.png";
import bgAsset    from "../assets/Asset-6fundo.png";

const { Content, Footer } = Layout;
const { Title, Text, Link, Paragraph } = Typography;

const API_BASE = "http://localhost:3000/api/page/get";

const RESEARCHER_COUNT   = 6;
const COLLABORATOR_COUNT = 1;
const PARTNER_COUNT      = 3;

// Логотипы партнёров по индексу (null = нет логотипа)
const PARTNER_LOGOS = { 1: uptLogo, 2: null, 3: null };
// Цвет аватара по тегу
const TAG_COLORS = { PI: "blue", "Co-PI": "geekblue" };

function buildElementIds() {
    const ids = [
        "team_partners_title", "team_partners_intro",
        "team_partnership_title", "team_partnership_text",
        "team_researchers_title", "team_researchers_intro",
        "team_collaborators_title", "team_collaborators_text",
        "team_funding_title", "team_funding_text",
        // footer
        "footer_project_title", "footer_project_description",
        "footer_contact_title", "footer_contact_university",
        "footer_contact_address", "footer_contact_city",
        "footer_contact_email", "footer_links_title",
        "footer_funding_label", "footer_funding_name",
        "footer_promoter_title", "footer_funding_title", "footer_copyright",
    ];

    for (let i = 1; i <= PARTNER_COUNT; i++) {
        ids.push(`partner_${i}_name`, `partner_${i}_text`);
    }
    for (let i = 1; i <= RESEARCHER_COUNT; i++) {
        ids.push(
            `researcher_${i}_initials`, `researcher_${i}_name`,
            `researcher_${i}_role`,     `researcher_${i}_affiliation`,
            `researcher_${i}_url`,      `researcher_${i}_tag`
        );
    }
    for (let i = 1; i <= COLLABORATOR_COUNT; i++) {
        ids.push(
            `collaborator_${i}_initials`, `collaborator_${i}_name`,
            `collaborator_${i}_role`,     `collaborator_${i}_affiliation`
        );
    }

    return ids;
}

const ELEMENT_IDS = buildElementIds();

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

function ResearcherCard({ ct, index }) {
    const initials    = ct(`researcher_${index}_initials`);
    const name        = ct(`researcher_${index}_name`);
    const role        = ct(`researcher_${index}_role`);
    const affiliation = ct(`researcher_${index}_affiliation`);
    const url         = ct(`researcher_${index}_url`);
    const tag         = ct(`researcher_${index}_tag`);

    return (
        <Card
            hoverable
            style={{ height: "100%" }}
            styles={{ body: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 8 } }}
        >
            <Avatar size={80} style={{ backgroundColor: "#1677ff", fontSize: 20, marginBottom: 8 }}>
                {initials}
            </Avatar>

            <div>
                <Text strong style={{ fontSize: 16 }}>{name}</Text>
                {tag && <Tag color={TAG_COLORS[tag] ?? "default"} style={{ marginLeft: 8 }}>{tag}</Tag>}
            </div>

            <Text type="secondary" style={{ fontSize: 13 }}>{role}</Text>

            <Text style={{ fontSize: 13 }}>
                <BankOutlined style={{ marginRight: 4 }} />{affiliation}
            </Text>

            {url && (
                <Link href={url} target="_blank" style={{ fontSize: 13 }}>
                    <LinkOutlined style={{ marginRight: 4 }} />
                    Ver perfil
                </Link>
            )}
        </Card>
    );
}

function CollaboratorCard({ ct, index }) {
    const initials    = ct(`collaborator_${index}_initials`);
    const name        = ct(`collaborator_${index}_name`);
    const role        = ct(`collaborator_${index}_role`);
    const affiliation = ct(`collaborator_${index}_affiliation`);

    return (
        <Card styles={{ body: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 8 } }}>
            <Avatar size={64} style={{ backgroundColor: "#52c41a", fontSize: 18, marginBottom: 8 }}>
                {initials}
            </Avatar>
            <Text strong style={{ fontSize: 15 }}>{name}</Text>
            <Text type="secondary" style={{ fontSize: 13 }}>{role}</Text>
            <Text style={{ fontSize: 13 }}>{affiliation}</Text>
        </Card>
    );
}

export default function TeamPartnersPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { lang, t } = useLang();

    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
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
                <div style={{ background: colorBgContainer, minHeight: 280, padding: 24, borderRadius: borderRadiusLG }}>

                    {/* ── Partner Institutions ── */}
                    <Title>{ct("team_partners_title")}</Title>
                    <Paragraph style={{ fontSize: 16, marginBottom: 32 }}>{ct("team_partners_intro")}</Paragraph>

                    <Row gutter={[24, 24]}>
                        {Array.from({ length: PARTNER_COUNT }, (_, i) => i + 1).map((i) => (
                            <Col xs={24} md={8} key={i}>
                                <Card style={{ height: "100%" }}>
                                    {PARTNER_LOGOS[i] && (
                                        <div style={{ marginBottom: 16, textAlign: "center" }}>
                                            <img src={PARTNER_LOGOS[i]} alt={`partner-${i}`} style={{ height: 50, objectFit: "contain" }} />
                                        </div>
                                    )}
                                    <Title level={4}>{ct(`partner_${i}_name`)}</Title>
                                    <Text type="secondary">{ct(`partner_${i}_text`)}</Text>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* ── Partnership banner ── */}
                    <Card style={{ marginTop: 32, background: "#e6f4ff", border: "1px solid #91caff" }}>
                        <Title level={3} style={{ marginTop: 0 }}>{ct("team_partnership_title")}</Title>
                        <Text style={{ fontSize: 15 }}>{ct("team_partnership_text")}</Text>
                    </Card>

                    <Divider />

                    {/* ── Research Team ── */}
                    <Title>{ct("team_researchers_title")}</Title>
                    <Paragraph style={{ fontSize: 15, marginBottom: 24 }}>{ct("team_researchers_intro")}</Paragraph>

                    <Row gutter={[24, 24]}>
                        {Array.from({ length: RESEARCHER_COUNT }, (_, i) => i + 1).map((i) => (
                            <Col xs={24} sm={12} md={8} key={i}>
                                <ResearcherCard ct={ct} index={i} />
                            </Col>
                        ))}
                    </Row>

                    <Divider />

                    {/* ── Collaborators ── */}
                    <Title level={2}>{ct("team_collaborators_title")}</Title>
                    <Paragraph style={{ fontSize: 15, marginBottom: 24 }}>{ct("team_collaborators_text")}</Paragraph>

                    <Row gutter={[24, 24]}>
                        {Array.from({ length: COLLABORATOR_COUNT }, (_, i) => i + 1).map((i) => (
                            <Col xs={24} sm={12} md={8} key={i}>
                                <CollaboratorCard ct={ct} index={i} />
                            </Col>
                        ))}
                    </Row>

                    <Divider />

                    {/* ── Funding ── */}
                    <Title level={2}>{ct("team_funding_title")}</Title>
                    <Card style={{ marginTop: 16 }}>
                        <Space size="large" align="center">
                            <img src={gileadLogo} alt="Gilead GÉNESE" style={{ height: 60 }} />
                            <Text style={{ fontSize: 15 }}>{ct("team_funding_text")}</Text>
                        </Space>
                    </Card>

                </div>
            </Content>

            {/* ── Footer ── */}
            <div style={{ maxWidth: 1372, margin: "0 auto", width: "100%" }}>
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