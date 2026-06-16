import React, { useState, useEffect, useCallback } from "react";
import { useLang } from "../language/useLang.js";
import {
    Alert, Typography, Spin, Tabs, Button, Layout, theme,
    Row, Col, Card, Space, Divider, Avatar, Form, Input,
    DatePicker, Modal, Menu
} from "antd";
import {
    CheckCircleOutlined, MailOutlined, EnvironmentOutlined,
    ClockCircleOutlined, BankOutlined, LinkOutlined,
    CalendarOutlined, UserOutlined, PlusOutlined, SaveOutlined, EditOutlined,
} from "@ant-design/icons";
import { fetchWithAuth } from "../utils/fetchWithAuth.js";
import dayjs from "dayjs";

import gileadLogo from "../assets/Gilead-logo-footer.png";
import uptLogo    from "../assets/upt.png";
import riseLogo   from "../assets/Logo-Rise-Health-Negat-Cor-300.png";
import bgAsset    from "../assets/Asset-6fundo.png";
import phoneImg   from "../assets/p2.png";
import logo       from "../assets/logo-v2.png";

const { Title, Text, Link, Paragraph } = Typography;
const { Content, Footer, Header } = Layout;
const { TextArea } = Input;

const API_GET       = "http://localhost:3000/api/page/get";
const API_UPDATE    = "http://localhost:3000/api/page/update";
const API_CREATE    = "http://localhost:3000/api/page/create";
const API_NEWS_LIST = "http://localhost:3000/api/page/list";
const API_NEWS_ITEM = "http://localhost:3000/api/page/item";


function PreviewNav({ activeKey, t }) {
    const navItems = [
        { key: "home",    label: t("nav.home")          },
        { key: "about",   label: t("nav.about")         },
        { key: "team",    label: t("nav.team_partners") },
        { key: "news",    label: t("nav.news")          },
        { key: "contact", label: t("nav.contact")       },
        { key: "account", label: t("nav.account")       },
    ];

    return (
        <Header style={{ display: "flex", alignItems: "center" }}>
            <img
                src={logo}
                alt="Logo"
                style={{ height: 40, marginRight: 20, cursor: "default" }}
            />
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[activeKey]}
                items={navItems}
                style={{ flex: 1, minWidth: 0 }}
            />
        </Header>
    );
}


const HOME_IDS = [
    "homepage_title","homepage_subtitle","homepage_checklist_title",
    "homepage_check_1","homepage_check_2","homepage_check_3",
    "homepage_description","homepage_btn_participate","homepage_btn_learn",
    "footer_project_title","footer_project_description",
    "footer_contact_title","footer_contact_university",
    "footer_contact_address","footer_contact_city","footer_contact_email",
    "footer_links_title","footer_funding_label","footer_funding_name",
    "footer_promoter_title","footer_funding_title","footer_copyright",
];
const ABOUT_IDS = [
    "about_prospective_title","about_prospective_text",
    "about_why_title","about_why_text",
    "about_stages_title","about_stages_intro",
    "about_stage1_title","about_stage1_text",
    "about_stage2_title","about_stage2_text",
    "about_stage3_title","about_stage3_text",
    "about_stage4_title","about_stage4_text",
    "footer_project_title","footer_project_description",
    "footer_contact_title","footer_contact_university",
    "footer_contact_address","footer_contact_city","footer_contact_email",
    "footer_links_title","footer_funding_label","footer_funding_name",
    "footer_promoter_title","footer_funding_title","footer_copyright",
];
const CONTACT_IDS = [
    "contact_title","contact_intro",
    "contact_form_title","contact_form_desc",
    "contact_field_name","contact_field_email",
    "contact_field_subject","contact_field_message",
    "contact_field_privacy","contact_btn_send",
    "contact_other_title",
    "contact_email_label","contact_email_value",
    "contact_address_label","contact_address_1","contact_address_2",
    "contact_hours_label","contact_hours_days","contact_hours_time",
    "contact_map_title","contact_map_btn",
    "contact_privacy_required","contact_name_required",
    "contact_email_required","contact_subject_required",
    "contact_message_required","contact_success",
    "footer_project_title","footer_project_description",
    "footer_contact_title","footer_contact_university",
    "footer_contact_address","footer_contact_city","footer_contact_email",
    "footer_links_title","footer_funding_label","footer_funding_name",
    "footer_promoter_title","footer_funding_title","footer_copyright",
];

const RESEARCHER_COUNT   = 6;
const COLLABORATOR_COUNT = 1;
const PARTNER_COUNT      = 3;
const PARTNER_LOGOS      = { 1: uptLogo, 2: null, 3: null };

function buildTeamIds() {
    const ids = [
        "team_partners_title","team_partners_intro",
        "team_partnership_title","team_partnership_text",
        "team_researchers_title","team_researchers_intro",
        "team_collaborators_title","team_collaborators_text",
        "team_funding_title","team_funding_text",
        "footer_project_title","footer_project_description",
        "footer_contact_title","footer_contact_university",
        "footer_contact_address","footer_contact_city","footer_contact_email",
        "footer_links_title","footer_funding_label","footer_funding_name",
        "footer_promoter_title","footer_funding_title","footer_copyright",
    ];
    for (let i = 1; i <= PARTNER_COUNT; i++)
        ids.push(`partner_${i}_name`, `partner_${i}_text`);
    for (let i = 1; i <= RESEARCHER_COUNT; i++)
        ids.push(
            `researcher_${i}_initials`,`researcher_${i}_name`,
            `researcher_${i}_role`,`researcher_${i}_affiliation`,
            `researcher_${i}_url`,`researcher_${i}_tag`
        );
    for (let i = 1; i <= COLLABORATOR_COUNT; i++)
        ids.push(
            `collaborator_${i}_initials`,`collaborator_${i}_name`,
            `collaborator_${i}_role`,`collaborator_${i}_affiliation`
        );
    return ids;
}
const TEAM_IDS = buildTeamIds();

async function fetchAllContent(ids, lang) {
    const results = await Promise.all(
        ids.map((id) =>
            fetch(`${API_GET}?element_id=${encodeURIComponent(id)}&language=${encodeURIComponent(lang.toUpperCase())}`)
                .then((r) => r.json())
                .catch(() => ({ data: null }))
        )
    );
    const data = {};
    ids.forEach((id, i) => {
        data[id] = {
            text:        results[i]?.data?.text        ?? "",
            content_id:  results[i]?.data?.content_id  ?? null,
            news_author: results[i]?.data?.news_author ?? null,
            news_date:   results[i]?.data?.news_date   ?? null,
        };
    });
    return data;
}
async function fetchNewsList(lang) {
    const res  = await fetch(`${API_NEWS_LIST}?language=${lang.toUpperCase()}`);
    const json = await res.json();
    return json?.data ?? [];
}
async function fetchNewsItem(id, lang) {
    const res  = await fetch(`${API_NEWS_ITEM}?news_id=${id}&language=${lang.toUpperCase()}`);
    const json = await res.json();
    return json?.data ?? null;
}
function formatDate(d) {
    if (!d) return "";
    return new Date(d).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
}


function EditableText({ value, onChange, multiline = false, style = {} }) {
    const [editing, setEditing] = useState(false);
    const [draft,   setDraft  ] = useState(value);
    useEffect(() => { setDraft(value); }, [value]);

    const commit = () => { setEditing(false); if (draft !== value) onChange(draft); };


    const handleClick = (e) => { e.stopPropagation(); setEditing(true); };

    if (editing) {
        return multiline ? (
            <TextArea
                autoFocus autoSize={{ minRows: 2, maxRows: 10 }}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={commit}
                onClick={(e) => e.stopPropagation()}
                style={{ ...style, width: "100%" }}
            />
        ) : (
            <Input
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={commit}
                onPressEnter={commit}
                onClick={(e) => e.stopPropagation()}
                style={style}
            />
        );
    }

    return (
        <span
            onClick={handleClick}
            title="Click to edit"
            style={{
                cursor: "text",
                borderBottom: "1.5px dashed #1677ff",
                paddingBottom: 1,
                minWidth: 30,
                display: "inline-block",
                ...style,
            }}
        >
            {value || <span style={{ color: "#bbb" }}>(empty)</span>}
        </span>
    );
}


function FooterPreview({ ct, onEdit, colorBgContainer }) {
    return (
        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
            <Footer style={{ background: colorBgContainer, borderTop: "1px solid #f0f0f0", padding: "20px 32px" }}>
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={8}>
                        <Title level={5} style={{ marginTop: 0 }}>
                            <EditableText value={ct("footer_project_title")} onChange={(v) => onEdit("footer_project_title", v)} />
                        </Title>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            <EditableText value={ct("footer_project_description")} onChange={(v) => onEdit("footer_project_description", v)} multiline />
                        </Text>
                    </Col>
                    <Col xs={24} md={8}>
                        <Title level={5}>
                            <EditableText value={ct("footer_contact_title")} onChange={(v) => onEdit("footer_contact_title", v)} />
                        </Title>
                        <Space direction="vertical" size={2}>
                            <Text type="secondary" style={{ fontSize: 12 }}><EditableText value={ct("footer_contact_university")} onChange={(v) => onEdit("footer_contact_university", v)} /></Text>
                            <Text type="secondary" style={{ fontSize: 12 }}><EditableText value={ct("footer_contact_address")} onChange={(v) => onEdit("footer_contact_address", v)} /></Text>
                            <Text type="secondary" style={{ fontSize: 12 }}><EditableText value={ct("footer_contact_city")} onChange={(v) => onEdit("footer_contact_city", v)} /></Text>
                            <Text style={{ fontSize: 12 }}><EditableText value={ct("footer_contact_email")} onChange={(v) => onEdit("footer_contact_email", v)} /></Text>
                        </Space>
                    </Col>
                    <Col xs={24} md={8}>
                        <Title level={5}>
                            <EditableText value={ct("footer_links_title")} onChange={(v) => onEdit("footer_links_title", v)} />
                        </Title>
                    </Col>
                </Row>
                <Divider style={{ margin: "12px 0" }} />
                <Row gutter={[24, 16]}>
                    <Col xs={24} md={12}>
                        <Title level={5}>
                            <EditableText value={ct("footer_promoter_title")} onChange={(v) => onEdit("footer_promoter_title", v)} />
                        </Title>
                        <Space size="middle" wrap>
                            <img src={uptLogo}  alt="UPT"         style={{ height: 36 }} />
                            <img src={riseLogo} alt="RISE-Health" style={{ height: 36 }} />
                            <img src={bgAsset}  alt="BG Asset"    style={{ height: 36 }} />
                        </Space>
                    </Col>
                    <Col xs={24} md={12}>
                        <Title level={5}>
                            <EditableText value={ct("footer_funding_title")} onChange={(v) => onEdit("footer_funding_title", v)} />
                        </Title>
                        <Text type="secondary" style={{ display: "block", marginBottom: 8, fontSize: 12 }}>
                            <EditableText value={ct("footer_funding_label")} onChange={(v) => onEdit("footer_funding_label", v)} />
                        </Text>
                        <Space size="middle" align="center">
                            <img src={gileadLogo} alt="Gilead" style={{ height: 44 }} />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                <EditableText value={ct("footer_funding_name")} onChange={(v) => onEdit("footer_funding_name", v)} />
                            </Text>
                        </Space>
                    </Col>
                </Row>
                <Divider style={{ margin: "12px 0" }} />
                <div style={{ textAlign: "center" }}>
                    <Text type="secondary" style={{ fontSize: 11 }}>
                        © {new Date().getFullYear()}{" "}
                        <EditableText value={ct("footer_copyright")} onChange={(v) => onEdit("footer_copyright", v)} />
                    </Text>
                </div>
            </Footer>
        </div>
    );
}

function SaveBar({ pending, saving, error, success, onSave, onDiscard, setError, setSuccess, t }) {
    const count = Object.keys(pending).length;
    return (
        <div style={{
            position: "sticky", top: 0, zIndex: 100,
            background: "#fff", borderBottom: "1px solid #f0f0f0",
            padding: "8px 20px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
        }}>
            <Button type="primary" icon={<SaveOutlined />} loading={saving} disabled={!count} onClick={onSave} size="small">
                {t("common.save")}
            </Button>
            {count > 0 && (
                <Button onClick={onDiscard} disabled={saving} size="small">
                    {t("common.cancel")}
                </Button>
            )}
            {count > 0 && <Text type="warning" style={{ fontSize: 12 }}>{count} unsaved change(s)</Text>}
            {error   && <Alert message={error}   type="error"   showIcon closable onClose={() => setError(null)}   style={{ flex: 1, padding: "2px 10px" }} />}
            {success && <Alert message={success} type="success" showIcon closable onClose={() => setSuccess(null)} style={{ flex: 1, padding: "2px 10px" }} />}
        </div>
    );
}


function PageEditor({ ids, lang, t, children }) {
    const [contentMap, setContentMap] = useState(null);
    const [pending,    setPending   ] = useState({});
    const [saving,     setSaving    ] = useState(false);
    const [error,      setError     ] = useState(null);
    const [success,    setSuccess   ] = useState(null);

    useEffect(() => {
        setContentMap(null);
        setPending({});
        fetchAllContent(ids, lang).then(setContentMap);
    }, [lang, ids.join(",")]);

    const ct     = (key) => pending[key] !== undefined ? pending[key] : (contentMap?.[key]?.text ?? "");
    const onEdit = (key, value) => setPending((p) => ({ ...p, [key]: value }));

    const onSave = async () => {
        setSaving(true); setError(null); setSuccess(null);
        const errors = [];
        for (const [element_id, text] of Object.entries(pending)) {
            const content_id = contentMap[element_id]?.content_id;
            if (!content_id) { errors.push(`No content_id for ${element_id}`); continue; }
            try {
                const res  = await fetchWithAuth(API_UPDATE, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ content_id, text }),
                });
                const json = await res.json();
                if (!json.success) throw new Error(json.error?.message || "Failed");
                setContentMap((prev) => ({ ...prev, [element_id]: { ...prev[element_id], text } }));
            } catch (e) {
                errors.push(`${element_id}: ${e.message}`);
            }
        }
        setSaving(false);
        if (errors.length) setError(errors.join(" | "));
        else { setSuccess("Saved!"); setPending({}); }
    };

    const onDiscard = () => { setPending({}); setError(null); setSuccess(null); };

    if (!contentMap) return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
            <Spin size="large" />
        </div>
    );

    return (
        <div>
            <SaveBar
                pending={pending} saving={saving} error={error} success={success}
                onSave={onSave} onDiscard={onDiscard} setError={setError} setSuccess={setSuccess}
                t={t}
            />
            {children({ ct, onEdit })}
        </div>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// HOME
// ══════════════════════════════════════════════════════════════════════════════
function HomePreview({ lang, t }) {
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    return (
        <PageEditor ids={HOME_IDS} lang={lang} t={t}>
            {({ ct, onEdit }) => (
                <Layout>
                    <PreviewNav activeKey="home" t={t} />
                    <Content style={{ padding: "0 32px" }}>
                        <div style={{ background: colorBgContainer, padding: 20, borderRadius: borderRadiusLG }}>
                            <Row gutter={12}>
                                <Col span={9}>
                                    <Title style={{ fontSize: 32, marginBottom: 8 }}>
                                        <EditableText value={ct("homepage_title")} onChange={(v) => onEdit("homepage_title", v)} />
                                    </Title>
                                    <Title level={4}>
                                        <EditableText value={ct("homepage_subtitle")} onChange={(v) => onEdit("homepage_subtitle", v)} />
                                    </Title>
                                    <Title level={5} style={{ marginTop: 16 }}>
                                        <EditableText value={ct("homepage_checklist_title")} onChange={(v) => onEdit("homepage_checklist_title", v)} />
                                    </Title>
                                    {["homepage_check_1","homepage_check_2","homepage_check_3"].map((key) => (
                                        <p key={key} style={{ marginLeft: 8, fontSize: 13 }}>
                                            <CheckCircleOutlined />
                                            <Text style={{ marginLeft: 8 }}>
                                                <EditableText value={ct(key)} onChange={(v) => onEdit(key, v)} />
                                            </Text>
                                        </p>
                                    ))}
                                    <p style={{ marginTop: 16, fontSize: 13 }}>
                                        <EditableText value={ct("homepage_description")} onChange={(v) => onEdit("homepage_description", v)} multiline />
                                    </p>
                                    {/* FIX #4: кнопки оборачиваем в div, EditableText внутри span */}
                                    <div style={{ marginTop: 12 }}>
                                        <Button type="primary" style={{ width: "100%", fontSize: 13 }}>
                                            <EditableText value={ct("homepage_btn_participate")} onChange={(v) => onEdit("homepage_btn_participate", v)} />
                                        </Button>
                                    </div>
                                    <div style={{ marginTop: 10 }}>
                                        <Button style={{ width: "100%", fontSize: 13 }}>
                                            <EditableText value={ct("homepage_btn_learn")} onChange={(v) => onEdit("homepage_btn_learn", v)} />
                                        </Button>
                                    </div>
                                </Col>
                                <Col span={15}>
                                    <div style={{ background: "#f5f5f5", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
                                        <img src={phoneImg} alt="Phone" style={{ maxWidth: "100%", maxHeight: 500 }} />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Content>
                    <FooterPreview ct={ct} onEdit={onEdit} colorBgContainer={colorBgContainer} />
                </Layout>
            )}
        </PageEditor>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// ABOUT
// ══════════════════════════════════════════════════════════════════════════════
const STAGES = [
    { title: "about_stage1_title", text: "about_stage1_text" },
    { title: "about_stage2_title", text: "about_stage2_text" },
    { title: "about_stage3_title", text: "about_stage3_text" },
    { title: "about_stage4_title", text: "about_stage4_text" },
];

function AboutPreview({ lang, t }) {
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    return (
        <PageEditor ids={ABOUT_IDS} lang={lang} t={t}>
            {({ ct, onEdit }) => (
                <Layout>
                    <PreviewNav activeKey="about" t={t} />
                    <Content style={{ padding: "0 32px" }}>
                        <div style={{ background: colorBgContainer, padding: 20, borderRadius: borderRadiusLG }}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Title level={3}>
                                        <EditableText value={ct("about_prospective_title")} onChange={(v) => onEdit("about_prospective_title", v)} />
                                    </Title>
                                    <div style={{ fontSize: 13 }}>
                                        <EditableText value={ct("about_prospective_text")} onChange={(v) => onEdit("about_prospective_text", v)} multiline />
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <Title level={3}>
                                        <EditableText value={ct("about_why_title")} onChange={(v) => onEdit("about_why_title", v)} />
                                    </Title>
                                    <div style={{ fontSize: 13 }}>
                                        <EditableText value={ct("about_why_text")} onChange={(v) => onEdit("about_why_text", v)} multiline />
                                    </div>
                                </Col>
                            </Row>
                            <Divider />
                            <div style={{ textAlign: "center" }}>
                                <Title level={3}>
                                    <EditableText value={ct("about_stages_title")} onChange={(v) => onEdit("about_stages_title", v)} />
                                </Title>
                                <p style={{ fontSize: 13 }}>
                                    <EditableText value={ct("about_stages_intro")} onChange={(v) => onEdit("about_stages_intro", v)} multiline />
                                </p>
                            </div>
                            {STAGES.map(({ title, text }) => (
                                <Card key={title} style={{ width: "100%", marginTop: 16 }} size="small">
                                    <div style={{ display: "flex" }}>
                                        <div style={{ flex: 7 }}>
                                            <Title level={5}>
                                                <EditableText value={ct(title)} onChange={(v) => onEdit(title, v)} />
                                            </Title>
                                            <div style={{ fontSize: 13 }}>
                                                <EditableText value={ct(text)} onChange={(v) => onEdit(text, v)} multiline />
                                            </div>
                                        </div>
                                        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                            {/* FIX #3: статичная кнопка через t() */}
                                            <Button type="primary" size="small">{t("nav.participate")}</Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </Content>
                    <FooterPreview ct={ct} onEdit={onEdit} colorBgContainer={colorBgContainer} />
                </Layout>
            )}
        </PageEditor>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// TEAM
// ══════════════════════════════════════════════════════════════════════════════
function TeamPreview({ lang, t }) {
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    return (
        <PageEditor ids={TEAM_IDS} lang={lang} t={t}>
            {({ ct, onEdit }) => (
                <Layout>
                    <PreviewNav activeKey="team" t={t} />
                    <Content style={{ padding: "0 32px" }}>
                        <div style={{ background: colorBgContainer, padding: 20, borderRadius: borderRadiusLG }}>
                            <Title level={3}><EditableText value={ct("team_partners_title")} onChange={(v) => onEdit("team_partners_title", v)} /></Title>
                            <Paragraph style={{ fontSize: 13 }}><EditableText value={ct("team_partners_intro")} onChange={(v) => onEdit("team_partners_intro", v)} multiline /></Paragraph>

                            <Row gutter={[16, 16]}>
                                {Array.from({ length: PARTNER_COUNT }, (_, i) => i + 1).map((i) => (
                                    <Col xs={24} md={8} key={i}>
                                        <Card size="small" style={{ height: "100%" }}>
                                            {PARTNER_LOGOS[i] && (
                                                <div style={{ marginBottom: 10, textAlign: "center" }}>
                                                    <img src={PARTNER_LOGOS[i]} alt="" style={{ height: 36, objectFit: "contain" }} />
                                                </div>
                                            )}
                                            <Title level={5}><EditableText value={ct(`partner_${i}_name`)} onChange={(v) => onEdit(`partner_${i}_name`, v)} /></Title>
                                            <Text type="secondary" style={{ fontSize: 12 }}><EditableText value={ct(`partner_${i}_text`)} onChange={(v) => onEdit(`partner_${i}_text`, v)} multiline /></Text>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                            <Card style={{ marginTop: 20, background: "#e6f4ff", border: "1px solid #91caff" }} size="small">
                                <Title level={5}><EditableText value={ct("team_partnership_title")} onChange={(v) => onEdit("team_partnership_title", v)} /></Title>
                                <Text style={{ fontSize: 13 }}><EditableText value={ct("team_partnership_text")} onChange={(v) => onEdit("team_partnership_text", v)} multiline /></Text>
                            </Card>

                            <Divider />

                            <Title level={3}><EditableText value={ct("team_researchers_title")} onChange={(v) => onEdit("team_researchers_title", v)} /></Title>
                            <Paragraph style={{ fontSize: 13 }}><EditableText value={ct("team_researchers_intro")} onChange={(v) => onEdit("team_researchers_intro", v)} multiline /></Paragraph>

                            <Row gutter={[16, 16]}>
                                {Array.from({ length: RESEARCHER_COUNT }, (_, i) => i + 1).map((i) => (
                                    <Col xs={24} sm={12} md={8} key={i}>
                                        <Card size="small" style={{ height: "100%", textAlign: "center" }}>
                                            <Avatar size={56} style={{ backgroundColor: "#1677ff", fontSize: 16, marginBottom: 6 }}>
                                                <EditableText value={ct(`researcher_${i}_initials`)} onChange={(v) => onEdit(`researcher_${i}_initials`, v)} />
                                            </Avatar>
                                            <div>
                                                <Text strong style={{ fontSize: 13 }}>
                                                    <EditableText value={ct(`researcher_${i}_name`)} onChange={(v) => onEdit(`researcher_${i}_name`, v)} />
                                                </Text>
                                            </div>
                                            <Text type="secondary" style={{ fontSize: 12 }}>
                                                <EditableText value={ct(`researcher_${i}_role`)} onChange={(v) => onEdit(`researcher_${i}_role`, v)} />
                                            </Text>
                                            <br />
                                            <Text style={{ fontSize: 12 }}>
                                                <BankOutlined style={{ marginRight: 4 }} />
                                                <EditableText value={ct(`researcher_${i}_affiliation`)} onChange={(v) => onEdit(`researcher_${i}_affiliation`, v)} />
                                            </Text>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                            <Divider />

                            <Title level={4}><EditableText value={ct("team_collaborators_title")} onChange={(v) => onEdit("team_collaborators_title", v)} /></Title>
                            <Paragraph style={{ fontSize: 13 }}><EditableText value={ct("team_collaborators_text")} onChange={(v) => onEdit("team_collaborators_text", v)} multiline /></Paragraph>

                            <Row gutter={[16, 16]}>
                                {Array.from({ length: COLLABORATOR_COUNT }, (_, i) => i + 1).map((i) => (
                                    <Col xs={24} sm={12} md={8} key={i}>
                                        <Card size="small" style={{ textAlign: "center" }}>
                                            <Avatar size={48} style={{ backgroundColor: "#52c41a", fontSize: 16, marginBottom: 6 }}>
                                                <EditableText value={ct(`collaborator_${i}_initials`)} onChange={(v) => onEdit(`collaborator_${i}_initials`, v)} />
                                            </Avatar>
                                            <br />
                                            <Text strong style={{ fontSize: 13 }}><EditableText value={ct(`collaborator_${i}_name`)} onChange={(v) => onEdit(`collaborator_${i}_name`, v)} /></Text>
                                            <br />
                                            <Text type="secondary" style={{ fontSize: 12 }}><EditableText value={ct(`collaborator_${i}_role`)} onChange={(v) => onEdit(`collaborator_${i}_role`, v)} /></Text>
                                            <br />
                                            <Text style={{ fontSize: 12 }}><EditableText value={ct(`collaborator_${i}_affiliation`)} onChange={(v) => onEdit(`collaborator_${i}_affiliation`, v)} /></Text>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                            <Divider />

                            <Title level={4}><EditableText value={ct("team_funding_title")} onChange={(v) => onEdit("team_funding_title", v)} /></Title>
                            <Card size="small" style={{ marginTop: 12 }}>
                                <Space size="middle" align="center">
                                    <img src={gileadLogo} alt="Gilead" style={{ height: 48 }} />
                                    <Text style={{ fontSize: 13 }}><EditableText value={ct("team_funding_text")} onChange={(v) => onEdit("team_funding_text", v)} multiline /></Text>
                                </Space>
                            </Card>
                        </div>
                    </Content>
                    <FooterPreview ct={ct} onEdit={onEdit} colorBgContainer={colorBgContainer} />
                </Layout>
            )}
        </PageEditor>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// CONTACT
// ══════════════════════════════════════════════════════════════════════════════
function ContactPreview({ lang, t }) {
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    return (
        <PageEditor ids={CONTACT_IDS} lang={lang} t={t}>
            {({ ct, onEdit }) => (
                <Layout>
                    <PreviewNav activeKey="contact" t={t} />
                    <Content style={{ padding: "0 32px" }}>
                        <div style={{ background: colorBgContainer, padding: 20, borderRadius: borderRadiusLG }}>
                            <Row align="middle" gutter={16} style={{ marginBottom: 8 }}>
                                <Col>
                                    <Title level={3} style={{ marginBottom: 4 }}>
                                        <EditableText value={ct("contact_title")} onChange={(v) => onEdit("contact_title", v)} />
                                    </Title>
                                    <Paragraph style={{ fontSize: 13, maxWidth: 520, marginBottom: 0 }}>
                                        <EditableText value={ct("contact_intro")} onChange={(v) => onEdit("contact_intro", v)} multiline />
                                    </Paragraph>
                                </Col>
                            </Row>
                            <Divider />
                            <Row gutter={[32, 24]}>
                                <Col xs={24} lg={14}>
                                    <Title level={4}><EditableText value={ct("contact_form_title")} onChange={(v) => onEdit("contact_form_title", v)} /></Title>
                                    <Paragraph type="secondary" style={{ fontSize: 12 }}>
                                        <EditableText value={ct("contact_form_desc")} onChange={(v) => onEdit("contact_form_desc", v)} multiline />
                                    </Paragraph>
                                    <Form layout="vertical" size="small">
                                        <Row gutter={12}>
                                            <Col xs={24} sm={12}>
                                                <Form.Item label={<EditableText value={ct("contact_field_name")} onChange={(v) => onEdit("contact_field_name", v)} />}>
                                                    <Input disabled />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item label={<EditableText value={ct("contact_field_email")} onChange={(v) => onEdit("contact_field_email", v)} />}>
                                                    <Input disabled />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Form.Item label={<EditableText value={ct("contact_field_subject")} onChange={(v) => onEdit("contact_field_subject", v)} />}>
                                            <Input disabled />
                                        </Form.Item>
                                        <Form.Item label={<EditableText value={ct("contact_field_message")} onChange={(v) => onEdit("contact_field_message", v)} />}>
                                            <TextArea rows={3} disabled />
                                        </Form.Item>
                                        {/* FIX #4: кнопка отправки editable */}
                                        <Form.Item>
                                            <Button type="primary" size="small" icon={<MailOutlined />} disabled>
                                                <EditableText value={ct("contact_btn_send")} onChange={(v) => onEdit("contact_btn_send", v)} />
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col xs={24} lg={10}>
                                    <Title level={4}><EditableText value={ct("contact_other_title")} onChange={(v) => onEdit("contact_other_title", v)} /></Title>
                                    <Space direction="vertical" size={12} style={{ width: "100%" }}>
                                        <Card size="small">
                                            <Space align="start">
                                                <MailOutlined style={{ fontSize: 18, color: "#7c5cbf" }} />
                                                <div>
                                                    <Text strong style={{ fontSize: 12 }}><EditableText value={ct("contact_email_label")} onChange={(v) => onEdit("contact_email_label", v)} /></Text>
                                                    <br />
                                                    <Text style={{ fontSize: 12 }}><EditableText value={ct("contact_email_value")} onChange={(v) => onEdit("contact_email_value", v)} /></Text>
                                                </div>
                                            </Space>
                                        </Card>
                                        <Card size="small">
                                            <Space align="start">
                                                <EnvironmentOutlined style={{ fontSize: 18, color: "#7c5cbf" }} />
                                                <div>
                                                    <Text strong style={{ fontSize: 12 }}><EditableText value={ct("contact_address_label")} onChange={(v) => onEdit("contact_address_label", v)} /></Text>
                                                    <br />
                                                    <Text style={{ fontSize: 12 }}><EditableText value={ct("contact_address_1")} onChange={(v) => onEdit("contact_address_1", v)} multiline /></Text>
                                                    <br />
                                                    <Text style={{ fontSize: 12 }}><EditableText value={ct("contact_address_2")} onChange={(v) => onEdit("contact_address_2", v)} multiline /></Text>
                                                </div>
                                            </Space>
                                        </Card>
                                        <Card size="small">
                                            <Space align="start">
                                                <ClockCircleOutlined style={{ fontSize: 18, color: "#7c5cbf" }} />
                                                <div>
                                                    <Text strong style={{ fontSize: 12 }}><EditableText value={ct("contact_hours_label")} onChange={(v) => onEdit("contact_hours_label", v)} /></Text>
                                                    <br />
                                                    <Text style={{ fontSize: 12 }}><EditableText value={ct("contact_hours_days")} onChange={(v) => onEdit("contact_hours_days", v)} /></Text>
                                                    <br />
                                                    <Text style={{ fontSize: 12 }}><EditableText value={ct("contact_hours_time")} onChange={(v) => onEdit("contact_hours_time", v)} /></Text>
                                                </div>
                                            </Space>
                                        </Card>
                                    </Space>
                                </Col>
                            </Row>
                            <Divider />
                            <Title level={4}>
                                <EditableText value={ct("contact_map_title")} onChange={(v) => onEdit("contact_map_title", v)} />
                            </Title>
                            <Card style={{ marginTop: 12, overflow: "hidden", padding: 0 }} bodyStyle={{ padding: 0 }}>
                                <iframe
                                    title="Map"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2748.7507443467457!2d-8.6069488!3d41.180290199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd246468d8db928b%3A0xd13ab2b46036a1f!2sUPT%20-%20Universidade%20Portucalense!5e1!3m2!1sru!2spt!4v1781606604492!5m2!1sru!2spt"
                                    width="100%" height="280"
                                    style={{ border: 0, display: "block" }}
                                    allowFullScreen loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </Card>
                            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                                <img src={uptLogo} alt="UPT" style={{ height: 32 }} />
                                <div style={{ fontSize: 12 }}>
                                    <EditableText value={ct("contact_address_1")} onChange={(v) => onEdit("contact_address_1", v)} multiline />
                                </div>
                                {/* FIX #4: кнопка "View on Map" editable */}
                                <Button type="primary" size="small" icon={<EnvironmentOutlined />}>
                                    <EditableText value={ct("contact_map_btn")} onChange={(v) => onEdit("contact_map_btn", v)} />
                                </Button>
                            </div>
                        </div>
                    </Content>
                    <FooterPreview ct={ct} onEdit={onEdit} colorBgContainer={colorBgContainer} />
                </Layout>
            )}
        </PageEditor>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// NEWS — редактирование существующих статей
// ══════════════════════════════════════════════════════════════════════════════
function EditNewsModal({ open, newsId, lang, t, onClose, onSaved }) {
    const [form]    = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [saving,  setSaving ] = useState(false);
    const [error,   setError  ] = useState(null);
    const [fields,  setFields ] = useState(null);
    const FIELDS = ["title","category","short","full","url"];

    useEffect(() => {
        if (!open || !newsId) return;
        setLoading(true); setError(null); setFields(null);
        Promise.all(
            FIELDS.map((f) =>
                fetch(`${API_GET}?element_id=${encodeURIComponent(`news_${newsId}_${f}`)}&language=${encodeURIComponent(lang.toUpperCase())}`)
                    .then((r) => r.json()).catch(() => ({ data: null }))
            )
        ).then((results) => {
            const map = {};
            FIELDS.forEach((f, i) => { map[f] = results[i]?.data ?? null; });
            setFields(map);
            form.setFieldsValue({
                title:    map.title?.text    ?? "",
                category: map.category?.text ?? "",
                short:    map.short?.text    ?? "",
                full:     map.full?.text     ?? "",
                url:      map.url?.text      ?? "",
                author:   map.title?.news_author ?? "",
                date:     map.title?.news_date ? dayjs(map.title.news_date) : null,
            });
            setLoading(false);
        });
    }, [open, newsId, lang]);

    const onFinish = async (values) => {
        setSaving(true); setError(null);
        const errors = [];
        for (const f of FIELDS) {
            const item = fields[f];
            if (!item?.content_id) continue;
            try {
                const res  = await fetchWithAuth(API_UPDATE, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        content_id:  item.content_id,
                        text:        values[f] ?? "",
                        news_author: values.author,
                        news_date:   values.date?.toISOString(),
                    }),
                });
                const json = await res.json();
                if (!json.success) throw new Error(json.error?.message || "Failed");
            } catch (e) { errors.push(`${f}: ${e.message}`); }
        }
        setSaving(false);
        if (errors.length) setError(errors.join(" | "));
        else { onSaved(); onClose(); }
    };

    return (
        <Modal title={t("common.edit")} open={open} onCancel={onClose} footer={null} width={680}>
            {loading ? <Spin /> : (
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 12 }} />}
                    <Form.Item label="Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Author" name="author" rules={[{ required: true }]}><Input /></Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Date" name="date" rules={[{ required: true }]}>
                                <DatePicker style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Category" name="category"><Input /></Form.Item>
                    <Form.Item label="Short description" name="short"><TextArea rows={2} /></Form.Item>
                    <Form.Item label="Full text" name="full" rules={[{ required: true }]}>
                        <TextArea rows={6} showCount maxLength={2000} />
                    </Form.Item>
                    <Form.Item label="URL (optional)" name="url"><Input prefix={<LinkOutlined />} /></Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <Space>
                            <Button type="primary" htmlType="submit" loading={saving} icon={<SaveOutlined />}>{t("common.save")}</Button>
                            <Button onClick={onClose}>{t("common.cancel")}</Button>
                        </Space>
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
}

function NewsPreview({ lang, t }) {
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const [newsList,    setNewsList   ] = useState([]);
    const [selected,    setSelected  ] = useState(null);
    const [detailLoad,  setDetailLoad] = useState(false);
    const [listLoading, setListLoading] = useState(true);
    const [createOpen,  setCreateOpen] = useState(false);
    const [editOpen,    setEditOpen  ] = useState(false);
    const [editId,      setEditId    ] = useState(null);
    const [createForm]                 = Form.useForm();
    const [creating,    setCreating  ] = useState(false);
    const [error,       setError     ] = useState(null);
    const [success,     setSuccess   ] = useState(null);

    const loadList = useCallback(async () => {
        setListLoading(true);
        const list = await fetchNewsList(lang);
        setNewsList(list);
        setListLoading(false);
        if (list.length > 0) loadDetail(list[0].id);
    }, [lang]);

    useEffect(() => { setSelected(null); loadList(); }, [loadList]);

    const loadDetail = async (id) => {
        setDetailLoad(true);
        const item = await fetchNewsItem(id, lang);
        setSelected(item);
        setDetailLoad(false);
    };

    const onCreate = async (values) => {
        setCreating(true); setError(null);
        const news_id = `news_${Date.now()}`;
        const dateISO = values.date.toISOString();
        const payloads = [
            { element_id: `${news_id}_title`,    text: values.title     },
            { element_id: `${news_id}_category`, text: values.category || "" },
            { element_id: `${news_id}_short`,    text: values.short    || "" },
            { element_id: `${news_id}_full`,     text: values.full      },
            { element_id: `${news_id}_url`,      text: values.url      || "" },
        ].map((p) => ({ ...p, page_type: "NEWS", language: lang.toUpperCase(), news_author: values.author, news_date: dateISO }));

        try {
            for (const payload of payloads) {
                const res  = await fetchWithAuth(API_CREATE, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                const json = await res.json();
                if (!json.success) throw new Error(json.error?.message || "Failed");
            }
            setSuccess("News created!");
            setCreateOpen(false);
            createForm.resetFields();
            loadList();
        } catch (e) {
            setError(e.message);
        } finally {
            setCreating(false);
        }
    };

    return (
        <div>
            {error   && <Alert message={error}   type="error"   showIcon closable onClose={() => setError(null)}   style={{ margin: "8px 20px" }} />}
            {success && <Alert message={success} type="success" showIcon closable onClose={() => setSuccess(null)} style={{ margin: "8px 20px" }} />}

            <Layout>
                <PreviewNav activeKey="news" t={t} />
                <Content style={{ padding: "0 32px" }}>
                    <div style={{ background: colorBgContainer, padding: 20, borderRadius: borderRadiusLG }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                            {/* FIX #3: заголовок через t() */}
                            <Title level={3} style={{ margin: 0 }}>{t("nav.news")}</Title>
                            <Button type="primary" icon={<PlusOutlined />} size="small" onClick={() => setCreateOpen(true)}>
                                Add News
                            </Button>
                        </div>
                        <Divider style={{ margin: "8px 0 16px" }} />

                        {listLoading ? (
                            <div style={{ display: "flex", justifyContent: "center", padding: 40 }}><Spin size="large" /></div>
                        ) : (
                            <Row gutter={[24, 16]}>
                                <Col xs={24} lg={10}>
                                    <Space direction="vertical" size={10} style={{ width: "100%" }}>
                                        {newsList.map((item) => (
                                            <Card
                                                key={item.id} hoverable size="small"
                                                onClick={() => loadDetail(item.id)}
                                                style={{
                                                    cursor: "pointer",
                                                    borderColor: selected?.id === item.id ? "#1677ff" : undefined,
                                                    boxShadow:   selected?.id === item.id ? "0 0 0 2px #1677ff33" : undefined,
                                                }}
                                                extra={
                                                    <Button size="small" icon={<EditOutlined />}
                                                            onClick={(e) => { e.stopPropagation(); setEditId(item.id); setEditOpen(true); }}
                                                    >
                                                        {t("common.edit")}
                                                    </Button>
                                                }
                                            >
                                                <Text type="secondary" style={{ fontSize: 11 }}>
                                                    <CalendarOutlined style={{ marginRight: 4 }} />{formatDate(item.date)}
                                                </Text>
                                                <Title level={5} style={{ marginTop: 4, marginBottom: 0, fontSize: 13 }}>{item.title}</Title>
                                            </Card>
                                        ))}
                                    </Space>
                                </Col>
                                <Col xs={24} lg={14}>
                                    {detailLoad ? (
                                        <div style={{ display: "flex", justifyContent: "center", minHeight: 200 }}><Spin /></div>
                                    ) : selected ? (
                                        <Card size="small">
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                                <Title level={4} style={{ marginTop: 0, flex: 1 }}>{selected.title}</Title>
                                                <Button size="small" icon={<EditOutlined />}
                                                        onClick={() => { setEditId(selected.id); setEditOpen(true); }}
                                                >
                                                    {t("common.edit")}
                                                </Button>
                                            </div>
                                            <Space split={<Divider type="vertical" />} style={{ marginBottom: 12, fontSize: 12 }}>
                                                <Text type="secondary"><CalendarOutlined style={{ marginRight: 4 }} />{formatDate(selected.date)}</Text>
                                                {selected.author && <Text type="secondary"><UserOutlined style={{ marginRight: 4 }} />{selected.author}</Text>}
                                            </Space>
                                            <Divider style={{ margin: "8px 0" }} />
                                            <Paragraph style={{ fontSize: 13, lineHeight: 1.7 }}>{selected.full}</Paragraph>
                                        </Card>
                                    ) : null}
                                </Col>
                            </Row>
                        )}
                    </div>
                </Content>
            </Layout>

            <Modal title="Create News" open={createOpen}
                   onCancel={() => { setCreateOpen(false); createForm.resetFields(); }}
                   footer={null} width={640}
            >
                <Form form={createForm} layout="vertical" onFinish={onCreate}>
                    <Form.Item label="Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
                    <Row gutter={16}>
                        <Col span={12}><Form.Item label="Author" name="author" rules={[{ required: true }]}><Input /></Form.Item></Col>
                        <Col span={12}>
                            <Form.Item label="Date" name="date" rules={[{ required: true }]}>
                                <DatePicker style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Category" name="category"><Input /></Form.Item>
                    <Form.Item label="Short description" name="short"><TextArea rows={2} /></Form.Item>
                    <Form.Item label="Full text" name="full" rules={[{ required: true }]}>
                        <TextArea rows={5} showCount maxLength={2000} />
                    </Form.Item>
                    <Form.Item label="URL (optional)" name="url"><Input prefix={<LinkOutlined />} /></Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <Space>
                            <Button type="primary" htmlType="submit" loading={creating} icon={<PlusOutlined />}>{t("common.save")}</Button>
                            <Button onClick={() => { setCreateOpen(false); createForm.resetFields(); }}>{t("common.cancel")}</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            <EditNewsModal
                open={editOpen} newsId={editId} lang={lang} t={t}
                onClose={() => { setEditOpen(false); setEditId(null); }}
                onSaved={() => {
                    setSuccess("Article updated!");
                    loadList();
                    if (selected?.id === editId) loadDetail(editId);
                }}
            />
        </div>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// Main
// ══════════════════════════════════════════════════════════════════════════════
export default function AdminWebDesign({ user, setUser, handleAutoLogout }) {
    const { t, lang } = useLang();

    const TABS = [
        { key: "home",    label: t("nav.home"),           children: <HomePreview    lang={lang} t={t} /> },
        { key: "about",   label: t("nav.about"),          children: <AboutPreview   lang={lang} t={t} /> },
        { key: "team",    label: t("nav.team_partners"),  children: <TeamPreview    lang={lang} t={t} /> },
        { key: "news",    label: t("nav.news"),           children: <NewsPreview    lang={lang} t={t} /> },
        { key: "contact", label: t("nav.contact"),        children: <ContactPreview lang={lang} t={t} /> },
    ];

    return (
        <div style={{ padding: "24px 50px" }}>
            <Title level={1} style={{ margin: 0, lineHeight: "32px", marginBottom: 24 }}>
                {t("admin.web_design")}
            </Title>
            <Tabs type="card" size="large" items={TABS} destroyInactiveTabPane />
        </div>
    );
}