<template>
    <ToastNotification :message="message" :isVisible="isVisible"  />
    <div v-if="isShown" class="confirm-container">
        <div class="confirm-delete">
            <h3>Are you sure you want to delete this Blog ?</h3>

            <div class="btn-container">
                <button @click="deleteBlog()">Yes</button>
                <button @click="this.closeConfirm()" class="btn-no">No</button>
            </div>
        </div>
    </div>
</template>
<script>
import { useStore } from "@/stores/index.js";
import axios from "axios";
//import LoaderComponent from './LoaderComponent';
import ToastNotification from "./ToastNotification.vue";
import { BASE_URL } from "@/constants/constants.js";
export default {
    name: "confirmDelete",
    components: {
        // LoaderComponent,
        ToastNotification,
    },
    props: {
        isShown: Boolean,
        id: String,
        closeConfirm: Function,
    },
    data() {
        return {
            isLoading: false,

            isVisible: false,
            message: "",
            bgColor: "",
        };
    },
    setup() {
        const Store = useStore();
        return { Store };
    },
    methods: {
        deleteBlog() {
            axios
                .delete(`${BASE_URL}/articles/delete/${this.id}`, { withCredentials: true })
                .then(() => {
                    this.message = "Blog deleted successfully!";
                    this.bgc = "success";
                    this.isVisible = true;
                    this.closeConfirm();

                    this.Store.fetchArticlesAdmin();
                })
                .catch((error) => {
                    console.error("Error submitting blog post", error);
                    this.message = "An error occurred while deleting the blog.";
                    this.bgc = "error";
                    this.isVisible = true;
                });
        },
    },
};
</script>
<style scoped>
body {
    overflow-y: hidden;
}

.confirm-container {
    height: 100%;
    width: 100%;
    display: flex;
    padding: 0;
    margin: 0;

    background: rgba(128, 128, 128, 0.568);
    z-index: 2000;
    overflow-y: hidden;
    position: fixed;
}

h3 {
    color: #343637;
    font-family: "Roboto";
    font-style: normal;
    font-size: 1.25rem;
}

.btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 3rem;
}

button {
    width: 15%;
    height: 40px;
    padding: 0.5rem;
    border-radius: 20px;
    border: none;
    background: #2196f3;
    font-weight: 500;
    color: #ffffffc7;
    box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.1),
        0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        opacity: 0.85;
    }
}

.btn-no {
    background: red;
}

.confirm-delete {
    display: flex;
    padding: 1rem;
    border-radius: 10px;
    flex-direction: column;
    margin-top: 25%;
    margin-left: 50%;
    transform: translateX(-75%) translateY(-50%);
    justify-content: space-around;
    align-items: center;
    background: #f4f7fe;
    border: 2px solid #edeff2;
    width: 40%;
    height: 30%;
}
</style>
