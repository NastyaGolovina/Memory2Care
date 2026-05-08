import React, { useState, useEffect, useCallback } from "react";
import { useLang } from "../language/useLang.js";
import {
    Alert,
    Button,
    Form,
    Input,
    Typography,
    List,
    Popconfirm,
    Spin,
    Tag,
    Divider,
    message as antMessage,
} from "antd";
import { fetchWithAuth } from "../utils/fetchWithAuth.js";

const { Title, Text } = Typography;

const roleColor = (role) => {
    if (role === "ADMIN")     return "purple";
    if (role === "CAREGIVER") return "blue";
    if (role === "PATIENT")   return "green";
    return "default";
};

export default function AdminUsers({ user, setUser, handleAutoLogout }) {
    const { t } = useLang();
    const [form] = Form.useForm();


    const [users, setUsers]             = useState([]);
    const [listLoading, setListLoading] = useState(false);


    const [selectedId, setSelectedId]   = useState(null);
    const [detailData, setDetailData]   = useState(null);


    const [deactivating, setDeactivating] = useState(false);
    const [error, setError]               = useState(null);
    const [success, setSuccess]           = useState(null);


    const loadUsers = useCallback(async () => {
        setListLoading(true);
        setError(null);
        try {
            const res  = await fetchWithAuth("http://localhost:3000/api/admin/get/users");
            const data = await res.json();
            if (data.success) {
                setUsers(data.data);
            } else {
                setError(data.error?.message || t("admin.users_page.error_load"));
            }
        } catch {
            setError(t("admin.users_page.error_server"));
        } finally {
            setListLoading(false);
        }
    }, [t]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);


    const handleSelect = (item) => {
        setError(null);
        setSuccess(null);
        setSelectedId(item.user_id);
        setDetailData(item);

        const fields = {
            user_id:           String(item.user_id),
            email:             item.email       ?? "",
            role:              item.role        ?? "",
            created_date_time: item.created_date_time
                ? new Date(item.created_date_time).toLocaleString()
                : "",
        };


        if (item.patient) {
            fields.patient_id   = String(item.patient.patient_id);
            fields.patient_code = item.patient.patient_code ?? "";
            fields.active       = item.patient.active ? t("admin.users_page.yes") : t("admin.users_page.no");
        }


        if (item.caregiver) {
            fields.caregiver_id        = String(item.caregiver.caregiver_id);
            fields.caregiver_name      = item.caregiver.name          ?? "";
            fields.caregiver_address   = item.caregiver.address       ?? "";
            fields.caregiver_phone     = item.caregiver.phone         ?? "";
            fields.caregiver_approved  = item.caregiver.approved
                ? t("admin.users_page.yes")
                : t("admin.users_page.no");
            fields.caregiver_approved_date = item.caregiver.approved_date_time
                ? new Date(item.caregiver.approved_date_time).toLocaleString()
                : "—";
        }

        form.setFieldsValue(fields);
    };


    const handleDeactivate = async () => {
        if (!detailData) return;
        setError(null);
        setSuccess(null);
        setDeactivating(true);
        try {
            const res  = await fetchWithAuth(
                "http://localhost:3000/api/patient/deactivate",
                {
                    method:  "POST",
                    headers: { "Content-Type": "application/json" },
                    body:    JSON.stringify({ user_id: detailData.user_id }),
                }
            );
            const data = await res.json();

            if (!res.ok || !data.success) {
                setError(data.error?.message || t("admin.users_page.error_deactivate"));
                return;
            }

            antMessage.success(t("admin.users_page.deactivated"));


            setUsers((prev) =>
                prev.map((u) =>
                    u.user_id === detailData.user_id
                        ? { ...u, patient: { ...u.patient, active: false } }
                        : u
                )
            );


            const updated = {
                ...detailData,
                patient: { ...detailData.patient, active: false },
            };
            setDetailData(updated);
            form.setFieldValue("active", t("admin.users_page.no"));
        } catch {
            setError(t("admin.users_page.error_server"));
        } finally {
            setDeactivating(false);
        }
    };


    const isActivePatient = detailData?.patient?.active === true;


    return (
        <div style={{ padding: "24px 50px" }}>


            <Title level={1} style={{ margin: 0, lineHeight: "32px", marginBottom: 24 }}>
                {t("admin.users")}
            </Title>


            {error && (
                <Alert
                    message={error}
                    type="error"
                    showIcon
                    closable
                    onClose={() => setError(null)}
                    style={{ marginBottom: 16 }}
                />
            )}
            {success && (
                <Alert
                    message={success}
                    type="success"
                    showIcon
                    closable
                    onClose={() => setSuccess(null)}
                    style={{ marginBottom: 16 }}
                />
            )}


            <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>


                <div style={{ minWidth: 260, maxWidth: 300 }}>
                    <Spin spinning={listLoading}>
                        <List
                            size="large"
                            header={<Text strong>{t("admin.users_page.list_header")}</Text>}
                            bordered
                            dataSource={users}
                            locale={{ emptyText: t("admin.users_page.empty") }}
                            renderItem={(item) => (
                                <List.Item
                                    onClick={() => handleSelect(item)}
                                    style={{
                                        cursor: "pointer",
                                        backgroundColor:
                                            selectedId === item.user_id ? "#e6f7ff" : "transparent",
                                        transition: "background-color 0.2s",
                                    }}
                                >
                                    <div>

                                        <Typography.Text strong style={{ fontSize: 13 }}>
                                            {item.email}
                                        </Typography.Text>
                                        <br />

                                        <Tag color={roleColor(item.role)} style={{ marginTop: 4, fontSize: 11 }}>
                                            {item.role}
                                        </Tag>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Spin>
                </div>


                <div style={{ flex: 1 }}>
                    {!selectedId ? (
                        <Text type="secondary">{t("admin.users_page.select")}</Text>
                    ) : (
                        <>

                            <Title level={3} style={{ marginBottom: 24 }}>
                                {detailData?.email ?? "..."}
                                <Tag
                                    color={roleColor(detailData?.role)}
                                    style={{ marginLeft: 12, verticalAlign: "middle" }}
                                >
                                    {detailData?.role}
                                </Tag>
                            </Title>

                            <Form
                                form={form}
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                                layout="horizontal"
                                style={{ maxWidth: 700 }}
                            >

                                <Form.Item label={t("admin.users_page.field_user_id")} name="user_id">
                                    <Input readOnly />
                                </Form.Item>
                                <Form.Item label={t("signup.email")} name="email">
                                    <Input readOnly />
                                </Form.Item>
                                <Form.Item label={t("admin.caregiver.form.role")} name="role">
                                    <Input readOnly />
                                </Form.Item>
                                <Form.Item label={t("admin.caregiver.form.created")} name="created_date_time">
                                    <Input readOnly />
                                </Form.Item>


                                {detailData?.patient && (
                                    <>
                                        <Divider orientation="left" style={{ fontSize: 13 }}>
                                            {t("admin.patients")}
                                        </Divider>
                                        <Form.Item label={t("admin.users_page.field_patient_id")} name="patient_id">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label={t("admin.users_page.field_patient_code")} name="patient_code">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label={t("admin.users_page.field_active")} name="active">
                                            <Input readOnly />
                                        </Form.Item>
                                    </>
                                )}


                                {detailData?.caregiver && (
                                    <>
                                        <Divider orientation="left" style={{ fontSize: 13 }}>
                                            {t("admin.caregivers")}
                                        </Divider>
                                        <Form.Item label={t("admin.users_page.field_caregiver_id")} name="caregiver_id">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label={t("signup.name")} name="caregiver_name">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label={t("signup.address")} name="caregiver_address">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label={t("signup.phone")} name="caregiver_phone">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label={t("admin.users_page.field_approved")} name="caregiver_approved">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label={t("admin.users_page.field_approved_date")} name="caregiver_approved_date">
                                            <Input readOnly />
                                        </Form.Item>
                                    </>
                                )}
                            </Form>


                            {isActivePatient && (
                                <div style={{ marginTop: 24 }}>
                                    <Popconfirm
                                        title={t("admin.users_page.deactivate_title")}
                                        description={t("admin.users_page.deactivate_desc")}
                                        onConfirm={handleDeactivate}
                                        okText={t("admin.users_page.deactivate_ok")}
                                        cancelText={t("admin.caregiver.approve_cancel")}
                                        okButtonProps={{ danger: true }}
                                    >
                                        <Button
                                            danger
                                            size="middle"
                                            loading={deactivating}
                                        >
                                            {t("admin.users_page.deactivate_btn")}
                                        </Button>
                                    </Popconfirm>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}