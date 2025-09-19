<script>
import { useAuth } from '@/stores/useAuth.js';
import { useRouter } from 'vue-router';
import axios from '@/api/axios';

const LOGOUT_URL = '/logout';

export default {
  name: "UserProfile",
  
  data() {
    return {
      
     
      
    }
  },

  computed: {
    menuItems() {
      return [
        { title: 'Profile', icon: 'bx-user', action: () => this.$router.push('/dashboard') },
        { title: 'System Settings', icon: 'bx-cog', action: () => this.$router.push('/dashboard')  },
        { title: 'Users', icon: 'bx-user', action: () => this.$router.push('/dashboard')  },
        { title: 'Support', icon: 'bx-user', action: () => this.$router.push('/dashboard')  },
        { isDivider: true },
        { title: 'Logout', icon: 'bx-log-out', action: this.logout }
      ];
    }
  },

  

 setup() {
    const { clearAuth } = useAuth();
    const router = useRouter();
    
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
  }
}
</script>

<template>
 
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
    bordered
  >
   
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
      size="36"
    >
<!--     VImg with company initials text overlay 
     
      <VImg
        width="36"
        height="36"
        
        class="initials-avatar"
      >
       
      </VImg> -->
     
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList class="py-0">
          <!-- Menu Items -->
          <template v-for="(item, index) in menuItems" :key="item.title || `divider-${index}`">
            <VDivider 
              v-if="item.isDivider" 
              class="my-2" 
            />
            <VListItem
              v-else
              @click="item.action"
            >
              <template #prepend>
                <VIcon
                  class="me-2"
                  :icon="item.icon"
                  size="22"
                />
              </template>
              <VListItemTitle>{{ item.title }}</VListItemTitle>
            </VListItem>
          </template>
        </VList>
      </VMenu>
    </VAvatar>
   
  </VBadge>

</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.v-list-item {
  min-height: 42px;
}

.v-list-item:hover {
  background: rgba(var(--v-theme-primary), 0.08);
}
.cursor-pointer {
  cursor: pointer;
}

.v-list-item {
  min-height: 42px;
}

.v-list-item:hover {
  background: rgba(var(--v-theme-primary), 0.08);
}

.initials-avatar {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.initials-overlay {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
}

.initials-text {
  color: white;
  font-weight: bold;
  font-size: 16px;

  
}
</style>