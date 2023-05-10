import { Avatar, Box, Flex, Icon, Image, Spacer, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { FC } from 'react'
import { FaComment, FaHeart, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { useTypedSelector } from '../hooks/useTypedSelector'
import { IPost } from '../types/authenticate.type'
import { getImageUrl } from '../utils/getImageUrl'

interface IProps {
	post: IPost
	deleteClick: (id: number) => void
	likeClick: (id: number) => void
}

export const Post: FC<IProps> = ({ post, deleteClick, likeClick }) => {
	const { user } = useTypedSelector(state => state.rootReducer.authSlice)
	const isPostOfAuthenticatedUser = user?.id === post.createdBy.id
	const isPostLiked = post.postLikes.some(
		likedByUser => likedByUser.id === user?.id
	)

	const handleDeleteClick = () => {
		if (window.confirm('Вы уверены, что хотите удалить пост?')) {
			deleteClick(post.id)
		}
	}
	const handleLikeClick = () => {
		likeClick(post.id)
	}

	return (
		post && (
			<Box
				key={post.id}
				bg="white"
				p={4}
				mb={4}
				borderRadius="md"
				backgroundColor={'#EDF2F7'}
				border="1px"
			>
				<Flex alignItems="center" mb={2}>
					<Link to={`/profile/${post.createdBy.id}`}>
						<Avatar size="sm" src={getImageUrl(post?.createdBy.image)} mr={2} />
					</Link>
					<Flex flexDirection={'column'}>
						<Text fontWeight="bold">
							{post.createdBy?.firstName} {post.createdBy?.lastName}
						</Text>

						<Text color="gray.500">
							{format(new Date(post.createdAt), 'dd/MM/yyyy HH:mm')}
						</Text>
					</Flex>
				</Flex>
				{post.image && (
					<Flex>
						<Image src={getImageUrl(post.image)} />
					</Flex>
				)}
				<Text>{post.description}</Text>
				<Flex alignItems="center" mt={4}>
					<Flex alignItems="center" mr={4}>
						<Icon
							as={FaHeart}
							onClick={handleLikeClick}
							color={isPostLiked ? 'red.500' : 'gray.500'}
							fill={isPostLiked ? 'red.500' : 'gray.500'}
							stroke={isPostLiked ? 'red.500' : 'gray.500'}
						/>
						<Text ml={2}>{post.postLikes.length}</Text>
					</Flex>
					<Flex alignItems="center">
						<Icon as={FaComment} color="gray.500" />
						<Text ml={2}>{post.comments?.length}</Text>
					</Flex>
					{isPostOfAuthenticatedUser && (
						<>
							<Spacer />
							<Box onClick={handleDeleteClick}>
								<Icon as={FaTrashAlt} color="red.500" cursor="pointer" />
							</Box>
						</>
					)}
				</Flex>
			</Box>
		)
	)
}
