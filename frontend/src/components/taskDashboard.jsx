
import React, { useState, useEffect, useCallback } from "react";
import { useLang } from "../language/useLang.js";
import {
    Alert, Button, DatePicker, Form, List, Progress,
    Select, Typography
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { fetchWithAuth } from "../utils/fetchWithAuth.js";

const { Title } = Typography;
const { RangePicker } = DatePicker;


const twoColors = {
    "0%": "#ff4d4f",
    "100%": "#52c41a",
};

export default function TaskDashboard({ user }) {
    const { t } = useLang();


    const [patients, setPatients] = useState([]);
    const [selectedPc, setSelectedPc] = useState(null);
    const [dateRange, setDateRange] = useState([
        dayjs().startOf("month"),
        dayjs().endOf("month"),
    ]);
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    const caregiverId = user?.profile?.caregiver_id;


    useEffect(() => {
        if (!caregiverId) return;
        fetchWithAuth(`http://localhost:3000/api/caregiver/get/patients?caregiver_id=${caregiverId}`)
            .then(r => r.json())
            .then(data => {
                if (data.success)
                    setPatients(data.data.map(p => ({ value: p.pc_id, label: p.anon_name })));
            })
            .catch(() => setError(t("dashboard.error_patients")));
    }, [caregiverId]);


    useEffect(() => {
        if (!caregiverId) return;
        fetchDashboard(null, dateRange);
    }, [caregiverId]);


    const fetchDashboard = useCallback(async (pc, range) => {
        if (!range || !range[0] || !range[1]) {
            setError(t("dashboard.date_required"));
            return;
        }
        setLoading(true);
        setError(null);
        setSuccess(null);

        const body = pc
            ? {
                pc_id: Number(pc),
                start_date: range[0].format("YYYY-MM-DD"),
                end_date: range[1].format("YYYY-MM-DD"),
            }
            : {
                caregiver_id: caregiverId,
                start_date: range[0].format("YYYY-MM-DD"),
                end_date: range[1].format("YYYY-MM-DD"),
            };

        const url = pc
            ? "http://localhost:3000/api/task/get/pc-date/count"
            : "http://localhost:3000/api/task/get/caregiver-date/count";

        try {
            const res = await fetchWithAuth(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();

            if (!data.success) {
                const errMsg = data.error
                    ? (typeof data.error === "object" ? data.error.message : data.error)
                    : t("dashboard.error_load");
                setError(errMsg);
                setListData([]);
                return;
            }


            if (pc) {
                setListData([data.data]);
            } else {
                setListData(Object.values(data.data));
            }
            setSuccess(t("dashboard.loaded"));
        } catch (e) {
            setError(typeof e?.message === "string" ? e.message : t("dashboard.error_load"));
        } finally {
            setLoading(false);
        }
    }, [caregiverId, t]);


    const handleFilter = () => {
        fetchDashboard(selectedPc, dateRange);
    };


    return (
        <div style={{ padding: 24 }}>


            <Title level={1} style={{ marginBottom: 24 }}>
                {t("caregiver.menu.dashboard")}
            </Title>


            {error && (
                <Alert
                    message={error}
                    type="error"
                    showIcon
                    closable
                    onClose={() => setError(null)}
                    style={{ marginBottom: 16 }}
                />
            )}
            {success && (
                <Alert
                    message={success}
                    type="success"
                    showIcon
                    closable
                    onClose={() => setSuccess(null)}
                    style={{ marginBottom: 16 }}
                />
            )}


            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 24 }}>


                <Select
                    style={{ width: 180 }}
                    allowClear
                    placeholder={t("task.select_patient")}
                    options={patients}
                    value={selectedPc}
                    onChange={val => setSelectedPc(val ?? null)}
                />


                <RangePicker
                    value={dateRange}
                    onChange={range => setDateRange(range)}
                    format="YYYY-MM-DD"
                />


                <Button type="primary" onClick={handleFilter} loading={loading}>
                    {t("dashboard.filter")}
                </Button>
            </div>


            <List
                loading={loading}
                itemLayout="horizontal"
                dataSource={listData}
                locale={{ emptyText: t("dashboard.no_data") }}
                renderItem={(item) => {

                    const percent = item.total > 0
                        ? Math.round((item.is_completed / item.total) * 100)
                        : 0;

                    return (
                        <List.Item>
                            <List.Item.Meta

                                avatar={
                                    <div style={{
                                        width: 40, height: 40, borderRadius: "50%",
                                        background: "#f0f0f0", display: "flex",
                                        alignItems: "center", justifyContent: "center",
                                        fontSize: 20, color: "#8c8c8c"
                                    }}>
                                        <UserOutlined />
                                    </div>
                                }

                                title={<strong>{item.anon_name}</strong>}

                                description={
                                    <span>
                                        {t("dashboard.completed")}: {item.is_completed} / {item.total}
                                    </span>
                                }
                            />
                            <div style={{ width: 220 }}>
                                <Progress
                                    percent={percent}
                                    strokeColor={twoColors}
                                    format={p => `${p}%`}
                                />
                            </div>
                        </List.Item>
                    );
                }}
            />
        </div>
    );
}