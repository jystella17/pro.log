import { DatePicker, Space } from 'antd';

export default function Deadline() {
    const { RangePicker } = DatePicker
    return (
        <Space direction="vertical" size={12}>
            <RangePicker />
        </Space>
    )
}