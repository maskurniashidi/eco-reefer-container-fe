import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Admin.module.css";
import DashboardLayout from "../../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";
import { AiFillEye, AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Skeleton, Space, Table, Tag, Input } from "antd";
import { ToastContainer } from 'react-toastify';

function Admin() {
    const [dataAdmin, setDataAdmin] = useState([
    ]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get('http://api-ecoref.project101.site/api/data-sensor');
                const response = await axios.get('http://api-ecoref.project101.site/api/auth/users');
                console.log(response.data)
                var newDataTemp = [];
                response.data.map((item) => {
                    newDataTemp = [...newDataTemp, { key: item.id, name: item.name, email: item.email, tags: ["admin"] }]
                })
                setDataAdmin(newDataTemp)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error(error);
            }
        };

        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    // table init
    const columns = [
        {
            title: "ID",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Nama",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            key: "tags",
            dataIndex: "tags",
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? "geekblue" : "green";
                        if (tag === "loser") {
                            color = "volcano";
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        // {
        //     title: "Action",
        //     key: "action",
        //     render: (_, record) => (
        //         <Space size="middle">
        //             {/* <Link to={`/admin/detail-admin/${record.key}`}>
        //                 <AiFillEye className={styles.iconActionView} />
        //             </Link> */}
        //             {/* <Link to={`/admin/edit-admin/${record.key}`}>
        //                 <AiFillEdit className={styles.iconActionEdit} />
        //             </Link> */}
        //             {/* <button className={styles.btnDelete}>
        //                 <AiFillDelete className={styles.iconActionDelete} />
        //             </button> */}
        //         </Space>
        //     ),
        // },
    ];


    // const handleInput = (e) => {
    //     setInputSearch(e.target.value);
    //     var dataSearch = dataForSearch.filter((item) => {
    //         return (
    //             item
    //                 .name
    //                 .toLowerCase()
    //                 .includes(e.target.value.toLowerCase())
    //         )
    //     });
    //     setData(dataSearch)
    //     if (e.target.value === "") {
    //         setData(dataForSearch)
    //     }
    // }

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

            {loading ? (
                <Skeleton />
            ) : (
                <div className={styles.wrapper}>
                    <div className={styles.topWrapper}>
                        <h2 className={styles.pageTitle}>Admin</h2>
                        <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
                            <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
                                Home
                            </Link>
                            <Typography className={styles.breadUnactive}>Admin</Typography>
                        </Breadcrumbs>
                    </div>
                    <div className={styles.UserListContent}>
                        <div className={styles.titleListUser}>
                            <div className={styles.titleText}>
                                <h3 className={styles.titleTextMain}>Daftar Admin</h3>
                                <p className={styles.titleDesc}>List daftar Admin yang terdaftar dalam aplikasi dicom viewer</p>
                            </div>
                            <Link to="/admin/tambah-admin" className={styles.btnAddUser}>
                                Tambah Admin
                            </Link>
                        </div>
                    </div>

                    {/* <div className={styles.statistikContainer}>
                        <div className={styles.topInfo}>
                            <div className={styles.filterBox}>
                                <div className={styles.searchContainer}>
                                    <Input placeholder="cari berdasar nama" style={{ width: 400 }} />
                                    <button className={styles.searchBtn}  >
                                        Cari
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className={styles.tableContainerDoctor}>
                        <Table columns={columns} dataSource={dataAdmin} />
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}

export default Admin;
