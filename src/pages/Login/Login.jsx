import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import homeImg from "../../assets/home-img.jpeg";
import "./login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // redirect when logged in
    if (isSuccess) {
      switch (user.role) { // Utilisez le rôle de l'utilisateur ici
        case 'admin':
          navigate('/admin/home');
          break;
        case 'user':
          navigate('/user/home');
          break;
        case 'superAdmin':
          navigate('/superAdmin/home');
          break;
        default:
          toast.error('Role inconnu');
      }
      toast.success("Vous etes connecter");
    }
  
    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Vous devez entrer votre email !");
    }
    if (!password) {
      toast.error("Merci d'entrez un mot de passe !");
    }
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  const { email, password } = formData;

  if (isLoading) {
    return <h1>CHARGEMENT...</h1>;
  }

  return (
    <>
      {user ? (
        <>
          <section className="heading">
            Bienvenue sur DATA PILOT !
          </section>
          <Link className="btn " to={"/private/home"}>
            Commencer
          </Link>

        </>
      ) : (
        <>
          <section className="heading">
            <h2>Connecter vous pour commencer.</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa ab
              ducimus deleniti laborum iste similique accusamus consequuntur
              totam ex dolorum!
            </p>
          </section>

          <div className="form-login-container">
            <div className="form-img-container">
              <img src={homeImg} alt="" />
            </div>
            <section className="form">
              <h1>
                <FaSignInAlt /> Ce connecter
              </h1>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="email"
                    type="mail"
                    id="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Entrer votre email"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    id="password"
                    value={password}
                    autocomplete="new-password"
                    onChange={onChange}
                    placeholder="Entrer votre mot de passe"
                  />
                </div>
                <div className="form-group">
                  <button className=" btn btn-block">Ce connecter</button>
                </div>
              </form>
            </section>
          </div>
        </>
      )}
    </>
  );
}

export default Login;
