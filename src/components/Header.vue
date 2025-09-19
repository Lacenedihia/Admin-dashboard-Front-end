<template>

    
    <!-- Content Wrapper -->
    <div >
      <!-- Navbar -->
      <header class="app-header">
        <div class="navbar-container">
          <!-- Search -->
   


          

          

         <div class="'right">   <VTooltip text="Notifications" location="bottom" >
              <template #activator="{ props }">
                <button 
                  v-bind="props"
                  class="action-btn notification-btn"
                  @click="toggleNotifications"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></svg>
                  <span 
                    v-if="unreadNotifications > 0" 
                    class="notification-badge"
                  >
                    {{ unreadNotifications }}
                  </span>
                </button>
              </template>
            </VTooltip></div>
            
         

            <UserProfile />
           <button class="Btn" @click="logout">
  
  <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
  
  <div class="text">Logout</div>
</button>
        </div>
      </header>
      
      <!-- Main content would go here -->
      <main class="main-content">
        <slot></slot>
      </main>
    </div>
 
</template>

<script>
import { ref } from 'vue';
import UserProfile from './UserProfile.vue';
import { useAuth } from '@/stores/useAuth.js';
import { useRouter } from 'vue-router';
import axios from '@/api/axios';

const LOGOUT_URL = '/logout';


const unreadNotifications = ref(5);

export default {
  name: 'Header',
 components: {
   UserProfile
  },
  setup() {
    const { clearAuth } = useAuth();
    const router = useRouter();
    const toggleNotifications = () => {
  // Implement notification panel toggle
  unreadNotifications.value = 0; // Mark as read when clicked
};
    const logout = async () => {
      try {
        // Change from POST to GET - no body needed for GET
        const response = await axios.get(LOGOUT_URL, {
          withCredentials: true  // This ensures cookies are sent
        });
        
        // Only clear auth AFTER successful logout
        clearAuth();
        console.log("logout successful");
        router.push('/login');
        
      } catch (err) {
        console.error("Logout error:", err);
        
        // Even if logout fails on server, clear local auth state
        clearAuth();
        router.push('/login');
        
        let errorMessage = 'Logout Failed';
        if (!err.response) {
          errorMessage = 'No Server Response';
        } else if (err.response.status === 400) {
          errorMessage = 'Bad Request';
        } else if (err.response.status === 401) {
          errorMessage = 'Unauthorized';
        } else if (err.response.status === 404) {
          errorMessage = 'Logout endpoint not found';
        } else if (err.response.status === 500) {
          errorMessage = 'Server Error - Please try again later';
        }
        
        console.error(errorMessage);
      }
    };
    
    return {
      logout
    };
  }}




</script>

<style scoped>


.app-layout {
  display: flex;
  min-height: 100vh;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.75rem 3rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 100%;
  justify-content: flex-end; /* This aligns items to the end of the flex container */
}



.meta-key {
  background: rgba(0, 0, 0, 0.1);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
}



.action-btn {
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.action-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.notification-btn {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ff4d4f;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: bold;
}

.main-content {
  flex: 1;
  padding: 1.5rem;
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
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: rgb(255, 65, 65);
}

/* plus sign */
.sign {
  width: 100%;
  transition-duration: .3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 17px;
}

.sign svg path {
  fill: white;
}
/* text */
.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: .3s;
}
/* hover effect on button width */
.Btn:hover {
  width: 150px;
  border-radius: 40px;
  transition-duration: .3s;
}

.Btn:hover .sign {
  width: 20%;
  transition-duration: .3s;
  padding-left: 20px;
}
/* hover effect button's text */
.Btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: .3s;
  padding-right: 12px;
}
/* button click effect*/
.Btn:active {
  transform: translate(2px ,2px);
}
</style> 