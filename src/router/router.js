import { createRouter, createWebHistory } from "vue-router";
import Main from "@/pages/Main";
import PostPage from "@/pages/PostPage";
import About from "@/pages/About";
import PostDetail from "@/pages/PostDetail";

export const PathNames = {
    MAIN: '/',
    POSTS: '/posts',
    POST: '/posts/:id',
    ABOUT: '/about'
}

const routes = [
    {
        path: PathNames.MAIN,
        component: Main
    },
    {
        path: PathNames.POSTS,
        component: PostPage
    },
    {
        path: PathNames.POST,
        component: PostDetail
    },
    {
        path: PathNames.ABOUT,
        component: About
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;