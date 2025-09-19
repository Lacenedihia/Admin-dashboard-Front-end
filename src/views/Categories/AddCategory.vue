<template>
    <div class="add-container">
        <div class="back-container">
            <router-link to="/categories">
                  <button class="btn">

  
  <svg xmlns="http://www.w3.org/2000/svg" class="svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3e96f3"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
  <div >
    Button
  </div>

</button>
            </router-link>
        </div>
        <ToastNotification :message="message" :isVisible="isVisible" :bgColor="bgc" />
        <form @submit.prevent="submitForm">
            <div class="wrapper-fields">
                <label for="title">Category Name:</label>
                <input :placeholder="'Enter a category name'" v-model="category" type="text" id="category" required />
            </div>

            <div v-if="!isLoading" class="btn-wrapper">
                <span></span>

                <button type="submit" class="button">Submit</button>
                <router-link to="/adminCategories"
                    ><button class="cancel-btn button">Cancel</button></router-link
                >
            </div>
            <div v-else class="btn-wrapper">
                <span>Uploading Category... Please wait.</span>
                <button class="loader-btn">
                    <LoaderComponent />
                </button>
                <button class="loader-btn cancel-btn">Cancel</button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from "axios";
import LoaderComponent from "@/components/LoaderComponent.vue";
import ToastNotification from "@/components/ToastNotification.vue";
import { BASE_URL } from "@/constants/constants.js";

export default {
    name: "addCategory",
    components: { LoaderComponent, ToastNotification },
    data() {
        return {
            category: "",
            isLoading: false,
            isVisible: false,
            message: "",
            bgc: "", // FIXED: Changed from 'bgs' to 'bgc' to match usage
        };
    },
    methods: {
        /** Handles form submission for adding new category
         *  Sends category data to server via POST request
         * Manages loading state and shows appropriate notifications
         */
        submitForm() {
            console.log('=== SUBMIT FORM CALLED ===');
            console.log('Category value:', this.category);
            
            this.isLoading = true;
            

            const requestData = { category: this.category.trim() };
            const requestUrl = `${BASE_URL}/categories/add`;
            
            console.log('Making request to:', requestUrl);
            console.log('Request data:', requestData);
            console.log('Token (first 20 chars):');

            axios
                .post(requestUrl, requestData, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer `,
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    console.log('Success response:', response);
                    this.category = "";
                    this.message = "Category uploaded successfully!";
                    this.bgc = "success";
                    this.isVisible = true;
                })
                .catch((error) => {
                    console.error("Full error object:", error);
                    console.error("Error response:", error.response);
                    console.error("Error message:", error.message);
                    
                    // Better error handling
                    if (error.response?.status === 401) {
                        this.message = "Authentication failed. Please log in again.";
                        console.log('401 Unauthorized error');
                    } else if (error.response?.status === 400) {
                        this.message = error.response.data.message || "Invalid input.";
                        console.log('400 Bad Request error:', error.response.data);
                    } else if (error.response?.status === 403) {
                        this.message = "Access forbidden. Check your permissions.";
                        console.log('403 Forbidden error');
                    } else if (error.code === 'NETWORK_ERROR' || !error.response) {
                        this.message = "Network error. Check if server is running.";
                        console.log('Network error - server might be down');
                    } else {
                        this.message = "An error occurred while uploading the category.";
                        console.log('Other error:', error.response?.status);
                    }
                    
                    this.bgc = "error";
                    this.isVisible = true;
                })
                .finally(() => {
                    console.log('Request completed, setting loading to false');
                    this.isLoading = false;
                });
        },
    },
    mounted() {
        // Check if we have the necessary constants
        console.log('BASE_URL:', BASE_URL);
        console.log('Component mounted successfully');
    },
};
</script>
<style scoped>
.add-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
    color: #343637;
    font-family: "Roboto";
    font-style: normal;
}

.back-container {
    width: 100%;
    display: flex;
    color: #2196f3;
}

.back-container span:hover {
    text-decoration: underline;
}

form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 3rem;
    width: 40%;
}

.wrapper-fields {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    width: 100%;
}

label {
    margin-left: 3px;
}

input {
    width: 90%;
    padding: 0.7rem 0.5rem;
    border-radius: 7px;
    border: 1px solid #d8e2ee;
    box-shadow: 0px 4px 10px rgba(21, 60, 245, 0.04);
}

input:focus {
    outline-color: #2196f3;
}

textarea {
    width: 90%;
    padding: 0.7rem 0.5rem;
    border-radius: 7px;
    border: 1px solid #d8e2ee;
    box-shadow: 0px 4px 10px rgba(21, 60, 245, 0.04);

    &:focus {
        outline-color: #2196f3;
    }
}

.array-container {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
}

.icon {
    background: red;
    color: white;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    padding: 2px;
    cursor: pointer;
}

.icon:hover {
    opacity: 0.85;
}

.btn-wrapper {
    width: 90%;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
}

.btn-wrapper a {
    width: 100%;
}

.btn-wrapper span {
    color: #2196f3;
    height: 10px;
    margin-bottom: 7px;
}

.button {
    width: 100%;
    height: 60px;
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

.loader-btn {
    opacity: 0.85;
    cursor: not-allowed;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cancel-btn {
    background: red !important;
}

.btn-container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-top: 5px;
}

.btn-container button {
    height: 40px !important;
    background: #53b9ab;
    width: 90% !important;
}

.select-container {
    width: 90%;
    padding: 0.7rem 0.1rem;
    border-radius: 7px;
    background: #fff;
    border: 1px solid #d8e2ee;
    box-shadow: 0px 4px 10px rgba(21, 60, 245, 0.04);
    display: flex;
    justify-content: flex-start;
}

select {
    width: 97%;
    outline: none;
    cursor: pointer;
    height: 100%;
}


.btn {
  --color: #4aa3f4;
  font-family: inherit;
  display: inline-block;
  width: 8em;
  height: 2.6em;
  line-height: 2.5em;
  margin: 20px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border: 2px solid var(--color);
  transition: color 0.5s;
  z-index: 1;
  font-size: 17px;
  
  font-weight: 500;
  color: var(--color);
}

.btn:before {
  content: "";
  position: absolute;
  z-index: -1;
  background: var(--color);
  height: 150px;
  width: 200px;
  border-radius: 50%;
}

.btn:hover {
  color: #fff;
}

.btn:before {
  top: 100%;
  left: 100%;
  transition: all 0.7s;
}

.btn:hover:before {
  top: -30px;
  left: -30px;
}

.btn:active:before {
  background: #4aa3f4;
  transition: background 0s;
    color: #fff;
}

.btn svg {
  width: 1.6em;
  margin: 0.5em 0.8em 1em;
  position: absolute;
  display: flex;
  transition: all 0.6s ease;

}

.btn:hover .svg {
  transform: translateX(-5px);
fill: #fff;
}

</style>
