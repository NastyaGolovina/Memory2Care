import React, { useState, useEffect } from "react";
import { useLang } from "../language/useLang.js";
import {
    Alert,
    List,
    Typography,
    Skeleton,
    Button,
    Tag,
} from "antd";
import { fetchWithAuth } from "../utils/fetchWithAuth.js";

const { Title, Text } = Typography;

const PAGE_SIZE = 5;
export default function AdminAnalytics({ user, setUser, handleAutoLogout }) {
    const { t } = useLang();


    const [data, setData]               = useState([]);
    const [page, setPage]               = useState(1);
    const [hasMore, setHasMore]         = useState(true);


    const [initLoading, setInitLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);


    const [error, setError]             = useState(null);


    const fetchLogs = async (currentPage) => {
        try {
            const res  = await fetchWithAuth(
                "http://localhost:3000/api/admin/get/logs",
                {
                    method:  "POST",
                    headers: { "Content-Type": "application/json" },
                    body:    JSON.stringify({ page: currentPage, limit: PAGE_SIZE }),
                }
            );
            const json = await res.json();
            if (!json.success) {
                setError(json.error?.message || t("admin.analytics_page.error_load"));
                return null;
            }
            return json.data;
        } catch {
            setError(t("admin.analytics_page.error_server"));
            return null;
        }
    };


    useEffect(() => {
        const load = async () => {
            const result = await fetchLogs(1);
            if (result) {
                setData(result.data);
                setHasMore(result.hasMore);
            }
            setInitLoading(false);
        };
        load();
    }, []);


    const onLoadMore = async () => {
        setLoadingMore(true);


        setData((prev) => [
            ...prev,
            ...Array.from({ length: PAGE_SIZE }).map(() => ({ loading: true })),
        ]);

        const nextPage = page + 1;
        const result   = await fetchLogs(nextPage);

        if (result) {

            setData((prev) => [
                ...prev.filter((item) => !item.loading),
                ...result.data,
            ]);
            setPage(nextPage);
            setHasMore(result.hasMore);
        } else {

            setData((prev) => prev.filter((item) => !item.loading));
        }

        setLoadingMore(false);
        window.dispatchEvent(new Event("resize"));
    };


    const loadMore =
        !initLoading && !loadingMore && hasMore ? (
            <div style={{ textAlign: "center", marginTop: 16, marginBottom: 8 }}>
                <Button onClick={onLoadMore}>
                    {t("admin.analytics_page.load_more")}
                </Button>
            </div>
        ) : null;


    return (
        <div style={{ padding: "24px 50px" }}>


            <Title level={1} style={{ margin: 0, lineHeight: "32px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
                {t("admin.analytics")}
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


            <List
                loading={initLoading}
                loadMore={loadMore}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <Skeleton title={false} loading={item.loading} active paragraph={{ rows: 1 }}>

                            <Text type="secondary" style={{ minWidth: 52, display: "inline-block" }}>
                                #{item.log_id}
                            </Text>


                            <Text style={{ minWidth: 190, display: "inline-block", marginLeft: 12 }}>
                                {item.log_datetime
                                    ? new Date(item.log_datetime).toLocaleString()
                                    : ""}
                            </Text>


                            <Tag color="blue" style={{ marginLeft: 12 }}>
                                {item.log_description}
                            </Tag>


                            <Text style={{ marginLeft: 12 }}>
                                {item.login}
                            </Text>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    );
}