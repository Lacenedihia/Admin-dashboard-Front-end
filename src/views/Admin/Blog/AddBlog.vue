<template>
    <div class="add-container">
        <div class="back-container">
            <router-link to="/adminBlogs" button-56>
                
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
                <label for="category">Categories</label>
               <div class="custom-select-container">
      <select id="category" v-model="blogPost.category" required class="custom-select">
        <option value="" selected disabled>Select a category</option>
        <option v-for="category in categoriesList" :key="category._id" :value="category._id">
          {{ category.category }}
        </option>
      </select>
      <div class="select-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3e96f3">
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </div>
    </div>
            </div>

            <div class="wrapper-fields">
                <label for="title">Title:</label>
                <input :placeholder=Enter a title v-model="blogPost.title" type="text" id="title" required />
            </div>

            <div class="wrapper-fields">
                <label for="description">Description:</label>
                <textarea style="resize: none" rows="4" :placeholder="'Enter a description (250 max)'" v-model="blogPost.description" id="description" required></textarea>
            </div>

            <div class="wrapper-fields">
                <label for="author">Author:</label>
                <input :placeholder="'Enter the author name'" v-model="blogPost.author" type="text" id="author" required />
            </div>

            <div class="wrapper-fields">
                <label for="time">Time to Read:</label>
                <input :placeholder="'Enter a reading time (in minutes)'" v-model="blogPost.reading_time" type="number" id="time" required />
            </div>

            <div class="wrapper-fields  editor-container">
                <label for="text">Text (html):</label>
                <!-- <textarea style="resize: none" rows="5" placeholder="Enter a text content" v-model="blogPost.text" id="text" required></textarea> -->
                       <div class="quill-editor-wrapper">
      <QuillEditor 
        theme="snow" toolbar="Full"
        v-model:content="blogPost.text" 
        contentType="html"
        class="custom-quill-editor"
      />
    </div>
            </div>
             <div class="wrapper-fields">
    <label for="image">Image (.png, .jpg, .jpeg):</label>
    <div class="upload-interface">
      <div class="upload-area" 
           :class="{
             'drag-active': isDragActive,
             'has-file': previewImage
           }" 
           @drop.prevent="handleDrop" 
           @dragover.prevent="handleDragOver" 
           @dragenter.prevent="handleDragEnter"
           @dragleave="handleDragLeave" 
           @click="triggerFileInput">
        
        <input type="file" 
               id="image" 
               ref="fileInput" 
               accept="image/png, image/jpeg, image/jpg" 
               @change="handleImageChange" 
               class="file-input" />

        <!-- Upload Prompt -->
        <div v-if="!previewImage" class="upload-prompt">
          <div class="upload-icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#3e96f3"><path d="M480-480ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h394v60H180v600h600v-348h60v348q0 24-18 42t-42 18H180Zm56-157h489L578-473 446-302l-93-127-117 152Zm508-307v-181l-74 73-42-42 146-146 146 146-42 42-74-73v181h-60Z"/></svg>
          </div>
          <h3 class="upload-title">
            {{ isDragActive ? 'Drop image here' : 'Upload Photo' }}
          </h3>
          <p class="upload-description">
            Drag and drop an image here, or
            <span class="browse-text">browse</span>
          </p>
          <p class="upload-info">
            Supports: JPG, PNG • Max size: 10MB
          </p>
        </div>

        <!-- File Preview -->
        <div v-else class="file-preview">
          <img :src="previewImage" alt="Preview" class="preview-image" />
          <div class="file-details">
            <p class="file-name">{{ selectedFileName }}</p>
            <p class="file-size">{{ selectedFileSize }}</p>
          </div>
        </div>
      </div>
      
      <!-- Preview Section -->
      <div v-if="previewImage" class="image-preview-container">
        <button @click.stop="removeImage" class="remove-btn">
            Remove
          </button>
      </div>
    </div>
  </div>
            <div class="wrapper-fields">
                <label for="keywords">Keywords:</label>
                <div class="array-container" v-for="(keyword, index) in blogPost.keywords" :key="index">
                    <input id="keywords" :placeholder="'Enter a keyword'" v-model="blogPost.keywords[index]" type="text" required />
                    <font-awesome-icon v-if="index !== 0" class="icon" @click="deleteKeyword(index)" :icon="['fas', 'minus']" />
                </div>
                <div class="btn-container">
                    <button @click="addKeyword">Add Keyword</button>
                </div>
            </div>

            <div class="wrapper-fields">
                <label for="subtopics">Subtopics:</label>
                <div class="array-container" v-for="(subtopic, index) in blogPost.subtopics" :key="index">
                    <input id="subtopics" :placeholder="'Enter a subtopic'" v-model="blogPost.subtopics[index]" type="text" required />
                    <font-awesome-icon v-if="index !== 0" class="icon" @click="deleteSubtopic(index)" :icon="['fas', 'minus']" />
                </div>
                <div class="btn-container">
                    <button @click="addSubtopic">Add Subtopic</button>
                </div>
            </div>
            <div v-if="!isLoading" class="btn-wrapper">
                <span></span>

                <button type="submit" class="button">Submit</button>
                <router-link to="/adminBlogs"
                    ><button class="cancel-btn button">Cancel</button></router-link
                >
            </div>
            <div v-else class="btn-wrapper">
                <span>Uploading Blog... Please wait.</span>
                <button class="loader-btn button">
                    <LoaderComponent />
                </button>
                <button class="loader-btn cancel-btn button">Cancel</button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from "axios";
import LoaderComponent from "@/components/LoaderComponent.vue";
import ToastNotification from "@/components/ToastNotification.vue";
import { QuillEditor} from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { BASE_URL } from "@/constants/constants.js";
export default {
    name: "addBlogs",
    components: { LoaderComponent, ToastNotification, QuillEditor },
    data() {
        return {
             isDragActive: false,
      previewImage: null,
      selectedFileName: '',
      selectedFileSize: '',
            blogPost: {
                category: "",
                title: "",
                text: "",
                author: "",
                keywords: [""],
                subtopics: [""],
                reading_time: "",
                description: "",
                image: "",
            },
            categoriesList: [],
            isLoading: false, //loading state for form submission
            //notification control variables
            isVisible: false,
            message: "",
            bgColor: "",
        };
    },
    methods: {
        /**
         * Handles form submission for creating a new blog post
         * FromData prepared and sent to server via POST requst
         * show success / error + resets
         */
        submitForm() {
            this.isLoading = true;
            let formData = new FormData();
            formData.append("category", this.blogPost.category);
            formData.append("title", this.blogPost.title);
            formData.append("text", this.blogPost.text);
            formData.append("author", this.blogPost.author);
            formData.append("reading_time", this.blogPost.reading_time);
            formData.append("description", this.blogPost.description);
            this.blogPost.keywords.forEach((keyword, index) => {
                formData.append(`keywords[${index}]`, keyword);
            });
            this.blogPost.subtopics.forEach((subtopic, index) => {
                formData.append(`subtopics[${index}]`, subtopic);
            });
            if (this.blogPost.image) {
                formData.append("image", this.blogPost.image);
            }
            axios
                .post(`${BASE_URL}/articles/post`, formData, {
                    withCredentials: true,
                })
                .then(() => {
                    this.blogPost.category = "";
                    this.blogPost.title = "";
                    this.blogPost.text = "";
                    this.blogPost.author = "";
                    this.blogPost.reading_time = "";
                    this.blogPost.description = "";
                    this.blogPost.keywords = [""];
                    this.blogPost.subtopics = [""];
                    this.blogPost.image = null;

                    // Set success message and display it
                    this.message = "Blog uploaded successfully!";
                    this.bgc = "success";
                    this.isVisible = true;
                })
                .catch((error) => {
                    console.error("Error submitting blog post", error);
                    this.message = "An error occurred while uploading the blog.";
                    this.bgc = "error";
                    this.isVisible = true;
                })
                .finally(() => (this.isLoading = false));
        },
        //Handles images
        handleImageChange(event) {
            this.blogPost.image = event.target.files[0];
        },
        // From server get categories list
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
        addKeyword() {
            this.blogPost.keywords.push(""); //Add new keyword field
        },
        deleteKeyword(index) {
            this.blogPost.keywords.splice(index, 1); // at specific index remove keyword field
        },
        addSubtopic() {
            this.blogPost.subtopics.push(""); //Add new empty subtopic field
        },
        deleteSubtopic(index) {
            this.blogPost.subtopics.splice(index, 1); // at specific index remove subtopic field
        },
        
    
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    
    handleDragOver(event) {
      event.preventDefault();
    },
    
    handleDragEnter(event) {
      event.preventDefault();
      this.isDragActive = true;
    },
    
    handleDragLeave(event) {
      event.preventDefault();
      if (!event.currentTarget.contains(event.relatedTarget)) {
        this.isDragActive = false;
      }
    },
    
    handleDrop(event) {
      event.preventDefault();
      this.isDragActive = false;
      
      const file = event.dataTransfer.files?.[0];
      if (file && file.type.startsWith('image/')) {
        this.processFile(file);
        // Create a new FileList to simulate input change
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        this.$refs.fileInput.files = dataTransfer.files;
        this.blogPost.image = file; // Update your form data
      }
    },
    
    processFile(file) {
      // Validate file type
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (PNG, JPG, JPEG)');
        return;
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      
      // Set file info
      this.selectedFileName = file.name;
      this.selectedFileSize = this.formatFileSize(file.size);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    removeImage() {
      this.previewImage = null;
      this.selectedFileName = '';
      this.selectedFileSize = '';
      this.blogPost.image = null;
      this.$refs.fileInput.value = ''; // Reset file input
    }
  
    },
    mounted() {
        this.getCategories(); //Fetch categories when components mounts
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
    margin-bottom: 50px;
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
    width: 70%;
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
   color: #fff;

    &:hover {
        opacity: 0.85;
    }
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

.wrapper-fields label {
    font-weight: 600;
    font-size: 1rem;
    color: #333;
    padding-left: 0.25rem;
}

/* From Uiverse.io by cssbuttons-io */ 
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

.upload-interface {
  width: 90%;
}

.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 2rem;                                                                                                                                         
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.upload-area:hover {
  border-color: #00aef0;
  background: #f8faff;
}

.upload-area.drag-active {
  border-color: #00aef0;
  background: #eff6ff;
  transform: scale(1.02);
}

.upload-area.has-file {
  border-color: #10b981;
  background: #f0fdf4;
}

.file-input {
  display: none;
}

.upload-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
 
}

.upload-icon {
  color: #6b7280;
}

.upload-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.upload-description {
  color: #6b7280;
  margin: 0;
}

.browse-text {
  color: #00aef0;
  font-weight: 500;
  text-decoration: underline;
}

.browse-text:hover {
  color: #9ca3af;
}

.upload-info {
  font-size: 0.875rem;
  color: #9ca3af;
  margin: 0;
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
}

.preview-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
}

.file-details {
  flex: 1;
  text-align: left;
}

.file-name {
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.25rem 0;
  word-break: break-all;
}

.file-size {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.remove-btn {
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;
}

.remove-btn:hover {
  background: #dc2626;
  color: white;
}
.custom-select-container {
  position: relative;
  width: 90%;
}

.custom-select {
  width: 100%;
  padding: 0.7rem 2.5rem 0.7rem 0.5rem;
  border-radius: 7px;
  border: 1px solid #d8e2ee;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(21, 60, 245, 0.04);
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  color: #343637;
  transition: all 0.2s ease;
}

.custom-select:focus {
  outline: none;
  border-color: #3e96f3;
  box-shadow: 0 0 0 2px rgba(62, 150, 243, 0.2);
}

.select-icon {
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #3e96f3;
}

.select-icon svg {
  width: 1.2rem;
  height: 1.2rem;
}

/* For IE11 */
.custom-select::-ms-expand {
  display: none;
}

.quill-editor-wrapper {
  width: 90%;
 margin-bottom: 30px;
}

</style>
