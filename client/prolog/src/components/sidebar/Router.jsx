import React from "react";
import {
  IoCalendarClearOutline,
  IoPieChartOutline,
  IoDocumentTextOutline,
  IoPersonOutline,
  IoChatboxOutline,
  IoChevronDown,
  IoChevronUp,
  IoChevronForwardOutline,
} from "react-icons/io5";

const SidebarData = [
  {
    path: "/",
    name: "일정 관리",
    icon: <IoCalendarClearOutline />,
    iconClosed: <IoChevronDown />,
    iconOpened: <IoChevronUp />,
    subNav: [
      {
        path: "/",
        name: "일정 보기",
        icon: <IoChevronForwardOutline style={{ color: "rgb(245, 242, 242)" }} />,
      },
      {
        path: "/",
        name: "프로세스 만들기",
        icon: <IoChevronForwardOutline style={{ color: "rgb(245, 242, 242)" }} />,
      },
    ],
  },
  {
    path: "/dashboard",
    name: "대시보드",
    icon: <IoPieChartOutline />,
  },
  {
    path: "/mymaster",
    name: "마스터 자기소개서",
    icon: <IoDocumentTextOutline />,
    iconClosed: <IoChevronDown />,
    iconOpened: <IoChevronUp />,
    subNav: [
      {
        path: "/mymaster",
        name: "내 자기소개서",
        icon: <IoChevronForwardOutline style={{ color: "white" }} />,
      },
      {
        path: "/mymaster",
        name: "자기소개서 쓰기",
        icon: <IoChevronForwardOutline style={{ color: "white" }} />,
      },
    ],
  },
  {
    path: "/allchatting",
    name: "채팅",
    icon: <IoChatboxOutline />,
    iconClosed: <IoChevronDown />,
    iconOpened: <IoChevronUp />,
    subNav: [
      {
        path: "/mychatting",
        name: "내 채팅",
        icon: <IoChevronForwardOutline style={{ color: "white" }} />,
      },
      {
        path: "/allchatting",
        name: "전체 채팅",
        icon: <IoChevronForwardOutline style={{ color: "white" }} />,
      },
    ],
  },
  {
    path: "/mypage",
    name: "내 정보",
    icon: <IoPersonOutline />,
  },
];

export default SidebarData;
