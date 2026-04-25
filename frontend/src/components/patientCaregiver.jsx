import React, { useState, useEffect, useCallback } from "react";
import { useLang } from "../language/useLang.js";
import {
    Alert,
    Button,
    Form,
    Input,
    Select,
    Typography,
    List,
    Popconfirm,
    Spin,
    message as antMessage,
} from "antd";
import { fetchWithAuth } from "../utils/fetchWithAuth.js";

const { Title, Text } = Typography;

export default function PatientCaregiver({ user, setUser, handleAutoLogout }) {
    const { t } = useLang();
    const [form] = Form.useForm();


    const [patients, setPatients]           = useState([]);
    const [listLoading, setListLoading]     = useState(false);


    const [selectedPcId, setSelectedPcId]   = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [detailData, setDetailData]       = useState(null);


    const [isEdit, setIsEdit]               = useState(false);


    const [error, setError]                 = useState(null);
    const [success, setSuccess]             = useState(null);

    const loadPatients = useCallback(async () => {
        setListLoading(true);
        setError(null);
        try {
            const caregiverId = user?.profile?.caregiver_id;
            const res = await fetchWithAuth(
                `http://localhost:3000/api/caregiver/get/patients?caregiver_id=${caregiverId}`
            );
            const data = await res.json();
            if (data.success) {
                setPatients(data.data);
            } else {
                setError(data.error?.message || "Failed to load patients");
            }
        } catch {
            setError("Server error");
        } finally {
            setListLoading(false);
        }
    }, [user]);

    useEffect(() => {
        loadPatients();
    }, [loadPatients]);


    const handleSelectPatient = async (pcId) => {
        setIsEdit(false);
        setError(null);
        setSuccess(null);
        setSelectedPcId(pcId);
        setDetailLoading(true);
        form.resetFields();

        try {
            const res = await fetchWithAuth(
                `http://localhost:3000/api/patient-caregiver/get?pc_id=${pcId}`
            );
            const data = await res.json();
            if (data.success) {
                setDetailData(data.data);
                form.setFieldsValue({
                    pc_id:           data.data.pc_id,
                    patient_code:    data.data.patient_code,
                    assignment_date: data.data.assignment_date
                        ? new Date(data.data.assignment_date).toLocaleDateString()
                        : "",
                    anon_name:       data.data.anon_name,
                    approx_age:      data.data.approx_age,
                    relationship:    data.data.relationship,
                    support_level:   data.data.support_level,
                });
            } else {
                setError(data.error?.message || "Failed to load patient details");
            }
        } catch {
            setError("Server error");
        } finally {
            setDetailLoading(false);
        }
    };


    const toggleEdit = () => {
        if (isEdit) {
            if (detailData) {
                form.setFieldsValue({
                    anon_name:  detailData.anon_name,
                    approx_age: detailData.approx_age,
                });
            }
            setError(null);
            setSuccess(null);
        }
        setIsEdit((prev) => !prev);
    };

    const handleSubmit = async (values) => {
        setError(null);
        setSuccess(null);
        try {
            const res = await fetchWithAuth(
                "http://localhost:3000/api/patient-caregiver/update",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        pc_id:      detailData.pc_id,
                        anon_name:  values.anon_name,
                        approx_age:  Number(values.approx_age),
                    }),
                }
            );
            const data = await res.json();
            if (!res.ok || !data.success) {
                setError(data.error?.message || "Failed to update patient");
                return;
            }

            setDetailData((prev) => ({
                ...prev,
                anon_name:  values.anon_name,
                approx_age: values.approx_age,
            }));
            setPatients((prev) =>
                prev.map((p) =>
                    p.pc_id === detailData.pc_id
                        ? { ...p, anon_name: values.anon_name }
                        : p
                )
            );
            setSuccess(t("caregiver.updated"));
            setIsEdit(false);
        } catch {
            setError("Server error");
        }
    };


    const handleDeactivate = async () => {
        setError(null);
        setSuccess(null);
        try {
            const res = await fetchWithAuth(
                "http://localhost:3000/api/patient-caregiver/deactivate",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ pc_id: detailData.pc_id }),
                }
            );
            const data = await res.json();
            if (!res.ok || !data.success) {
                setError(data.error?.message || "Failed to deactivate patient");
                return;
            }
            antMessage.success(t("caregiver.deactivated"));
            setPatients((prev) => prev.filter((p) => p.pc_id !== detailData.pc_id));
            setSelectedPcId(null);
            setDetailData(null);
            setIsEdit(false);
            form.resetFields();
        } catch {
            setError("Server error");
        }
    };

    return (
        <div style={{ padding: "24px 50px" }}>

            <Title level={1} style={{ margin: 0, lineHeight: "32px", marginBottom: 24 }}>
                {t("caregiver.menu.patient")}
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
                            header={<Text strong>{t("caregiver.menu.patient")}</Text>}
                            bordered
                            dataSource={patients}
                            locale={{ emptyText: t("caregiver.select_patient") }}
                            renderItem={(item) => (
                                <List.Item
                                    onClick={() => handleSelectPatient(item.pc_id)}
                                    style={{
                                        cursor: "pointer",
                                        backgroundColor:
                                            selectedPcId === item.pc_id ? "#e6f7ff" : "transparent",
                                        transition: "background-color 0.2s",
                                    }}
                                >
                                    <Typography.Text>
                                        {item.anon_name}
                                    </Typography.Text>
                                </List.Item>
                            )}
                        />
                    </Spin>
                </div>


                <div style={{ flex: 1 }}>
                    {!selectedPcId ? (
                        <Text type="secondary">{t("caregiver.select_patient")}</Text>
                    ) : (
                        <Spin spinning={detailLoading}>


                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: 24,
                            }}>
                                <Title level={3} style={{ margin: 0 }}>
                                    {detailData?.anon_name || "..."}
                                </Title>

                                <div style={{ display: "flex", gap: 8 }}>
                                    <Button type="dashed" size="middle" onClick={toggleEdit}>
                                        {isEdit ? t("common.cancel") : t("common.edit")}
                                    </Button>

                                    <Popconfirm
                                        title={t("caregiver.deactivate_title")}
                                        description={t("caregiver.deactivate_desc")}
                                        onConfirm={handleDeactivate}
                                        okText={t("caregiver.deactivate_ok")}
                                        cancelText={t("caregiver.deactivate_cancel")}
                                    >
                                        <Button danger size="middle">
                                            {t("caregiver.deactivate")}
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </div>

                            <Form
                                form={form}
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}
                                layout="horizontal"
                                onFinish={handleSubmit}
                                style={{ maxWidth: 680 }}
                            >
                                <Form.Item label={t("caregiver.form.pc_id")} name="pc_id">
                                    <Input readOnly />
                                </Form.Item>

                                <Form.Item label={t("caregiver.form.patient_code")} name="patient_code">
                                    <Input readOnly />
                                </Form.Item>

                                <Form.Item label={t("caregiver.form.assignment_date")} name="assignment_date">
                                    <Input readOnly />
                                </Form.Item>

                                <Form.Item
                                    label={t("caregiver.form.anon_name")}
                                    name="anon_name"
                                    rules={isEdit ? [{ required: true, message: t("caregiver.form.anon_name_required") }] : []}
                                >
                                    <Input readOnly={!isEdit} />
                                </Form.Item>

                                <Form.Item
                                    label={t("caregiver.form.approx_age")}
                                    name="approx_age"
                                    rules={isEdit ? [{ required: true, message: t("caregiver.form.approx_age_required") }] : []}
                                >
                                    <Input readOnly={!isEdit} />
                                </Form.Item>

                                <Form.Item label={t("caregiver.form.relationship")} name="relationship">
                                    <Select
                                        disabled
                                        options={[
                                            { label: t("caregiver.select.family_member"),      value: "FAMILY_MEMBER" },
                                            { label: t("caregiver.select.informal_caretaker"), value: "INFORMAL_CARETAKER" },
                                            { label: t("caregiver.select.medical_caretaker"),  value: "MEDICAL_CARETAKER" },
                                        ]}
                                    />
                                </Form.Item>


                                <Form.Item label={t("caregiver.form.support_level")} name="support_level">
                                    <Select
                                        disabled
                                        options={[
                                            { label: t("caregiver.select.low"),    value: "LOW" },
                                            { label: t("caregiver.select.medium"), value: "MEDIUM" },
                                            { label: t("caregiver.select.high"),   value: "HIGH" },
                                        ]}
                                    />
                                </Form.Item>

                                {isEdit && (
                                    <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                                        <Button type="primary" htmlType="submit">
                                            {t("common.save")}
                                        </Button>
                                    </Form.Item>
                                )}
                            </Form>
                        </Spin>
                    )}
                </div>
            </div>
        </div>
    );
}