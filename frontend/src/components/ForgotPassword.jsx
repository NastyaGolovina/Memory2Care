import React, { useState } from 'react';

import { Form, Input, Button, Alert, Steps, Typography } from 'antd';
import { MailOutlined, SafetyOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const STEPS = [
    { title: 'Email',   icon: <MailOutlined /> },
    { title: 'Verify',  icon: <SafetyOutlined /> },
    { title: 'Done',    icon: <LockOutlined /> },
];

export default function ForgotPassword({ onBack }) {

    const [step, setStep]       = useState(0);
    const [email, setEmail]     = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);
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
            setSuccess('Password updated successfully!');
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
                    Forgot Password
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

                {step === 0 && (
                    <Form layout="vertical" onFinish={onSendCode}>
                        <Form.Item
                            label="Email address"
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter your email' },
                                { type: 'email',  message: 'Enter a valid email' },
                            ]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="you@example.com" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} block>
                                Send verification code
                            </Button>
                        </Form.Item>

                        <div style={{ textAlign: 'center' }}>
                            <Button type="link" onClick={onBack}>
                                Back to Login
                            </Button>
                        </div>
                    </Form>
                )}

                {step === 1 && (
                    <>
                        <Alert
                            message={`A 6-digit code was sent to ${email}`}
                            type="info"
                            showIcon
                            style={{ marginBottom: 16 }}
                        />
                        <Form layout="vertical" onFinish={onResetPassword}>
                            <Form.Item
                                label="Verification code"
                                name="code"
                                rules={[
                                    { required: true, message: 'Please enter the code' },
                                    { len: 6,         message: 'Code must be 6 digits' },
                                    { pattern: /^\d+$/, message: 'Only digits allowed' },
                                ]}
                            >
                                <Input
                                    prefix={<SafetyOutlined />}
                                    placeholder="123456"
                                    maxLength={6}
                                />
                            </Form.Item>

                            <Form.Item
                                label="New password"
                                name="newPassword"
                                rules={[
                                    { required: true, message: 'Please enter a new password' },
                                    { min: 6,         message: 'At least 6 characters' },
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="New password" />
                            </Form.Item>

                            <Form.Item
                                label="Confirm password"
                                name="confirm"
                                dependencies={['newPassword']}
                                rules={[
                                    { required: true, message: 'Please confirm your password' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Passwords do not match'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Confirm password" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading} block>
                                    Reset password
                                </Button>
                            </Form.Item>

                            <div style={{ textAlign: 'center' }}>
                                <Button type="link" onClick={() => { setStep(0); setError(null); }}>
                                    ← Change email
                                </Button>
                            </div>
                        </Form>
                    </>
                )}

                {step === 2 && (
                    <div style={{ textAlign: 'center' }}>
                        <Alert message={success} type="success" showIcon style={{ marginBottom: 24 }} />
                        <Text type="secondary">You can now log in with your new password.</Text>
                        <br /><br />
                        <Button
                            type="primary"
                            onClick={onBack}
                        >
                            Go to Login
                        </Button>
                    </div>
                )}

            </div>
        </div>
    );
}