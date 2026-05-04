import { useParams } from "react-router-dom";
import React from 'react';
import { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import Login from "../components/login";
import SignUp from "../components/singup.jsx";
import { useLang } from "../language/useLang.js";



import About from "../components/aboutCaregiver";
import SearchPatient from "../components/patientCaregiverSearch.jsx";
import PatientCaregiver from "../components/patientCaregiver.jsx";
import TaskCalendar from "../components/TaskCalendar";
// import TaskHistory from "../components/TaskHistory";
// import TaskCreate from "../components/TaskCreate";
import TaskCreate from "../components/createTask.jsx";



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
    Upload,
    Menu,
    Space
    } from 'antd';
const { Header, Content, Footer,
    Sider  } = Layout;




export default function AccountPage() {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const handleAutoLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setUser(null);
    };
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
    const [selectedKey, setSelectedKey] = useState("about");
    const items2 = [
        {
            key: "about",
            label: t("caregiver.menu.about"),
        },
        {
            key: "patient",
            label: t("caregiver.menu.patient"),
            children: [
                {
                    key: "patient_caregiver",
                    label: t("caregiver.menu.patient"),
                },
                {
                    key: "patient_search",
                    label: t("caregiver.menu.search"),
                }
            ]
        },
        {
            key: "task",
            label: t("caregiver.menu.task"),
            children: [
                {
                    key: "task_calendar",
                    label: t("caregiver.menu.calendar"),
                },
                {
                    key: "task_history",
                    label: t("caregiver.menu.history"),
                },
                {
                    key: "task_create",
                    label: t("caregiver.menu.create_new"),
                },
            ],
        },
    ];
    // const contentMap = {
    //     about: <About user={user}/>,
    //     patient: <h2>Patient</h2>,
    //
    //     task_calendar: <h2>Calendar</h2>,
    //     task_history: <h2>History</h2>,
    //     task_create: <h2>Create new task</h2>,
    // };
    //

    const renderContent = () => {
        switch (selectedKey) {
            case "about":
                return <About user={user} setUser={setUser} handleAutoLogout={handleAutoLogout} />
            case "patient_caregiver":
                return <PatientCaregiver user={user} setUser={setUser} handleAutoLogout={handleAutoLogout} />
            case "patient_search":
                return <SearchPatient user={user} setUser={setUser} handleAutoLogout={handleAutoLogout} />
            case "task_create":
                return <TaskCreate user={user} setUser={setUser} handleAutoLogout={handleAutoLogout} />
            case "task_calendar":
                return <TaskCalendar user={user} setUser={setUser} handleAutoLogout={handleAutoLogout} />
            default:
                return <div>Not found</div>;
        }
    };
    if (user) {
        return (
            // <Layout>
            <Layout style={{ minHeight: "84vh" }}>
                <div style={{ padding: '0 48px' }}>


                    {/*<Button style={{ margin: "10px" }} onClick={handleLogout}>*/}
                    {/*    {t("account.logout")}*/}
                    {/*</Button>*/}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            margin: "10px 0",
                        }}
                    >

                        <Button onClick={handleLogout}>
                            {t("account.logout")}
                        </Button>

                        <Space>
                            <UserOutlined />
                            <span>{user?.profile?.name}</span>
                        </Space>



                    </div>

                    <Layout
                        style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
                    >

                        <Content style={{ padding: '0 24px' }}>
                            {user.role === "ADMIN" && (
                                <div>

                                    <h2>Admin Panel</h2>
                                    {/*/!* твой AdminPanel компонент *!/*/}
                                </div>
                            )}
                            {/*{user.role === "PATIENT" && (*/}
                            {/*    <PatientPage*/}
                            {/*        user={user}*/}
                            {/*        setUser={setUser}*/}
                            {/*        handleAutoLogout={handleAutoLogout}*/}
                            {/*    />*/}
                            {/*)}*/}
                            {user?.role === "PATIENT" && (
                                <PatientPage
                                    user={user}
                                    setUser={setUser}
                                    handleAutoLogout={handleAutoLogout}
                                />
                            )}
                            {user.role === "CAREGIVER" && (
                                <div>
                                    <Layout
                                        style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
                                    >
                                        <Sider style={{ background: colorBgContainer }} width={200}>
                                            {/*<Menu*/}
                                            {/*    mode="inline"*/}
                                            {/*    defaultSelectedKeys={['1']}*/}
                                            {/*    defaultOpenKeys={['sub1']}*/}
                                            {/*    style={{ height: '100%' }}*/}
                                            {/*    items={items2}*/}
                                            {/*/>*/}
                                            <Menu
                                                mode="inline"
                                                selectedKeys={[selectedKey]}
                                                onClick={(e) => setSelectedKey(e.key)}
                                                style={{ height: '100%' }}
                                                items={items2}
                                            />
                                        </Sider>
                                        {/*<Content style={{ padding: '0 24px', minHeight: 280 }}>*/}
                                        {/*    {contentMap[selectedKey] || <div>Not found</div>}*/}
                                        {/*</Content>*/}
                                        <Content>
                                            {renderContent()}
                                        </Content>
                                    </Layout>
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