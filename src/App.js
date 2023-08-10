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
import SuperAdminCustomersList from "./pages/Private/PrivateSuperAdmin/SuperAdminCustomersList/SuperAdminCustomersList";
import SuperAdminUsersList from "./pages/Private/PrivateSuperAdmin/SuperAdminUsersList/SuperAdminUsersList";
import AdminUsersList from "./pages/Private/PrivateAdmin/AdminUsersList/AdminUsersList";
import AdminTablesList from "./pages/Private/PrivateAdmin/AdminTablesList/AdminTablesList";
import AdminTable from "./pages/Private/PrivateAdmin/AdminTable/AdminTable";
import AutorizedTableUserList from "./pages/Private/PrivateAdmin/AutorizedTableUserList/AutorizedTableUserList";
import PrivateAdminDashboardList from "./pages/Private/PrivateAdmin/PrivateAdminDashboardList/PrivateAdminDashboardList";
import AdminRapportList from "./pages/Private/PrivateAdmin/AdminRapportList/AdminRapportList";
import AdminRapportDetail from "./pages/Private/PrivateAdmin/AdminRapportDetails/AdminRapportDetail";
import SuperAdminPostRapport from "./pages/Private/PrivateSuperAdmin/SuperAdminPostRapport/SuperAdminPostRapport";
import PrivateUserTables from "./pages/Private/PrivateUser/PrivateUserTables/PrivateUserTables";
import PrivateUserRapports from "./pages/Private/PrivateUser/PrivateUserRapports/PrivateUserRapports";
import PrivateUserInfos from "./pages/Private/PrivateUser/PrivateUserInfos/PrivateUserInfos";

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
              <Route path="/admin/home" element={<AdminHome />} />
              <Route path="/admin/users" element={<AdminUsersList />} />
              <Route path="/admin/tables" element={<AdminTablesList />} />
              <Route path="/admin/table/:id" element={<AdminTable />} />
              <Route path="/admin/dashbord" element={<PrivateAdminDashboardList />} />
              <Route path="/admin/autorized-user/table/:id" element={<AutorizedTableUserList />} />
              <Route path="/admin/rapports" element={<AdminRapportList/>} />
              <Route path="/admin/rapport/:id" element={<AdminRapportDetail/>} />
            </Route>

            <Route path="/user" element={<UserRoute />}>
              {/* Routes accessibles uniquement aux utilisateurs ici */}
              <Route path="/user/home" element={<UserHome />} />
              <Route path="/user/tables" element={<PrivateUserTables/>} />
              <Route path="/user/rapports" element={<PrivateUserRapports/>} />
              <Route path="/user/parameters" element={<PrivateUserInfos/>} />
            </Route>

            <Route path="/superAdmin" element={<SuperAdminRoute />}>
              {/* Routes accessibles uniquement aux superAdmins ici */}
              <Route path="/superAdmin/home" element={<SuperAdminHome />} />
              <Route
                path="/superAdmin/customers"
                element={<SuperAdminCustomersList />}
              />
              <Route
                path="/superAdmin/users"
                element={<SuperAdminUsersList />}
              />
              <Route
                path="/superAdmin/post-rapport"
                element={<SuperAdminPostRapport/>}
              />
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
