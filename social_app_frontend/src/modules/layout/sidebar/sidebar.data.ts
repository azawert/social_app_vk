interface ISidebarData {
	label: string
	linkTo: string
}

export const sideBarData: ISidebarData[] = [
	{ label: 'Мои друзья', linkTo: '/my-friends' },
	{ label: 'Мои новости', linkTo: '/news-feed' },
	{ label: 'Поиск людей', linkTo: '/search' }
]
