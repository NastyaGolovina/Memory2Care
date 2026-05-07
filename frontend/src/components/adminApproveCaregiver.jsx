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
    message as antMessage,
} from "antd";
import { fetchWithAuth } from "../utils/fetchWithAuth.js";

const { Title, Text } = Typography;

export default function AdminApproveCaregiver({ user, setUser, handleAutoLogout }) {
    const { t } = useLang();
    const [form] = Form.useForm();


    const [caregivers, setCaregivers]       = useState([]);
    const [listLoading, setListLoading]     = useState(false);


    const [selectedId, setSelectedId]       = useState(null);   // caregiver_id
    const [detailData, setDetailData]       = useState(null);


    const [approving, setApproving]         = useState(false);
    const [error, setError]                 = useState(null);
    const [success, setSuccess]             = useState(null);


    const loadCaregivers = useCallback(async () => {
        setListLoading(true);
        setError(null);
        try {
            const res  = await fetchWithAuth(
                "http://localhost:3000/api/caregiver/get/not-approved-caregiver"
            );
            const data = await res.json();
            if (data.success) {
                setCaregivers(data.data);
            } else {
                setError(data.error?.message || "Failed to load caregivers");
            }
        } catch {
            setError("Server error");
        } finally {
            setListLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCaregivers();
    }, [loadCaregivers]);


    const handleSelect = (item) => {
        setError(null);
        setSuccess(null);
        setSelectedId(item.caregiver_id);
        setDetailData(item);

        form.setFieldsValue({
            email:       item.user?.email       ?? "",
            name:        item.name              ?? "",
            address:     item.address           ?? "",
            phone:       item.phone             ?? "",
            role:        item.user?.role        ?? "",
            created:     item.user?.created_date_time
                ? new Date(item.user.created_date_time).toLocaleDateString()
                : "",
        });
    };

    const handleApprove = async () => {
        if (!detailData) return;
        setError(null);
        setSuccess(null);
        setApproving(true);
        try {
            const res  = await fetchWithAuth(
                "http://localhost:3000/api/caregiver/approve",
                {
                    method:  "POST",
                    headers: { "Content-Type": "application/json" },
                    body:    JSON.stringify({ user_id: detailData.user?.user_id }),
                }
            );
            const data = await res.json();

            if (!res.ok || !data.success) {
                setError(data.error?.message || "Failed to approve caregiver");
                return;
            }

            antMessage.success(t("admin.caregiver.approved"));


            setCaregivers((prev) =>
                prev.filter((c) => c.caregiver_id !== detailData.caregiver_id)
            );
            setSelectedId(null);
            setDetailData(null);
            form.resetFields();
        } catch {
            setError("Server error");
        } finally {
            setApproving(false);
        }
    };


    return (
        <div style={{ padding: "24px 50px" }}>


            <Title level={1} style={{ margin: 0, lineHeight: "32px", marginBottom: 24 }}>
                {t("admin.caregiver.title")}
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


                <div style={{ minWidth: 240, maxWidth: 280 }}>
                    <Spin spinning={listLoading}>
                        <List
                            size="large"
                            header={<Text strong>{t("admin.caregiver.pending")}</Text>}
                            bordered
                            dataSource={caregivers}
                            locale={{ emptyText: t("admin.caregiver.empty") }}
                            renderItem={(item) => (
                                <List.Item
                                    onClick={() => handleSelect(item)}
                                    style={{
                                        cursor: "pointer",
                                        backgroundColor:
                                            selectedId === item.caregiver_id
                                                ? "#e6f7ff"
                                                : "transparent",
                                        transition: "background-color 0.2s",
                                    }}
                                >
                                    <div>
                                        <Typography.Text strong>
                                            {item.name}
                                        </Typography.Text>
                                        <br />
                                        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                                            {item.user?.email}
                                        </Typography.Text>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Spin>
                </div>


                <div style={{ flex: 1 }}>
                    {!selectedId ? (

                        <Text type="secondary">{t("admin.caregiver.select")}</Text>
                    ) : (
                        <>

                            <Title level={3} style={{ marginBottom: 24 }}>
                                {detailData?.name || "..."}
                            </Title>


                            <Form
                                form={form}
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 14 }}
                                layout="horizontal"
                                style={{ maxWidth: 680 }}
                            >

                                <Form.Item
                                    label={t("signup.email")}
                                    name="email"
                                >
                                    <Input readOnly />
                                </Form.Item>


                                <Form.Item
                                    label={t("signup.name")}
                                    name="name"
                                >
                                    <Input readOnly />
                                </Form.Item>


                                <Form.Item
                                    label={t("signup.address")}
                                    name="address"
                                >
                                    <Input readOnly />
                                </Form.Item>


                                <Form.Item
                                    label={t("signup.phone")}
                                    name="phone"
                                >
                                    <Input readOnly />
                                </Form.Item>


                                <Form.Item
                                    label={t("admin.caregiver.form.role")}
                                    name="role"
                                >
                                    <Input readOnly />
                                </Form.Item>


                                <Form.Item
                                    label={t("admin.caregiver.form.created")}
                                    name="created"
                                >
                                    <Input readOnly />
                                </Form.Item>
                            </Form>


                            <div style={{ marginTop: 24 }}>
                                <Popconfirm
                                    title={t("admin.caregiver.approve_title")}
                                    description={t("admin.caregiver.approve_desc")}
                                    onConfirm={handleApprove}
                                    okText={t("admin.caregiver.approve_ok")}
                                    cancelText={t("admin.caregiver.approve_cancel")}
                                >
                                    <Button
                                        type="primary"
                                        size="middle"
                                        loading={approving}
                                    >
                                        {t("admin.caregiver.approve_btn")}
                                    </Button>
                                </Popconfirm>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}