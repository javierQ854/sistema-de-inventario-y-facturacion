import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import Login from "./pages/Login";
import Productos from "./pages/Productos";
import Categorias from "./pages/Categorias";
import PrivateRoute from "./router/PrivateRoute";
import Navbar from "./components/NavBar";

function AppContent() {
  const { usuario } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {usuario && <Navbar />} {/* Solo se muestra si hay usuario */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/productos" element={<PrivateRoute><Productos /></PrivateRoute>} />
        <Route path="/categorias" element={<PrivateRoute><Categorias /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
