
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


function getWeekDates() {
    const today = new Date();


    const dayOfWeek = today.getDay();


    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const monday = new Date(today);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(today.getDate() - daysFromMonday);

    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d;
    });
}

function toApiDate(d) {

    const year  = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day   = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}


function toDayLabel(d) {
    return d.toLocaleDateString("en-US", { weekday: "short" });
}

export default function AdminDashboard({ user, setUser, handleAutoLogout }) {
    const { t } = useLang();


    const [stats, setStats]           = useState(null);
    const [statsLoading, setStatsLoading] = useState(false);


    const [chartData, setChartData]   = useState([]);
    const [chartLoading, setChartLoading] = useState(false);


    const [error, setError]           = useState(null);


    useEffect(() => {
        const load = async () => {
            setStatsLoading(true);
            try {
                const res  = await fetchWithAuth("http://localhost:3000/api/admin/get/stats");
                const data = await res.json();
                if (data.success) {
                    setStats(data.data);
                } else {
                    setError(data.error?.message || t("admin.dashboard_page.error_stats"));
                }
            } catch {
                setError(t("admin.dashboard_page.error_server"));
            } finally {
                setStatsLoading(false);
            }
        };
        load();
    }, []);


    useEffect(() => {
        const loadWeek = async () => {
            setChartLoading(true);
            try {
                const weekDates = getWeekDates();


                const results = await Promise.all(
                    weekDates.map(async (date) => {

                        const dateStr = toApiDate(date);
                        const res = await fetchWithAuth(
                            "http://localhost:3000/api/admin/get/log/in-period",
                            {
                                method:  "POST",
                                headers: { "Content-Type": "application/json" },
                                body:    JSON.stringify({
                                    start_date: dateStr,
                                    end_date:   dateStr,
                                }),
                            }
                        );

                        const data = await res.json();
                        return {
                            day:   toDayLabel(date),
                            logins: data.success ? (data.data ?? 0) : 0,
                        };
                    })
                );

                setChartData(results);
            } catch {
                setError(t("admin.dashboard_page.error_chart"));
            } finally {
                setChartLoading(false);
            }
        };
        loadWeek();
    }, []);


    const columnConfig = {
        data:    chartData,
        xField:  "day",
        yField:  "logins",

        color:   "#4096ff",

        label: {
            position: "top",
            style: { fill: "#8c8c8c", fontSize: 12 },
        },
        xAxis: {
            label: { style: { fontSize: 13 } },
        },
    };


    return (
        <div style={{ padding: "24px 50px" }}>


            <Title level={1} style={{ margin: 0, lineHeight: "32px", marginBottom: 24 }}>
                {t("admin.dashboard")}
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


            <Spin spinning={statsLoading}>
                <Row gutter={16} style={{ marginBottom: 32 }}>


                    <Col span={6}>
                        <Card variant="borderless" style={{ background: "#f6ffed", border: "1px solid #b7eb8f" }}>
                            <Text type="secondary">{t("admin.dashboard_page.active_patients")}</Text>
                            <div style={{ fontSize: 32, fontWeight: 600, color: "#52c41a", marginTop: 4 }}>
                                {stats?.activePatients ?? "—"}
                            </div>
                        </Card>
                    </Col>


                    <Col span={6}>
                        <Card variant="borderless" style={{ background: "#e6f4ff", border: "1px solid #91caff" }}>
                            <Text type="secondary">{t("admin.dashboard_page.approved_caregivers")}</Text>
                            <div style={{ fontSize: 32, fontWeight: 600, color: "#1677ff", marginTop: 4 }}>
                                {stats?.approvedCaregivers ?? "—"}
                            </div>
                        </Card>
                    </Col>


                    <Col span={6}>
                        <Card variant="borderless" style={{ background: "#fff7e6", border: "1px solid #ffd591" }}>
                            <Text type="secondary">{t("admin.dashboard_page.total_tasks")}</Text>
                            <div style={{ fontSize: 32, fontWeight: 600, color: "#fa8c16", marginTop: 4 }}>
                                {stats?.task?.totalTasks ?? "—"}
                            </div>

                            {stats && (
                                <div style={{ marginTop: 6, fontSize: 12, color: "#8c8c8c" }}>
                                    <CheckOutlined /> {stats.task.completedTasks} &nbsp;/&nbsp; <CloseOutlined /> {stats.task.uncompletedTasks}
                                </div>
                            )}
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card variant="borderless" style={{ background: "#fff0f6", border: "1px solid #ffadd2" }}>
                            <Text type="secondary">{t("admin.dashboard_page.completed_tasks")}</Text>
                            <div style={{ fontSize: 32, fontWeight: 600, color: "#eb2f96", marginTop: 4 }}>
                                {stats
                                    ? `${Math.round((stats.task.completedTasks / stats.task.totalTasks) * 100)}%`
                                    : "—"}
                            </div>
                            <div style={{ fontSize: 12, color: "#8c8c8c", marginTop: 6 }}>
                                {t("admin.dashboard_page.completion_rate")}
                            </div>
                        </Card>
                    </Col>

                </Row>
            </Spin>


            <Card
                title={t("admin.dashboard_page.chart_title")}
                variant="borderless"
                style={{ border: "1px solid #f0f0f0" }}
            >
                <Spin spinning={chartLoading}>
                    {chartData.length > 0 && (
                        <Column {...columnConfig} height={260} />
                    )}
                </Spin>
            </Card>

        </div>
    );
}