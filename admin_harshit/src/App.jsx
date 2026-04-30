import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './styles/global.css'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import { isLoggedIn } from './lib/auth.js'
import ScrollToTop from './components/ScrollToTop.jsx'

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

