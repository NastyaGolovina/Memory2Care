import React, { useState, useEffect } from "react";
import { useLang } from "../language/useLang.js";
import {
    Form, Input, Select, DatePicker, TimePicker, Radio,
    Button, Alert, Switch, Typography
} from "antd";
import { fetchWithAuth } from "../utils/fetchWithAuth.js";

const { Title } = Typography;
const { RangePicker: TimeRangePicker } = TimePicker;

export default function CreateTask({ user }) {
    const { t } = useLang();
    const [form] = Form.useForm();

    const [taskMode, setTaskMode]           = useState("normal");
    const [recurrenceType, setRecurrenceType] = useState("Daily");
    const [everyWeekday, setEveryWeekday]   = useState(false);
    const [patients, setPatients]           = useState([]);
    const [taskTypes, setTaskTypes]         = useState([]);
    const [error, setError]                 = useState(null);
    const [success, setSuccess]             = useState(null);

    useEffect(() => {
        const caregiverId = user?.profile?.caregiver_id;

        fetchWithAuth(`http://localhost:3000/api/caregiver/get/patients?caregiver_id=${caregiverId}`)
            .then(r => r.json())
            .then(data => {
                if (data.success)
                    setPatients(data.data.map(p => ({ value: p.pc_id, label: p.anon_name })));
            })
            .catch(() => setError("Failed to load patients"));

        fetchWithAuth("http://localhost:3000/api/task-type/get/all")
            .then(r => r.json())
            .then(data => {
                if (data.success)
                    setTaskTypes(data.data.map(tt => ({ value: tt.task_type_id, label: tt.task_type_name })));
            })
            .catch(() => setError("Failed to load task types"));
    }, [user]);

    const onFinish = async (values) => {
        setError(null);
        setSuccess(null);

        try {
            if (taskMode === "normal") {
                // POST /api/task/create
                const payload = {
                    pc_id:            values.pc_id,
                    task_type_id:     values.task_type_id,
                    task_description: values.task_description,
                    execution_date:   values.execution_date?.format("YYYY-MM-DD"),
                    start_time:       values.time_range?.[0]?.format("HH:mm:ss"),
                    end_time:         values.time_range?.[1]?.format("HH:mm:ss"),
                };

                const res  = await fetchWithAuth("http://localhost:3000/api/task/create", {
                    method:  "POST",
                    headers: { "Content-Type": "application/json" },
                    body:    JSON.stringify(payload),
                });
                const data = await res.json();

                if (!res.ok || !data.success) {
                    setError(data.error?.message || "Failed to create task");
                    return;
                }

            } else {
                // POST /api/task/create/recurrence
                let recurrencePattern = {};

                if (recurrenceType === "Daily") {
                    recurrencePattern = {
                        Type: "Daily",
                        Daily: {
                            Every:        everyWeekday ? null : Number(values.daily_every),
                            EveryWeekday: everyWeekday,
                        },
                    };
                } else if (recurrenceType === "Weekly") {
                    recurrencePattern = {
                        Type: "Weekly",
                        Weekly: {
                            RecurEveryWeek: Number(values.weekly_every),
                            DayOfWeek:      values.weekly_days,
                        },
                    };
                } else if (recurrenceType === "Monthly") {
                    recurrencePattern = {
                        Type: "Monthly",
                        Monthly: {
                            Day:         Number(values.monthly_day),
                            EveryMonths: Number(values.monthly_every),
                        },
                    };
                }

                const payload = {
                    pc_id:            values.pc_id,
                    task_type_id:     values.task_type_id,
                    task_description: values.task_description,
                    start_time:       values.time_range?.[0]?.format("HH:mm:ss"),
                    end_time:         values.time_range?.[1]?.format("HH:mm:ss"),
                    start_date:       values.start_date?.format("YYYY-MM-DD"),
                    end_date:         values.end_date?.format("YYYY-MM-DD"),
                    recurrence_pattern: { RecurrencePattern: recurrencePattern },
                };

                const res  = await fetchWithAuth("http://localhost:3000/api/task/create/recurrence", {
                    method:  "POST",
                    headers: { "Content-Type": "application/json" },
                    body:    JSON.stringify(payload),
                });
                const data = await res.json();

                if (!res.ok || !data.success) {
                    setError(data.error?.message || "Failed to create recurrent task");
                    return;
                }
            }

            setSuccess(t("task.created"));
            form.resetFields();
            setTaskMode("normal");
            setRecurrenceType("Daily");
            setEveryWeekday(false);

        } catch {
            setError("Server error");
        }
    };

    return (
        <div style={{ padding: "24px 50px" }}>
            <Title level={1} style={{ marginBottom: 24 }}>
                {t("caregiver.menu.create_new")}
            </Title>

            {error && (
                <Alert message={error} type="error" showIcon closable
                       onClose={() => setError(null)} style={{ marginBottom: 16 }} />
            )}
            {success && (
                <Alert message={success} type="success" showIcon closable
                       onClose={() => setSuccess(null)} style={{ marginBottom: 16 }} />
            )}

            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 680 }}
                onFinish={onFinish}
            >
                <Form.Item label={t("task.type")} name="task_mode" initialValue="normal">
                    <Radio.Group onChange={e => {
                        setTaskMode(e.target.value);
                        form.resetFields([
                            "execution_date", "start_date", "end_date",
                            "daily_every", "weekly_every", "weekly_days",
                            "monthly_day", "monthly_every"
                        ]);
                        setEveryWeekday(false);
                        setRecurrenceType("Daily");
                    }}>
                        <Radio value="normal">{t("task.normal")}</Radio>
                        <Radio value="recurrent">{t("task.recurrent")}</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label={t("caregiver.form.patient_id")}
                    name="pc_id"
                    rules={[{ required: true, message: t("task.pc_id_required") }]}
                >
                    <Select options={patients} placeholder={t("task.select_patient")} />
                </Form.Item>

                <Form.Item
                    label={t("task.task_type")}
                    name="task_type_id"
                    rules={[{ required: true, message: t("task.task_type_required") }]}
                >
                    <Select options={taskTypes} placeholder={t("task.select_task_type")} />
                </Form.Item>

                <Form.Item
                    label={t("task.description")}
                    name="task_description"
                    rules={[{ required: true, message: t("task.description_required") }]}
                >
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item
                    label={t("task.execution_date")}
                    name="execution_date"
                    rules={taskMode === "normal" ? [{ required: true, message: t("task.execution_date_required") }] : []}
                >
                    <DatePicker disabled={taskMode === "recurrent"} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    label={t("task.time_range")}
                    name="time_range"
                    rules={[{ required: true, message: t("task.time_range_required") }]}
                >
                    <TimeRangePicker format="HH:mm" style={{ width: "100%" }} />
                </Form.Item>

                {taskMode === "recurrent" && (
                    <>
                        <Form.Item
                            label={t("task.start_date")}
                            name="start_date"
                            rules={[{ required: true, message: t("task.start_date_required") }]}
                        >
                            <DatePicker style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                            label={t("task.end_date")}
                            name="end_date"
                            rules={[{ required: true, message: t("task.end_date_required") }]}
                        >
                            <DatePicker style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item label={t("task.recurrence_type")} name="recurrence_type" initialValue="Daily">
                            <Radio.Group onChange={e => {
                                setRecurrenceType(e.target.value);
                                form.resetFields(["daily_every", "weekly_every", "weekly_days", "monthly_day", "monthly_every"]);
                                setEveryWeekday(false);
                            }}>
                                <Radio value="Daily">Daily</Radio>
                                <Radio value="Weekly">Weekly</Radio>
                                <Radio value="Monthly">Monthly</Radio>
                            </Radio.Group>
                        </Form.Item>

                        {recurrenceType === "Daily" && (
                            <>
                                <Form.Item
                                    label={t("task.every_days")}
                                    name="daily_every"
                                    rules={!everyWeekday ? [{ required: true, message: t("task.every_days_required") }] : []}
                                >
                                    <Input type="number" min={1} disabled={everyWeekday} />
                                </Form.Item>

                                <Form.Item label={t("task.every_weekday")} name="every_weekday" valuePropName="checked">
                                    <Switch onChange={checked => {
                                        setEveryWeekday(checked);
                                        if (checked) form.setFieldValue("daily_every", null);
                                    }} />
                                </Form.Item>
                            </>
                        )}

                        {recurrenceType === "Weekly" && (
                            <>
                                <Form.Item
                                    label={t("task.recur_every_week")}
                                    name="weekly_every"
                                    rules={[{ required: true, message: t("task.recur_every_week_required") }]}
                                >
                                    <Input type="number" min={1} />
                                </Form.Item>

                                <Form.Item
                                    label={t("task.day_of_week")}
                                    name="weekly_days"
                                    rules={[{ required: true, message: t("task.day_of_week_required") }]}
                                >
                                    <Select
                                        mode="multiple"
                                        options={[
                                            { value: "Sunday",    label: t("task.sunday") },
                                            { value: "Monday",    label: t("task.monday") },
                                            { value: "Tuesday",   label: t("task.tuesday") },
                                            { value: "Wednesday", label: t("task.wednesday") },
                                            { value: "Thursday",  label: t("task.thursday") },
                                            { value: "Friday",    label: t("task.friday") },
                                            { value: "Saturday",  label: t("task.saturday") },
                                        ]}
                                    />
                                </Form.Item>
                            </>
                        )}

                        {recurrenceType === "Monthly" && (
                            <>
                                <Form.Item
                                    label={t("task.day_of_month")}
                                    name="monthly_day"
                                    rules={[{ required: true, message: t("task.day_of_month_required") }]}
                                >
                                    <Input type="number" min={1} max={31} />
                                </Form.Item>

                                <Form.Item
                                    label={t("task.every_months")}
                                    name="monthly_every"
                                    rules={[{ required: true, message: t("task.every_months_required") }]}
                                >
                                    <Input type="number" min={1} />
                                </Form.Item>
                            </>
                        )}
                    </>
                )}

                <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                    <Button type="primary" htmlType="submit">
                        {t("common.save")}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}