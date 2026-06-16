
import React, { useState, useEffect } from "react";
import { useLang } from "../language/useLang.js";
import {
    Alert,
    Card,
    Col,
    Row,
    Typography,
    Spin,
} from "antd";
import { Column } from "@ant-design/plots";
import { fetchWithAuth } from "../utils/fetchWithAuth.js";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

const { Title, Text } = Typography;


export default function AdminWebDesign({ user, setUser, handleAutoLogout }) {
    const { t } = useLang();



    return (
        <div style={{ padding: "24px 50px" }}>


            <Title level={1} style={{ margin: 0, lineHeight: "32px", marginBottom: 24 }}>
                {t("admin.web_design")}
            </Title>


        </div>
    );
}