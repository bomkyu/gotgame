
export const setUserInfo = (userInfo : object) => {
    sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
}

export const getUserInfo = () => {
    const getSession = sessionStorage.getItem('userInfo');
    const changeJson = JSON.parse(getSession!);
    return changeJson;
}

export const logOut = () => {
    sessionStorage.removeItem('userInfo');
}