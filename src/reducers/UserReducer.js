export const initialState = {
    isHidden: 'false',
};

export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'setVisibility':
            return { ...state, isHidden: action.payload.isHidden };
            break;
        default:
            return state;
    }
};