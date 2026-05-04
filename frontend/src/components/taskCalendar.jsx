import React, { useState, useEffect } from "react";
import { useLang } from "../language/useLang.js";
import {
    Form, Input, Select, DatePicker, TimePicker, Radio,
    Button, Alert, Switch, Typography
} from "antd";
import { fetchWithAuth } from "../utils/fetchWithAuth.js";

const { Title } = Typography;
const { RangePicker: TimeRangePicker } = TimePicker;

export default function TaskCalendar({ user }) {

}