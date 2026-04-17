import React from 'react';
import { Layout, theme,Divider ,Typography , Alert, Flex, Spin} from 'antd';

import { useEffect, useState } from "react";
import { useLang } from "../language/useLang.js";
import logo from "../assets/logo-v2.png";
const {  Content, Footer } = Layout;
const { Title } = Typography;


export default function HomePage({ slug }) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { lang, setLang } = useLang();
    // const { lang } = useLang();
    const [article,setArticle] = useState(null);

    //
    // useEffect(() => {
    //     const elementIds = [
    //         "homepage_title",
    //         "homepage_overview",
    //         "homepage_goal_1",
    //         "homepage_goal_2",
    //         "homepage_goal_3",
    //         "homepage_story"
    //     ];
    //
    //     Promise.all(
    //         elementIds.map(id =>
    //             fetch("http://localhost:3000/api/page/get", {
    //                 method: "POST",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify({
    //                     element_id: id,
    //                     language: lang.toUpperCase()
    //                 })
    //             }).then(r => r.json())
    //         )
    //     ).then(results => {
    //         const data = {};
    //         elementIds.forEach((id, i) => {
    //             data[id] = results[i].text;
    //         });
    //         setArticle(data);
    //     });
    // }, [lang]);

    useEffect(() => {
        const elementIds = [
            "homepage_title",
            "homepage_overview",
            "homepage_goal_1",
            "homepage_goal_2",
            "homepage_goal_3",
            "homepage_story"
        ];

        Promise.all(
            elementIds.map(id =>
                fetch(`http://localhost:3000/api/page/get?element_id=${encodeURIComponent(id)}&language=${encodeURIComponent(lang.toUpperCase())}`)
                    .then(r => r.json())
                    .catch(err => ({ success: false, data: null, error: err }))
            )
        ).then(results => {
            console.log(results)
            const data = {};
            results.forEach((res, i) => {
                data[elementIds[i]] = res.data.text;
            });
            setArticle(data);
        }).catch(err => {
            console.error(err);
        });
        //
        // Promise.all(
        //     elementIds.map(id =>
        //         fetch(`http://localhost:3000/api/page/get?element_id=${encodeURIComponent(id)}&language=${encodeURIComponent(lang.toUpperCase())}`)
        //             .then(r => r.json())
        //     )).then(results => {
        //             const data = {};
        //             results.forEach((res, i) => {
        //                 if(res.success && res.data) {
        //                     data[elementIds[i]] = res.data.text.replaceAll("\n", "<br>");
        //                 } else {
        //                     data[elementIds[i]] = ""; // fallback пустая строка
        //                 }
        //             });
        //             setArticle(data);
        //         }).catch(err => {
        //         console.error("Ошибка загрузки данных:", err);
        //     });
        //     }, [lang]);
        // ).then(results => {
        //     if(results.success) {
        //         const data = {};
        //         elementIds.forEach((id, i) => {
        //             data[id] = results[i].data.text;
        //         });
        //         setArticle(data);
        //     }
        //
        // });
    }, [lang]);

    // useEffect(() => {
    //     const elementIds = [
    //         "homepage_title",
    //         "homepage_overview",
    //         "homepage_goal_1",
    //         "homepage_goal_2",
    //         "homepage_goal_3",
    //         "homepage_story"
    //     ];
    //
    //     async function fetchContent() {
    //         try {
    //             const results = await Promise.all(
    //                 elementIds.map(id =>
    //                     fetch(`http://localhost:3000/api/page/get?element_id=${encodeURIComponent(id)}&language=${encodeURIComponent(lang.toUpperCase())}`)
    //                         .then(r => r.json())
    //                         .catch(err => ({ success: false, data: null }))
    //                 )
    //             );
    //
    //             const data = {};
    //             results.forEach((res, i) => {
    //                 data[elementIds[i]] = res.success && res.data ? res.data.text : "";
    //             });
    //
    //             setArticle(data); // ✅ Обновляем состояние
    //         } catch (err) {
    //             console.error("Ошибка загрузки данных:", err);
    //         }
    //     }
    //
    //     fetchContent();
    // }, [lang]); // <== обязательно зависимость lang

    if (!article) return   <Layout>
        <Content style={{ padding: '0 48px', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                    <Spin size="large" />

                                </Content>
                            </Layout>;

    return (
        <Layout>
            <Content style={{ padding: '0 48px' }}>

                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '200px'
                    }}>
                        <img
                            src={logo}
                            alt="Logo"
                            style={{ height: 200, cursor: "pointer" }}
                            onClick={() => navigate("/home")}
                        />
                    </div>
                    <Divider titlePlacement="start" plain>
                        <Title>{article.homepage_title}</Title>
                    </Divider>

                    <p style={{ fontSize: '18px' }}>{article.homepage_overview.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}</p>
                    {/*<p>{article.homepage_overview}</p>*/}
                    <div style={{marginLeft : "50px", fontSize: '18px'}}>
                        <ul>
                            <li>{article.homepage_goal_1}</li>
                            <li>{article.homepage_goal_2}</li>
                            <li>{article.homepage_goal_3}</li>
                        </ul>
                    </div>

                    <p style={{ fontSize: '18px' }}>{article.homepage_story.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}</p>
                    {/*<p>{article.homepage_story}</p>*/}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
}




