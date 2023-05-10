import { Box } from '@chakra-ui/react'
import { FC, useState } from 'react'

import { Auth } from '../modules/auth/Auth'
import { Registration } from '../modules/auth/Registration'

export const AuthPage: FC = () => {
	const [type, setType] = useState<'registration' | 'authentication'>(
		'authentication'
	)
	const handleChangeType = () => {
		setType(type === 'registration' ? 'authentication' : 'registration')
	}
	if (type === 'authentication') {
		return (
			<Box display="flex" justifyContent={'center'} mt="20px">
				<Auth onClick={handleChangeType} />
			</Box>
		)
	}
	if (type === 'registration') {
		return (
			<Box display="flex" justifyContent={'center'} mt="20px">
				<Registration onClick={handleChangeType} />
			</Box>
		)
	}
	return null
}
