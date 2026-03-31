
import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "./language/langContext.jsx";
import Navbar from "./header.jsx";
import AboutPage from "./pages/about.jsx";
import TeamPartners from "./pages/team_partners";
import News from "./pages/news";
import Contact from "./pages/contact";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

function App() {
    return (
        <LangProvider>
            <BrowserRouter>
                <Layout>
                    <Navbar />
                    <Content style={{ padding: "24px" }}>
                        <Routes>
                            <Route path="/" element={<div>home</div>} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/team-partners" element={<TeamPartners />} />
                            <Route path="/news" element={<News />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </Content>
                </Layout>
            </BrowserRouter>
        </LangProvider>
    );
}

export default App;