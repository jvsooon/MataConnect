export const initialState = {
    isHidden: 'false',
    name: '',
    uid: ''
};

export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'setVisibility':
            return { ...state, isHidden: action.payload.isHidden };
        case 'setName':
            return { ...state, name: action.payload.name };
        case 'setUID':
            return { ...state, uid: action.payload.uid };
        default:
            return state;
    }
};