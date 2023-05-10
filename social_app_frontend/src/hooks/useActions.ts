import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import {
	logout,
	setToken,
	setUser,
	setUserStatus
} from '../store/slices/authSlice'

const useActions = () => {
	const dispatch = useDispatch()
	const actions = { logout, setToken, setUser, setUserStatus }
	return {
		...bindActionCreators(actions, dispatch),
		dispatch
	}
}

export default useActions
