import { createRouter, createWebHistory } from 'vue-router'
import { globalAuthStore } from '@/stores/useAuth.js'
const routes = [
  {
    path: "/",
    redirect: "/login",
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
      requiresAuth: false,
    }
  },
  {
    path: "/blogs",
    name: "BlogsPage",
    component: () => import("@/views/blog/Blogpage.vue"),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: "/blog/:id",
    name: "DetailBlog",
    component: () => import("@/views/blog/Detailblog.vue"),
    meta: {
      title: "blog",
    },
  },

  {
    path: "/adminBlogs",
    name: "adminBlogs",
    component: () => import("@/views/Admin/Blog/AdminBlogs.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/addBlogs",
    name: "addBlogs",
    component: () => import("@/views/Admin/Blog/AddBlog.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/updateBlog/:id",
    name: "updateBlog",
    component: () => import("@/views/Admin/Blog/UpdateBlog.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/categories",
    name: "adminCategories",
    component: () => import("@/views/Categories/AdminCategories.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/updateCategory/:id",
    name: "updateCategory",
    component: () => import("@/views/Categories/UpdateCategory.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/addCategory",
    name: "addCategory",
    component: () => import("@/views/Categories/AddCategory.vue"),
    meta: {
      requiresAuth: false,
    },
  }, {
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

  if (to.meta.requiresAuth && firstRole !== 2001) {
    next('/login')
  } else {
    next()
  }
})
export default router