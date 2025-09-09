import React from 'react';
import { TaskProvider } from './context/TaskContext';
import Home from './pages/Home';
import './index.css';

/**
 * Main App component - Root component that provides global state and routing
 */
function App() {
  return (
    <TaskProvider>
      <div className="App">
        <Home />
      </div>
    </TaskProvider>
  );
}

export default App;
