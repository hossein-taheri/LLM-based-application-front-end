const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/IndexPage.vue')},
      {path: 'chat-page', component: () => import('pages/ChatPage.vue')},
      {path: 'auth/sign-in', component: () => import('pages/SignInPage.vue')},
      {path: 'auth/sign-up', component: () => import('pages/SignUpPage.vue')},
      {path: 'auth/forgot-password', component: () => import('pages/ForgotPasswordPage.vue')},
      {path: 'auth/verify-email', component: () => import('pages/VerifyEmailPage.vue')},
      {path: 'auth/set-new-password', component: () => import('pages/SetNewPasswordPage.vue')},
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
