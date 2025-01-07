import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { DashboardLayout } from './pages/dashboard/DashboardLayout';
import { Upload } from './pages/dashboard/Upload';
import { Results } from './pages/dashboard/Results';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="upload" element={<Upload />} />
            <Route path="results" element={<Results />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;