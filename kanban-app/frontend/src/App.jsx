import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import ColumnsPage from './features/columns/columnsPage.jsx';
import './styles/kanban.css';

function App() {
  return <ColumnsPage />;
}

export default App;