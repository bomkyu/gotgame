
export const setsessionUserInfo = (userInfo : object) => {
    const obj = {isLoggedIn : true, userInfo}
    sessionStorage.setItem('userInfo',JSON.stringify(obj));
}

export const getUserInfo = () => {
    const getSession = sessionStorage.getItem('userInfo');
    const changeJson = JSON.parse(getSession!);
    return changeJson;
}

export const sessionlogOut = () => {
    sessionStorage.removeItem('userInfo');
}