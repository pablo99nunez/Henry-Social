import { useSelector } from 'react-redux';
import { IState } from '../redux/reducer';

export default function useisLogged() {
  const user = useSelector((state: IState) => state.user);
  if (!!user?.username) return true;
  else return false;
}
