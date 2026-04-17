
import React, { useState } from "react";
import { useLang } from "../language/langContext";
import { Alert, Button, Form, Input, Typography } from 'antd';
import { fetchWithAuth } from '../utils/fetchWithAuth';

const { Paragraph } = Typography;

export default function AboutCaregiver({ user, setUser,handleAutoLogout  }) {
    const { t } = useLang();
    const [form] = Form.useForm();
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    React.useEffect(() => {
        if (user) {
            form.setFieldsValue({
                email: user.email,
                name: user.profile?.name,
                address: user.profile?.address,
                phone: user.profile?.phone,
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
            });
        }
    };



    const handleFinish = async (values) => {
        setLoading(true);
        setError(null);

        try {
            const updateRes = await fetchWithAuth('http://localhost:3000/api/caregiver/update', {
                method: 'POST',
                body: JSON.stringify({
                    caregiver_id: user.profile.caregiver_id,
                    name: values.name,
                    phone: values.phone,
                    address: values.address,
                })
                },
                handleAutoLogout
            );

            // if (!updateRes) return;
            const updateData = await updateRes.json();
            // console.log('updateData:', updateData);

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
    //
    // const handleFinish = async (values) => {
    //     setLoading(true);
    //     setError(null);
    //
    //     try {
    //         const accessToken = localStorage.getItem('accessToken');
    //
    //         const updateRes = await fetch('http://localhost:3000/api/caregiver/update', {
    //             method: 'POST',
    //             credentials: 'include',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${accessToken}`
    //             },
    //             body: JSON.stringify({
    //                 caregiver_id: user.profile.caregiver_id,
    //                 name: values.name,
    //                 phone: values.phone,
    //                 address: values.address,
    //             })
    //         });
    //
    //         const updateData = await updateRes.json();
    //
    //         if (!updateData.success) {
    //             setError(updateData.error.message);
    //             return;
    //         }
    //
    //         const getRes = await fetch(
    //             `http://localhost:3000/api/caregiver/get/caregiver?caregiver_id=${user.profile.caregiver_id}`,
    //             {
    //                 credentials: 'include',
    //                 headers: { 'Authorization': `Bearer ${accessToken}` }
    //             }
    //         );
    //
    //         const getData = await getRes.json();
    //
    //         if (!getData.success) {
    //             setError(getData.error.message);
    //             return;
    //         }
    //
    //         const updatedUser = {
    //             ...user,
    //             profile: getData.data  // { caregiver_id, name, phone, address, approved }
    //         };
    //
    //         localStorage.setItem('user', JSON.stringify(updatedUser));
    //         setUser(updatedUser);
    //
    //         setIsEdit(false);
    //
    //     } catch (err) {
    //         setError('Server error, please try again');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

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

                <Button type="dashed" size="middle" onClick={toggleEdit}>
                    {isEdit ? t("common.cancel") : t("common.edit")}
                </Button>
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
                    <Form.Item wrapperCol={{ offset: 2, span: 14 }}>
                        <Alert message={error} type="error" showIcon />
                    </Form.Item>
                )}

                <Form.Item label={t("signup.email")} name="email">
                    <Input readOnly />
                </Form.Item>

                <Form.Item label={t("signup.name")} name="name">
                    <Input readOnly={!isEdit} />
                </Form.Item>

                <Form.Item label={t("signup.address")} name="address">
                    <Input readOnly={!isEdit} />
                </Form.Item>

                <Form.Item label={t("signup.phone")} name="phone">
                    <Input readOnly={!isEdit} />
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
