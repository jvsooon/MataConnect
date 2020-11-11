import React, { useState, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

export const useVisibilityToggler = (component, visibility = false) => {
    const [visible, setVisibility] = useState(() => visibility)
    const { state, dispatch } = useContext(UserContext);
    // return [visible ? component: null, () => {
    return [state.isHidden ? component : null, () => {
        // setVisibility((v) => !v)
        dispatch({
            type: 'setVisibility',
            payload: {
                isHidden: !state.isHidden
            }
        });
    }];
}

export default useVisibilityToggler;
