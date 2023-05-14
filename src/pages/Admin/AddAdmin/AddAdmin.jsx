import React, { useState } from "react";
import DashboardLayout from "../../../layouts/dashboard-layout/DashboardLayout";
import styles from "./AddAdmin.module.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ReactLoading from "react-loading";
import { Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

function AddAdmin(props) {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        gender: "",
        password: "",
        confirmPassword: "",
        role: "",
        strNumber: "",
    });


    //handle change
    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    const addAdmin = () => {
        setLoading(true)
        let dataBody = JSON.stringify({
            "name": user.name,
            "email": user.email,
            "password": user.password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://api-ecoref.project101.site/api/auth/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataBody
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                message.success("Menambahkan akun berhasil")
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
                setLoading(false)

            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
                message.error("Menambahkan akun gagal, pastikan data terisi semua atau belum pernah digunakan")
            });

    }

    return (
        <DashboardLayout>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className={styles.wrapper}>
                <div className={styles.topWrapper}>
                    <h2 className={styles.pageTitle}>Tambah Admin</h2>
                    <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
                        <Link className={styles.breadActive} to="/dashboard">
                            Home
                        </Link>
                        <Link className={styles.breadActive} to="/admin">
                            Admin
                        </Link>
                        <Typography className={styles.breadUnactive} color="text.primary">
                            Tambah Admin
                        </Typography>
                    </Breadcrumbs>
                </div>
                <div className={styles.content}>
                    <h4 className={styles.addAdminTitle}>Tambahkan Admin Baru</h4>
                    <div className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.formLabel}>
                                Nama
                            </label>
                            <Input required type="text" name="name" value={user.name} onChange={handleChange} className={styles.formControl} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.formLabel}>
                                Email
                            </label>
                            <Input required type="email" name="email" value={user.email} onChange={handleChange} className={styles.formControl} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.formLabel}>
                                Password
                            </label>
                            <Input.Password required name="password" value={user.password} onChange={handleChange} className={styles.formControl} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                        </div>
                        {/* <div className={styles.msgPwError}>halo</div> */}
                        <div className={styles.btnBox}>
                            {loading ? (
                                <button className={styles.btnAdd}>
                                    <ReactLoading className={styles.loadingConfirm} type={props.balls} color={props.color} height={20} width={30} />
                                </button>
                            ) : (
                                <button onClick={addAdmin} className={styles.btnAdd}>
                                    Tambah Admin
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}

export default AddAdmin;
