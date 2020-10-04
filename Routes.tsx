import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Google from 'expo-google-app-auth';
import { IconFill } from '@ant-design/icons-react-native';
import {
  handleAddBtnPress,
  handleShowTimePickerBtnPress,
} from './components/store/ActionsCreator.js';
import { Router, Scene } from 'react-native-router-flux';
import Home from './components/pages/home';
import EditPage from './components/pages/editPage';
import Notification from './components/pages/notification';
import Settings from './components/pages/settings';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

interface RoutesProps {
  user: Google.GoogleUser;
  setUser: any;
  toogle?: any;
  toogleTimePicker?: any;
}

const Routes = ({ user, toogle, setUser, toogleTimePicker }: RoutesProps) => {
  const [isReady, setIsReady] = useState<boolean>(false);

  //font loading
  async function prep() {
    await Font.loadAsync(
      'antoutline',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    );

    await Font.loadAsync(
      'antfill',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antfill.ttf')
    );
    // eslint-disable-next-line
    setIsReady(true);
  }

  useEffect(() => {
    prep();
  }, []);

  return isReady ? (
    <Router>
      <Scene key='root' panHandlers={null}>
        <Scene
          left={() => null}
          key='home'
          component={() => <Home user={user} />}
          title='Home'
          initial
          navigationBarStyle={{ backgroundColor: '#eee' }}
        />
        <Scene
          left={() => null}
          key='edit'
          component={() => <EditPage user={user}></EditPage>}
          title='Edit Prescription'
          navigationBarStyle={{ backgroundColor: '#eee' }}
          renderRightButton={() => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => {
                toogle(true);
              }}
            >
              <IconFill name='plus-circle' size={30} />
            </TouchableOpacity>
          )}
        />
        <Scene
          left={() => null}
          key='notification'
          component={() => <Notification user={user} />}
          title='Notification'
          navigationBarStyle={{ backgroundColor: '#eee' }}
          renderRightButton={() => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => {
                toogleTimePicker(true);
              }}
            >
              <IconFill name='plus-circle' size={30} />
            </TouchableOpacity>
          )}
        />
        <Scene
          left={() => null}
          key='settings'
          component={() => <Settings user={user} setUser={setUser}></Settings>}
          title='Settings'
          navigationBarStyle={{ backgroundColor: '#eee' }}
        />
      </Scene>
    </Router>
  ) : (
    <AppLoading></AppLoading>
  );
};

const mapDispatch = (dispatch: any) => ({
  toogle(addModalOpen: boolean) {
    const action = handleAddBtnPress(addModalOpen);
    dispatch(action);
  },

  toogleTimePicker(show: boolean) {
    const action = handleShowTimePickerBtnPress(show);
    dispatch(action);
  },
});

export default connect(null, mapDispatch)(Routes);
