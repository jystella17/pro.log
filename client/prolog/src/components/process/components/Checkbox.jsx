import { Checkbox } from 'antd';
import './ProcessComponents.css'

const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
};
  
export default function CheckBox() {

    return (
        <div className="checkbox">
            <Checkbox onChange={onChange}>진행중</Checkbox>
        </div>
    )
}
