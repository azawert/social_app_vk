import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IUser } from '../../types/authenticate.type'

interface IState {
	user: IUser | null
	token: string | null
}

const initialState: IState = {
	token: null,
	user: null
}

const authSlice = createSlice({
	initialState,
	name: 'auth',
	reducers: {
		setUser(state: IState, action: PayloadAction<IUser>) {
			state.user = action.payload
		},
		setToken(state: IState, action: PayloadAction<string>) {
			state.token = action.payload
		},
		logout(state: IState) {
			state.user = null
			state.token = null
		},
		setUserStatus(state: IState, action: PayloadAction<string>) {
			if (state.user) {
				state.user.status = action.payload
			}
		}
	}
})

export const { logout, setToken, setUser, setUserStatus } = authSlice.actions
export default authSlice.reducer
