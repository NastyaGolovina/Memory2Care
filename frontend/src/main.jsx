// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import 'antd/dist/reset.css';
// import './index.css'
//
// import App from './App.jsx'
//
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
//
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary:  "#7c5cbf",   // purple — кнопки, ссылки, активные элементы
                    colorSuccess:  "#40c4b0",   // turquoise
                    colorWarning:  "#d4a84b",   // gold/beige
                    colorError:    "#eb6f92",   // pink
                    colorBgBase:   "#fdfaf6",   // тёплый фон
                    borderRadius:  8,

                    // ── Ссылки ──
                    colorLink:      "#7c5cbf",   // обычная ссылка
                    colorLinkHover: "#9b7dd4",   // при hover
                    colorLinkActive:"#5a3fa0",   // при клике
                },
                components: {
                    Layout: {
                        headerBg: "#1a0533",
                    },
                    Menu: {
                        darkItemBg:            "#1a0533",
                        darkItemColor:         "#e0d6f0",
                        darkItemHoverColor:    "#40c4b0",
                        darkItemSelectedColor: "#ffffff",
                        darkItemSelectedBg:    "#7c5cbf",
                    },
                    Tabs: {
                        inkBarColor:       "#40c4b0",
                        itemSelectedColor: "#7c5cbf",
                        itemHoverColor:    "#40c4b0",
                    },
                },
            }}
        >
            <App />
        </ConfigProvider>
    </StrictMode>,
)