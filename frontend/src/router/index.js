import Vue from 'vue'
import Router from 'vue-router'
import GameMain from '@/components/GameMain'
import ItemPage from '@/components/ItemPage'
import PetCandidates from '@/components/PetCandidates'
import BlankForJump from '@/components/FUnction-BlankForJump'
import MatchRateReport from '@/components/MatchRateReport'
import Welcome from '@/components/Welcome'
import Login from '@/components/Login'
import Questionnaire from '@/components/Questionnaire'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/GameMain',
      name: 'GameMain',
      component: GameMain
    },
    {
      path: '/ItemPage',
      name: 'ItemPage',
      component: ItemPage
    },
    {
      path: '/BlankForJump',
      name: 'BlankForJump',
      component: BlankForJump
    },
    {
      path: '/MatchRateReport',
      name: 'MatchRateReport',
      component: MatchRateReport
    },
    {
      path: '/PetCandidates',
      name: 'PetCandidates',
      component: PetCandidates
    },
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/Questionnaire',
      name: 'Questionnaire',
      component: Questionnaire
    },
    // {
    //   path: '/',
    //   name: 'Login',
    //   component: Login
    // }
  ]
})
