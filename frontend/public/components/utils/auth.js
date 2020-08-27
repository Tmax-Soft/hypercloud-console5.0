export const getAccessToken = function () {
  // TODO ReleaseMode false 일 때 마스터 토큰 넘겨주도록 수정
  if (!window.SERVER_FLAGS.releaseModeFlag) {
    return false;
  }

  if (window.SERVER_FLAGS.HDCModeFlag) {
    return getCookie('accessToken');
  } else {
    return sessionStorage.getItem('accessToken');
  }
};
// HyperAuth 연동 후, 사용하지 않음
export const getRefreshToken = function () {
  // TODO ReleaseMode false 일 때 마스터 토큰 넘겨주도록 수정
  if (!window.SERVER_FLAGS.releaseModeFlag) {
    return false;
  }

  if (window.SERVER_FLAGS.HDCModeFlag) {
    return getCookie('refreshToken');
  } else {
    return sessionStorage.getItem('refreshToken');
  }
};

export const getId = function () {
  if (!window.SERVER_FLAGS.releaseModeFlag) {
    return false;
  }

  if (window.SERVER_FLAGS.HDCModeFlag) {
    return getCookie('id');
  } else {
    return sessionStorage.getItem('id');
  }
};

export const setAccessToken = function (at) {
  if (!window.SERVER_FLAGS.releaseModeFlag) {
    return false;
  }

  if (window.SERVER_FLAGS.HDCModeFlag) {
    return setCookie('accessToken', at);
  } else {
    return sessionStorage.setItem('accessToken', at);
  }
};
// HyperAuth 연동 후, 사용하지 않음
export const setRefreshToken = function (rt) {
  if (!window.SERVER_FLAGS.releaseModeFlag) {
    return false;
  }

  if (window.SERVER_FLAGS.HDCModeFlag) {
    return setCookie('refreshToken', rt);
  } else {
    return sessionStorage.setItem('refreshToken', rt);
  }
};

export const setId = function (id) {
  if (!window.SERVER_FLAGS.releaseModeFlag) {
    return false;
  }

  if (window.SERVER_FLAGS.HDCModeFlag) {
    return setCookie('id', id);
  } else {
    return sessionStorage.setItem('id', id);
  }
};

export const getCookie = function (name) {
  let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? value[2] : null;
};

export const getTokenValidTime = function (at) {
  if (!at) {
    at = getCookie('accessToken');
  }

  const expTime = new Date(JSON.parse(atob(at.split('.')[1])).exp * 1000);
  return expTime;
};

export const setCookie = function (name, value, exp) {
  if (!exp) {
    exp = getTokenValidTime();
  }
  exp.setHours(exp.getHours() + 9);

  if (window.SERVER_FLAGS.TmaxCloudPortalURL.indexOf('tmaxcloud') !== -1) {
    // release
    let arr = window.SERVER_FLAGS.TmaxCloudPortalURL.split('/#')[0].split('.');
    if (arr[arr.length - 2].indexOf('://') !== -1) {
      arr[arr.length - 2] = arr[arr.length - 2].split('://')[1];
    }

    let domain = arr[arr.length - 2] + '.' + arr[arr.length - 1];
    document.cookie = name + '=' + value + ';expires=' + exp.toUTCString() + ';path=/' + ';domain=' + domain;
  } else {
    // development
    document.cookie = name + '=' + value + ';expires=' + exp.toUTCString() + ';path=/';
  }
};

export const deleteCookie = function (name) {
  if (window.SERVER_FLAGS.TmaxCloudPortalURL.indexOf('tmaxcloud') !== -1) {
    // release
    let arr = window.SERVER_FLAGS.TmaxCloudPortalURL.split('/#')[0].split('.');
    if (arr[arr.length - 2].indexOf('://') !== -1) {
      arr[arr.length - 2] = arr[arr.length - 2].split('://')[1];
    }

    let domain = arr[arr.length - 2] + '.' + arr[arr.length - 1];
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;domain=' + domain;
  } else {
    // development
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/';
  }
};

// 로그아웃 시 사용
export const resetLoginState = function () {
  if (window.SERVER_FLAGS.HDCModeFlag) {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    deleteCookie('id');
    // deleteCookie('remember');
  } else {
    sessionStorage.clear();
  }
  return;
};
