import { useRoutes } from "react-router-dom";
import { UserOutline, AppOutline } from 'antd-mobile-icons'
import Players from "../pages/Players";
import Teams from "../pages/Teams";

export const routes = [
  { path: "/players", icon: <UserOutline />, title: '球员', element: <Players /> },
  { path: "/teams", icon: <AppOutline />, title: '球队', element: <Teams /> },
];

const Routes = () => useRoutes(routes);

export default Routes;