import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Notification.module.css";
import { Timeline, message, Skeleton, Modal, Button, Space, Input, Tooltip } from "antd";

function Notification() {
    const [loading, setLoading] = useState(true);
    const [notif, setNotif] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get('http://api-ecoref.project101.site/api/data-sensor');
                const response = await axios.get('http://api-ecoref.project101.site/api/list-notifikasi');
                setNotif(response.data)
                console.log(response.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error(error);
            }
        };

        fetchData();

        // const interval = setInterval(() => {
        //     fetchData();
        // }, 10000);

        // return () => clearInterval(interval);
    }, []);
    return (
        <div className={styles.wrapper}>
            {loading ? (
                <Skeleton />
            ) : (
                <div className={styles.notifContainer}>
                    {/* <div className={styles.notifItem}>
                        <div className={styles.iconBox}>
                            <img src="https://cf.shopee.co.id/file/f6a41f587fb94f53a29285eebfb4b607_tn" alt="notif item" className={styles.iconItem} />
                        </div>
                        <div className={styles.textNotif}>
                            <p className={styles.title}>Temperature Mencapai Maximun</p>
                            <p className={styles.body}>Halo admin, temperature eco reefer anda telah mencapai maximum</p>
                            <p className={styles.date}>
                                12-20-2023 12:00:29
                            </p>
                        </div>
                    </div> */}
                    {
                        notif.map((item) => (
                            <div key={item.id} className={styles.notifItem}>
                                <div className={styles.iconBox}>
                                    <img src="https://cf.shopee.co.id/file/f6a41f587fb94f53a29285eebfb4b607_tn" alt="notif item" className={styles.iconItem} />
                                </div>
                                <div className={styles.textNotif}>
                                    <p className={styles.title}>{item.message}</p>
                                    <p className={styles.date}>
                                        {item.createdAt}
                                    </p>
                                </div>
                            </div>
                        ))
                    }

                </div>
            )}
        </div>
    );
}

export default Notification;
