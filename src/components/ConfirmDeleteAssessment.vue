<template>
  <!-- Modal Overlay -->
  <div v-if="isShown" class="modal-overlay" @click="closeConfirm">
    <!-- Modal Card - Stops the click from bubbling up to the overlay -->
    <div class="card" @click.stop>
      <div class="card-content">
        <p class="card-heading">Are you sure you want to delete this Question ?</p>
      </div>
      <div class="card-button-wrapper">
        <button class="card-button secondary" @click="this.closeConfirm()">Cancel</button>
        <button class="card-button primary" @click="deleteAssessment()">Delete</button>
      </div>
      <button class="exit-button" @click="closeConfirm">
        <svg height="20px" viewBox="0 0 384 512">
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
  <ToastNotification :message="message" :isVisible="isVisible" />
</template>

<script>
import { useStore } from "@/stores/index";
import axios from "axios";
//import LoaderComponent from './LoaderComponent';
import ToastNotification from "@/components/ToastNotification.vue";
import { BASE_URL } from "@/constants/constants.js";
export default {
    name: "DeleteAssessment",
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
        deleteAssessment() {
            axios
                .delete(`${BASE_URL}/AssessmentTest/${this.id}`, { withCredentials: true })
                .then(() => {
                    this.message = "Assessment deleted successfully!";
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
/* New styles for the modal overlay */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* Card styles (modified to work with the overlay) */
.card {
    width: 300px;
    height: fit-content;
    background: rgb(255, 255, 255);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 30px;
    position: relative;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.card-content {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.card-heading {
    font-size: 20px;
    font-weight: 700;
    color: rgb(27, 27, 27);
}
.card-description {
    font-weight: 100;
    color: rgb(102, 102, 102);
}
.card-button-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
.card-button {
    width: 50%;
    height: 35px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 600;
}
.primary {
    background-color: rgb(255, 114, 109);
    color: white;
}
.primary:hover {
    background-color: rgb(255, 73, 66);
}
.secondary {
    background-color: #ddd;
}
.secondary:hover {
    background-color: rgb(197, 197, 197);
}
.exit-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
}
.exit-button:hover svg {
    fill: black;
}
.exit-button svg {
    fill: rgb(175, 175, 175);
}

</style>
