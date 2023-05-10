import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	FormControl,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Skeleton,
	SkeletonCircle,
	Text
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { FaTimes, FaUpload } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

import { useCreatePost } from '../../hooks/useCreatePost'
import { useDeletePost } from '../../hooks/useDeletePost'
import { useFriendAction } from '../../hooks/useFriendAction'
import { useLikePost } from '../../hooks/useLikePost'
import { usePosts } from '../../hooks/usePosts'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Post } from '../../shared/Post'
import { getImageUrl } from '../../utils/getImageUrl'

import { useProfile } from './hooks/getUserProfile'
import { useChangeStatus } from './hooks/useChangeStatus'

export const Profile = () => {
	const { id } = useParams()
	const { data, isLoading } = useProfile(Number(id))
	const { data: posts } = usePosts(Number(id))
	const {
		mutate: createPost,
		isLoading: isLoadingCreatePost,
		isSuccess: isCreationOfPostSuccess
	} = useCreatePost()
	const { mutate: likePost } = useLikePost()
	const { mutate: changeStatus, data: status } = useChangeStatus()
	const { user } = useTypedSelector(state => state.rootReducer.authSlice)
	const isPageOfAuthenticatedUser = data?.id === user?.id
	const [IsStatusEditing, setIsStatusEditing] = useState(false)
	const [newStatusValue, setNewStatusValue] = useState('')
	const [showDeleteIcon, setShowDeleteIcon] = useState(false)
	const [newPostDescription, setNewPostDescription] = useState<string>('')
	const [newPostImage, setNewPostImage] = useState<File | null>(null)
	const imageInputRef = useRef<HTMLInputElement>(null)
	const { mutate: deletePost } = useDeletePost()
	const { mutate: actionFriend, isLoading: isLoadingActionFriend } =
		useFriendAction()

	const handleStatusClick = () => {
		setIsStatusEditing(prev => !prev)
	}
	const handleChangeInputNewPost = (e: ChangeEvent<HTMLInputElement>) => {
		setNewPostDescription(e.target.value)
	}
	const handleChangeImageNewPost = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		setNewPostImage(e.target.files[0])
	}
	const handleUploadImageClick = () => {
		imageInputRef.current?.click()
	}
	const handleDeleteIconClick = () => {
		setNewPostImage(null)
	}
	const handleClickOnFriendButton = () => {
		actionFriend(Number(id))
	}
	const handleCreatePostClick = () => {
		const formData = new FormData()
		if (newPostImage) {
			formData.append('image', newPostImage)
		}
		formData.append('description', newPostDescription)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		createPost(formData)
	}
	const onStatusFormSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (newStatusValue.trim().length === 0) return
		changeStatus({ status: newStatusValue })
		setIsStatusEditing(false)
	}
	const handleChangeStatusValue = (e: ChangeEvent<HTMLInputElement>) => {
		setNewStatusValue(e.target.value)
	}
	useEffect(() => {
		if (isCreationOfPostSuccess) {
			setNewPostDescription('')
			setNewPostImage(null)
		}
	}, [isCreationOfPostSuccess])
	const isUserInFriendListAlready = user?.friends.some(
		friend => friend.id === Number(id)
	)

	if (isLoading) {
		return (
			<Box maxW="xl" mx="auto" p={4}>
				<Flex alignItems="center">
					<SkeletonCircle size="sm" mb={4} />
					<Skeleton height="60px" mb={4} />
				</Flex>

				<Skeleton height="20px" mb={2} />
				<Skeleton height="20px" mb={2} />
				<Skeleton height="20px" mb={4} />
				<Divider my={4} />
				<Skeleton height="20px" mb={4} />
				<Skeleton height="100px" mb={4} />
			</Box>
		)
	}
	if (!data || !id) {
		return (
			<Box>
				<Text>Ошибка при получении пользователя</Text>
			</Box>
		)
	}
	return (
		<Box maxW="xl" mx="auto" p={4}>
			<Flex alignItems="center">
				<Avatar size="xl" src={getImageUrl(data.image)} mr={4} />
				<Box>
					<Text fontSize="3xl" fontWeight="bold">
						{data?.firstName} {data?.lastName}
					</Text>
					<Text color="gray.500">
						{isPageOfAuthenticatedUser ? (
							!IsStatusEditing ? (
								<Text
									onClick={handleStatusClick}
									placeholder="Здесь мог быть ваш статус..."
								>
									{status?.status ?? data?.status}
								</Text>
							) : (
								<form onSubmit={onStatusFormSubmit}>
									<InputGroup>
										<Input
											placeholder="Введите ваш статус..."
											border={0}
											focusBorderColor={'transparent'}
											onChange={handleChangeStatusValue}
										/>
										<Button variant={'unstyled'} onClick={handleStatusClick}>
											Отмена
										</Button>
									</InputGroup>
								</form>
							)
						) : (
							data?.status
						)}
					</Text>
					{data.university && <Text>Вуз: {data.university}</Text>}
					{data.hometown && <Text>Родной город: {data.hometown}</Text>}
					{data.dateOfBirth && (
						<Text>
							Дата рождения: {format(new Date(data.dateOfBirth), 'dd/MM/yyyy')}
						</Text>
					)}
				</Box>
			</Flex>
			{!isPageOfAuthenticatedUser && (
				<Box mt="10px">
					<Button
						onClick={handleClickOnFriendButton}
						isLoading={isLoadingActionFriend}
					>
						{isUserInFriendListAlready
							? 'Удалить из друзей'
							: 'Добавить в друзья'}
					</Button>
				</Box>
			)}
			<Divider my={4} />
			{isPageOfAuthenticatedUser && (
				<FormControl>
					<Flex>
						<InputGroup
							display={'flex'}
							alignItems={'center'}
							justifyContent={'center'}
							border="1px"
							borderRadius="lg"
						>
							<InputRightElement
								children={<FaUpload color="gray.300" />}
								onClick={handleUploadImageClick}
							/>
							<Input
								placeholder="Что у вас нового?"
								mr={2}
								value={newPostDescription}
								onChange={handleChangeInputNewPost}
								border="0"
								focusBorderColor="transparent"
							/>
							<Input
								type="file"
								ref={imageInputRef}
								display={'none'}
								onChange={handleChangeImageNewPost}
							/>
						</InputGroup>
						<Button
							colorScheme="blue"
							ml={'10px'}
							onClick={handleCreatePostClick}
							isLoading={isLoadingCreatePost}
						>
							Отправить
						</Button>
					</Flex>
					{newPostImage && (
						<Flex alignItems={'center'}>
							<Text>Ваше изображение для поста:</Text>
							<Box
								position="relative"
								onMouseEnter={() => setShowDeleteIcon(true)}
								onMouseLeave={() => setShowDeleteIcon(false)}
							>
								<Image
									src={URL.createObjectURL(newPostImage)}
									w="50px"
									borderRadius="lg"
									mt="10px"
									ml="10px"
								/>
								{showDeleteIcon && (
									<Box
										position="absolute"
										top="0"
										right="0"
										p="1"
										bg="white"
										borderRadius="full"
										onClick={handleDeleteIconClick}
										cursor={'pointer'}
									>
										<FaTimes />
									</Box>
								)}
							</Box>
						</Flex>
					)}
				</FormControl>
			)}
			<Box mt={4}>
				{posts?.length && posts?.length > 0 ? (
					posts?.map(post => (
						<Post
							post={post}
							key={post.id}
							deleteClick={deletePost}
							likeClick={likePost}
						/>
					))
				) : isPageOfAuthenticatedUser ? (
					<Text>У вас пока нет никаких постов</Text>
				) : (
					<Text>Тут пока нет постов :(</Text>
				)}
			</Box>
		</Box>
	)
}
