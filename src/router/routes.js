const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/signup',
    component: () => import('pages/SignupPage.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: () => import('pages/DashboardPage.vue'),
        meta: { title: 'Dashboard' },
      },
      {
        path: 'profile',
        component: () => import('pages/ProfilePage.vue'),
        meta: { title: 'My Profile' },
      },
      {
        path: 'users',
        component: () => import('pages/UsersPage.vue'),
        meta: { title: 'User Management' },
      },
      {
        path: 'courses',
        component: () => import('pages/CoursesPage.vue'),
        meta: { title: 'All Courses' },
      },
      {
        path: 'classes',
        component: () => import('pages/ClassesPage.vue'),
        meta: { title: 'My Classes' },
      },
      {
        path: 'attendance',
        component: () => import('pages/AttendancePage.vue'),
        meta: { title: 'Attendance' },
      },
      {
        path: 'payments',
        component: () => import('pages/PaymentsPage.vue'),
        meta: { title: 'Payments & Earnings' },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
