// 指引向导中的 类型
export const guideTypeList = [
  {
    typeId: 'gitGetCode',
    name: '从git仓库获取代码',
    path: '/src/components/assembly/guide/gitGetCode'
  },
  {
    typeId: 'mavenCompile',
    name: 'maven编译',
    path: '/src/components/assembly/guide/mavenCompile'
  },
  {
    typeId: 'shellScript',
    name: '自定义shell脚本',
    path: '/src/components/assembly/guide/shellScript'
  },
  {
    typeId: 'addEvn',
    name: '添加环境变量',
    path: '/src/components/assembly/guide/addEvn'
  },
  {
    typeId: 'nodejsCompile',
    name: 'nodejs编译',
    path: '/src/components/assembly/guide/nodejsCompile'
  },
  {
    typeId: 'fortifyCheck',
    name: 'Fortify扫描',
    path: '/src/components/assembly/guide/fortifyCheck'
  },
  {
    typeId: 'findbugsCheck',
    name: 'FindBugs执行',
    path: '/src/components/assembly/guide/findbugsCheck'
  },
  {
    typeId: 'coberturaScan',
    name: 'cobertura扫描执行',
    path: '/src/components/assembly/guide/coberturaScan'
  },
  {
    typeId: 'archiveArtifacts',
    name: '归档成品',
    path: '/src/components/assembly/guide/archiveArtifacts'
  },
  {
    typeId: 'unArchiveArtifacts',
    name: '解档成品',
    path: '/src/components/assembly/guide/unArchiveArtifacts'
  },
  {
    typeId: 'buildAndpushImage',
    name: 'DockerBuildAndPush',
    path: '/src/components/assembly/guide/buildAndpushImage'
  },
  {
    typeId: 'kubenateDeploy',
    name: 'kubenate部署镜像',
    path: '/src/components/assembly/guide/kubenateDeploy'
  },
  {
    typeId: 'wartforInteractiveInput',
    name: '等待交互再做下一部操作',
    path: '/src/components/assembly/guide/wartforInteractiveInput'
  },
  {
    typeId: 'stash',
    name: 'stash文件,用来后续其他步骤',
    path: '/src/components/assembly/guide/stash'
  }

]

// 流水线管理
export const pipeline = [
  {
    id: '1314',
    name: '流水线1',
    codeHouse: 'BKJG/PARTY-MASSES/acount',
    prjName: '新建党群项目',
    modelName: '账号模块',
    lastBuildTime: '2018-8-11',
    lastBuildResult: '成功',
    createdPeople: '豆子',
    isShow: false,
    houseList: [
      {number: 26, time: '2018-4-11 14:38', info: '成功', people: '橘子'},
      {number: 30, time: '2018-4-12 14:38', info: '成功', people: '橘子'},
      {number: 67, time: '2018-4-8 12:38', info: '成功', people: '橘子'}
    ],
    yingyongList: [
      {yyName: 'dangfei-comsumer', time: '2018-4-11 14:38', url: '172.168.34.38', boxUrl: '172.168.34.28:01'},
      {yyName: 'dangfei-comsumer', time: '2018-4-11 14:38', url: '172.168.34.38', boxUrl: '172.168.34.28:01'},
      {yyName: 'dangfei-comsumer', time: '2018-4-11 14:38', url: '172.168.34.38', boxUrl: '172.168.34.28:01'},
    ]
  },
  {
    id: '1300',
    name: '流水线2',
    codeHouse: 'BKJG/PARTY-MASSES/acount',
    prjName: '新建党群项目',
    modelName: '账号模块',
    lastBuildTime: '2018-8-11',
    lastBuildResult: '成功',
    createdPeople: '胖子',
    isShow: false,
    houseList: [
      {number: 26, time: '2018-4-11 14:38', info: '成功', people: '橘子'},
      {number: 30, time: '2018-4-12 14:38', info: '成功', people: '橘子'},
      {number: 67, time: '2018-4-8 12:38', info: '成功', people: '橘子'}
    ],
    yingyongList: [
      {yyName: 'dangfei-comsumer', time: '2018-4-11 14:38', url: '172.168.34.38', boxUrl: '172.168.34.28:01'},
      {yyName: 'dangfei-comsumer', time: '2018-4-11 14:38', url: '172.168.34.38', boxUrl: '172.168.34.28:01'},
      {yyName: 'dangfei-comsumer', time: '2018-4-11 14:38', url: '172.168.34.38', boxUrl: '172.168.34.28:01'},
    ]
  }
]
