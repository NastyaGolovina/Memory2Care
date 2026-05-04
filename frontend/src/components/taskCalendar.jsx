import React, { useState, useEffect, useCallback } from "react";
import { useLang } from "../language/useLang.js";
import {
    Alert, Badge, Button, Calendar, Form, Input,
    Modal, Popconfirm, Radio, Select, Switch,
    TimePicker, Typography, DatePicker, List, Avatar
} from "antd";
import dayjs from "dayjs";
import { fetchWithAuth } from "../utils/fetchWithAuth.js";

const { Title, Text } = Typography;
const { RangePicker: TimeRangePicker } = TimePicker;
import { CheckOutlined, CloseOutlined, RetweetOutlined ,ScheduleOutlined} from "@ant-design/icons";

export default function TaskCalendar({ user }) {
    const { t } = useLang();


    const [currentMonth, setCurrentMonth] = useState(dayjs());
    const [tasks, setTasks]               = useState([]);
    const [error, setError]               = useState(null);
    const [success, setSuccess]           = useState(null);

    const [modalOpen, setModalOpen]       = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEdit, setIsEdit]             = useState(false);
    const [modalError, setModalError]     = useState(null);
    const [modalSuccess, setModalSuccess] = useState(null);

    const [taskTypes, setTaskTypes]       = useState([]);


    const [form] = Form.useForm();
    const [recurrenceType, setRecurrenceType] = useState("Daily");
    const [everyWeekday, setEveryWeekday]     = useState(false);
    const [taskMode, setTaskMode]             = useState("normal");


    useEffect(() => {
        if (!user) return;

        fetchWithAuth("http://localhost:3000/api/task-type/get/all")
            .then(r => r.json())
            .then(data => {
                if (data.success)
                    setTaskTypes(data.data.map(tt => ({ value: tt.task_type_id, label: tt.task_type_name })));
            })
            .catch(() => setError("Failed to load task types"));
    }, [user]);


    const loadTasks = useCallback((month) => {
        if (!user) return;
        const caregiverId = user.profile.caregiver_id || user.id;


        const startDate = month.startOf("month").format("YYYY-MM-DD");
        const endDate   = month.endOf("month").format("YYYY-MM-DD");

        fetchWithAuth("http://localhost:3000/api/task/get/caregiver-date", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ caregiver_id: caregiverId, start_date: startDate, end_date: endDate }),
        })
            .then(r => r.json())
            .then(data => {
                console.log(data)
                if (data.success) setTasks(data.data);
                else setError(data.error?.message || "Failed to load tasks");
            })
            .catch(() => setError("Failed to load tasks"));
    }, [user]);

    useEffect(() => { loadTasks(currentMonth); }, [currentMonth, loadTasks]);


    const openTask = (taskId) => {
        setModalError(null);
        setModalSuccess(null);
        setIsEdit(false);

        fetchWithAuth(`http://localhost:3000/api/task/get/id?task_id=${taskId}`)
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    setSelectedTask(data.data);
                    setModalOpen(true);
                    populateForm(data.data);
                } else {
                    setError(data.error?.message || "Failed to load task");
                }
            })
            .catch(() => setError("Failed to load task"));
    };


    const populateForm = (task) => {
        const isRecurrent = task.is_recurring;
        setTaskMode(isRecurrent ? "recurrent" : "normal");

        const baseFields = {
            task_mode:        isRecurrent ? "recurrent" : "normal",
            task_type_id:     task.task_type_id,
            task_description: task.task_description,
            time_range: [
                dayjs(task.start_time),
                dayjs(task.end_time),
            ],
        };

        if (!isRecurrent) {
            form.setFieldsValue({
                ...baseFields,
                execution_date: dayjs(task.execution_date),
            });
        } else {
            const rule = task.recurrence_rule;
            const rp   = rule ? JSON.parse(rule.recurrence_pattern).RecurrencePattern : null;
            const type = rp?.Type || "Daily";
            setRecurrenceType(type);

            const recFields = {
                ...baseFields,
                recurrence_type: type,
                start_date: rule ? dayjs(rule.start_date) : null,
                end_date:   rule ? dayjs(rule.end_date)   : null,
            };

            if (type === "Daily") {
                const isWeekday = rp?.Daily?.EveryWeekday ?? false;
                setEveryWeekday(isWeekday);
                recFields.every_weekday = isWeekday;
                recFields.daily_every   = rp?.Daily?.Every ?? "";
            } else if (type === "Weekly") {
                recFields.weekly_every = rp?.Weekly?.RecurEveryWeek ?? "";
                recFields.weekly_days  = rp?.Weekly?.DayOfWeek ?? [];
            } else if (type === "Monthly") {
                recFields.monthly_day   = rp?.Monthly?.Day ?? "";
                recFields.monthly_every = rp?.Monthly?.EveryMonths ?? "";
            }

            form.setFieldsValue(recFields);
        }
    };


    const toggleEdit = () => {
        if (isEdit) {

            populateForm(selectedTask);
            setModalError(null);
            setModalSuccess(null);
        }
        setIsEdit(prev => !prev);
    };

    const handleUpdate = () => {
        if (!selectedTask) return;
        form.validateFields()
            .then(values => {
                const [startTime, endTime] = values.time_range;
                const isRecurrent = values.task_mode === "recurrent";

                const body = {
                    task_id:          selectedTask.task_id,
                    task_type_id:     values.task_type_id,
                    task_description: values.task_description,
                    start_time:       startTime.format("HH:mm:ss"),
                    end_time:         endTime.format("HH:mm:ss"),
                };

                if (!isRecurrent) {

                    body.execution_date = values.execution_date.format("YYYY-MM-DD");
                } else {

                    body.start_date = values.start_date.format("YYYY-MM-DD");
                    body.end_date   = values.end_date.format("YYYY-MM-DD");

                    let pattern = {};
                    if (recurrenceType === "Daily") {
                        pattern = { Type: "Daily", Daily: { Every: parseInt(values.daily_every) || 1, EveryWeekday: everyWeekday } };
                    } else if (recurrenceType === "Weekly") {
                        pattern = { Type: "Weekly", Weekly: { RecurEveryWeek: parseInt(values.weekly_every), DayOfWeek: values.weekly_days } };
                    } else if (recurrenceType === "Monthly") {
                        pattern = { Type: "Monthly", Monthly: { Day: parseInt(values.monthly_day), EveryMonths: parseInt(values.monthly_every) } };
                    }
                    body.recurrence_pattern = { RecurrencePattern: pattern };
                }

                fetchWithAuth("http://localhost:3000/api/task/update", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                })
                    .then(r => r.json())
                    .then(data => {
                        if (data.success) {
                            setModalSuccess(t("task.created"));
                            setIsEdit(false);
                            loadTasks(currentMonth); // обновляем календарь
                        } else {
                            setModalError(data.error?.message || "Update failed");
                        }
                    })
                    .catch(() => setModalError("Update failed"));
            })
            .catch(() => {});
    };


    const handleDelete = () => {
        if (!selectedTask) return;
        fetchWithAuth("http://localhost:3000/api/task/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task_id: selectedTask.task_id }),
        })
            .then(r => r.json())
            .then(data => {
                if (data.success && data.data) {
                    setModalOpen(false);
                    loadTasks(currentMonth); // обновляем календарь после удаления
                } else {
                    setModalError(data.error?.message || "Delete failed");
                }
            })
            .catch(() => setModalError("Delete failed"));
    };


    const handleComplete = (complete) => {
        if (!selectedTask?.task_id) return;

        fetchWithAuth("http://localhost:3000/api/task/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task_id: selectedTask.task_id, complete }),
        })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    setSelectedTask(prev => prev ? { ...prev, is_completed: complete } : prev);
                    loadTasks(currentMonth);
                } else {
                    setModalError(data.error?.message || "Failed");
                }
            })
            .catch(() => setModalError("Failed"));
    };


    const cellRender = (current, info) => {
        if (info.type !== "date") return info.originNode;


        const dayTasks = tasks.filter(task => {
            const execDate = dayjs(task.execution_date).format("YYYY-MM-DD");
            return execDate === current.format("YYYY-MM-DD");
        });

        if (!dayTasks.length) return null;

        return (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {dayTasks.map(task => {

                    const isCompleted = task.is_completed;
                    const isOverdue   = !isCompleted && dayjs(task.execution_date).isBefore(dayjs(), "day");
                    const status      = isCompleted ? "success" : isOverdue ? "error" : "warning";

                    return (
                        <li key={task.task_id}>
                            <Badge
                                status={status}
                                text={
                                    <span
                                        style={{ cursor: "pointer", fontSize: 12 }}
                                        onClick={() => openTask(task.task_id)}
                                    >

                                        {task.is_recurring && <RetweetOutlined style={{ fontSize: 12 }} />}
                                        {task.task_type?.task_type_name || task.task_description?.slice(0, 10)}
                                        ...

                                    </span>
                                }
                            />
                        </li>
                    );
                })}
            </ul>
        );
    };


    const disabled = !isEdit;

    return (
        <div style={{ padding: "24px 50px" }}>

            <Title level={1} style={{ marginBottom: 24 }}>
                {t("caregiver.menu.calendar")}
            </Title>


            {error && (
                <Alert message={error} type="error" showIcon closable
                       onClose={() => setError(null)} style={{ marginBottom: 16 }} />
            )}
            {success && (
                <Alert message={success} type="success" showIcon closable
                       onClose={() => setSuccess(null)} style={{ marginBottom: 16 }} />
            )}

            <Calendar
                cellRender={cellRender}
                onPanelChange={(value) => setCurrentMonth(value)}
            />
            <List
                style={{
                    marginTop: 24,
                    height: 500,
                    overflowY: "auto"
                }}
                itemLayout="horizontal"
                dataSource={[...tasks].sort((a, b) => dayjs(a.execution_date).unix() - dayjs(b.execution_date).unix())}
                renderItem={(task) => {
                    const isCompleted = task.is_completed;
                    const isOverdue   = !isCompleted && dayjs(task.execution_date).isBefore(dayjs(), "day");
                    const iconColor   = isCompleted ? "#52c41a" : isOverdue ? "#ff4d4f" : "#faad14";

                    return (
                        <List.Item
                            style={{ cursor: "pointer" }}
                            onClick={() => openTask(task.task_id)}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        icon={<ScheduleOutlined />}
                                        style={{ backgroundColor: iconColor }}
                                    />
                                }
                                title={
                                    <span>
                                        {task.is_recurring && (
                                            <RetweetOutlined style={{ fontSize: 12, marginRight: 6, color: "#888" }} />
                                        )}
                                        {/* полное имя типа задачи или описание */}
                                        {task.task_type?.task_type_name || task.task_description}
                        </span>
                                }
                                description={dayjs(task.execution_date).format("DD.MM.YYYY")}
                            />
                        </List.Item>
                    );
                }}
            />


            <Modal
                title={t("task.task_info")}
                open={modalOpen}
                onCancel={() => {
                    setModalOpen(false);
                    setIsEdit(false);

                    // ⏳ даём завершиться обработчикам
                    setTimeout(() => setSelectedTask(null), 0);
                }}
                footer={null}
                maskClosable={true}
                width={600}
            >

                {selectedTask && (
                    <Form
                        form={form}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                    >

                        {modalError && (
                            <Form.Item wrapperCol={{ offset: 0, span: 22 }}>
                                <Alert message={modalError} type="error" showIcon />
                            </Form.Item>
                        )}
                        {modalSuccess && (
                            <Form.Item wrapperCol={{ offset: 0, span: 22 }}>
                                <Alert message={modalSuccess} type="success" showIcon />
                            </Form.Item>
                        )}


                        <Form.Item label={t("task.type")} name="task_mode">
                            <Radio.Group disabled>
                                <Radio value="normal">{t("task.normal")}</Radio>
                                <Radio value="recurrent">{t("task.recurrent")}</Radio>
                            </Radio.Group>
                        </Form.Item>


                        <Form.Item label={t("caregiver.form.patient_id")}>
                            <Text>{selectedTask.pc?.anon_name}</Text>
                        </Form.Item>


                        <Form.Item
                            label={t("task.task_type")}
                            name="task_type_id"
                            rules={isEdit ? [{ required: true, message: t("task.task_type_required") }] : []}
                        >
                            <Select options={taskTypes} disabled={disabled} />
                        </Form.Item>


                        <Form.Item
                            label={t("task.description")}
                            name="task_description"
                            rules={isEdit ? [{ required: true, message: t("task.description_required") }] : []}
                        >
                            <Input.TextArea rows={3} disabled={disabled} />
                        </Form.Item>


                        {taskMode === "normal" && (
                            <Form.Item
                                label={t("task.execution_date")}
                                name="execution_date"
                                rules={isEdit ? [{ required: true, message: t("task.execution_date_required") }] : []}
                            >
                                <DatePicker style={{ width: "100%" }} disabled={disabled} />
                            </Form.Item>
                        )}


                        <Form.Item
                            label={t("task.time_range")}
                            name="time_range"
                            rules={isEdit ? [{ required: true, message: t("task.time_range_required") }] : []}
                        >
                            <TimeRangePicker format="HH:mm" style={{ width: "100%" }} disabled={disabled} />
                        </Form.Item>


                        {taskMode === "recurrent" && (
                            <>
                                <Form.Item
                                    label={t("task.start_date")}
                                    name="start_date"
                                    rules={isEdit ? [{ required: true, message: t("task.start_date_required") }] : []}
                                >
                                    <DatePicker style={{ width: "100%" }} disabled={disabled} />
                                </Form.Item>

                                <Form.Item
                                    label={t("task.end_date")}
                                    name="end_date"
                                    rules={isEdit ? [{ required: true, message: t("task.end_date_required") }] : []}
                                >
                                    <DatePicker style={{ width: "100%" }} disabled={disabled} />
                                </Form.Item>


                                <Form.Item label={t("task.recurrence_type")} name="recurrence_type">
                                    <Radio.Group
                                        disabled={disabled}
                                        onChange={e => {
                                            setRecurrenceType(e.target.value);
                                            form.resetFields(["daily_every", "weekly_every", "weekly_days", "monthly_day", "monthly_every"]);
                                            setEveryWeekday(false);
                                        }}
                                    >
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
                                            rules={isEdit && !everyWeekday ? [{ required: true, message: t("task.every_days_required") }] : []}
                                        >
                                            <Input type="number" min={1} disabled={disabled || everyWeekday} />
                                        </Form.Item>
                                        <Form.Item label={t("task.every_weekday")} name="every_weekday" valuePropName="checked">
                                            <Switch
                                                disabled={disabled}
                                                onChange={checked => {
                                                    setEveryWeekday(checked);
                                                    if (checked) form.setFieldValue("daily_every", null);
                                                }}
                                            />
                                        </Form.Item>
                                    </>
                                )}

                                {recurrenceType === "Weekly" && (
                                    <>
                                        <Form.Item
                                            label={t("task.recur_every_week")}
                                            name="weekly_every"
                                            rules={isEdit ? [{ required: true, message: t("task.recur_every_week_required") }] : []}
                                        >
                                            <Input type="number" min={1} disabled={disabled} />
                                        </Form.Item>
                                        <Form.Item
                                            label={t("task.day_of_week")}
                                            name="weekly_days"
                                            rules={isEdit ? [{ required: true, message: t("task.day_of_week_required") }] : []}
                                        >
                                            <Select
                                                mode="multiple"
                                                disabled={disabled}
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
                                            rules={isEdit ? [{ required: true, message: t("task.day_of_month_required") }] : []}
                                        >
                                            <Input type="number" min={1} max={31} disabled={disabled} />
                                        </Form.Item>
                                        <Form.Item
                                            label={t("task.every_months")}
                                            name="monthly_every"
                                            rules={isEdit ? [{ required: true, message: t("task.every_months_required") }] : []}
                                        >
                                            <Input type="number" min={1} disabled={disabled} />
                                        </Form.Item>
                                    </>
                                )}
                            </>
                        )}


                        <Form.Item label={t("task.completed")}>
                            <Text>
                                {selectedTask.is_completed
                                    ? <CheckOutlined style={{ color: "green" }} />
                                    : <CloseOutlined style={{ color: "red" }} />
                                }
                            </Text>
                        </Form.Item>


                        <Form.Item wrapperCol={{ offset: 0, span: 22 }}>
                            <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>

                                <div style={{ display: "flex", gap: 8 }}>

                                    <Button type="dashed" onClick={toggleEdit}>
                                        {isEdit ? t("common.cancel") : t("common.edit")}
                                    </Button>


                                    {isEdit && (
                                        <Button type="primary" onClick={handleUpdate}>
                                            {t("task.update")}
                                        </Button>
                                    )}


                                    {isEdit && (
                                        <Popconfirm
                                            title={t("task.delete_title")}
                                            description={t("task.delete_desc")}
                                            onConfirm={handleDelete}
                                            okText={t("task.delete_ok")}
                                            cancelText={t("task.delete_cancel")}
                                        >
                                            <Button danger>
                                                {t("task.delete")}
                                            </Button>
                                        </Popconfirm>
                                    )}
                                </div>

                                {!isEdit && (
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <Button
                                            type="primary"
                                            disabled={selectedTask.is_completed}
                                            onClick={() => handleComplete(true)}
                                        >
                                            {t("task.complete_btn")}
                                        </Button>
                                        <Button
                                            disabled={!selectedTask.is_completed}
                                            onClick={() => handleComplete(false)}
                                        >
                                            {t("task.uncomplete_btn")}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    );
}