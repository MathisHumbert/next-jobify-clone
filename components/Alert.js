import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unsetAlert } from '../features/appSlice';

const Alert = () => {
  const { alert } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!alert.show) return;

    const timeout = setTimeout(() => {
      dispatch(unsetAlert());
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);

  return <div className={`alert alert-${alert.type}`}>{alert.text}</div>;
};

export default Alert;
