
// Header.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu ,Dropdown, Space, Typography } from "antd";
import { useLang } from "./language/langContext.jsx";
import { DownOutlined } from '@ant-design/icons';

const { Header } = Layout;

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { lang, setLang, t } = useLang();

    const navItems = [
        { key: "/",             label: t("nav.home")          },
        { key: "/about",        label: t("nav.about")         },
        { key: "/team-partners",label: t("nav.team_partners") },
        { key: "/news",         label: t("nav.news")          },
        { key: "/contact",      label: t("nav.contact")       },
    ];

    const dropdownItems = [
        { key: "en", label: "English" },
        { key: "ru", label: "Русский" },
        { key: "pt", label: "Português" },
    ];


    return (
        <Header style={{ display: "flex", alignItems: "center" }}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname]}
                items={navItems}
                onClick={({ key }) => navigate(key)}
                style={{ flex: 1, minWidth: 0 }}
            />
            <Dropdown
                menu={{
                    items: dropdownItems,
                    selectable: true,
                    selectedKeys: [lang],
                    onClick: ({ key }) => setLang(key),
                }}
            >
                <Typography.Link>
                    <Space  style={{ color: "#adadad" }}>
                        {t("nav.language")}
                        <DownOutlined />
                    </Space>
                </Typography.Link>
            </Dropdown>




        </Header>
    );
}