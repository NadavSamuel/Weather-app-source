
import { storageService } from '../services/storageService';

export const loading = () => ({ type: 'LOADING_START' });
export const doneLoading =() => ({ type: 'LOADING_DONE' });

export function toggleInitialLoad() {
    return async (dispatch, getState) => {
        const { wasInitialLoad } = getState().systemReducer;
        if(!wasInitialLoad) storageService.saveToStorage('weatherAppInitialLoad',true)
        else storageService.saveToStorage('weatherAppInitialLoad',false)
        dispatch({ type: 'TOGGLE_INITIAL_LOAD' })
    }
}

