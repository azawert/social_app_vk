import { combineReducers } from '@reduxjs/toolkit'

import authSlice from './slices/authSlice'

const rootReducer = combineReducers({
	authSlice
})

export default rootReducer
