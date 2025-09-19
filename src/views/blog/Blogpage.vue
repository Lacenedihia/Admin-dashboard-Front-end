<template>
    <router-link to='/login'> <div class="container">
  <a href="#" class="button type--C">
    <div class="button__line"></div>
    <div class="button__line"></div>
    <span class="button__text">Back</span>
    <div class="button__drow1"></div>
    <div class="button__drow2"></div>
  </a>
</div></router-link>


    <div class="blogs-page">
        <section id="" class="search-container">
            <div class="center-side">
                <h1>Insights from our team</h1>
                <p>Powerful Trading Tools and Features for Experienced Investors</p>

                <input class="srchbtn" type="text" :placeholder="'Search Resources...'" v-model="searchQuery" />

                <div class="trending-section">
                    <div class="trending-header">
                        <span class="title">Popular searches:</span>
                        <div class="topics-container">
                            <span
                                class="topics"
                                v-for="category in trendingCategoriesList"
                                :class="{ 'trending-actif': $route.query.category === category.category }"
                                @click="
                                    getByCategory(category._id);
                                    getCategoryName(category.category);
                                "
                                :key="category._id"
                                >{{ category.category }}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Problem start here -->

        <section class="blogs-container">
            <div>
                <div class="blog-cards">
                    <div class="article-card-wrapper-main">
                        <!-- Featured Article (First Card) -->

                        <div v-if="$route.query.category === 'All' && filteredArticles.length > 0" class="featured-article-card">
                            <div class="featured-image-container">
                                <div class="featured-image-container">
                                    <img loading="lazy" decoding="async" :src="getImgUrl(filteredArticles[0].image)" :alt="filteredArticles[0].title" />
                                </div>
                            </div>
                            <router-link :to="`/blog/${filteredArticles[0]._id}`">
                                <div class="featured-content">
                                    <h2>{{ filteredArticles[0].title }}</h2>
                                    <p>Our top read article this week</p>
                                    <!-- <p>{{ filteredArticles[0].description }}</p>-->
                                    <div class="featured-read-more">Continue reading</div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <div class="article-card-wrapper-main">
                        <!-- Regular Articles -->
                        <div class="regular-articles-grid">
                            <ArticleCardBlog
                                v-for="article in $route.query.category === 'All' ? filteredArticles.slice(1) : filteredArticles"
                                :key="article._id"
                                :id="article._id"
                                :author="article.author"
                                :image="article.image"
                                :description="article.description"
                                :title="article.title"
                                :category="article.category.category"
                                :time="article.reading_time"
                                :text="article.text"
                                :date="getDate(article.date)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
 
</template>

<script>


import ArticleCardBlog from "@/components/ArticleCardBlog.vue";
import axios from "axios";
import { BASE_URL } from "@/constants/constants.js";

import avatarblog from "@/assets/user.png";
export default {
    name: "BlogsPage",
    components: {
        // articleCard,
        // Carousel,
        //Slide,
        ArticleCardBlog,
        // LoaderComponent
    },
    data() {
        return {
            grid: false,

            loading: false,
            title: "",

            articlesList: [],
            searchQuery: "",

            trendingCategoriesList: [],
            loadingCategories: true,
             currentPage: 1,
        totalPages: 0,
        isFetching: false,
         
      
      
    
        
     
        };
    },
    computed: {
        articles() {
            return this.Store.getArticles;
        },
        loadingArticles() {
            return this.Store.getLoadingArticles;
        },

          filteredArticles() {
        // Add a check to ensure articlesList exists before filtering
        const articlesToFilter = this.articlesList || [];
        return articlesToFilter.filter((article) =>
            article.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    },
    },
   
mounted() {
    this.getAllArticles(); // Start the initial fetch
    this.$router.push({ query: { category: "All" } });
    this.getCategories();
    this.getTrendingCategories();
    window.addEventListener('scroll', this.handleScroll); // Add scroll listener
},

beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll); // Clean up
},
    methods: {
         getImgUrl(imgFileId) {
            if (imgFileId) {
                var image = `${BASE_URL}/articles/image/${imgFileId}`;
                return image;
            }
            return avatarblog;
        },
        getDate(str) {
            const date = new Date(str);

            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
            };

            const formattedDate = date.toLocaleDateString("en-US", options);
            return formattedDate;
        },
        getCategoryName(categoryName) {
            this.$router.push({ query: { category: categoryName } });
        },
       
        getByCategory(id) {
            this.loading = true;
            this.category = id;
            axios
                .post(
                    `${BASE_URL}/articles/data-category`,
                    { category: this.category },
                    {
                        withCredentials: true,
                    },
                )
                .then((response) => (this.Store.articles = response.data))
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
       
        getCategories() {
            axios
                .get(`${BASE_URL}/categories/`, {
                    withCredentials: true,
                })
                .then((response) => (this.categoriesList = response.data.categories))
                .catch((err) => {
                    console.log(err);
                });
        },

        getTrendingCategories() {
            axios
                .get(`${BASE_URL}/categories/`, {
                    withCredentials: true,
                })
                .then((response) => (this.trendingCategoriesList = response.data.categories.slice(0, 3)))
                .catch((err) => {
                    console.log(err);
                });
        },
        sendContactUs() {
            this.loading = true;
            let contactForm = {
                email: this.email,
                name: this.name,
                title: this.title,
                message: this.message,
            };
            axios
                .post(`${BASE_URL}/contact-us`, contactForm, {
                    withCredentials: true,
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                    this.email = "";
                    this.name = "";
                    this.title = "Report a bug";
                    this.message = "";
                });
        },
     async getAllArticles(page = 1) {
        if (this.isFetching) return;
        this.isFetching = true;
        this.loading = true;

        try {
            const response = await axios.get(
                `${BASE_URL}/articles/data?page=${page}`,
                { withCredentials: true }
            );

        
                // Infinite scroll: append new articles
                this.articlesList = [...this.articlesList, ...response.data.articles];
            

            this.totalPages = response.data.totalPages;
            // The backend controller should return the current page, or you can just use `page`
            // this.currentPage = response.data.currentPage; 
            this.currentPage = page;

        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            this.isFetching = false;
            this.loading = false;
        }
    },

    async loadMoreArticles() {
        if (this.currentPage >= this.totalPages || this.isFetching) {
            console.log("No more pages to load or already fetching.");
            return;
        }
        
        // Fetch the next page by passing the incremented page number
        this.getAllArticles(this.currentPage + 1);
    },

    handleScroll() {
        const nearBottom = window.innerHeight + window.scrollY + 1500 >= document.body.offsetHeight -200;
        if (nearBottom) {
            this.loadMoreArticles();
        }
    },

    },
 
};
</script>

<style scoped>
a{text-decoration: none;}
.srchbtn {
    margin-top: 15px;
    /* or whatever */
    margin-bottom: 30px;
    width: 40%;
    border-radius: 6px;
    outline: none;

    &:focus {
        border: 1.5px solid #2196f3;
    }
}

.blogs-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 45px;
    width: 100%;
    background: #fff;
}

.search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8rem 0rem 0rem 0rem;
    width: 100%;
    flex-direction: column;
    height: auto;
}

.search-container p {
    color: #231f3e;
    font-family: Roboto;
    font-size: 15px;
    font-weight: 300;
    margin-bottom: 15px;
    line-height: 10px;
    text-align: justify;
}

.search-container h1 {
    color: #1e1e1e;
    font-family: Roboto;
    font-size: 55px;
    font-weight: 700;
    margin-bottom: 15px;
}

.center-side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
}

input {
    width: 70%;
    border-radius: 60px;
    border: 1px solid #dadada;
    background: #fff;
    padding: 0.5rem;
}

.blogs-container {
    display: flex;
    justify-content: center;
    width: 80%;
    row-gap: 20px;
  
    padding: 2rem 2rem;
    /* Explicitly set alignment */
}


.blogs-filtering {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.topics-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-bottom: 3rem;
}

.trending-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.trending-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 15px;
}

.title {
    color: #7d7d7d;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    white-space: nowrap;
}

.topics-container {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 15px;
}

.topics {
    border-radius: 6px;
    background: #f3f4f6;
    color: #797979;
    font-family: Roboto;
    font-size: 13px;
    font-weight: 300;
    padding: 3px 10px;
    cursor: pointer;
    white-space: nowrap;
}

.topics:hover {
    background: rgb(229 231 235);
}

.trending-actif {
    background: rgb(229 231 235);
}

.topics-list > a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    padding: 8px 16px;
    font-size: 14px;
    border: 2px solid #e3e3e3;
    transition: all 0.3s ease;
    text-decoration: none;
    color: inherit;
}

.blog-cards {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 50px;
}

.article-card-wrapper {
    display: flex;
    width: 50%;
    flex-direction: column;
}

.article-card-wrapper-main {
    display: flex;
    width: 100%;
    flex-direction: column;
    row-gap: 50px;
    align-items: stretch;
    margin-top: 50px;
    /* Makes children fill full width */
}

/* Desktop styles */

/* Mobile styles */
@media (max-width: 768px) {
    .blogs-container {
        width: 90%;
        flex-direction: column;
    }

    .article-card-wrapper-main {
        margin-top: 0px;
    }
    .featured-image-container img {
        width: 120%;
    }
}

/* For the grid layout when category is All */
.article-card-wrapper.all-category {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

.featured-article {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;
    border-radius: 1.5rem;
}

/* Regular article card styling */
.article-card {
    /* Your existing card styles */
    height: 100%;
}

/* Make sure the featured article has different styling */
.featured-article .article-card {
    height: auto;
    min-height: 400px;
    /* Adjust as needed */
}

/* Responsive adjustments */
@media (max-width: 1024px) {
    .article-card-wrapper.all-category {
        grid-template-columns: repeat(2, 1fr);
    }

    .featured-article {
        grid-column-end: 3;
    }
}

@media (max-width: 768px) {
    .article-card-wrapper.all-category {
        grid-template-columns: 1fr;
    }

    .featured-article {
        grid-column-end: 2;
        grid-row-end: 2;
    }
}

/* Featured Article Styling */
.featured-article-card {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 40px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #ffffff;
    width: 89%;
    align-self: center;
    box-shadow: #eaecee 0.3px 1.5px 1.3px 0.3px;
}

.featured-image-container {
    width: 95%;
}

.featured-image-container img {
    width: 90%;
    height: auto;
    max-height: 16rem;
    object-fit: cover;
    border-radius: 1.5rem;
    border-style: solid;
    border-width: 10px 10px;
    border-color: #f9f9f9;
    box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    margin-top: 40px;
}

.featured-content {
    padding: 30px;
    text-align: start;
}

.featured-content h2 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #1e1e1e;
    /* Remove text-align: start since parent has it now */
}

.featured-content p {
    font-size: 18px;
    line-height: 1.6;
    color: #7d7d7d;
    margin-bottom: 24px;
    /* Remove text-align: start since parent has it now */
}

.featured-read-more {
    display: inline-block;
    /* Change to inline-block for proper alignment */
    margin-top: 50px;
    color: #3789ff;
    font-weight: 600;
    font-size: 16px;
    text-decoration: none;
    /* Remove align-items: start as it's not needed with inline-block */
    /* Remove text-align: start since parent has it now */
    position: relative;
    /* For arrow positioning */
    padding-right: 24px;
    /* Space for arrow */
}

.featured-read-more::after {
    content: "→";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 8px;
    transition: transform 0.3s ease;
}

.featured-read-more:hover::after {
    transform: translateY(-50%) translateX(4px);
}

/* Regular Articles Grid */
.regular-articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    align-items: start;

    /* Align items at the start */
}

@media (max-width: 1024px) {
    .featured-content h2 {
        font-size: 28px;
    }
}

@media (max-width: 768px) {
    .featured-article-card {
        margin-bottom: 30px;
    }

    .featured-content {
        padding: 20px;
    }

    .featured-content h2 {
        font-size: 24px;
    }

    .featured-content p {
        font-size: 16px;
    }

    .regular-articles-grid {
        grid-template-columns: 1fr;
    }

    .featured-article-card {
        flex-direction: column;
    }

    .center-side p {
        text-align: center;
        line-height: 15px;
        margin-left: 5px;
        margin-right: 5px;
    }

    .srchbtn {
        display: none;
    }
}

.type--A {
  --line_color: #555555;
  --back_color: #ffecf6;
}
.type--B {
  --line_color: #1b1919;
  --back_color: #e9ecff;
}
.type--C {
  --line_color: #00135c;
  --back_color: #defffa;
}
.button {
  position: relative;
  z-index: 0;
  width: 240px;
  height: 56px;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  color: var(--line_color);
  letter-spacing: 2px;
  transition: all 0.3s ease;
}
.button__text {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.button::before,
.button::after,
.button__text::before,
.button__text::after {
  content: "";
  position: absolute;
  height: 3px;
  border-radius: 2px;
  background: var(--line_color);
  transition: all 0.5s ease;
}
.button::before {
  top: 0;
  left: 54px;
  width: calc(100% - 56px * 2 - 16px);
}
.button::after {
  top: 0;
  right: 54px;
  width: 8px;
}
.button__text::before {
  bottom: 0;
  right: 54px;
  width: calc(100% - 56px * 2 - 16px);
}
.button__text::after {
  bottom: 0;
  left: 54px;
  width: 8px;
}
.button__line {
  position: absolute;
  top: 0;
  width: 56px;
  height: 100%;
  overflow: hidden;
}
.button__line::before {
  content: "";
  position: absolute;
  top: 0;
  width: 150%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 300px;
  border: solid 3px var(--line_color);
}
.button__line:nth-child(1),
.button__line:nth-child(1)::before {
  left: 0;
}
.button__line:nth-child(2),
.button__line:nth-child(2)::before {
  right: 0;
}
.button:hover {
  letter-spacing: 6px;
}
.button:hover::before,
.button:hover .button__text::before {
  width: 8px;
}
.button:hover::after,
.button:hover .button__text::after {
  width: calc(100% - 56px * 2 - 16px);
}
.button__drow1,
.button__drow2 {
  position: absolute;
  z-index: -1;
  border-radius: 16px;
  transform-origin: 16px 16px;
}
.button__drow1 {
  top: -16px;
  left: 40px;
  width: 32px;
  height: 0;
  transform: rotate(30deg);
}
.button__drow2 {
  top: 44px;
  left: 77px;
  width: 32px;
  height: 0;
  transform: rotate(-127deg);
}
.button__drow1::before,
.button__drow1::after,
.button__drow2::before,
.button__drow2::after {
  content: "";
  position: absolute;
}
.button__drow1::before {
  bottom: 0;
  left: 0;
  width: 0;
  height: 32px;
  border-radius: 16px;
  transform-origin: 16px 16px;
  transform: rotate(-60deg);
}
.button__drow1::after {
  top: -10px;
  left: 45px;
  width: 0;
  height: 32px;
  border-radius: 16px;
  transform-origin: 16px 16px;
  transform: rotate(69deg);
}
.button__drow2::before {
  bottom: 0;
  left: 0;
  width: 0;
  height: 32px;
  border-radius: 16px;
  transform-origin: 16px 16px;
  transform: rotate(-146deg);
}
.button__drow2::after {
  bottom: 26px;
  left: -40px;
  width: 0;
  height: 32px;
  border-radius: 16px;
  transform-origin: 16px 16px;
  transform: rotate(-262deg);
}
.button__drow1,
.button__drow1::before,
.button__drow1::after,
.button__drow2,
.button__drow2::before,
.button__drow2::after {
  background: var(--back_color);
}
.button:hover .button__drow1 {
  animation: drow1 ease-in 0.06s;
  animation-fill-mode: forwards;
}
.button:hover .button__drow1::before {
  animation: drow2 linear 0.08s 0.06s;
  animation-fill-mode: forwards;
}
.button:hover .button__drow1::after {
  animation: drow3 linear 0.03s 0.14s;
  animation-fill-mode: forwards;
}
.button:hover .button__drow2 {
  animation: drow4 linear 0.06s 0.2s;
  animation-fill-mode: forwards;
}
.button:hover .button__drow2::before {
  animation: drow3 linear 0.03s 0.26s;
  animation-fill-mode: forwards;
}
.button:hover .button__drow2::after {
  animation: drow5 linear 0.06s 0.32s;
  animation-fill-mode: forwards;
}
@keyframes drow1 {
  0% {
    height: 0;
  }
  100% {
    height: 100px;
  }
}
@keyframes drow2 {
  0% {
    width: 0;
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  11% {
    opacity: 1;
  }
  100% {
    width: 120px;
  }
}
@keyframes drow3 {
  0% {
    width: 0;
  }
  100% {
    width: 80px;
  }
}
@keyframes drow4 {
  0% {
    height: 0;
  }
  100% {
    height: 120px;
  }
}
@keyframes drow5 {
  0% {
    width: 0;
  }
  100% {
    width: 124px;
  }
}

.container {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.button:not(:last-child) {
  margin-bottom: 64px;
}







.type--A {
  --line_color: #555555;
  --back_color: #ffecf6;
}
.type--B {
  --line_color: #1b1919;
  --back_color: #e9ecff;
}
.type--C {
  --line_color: #00135c;
  --back_color: #defffa;
}
.button {
  position: relative;
  z-index: 0;
  width: 240px;
  height: 56px;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  color: var(--line_color);
  letter-spacing: 2px;
  transition: all 0.3s ease;
}
.button__text {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.button::before,
.button::after,
.button__text::before,
.button__text::after {
  content: "";
  position: absolute;
  height: 3px;
  border-radius: 2px;
  background: var(--line_color);
  transition: all 0.5s ease;
}
.button::before {
  top: 0;
  left: 54px;
  width: calc(100% - 56px * 2 - 16px);
}
.button::after {
  top: 0;
  right: 54px;
  width: 8px;
}
.button__text::before {
  bottom: 0;
  right: 54px;
  width: calc(100% - 56px * 2 - 16px);
}
.button__text::after {
  bottom: 0;
  left: 54px;
  width: 8px;
}
.button__line {
  position: absolute;
  top: 0;
  width: 56px;
  height: 100%;
  overflow: hidden;
}
.button__line::before {
  content: "";
  position: absolute;
  top: 0;
  width: 150%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 300px;
  border: solid 3px var(--line_color);
}
.button__line:nth-child(1),
.button__line:nth-child(1)::before {
  left: 0;
}
.button__line:nth-child(2),
.button__line:nth-child(2)::before {
  right: 0;
}
.button:hover {
  letter-spacing: 6px;
}
.button:hover::before,
.button:hover .button__text::before {
  width: 8px;
}
.button:hover::after,
.button:hover .button__text::after {
  width: calc(100% - 56px * 2 - 16px);
}
.button__drow1,
.button__drow2 {
  position: absolute;
  z-index: -1;
  border-radius: 16px;
  transform-origin: 16px 16px;
}
.button__drow1 {
  top: -16px;
  left: 40px;
  width: 32px;
  height: 0;
  transform: rotate(30deg);
}
.button__drow2 {
  top: 44px;
  left: 77px;
  width: 32px;
  height: 0;
  transform: rotate(-127deg);
}
.button__drow1::before,
.button__drow1::after,
.button__drow2::before,
.button__drow2::after {
  content: "";
  position: absolute;
}
.button__drow1::before {
  bottom: 0;
  left: 0;
  width: 0;
  height: 32px;
  border-radius: 16px;
  transform-origin: 16px 16px;
  transform: rotate(-60deg);
}
.button__drow1::after {
  top: -10px;
  left: 45px;
  width: 0;
  height: 32px;
  border-radius: 16px;
  transform-origin: 16px 16px;
  transform: rotate(69deg);
}
.button__drow2::before {
  bottom: 0;
  left: 0;
  width: 0;
  height: 32px;
  border-radius: 16px;
  transform-origin: 16px 16px;
  transform: rotate(-146deg);
}
.button__drow2::after {
  bottom: 26px;
  left: -40px;
  width: 0;
  height: 32px;
  border-radius: 16px;
  transform-origin: 16px 16px;
  transform: rotate(-262deg);
}
.button__drow1,
.button__drow1::before,
.button__drow1::after,
.button__drow2,
.button__drow2::before,
.button__drow2::after {
  background: var(--back_color);
}
.button:hover .button__drow1 {
  animation: drow1 ease-in 0.06s;
  animation-fill-mode: forwards;
}
.button:hover .button__drow1::before {
  animation: drow2 linear 0.08s 0.06s;
  animation-fill-mode: forwards;
}
.button:hover .button__drow1::after {
  animation: drow3 linear 0.03s 0.14s;
  animation-fill-mode: forwards;
}
.button:hover .button__drow2 {
  animation: drow4 linear 0.06s 0.2s;
  animation-fill-mode: forwards;
}
.button:hover .button__drow2::before {
  animation: drow3 linear 0.03s 0.26s;
  animation-fill-mode: forwards;
}
.button:hover .button__drow2::after {
  animation: drow5 linear 0.06s 0.32s;
  animation-fill-mode: forwards;
}
@keyframes drow1 {
  0% {
    height: 0;
  }
  100% {
    height: 100px;
  }
}
@keyframes drow2 {
  0% {
    width: 0;
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  11% {
    opacity: 1;
  }
  100% {
    width: 120px;
  }
}
@keyframes drow3 {
  0% {
    width: 0;
  }
  100% {
    width: 80px;
  }
}
@keyframes drow4 {
  0% {
    height: 0;
  }
  100% {
    height: 120px;
  }
}
@keyframes drow5 {
  0% {
    width: 0;
  }
  100% {
    width: 124px;
  }
}

.container {
  width: 100%;
  height:100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.button:not(:last-child) {
  margin-bottom: 64px;
}










</style>
