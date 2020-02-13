import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './App.css';

//Action
function uploadAvatarActionCreator(payload) {
  console.log('dispatched action');

  return {
    type: 'UPLOAD_AVATAR',
    payload,
  };
}
//service
function getBase64(url) {
  return axios
    .get(url, {
      responseType: 'arraybuffer',
    })
    .then(response => Buffer.from(response.data, 'binary').toString('base64'));
}

//Dispatch
function App({ src, uploadAvatarActionCreator }) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const showNavbar = async () => {
    console.log('start receiving image base64');

    const base64 = await getBase64('/logo192.png');
    console.log('received');

    const src = `data:image/png;base64,${base64}`;
    uploadAvatarActionCreator(src);
  };
  useEffect(() => {
    console.log('mount or update');
    if (src) {
      setIsNavbarVisible(isNavbarVisible => !isNavbarVisible);
      console.log('showed navbar');
    }
  }, [src]);
  return (
    <div className='App'>
      {isNavbarVisible && (
        <div className='navbar'>
          <span>I'm navabar</span>
          <img src={src} alt='async avatar' />
        </div>
      )}
      <button onClick={showNavbar}>Toggle Navbar</button>
    </div>
  );
}

export default connect(
  state => ({ src: state.src }),
  dispatch => ({
    uploadAvatarActionCreator: data => {
      dispatch(uploadAvatarActionCreator(data));
    },
  }),
)(App);
