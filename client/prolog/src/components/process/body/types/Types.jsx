import React, { useRef, useState } from 'react';
import { Tabs } from 'antd';

const initialItems = [
  {
    label: '자기소개서',
    // children: 'Content of Tab 1',
    key: '1',
    closable: false,
  },
  {
    label: 'New Tab',
    // children: 'Content of Tab 2',
    key: '2',
  },

];
function TypesTab() {
    // 현재 선택된 탭
    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    // 탭 list
    const [items, setItems] = useState(initialItems);

    
    // 새로 생성되는 탭 인덱스
    const newTabIndex = useRef(0);
    
    // 탭을 옮기면 새로운 탭으로 이동
  function onChange(newActiveKey) {
    setActiveKey(newActiveKey);
  };
    
    
  // 탭 추가
  function AddTab() {
      const newActiveKey = `newTab${newTabIndex.current++}`;
      // 새로운 탭 list
      const newPanes = [...items];
      
      newPanes.push({
        label: `New Tab${newTabIndex.current++}`,
        children: 'Content of new Tab',
        key: newActiveKey,
      });
      
    // 탭 리스트와 현재 선택된 탭 갈아끼우기
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
    

  // 탭 제거
  function remove(targetKey) {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    // 제거한 후 새로운 탭 list
      const newPanes = items.filter((item) => item.key !== targetKey);
      
    // 탭이 있고, 새로운 탭이 선택된 탭이라면
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
    };
    

  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      AddTab();
    } else {
      remove(targetKey);
    }
  };
  
  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
    />
  );
};
export default TypesTab;