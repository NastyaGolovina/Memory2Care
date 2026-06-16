import React, { useState } from 'react';
import { Form, Input, Button, Alert, Steps, Typography } from 'antd';
import { MailOutlined, SafetyOutlined, LockOutlined } from '@ant-design/icons';
import { useLang } from '../language/useLang.js';

const { Title, Text } = Typography;

export default function ForgotPassword({ onBack }) {
    const { t } = useLang();

    const STEPS = [
        { title: t('forgot.step_email'),  icon: <MailOutlined /> },
        { title: t('forgot.step_verify'), icon: <SafetyOutlined /> },
        { title: t('forgot.step_done'),   icon: <LockOutlined /> },
    ];

    const [step,    setStep   ] = useState(0);
    const [email,   setEmail  ] = useState('');
    const [loading, setLoading] = useState(false);
    const [error,   setError  ] = useState(null);
    const [success, setSuccess] = useState(null);

    const onSendCode = async ({ email: inputEmail }) => {
        setLoading(true);
        setError(null);
        try {
            const res  = await fetch('http://localhost:3000/api/auth/forgot-password', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ email: inputEmail }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error?.message || 'Error');
            setEmail(inputEmail);
            setStep(1);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const onResetPassword = async ({ code, newPassword }) => {
        setLoading(true);
        setError(null);
        try {
            const res  = await fetch('http://localhost:3000/api/auth/reset-password', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ email, code, newPassword }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error?.message || 'Error');
            setSuccess(t('forgot.success_message'));
            setStep(2);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div style={{ width: '100%', maxWidth: 460 }}>

                <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                    {t('forgot.title')}
                </Title>

                <Steps
                    current={step}
                    items={STEPS}
                    size="small"
                    style={{ marginBottom: 32 }}
                />

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

                {/* ── Step 0: Email ── */}
                {step === 0 && (
                    <Form layout="vertical" onFinish={onSendCode}>
                        <Form.Item
                            label={t('forgot.email_label')}
                            name="email"
                            rules={[
                                { required: true, message: t('forgot.email_required') },
                                { type: 'email',  message: t('forgot.email_invalid')  },
                            ]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="you@example.com" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} block>
                                {t('forgot.btn_send_code')}
                            </Button>
                        </Form.Item>

                        <div style={{ textAlign: 'center' }}>
                            <Button type="link" onClick={onBack}>
                                {t('forgot.back_to_login')}
                            </Button>
                        </div>
                    </Form>
                )}

                {/* ── Step 1: Code + new password ── */}
                {step === 1 && (
                    <>
                        <Alert
                            message={`${t('forgot.code_sent_to')} ${email}`}
                            type="info"
                            showIcon
                            style={{ marginBottom: 16 }}
                        />
                        <Form layout="vertical" onFinish={onResetPassword}>
                            <Form.Item
                                label={t('forgot.code_label')}
                                name="code"
                                rules={[
                                    { required: true, message: t('forgot.code_required') },
                                    { len: 6,         message: t('forgot.code_length')   },
                                    { pattern: /^\d+$/, message: t('forgot.code_digits') },
                                ]}
                            >
                                <Input
                                    prefix={<SafetyOutlined />}
                                    placeholder="123456"
                                    maxLength={6}
                                />
                            </Form.Item>

                            <Form.Item
                                label={t('forgot.new_password_label')}
                                name="newPassword"
                                rules={[
                                    { required: true, message: t('forgot.new_password_required') },
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder={t('forgot.new_password_label')} />
                            </Form.Item>

                            <Form.Item
                                label={t('forgot.confirm_password_label')}
                                name="confirm"
                                dependencies={['newPassword']}
                                rules={[
                                    { required: true, message: t('forgot.confirm_required') },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error(t('forgot.passwords_mismatch')));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder={t('forgot.confirm_password_label')} />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading} block>
                                    {t('forgot.btn_reset')}
                                </Button>
                            </Form.Item>

                            <div style={{ textAlign: 'center' }}>
                                <Button type="link" onClick={() => { setStep(0); setError(null); }}>
                                    {t('forgot.change_email')}
                                </Button>
                            </div>
                        </Form>
                    </>
                )}

                {/* ── Step 2: Done ── */}
                {step === 2 && (
                    <div style={{ textAlign: 'center' }}>
                        <Alert message={success} type="success" showIcon style={{ marginBottom: 24 }} />
                        <Text type="secondary">{t('forgot.success_hint')}</Text>
                        <br /><br />
                        <Button type="primary" onClick={onBack}>
                            {t('forgot.btn_go_login')}
                        </Button>
                    </div>
                )}

            </div>
        </div>
    );
}