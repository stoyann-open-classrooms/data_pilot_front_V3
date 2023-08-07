// REACT ROUTER
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// PRIVATE OUTLET


// SCROOL COMPONENTS
import ScrollToTop from "./components/shared/ScrollToTop.";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
// STYLES
import "./index.css";

// PAGES COMPONENTS
import Login from "./pages/Login/Login.jsx";
import AdminRoute from "./pages/Private/AdminRoute";
import UserRoute from "./pages/Private/UserRoute";
import SuperAdminRoute from "./pages/Private/SuperAdminRoute";
import AdminHome from "./pages/Private/PrivateAdmin/AdminHome";
import UserHome from "./pages/Private/PrivateUser/UserHome";
import SuperAdminHome from "./pages/Private/PrivateSuperAdmin/SuperAdminHome";


// PRIVATE PAGES COMPONENTS

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <div className="container">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/admin" element={<AdminRoute />}>
              {/* Routes accessibles uniquement aux admins ici */}
              <Route path="/admin/home" element={<AdminHome/>} />
            </Route>

            <Route path="/user" element={<UserRoute />}>
              {/* Routes accessibles uniquement aux utilisateurs ici */}
              <Route path="/user/home" element={<UserHome/>} />
            </Route>

            <Route path="/superAdmin" element={<SuperAdminRoute />}>
              {/* Routes accessibles uniquement aux superAdmins ici */}
              {/* <Route path="/superAdmin/home" element={<PrivateHome />} /> */}
              <Route path="/superAdmin/home" element={<SuperAdminHome/>} />

            </Route>
          </Routes>
        </div>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
