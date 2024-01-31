import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "./Sidebar.module.css";

function SubMenu({ item }) {
  const [subnav, setSubnav] = useState(false);
  function showSubnav() {
    setSubnav(!subnav);
  }
  return (
    <div>
      <NavLink
        to={item.path}
        onClick={item.subNav && showSubnav}
        className={({ isActive }) => (isActive ? styled.active : styled.link)}
      >
        <div className={styled.icon_name}>
          {item.icon}
          <div>{item.name}</div>
        </div>
        <div>{item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null}</div>
      </NavLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                isActive ? styled.dropdown_active : styled.dropdown_link
              }
            >
              {/* {item.icon} */}
              {item.name}
            </NavLink>
          );
        })}
    </div>
  );
}

export default SubMenu;
