// 路由配置
// 管控侧边栏显示的路由
export const asideRouter = [
{
	name: 'home',
	list: [
	{
		name: 'home',
		icon: 'ios-navigate',
		title: '首页',
		path: '/home'
	}
	]
},
{
	name: 'code',
	list: [
	{
		name: 'code',
		icon: 'ios-navigate',
		title: '代码管理仓库',
		path: '/code/manage'
	},
	{
		name: 'key',
		icon: 'search',
		title: 'SSH KEY管理',
		path: '/code/keycode'
	}
	]
},
{
	name: 'knowledge',
	list: [
	{
		name: 'knowledge',
		icon: 'ios-navigate',
		title: '知识库1',
		path: '/knowledge',
	},
	{
		name: 'knowledge2',
		icon: 'ios-navigate',
		title: '知识库知识库2',
		path: '/knowledge/2',
	},
	{
		name: 'knowledge3',
		icon: 'ios-navigate',
		title: '知识库知识库2',
		path: '/knowledge/3',
	},
	]
},
{
	name: 'assembly',
	list: [
	{
		name: 'assembly',
		icon: 'ios-navigate',
		title: '流水线管理',
		path: '/assembly',
	}
	]
}
]


export const headerRouter = [
{
	name: '1',
	value: '首页',
	path: 'http://www.baidu.com'
},
{
	name: '2',
	value: '敏捷管理',
	path: 'http://www.baidu.com'
},
{
	name: '3',
	value: '代码仓库管理',
	path: 'http://www.baidu.com'
},
{
	name: '4',
	value: '流水线',
	path: '/assembly'
},
{
	name: '6',
	value: '知识库',
	path: 'http://www.baidu.com'
},
]
