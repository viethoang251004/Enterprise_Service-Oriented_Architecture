import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/seller',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'books',
		label: 'Books',
		path: 'books',
		icon: <HiOutlineCube />
	},
	{
		key: 'orders',
		label: 'Orders',
		path: 'orders',
		icon: <HiOutlineShoppingCart />
	},
	
	{
		key: 'balance',
		label: 'Balance',
		path: 'balance',
		icon: <HiOutlineDocumentText />
	},
	// {
	// 	key: 'messages',
	// 	label: 'Messages',
	// 	path: '/messages',
	// 	icon: <HiOutlineAnnotation />
	// }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: 'settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: 'support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]