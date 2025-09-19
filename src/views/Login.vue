<template>
<!-- Error Popup Toast -->
  <Transition name="toast">
    <div v-if="errMsg" class="error-toast" @click="clearError">
      <div class="toast-content">
        <svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
        <div class="toast-text">
          <h4>Login Failed</h4>
          <p>{{ errMsg }}</p>
        </div>
        <button class="toast-close" @click="clearError">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </Transition>
<div>
  <div class="scroll-down">SCROLL DOWN
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path d="M16 3C8.832031 3 3 8.832031 3 16s5.832031 13 13 13 13-5.832031 13-13S23.167969 3 16 3zm0 2c6.085938 0 11 4.914063 11 11 0 6.085938-4.914062 11-11 11-6.085937 0-11-4.914062-11-11C5 9.914063 9.914063 5 16 5zm-1 4v10.28125l-4-4-1.40625 1.4375L16 23.125l6.40625-6.40625L21 15.28125l-4 4V9z"/> 
    </svg>
  </div>
  
  <div class="container"></div>
  
  <div class="modal" ref="modalRef">
    
    <form class="modal-container" @submit.prevent="handleSubmit">
      <div class="modal-left">
       
        
        <h1 class="modal-title">Welcome!</h1>
      
        <div class="inputGroup">
         <input 
            type="text" 
            name="email"   
            id="email" 
            placeholder="Email" 
            ref="userRef"
            v-model="user"
            required> 
        </div>
        <div class="inputGroup">
          <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="Password"   
            v-model="pwd"
            required>
          
          
        </div>
       
        
        <div class="modal-buttons">
          
   <!-- svgIcon -->
    <router-link to="/register" >
<button class="Btn">
  <div class="sign">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
  </div>

  <div class="text">Sign up</div>
</button></router-link>

     <!-- From Uiverse.io by MUJTABA201566 --> 
<button class="Btn" type="submit" >
  <div class="sign">
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z"/></svg></div>
  <div class="text">LogIn</div>
</button>
 
        </div>
        
      </div>
      
      <div class="modal-right">
        <img src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80" alt="Login background">
      </div>
      
      <button type="button" class="icon-button close-button" @click="closeModal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
          <path d="M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.980469 15.990234 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 z"></path>
        </svg>
      </button>
    </form>
    <div class="btn-container close-button"  >
      <!-- From Uiverse.io by vinodjangid07 --> 
       <a  href="https://github.com/Lacenedihia"><button class="Btng btnn-button">
      <svg class="svgIcong" viewBox="0 0 496 512" height="1.4em" xmlns="http://www.w3.org/2000/svg"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
      <span class="textg">Github</span>
    </button></a>
    
    <!-- From Uiverse.io by wilsondesouza --> 
     <a href="https://www.linkedin.com/in/dihia-lacene/"><button class="Btnl btnn-button">
  <svg
    viewBox="0 0 16 16"
    height="16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    class="svgIconl"
  >
    <path
      d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
    ></path>
  </svg>
  <span class="textl">LinkedIn</span>
</button></a>


       <button class="modal-button" type="button" @click="openModal">Click here to login</button>
  <!-- From Uiverse.io by vinodjangid07 --> 
   <router-link  to="/blogs"><button class="Btnn btnn-button">Blogs
    <!--  class="svgg" -->
     
    <svg xmlns="http://www.w3.org/2000/svg" class="svgg" height="100px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M146.67-120q-27.5 0-47.09-19.58Q80-159.17 80-186.67V-840l67 67 66-67 67 67 67-67 66 67 67-67 67 67 66-67 67 67 67-67 66 67 67-67v653.33q0 27.5-19.58 47.09Q840.83-120 813.33-120H146.67Zm0-66.67h300v-266.66h-300v266.66Zm366.66 0h300v-100h-300v100Zm0-166.66h300v-100h-300v100ZM146.67-520h666.66v-120H146.67v120Z"/></svg>
    
    </button></router-link>
   </div>
   


  </div>
</div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuth } from '@/stores/useAuth.js';

import { useRouter } from 'vue-router';
import axios from '@/api/axios';

const LOGIN_URL = '/auth';

export default {
  name: 'LoginComponent',
  setup() {
  
    const {  setAuth } = useAuth();
    const router = useRouter();

    // Refs
    const userRef = ref(null);
    const modalRef = ref(null);

    // Reactive data
    const user = ref('');
    const pwd = ref('');
    const errMsg = ref('');
    const success = ref(false);
    const isOpened = ref(false);

    // Auto-hide error message after 5 seconds
    let errorTimeout = null;

    const clearError = () => {
      errMsg.value = '';
      if (errorTimeout) {
        clearTimeout(errorTimeout);
        errorTimeout = null;
      }
    };

    const showError = (message) => {
      errMsg.value = message;
      
      // Auto-hide after 5 seconds
      if (errorTimeout) clearTimeout(errorTimeout);
      errorTimeout = setTimeout(() => {
        errMsg.value = '';
      }, 5000);
    };

    onMounted(() => {
      if (userRef.value) {
        userRef.value.focus();
      }
      setupModalEvents();
    });

    onUnmounted(() => {
      cleanupModalEvents();
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
    });

    const handleSubmit = async () => {
      clearError(); // Clear any existing errors
      
      try {
        const response = await axios.post(LOGIN_URL,
          JSON.stringify({ user: user.value, pwd: pwd.value }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        
        console.log(JSON.stringify(response?.data));

        const accessToken = response.data.accessToken;
        const roles = response.data.roles;
        setAuth({ user: user.value, pwd: pwd.value, roles, accessToken });
        
        // Clear form
        user.value = '';
        pwd.value = '';
        success.value = true;
        
        // Redirect to dashboard
        router.push('/dashboard'); 
      } catch (err) {
        let errorMessage = 'Login Failed';
        
        if (!err.response) {
          errorMessage = 'No Server Response';
        } else if (err.response.status === 400) {
          errorMessage = 'Missing Username or Password';
        } else if (err.response.status === 401) {
          errorMessage = 'Unauthorized - Invalid credentials';
        } else if (err.response.status === 500) {
          errorMessage = 'Server Error - Please try again later';
        }
        
        showError(errorMessage);
      }
    };

    const openModal = () => {
      if (modalRef.value) {
        modalRef.value.classList.add("is-open");
        document.body.style.overflow = "hidden";
      }
    };

    const closeModal = () => {
      if (modalRef.value) {
        modalRef.value.classList.remove("is-open");
        document.body.style.overflow = "initial";
      }
      clearError(); // Clear error when closing modal
    };

    let scrollHandler;
    let keyHandler;

    const setupModalEvents = () => {
      const scrollDown = document.querySelector(".scroll-down");
      
      scrollHandler = () => {
        if (window.scrollY > window.innerHeight / 3 && !isOpened.value) {
          isOpened.value = true;
          if (scrollDown) scrollDown.style.display = "none";
          openModal();
        }
      };

      keyHandler = (evt) => {
        if (evt.keyCode === 27) { // ESC key
          closeModal();
        }
      };

      window.addEventListener("scroll", scrollHandler);
      document.addEventListener("keydown", keyHandler);
    };

    const cleanupModalEvents = () => {
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
      }
      if (keyHandler) {
        document.removeEventListener("keydown", keyHandler);
      }
      document.body.style.overflow = "initial";
    };

    return {
      userRef,
      modalRef,
      user,
      pwd,
      errMsg,
      success,
      handleSubmit,
      openModal,
      closeModal,
      clearError
    };
  }
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito:400,600,700");

* {
  box-sizing: border-box;
}
.icon-button{ fill:#ffffff;}
.icon-button:hover{ fill:#89939a;}
body {
  font-family: "Nunito", sans-serif;
  color: rgba(#000, 0.7);
}
a {
  text-decoration: none;
}   

.error-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  min-width: 300px;
  cursor: pointer;
}

.toast-content {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  box-shadow: 
    0 10px 30px rgba(255, 107, 107, 0.3),
    0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.toast-icon {
  width: 24px;
  height: 24px;
  color: white;
  flex-shrink: 0;
  margin-top: 2px;
}

.toast-text {
  flex: 1;
  color: white;
}

.toast-text h4 {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
}

.toast-text p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
  font-family: "Nunito", sans-serif;
  line-height: 1.4;
}

.toast-close {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  flex-shrink: 0;
}

.toast-close:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.toast-close svg {
  width: 16px;
  height: 16px;
}

/* Toast Animation */
.toast-enter-active, .toast-leave-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.toast-enter-to, .toast-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

/* Success Toast Variant */
.success-toast .toast-content {
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
  box-shadow: 
    0 10px 30px rgba(39, 174, 96, 0.3),
    0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Warning Toast Variant */
.warning-toast .toast-content {
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
  box-shadow: 
    0 10px 30px rgba(243, 156, 18, 0.3),
    0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Rest of your existing styles */

.container {
  height: 200vh;
   background-image:  url("./public/walpaper.jpg");
    background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.modal {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.4s;

  :is(-container) {
    display: flex;
    max-width: 720px;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    transition-duration: 0.3s;
    background: #fff;
    transform: translateY(100px) scale(0.4);
  }

  :is(-title) {
    font-size: 26px;
    margin: 0;
    font-weight: 400;
    color: #55311c;
  }

  :is(-desc) {
    margin: 6px 0 30px 0;
  }

 :is( -left) {
    padding: 60px 30px 20px;
    background: #fff;
    flex: 1.5;
    transition-duration: 0.5s;
    transform: translateY(80px);
    opacity: 0;
  }

 :is( -button) {
    color: darken(#dbc5d8, 5%);
    font-family: "Nunito", sans-serif;
    font-size: 18px;
    cursor: pointer;
    border: 0;
    outline: 0;
    padding: 10px 40px;
    border-radius: 30px;
    background: rgb(255, 255, 255);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.16);
    transition: 0.3s;
    
   :is( &:hover) {
      border-color: rgba(255, 255, 255, 0.2);
      background: rgba(#fff, 0.8);
    }
  }

 :is( -right ){
    flex: 2;
    font-size: 0;
    transition: 0.3s;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      transform: scale(2);
      object-fit: cover;
      transition-duration: 1.2s;
    }
  }

 :is( &.is-open) {
    height: 100%;
    

    .modal-button {
      opacity: 0;
    }
.btnn-button{ opacity: 0;}
    .modal-container {
      opacity: 1;
      transition-duration: 0.6s;
      pointer-events: auto;
      transform: translateY(0) scale(1);
    }

    .modal-right img {
      transform: scale(1);
    }

    .modal-left {
      transform: translateY(0);
      opacity: 1;
      transition-delay: 0.1s;
      margin-top: 30px;
    }
  }

  :is(-buttons) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      color: rgba(#333, 0.6);
      font-size: 14px;
    }
  }
}

.sign-up {
  margin: 60px 0 0;
  font-size: 14px;
  text-align: center;

  a {
    color: #dbc5d8;
  }
}


.icon-button {
  outline: 0;
  position: absolute;
  right: 10px;
  top: 12px;
  width: 32px;
  height: 32px;
  border: 0;
  background: 0;
  padding: 0;
  cursor: pointer;
}

.scroll-down {
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  font-size: 32px;
  font-weight: 800;
  transform: translate(-50%, -50%);
  svg {
    margin-top: 16px;
    width: 52px;
    fill: currentColor;
  }
}


/* Add your styles here */
* {
  box-sizing: border-box;
}


.modal {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.4s;
}

.modal-container {
  display: flex;
 /* From https://css.glass */
background: rgba(206, 218, 240, 0.68);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(11.3px);
-webkit-backdrop-filter: blur(11.3px);
border: 1px solid rgba(206, 218, 240, 0.11);
  width: 60%;
  height:50%;
  border-radius: 10px;
  overflow: hidden;
  position: absolute;
 
  opacity: 0;
  pointer-events: none;
  transition-duration: 0.3s;
  background: #fff;
  transform: translateY(100px) scale(0.4);
}

.modal-title {
   text-align: center;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  
  font-size: 28px;
  font-weight: 800;

}
p{font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;}


.modal-left {
margin-left: 15px;
margin-right: 15px;
  background: #fff;
  flex: 1.5;
  transition-duration: 0.5s;
  transform: translateY(80px);
  opacity: 0;
}


.modal-right {
  flex: 2;
  font-size: 0;
  transition: 0.3s;
  overflow: hidden;
}

.modal-right img {
  width: 100%;
  height: 100%;
  transform: scale(2);
  object-fit: cover;
  transition-duration: 1.2s;
}

.modal.is-open {
  height: 100%;
 /* From https://css.glass */
background: rgba(206, 218, 240, 0.44);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(11.3px);
-webkit-backdrop-filter: blur(11.3px);
border: 1px solid rgba(206, 218, 240, 0.11);
}

.modal.is-open .modal-button {
  opacity: 0;
}
.modal.is-open .btnn-button {
  opacity: 0;
}
.modal.is-open .modal-container {
  opacity: 1;
  transition-duration: 0.6s;
  pointer-events: auto;
  transform: translateY(0) scale(1);
}

.modal.is-open .modal-right img {
  transform: scale(1);
}

.modal.is-open .modal-left {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.1s;
}

.modal-buttons {
  margin-top:90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.sign-up {
  margin: 60px 0 0;
  font-size: 14px;
  text-align: center;
}

.sign-up a {
  color: #8c7569;
  text-decoration: none;
}





.icon-button {
  outline: 0;
  position: absolute;
  right: 10px;
  top: 12px;
  width: 32px;
  height: 32px;
  border: 0;
  background: 0;
  padding: 0;
  cursor: pointer;
}

.scroll-down {
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #276789;
  font-size: 32px;
  font-weight: 800;
  transform: translate(-50%, -50%);
}

.scroll-down svg {
  margin-top: 16px;
  width: 52px;
  fill: currentColor;
}

.errmsg {
  background-color: lightpink;
  color: firebrick;
  font-weight: bold;
  padding: 0.5rem;

  border-radius: 4px;
}


@media(max-width: 750px) {
  .modal-container {
    width: 90%;
  }
  .modal-right {
    display: none;
  }
}




.inputGroup {
  font-family: 'Segoe UI', sans-serif;
  margin-top:70px;
  margin-bottom: 40px;
    margin-left:20px;
     margin-right:20px;
  width:80%;
  justify-content: flex-start;
  position: relative;
}

.inputGroup input {
  font-size: 100%;
  padding: 0.8em;
  outline: none;
  border: 2px solid rgb(200, 200, 200);
  background-color: transparent;
  border-radius: 10px;
  width: 100%;
}

.inputGroup label {
  font-size: 100%;
  position: absolute;
  left: 0;
 
  padding: 0.8em;
  margin-left: 0.5em;
  pointer-events: none;
  transition: all 0.3s ease;
  color: rgb(100, 100, 100);
}

.inputGroup :is(input:focus, input:valid)~label {
  transform: translateY(-50%) scale(.9);
  margin: 0em;
  margin-left: 1.3em;
  padding: 0.4em;
  background-color: #fff;
}

.inputGroup :is(input:focus, input:valid) {
  border-color: rgb(150, 150, 200);
}






.tooltip-container {
  position: relative;
  z-index: 1000;
}

.tooltip-content {
  position: absolute;
 
  color: rgb(0, 0, 0);
  padding: 14px;
  border-radius: 10px;
  font-size: 18px;
  line-height: 1.5;
 
  background: rgba(255, 255, 255, 0.19);
  backdrop-filter: blur(17px);
  -webkit-backdrop-filter: blur(17px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    inset 0 -1px 0 rgba(255, 255, 255, 0.1),
    inset 0 0 26px 13px rgba(255, 255, 255, 1.3);
  margin-top: 8px;
  transform: translateY(-10px) scale(0.95);
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 1000;
}

.tooltip-content::before {
  content: '';
  position: absolute;
  top: 16px;
  left: 20px;
  width: 12px;
  height: 12px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.8),
    transparent
  );
  transform: rotate(45deg);
  border-radius: 2px;
}

.tooltip-content.show {
  transform: translateY(0) scale(1);
  opacity: 1;
  visibility: visible;
}

.tooltip-content::after {
 
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.8),
    transparent,
    rgba(255, 255, 255, 0.3)
  );
}
.Btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: 0.3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: white;
}

/* plus sign */
.sign {
  width: 100%;
  transition-duration: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 17px;
}

.sign svg path {
  fill: black;
}
/* text */
.text {
  
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: 0.3s;
}
/* hover effect on button width */
.Btn:hover {
  background-color: black;
  width: 125px;
  border-radius: 40px;
  transition-duration: 0.3s;
}

.Btn:hover .sign {
  width: 30%;
  transition-duration: 0.3s;
  padding-left: 20px;
}

.Btn:hover .sign svg path {
  fill:#91e2e8;
}

/* hover effect button's text */
.Btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: 0.3s;
  padding-right: 10px;
}
/* button click effect*/
.Btn:active {
  transform: translate(2px, 2px);
}
.btn-container{
  display:flex;
  flex-direction: row;
  gap:25px ;
}
/* From Uiverse.io by cssbuttons-io */ 
.modal-button {
  position: relative;
  font-size: 17px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 1.1em 2.5em;
  display: inline-block;
   align-items: center;
  cursor: pointer;
  border-radius: 6em;
  transition: all 0.2s;
  border: none;
  margin-bottom:3em;
  font-family: inherit;
  font-weight: 500;
  color: black;
  background-color: white;
}

.modal-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.modal-button:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.modal-button::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 100%;
  border-radius: 100px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: all 0.4s;
}

.modal-button::after {
  background-color: #fff;
}

.modal-button:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}

/**** */
/* From Uiverse.io by vinodjangid07 */ 
.Btnn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100px;
  height: 40px;
  border: none;
  margin-top: 15px;
  padding: 0px 20px;
  background-color: rgb(62,139,174);
  color: white;
  font-weight: 500;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 5px 5px 0px rgb(41,101,137);
  transition-duration: .3s;
}

.svgg {
  width: 20px;
  position: absolute;
  right: 0;
  margin-right: 15px;
  fill: white;
  transition-duration: .3s;
}

.Btnn:hover {
  color: transparent;
}

.Btnn:hover svg {
  right: 43%;
  margin: 0;
  padding: 0;
  border: none;
  transition-duration: .3s;
}

.Btnn:active {
  transform: translate(3px , 3px);
  transition-duration: .3s;
  box-shadow: 2px 2px 0px rgb(140, 32, 212);
}

/* From Uiverse.io by vinodjangid07 */ 
.Btng {
  border: none;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  top:0.25em;
  transition-duration: .4s;
  cursor: pointer;
  position: relative;
  background-color: rgb(31, 31, 31);
  overflow: hidden;
}

.svgIcong {
  transition-duration: .3s;
}

.svgIcong path {
  fill: white;
}

.textg {
  position: absolute;
  color: rgb(255, 255, 255);
  width: 120px;
  font-weight: 600;
  opacity: 0;
  transition-duration: .4s;
}

.Btng:hover {
  width: 110px;
  transition-duration: .4s;
  border-radius: 30px;
}

.Btng:hover .textg {
  opacity: 1;
  transition-duration: .4s;
}

.Btng:hover .svgIcong {
  opacity: 0;
  transition-duration: .3s;
}

/* From Uiverse.io by wilsondesouza */ 
.Btnl {
  border: none;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition-duration: 0.4s;
  cursor: pointer;
   top:0.25em;
  position: relative;
  background: #0274b3;
}

.svgIconl {
  transition-duration: 0.3s;
}

.svgIconl path {
  fill: white;
}

.textl {
  position: absolute;
  color: rgb(255, 255, 255);
  width: 120px;
  font-weight: 600;
  opacity: 0;
  transition-duration: 0.4s;
}

.Btnl:hover {
  width: 110px;
  transition-duration: 0.4s;
  border-radius: 30px;
}

.Btnl:hover .textl {
  opacity: 1;
  transition-duration: 0.4s;
}

.Btnl:hover .svgIconl {
  opacity: 0;
  transition-duration: 0.3s;
}

</style>