import React from 'react';
import styles from './NavSearch.module.scss';
import { BsBellFill } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import useUser from '../../Hooks/useUser';
import { useSelector } from 'react-redux';
import { IUser } from '../../../../src/models/User';
import { IState } from '../../redux/reducer';
const NavSearch = () => {
  const navigate = useNavigate();
  const user = useSelector((state: IState) => state.user);
  return (
    <nav className={styles.nav}>
      <div className={styles.nav_logo}>
        <img src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png" alt="logo henry" />
      </div>
      <div className={styles.nav_search}>
        <input type="search" placeholder="Busca otros Henry's " />
      </div>
      <div className={styles.nav_button_profile}>
        <div>
          <BsBellFill className={styles.nav_icon_notification} />
        </div>
        <div className={styles.nav_profile_img}></div>
        <div
          className={styles.nav_profile_info}
          onClick={() => {
            navigate('/profile/' + user?.username);
          }}
        >
          <p>{user?.name}</p>
          <p>
            <span>Student</span> - FT-20B
          </p>
        </div>
      </div>
    </nav>
  );
};
export default NavSearch;
