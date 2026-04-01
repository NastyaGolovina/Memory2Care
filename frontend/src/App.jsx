
import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "./language/langContext.jsx";
import Navbar from "./components/header.jsx";
import AboutPage from "./pages/about.jsx";
import TeamPartnersPage from "./pages/team_partners";
import ContactPage from "./pages/contact";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import NewsPage from "./pages/news";
import AccountPage from "./pages/account.jsx"
import HomePage from "./pages/home"
const {  Content} = Layout;

function App() {
    return (
        <LangProvider>
            <BrowserRouter>
                <Layout>
                    <Navbar />
                    <Content style={{ padding: "24px" }}>
                        <Routes>
                            <Route path="/home" element={<HomePage  slug={"main_page"}/>} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/team-partners" element={<TeamPartnersPage />} />
                            <Route path="/news" element={<NewsPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/account" element={<AccountPage />} />
                        </Routes>
                    </Content>
                </Layout>
            </BrowserRouter>
        </LangProvider>
    );
}

export default App;