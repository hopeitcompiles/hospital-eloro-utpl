import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SessionContext, ThemeContext } from "../../imports";
import Style from "./css/sign.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { LanguajeContext } from "../../common/context/LanguajeProvider";
import { Form } from "react-bootstrap";
import { registerNewPatientFromAuthForm } from "../../service/PatientService";

export default function Index() {
  const { sessionUser, LogIn } = useContext(SessionContext);
  const { theme } = useContext(ThemeContext);
  const { languaje } = useContext(LanguajeContext);
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { loginWithRedirect } = useAuth0();
  const [registerPanelActive, setRegisterPanelActive] = useState(false);

  const [values, setValues] = useState({
    name: "",
    dni: "",
    lastName: "",
    email: "",
    password: "",
    birthdate: "",
  });

  const [error, setError] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const emailRef = useRef();
  const nameRef = useRef();
  let timer;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    setIsSigning(true);
    setError("");
    e?.preventDefault();
    const result = await LogIn({
      username: values.email,
      password: values.password,
    });
    setValues({
      ...values,
      password: "",
    });
    setError(result);
    setIsSigning(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSigning(true);
    try {
      const response = await registerNewPatientFromAuthForm({
        name: values.name,
        lastName: values.lastName,
        dni: values.dni,
        user: { email: values.email, password: values.password },
        birthdate: values.birthdate,
      });
      if (response?.status === 200) {
        handleLogin();
      }
      setError("Registered");
    } catch (er) {
      setError("Something went wrong");
    }
    setIsSigning(false);
  };

  useEffect(() => {
    if (error !== "") {
      clearTimeout(timer);
      timer = setTimeout(function () {
        setError("");
      }, 5000);
    }
  }, [error]);

  const handleRightPanel = (url) => {
    if (location === "/register" || location === "/login") {
      navigate(url);
    }
  };

  useEffect(() => {
    setIsSigning(false);
    setError("");
    if (!(location === "/register" || location === "/login")) {
      return;
    }
    if (location === "/register") {
      nameRef.current.focus();
      setRegisterPanelActive(true);
      return;
    }
    if (location === "/login") {
      emailRef.current.focus();
      setRegisterPanelActive(false);
    }
  }, [location]);

  // useEffect(()=>{
  //     if(sessionUser!==null && (location==='/login' ||location==='/register')){
  //         navigate('/profile')
  //     }
  // },[sessionUser])
  if (sessionUser) {
    return (
      <h1>
        Wellcome, {sessionUser?.person?.name} {sessionUser?.person?.lastName}
      </h1>
    );
  }
  return (
    <div className={`${theme === "dark" && Style.dark} ${Style.body}`}>
      <div
        className={`${Style.container_all} ${
          registerPanelActive ? Style.right_panel_active : ""
        }`}
        id="container"
      >
        <div className={`${Style.form_container} ${Style.sign_up_container}`}>
          <Form className={Style.form} onSubmit={handleRegister} noValidate>
            <h1 className={Style.title}>{languaje?.LOGIN?.REGISTER_TITLE}</h1>
            <span className={Style.span}>
              {languaje?.LOGIN?.REGISTER_SUBTITLE}
            </span>
            <Form.Label />
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              ref={nameRef}
              onChange={handleInputChange}
              value={values.name}
              required
            />
            <Form.Label />
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleInputChange}
              value={values.lastName}
              required
            />
            <Form.Label />
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              ref={emailRef}
              onChange={handleInputChange}
              value={values.email}
              required
            />
            <Form.Label />
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              value={values.password}
              required
            />
            <Form.Label />
            <Form.Control
              type="text"
              name="dni"
              placeholder="CI Number"
              onChange={handleInputChange}
              value={values.dni}
              maxLength={10}
              minLength={10}
              required
            />
            <Form.Label />
            <Form.Control
              type="date"
              name="birthdate"
              placeholder="CI Number"
              onChange={handleInputChange}
              value={values.birthdate}
              maxLength={10}
              minLength={10}
              required
            />
            <Form.Label />
            <button
              type="submit"
              className={Style.btn_form}
              disabled={isSigning}
            >
              Sign Up
            </button>
            <a
              className={Style.show_on_small}
              onClick={() => handleRightPanel("/login")}
            >
              {languaje?.LOGIN?.REGISTER_ALTER_TITLE}
            </a>
            <h6 className={Style.error}>{error}</h6>
          </Form>
        </div>
        <div className={`${Style.form_container} ${Style.sign_in_container}`}>
          <Form className={Style.form} onSubmit={handleLogin} noValidate>
            <h1 className={Style.title}>{languaje?.LOGIN?.LOGIN_TITLE}</h1>
            <span className={Style.span}>
              {languaje?.LOGIN?.LOGIN_SUBTITLE}
            </span>
            <Form.Label />
            <Form.Control
              type="email"
              name="email"
              placeholder={languaje?.LOGIN?.EMAIL_PLACERHOLDER}
              ref={emailRef}
              onChange={handleInputChange}
              value={values.email}
              required
            />
            <Form.Label />
            <Form.Control
              type="password"
              name="password"
              placeholder={languaje?.LOGIN?.PASSWORD_PLACEHOLDER}
              onChange={handleInputChange}
              value={values.password}
              required
            />
            <a className={Style.link}>
              {languaje?.LOGIN?.LOGIN_FORGOT_PASSWORD}
            </a>
            <button
              type="submit"
              className={Style.btn_form}
              disabled={isSigning}
            >
              Sign In
            </button>
            <a onClick={loginWithRedirect}>Login with auth0</a>
            <a
              className={Style.show_on_small}
              onClick={() => handleRightPanel("/register")}
            >
              {languaje?.LOGIN?.LOGIN_ALTER_TITLE}
            </a>
            <div className={Style.m2}></div>
            <h6 className={Style.error}>{error}</h6>
          </Form>
        </div>
        <div className={Style.overlay_container}>
          <div className={Style.overlay_form}>
            <div className={`${Style.overlay_panel} ${Style.overlay_left}`}>
              <h1 className={Style.title}>
                {languaje?.LOGIN?.REGISTER_ALTER_TITLE}
              </h1>
              <p className={Style.paragraph}>
                {languaje?.LOGIN?.REGISTER_ALTER_SUBTITLE}
              </p>
              <button
                className={`${Style.btn_form} ${Style.ghost}`}
                onClick={() => handleRightPanel("/login")}
              >
                Sign In
              </button>
            </div>
            <div className={`${Style.overlay_panel} ${Style.overlay_right}`}>
              <h1 className={Style.title}>
                {languaje?.LOGIN?.LOGIN_ALTER_TITLE}
              </h1>
              <p className={Style.paragraph}>
                {languaje?.LOGIN?.LOGIN_ALTER_SUBTITLE}
              </p>
              <button
                className={`${Style.btn_form} ${Style.ghost}`}
                onClick={() => handleRightPanel("/register")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
