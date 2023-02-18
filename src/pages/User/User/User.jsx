import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./User.module.css";
import { Input } from "antd";
import { AiFillEye, AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Skeleton, Space, Table, Tag } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import DashboardLayout from "../../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";

function User() {
  const [dataPatient, setDataPatient] = useState([
    { userId: 1, key: 1, name: "Zahro Novianto", gender: "zahro@gmail.com", phoneNumber: "6287864132080", tags: ["User"] },
    { userId: 1, key: 1, name: "User", gender: "user@gmail.com", phoneNumber: "6287861113080", tags: ["User"] }
  ]);
  const [loading, setLoading] = useState(false);

  // table
  const columns = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "No Telepon",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Tags",
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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/user/detail-user/${record.key}`}>
            <AiFillEye className={styles.iconActionView} />
          </Link>
          {/* <Link to={`/user/edit-user/${record.key}`}>
            <AiFillEdit className={styles.iconActionEdit} />
          </Link> */}
          <button className={styles.btnDelete}>
            <AiFillDelete className={styles.iconActionDelete} />
          </button>
        </Space>
      ),
    },
  ];

  // const handleInput = (e) => {
  //   setInputSearch(e.target.value);
  //   var dataSearch = dataForSearch.filter((item) => {
  //     return (
  //       item
  //         .name
  //         .toLowerCase()
  //         .includes(e.target.value.toLowerCase())
  //     )
  //   });
  //   setDataPatient(dataSearch)
  //   if (e.target.value === "") {
  //     setDataPatient(dataForSearch)
  //   }
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
      <div className={styles.wrapper}>
        <div className={styles.topWrapper}>
          <h2 className={styles.pageTitle}>User</h2>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
            <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
              Home
            </Link>
            <Typography className={styles.breadUnactive}>User</Typography>
          </Breadcrumbs>
        </div>
        <div className={styles.UserListContent}>
          <div className={styles.titleListUser}>
            <div className={styles.titleText}>
              <h3 className={styles.titleTextMain}>Daftar User</h3>
              <p className={styles.titleDesc}>List daftar user yang terdaftar dalam aplikasi albert</p>
            </div>
            <Link to="/user/tambah-user" className={styles.btnAddUser}>
              Tambah User
            </Link>
          </div>
        </div>
        <div className={styles.statistikContainer}>
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
        </div>
        <div className={styles.UserListContent}>
          {loading ? (
            <Skeleton />
          ) : (
            <div className={styles.tableContainerDoctor}>
              <Table columns={columns} dataSource={dataPatient} />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default User;
