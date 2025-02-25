import AuthProvider from './context/AuthContext.jsx';
import ContentProvider from './context/ContentContext.jsx';
import Sidebar from "./components/Sidebar.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import AddContent from "./components/AddContent.jsx";
import EditContent from "./components/EditContent.jsx";
import ViewContent from "./components/ViewContent.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { Navigate, Route, Routes } from 'react-router-dom';
function App() {

  return (

    <AuthProvider>
      <ContentProvider>
        <div className='app-container'>
          <Sidebar />
          <main className='main-content'>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/add" element={
                <PrivateRoute>
                  <AddContent />
                </PrivateRoute>
              } />
              <Route path="/edit/:id" element={
                <PrivateRoute>
                  <EditContent />
                </PrivateRoute>
              } />
              <Route path="/view" element={<ViewContent />} />
              <Route path="/" element={<Navigate to={"/login"} replace />} />
            </Routes>
          </main>
        </div>
      </ContentProvider>
    </AuthProvider>

  )
}

export default App
