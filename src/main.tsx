import ReactDOM from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import { BASE_PATH } from './utils/constants'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <MemoryRouter initialEntries={['/players']} basename={BASE_PATH}>
      <App />
    </MemoryRouter>
)
