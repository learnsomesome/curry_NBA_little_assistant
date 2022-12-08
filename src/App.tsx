import { useLocation, useNavigate } from "react-router-dom";
import Routes, { routes } from "./utils/router";
import './App.css'
import { TabBar } from "antd-mobile";

function App() {
  const { pathname } = useLocation()
  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes />
      <TabBar className="tabBar" activeKey={pathname} onChange={navigate}>
        {routes.map(item => (
          <TabBar.Item key={item.path} icon={item.icon} title={item.title} />
        ))}
    </TabBar>
    </div>
  )
}

export default App
