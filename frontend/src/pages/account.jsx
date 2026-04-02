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
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { lang, setLang, t } = useLang();


    const [activeTab, setActiveTab] = useState("Log In");




    return (
        <Layout>
            <div style={{ padding: '0 48px' }}>
                {/*<Breadcrumb*/}

                {/*    items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}*/}
                {/*/>*/}

                {/*<Segmented style={{ margin: '16px 0' }} options={["Log In", "Sign Up"]} />*/}

                {/*<Segmented*/}
                {/*    style={{ margin: '16px 0' }}*/}
                {/*    options={["Log In", "Sign Up"]}*/}
                {/*    value={activeTab}*/}
                {/*    onChange={(value) => setActiveTab(value)}*/}
                {/*/>*/}

                <Segmented
                    style={{ margin: '16px 0' }}
                    options={[t("account.login"), t("account.signup")]}
                    value={activeTab}
                    onChange={(value) => setActiveTab(value)}
                />


                <Layout
                    style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
                >
                    {/*<Content style={{ padding: '0 24px', minHeight: 280 }}>*/}





                    {/*</Content>*/}
                    {/*<Content style={{ padding: '0 24px', minHeight: 280 }}>*/}
                    {/*    {activeTab === "Log In" ? <Login /> : <SignUp />}*/}
                    {/*</Content>*/}
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        {activeTab === t("account.login") ? <Login /> : <SignUp />}
                    </Content>
                </Layout>
            </div>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    )


}