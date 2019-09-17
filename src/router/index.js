import Vue from 'vue'
import Router from 'vue-router'

import MainContent from '../components/content/maincontent'
import AssemblyManage from '../components/assembly/assemblymanage'
import AssemblyCreate from '../components/assembly/assemblycreate'
import AssemblyStep from '../components/assembly/assemblystep'
import AssemblyDetail from '../components/assembly/assemblyDetail'
import AssemblyBuilding from '../components/assembly/buildingDetail'

import AssemblyPreview from '../components/assembly/assemblypreview'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/assembly',
      component: MainContent
    },
    {
      path: '/assembly',
      name: 'assembly',
      component: MainContent,
      children: [
        {path: '/assembly', name: 'assembly', component: AssemblyManage},
        {path: '/assembly/create', name: 'assembly_create', component: AssemblyCreate},
        {path: '/assembly/step', name: 'assembly_step', component: AssemblyStep},
        {path: '/assembly/preview', name: 'assembly_step', component: AssemblyPreview},
        {path: '/assembly/detail', name: 'assembly_detail', component: AssemblyDetail},
        {path: '/assembly/build', name: 'assembly_build', component: AssemblyBuilding},
      ]
    },
  
  ]
})
