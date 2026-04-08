import React, { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './app/store';
import ColumnsPage from './features/columns/columnsPage.jsx';
import LoginForm from './features/auth/LoginForm.jsx';
import RegisterForm from './features/auth/RegisterForm.jsx';
import CardModal from './features/cards/cardModal.jsx';
import BoardNewPage from './features/boards/BoardNewPage.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { setCredentials, logout } from './features/auth/authSlice';

// Componente que maneja rutas según login
function AppRoutes() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth?.token);

  // ⚡ Forzar limpieza del token inválido al cargar la app
  useEffect(() => {
    if (!token) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        // Si hubiera un token en localStorage, lo eliminamos (estaba causando problemas)
        localStorage.removeItem('token');
        dispatch(logout());
      }
    }
  }, [dispatch, token]);

  return (
    <Routes>
      {!token ? (
        <>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          <Route path="/boards/new" element={<BoardNewPage />} />
          <Route path="/boards/:boardId" element={<ColumnsPage />} />
          <Route path="*" element={<Navigate to="/boards/1" replace />} />
        </>
      )}
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
        <CardModal />
      </BrowserRouter>
    </Provider>
  );
}

export default App;