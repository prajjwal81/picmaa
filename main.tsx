import React, {useEffect, useState} from 'react';
import BottomTabs from './src/Stacks/BottomStack';
import AuthStack from './src/Navigations/Auth';
import {getItem} from './src/utils/asyncStorage';

function Main() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const loginhandler = async () => {
      const res = await getItem();
      if (res.id) {
        setLogin(true);
      }
    };
    loginhandler();
  }, []);
  return login ? <BottomTabs /> : <AuthStack />;
}

export default Main;
