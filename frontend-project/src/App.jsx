import { Route, Routes } from 'react-router-dom'
import Login from './auth/Login.jsx'
import './App.css'
import Dashboard from './pages/Dashboard.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'
import ProtectedRoute from './auth/ProtectedRoutes.jsx'
import Register from './auth/Register.jsx'
import Layout from './pages/Layout.jsx'
import Sparepart from './pages/Sparepart.jsx'
import Stockout from './pages/Stockout.jsx'
import Stockin from './pages/Stockin.jsx'
import Reports from './pages/ReportsPage.jsx'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/sparepart" element={<ProtectedRoute><Sparepart /></ProtectedRoute>} />
          <Route path="/stockin" element={<ProtectedRoute><Stockin /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/stockout" element={<ProtectedRoute><Stockout /></ProtectedRoute>} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App