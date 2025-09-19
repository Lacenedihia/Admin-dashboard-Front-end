<template>
    <confirmDeleteCategory :fetchCategories="getCategories" :closeConfirm="closeConfirm" :isShown="isShown" :id="categoryId" />
    <div :style="{ overflowY: isShown ? 'hidden' : 'visible' }" class="categories-container">
        <div class="btn-section">
            <router-link to="/addCategory"
                ><button>Add +</button></router-link
            >
        </div>
        <table v-if="!this.isLoading">
            <thead>
                <tr>
                    <th>Name</th>
                    <th class="actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in categoriesList" :key="category._id">
                    <td class="w-1.5/2">{{ category.category }}</td>
                    <td class="actions w-0.5/5">
                        <div class="tooltip-container">
                        <router-link :to="`/updateCategory/${category._id}`" > <svg  title="Update" class="icons" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3e96f3"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg></router-link>
                      <span class="tooltip-text">Update</span>
                    </div>
                       <div class="tooltip-container">
                        <svg @click="openConfirmDeleteCategory(category._id)"  title="delete" class="icons"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    <span class="tooltip-text">Delete</span>
                    </div>
                      
                    </td>
                </tr>
            </tbody>
        </table>
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
import confirmDeleteCategory from "@/components/ConfirmDeleteCategory.vue";
import LoaderComponentBlue from "@/components/LoaderComponentBlue.vue";
import axios from "axios";
import { BASE_URL } from "@/constants/constants.js";
export default {
    name: "adminCategories",
    components: { confirmDeleteCategory, LoaderComponentBlue },
    data() {
        return {
            isShown: false,
            categoryId: "",
            categoriesList: [],
            isLoading: true,
        };
    },
    methods: {
        getCategories() {
            axios
                .get(`${BASE_URL}/categories/`, {
                    withCredentials: true,
                })
                .then((response) => (this.categoriesList = response.data.categories))
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => (this.isLoading = false));
        },
        openConfirmDeleteCategory(id) {
            this.categoryId = id;
            this.isShown = true;
        },

        closeConfirm() {
            this.isShown = false;
        },
    },
    computed: {},
    mounted() {
        this.getCategories();
    },
};
</script>
<style scoped>
.categories-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
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

    &:hover {
        opacity: 0.85;
    }
}

.update {
    background: #5bb98b;
}

.info {
    background: #2196f3;
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
    box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.1),
        0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        opacity: 0.85;
    }
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
/* New or updated icon styling */
.icons {
  display: inline-block;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
  /* Ensures scaling origin is center */
  transform-origin: center;
}

.icons:hover {
  transform: scale(1.2); /* Slight zoom-in */
  opacity: 0.85;
}

/* Optional: Add subtle bounce effect on hover */
.icons:active {
  transform: scale(1); /* Prevents lingering scale on click */
}

/* Ensure table actions align icons properly */
.actions {
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 5px 0;
}

/* Optional: Make sure SVGs don't stretch */
.actions svg {
  flex-shrink: 0;
}
/* Container for the tooltip */
.tooltip-container {
  position: relative;
  display: inline-block; /* Ensure it wraps the icon */
}

/* Tooltip text styling (hidden by default) */
.tooltip-text {
  visibility: hidden;
  width: 80px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  padding: 5px 0;
  
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Position above the icon */
  left: 50%;
  margin-left: -40px; /* Center the tooltip horizontally */

  /* Fade-in effect */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow/triangle */
.tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #333 transparent transparent transparent;
}

/* Show the tooltip on hover */
.tooltip-container:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
</style>
