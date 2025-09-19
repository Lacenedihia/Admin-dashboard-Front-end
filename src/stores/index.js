
import { defineStore } from "pinia";
import axios from "axios";
import { BASE_URL } from "@/constants/constants.js";

export const useStore = defineStore("Store", {
    state: () => ({

        articles: [],
        articlesAdmin: [],
        loadingArticles: false,

    }),
    getters: {
        getArticles: (state) => state.articles,
        getArticlesAdmin: (state) => state.articlesAdmin,
        getLoadingArticles: (state) => state.loadingArticles,
        getArticleData: (state) => (id) => {
            const artic = state.articles.find((blog) => blog._id === id);
            return artic;
        },

    },
    actions: {

        fetchArticles() {
            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: `${BASE_URL}/articles/blogs`,
                withCredentials: true,
                headers: {
                    "Cache-Control": "no-cache", // or 'no-store'
                },
            };
            this.loadingArticles = true;
            axios
                .request(config)
                .then((response) => {
                    this.articles = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    this.loadingArticles = false;
                });
        },
        fetchArticlesAdmin() {
            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: `${BASE_URL}/articles/blogs/admin`,
                withCredentials: true,
                headers: {
                    "Cache-Control": "no-cache", // or 'no-store'
                },
            };
            this.loadingArticles = true;
            axios
                .request(config)
                .then((response) => {
                    this.articlesAdmin = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    this.loadingArticles = false;
                });
        }
    },
});
