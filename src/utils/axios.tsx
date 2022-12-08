import { DotLoading } from "antd-mobile";
import axios from "axios";
import ReactDOM from "react-dom";
import { BASE_URL, RAPID_API_HOST, RAPID_API_KEY } from "./constants";

let requestCount = 0;

// 显示loading
function showLoading() {
  if (requestCount === 0) {
    const dom = document.createElement('div');
    dom.setAttribute('id', 'loading');
    document.body.appendChild(dom);
    ReactDOM.render(<div style={{color: '#999'}}><span>加载中</span><DotLoading /></div>, dom);
  }
  requestCount++;
}

// 隐藏loading
function hideLoading() {
  requestCount--;
  if (requestCount === 0) {
    document.body.removeChild(document.getElementById('loading') as Node);
  }
}

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-RapidAPI-Key': RAPID_API_KEY,
    'X-RapidAPI-Host': RAPID_API_HOST,
  },
})

instance.interceptors.request.use(
  (config) => {
    if (config.headers?.isLoading !== false) {
      showLoading();
    }

    return config;
  },
  (err) => {
    if (err.config.headers.isLoading !== false) {
      hideLoading();
    }

    return Promise.reject(err);
  }
)

instance.interceptors.response.use(
  (result) => {
    if (result.config.headers?.isLoading !== false) {
      hideLoading();
    }

    return result.data;
  },
  (err) => {
    if (err.config.headers.isLoading !== false) {
      hideLoading();
    }

    return Promise.reject(err);
  }
);

export default instance;
