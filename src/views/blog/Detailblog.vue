<template>
    <div class="blog-detail-page" v-if="blog">
        <section class="blog-header">
            <div class="meta-container">
                <!--<div class="category">{{ $t(blog.category.category) }}</div>
                <div class="date">{{ $t(getDate(blog.date)) }}</div> -->
                <router-link :to="`/blogs`">
                    <span class="src">Blog</span>
                </router-link>
                <span>/ </span>
                <span class="header-title"> {{ blog.title }}</span>
            </div>

            <h1 class="title">
                {{ blog.title }}
            </h1>
        </section>

        <section class="featured-image">
            <img loading="lazy" decoding="async" :src="getImgUrl(blog.image)" :alt="blog.title" />
        </section>

        <section class="blog-content">
            <div class="content" v-html="blog.text"></div>
            <div class="aboutus">
                <CardBlog :key="blogId" :id="blogId" :author="blog.author" :description="blog.description" :time="blog.reading_time" :date="getDate(blog.date)" />
            </div>
        </section>
    </div>
    <section class="related-posts">
        <div class="articles-grid">
            <ArticleCardBlog
                v-for="article in recommendedArticles"
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
    </section>
  
</template>

<script>
import ArticleCardBlog from "@/components/ArticleCardBlog.vue";
import CardBlog from "@/components/DetailBlogabout.vue";
import { useRoute } from "vue-router";
import { ref, computed, watch ,  onMounted} from "vue";
import axios from "axios";
import { BASE_URL } from "@/constants/constants.js";
import avatarblog from "@/assets/user.png";
// Helper function to fetch a single article
const fetchSingleArticle = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/articles/data/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching single article:", error);
    return null;
  }
};

// Helper function to get a random list of articles for recommendations
const getRandomArticles = (allArticles, count) => {
    if (!Array.isArray(allArticles)) return [];
    let shuffled = [...allArticles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Helper function to format the date
const getDate = (str) => {
    if (!str) return '';
    const date = new Date(str);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
};

export default {
    name: "DetailBlog",
    components: { ArticleCardBlog, CardBlog },

    setup() {
          const route = useRoute();
        const blogPost = ref(null);
        const allArticles = ref([]); // Reactive variable for all articles
        const loading = ref(true);

        const loadArticle = async (id) => {
            loading.value = true;
            blogPost.value = await fetchSingleArticle(id);
            loading.value = false;
        };

        const fetchAllArticles = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/articles/data`, {
                    withCredentials: true
                });
                allArticles.value = response.data.articles;
            } catch (error) {
                console.error("Error fetching articles for recommendations:", error);
            }
        };

        watch(
            () => route.params.id,
            (newId) => {
                if (newId) {
                    loadArticle(newId);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            },
            { immediate: true }
        );

        onMounted(fetchAllArticles);

        const blog = computed(() => blogPost.value);
        const recommendedArticles = computed(() => {
            const otherArticles = allArticles.value.filter(
                (article) => article._id !== route.params.id
            );
            return getRandomArticles(otherArticles, 3);
        });
        // Expose all properties and methods to the template
        return {
             blog,
            recommendedArticles,
              getDate,
            getImgUrl: (imgFileId) => { 
                if (imgFileId) {
                    return `${BASE_URL}/articles/image/${imgFileId}`;
                }
                return avatarblog;
            },
            // Expose the reactive state and methods for the template
           
        };
    },
};
</script>

<style lang="scss" scoped>
body,
html {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
}

.src {
    color: #7d7d7d;
    padding-right: 10px;
}

.src:hover {
    color: #050505;
}

.header-title {
    padding-left: 10px;
}

.blog-detail-page {
    width: 100%;
    max-width: 920px;
    margin: 0 auto;
    padding: 2rem 1rem;
    box-sizing: border-box; // Ensure padding is included in width calculation
}

.blog-header {
    margin-bottom: 3rem;

    margin-top: 6rem;
}

.meta-container {
    display: flex;
    margin-bottom: 1.5rem;
}

.category {
    background: #3361ff;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px 0 0 4px;
    font-size: 0.5rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.date {
    background: #f3f4f6;
    color: #4b5563;
    padding: 0.5rem 1rem;
    border-radius: 0 4px 4px 0;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.title {
    margin: 5rem 5rem;
    font-size: 3rem;
    font-weight: 600;
    line-height: 1.2;
    color: #111827;
    margin: 0;
    text-align: start;
}

.featured-image {
    img {
        width: 100%;
        max-height: 500px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
}

.blog-content {
    margin-top: 5em;
    margin-bottom: 2em;
    text-align: start;

    .content {
        font-size: medium;

        ::v-deep(p) {
            margin-bottom: 0.25rem;
        }

        ::v-deep(a) {
            color: #3361ff;
            text-decoration: underline;
        }
    }
}

.related-posts {
    display: inline-block;
    width: fit-content;
    border-top: 1px solid #e5e7eb;
    margin: 3rem;
    padding-top: 1.5rem;
}
a{text-decoration: none;}
.articles-grid {
    display: flex;
    gap: 1rem;

    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
}

.articles-grid::-webkit-scrollbar {
    display: none;
}

.article-card {
    /* Prevent internal content from stretching the card */
    flex: 0 0 300px;

    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

@media (max-width: 768px) {
    .blog-header,
    .blog-content {
        padding: 0 1rem;
    }

    .title {
        font-size: 2rem;
    }

    .articles-grid {
        grid-template-columns: 1fr;
        flex-direction: rows;
    }
}



.articles-grid {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    /* Enable horizontal scroll on small screens */
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    /* Hide scrollbar for Firefox */
}

.articles-grid::-webkit-scrollbar {
    display: none;
    /* Hide scrollbar for Chrome/Safari */
}

.article-card {
    flex: 0 0 300px;
    /* Fixed width cards */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

/* Responsive styles for screens <= 768px */
@media (max-width: 768px) {
    .articles-grid {
        flex-direction: column;
        /* Stack cards vertically */
        overflow-x: visible;
        /* Disable horizontal scrolling */
    }
}

</style>
