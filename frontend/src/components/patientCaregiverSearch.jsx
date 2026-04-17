import React from "react";
import { useLang } from "../language/useLang.js";
import { Typography, Input } from "antd";

const { Search } = Input;

export default function SearchPatient({ user, setUser,handleAutoLogout  }) {
    const { t } = useLang();
    const onSearch = (value) => {
        console.log("Search value:", value);
    };
    return (
        <div>
            <Typography.Title level={1} style={{ marginLeft: 50, lineHeight: "32px" }}>
                {t("caregiver.menu.search")}
            </Typography.Title>
            <Search
                placeholder="input search text"
                onSearch={onSearch}
                enterButton
                style={{  marginLeft: 50,maxWidth: "80%", marginTop: 20 }}
            />
            {/*form*/}
            {/*const patientId   = data.patient_id;*/}
            {/*const caregiverId = data.caregiver_id;*/}
            {/*const relationship = data.relationship;*/}
            {/*const supportLevel = data.support_level;*/}
            {/*const approxAge   = data.approx_age;*/}
            {/*const anonName    = data.anon_name;*/}
        </div>
    );
}
