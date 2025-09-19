<template>
    <confirmDelete :closeConfirm="closeConfirm" :isShown="isShown" :id="blogId" />
    <div :style="{ overflowY: isShown ? 'hidden' : 'visible' }" class="blogs-container">
        <div class="btn-section">
            <router-link to="/addBlogs">
                <button>Add +</button>
            </router-link>
        </div>
        <table v-if="this.loadingArticles === false">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                  <tr v-for="blog in this.articles" :key="blog._id">
    <td class="title-case w-1.5/5">{{ blog.title }}</td>
    <td class="w-1/5">{{ blog.author }}</td>
    <td class="w-1/5">{{ blog.category.category }}</td>
    <td class="w-0.5/5">{{ getDate(blog.date) }}</td>
    
   
    
        <td class="actions">
                        <div class="tooltip-container">
                            <router-link :to="`/updateBlog/${blog._id}`">
                                <svg title="Update" class="icons" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3e96f3">
                                    <path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/>
                                </svg>
                            </router-link>
                            <span class="tooltip-text">Update</span>
                        </div>
                        <div class="tooltip-container">
                            <svg @click="openConfirmDelete(blog._id)" title="delete" class="icons" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323">
                                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                            </svg>
                            <span class="tooltip-text">Delete</span>
                        </div>
                    </td>
</tr>
              
            </tbody>
        </table>
        
       
        <!-- Pagination Controls -->
         
        <div v-if="loadingArticles === false" class="pagination-container" >
          
      <button @click="previousPage" :disabled="currentPage === 1" :class="{ 'disabled': currentPage <= 1 }"
                class="pagination-btn"> <font-awesome-icon :icon="['fas', 'chevron-left']" id="slide1" /></button>
                 <div class="page-info">
                <span>{{ currentPage }} / {{ totalPages }}</span>
                <span class="total-items">({{ totalArticles }} articles)</span>
            </div>
      
      <button @click="nextPage" :disabled="currentPage === totalPages"  :class="{ 'disabled': currentPage >= totalPages }"
                class="pagination-btn"><font-awesome-icon :icon="['fas', 'chevron-right']" id="slide2" /></button>
   
        </div>
        
       
        <table v-else>
            <thead>
                <tr class="loading-tr">
                    <th></th>
                </tr>
            </thead>
            <tbody class="loading-body">
                <LoaderComponentBlue />
            </tbody>
        </table>
     
    </div>
</template>

<script>
import { useStore } from "@/stores/index.js";
import confirmDelete from "@/components/ConfirmDelete.vue";
import LoaderComponentBlue from "@/components/blogloader.vue";
import axios from "axios";
import { BASE_URL } from "@/constants/constants.js";

import avatarblog from "@/assets/user.png";
export default {
    name: "adminBlogs",
    components: { confirmDelete, LoaderComponentBlue },
    data() {
        return {
            isShown: false,
            blogId: "",
            loadingArticles: true,
            articles: [], // Store articles for the current page
            currentPage: 1,
            totalPages: 0,
            
        };
    },
    setup() {
        const Store = useStore();
        return { Store };
    },
    methods: {
        async fetchArticles() {
            try {
                this.loadingArticles = true;
                const response = await axios.get(`${BASE_URL}/articles/data/admin?page=${this.currentPage}`);
                this.articles = response.data.articles;
                console.log(this.articles)
                this.totalPages = response.data.totalPages;
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                this.loadingArticles = false;
            }
        },
 getImgUrl(imgFileId) {
            if (imgFileId) {
                var image = `${BASE_URL}/articles/image/${imgFileId}`;
                return image;
            }
            return avatarblog;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.scrollToTop();
            }
        },

        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.scrollToTop();
            }
        },

        scrollToTop() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        },

        getDate(str) {
            const date = new Date(str);
            const options = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            };
            const formattedDate = date.toLocaleDateString("en-US", options);
            return formattedDate;
        },

        openConfirmDelete(id) {
            this.blogId = id;
            this.isShown = true;
        },

        closeConfirm() {
            this.isShown = false;
        },
    },
    watch: {
        // This is the correct way to watch for a change in the currentPage
        currentPage() {
            this.fetchArticles();
        },
    },
    mounted() {
        // Correctly call the fetchArticles method when the component mounts
        this.fetchArticles();
    },
};
</script>
<style scoped>
.blogs-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5rem;
}

.btn-section {
    width: 90%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
}

table {
    width: 90%;
}

thead {
    background: #2196f3;
    color: #fff;
}

tbody {
    background: #fff;
}

.loading-tr {
    background: #2196f3;
    height: 40px;
}

.loading-body {
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

th {
    padding: 8px 10px;
    text-align: start;
    border-bottom: 1px solid #ddd;
    font-weight: 600;
    font-size: 16px;
}

td {
    padding: 5px 10px;
    border-bottom: 1px solid #ddd;
    font-size: 15px;
}

.icons {
    cursor: pointer;
    display: inline-block;
    transition: transform 0.2s ease, opacity 0.2s ease;
    transform-origin: center;
}

.icons:hover {
    transform: scale(1.2);
    opacity: 0.85;
}

.icons:active {
    transform: scale(1);
}

.actions {
    text-align: center;
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 5px 0;
}

.actions svg {
    flex-shrink: 0;
}

button {
    width: 100%;
    height: 40px;
    padding: 0.5rem;
    border-radius: 10px;
    border: none;
    background: #2196f3;
    font-weight: 500;
    color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1);
}

button:hover {
    opacity: 0.85;
}

a {
    width: 15%;
}

.title-case {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 300px;
}

/* Pagination Styles */
.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;
    width: 90%;
}

.pagination-btn {
    width: 50px !important;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #2196f3;
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 16px;
}

.pagination-btn:hover:not(.disabled) {
    background: #1976d2;
    transform: scale(1.1);
}

.pagination-btn.disabled {
    background: #ccc;
    cursor: not-allowed;
    opacity: 0.5;
}

.pagination-btn.disabled:hover {
    transform: none;
}

.page-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 600;
    color: #333;
}

.total-items {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
}

/* Tooltip Styles */
.tooltip-container {
    position: relative;
    display: inline-block;
}

.tooltip-text {
    visibility: hidden;
    width: 80px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -40px;
    opacity: 0;
    transition: opacity 0.3s;
}

.tooltip-text::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
}

.tooltip-container:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
}
</style>