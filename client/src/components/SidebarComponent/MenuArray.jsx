import {
  ControlOutlined,
  DatabaseOutlined,
  HomeOutlined,
  TeamOutlined,
} from "@ant-design/icons";

// function getItem(label, key, icon, children, type) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   };
// }

export const MenuArray = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "project",
    icon: <ControlOutlined />,
    label: "โครงการ",
  },
  {
    key: "actual",
    icon: <ControlOutlined />,
    label: "ค่าใช้จ่าย",
  },

  // getItem('จัดการผู้เล่น', 'user', <DatabaseOutlined />, [
  //   getItem('Player Detail', 'playerdetail'),
  //   getItem('Guild Detail', 'guilddetail'),
  // ]),
  {
    key: "history",
    icon: <DatabaseOutlined />,
    label: "ประวัติการ login",
  
  },

  {
    key: "users",
    icon: <TeamOutlined />,
    label: "จัดการผู้ใช้งาน",
  },
];
