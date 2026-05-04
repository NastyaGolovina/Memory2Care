
import React, { useState } from "react";
import { useLang } from "../language/useLang.js";
import { Alert, Button, DatePicker, Form, Input, Typography, Popconfirm } from 'antd';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import dayjs from 'dayjs';

const { Paragraph } = Typography;
export default function PatientPage({ user, setUser, handleAutoLogout }) {
    const { t } = useLang();
    const [form] = Form.useForm();
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    React.useEffect(() => {
        if (user) {
            form.setFieldsValue({
                email: user.email,
                name: user.profile?.name,
                address: user.profile?.address,
                phone: user.profile?.phone,
                patient_code: user.profile?.patient_code,
                diagnosis: user.profile?.diagnosis,
                birth_date: user.profile?.birth_date ? dayjs(user.profile.birth_date) : null, // ✅ dayjs
            });
        }
    }, [user, form]);

    const toggleEdit = () => {
        setIsEdit(prev => !prev);
        setError(null);
        if (isEdit) {
            form.setFieldsValue({
                email: user.email,
                name: user.profile?.name,
                address: user.profile?.address,
                phone: user.profile?.phone,
                diagnosis: user.profile?.diagnosis,
                birth_date: user.profile?.birth_date ? dayjs(user.profile.birth_date) : null,
                patient_code: user.profile?.patient_code
            });
        }
    };

    const handleDeactivate = async () => {
        try {
            const res = await fetchWithAuth("http://localhost:3000/api/patient/deactivate", {
                method: "POST",
                body: JSON.stringify({ user_id: user.id }),
            }, handleAutoLogout);

            if (!res) return;
            const data = await res.json();

            if (!data.success) {
                setError(data.error?.message || "Deactivation failed");
            } else {
                handleAutoLogout();
            }
        } catch {
            setError("Server error, please try again");
        }
    };

    const handleFinish = async (values) => {
        setLoading(true);
        setError(null);

        try {
            const updateRes = await fetchWithAuth('http://localhost:3000/api/patient/update', {
                    method: 'POST',
                    body: JSON.stringify({
                        patient_id: user.profile.patient_id,
                        name: values.name,
                        phone: values.phone,
                        address: values.address,
                        diagnosis: values.diagnosis,
                        birth_date: values.birth_date?.format("YYYY-MM-DD")
                    })
                },
                handleAutoLogout
            );

            if (!updateRes) return;
            const updateData = await updateRes.json();
            console.log('updateData:', updateData);
            //

            if (!updateData.success) {
                setError(updateData.error.message);
                return;
            }

            const updatedUser = {
                ...user,
                profile: {
                    ...user.profile,
                    name: updateData.data.name,
                    phone: updateData.data.phone,
                    address: updateData.data.address,
                    diagnosis: updateData.data.diagnosis,
                    birth_date: updateData.data.birth_date,
                }
            };

            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            setIsEdit(false);

        } catch (err) {
            console.error(err);
            setError('Server error, please try again');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "0 50px"
            }}>
                <Typography.Title level={1} style={{ margin: 0, lineHeight: "32px" }}>
                    {t("caregiver.menu.about")}
                </Typography.Title>

                <div style={{ display: "flex", gap: 8 }}>
                    <Button type="dashed" size="middle" onClick={toggleEdit}>
                        {isEdit ? t("common.cancel") : t("common.edit")}
                    </Button>


                    {!isEdit && (
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
                    )}
                </div>
            </div>

            <Form
                form={form}
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: "100%", marginTop: 60 }}
                onFinish={handleFinish}
            >

                {error && (
                    <Alert message={error} type="error" showIcon closable
                           onClose={() => setError(null)} style={{ marginBottom: 16 }} />
                )}
                {success && (
                    <Alert message={success} type="success" showIcon closable
                           onClose={() => setSuccess(null)} style={{ marginBottom: 16 }} />
                )}

                <Form.Item label={t("signup.email")} name="email">
                    <Input readOnly />
                </Form.Item>

                <Form.Item label={t("patient.patient_code")} name="patient_code">
                    <Input readOnly />
                </Form.Item>

                {/*<Form.Item label={t("signup.name")} name="name">*/}
                {/*    <Input readOnly={!isEdit} />*/}
                {/*</Form.Item>*/}

                {/*<Form.Item label={t("signup.address")} name="address">*/}
                {/*    <Input readOnly={!isEdit} />*/}
                {/*</Form.Item>*/}

                {/*<Form.Item label={t("signup.phone")} name="phone">*/}
                {/*    <Input readOnly={!isEdit} />*/}
                {/*</Form.Item>*/}

                {/*<Form.Item*/}
                {/*    label={t("signup.diagnosis")}*/}
                {/*    name="diagnosis"*/}
                {/*>*/}
                {/*    <Input readOnly={!isEdit} />*/}
                {/*</Form.Item>*/}

                {/*<Form.Item*/}
                {/*    label={t("signup.birth_date")}*/}
                {/*    name="birth_date"*/}
                {/*>*/}
                {/*    <DatePicker readOnly={!isEdit} />*/}
                {/*</Form.Item>*/}
                <Form.Item label={t("signup.name")} name="name"
                           rules={isEdit ? [{ required: true, message: t("signup.name_required") }] : []}>
                    <Input readOnly={!isEdit} />
                </Form.Item>

                <Form.Item label={t("signup.address")} name="address"
                           rules={isEdit ? [{ required: true, message: t("signup.address_required") }] : []}>
                    <Input readOnly={!isEdit} />
                </Form.Item>

                <Form.Item label={t("signup.phone")} name="phone"
                           rules={isEdit ? [{ required: true, message: t("signup.phone_required") }] : []}>
                    <Input readOnly={!isEdit} />
                </Form.Item>

                <Form.Item label={t("signup.diagnosis")} name="diagnosis"
                           rules={isEdit ? [{ required: true, message: t("signup.diagnosis_required") }] : []}>
                    <Input readOnly={!isEdit} />
                </Form.Item>

                <Form.Item
                    label={t("signup.birth_date")}
                    name="birth_date"
                    rules={isEdit ? [{ required: true, message: t("signup.birth_date_required") }] : []}
                >
                    <DatePicker disabled={!isEdit} />
                </Form.Item>




                {isEdit && (
                    <Form.Item label={null} wrapperCol={{ offset: 2, span: 14 }}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {t("common.save")}
                        </Button>
                    </Form.Item>
                )}
            </Form>
        </div>
    );
}