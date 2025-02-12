import axios from 'axios';

export const googleTokenRequest = async () => {
  const GoogleUrl: string = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_KEY}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&scope=https://www.googleapis.com/auth/userinfo.email`;
  window.location.href = GoogleUrl;
};

export const kakaoTokenRequest = async () => {
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;
  window.location.href = kakaoUrl;
};

export const LoginInfoRequest = async (LoginInfoRequestCallBack: Function) => {
  const url: URL = new URL(window.location.href);
  const googleAccessToken: string = url.hash; // Google
  const kakaoAccessToken: string | null = url.searchParams.get('code'); //kakao

  if (googleAccessToken === null && kakaoAccessToken === null) {
    return;
  }
  if (googleAccessToken) {
    const accessToken: string = googleAccessToken.split('=')[1].split('&')[0];
    await axios
      .get(
        'https://www.googleapis.com/oauth2/v2/userinfo?access_token=' +
          accessToken,
        {
          headers: {
            authorization: `token ${accessToken}`,
            accept: 'application/json',
          },
        }
      )
      .then((response) => {
        LoginInfoRequestCallBack({ id: response.data.id, platform: 'google' });
      })
      .catch((e) => {
        return alert(e);
      });
  } else if (kakaoAccessToken) {
    const tokenUrl = 'https://kauth.kakao.com/oauth/token';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const data = new URLSearchParams();
    data.append('grant_type', 'authorization_code');
    data.append('client_id', process.env.REACT_APP_KAKAO_CLIENT_KEY as string); // 카카오 REST API 키
    data.append('redirect_uri', process.env.REACT_APP_REDIRECT_URL as string); // 리디렉션 URI
    data.append('code', kakaoAccessToken); // 인증 코드

    axios
      .post(tokenUrl, data, { headers })
      .then((response) => {
        const accessToken = response.data.access_token;
        console.log('ssss', accessToken);
        // 액세스 토큰을 사용하여 사용자 정보를 가져옴
        axios
          .get('https://kapi.kakao.com/v2/user/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          })
          .then((response) => {
            LoginInfoRequestCallBack({
              id: response.data.id,
              platform: 'kakao',
            });
          })
          .catch((error) => {
            alert(`카카오 사용자 정보 요청 중 에러 발생: ${error}`);
          });
      })
      .catch((error) => {
        alert(`카카오 토큰 요청 중 에러 발생: ${error}`);
      });
  }
};
