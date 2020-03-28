import React from 'react';
import { Typography } from 'antd';
import NextApp from 'next/app';
import { MDXProvider } from '@mdx-js/react';
import DocMenus from '../components/DocMenus';
import styles from './_app.scss';
import CodeBlock from '../components/CodeBlock';

const components = {
  code: CodeBlock
};

export default class App extends NextApp {
  render() {
    const { Component, pageProps, router } = this.props;
    let key = '/docs';
    const keys = router.asPath
      .split('/')
      .filter((s) => s !== 'docs' && s !== '')
      .map((s) => {
        const tmp = key + '/' + s;
        key = tmp;
        return tmp;
      });

    return (
      <div className={styles.root}>
        <div className={styles.main}>
          {/^\/docs/.test(router.asPath) && (
            <div className={styles.menu}>
              <DocMenus selectedKeys={[router.asPath]} defaultOpenKeys={keys} />
            </div>
          )}
          <div className={styles.content}>
            {/^\/docs/.test(router.asPath) && (
              <Typography className={styles.docContainer}>
                <MDXProvider components={components}>
                  <Component {...pageProps} />
                </MDXProvider>
              </Typography>
            )}
            {!/^\/docs/.test(router.asPath) && <Component {...pageProps} />}
          </div>
        </div>
        <div className={styles.foot}>
          <a className={styles.link} href="http://www.beian.miit.gov.cn/" target="_blank">
            浙ICP备19031225号
          </a>
        </div>
      </div>
    );
  }
}
