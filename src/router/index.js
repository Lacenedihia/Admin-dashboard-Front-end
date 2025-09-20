import { createRouter, createWebHistory } from 'vue-router'
import { globalAuthStore } from '@/stores/useAuth.js'

const routes = [
  {
    path: "/",
    redirect: () => {
      // Check if user is authenticated
      const firstRole = globalAuthStore.auth.value?.roles?.[0]
      return firstRole === 2001 ? '/dashboard' : '/login'
    },
  },
  {
    path: "/login",
    name: "LoginComponent",
    component: () => import("@/views/Login.vue"),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: "/register",
    name: "registerr",
    component: () => import("@/views/reg.vue"),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/dashboard.vue"),
    meta: {
      requiresAuth: true, // Changed to true
    }
  },
  {
    path: "/blogs",
    name: "BlogsPage",
    component: () => import("@/views/blog/Blogpage.vue"),
    meta: {
      requiresAuth: false, // Keep false if blogs should be public
    }
  },
  {
    path: "/blog/:id",
    name: "DetailBlog",
    component: () => import("@/views/blog/Detailblog.vue"),
    meta: {
      title: "blog",
      requiresAuth: false, // Keep false if blog details should be public
    },
  },
  {
    path: "/adminBlogs",
    name: "adminBlogs",
    component: () => import("@/views/Admin/Blog/AdminBlogs.vue"),
    meta: {
      requiresAuth: true, // Changed to true - admin routes should be protected
    },
  },
  {
    path: "/addBlogs",
    name: "addBlogs",
    component: () => import("@/views/Admin/Blog/AddBlog.vue"),
    meta: {
      requiresAuth: true, // Changed to true
    },
  },
  {
    path: "/updateBlog/:id",
    name: "updateBlog",
    component: () => import("@/views/Admin/Blog/UpdateBlog.vue"),
    meta: {
      requiresAuth: true, // Changed to true
    },
  },
  {
    path: "/categories",
    name: "adminCategories",
    component: () => import("@/views/Categories/AdminCategories.vue"),
    meta: {
      requiresAuth: true, // Changed to true
    },
  },
  {
    path: "/updateCategory/:id",
    name: "updateCategory",
    component: () => import("@/views/Categories/UpdateCategory.vue"),
    meta: {
      requiresAuth: true, // Changed to true
    },
  },
  {
    path: "/addCategory",
    name: "addCategory",
    component: () => import("@/views/Categories/AddCategory.vue"),
    meta: {
      requiresAuth: true, // Changed to true
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const firstRole = globalAuthStore.auth.value?.roles?.[0]
  const isAuthenticated = firstRole === 2001

  // If route requires auth and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  }
  // If user is authenticated and trying to access login/register
  else if (isAuthenticated && (to.name === 'LoginComponent' || to.name === 'registerr')) {
    next('/dashboard')
  }
  else {
    next()
  }
})

export default router