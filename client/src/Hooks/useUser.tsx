import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IUser } from '../../../src/models/User';
import { auth } from '../../../src/services/firebase/firebase';
import { getUser } from '../redux/actions/actions';

export default function useUser() {
  const dispatch = useDispatch();
  auth.onAuthStateChanged((user) => {
    if (user && user.email) {
      dispatch(getUser(user.email));
    }
  });
}