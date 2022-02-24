import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Typography } from 'antd';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.root}>
      <Head>
        <title>工具</title>
      </Head>
      <div className={styles.cell}>
        <Link href="/encryption">
          <Typography.Link>加解密</Typography.Link>
        </Link>
      </div>
      <div className={styles.cell}>
        <Link href="/base64_img">
          <Typography.Link>Base64图片转换</Typography.Link>
        </Link>
      </div>
    </div>
  );
}
