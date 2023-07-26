import axios from 'axios';
import Storage from './storage/storage';
// import jwt from 'jsonwebtoken';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const serverUrl = BASE_URL + '/api/v1' + '/';

type LoginData = {
  username: string;
  password: string;
};

// 토큰 검증, 401 에러 발생하면 토큰 재발행 요청
const token = async () => {
  const access = Storage.getTokenItem();
  const refresh = Storage.getRefreshTokenItem();
  // accesstoken 잔여기간 확인
  // const base64Payload = access ? access.split('.')[1] : '';
  // const payload = Buffer.from(base64Payload, 'base64');
  // const result = JSON.parse(payload.toString());
  // console.log(result);

  await axios
    .post(serverUrl + 'tokens', refresh, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + refresh,
      },
    })
    .then((res) => {
      Storage.clearItemAll();
      Storage.setRefreshTokenItem(res.data.refreshToken);
      Storage.setTokenItem(res.data.accessToken);
    });
};

const get = async (endpoint: string) => {
  try {
    console.log(`%cGET 요청 ${serverUrl + endpoint}`, 'color: #a25cd1;');
    // console.log('Bearer' + ' ' + Storage.getTokenItem());
    return await axios.get(serverUrl + endpoint, {
      // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
      headers: {
        Authorization: 'Bearer' + ' ' + Storage.getTokenItem(),
      },
    });
  } catch (error: any) {
    if (error.response.status == 401) {
      token();
    }
  }
};
// 로그인 및 토큰 저장하기
const login = async (endpoint: string, data: LoginData) => {
  try {
    const base64Credentials = btoa(`${data.username}:${data.password}`);
    return await axios
      .post(serverUrl + endpoint, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64Credentials}`,
        },
      })
      .then((res) => {
        const AccessToken = res.data.accessToken;
        const RefreshToken = res.data.refreshToken;
        // 세션 스토리지에 토큰 저장
        Storage.setTokenItem(AccessToken);
        Storage.setRefreshTokenItem(RefreshToken);
      });
  } catch (error) {
    console.log(error);
  }
};

const post = async (endpoint: string, data: {}) => {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  const bodyData = JSON.stringify(data);

  console.log(`%cPOST 요청: ${serverUrl + endpoint}`, 'color: #296aba;');
  console.log(`%cPOST 요청 데이터: ${bodyData}`, 'color: #296aba;');

  return await axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
    },
  });
};

const put = async (endpoint: string, data: {}) => {
  try {
    // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
    const bodyData = JSON.stringify(data);
    console.log(`%cPUT 요청: ${serverUrl + endpoint}`, 'color: #059c4b;');
    console.log(`%cPUT 요청 데이터: ${bodyData}`, 'color: #059c4b;');

    return await axios.put(serverUrl + endpoint, bodyData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
      },
    });
  } catch (error: any) {
    if (error.response.status == 401) {
      token();
    }
  }
};

const del = async (endpoint: string, params = '') => {
  try {
    console.log(`DELETE 요청 ${serverUrl + endpoint + '/' + params}`);
    return await axios.delete(serverUrl + endpoint + '/' + params, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
      },
    });
  } catch (error: any) {
    if (error.response.status == 401) {
      token();
    }
  }
};

// 아래처럼 export한 후, import * as Api 방식으로 가져오면,
// Api.get, Api.post 로 쓸 수 있음.
export { get, post, put, del as delete, login };