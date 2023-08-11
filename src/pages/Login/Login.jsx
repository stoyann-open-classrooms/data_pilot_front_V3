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

  // Rediriger l'utilisateur s'il est déjà connecté
  useEffect(() => {
    if (user) {
      switch (user.role) {
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
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Vous êtes connecté");
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email) {
      toast.error("Vous devez entrer votre email !");
    }
    if (!password) {
      toast.error("Merci d'entrer un mot de passe !");
    }
    dispatch(login(formData));
  };

  const { email, password } = formData;

  if (isLoading) {
    return <h1>CHARGEMENT...</h1>;
  }

  return (
    <>
      <section className="heading">
        <h2>Connectez-vous pour commencer.</h2>
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
            <FaSignInAlt /> Se connecter
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
                autoComplete="new-password"
                onChange={onChange}
                placeholder="Entrer votre mot de passe"
              />
            </div>
            <div className="form-group">
              <button className="btn btn-block">Se connecter</button>
            </div>
          </form>
          <div className="forgot-password">
          <Link to={'/forgot-password'}>Mot de passe oublié ?</Link>

          </div>

        </section>
      </div>
    </>
  );
}

export default Login;
