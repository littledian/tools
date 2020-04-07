import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import TetriContainer from '@/services/tetris/TetriContainer';
import styles from './index.scss';

const instance = new TetriContainer({ width: 10, height: 20 });

const Home = () => {
  const [grid, setGrid] = useState(instance.grid);

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      const effectKeys = ['KeyA', 'KeyS', 'KeyD', 'KeyJ'];
      const keyCode = e.code;
      if (effectKeys.indexOf(keyCode) === -1) {
        return;
      }
      switch (keyCode) {
        case 'KeyA':
          instance.left();
          break;
        case 'KeyS':
          instance.down();
          break;
        case 'KeyD':
          instance.right();
          break;
        case 'KeyJ':
          instance.transform();
          break;
      }
      setGrid(instance.grid);
    }

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      instance.down();
      setGrid(instance.grid);

      return () => {
        clearInterval(timer);
      };
    }, 1000);
  }, []);

  return (
    <div className={styles.root}>
      {grid.map((item, index) => {
        return (
          <div key={index} className={styles.row}>
            {item.map((subItem, subIndex) => {
              return (
                <span
                  key={subIndex}
                  className={classNames(styles.col, `color-${subItem || '0'}`)}
                />
              );
            })}
          </div>
        );
      })}
      <div className={styles.tooltips}>
        <span className={styles.tip}>Left: A</span>
        <span className={styles.tip}>Right: D</span>
        <span className={styles.tip}>Speed up: S</span>
        <span className={styles.tip}>Transform: J</span>
      </div>
    </div>
  );
};

export default Home;
