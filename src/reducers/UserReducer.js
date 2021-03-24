export const initialLoginState = {
    isLoading: true,
    userToken: null,
    isHidden: 'false',
    name: null,
    uid: null
};

export const userReducer = (prevState, action) => {
    switch (action.type) {
        case 'RETRIEVE_TOKEN':
            return { ...prevState, userToken: action.token, uid: action.userID, name: action.userName, isLoading: false };
        case 'LOGIN':
            return { ...prevState, userToken: action.token, name: action.userName, uid: action.userID, isLoading: false };
        case 'LOGOUT':
            return { ...prevState, userToken: null, name: null, uid: null, isLoading: false };
        case 'REGISTER':
            return { ...prevState, userToken: action.token, name: action.userName, uid: action.userID, isLoading: false };
        case 'SET_VISIBILITY':
            return { ...prevState, isHidden: action.isHidden };
    }
};