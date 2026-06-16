import React, { useEffect, useState } from "react";
import {
    Layout, theme, Row, Col, Typography,
    Card, Tag, Button, Space, Divider,
    Spin, Empty
} from "antd";
import {
    CalendarOutlined, UserOutlined,
    LinkOutlined, ArrowRightOutlined
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useLang } from "../language/useLang.js";

import gileadLogo from "../assets/Gilead-logo-footer.png";
import uptLogo    from "../assets/upt.png";
import riseLogo   from "../assets/Logo-Rise-Health-Negat-Cor-300.png";
import bgAsset    from "../assets/Asset-6fundo.png";

const { Content, Footer } = Layout;
const { Title, Text, Link, Paragraph } = Typography;

const API_BASE = "http://localhost:3000/api/page";

const CATEGORY_COLORS = {
    Funding:                   "gold",
    Financiamento:             "gold",
    Studies:                   "blue",
    Estudos:                   "blue",
    "Scientific Publications": "purple",
    "Publicações Científicas": "purple",
    "Public Involvement":      "green",
    "Envolvimento Público":    "green",
    "Scientific Dissemination":"cyan",
    "Disseminação Científica": "cyan",
    Event:                     "orange",
    Evento:                    "orange",
};

const UI_IDS = [
    "news_page_title", "news_btn_read_more",
    "news_btn_view_all", "news_btn_full", "news_select_hint",
    "footer_project_title", "footer_project_description",
    "footer_contact_title", "footer_contact_university",
    "footer_contact_address", "footer_contact_city",
    "footer_contact_email", "footer_links_title",
    "footer_funding_label", "footer_funding_name",
    "footer_promoter_title", "footer_funding_title", "footer_copyright",
];

async function fetchUI(lang) {
    const results = await Promise.all(
        UI_IDS.map(id =>
            fetch(`${API_BASE}/get?element_id=${encodeURIComponent(id)}&language=${encodeURIComponent(lang.toUpperCase())}`)
                .then(r => r.json())
                .catch(() => ({ data: null }))
        )
    );
    const data = {};
    UI_IDS.forEach((id, i) => { data[id] = results[i]?.data?.text ?? ""; });
    return data;
}


async function fetchNewsList(lang) {
    const res = await fetch(`${API_BASE}/list?language=${lang.toUpperCase()}`);
    const json = await res.json();
    return json?.data ?? [];
}

async function fetchNewsItem(id, lang) {
    const res = await fetch(`${API_BASE}/item?news_id=${id}&language=${lang.toUpperCase()}`);
    const json = await res.json();
    return json?.data ?? null;
}

function formatDate(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("pt-PT", {
        day: "numeric", month: "long", year: "numeric"
    });
}

function MultilineText({ text, style }) {
    return (
        <>
            {(text || "").split("\n").map((line, i) => (
                <Paragraph key={i} style={{ marginBottom: 8, ...style }}>{line}</Paragraph>
            ))}
        </>
    );
}

export default function NewsPage() {
    const { slug } = useParams();
    const { lang, t } = useLang();
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    const [ui, setUi]               = useState(null);
    const [newsList, setNewsList]   = useState([]);
    const [selected, setSelected]   = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [pageLoading, setPageLoading]     = useState(true);


    useEffect(() => {
        setPageLoading(true);
        setSelected(null);

        Promise.all([fetchUI(lang), fetchNewsList(lang)]).then(([uiData, list]) => {
            setUi(uiData);
            setNewsList(list);

            if (list.length > 0) loadDetail(list[0].id, lang);
            setPageLoading(false);
        });
    }, [lang]);

    const loadDetail = async (id, language = lang) => {
        setDetailLoading(true);
        const item = await fetchNewsItem(id, language);
        setSelected(item);
        setDetailLoading(false);
    };

    if (pageLoading || !ui) {
        return (
            <Layout style={{ minHeight: "84vh" }}>
                <Content style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "84vh" }}>
                    <Spin size="large" />
                </Content>
            </Layout>
        );
    }

    const ct = (key) => ui[key] || "";

    return (
        <Layout style={{ minHeight: "84vh" }}>
            <Content style={{ padding: "0 48px" }}>
                <div style={{ background: colorBgContainer, minHeight: 280, padding: 24, borderRadius: borderRadiusLG }}>

                    <Title>{ct("news_page_title")}</Title>
                    <Divider />

                    <Row gutter={[32, 24]}>


                        <Col xs={24} lg={10}>
                            <Space direction="vertical" size={16} style={{ width: "100%" }}>
                                {newsList.length === 0 && <Empty />}

                                {newsList.map((item) => (
                                    <Card
                                        key={item.id}
                                        hoverable
                                        onClick={() => loadDetail(item.id)}
                                        size="small"
                                        style={{
                                            cursor: "pointer",
                                            borderColor: selected?.id === item.id ? "#1677ff" : undefined,
                                            boxShadow: selected?.id === item.id ? "0 0 0 2px #1677ff33" : undefined,
                                            transition: "all 0.2s",
                                        }}
                                    >
                                        <Space style={{ marginBottom: 8 }} wrap>
                                            <Text type="secondary" style={{ fontSize: 12 }}>
                                                <CalendarOutlined style={{ marginRight: 4 }} />
                                                {formatDate(item.date)}
                                            </Text>
                                        </Space>

                                        <Title level={5} style={{ marginTop: 0, marginBottom: 12 }}>
                                            {item.title}
                                        </Title>

                                        <Button
                                            type="link"
                                            size="small"
                                            icon={<ArrowRightOutlined />}
                                            onClick={(e) => { e.stopPropagation(); loadDetail(item.id); }}
                                            style={{ padding: 0 }}
                                        >
                                            {ct("news_btn_read_more")}
                                        </Button>
                                    </Card>
                                ))}

                                {newsList.length > 0 && (
                                    <Button block>{ct("news_btn_view_all")}</Button>
                                )}
                            </Space>
                        </Col>


                        <Col xs={24} lg={14}>
                            {detailLoading ? (
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
                                    <Spin size="large" />
                                </div>
                            ) : !selected ? (
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
                                    <Empty description={ct("news_select_hint")} />
                                </div>
                            ) : (
                                <Card>
                                    <Space wrap style={{ marginBottom: 12 }}>
                                        {selected.category && (
                                            <Tag color={CATEGORY_COLORS[selected.category] ?? "default"} style={{ fontSize: 13 }}>
                                                {selected.category}
                                            </Tag>
                                        )}
                                    </Space>

                                    <Title level={2} style={{ marginTop: 0 }}>{selected.title}</Title>

                                    <Space split={<Divider type="vertical" />} style={{ marginBottom: 20 }}>
                                        <Text type="secondary">
                                            <CalendarOutlined style={{ marginRight: 6 }} />
                                            {formatDate(selected.date)}
                                        </Text>
                                        {selected.author && (
                                            <Text type="secondary">
                                                <UserOutlined style={{ marginRight: 6 }} />
                                                {selected.author}
                                            </Text>
                                        )}
                                    </Space>

                                    <Divider style={{ marginTop: 0 }} />

                                    <div style={{ fontSize: 15, lineHeight: 1.8 }}>
                                        <MultilineText text={selected.full} />
                                    </div>

                                    {selected.url && (
                                        <div style={{ marginTop: 24 }}>
                                            <Button type="primary" icon={<LinkOutlined />} href={selected.url} target="_blank">
                                                {ct("news_btn_full")}
                                            </Button>
                                        </div>
                                    )}
                                </Card>
                            )}
                        </Col>
                    </Row>
                </div>
            </Content>


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