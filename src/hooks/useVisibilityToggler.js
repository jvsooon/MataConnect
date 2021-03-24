import React, { useState, useContext } from 'react'
import { UserContext } from '../contexts/UserContext';


export const useVisibilityToggler = (component, visibility = false) => {
    const [visible, setVisibility] = useState(() => visibility)
    const { state, dispatch } = useContext(UserContext);

    return [state.isHidden ? component : null, () => {
        dispatch({ type: 'SET_VISIBILITY', isHidden: !state.isHidden });
    }];
}

export default useVisibilityToggler;
