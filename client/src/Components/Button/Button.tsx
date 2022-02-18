import style from './Button.module.scss';
import { motion } from 'framer-motion';
import React from 'react';

export default function Button({ children, onClick, active }: any) {
  const variants = {
    active: { backgroundColor: '#ff1', color: '#000' },
  };
  return (
    <motion.button
      variants={variants}
      animate={active ? 'active' : ''}
      onClick={onClick}
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 1.07,
      }}
      className={style.button}
    >
      {children}
    </motion.button>
  );
}