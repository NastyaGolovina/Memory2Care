import React from "react";
import { useLang } from "../language/useLang.js";
import { Typography, Input, Form, Alert, Button, Select } from "antd";
import { useState } from "react";
import { fetchWithAuth } from "../utils/fetchWithAuth.js";
const { Search } = Input;

export default function SearchPatient({ user, setUser,handleAutoLogout  }) {
    const [form] = Form.useForm();
    const { t } = useLang();

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [patientId, setPatientId] = useState(null);

    const onSearch = async (value) => {
        setError(null);
        setSuccess(null);
        setShowForm(false);
        form.resetFields();

        if (!value) return;

        try {
            const res = await fetchWithAuth("http://localhost:3000/api/patient/find", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ patient_code: value }),
            });


            const data = await res.json();
            console.log(data)
            if (!res.ok) {
                setError(data.message || "Patient not found");
                return;
            }


            setPatientId(data.data.patient_id);

            form.setFieldsValue({
                patient_id: data.data.patient_id,
                anon_name: data.data.name_initial,
                approx_age: data.data.approx_age,
            });


            setShowForm(true);

        } catch (e) {
            setError("Server error");
        }
    };

    const handleFinish = async (values) => {
        setError(null);
        setSuccess(null);

        try {
            const res = await fetchWithAuth("http://localhost:3000/api/patient-caregiver/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    patient_id: patientId,
                    caregiver_id: user.profile.caregiver_id,
                    relationship: values.relationship,
                    support_level: values.support_level,
                    approx_age: values.approx_age,
                    anon_name: values.anon_name,
                }),
            });

            const data = await res.json();
            // console.log(data)
            if (!res.ok) {
                setError(data.error.message || "Failed to add patient");
                return;
            }

            setSuccess(t("caregiver.messages.patient_added"));
            setShowForm(false);
            setPatientId(null);
            form.resetFields();

        } catch (e) {
            setError("Server error");
        }
    };
    return (
        <div>
            <Typography.Title level={1} style={{ marginLeft: 50, lineHeight: "32px" }}>
                {t("caregiver.menu.search")}
            </Typography.Title>
            <Search
                placeholder="input search text"
                onSearch={onSearch}
                enterButton
                style={{  marginLeft: 50,maxWidth: "80%", marginTop: 20 }}
            />
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 12 }}
                layout="horizontal"
                style={{ maxWidth: "80%", marginTop: 60, marginLeft: 50 }}
                onFinish={handleFinish}
            >

                {error && (
                    <div style={{ marginLeft: 50,marginBottom: 30, maxWidth: "80%", marginTop: 16 }}>
                        <Alert message={error} type="error" showIcon />
                    </div>
                )}

                {success && (
                    <div style={{ marginLeft: 50,marginBottom: 30, maxWidth: "80%", marginTop: 16 }}>
                        <Alert message={success} type="success" showIcon />
                    </div>
                )}
                <Form.Item label={t("caregiver.form.patient_id")} name="patient_id">
                    <Input readOnly />
                </Form.Item>


                <Form.Item
                    label={t("caregiver.form.anon_name")}
                    name="anon_name"
                    rules={showForm ? [{ required: true, message: t("caregiver.form.anon_name_required") }] : []}
                >
                    <Input readOnly={!showForm} />
                </Form.Item>


                <Form.Item
                    label={t("caregiver.form.relationship")}
                    name="relationship"
                    rules={showForm ? [{ required: true, message: t("caregiver.form.relationship_required") }] : []}
                >
                    <Select
                        disabled={!showForm}
                        options={[
                            { label: t("caregiver.select.family_member"), value: "FAMILY_MEMBER" },
                            { label: t("caregiver.select.informal_caretaker"), value: "INFORMAL_CARETAKER" },
                            { label: t("caregiver.select.medical_caretaker"), value: "MEDICAL_CARETAKER" },
                        ]}
                    />
                </Form.Item>


                <Form.Item
                    label={t("caregiver.form.support_level")}
                    name="support_level"
                    rules={showForm ? [{ required: true, message: t("caregiver.form.support_level_required") }] : []}
                >
                    <Select
                        disabled={!showForm}
                        options={[
                            { label: t("caregiver.select.low"), value: "LOW" },
                            { label: t("caregiver.select.medium"), value: "MEDIUM" },
                            { label: t("caregiver.select.high"), value: "HIGH" },
                        ]}
                    />
                </Form.Item>


                <Form.Item
                    label={t("caregiver.form.approx_age")}
                    name="approx_age"
                    rules={showForm ? [{ required: true, message: t("caregiver.form.approx_age_required") }] : []}
                >
                    <Input readOnly={!showForm} />
                </Form.Item>


                {showForm && (
                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            {t("caregiver.form.add_patient")}
                        </Button>

                        <Button style={{ marginLeft: 30}}
                            onClick={() => {
                                form.resetFields();
                                setShowForm(false);
                                setPatientId(null);
                                setError(null);
                                setSuccess(null);
                            }}
                        >
                            {t("caregiver.form.cancel")}
                        </Button>

                    </Form.Item>
                )}
            </Form>


        </div>
    );
}
