export interface IResponse {
	user: IUser
	token: string
}

export interface IUser {
	id: number
	createdAt: string
	updatedAt: string
	email: string
	password: string
	image: string
	phoneNumber?: string | null
	dateOfBirth?: string | null
	hometown?: string | null
	university?: string | null
	status: string | null
	firstName: string
	lastName: string
	middleName?: string | null
	friends: IFriendUser[]
	posts: IPost[]
	comments: IComment[]
}

export interface IResponseRegistration {
	createdUser: IUser
	token: string
}

export interface IFriendUser {
	id: number
	createdAt: string
	updatedAt: string
	email: string
	password: string
	image: string
	phoneNumber?: string
	dateOfBirth?: string | null
	hometown?: string
	university?: string
	status?: string
	firstName: string
	lastName: string
	middleName?: string
	comments?: IComment[]
	friends?: IUser[]
	posts?: IPost[]
}

export interface IComment {
	id: number
	createdAt: string
	updatedAt: string
	description: string
	userId: number
	postId: number
	createdBy: ICreatorComment
}

export interface IPost {
	id: number
	createdAt: string
	updatedAt: string
	description: string
	image?: string
	userId: number
	comments: Comment[]
	createdBy: ICreatorPost
	postLikes: IPostLikeUser[]
}

export interface ICreatorPost {
	id: number
	createdAt: string
	updatedAt: string
	email: string
	password: string
	image: string
	phoneNumber?: string | null
	dateOfBirth?: Date | null
	hometown?: string | null
	university?: string | null
	status?: string | null
	firstName: string
	lastName: string
	middleName?: string | null
}
export interface ICreatorComment {
	id: number
	createdAt: string
	updatedAt: string
	email: string
	password: string
	image: string
	phoneNumber?: string | null
	dateOfBirth?: Date | null
	hometown?: string | null
	university?: string | null
	status?: string | null
	firstName: string
	lastName: string
	middleName?: string | null
}
export interface IPostLikeUser {
	id: number
	createdAt: string
	updatedAt: string
	email: string
	password: string
	image: string
	phoneNumber?: string | null
	dateOfBirth?: Date | null
	hometown?: string | null
	university?: string | null
	status?: string | null
	firstName: string
	lastName: string
	middleName?: string | null
}

export interface IRequestPostCreation {
	description: string
	image?: File | null
}

export interface IResponsePostCreation {
	id: number
	createdAt: string | Date
	updatedAt: string | Date
	description: string
	image?: string | null
	userId: number
}
