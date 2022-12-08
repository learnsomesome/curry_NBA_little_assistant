import ReactDOM from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <MemoryRouter initialEntries={['/players']}>
      <App />
    </MemoryRouter>
)
