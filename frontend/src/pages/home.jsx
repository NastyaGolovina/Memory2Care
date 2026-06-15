// import React from 'react';
// import { Layout, theme,Divider ,Typography , Alert, Flex, Spin} from 'antd';
//
// import { useEffect, useState } from "react";
// import { useLang } from "../language/useLang.js";
// import logo from "../assets/logo-v2.png";
// const {  Content, Footer } = Layout;
// const { Title } = Typography;
//
//
// export default function HomePage({ slug }) {
//     const {
//         token: { colorBgContainer, borderRadiusLG },
//     } = theme.useToken();
//     const { lang, setLang } = useLang();
//     // const { lang } = useLang();
//     const [article,setArticle] = useState(null);
//
//     //
//     // useEffect(() => {
//     //     const elementIds = [
//     //         "homepage_title",
//     //         "homepage_overview",
//     //         "homepage_goal_1",
//     //         "homepage_goal_2",
//     //         "homepage_goal_3",
//     //         "homepage_story"
//     //     ];
//     //
//     //     Promise.all(
//     //         elementIds.map(id =>
//     //             fetch("http://localhost:3000/api/page/get", {
//     //                 method: "POST",
//     //                 headers: { "Content-Type": "application/json" },
//     //                 body: JSON.stringify({
//     //                     element_id: id,
//     //                     language: lang.toUpperCase()
//     //                 })
//     //             }).then(r => r.json())
//     //         )
//     //     ).then(results => {
//     //         const data = {};
//     //         elementIds.forEach((id, i) => {
//     //             data[id] = results[i].text;
//     //         });
//     //         setArticle(data);
//     //     });
//     // }, [lang]);
//
//     useEffect(() => {
//         const elementIds = [
//             "homepage_title",
//             "homepage_overview",
//             "homepage_goal_1",
//             "homepage_goal_2",
//             "homepage_goal_3",
//             "homepage_story"
//         ];
//
//         Promise.all(
//             elementIds.map(id =>
//                 fetch(`http://localhost:3000/api/page/get?element_id=${encodeURIComponent(id)}&language=${encodeURIComponent(lang.toUpperCase())}`)
//                     .then(r => r.json())
//                     .catch(err => ({ success: false, data: null, error: err }))
//             )
//         ).then(results => {
//             console.log(results)
//             const data = {};
//             results.forEach((res, i) => {
//                 data[elementIds[i]] = res.data.text;
//             });
//             setArticle(data);
//         }).catch(err => {
//             console.error(err);
//         });
//         //
//         // Promise.all(
//         //     elementIds.map(id =>
//         //         fetch(`http://localhost:3000/api/page/get?element_id=${encodeURIComponent(id)}&language=${encodeURIComponent(lang.toUpperCase())}`)
//         //             .then(r => r.json())
//         //     )).then(results => {
//         //             const data = {};
//         //             results.forEach((res, i) => {
//         //                 if(res.success && res.data) {
//         //                     data[elementIds[i]] = res.data.text.replaceAll("\n", "<br>");
//         //                 } else {
//         //                     data[elementIds[i]] = ""; // fallback пустая строка
//         //                 }
//         //             });
//         //             setArticle(data);
//         //         }).catch(err => {
//         //         console.error("Ошибка загрузки данных:", err);
//         //     });
//         //     }, [lang]);
//         // ).then(results => {
//         //     if(results.success) {
//         //         const data = {};
//         //         elementIds.forEach((id, i) => {
//         //             data[id] = results[i].data.text;
//         //         });
//         //         setArticle(data);
//         //     }
//         //
//         // });
//     }, [lang]);
//
//     // useEffect(() => {
//     //     const elementIds = [
//     //         "homepage_title",
//     //         "homepage_overview",
//     //         "homepage_goal_1",
//     //         "homepage_goal_2",
//     //         "homepage_goal_3",
//     //         "homepage_story"
//     //     ];
//     //
//     //     async function fetchContent() {
//     //         try {
//     //             const results = await Promise.all(
//     //                 elementIds.map(id =>
//     //                     fetch(`http://localhost:3000/api/page/get?element_id=${encodeURIComponent(id)}&language=${encodeURIComponent(lang.toUpperCase())}`)
//     //                         .then(r => r.json())
//     //                         .catch(err => ({ success: false, data: null }))
//     //                 )
//     //             );
//     //
//     //             const data = {};
//     //             results.forEach((res, i) => {
//     //                 data[elementIds[i]] = res.success && res.data ? res.data.text : "";
//     //             });
//     //
//     //             setArticle(data); // ✅ Обновляем состояние
//     //         } catch (err) {
//     //             console.error("Ошибка загрузки данных:", err);
//     //         }
//     //     }
//     //
//     //     fetchContent();
//     // }, [lang]); // <== обязательно зависимость lang
//
//     if (!article) return   <Layout>
//         <Content style={{ padding: '0 48px', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//
//                                     <Spin size="large" />
//
//                                 </Content>
//                             </Layout>;
//
//     return (
//         <Layout>
//             <Content style={{ padding: '0 48px' }}>
//
//                 <div
//                     style={{
//                         background: colorBgContainer,
//                         minHeight: 280,
//                         padding: 24,
//                         borderRadius: borderRadiusLG,
//                     }}
//                 >
//                     <div style={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         height: '200px'
//                     }}>
//                         <img
//                             src={logo}
//                             alt="Logo"
//                             style={{ height: 200, cursor: "pointer" }}
//                             onClick={() => navigate("/home")}
//                         />
//                     </div>
//                     <Divider titlePlacement="start" plain>
//                         <Title>{article.homepage_title}</Title>
//                     </Divider>
//
//                     <p style={{ fontSize: '18px' }}>{article.homepage_overview.split('\n').map((line, i) => (
//                         <p key={i}>{line}</p>
//                     ))}</p>
//                     {/*<p>{article.homepage_overview}</p>*/}
//                     <div style={{marginLeft : "50px", fontSize: '18px'}}>
//                         <ul>
//                             <li>{article.homepage_goal_1}</li>
//                             <li>{article.homepage_goal_2}</li>
//                             <li>{article.homepage_goal_3}</li>
//                         </ul>
//                     </div>
//
//                     <p style={{ fontSize: '18px' }}>{article.homepage_story.split('\n').map((line, i) => (
//                         <p key={i}>{line}</p>
//                     ))}</p>
//                     {/*<p>{article.homepage_story}</p>*/}
//                 </div>
//             </Content>
//             <Footer style={{ textAlign: 'center' }}>
//                 Ant Design ©{new Date().getFullYear()} Created by Ant UED
//             </Footer>
//         </Layout>
//     );
// }
//
//
//
//

import React, { useEffect, useState } from "react";
import {
    Layout, theme, Row, Col, Typography,
    Button, Space, Divider, Spin
} from "antd";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";

import { useLang } from "../language/useLang.js";

import phoneImg  from "../assets/p2.png";
import gileadLogo from "../assets/Gilead-logo-footer.svg";
import uptLogo    from "../assets/upt.png";
import riseLogo   from "../assets/Logo-Rise-Health-Negat-Cor-300.png";
import bgAsset    from "../assets/Asset-6fundo.png";

const { Header, Content, Footer } = Layout;
const { Title, Text, Link } = Typography;

const API_BASE = "http://localhost:3000/api/page/get";

// ключи, которые нужны этой странице
const ELEMENT_IDS = [
    "homepage_title",
    "homepage_subtitle",
    "homepage_checklist_title",
    "homepage_check_1",
    "homepage_check_2",
    "homepage_check_3",
    "homepage_description",
    "homepage_btn_participate",
    "homepage_btn_learn",
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

export default function HomePage() {
    const navigate = useNavigate();
    const { lang } = useLang();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [content, setContent] = useState(null);

    useEffect(() => {
        setContent(null); // показать спиннер при смене языка
        fetchAllContent(lang).then(setContent);
    }, [lang]);

    if (!content) {
        return (
            <Layout style={{ minHeight: "84vh" }}>
                <Content
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "84vh",
                    }}
                >
                    <Spin size="large" />
                </Content>
            </Layout>
        );
    }

    const ct = (key) => content[key] || "";
    const { t } = useLang();
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
                    <Row gutter={16}>

                        <Col span={9}>
                            <div style={{ padding: 16, background: "#fff" }}>
                                <Title style={{ fontSize: 50 }}>{ct("homepage_title")}</Title>
                                <Title level={2}>{ct("homepage_subtitle")}</Title>

                                <Title level={3} style={{ marginTop: 30 }}>
                                    {ct("homepage_checklist_title")}
                                </Title>

                                {["homepage_check_1", "homepage_check_2", "homepage_check_3"].map((key) => (
                                    <p key={key} style={{ marginLeft: 10 }}>
                                        <CheckCircleOutlined />
                                        <Text style={{ marginLeft: 10, fontSize: 18 }}>{ct(key)}</Text>
                                    </p>
                                ))}

                                <p style={{ marginTop: 30, fontSize: 18 }}>{ct("homepage_description")}</p>

                                <Button
                                    type="primary"
                                    style={{ marginTop: 20, width: "100%" }}
                                    onClick={() => navigate("/account")}
                                >
                                    {ct("homepage_btn_participate")}
                                </Button>

                                <Button
                                    style={{ marginTop: 15, width: "100%" }}
                                    onClick={() => navigate("/about")}
                                >
                                    {ct("homepage_btn_learn")}
                                </Button>
                            </div>
                        </Col>


                        <Col span={15}>
                            <div
                                style={{
                                    padding: 16,
                                    background: "#f5f5f5",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={phoneImg}
                                    alt="Phone"
                                    style={{ maxWidth: "100%", height: "700px" }}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </Content>

            {/* ── Footer ── */}
            <div style={{ maxWidth: 1372, margin: "0 auto", width: "100%" }}>
                <Footer
                    style={{
                        background: colorBgContainer,
                        borderTop: "1px solid #f0f0f0",
                        padding: "24px 48px",
                    }}
                >
                    <Row gutter={[32, 32]}>
                        {/* Project info */}
                        <Col xs={24} md={8}>
                            <Title level={4} style={{ marginTop: 0 }}>
                                {ct("footer_project_title")}
                            </Title>
                            <Text type="secondary">{ct("footer_project_description")}</Text>
                        </Col>

                        {/* Contact */}
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

                        {/* Links */}
                        <Col xs={24} md={8}>
                            <Title level={5}>{ct("footer_links_title")}</Title>
                            <Space direction="vertical">
                                <Link href="/about">{t("nav.about")}</Link>
                                <Link href="/team-partners">{t("nav.account")}</Link>
                                <Link href="/contact">{t("nav.contact")}</Link>
                            </Space>
                        </Col>
                    </Row>

                    <Divider />

                    <Row gutter={[32, 24]}>
                        {/* Promoter */}
                        <Col xs={24} md={12}>
                            <Title level={5}>{ct("footer_promoter_title")}</Title>
                            <Space size="large" wrap>
                                <img src={uptLogo}  alt="UPT"           style={{ height: 45 }} />
                                <img src={riseLogo} alt="RISE-Health"   style={{ height: 45 }} />
                                <img src={bgAsset}  alt="BG Asset"      style={{ height: 45 }} />
                            </Space>
                        </Col>

                        {/* Funding */}
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
