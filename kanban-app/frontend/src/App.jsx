// src/App.jsx
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './features/auth/LoginForm';
import RegisterForm from './features/auth/RegisterForm';
import ColumnsPage from './features/columns/columnsPage';

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!token ? <LoginForm /> : <Navigate to="/boards" />} />
        <Route path="/register" element={!token ? <RegisterForm /> : <Navigate to="/boards" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        
        {/* Ruta protegida: si no hay token, manda al login */}
        <Route 
          path="/boards" 
          element={token ? <ColumnsPage /> : <Navigate to="/login" />} 
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;