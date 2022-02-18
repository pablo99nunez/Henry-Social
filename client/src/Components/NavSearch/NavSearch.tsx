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
      <div className={styles.nav_wrap}>
        <div
          className={styles.nav_logo}
          onClick={() => {
            navigate('/');
          }}
        >
          <img src="https://assets.soyhenry.com/assets/LOGO-HENRY-03.png" alt="logo henry" />
          <h1> | Social</h1>
        </div>
        <div className={styles.nav_search}>
          <input type="search" placeholder="Busca otros Henry's " />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div>
            <BsBellFill className={styles.nav_icon_notification} />
          </div>
          <div
            className={styles.nav_button_profile}
            onClick={() => {
              navigate('/profile/' + user?.username);
            }}
          >
            <img src={user.avatar} alt="" />
            <div className={styles.nav_profile_info}>
              <h3>{user?.name}</h3>

              <p>Student - {user?.cohorte || 'FT-20B'}</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavSearch;
