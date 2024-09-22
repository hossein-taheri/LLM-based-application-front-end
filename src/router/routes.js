const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/IndexPage.vue')},
      {path: 'chat-page', component: () => import('pages/ChatPage.vue')},
    ]
  },
  {
    path: '/auth/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {path: 'sign-in', component: () => import('pages/SignInPage.vue')},
      {path: 'sign-up', component: () => import('pages/SignUpPage.vue')},
      {path: 'forgot-password', component: () => import('pages/ForgotPasswordPage.vue')},
      {path: 'verify-email', component: () => import('pages/VerifyEmailPage.vue')},
      {path: 'set-new-password', component: () => import('pages/SetNewPasswordPage.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
