import React, { useEffect, useState } from "react";

import TextField, { TextFieldProps } from "@mui/material/TextField";
import { DatePicker as DateOnlyPicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";

interface IProps {
    date?: string;
    label: string;
    onChange: (date?: string) => void;
    withTime?: boolean;
}
const DatePicker: React.FC<IProps> = ({
    date: _date,
    label,
    onChange,
    withTime = false,
}) => {
    const [date, setDate] = useState(_date ? dayjs(_date) : null);

    const onChangeDate = (newDate: Dayjs | null) => {
        setDate((date) => {
            if (!date && !newDate) {
                return date;
            }
            if (!newDate) {
                return null;
            }
            if (date && newDate.isSame(date)) {
                return date;
            }
            return newDate;
        });
    };

    useEffect(() => {
        onChangeDate(_date ? dayjs(_date) : null);
    }, [_date]);

    useEffect(() => {
        if (date === null) {
            if (_date) {
                onChange(undefined);
            }
        } else if (date.isValid()) {
            const formatted = withTime
                ? date.utc().format("YYYY-MM-DDTHH:mm:00.000[Z]")
                : date.format("YYYY-MM-DD");
            if (_date !== formatted) {
                onChange(formatted);
            }
        }
    }, [date, _date, onChange, withTime]);

    if (withTime) {
        return (
            <DateTimePicker
                value={date}
                label={label}
                mask={"____-__-__ __:__"}
                inputFormat={"YYYY-MM-DD HH:mm"}
                ampm={false}
                OpenPickerButtonProps={{ size: "small" }}
                onChange={onChangeDate}
                renderInput={(
                    params: JSX.IntrinsicAttributes & TextFieldProps
                ) => (
                    <TextField
                        {...params}
                        fullWidth
                        margin="dense"
                        helperText={params.error ? params.helperText : null}
                    />
                )}
            />
        );
    } else {
        return (
            <DateOnlyPicker
                value={date}
                label={label}
                mask={"____-__-__"}
                inputFormat={"YYYY-MM-DD"}
                OpenPickerButtonProps={{ size: "small" }}
                onChange={onChangeDate}
                renderInput={(props) => (
                    <TextField
                        {...props}
                        fullWidth
                        margin="dense"
                        helperText={props.error ? props.helperText : null}
                    />
                )}
            />
        );
    }
};

export default DatePicker;
