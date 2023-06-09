import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './components/pages/TeamsList';
import UsersList from './components/pages/UsersList';
import PrismJsTest from './components/pages/PrismJsTest';
import TeamMembers from './components/teams/TeamMembers';
import UsersFooter from './components/pages/UsersFooter';
import TeamsFooter from './components/pages/TeamsFooter';
import NotFound from './components/pages/NotFound';


const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        // component: TeamsList,
        redirect: '/prism'
      },
      {
        name: 'teams',
        path: '/teams',
        meta: { needsAuth: true },
        components: {
          default: TeamsList,
          footer: TeamsFooter,
        },
        // alias: '/',
        children: [
          {
            name: "team-members",
            path: ':teamId',
            component: TeamMembers,
            props: true,
        },
        ]
      },
      {
        path: '/users',
        components: {
          default: UsersList,
          footer: UsersFooter,
        },
        beforeEnter(to, from, next){
          console.log('Users beforeEnter ', to, from);
          next();
        }
      },
      {
        path: '/prism',
        components: {
          default: PrismJsTest,
          // footer: UsersFooter,
        },
        beforeEnter(to, from, next){
          console.log('Users beforeEnter ', to, from);
          next();
        }
      },
      {
        path: '/:notFound(.*)',
        component: NotFound,
      }
    ],
    linkActiveClass: 'active',
    scrollBehavior(to, from, savedPosition) {
      // console.log("==",to, from, savedPosition);
  
      if(savedPosition){
        return savedPosition;
      }
    
      return {
        left:0,
        top: 0,
      }
    }
  });
  
  
  router.beforeEach(function(to, from, next) {
    console.log("Global beforeEach", to, from);
  
  
    if(to.meta.needsAuth){
      console.log('Needs auth!====');
      next();
    } else{
      next();
    }
  
    // if(to.name === 'team-members'){
    //   next();
    // } else{
    //   next({name: 'team-members', params: {teamId: 't2'}})
    // }
  
    // next();
  });
  
  router.afterEach((to, from) => {
    //Sending Analytics data
    console.log("Global afterEach ", to, from);
  });

  export default router;