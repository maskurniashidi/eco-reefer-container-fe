import React, { useState } from "react";
import styles from "./MyAccount.module.css";
import ReactLoading from "react-loading";
import { Skeleton, Input, Image } from "antd";
import { ToastContainer } from 'react-toastify';

function MyAccount(props) {
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "L",
    phoneNumber: 0,
  });
  const [profilePic, setProfilePic] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(false);

  // const imageChange = (event) => {
  //   setEditable(true);
  //   setImage(URL.createObjectURL(event.target.files[0]));
  //   setProfilePic(event.target.files[0]);
  // };

  const handleChange = (event) => {
    setEditable(true);
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
    console.log(user)
  };


  // const updateProfile = () => {
  //   setLoadingLogin(true);
  //   var dataBody = new FormData();
  //   dataBody.append('name', user.name);
  //   dataBody.append('email', user.email);
  //   dataBody.append('gender', user.gender);
  //   dataBody.append('phoneNumber', user.phoneNumber);
  //   dataBody.append('profileImage', profilePic);

  //   var config = {
  //     method: 'patch',
  //     url: `${BASE_API_URL}/user/${data.id}`,
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     data: dataBody
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       toast.success('Edit Profile Berhasil', {
  //         position: "top-center",
  //         autoClose: 1500,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 1500);
  //       setLoadingLogin(false);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       toast.error('Edit Profile Gagal', {
  //         position: "top-center",
  //         autoClose: 1500,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //       setLoadingLogin(false);
  //     });
  // };


  const imageChange = (e) => {
    setProfilePic(e.target.files[0]);
    setEditable(true);
  }

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <Skeleton />
      ) : (
        <div className={styles.container}>
          <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className={styles.topWrapper}>
            <h3 className={styles.title}>Profil Saya</h3>
            <p className={styles.titleDesc}>Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun</p>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.detailContainer}>
            <div className={styles.leftDetail}>
              <div className={styles.detailGroupPicture}>
                <div className={styles.profileContainer}>
                  {
                    profilePic === null ? <Image src={`https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80`} alt="avatar" className={styles.profilePicItem} /> : <Image src={URL.createObjectURL(profilePic)} className={styles.profilePicItem} />
                  }
                </div>
                <input accept=".png, .jpeg, .jpg" className={styles.fileInput} type="file" name="photo_profile" onChange={imageChange} />
              </div>
              <div className={styles.detailGroup}>
                <p className={styles.detailTitle}>Nama</p>
                <Input type="text" className={styles.formControlWithMargin} name="name" value="admin" onChange={handleChange} />
              </div>
              <div className={styles.detailGroup}>
                <p className={styles.detailTitle}>Email</p>
                <Input type="email" className={styles.formControlWithMargin} name="email" value="admin@gmail.com" onChange={handleChange} />
              </div>
              <div className={styles.detailGroup}>
                <p className={styles.detailTitle}>No Telepon</p>
                <Input addonBefore="+62" value="8213231451" name="phoneNumber" type="number" className={styles.formControl} onChange={handleChange} />
              </div>
              <div className={styles.btnContainer}>
                {editable === true ? (
                  <>
                    {loadingLogin ? (
                      <button disabled className={styles.btnSave}>
                        <ReactLoading className={styles.loadingLogin} type={props.balls} color={props.color} height={20} width={30} />
                      </button>
                    ) : (
                      <button className={styles.btnSave}>
                        Simpan
                      </button>
                    )}
                  </>
                ) : (
                  <button disabled className={styles.btnSaveDisabled}>
                    Simpan
                  </button>
                )}
              </div>
            </div>

            {/* <div className={styles.rightDetail}></div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAccount;
