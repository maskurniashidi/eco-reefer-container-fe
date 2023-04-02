import React, { useState } from "react";
import styles from "./Notification.module.css";
import { Timeline, message, Skeleton, Modal, Button, Space, Input, Tooltip } from "antd";

function Notification() {
    const [loading, setLoading] = useState(false);
    return (
        <div className={styles.wrapper}>
            {loading ? (
                <Skeleton />
            ) : (
                <div className={styles.notifContainer}>
                    <div className={styles.notifItem}>
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
                    </div>
                    <div className={styles.notifItem}>
                        <div className={styles.iconBox}>
                            <img src="https://cf.shopee.co.id/file/f6a41f587fb94f53a29285eebfb4b607_tn" alt="notif item" className={styles.iconItem} />
                        </div>
                        <div className={styles.textNotif}>
                            <p className={styles.title}>Temperature Mencapai Minimum</p>
                            <p className={styles.body}>Halo admin, temperature eco reefer anda telah mencapai maximum</p>
                            <p className={styles.date}>
                                12-20-2023 12:00:29
                            </p>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Notification;
