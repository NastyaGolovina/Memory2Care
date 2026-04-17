
import React, { useState } from "react";
import { useLang } from "../language/useLang.js";
import { Alert, Button, Form, Input, Typography ,Space} from 'antd';
import { AudioOutlined } from '@ant-design/icons';
const { Search } = Input;


const { Paragraph } = Typography;

export default function PatientCaregiver({ user, setUser,handleAutoLogout  }) {
    const { t } = useLang();

    return (
        <div>
            <Typography.Title level={1} style={{ marginLeft: 50, lineHeight: "32px" }}>
                {t("caregiver.menu.patient")}
            </Typography.Title>

        </div>
    );
}
