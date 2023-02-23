import React, { useState } from "react";
import styles from "./Login.module.css";
import { login } from "../../../utils/auth";
import { EyeInvisibleOutlined, EyeTwoTone } from "../../../assets/assets";
import ReactLoading from "react-loading";
import { Input, message, Alert } from "antd";
import HEADINGLOGO from "../../../assets/imgs/logo-login-zahro.png"
import MAINIMAGE from "../../../assets/imgs/header-login-zahro.png"



function Login(props) {
  //! --------------------------------------
  //!            STATE/VARIABLE
  //! --------------------------------------
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageVal, setMessageVal] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //! --------------------------------------
  //!            EVENT CHANGE
  //! --------------------------------------
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  //! --------------------------------------
  //!            EVENT CLICK
  //! --------------------------------------

  const handleLogin = () => {
    setLoading(true);
    if (user.email === "admin@gmail.com" && user.password === "admin") {
      login({
        email: user.email,
        token: Math.random(),
      });
      localStorage.setItem("role", "admin");
      message.success("Login berhasil");
      setLoading(false);
      props.history.push("/dashboard");
    } else {
      setMessageVal("Email atau password anda salah");
      setLoading(false);
      setOpenAlert(true);
    }


    if (user.email === "user@gmail.com" && user.password === "user") {
      login({
        email: user.email,
        token: Math.random(),
      });
      localStorage.setItem("role", "user");
      message.success("Login berhasil");
      setLoading(false);
      props.history.push("/dashboard");
    } else {
      setMessageVal("Email atau password anda salah");
      setLoading(false);
      setOpenAlert(true);
    }
  };

  //! --------------------------------------
  //!                 RETURN
  //! --------------------------------------
  return (
    <div className={styles.wrapper}>
      {/* -------------HEADING------------ */}
      <div className={styles.heading}>
        <img src={HEADINGLOGO} alt="" className={styles.headingImg} />
      </div>
      {/* ----------------CONTENT------------ */}
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <img src={MAINIMAGE} alt="main image" className={styles.leftImg} />
          <h2 className={styles.leftTitle}>Control Eco Reefer Lebih Mudah</h2>
          <p className={styles.leftDesc}>Masuk dan rasakan kemudahan dalam mengontrol eco freezer</p>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.formGroup}>
            <h3 className={styles.formTitle}>Masuk Sekarang</h3>
            {/* alert */}
            <div className={styles.alertLogin}>
              {openAlert && (
                <Alert
                  className={styles.alertText}
                  message={messageVal}
                  type="error"
                  showIcon
                  closable
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                />
              )}
            </div>
            <div className={styles.formField}>
              <label htmlFor="whatsapp" className={styles.label}>
                Email
              </label>
              <Input required type="email" className={styles.input} name="email" value={user.email} onChange={handleChange} />
              <p className={styles.detailInput}>Example: email@gmail.com</p>
            </div>
            <div className={styles.formField}>
              <label htmlFor="password" className={styles.label}>
                Kata Sandi
              </label>
              <Input.Password required name="password" className={styles.input} value={user.password} onChange={handleChange} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </div>
            <div className={styles.infoLogin}>
              <a target="_blank" href="https://api.whatsapp.com/send?phone=6287861130080&text=Saya%20lupa%20kata%20sandi%20saya." className={styles.linkForgetPw}>
                Lupa kata sandi ?
              </a>
            </div>
            {loading ? (
              <button disabled className={styles.btnLogin}>
                <ReactLoading className={styles.loadingLogin} type={props.balls} color={props.color} height={20} width={30} />
              </button>
            ) : (
              <button onClick={handleLogin} className={styles.btnLogin}>
                Masuk
              </button>
            )}
            <p className={styles.privacyInfo}>Dengan masuk, saya menyetujui Syarat dan Ketentuan serta Kebijakan Privasi</p>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <p className={styles.footerCopy}>&copy; Teknik Instrumentasi</p>
        <p className={styles.footerBreak}>|</p>
        <p className={styles.footerComp}>ITS X INKA</p>
      </div>
    </div>
  );
}

export default Login;
