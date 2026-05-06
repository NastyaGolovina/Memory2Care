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

export default function TaskDashboard({ user }) {
    const { t } = useLang();

}