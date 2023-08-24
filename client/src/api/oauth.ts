import axios from "axios";

export const googleTokenRequest = async ( ) => {
    const GoogleUrl : string = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_KEY}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&scope=https://www.googleapis.com/auth/userinfo.email`
    window.location.href = GoogleUrl;
};

export const kakaoTokenRequest = async ( ) => {
    const kakaoUrl : string = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`
    window.location.href = kakaoUrl;
}

export const LoginInfoRequest = async (LoginInfoRequestCallBack : Function) => {
    const url : URL = new URL(window.location.href);
    const googleAccessToken : string = url.hash; // Google
    const kakaoAccessToken : string | null = url.searchParams.get('code'); //kakao
    if( googleAccessToken === null && kakaoAccessToken === null ){
        return
    }
    if (googleAccessToken) {
      const accessToken : string = googleAccessToken.split("=")[1].split("&")[0];
      await axios.get('https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + accessToken, { 
        headers: { 
          authorization: `token ${accessToken}`, 
          accept: 'application/json' 
        }})
        .then(response => {
          LoginInfoRequestCallBack({id : response.data.id, platform : 'google'});
      }).catch(e => {return alert(e)});
    }else if(kakaoAccessToken){
      const url = "https://kauth.kakao.com/oauth/token";
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };

      const data = new URLSearchParams();
      data.append('grant_type', 'authorization_code');
      data.append('client_id', `${process.env.REACT_APP_KAKAO_CLIENT_KEY}`); // REST_API_KEY 변수에 클라이언트 아이디를 할당해야 합니다.
      data.append('redirect_uri', `${process.env.REACT_APP_REDIRECT_URL}`); // REDIRECT_URI 변수에 리디렉션 URI를 할당해야 합니다.
      data.append('code', `${kakaoAccessToken}`); // AUTHORIZE_CODE 변수에 코드를 할당해야 합니다.

      axios.post(url, data, { headers })
        .then(response => {
          console.log('응답 데이터:', response.data);
          axios.get('https://kapi.kakao.com/v2/user/me', { 
          headers: { 
            authorization: `Bearer ${response.data.access_token}`, 
            'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8'
          }})
          .then(response =>{
            LoginInfoRequestCallBack({ id : response.data.id, platform : 'kakao'})
          })
        })
        .catch(error => {
          alert(`에러! 에러코드 ${error}` )
        });
    }
}