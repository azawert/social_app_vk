import { useMutation } from 'react-query'

import useActions from '../../../hooks/useActions'
import { IRequestChangeStatus, UserService } from '../../../services/user'

export const useChangeStatus = () => {
	const { setUserStatus } = useActions()
	const { mutate, data } = useMutation(
		['updateUserStatus'],
		(data: IRequestChangeStatus) => UserService.changeUserStatus(data),
		{
			onSuccess(d) {
				setUserStatus(d.status)
			}
		}
	)
	return { mutate, data }
}
