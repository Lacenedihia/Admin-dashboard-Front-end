<template>
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
  
  <div class="scroll-down"> SCROLL DOWN
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path d="M16 3C8.832031 3 3 8.832031 3 16s5.832031 13 13 13 13-5.832031 13-13S23.167969 3 16 3zm0 2c6.085938 0 11 4.914063 11 11 0 6.085938-4.914062 11-11 11-6.085937 0-11-4.914062-11-11C5 9.914063 9.914063 5 16 5zm-1 4v10.28125l-4-4-1.40625 1.4375L16 23.125l6.40625-6.40625L21 15.28125l-4 4V9z"/> 
    </svg>
  </div>
  
  
  <div class="container"></div>
  
  <div class="modal" ref="modalRef">
    
    <form class="modal-container" @submit.prevent="handleSubmit">
      <div class="modal-left">
       
        
        <h1 class="modal-title">Register Page</h1>
        <p class="modal-desc"></p>
   
    

<div class="inputGroup">
      <input 
            type="text" 
            name="email"   
            id="username"
           
             autocomplete="off" 
            ref="userRef"
            v-model="user"
        required
        :aria-invalid="!validName"
        aria-describedby="uidnote"
        @focus="userFocus = true"
        @blur="userFocus = false"/>
        
       <label for="name" class="input-label">Username
        <FontAwesomeIcon :icon="faCheck" :class="validName ? 'valid' : 'hide'" />
        <FontAwesomeIcon :icon="faTimes" :class="validName || !user ? 'hide' : 'invalid'" />
    </label>

</div>

<div  :class="userFocus && user && !validName ? 'tooltip-content show' : 'tooltip-content offscreen'"
    class="smooth-tooltip">

<p id="uidnote" >
        
        4 to 24 characters.<br />
        Must begin with a letter.<br />
        Letters, numbers, underscores, hyphens allowed.
      </p></div>
     
  <div class="inputGroup">
   <input 
            type="password" 
            name="password" 
            id="password" 
          autocomplete="off"
            v-model="pwd"
            required
            :aria-invalid="!validPwd"
        aria-describedby="pwdnote"
        @focus="pwdFocus = true"
        @blur="pwdFocus = false"
            />
        
        <label for="password" class="input-label">Password
        <FontAwesomeIcon :icon="faCheck" :class="validPwd ? 'valid' : 'hide'" />
        <FontAwesomeIcon :icon="faTimes" :class="validPwd || !pwd ? 'hide' : 'invalid'" />
    </label>

</div>   
  <div  :class="pwdFocus && !validPwd ?'tooltip-content show' : 'tooltip-content offscreen'"
    class="smooth-tooltip">
    <p id="pwdnote" >
     
        8 to 24 characters.<br />
        Must include uppercase and lowercase letters, a number and a special character.<br />
        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
      </p>
</div>
 <div class="inputGroup">
     <input 
            type="password" 
            name="password" 
            id="confirm_pwd" 
           autocomplete="off"
              v-model="matchPwd"
        required
        :aria-invalid="!validMatch"
        aria-describedby="confirmnote"
        @focus="matchFocus = true"
        @blur="matchFocus = false"
            />
        <label for="confirm_pwd" class="input-label">  Confirm
        <FontAwesomeIcon :icon="faCheck" :class="validMatch && matchPwd ? 'valid' : 'hide'" />
        <FontAwesomeIcon :icon="faTimes" :class="validMatch || !matchPwd ? 'hide' : 'invalid'" />
       </label>

</div> 
<div  :class="matchFocus && !validMatch ? 'tooltip-content show' : 'tooltip-content offscreen'"
    class="smooth-tooltip">
    <p id="confirmnote" >
       
        Must match the first password input field.
      </p>
      </div> 

 



        <div class="modal-buttons">
          
   <!-- svgIcon -->
    <router-link to="/login" >
<button class="Btn" type="submit" >
  <div class="sign">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
  </div>

  <div class="text">LogIn</div>
</button></router-link>

     <!-- From Uiverse.io by MUJTABA201566 --> 
<button class="Btn" type="submit" :disabled="!validName || !validPwd || !validMatch">
  <div class="sign">
   <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18q30 0 58.5 3t55.5 9l-70 70q-11-2-21.5-2H400q-71 0-127.5 17T180-306q-9 5-14.5 14t-5.5 20v32h250l80 80H80Zm542 16L484-282l56-56 82 82 202-202 56 56-258 258ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm10 240Zm-10-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Z"/></svg> </div>

  <div class="text">Register</div>
</button>
 
        </div>

      
      </div>
      
      <div class="modal-right">
          
        <img src="../assets/login.jpg" alt="Login background">
      </div>
        <button type="button" class="icon-button close-button" @click="closeModal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
          <path d="M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.980469 15.990234 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 z"></path>
        </svg>
      </button>
    </form>
    
    <button class="modal-button" type="button" @click="openModal">Click here to Register</button>
  </div>
</div>
</template>
<script>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import axios from '../api/axios';
import { useRouter } from 'vue-router';
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';
import { useAuth } from '@/stores/useAuth.js';
export default {
    name: 'registerr',
  components: { FontAwesomeIcon },
  setup() {
    const userRef = ref(null);
    const errRef = ref(null);
    const modalRef = ref(null);
    const user = ref('');
     const errMsg = ref('');
    const validName = ref(false);
    const userFocus = ref(false);
    const pwd = ref('');
     const {  setAuth } = useAuth();
    const validPwd = ref(false);
    const pwdFocus = ref(false);
    const matchPwd = ref('');
    const isOpened = ref(false);
     const success = ref(false);
    const validMatch = ref(false);
    const matchFocus = ref(false);
    const router = useRouter();
// Auto-hide error message after 5 seconds
    let errorTimeout = null;

    const clearError = async () => {
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

    watch(user, (newValue) => {
      validName.value = USER_REGEX.test(newValue);
    });

    watch([pwd, matchPwd], () => {
      validPwd.value = PWD_REGEX.test(pwd.value);
      validMatch.value = pwd.value === matchPwd.value;
    });

    watch([user, pwd, matchPwd], () => {
      errMsg.value = '';
    });

 const handleSubmit = async () => {
    const v1 = USER_REGEX.test(user.value);
    const v2 = PWD_REGEX.test(pwd.value);
    if (!v1 || !v2) {
        errMsg.value = "Invalid Entry";
        return;
    }
    
    try {
        const response = await axios.post(REGISTER_URL,
            JSON.stringify({ user: user.value, pwd: pwd.value }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        
        console.log('Registration response:', JSON.stringify(response?.data));
        
        const { accessToken, roles } = response.data;
        
        // Set the authentication state with the roles object structure
        setAuth({ 
            user: user.value, 
            accessToken: accessToken,
            roles: roles  // This will be { User: 2001 } for new users
        });
        
        // Clear form
        success.value = true;
        user.value = '';
        pwd.value = '';
        matchPwd.value = '';
        
        // Redirect to dashboard
        router.push('/dashboard');
        
    } catch (err) {
        let errorMessage = 'Registration Failed';
        if (!err?.response) {
            errMsg.value = 'No Server Response';
        } else if (err.response?.status === 409) {
            errMsg.value = 'Username Taken';
        } else {
            errMsg.value = 'Registration Failed';
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
      } clearError();
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
      // Reset body overflow when component unmounts
      document.body.style.overflow = "initial";
    };

    return {
      userRef,
      errRef,
      user,
      modalRef,
       openModal,
      closeModal,
      validName,
      userFocus,
      pwd,
      validPwd,
      pwdFocus,
      matchPwd,
      validMatch,
      matchFocus,
      errMsg,
      success,
       clearError,
      handleSubmit,
      faCheck,
      faTimes,
      faInfoCircle
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



/* Toast/Popup Error Styles */
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


.container {
  height: 200vh;
   background-image:  url("../assets/Polygon Luminary.svg");
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
  background: rgba(#333, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.4s;

:is(  -container ){
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

 :is( -desc) {
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

  :is(-button) {
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
    
    :is(:hover) {
      border-color: rgba(255, 255, 255, 0.2);
      background: rgba(#fff, 0.8);
    }
  }

  :is(-right) {
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

 :is( .is-open) {
    height: 100%;
    background: rgba(#333, 0.85);

    .modal-button {
      opacity: 0;
    }

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
  color: darken(#f9fbfc, 5%);
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
  background: rgba(172, 171, 171, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.4s;
}

.modal-container {
  display: flex;
 
  width: 60%;
  height:60%;
  border-radius: 10px;
  overflow: hidden;
  position: absolute;
  margin:15px;
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
  margin: 10px 0 30px 0;
  font-size: 28px;
  font-weight: 800;

}
p{font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;}


.modal-left {
  padding: 60px 30px 60px;
  background: #fff;
  flex: 1.5;
  transition-duration: 0.5s;
  transform: translateY(80px);
  opacity: 0;
}

.modal-button {
  color: #6b5b52;
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
}

.modal-button:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.8);
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
  background: rgba(51, 51, 51, 0.85);
}

.modal.is-open .modal-button {
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
  margin-top:50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.sign-up {
  margin: 60px 0 0;
  font-size: 12px;
  text-align: center;
}

.sign-up a {
  color: #8c7569;
  text-decoration: none;
}





.icon-button {
  outline: 0;
  position: absolute;
  right: 15px;
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
  margin-bottom: 0.5rem;
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
  margin-top:60px;
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
  padding: 0.5em;
  align-items: center;
  border-radius: 50px;
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
  padding: 6px;
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
  width: 35px;
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
  
}

.Btn:hover .sign svg path {

  display: none;
}

/* hover effect button's text */
.Btn:hover .text {
  opacity: 1;
  width: 100%;
  transition-duration: 0.3s;
  margin-right: 10px;
}
/* button click effect*/
.Btn:active {
  transform: translate(2px, 2px);
}

</style>
