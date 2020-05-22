import React, { Component, setState } from 'react';
//import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
//import { App } from './app';
import * as bgLoginNavy from '../imgs/bg_login_navy2.png';
import * as logoAc from '../imgs/logo_ac.svg';
import * as productHyperCloudLogo from '../imgs/product_hypercloud_logo.svg';
import { coFetchJSON, coFetchUtils } from '../co-fetch';
import { sha512 } from 'js-sha512';
import { Loading } from './utils';
import { setAccessToken, setRefreshToken, resetLoginState, getAccessToken } from './utils/auth';
import { OtpModal_ } from './modals/otp-modal';
import { useTranslation, withTranslation } from 'react-i18next';
class LoginComponent extends Component {
  // useState 대신 useRef 써도 됨
  state = {
    id: '',
    pw: '',
    error: '',
    loading: false
  };

  constructor(props) {
    super(props);
    // HDC 모델
    if (window.SERVER_FLAGS.HDCModeFlag && !getAccessToken()) {
      // tmaxcloud portal 에서 로그인 안하고 넘어온 상태
      window.location.href = window.SERVER_FLAGS.TmaxCloudPortalURL + '?redirect=console';
      return;
    }

    if (window.SERVER_FLAGS.HDCModeFlag) {
      window.location.href = `${document.location.origin}`;
      return;
    }
    // if (searchParam('at')) {
    //   window.sessionStorage.setItem('accessToken', searchParam('at'));
    //   window.sessionStorage.setItem('refreshToken', searchParam('rt'));   
    //   // const userRole = JSON.parse(atob(window.sessionStorage.getItem('accessToken').split('.')[1])).role;
    //   // window.sessionStorage.setItem('role', userRole);

    //   this.props.history.push('/');
    //   this.props.history.go(0);
    // }

    if (props.history.action === 'POP') {
      history.go(1);
    }

    if (document.referrer) {
      history.pushState(null, null, location.href);
      window.onpopstate = function (event) {
        history.go(1);
      }
      // if (sessionStorage.getItem('accessToken') === '') {
      //   // 로그아웃 된 상태 
      //   history.pushState(null, null, location.href);
      //   // this.props.history.push('/login');  
      //   window.onpopstate = function(event) {	
      //   history.go(1);
      // }

      // if (props.history.action !== 'REPLACE') {
      //   history.pushState(null, null, location.href);
      //   window.onpopstate = function(event) {	
      //   history.go(1);
      //   } 
      // }
    }


  }


  componentWillUnmount() {
    // console.log('componentWillUnmount');
  };

  _login(userInfo) {
    const uri = `${document.location.origin}/api/hypercloud/login`;
    coFetchJSON.post(uri, userInfo)
      .then(data => {
        this.setState({ loading: false });
        if (data.accessToken && data.refreshToken) {
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          if (window.localStorage.getItem('forceLogout') === 'true') {
            window.localStorage.setItem('forceLogout', false);
          } else {
            window.localStorage.setItem('forceLogout', true);
          }
          this.props.history.push('/');
          this.props.history.go(0);

        } else {
        }
      })
  }
  onClick = (e) => {
    // const { t } = useTranslation();
    if (e.type === 'keypress' && e.key !== 'Enter') {
      return;
    }
    this.setState({ loading: true });
    const AUTH_SERVER_URL = `${document.location.origin}/api/hypercloud/otp`;

    //if (this.state.id !== undefined && this.state.pw !== undefined) {
    const json = {
      'id': this.state.id,
      'password': sha512(this.state.pw)
    };
    coFetchJSON.post(AUTH_SERVER_URL, json)
      .then(data => {
        const curTime = new Date();
        this.setState({ loading: false });
        // if (data.accessToken && data.refreshToken) {
        //   setAccessToken(data.accessToken);
        //   setRefreshToken(data.refreshToken);
        //   if (window.localStorage.getItem('forceLogout') === 'true') {
        //     window.localStorage.setItem('forceLogout', false);
        //   } else {
        //     window.localStorage.setItem('forceLogout', true);
        //   }
        //   this.props.history.push('/');
        //   this.props.history.go(0);

        // } else {
        //otp인증을 해야하는 경우 
        data.otpEnable ? OtpModal_({ data: json, initialTime: curTime }) :
          // 로그인서비스 콜
          this._login(json);
        return;
        //}

        // const url_ = window.location.href.split('/login')[0]
        // window.location = `${url_}/status/all-namespaces`;
      })
      // .then(() => {
      //   // 미리: split 버그 수정 
      //   if (window.sessionStorage.getItem('accessToken')) {
      //     const userRole = JSON.parse(atob(window.sessionStorage.getItem('accessToken').split('.')[1])).role;
      //     window.sessionStorage.setItem('role', userRole);
      //     this.props.history.push('/');
      //     this.props.history.go(0);
      //   }
      // })
      .catch((error) => {
        console.log(error.message);
        this.setState({ error: error.message });
        this.setState({ loading: false });
      });
    //}


  };

  render() {
    return (
      <div id="login">
        <div id="bg-large">
          <div>
            <img src={bgLoginNavy} className="bg-navy" />
          </div>
          <div id="bg-big-blank" className="bg-blank"></div>
        </div>
        <div id="bg-small">
          <div>
            <div id="bg-small-middle" className="bg-blank"></div>
            <div id="bg-small-blank"></div>
          </div>
        </div>
        <div id="contents">
          <div className="inner_logo">
            <div id="bg-logo-ac">
              <img src={logoAc} />
            </div>
            <div id="bg-logo-hc" className="logo">
              <img src={productHyperCloudLogo} />
            </div>
          </div>
          {this.state.loading && <Loading />}
          <div className="inner_login">
            <form>
              <input type="hidden"></input>
              <input type="hidden"></input>
              <div className="box_login">
                <div className="inp_text">
                  <input type="text" id="loginId" autoFocus="autofocus" placeholder="Email" value={this.state.id} onKeyPress={this.onClick} onChange={(e) => { this.setState({ id: e.target.value }) }}></input>
                </div>
                <div className="box_login">
                  <div className="inp_text">
                    <input type="password" id="inputPassword" placeholder="Password" value={this.state.pw} onKeyPress={this.onClick} onChange={(e) => { this.setState({ pw: e.target.value }) }}></input>
                  </div>
                </div>
                <div className="box_error">
                  <p className="error_text">{this.state.error}</p>
                </div>
                <div>
                  <button type="button" onClick={this.onClick} className="btn_login" style={{ cursor: 'pointer' }}>Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
};
export default LoginComponent;