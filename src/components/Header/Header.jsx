import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/logo-data-pilot.png";
import { logout, reset } from "../../features/auth/authSlice";
import "./header.css";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const token = JSON.parse(localStorage.getItem("userToken"));
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link className="logo-container" to={"/login"}>
          <img className="logo" src={logo} alt="" />
          <h1>DATA PILOT</h1>
        </Link>
      </div>

      <ul>
        {user ? (
          <>
            <li>
              <Link to={"/private/my-profil"} className="btn">
                {" "}
                <FaSignOutAlt /> Mon profil{" "}
              </Link>
            </li>
            <li>
              <button className="btn  btn-danger" onClick={onLogout}>
                {" "}
                <FaSignOutAlt /> Déconection
              </button>
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
    </header>
  );
}

export default Header;
