import { useParams } from "react-router-dom";
import React from 'react';
import { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import Login from "../components/login";
import SignUp from "../components/singup.jsx";
import {useLang} from "../language/langContext.jsx";
import { Breadcrumb, Layout, theme ,Segmented,
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Mentions,
    Radio,
    Rate,
    Select,
    Slider,
    Switch,
    Transfer,
    Tree,
    TreeSelect,
    Upload,} from 'antd';
const { Header, Content, Footer,
    Sider } = Layout;




export default function AccountPage() {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });


    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { lang, setLang, t } = useLang();



    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            // Чистим localStorage в любом случае
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            setUser(null);
        }
    };

    // const [activeTab, setActiveTab] = useState("Log In");
    const [activeTab, setActiveTab] = useState("login");

    if (user) {
        return (
            <Layout>
                <div style={{ padding: '0 48px' }}>


                    <Button  onClick={handleLogout}>
                        {t("account.logout")}
                    </Button>

                    <Layout
                        style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
                    >

                        <Content style={{ padding: '0 24px' }}>
                            {user.role === "ADMIN" && (
                                <div>
                                    <h2>Admin Panel</h2>
                                    {/* твой AdminPanel компонент */}
                                </div>
                            )}
                            {user.role === "PATIENT" && (
                                <div>
                                    <h2>Patient Dashboard</h2>
                                    {/* твой PatientDashboard компонент */}
                                </div>
                            )}
                            {user.role === "CAREGIVER" && (
                                <div>
                                    <h2>Caregiver Dashboard</h2>
                                    {/* твой CaregiverDashboard компонент */}
                                </div>
                            )}

                        </Content>
                    </Layout>
                </div>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        );
    }


    return (
        <Layout>
            <div style={{ padding: '0 48px' }}>


                {/*<Segmented*/}
                {/*    style={{ margin: '16px 0' }}*/}
                {/*    options={[t("account.login"), t("account.signup")]}*/}
                {/*    value={activeTab}*/}
                {/*    onChange={(value) => setActiveTab(value)}*/}
                {/*/>*/}

                <Segmented
                    style={{ margin: '16px 0' }}
                    options={[
                        { label: t("account.login"), value: "login" },
                        { label: t("account.signup"), value: "signup" }
                    ]}
                    value={activeTab}
                    onChange={setActiveTab}
                />

                <Layout
                    style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
                >

                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        {/*{activeTab === t("account.login") ? <Login /> : <SignUp />}*/}
                        {/*{activeTab === t("account.login") ? <Login setUser={setUser} /> : <SignUp />}*/}
                        {activeTab === "login"
                            ? <Login setUser={setUser} />
                            : <SignUp setUser={setUser} />}
                    </Content>
                </Layout>
            </div>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    )


}