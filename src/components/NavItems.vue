<template>
  <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
    
    <div class="logo"  >
      <a href="https://www.go-platform.com/"><img :src="logoURL" alt="Vue" /> </a>
      
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
            <path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/>
          </svg>
        </span>
      </button>
    </div>

    <div class="menu">
      
      <router-link to="/dashboard" class="button tohover">
        <span class="material-icons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg></span>
        <span class="text" >Dashboard</span>
      </router-link>
      
      <!-- Pages Section -->
      
        <div class="section-header">
          <span class="text">Pages</span>
        </div>
        <div class="submenu " v-show="expandedSections.pages">
          <router-link to="/companies" @click.stop  class="button tohover">
             <span class="material-icons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z"/></svg></span>
            <span class="text ">Companies</span>
          </router-link>
          <router-link to="/assessments" @click.stop  class="button tohover">
            <span class="material-icons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M560-360q17 0 29.5-12.5T602-402q0-17-12.5-29.5T560-444q-17 0-29.5 12.5T518-402q0 17 12.5 29.5T560-360Zm-30-128h60q0-29 6-42.5t28-35.5q30-30 40-48.5t10-43.5q0-45-31.5-73.5T560-760q-41 0-71.5 23T446-676l54 22q9-25 24.5-37.5T560-704q24 0 39 13.5t15 36.5q0 14-8 26.5T578-596q-33 29-40.5 45.5T530-488ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg></span>
            <span class="text ">Assessments</span>
          </router-link>
          <router-link to="/payments" @click.stop  class="button tohover">
            <span class="material-icons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"/></svg></span>
            <span class="text ">Payments</span>
          </router-link>
          <router-link to="/support-tickets" @click.stop  class="button tohover">
            <span class="material-icons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440Zm-80-280q-17 0-28.5-11.5T320-440q0-17 11.5-28.5T360-480q17 0 28.5 11.5T400-440q0 17-11.5 28.5T360-400Zm240 0q-17 0-28.5-11.5T560-440q0-17 11.5-28.5T600-480q17 0 28.5 11.5T640-440q0 17-11.5 28.5T600-400Zm-359-62q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z"/></svg></span>
            <span class="text ">Support Tickets</span>
          </router-link>
        </div>
     
      
      <!-- Configuration Section -->
     
        <div class="section-header">
           <span class="text">Configuration</span>
          
        </div>
        <div class="submenu" v-show="expandedSections.configuration">
          <router-link to="/adminBlogs"  class="button tohover">
            <span class="material-icons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M160-120q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v560q0 33-23.5 56.5T800-120H160Zm0-80h640v-560H160v560Zm80-80h480v-80H240v80Zm0-160h160v-240H240v240Zm240 0h240v-80H480v80Zm0-160h240v-80H480v80ZM160-200v-560 560Z"/></svg></span>
            <span class="text ">Blogs</span>
          </router-link>
          <router-link to="/categories"   class="button tohover">
            <span class="material-icons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M80-140v-320h320v320H80Zm80-80h160v-160H160v160Zm60-340 220-360 220 360H220Zm142-80h156l-78-126-78 126ZM863-42 757-148q-21 14-45.5 21t-51.5 7q-75 0-127.5-52.5T480-300q0-75 52.5-127.5T660-480q75 0 127.5 52.5T840-300q0 26-7 50.5T813-204L919-98l-56 56ZM660-200q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29ZM320-380Zm120-260Z"/></svg></span>
            <span class="text ">Blogs Categories</span>
          </router-link>
          <router-link to="/JobPositionsAdmin"   class="button tohover">
            <span class="material-icons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z"/></svg></span>
            <span class="text ">Job Positions</span>
          </router-link>
        </div>
      
      
      <!-- Marketing Section -->
      
        <div class="section-header">
          <span class="text">Marketing</span>
          
        </div>
        <div class="submenu" v-show="expandedSections.marketing">
          <router-link to="/newsletter"   class="button tohover">
            <span class="material-icons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v58q0 59-40.5 100.5T740-280q-35 0-66-15t-52-43q-29 29-65.5 43.5T480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480v58q0 26 17 44t43 18q26 0 43-18t17-44v-58q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h200v80H480Zm0-280q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/></svg></span>
            <span class="text ">Newsletter</span>
          </router-link>
          <router-link to="/email-templates"   class="button tohover" >
            <span class="material-icons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-280q-33 0-56.5-23.5T200-360v-400q0-33 23.5-56.5T280-840h560q33 0 56.5 23.5T920-760v400q0 33-23.5 56.5T840-280H280Zm280-188L280-663v303h560v-303L560-468Zm0-98 280-194H280l280 194ZM120-120q-33 0-56.5-23.5T40-200v-500h80v500h660v80H120Zm720-546v-94H280v94-94h560v94Z"/></svg></span>
            <span class="text ">Email Templates</span>
          </router-link>
        </div>
     
      
      <!-- Settings Section -->
      
        <div class="section-header">
           <span class="text">Settings</span>
         
        </div>
        <div class="submenu" v-show="expandedSections.settings">
          <router-link to="/user-management"   class="button tohover">
            <span class="material-icons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg></span>
            <span class="text ">User Management</span>
          </router-link>
          <router-link to="/system-settings"   class="button tohover">
            <span class="material-icons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-280h80l12-60q12-5 22.5-10.5T576-364l58 18 40-68-46-40q2-14 2-26t-2-26l46-40-40-68-58 18q-11-8-21.5-13.5T532-620l-12-60h-80l-12 60q-12 5-22.5 10.5T384-596l-58-18-40 68 46 40q-2 14-2 26t2 26l-46 40 40 68 58-18q11 8 21.5 13.5T428-340l12 60Zm40-120q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg></span>
            <span class="text " >System Settings</span>
          </router-link>
          <router-link to="/payment-gateways"   class="button tohover">
            <span class="material-icons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v240H160v240h400v80H160Zm0-480h640v-80H160v80ZM760-80v-120H640v-80h120v-120h80v120h120v80H840v120h-80ZM160-240v-480 480Z"/></svg></span>
            <span class="text ">Payment Gateways</span>
          </router-link>
          <router-link to="/integrations"   class="button tohover">
            <span class="material-icons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M352-120H200q-33 0-56.5-23.5T120-200v-152q48 0 84-30.5t36-77.5q0-47-36-77.5T120-568v-152q0-33 23.5-56.5T200-800h160q0-42 29-71t71-29q42 0 71 29t29 71h160q33 0 56.5 23.5T800-720v160q42 0 71 29t29 71q0 42-29 71t-71 29v160q0 33-23.5 56.5T720-120H568q0-50-31.5-85T460-240q-45 0-76.5 35T352-120Zm-152-80h85q24-66 77-93t98-27q45 0 98 27t77 93h85v-240h80q8 0 14-6t6-14q0-8-6-14t-14-6h-80v-240H480v-80q0-8-6-14t-14-6q-8 0-14 6t-6 14v80H200v88q54 20 87 67t33 105q0 57-33 104t-87 68v88Zm260-260Z"/></svg></span>
            <span class="text ">Integrations</span>
          </router-link>
        </div>
      </div>
    
  
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import logoURL from "@/assets/logo.svg"
const is_expanded = ref(localStorage.getItem("is_expanded") === "false")

const expandedSections = ref({
  pages: true,
  configuration: true,
  marketing: true,
  settings: true
})

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value
  localStorage.setItem("is_expanded", is_expanded.value)
}


</script>

<style scoped>

:root {
 
  --sidebar-bg: #ffffff;
  --text-dark: #2b2d42;
  --text-light: #6c757d;
  --text-lighter: #8e9aaf;
  --border-radius: 12px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --hover-scale: 1.05;

  --gradient-hover:#3e96f3;
}
.section-header{
  color:#535353;
  margin-left: 5px;
}


.logo {
  transition: var(--transition);
  
  border-radius: var(--border-radius);
}


.logo img {
  width: 40px;
  height: 30px;
  margin-top: 15px;
  margin-left: 5px;
  margin-bottom: 5px;
  object-fit: contain;
  transition: var(--transition);
  filter: brightness(1);
}

.logo:hover img {
  filter: brightness(1.1) drop-shadow(0 2px 4px rgba(67, 97, 238, 0.2));
}

.menu-toggle-wrap {
  display: flex;
  margin-left: 10px;
  position: relative;
  transition: var(--transition);
}

.menu-toggle:hover {
  transform: scale(1.2);
  color: var(--primary-dark);
  transition: cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: var(--shadow-light);
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex-grow: 1;
  
}

.button {
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 12px;
  color: var(--text-light);
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
  border-radius: 8px;
  padding: 0.5rem 0.5rem;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  margin: 0.1rem ;
}

.button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: -8px;
  width: 4px;
  height: 0;
  border-radius: 2px;
  transform: translateY(-50%);
  transition: height 0.3s ease;
}

.button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  
  transition: left 0.5s ease;
}

.button:hover::before {
  height: 60%;
}

.button:hover::after {
  left: 100%;
}

.button:hover {

  
  transform: translateX(6px) scale(1.01);
  
  border-left: 2px solid transparent;
  
}

.button:hover svg {
  transform: scale(1.1) rotate(2deg);
  
}

.button:active {
  transform: translateX(6px) scale(0.98);
}

.button.tohover:hover {
 
  border-left: 3px solid var(--primary);
 
}
.button.router-link-exact-active {
  font-weight: 600;
  background: rgba(69, 176, 226, 0.24);
  position: relative;
  color: #0871da;
  border-radius: 6px;
  transition: all 0.2s ease;
}

/* Add a subtle left border for active state */
.button.router-link-exact-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 70%;
  background: #0071e9;
  border-radius: 0 2px 2px 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.button.router-link-exact-active:hover {
 
  transform: translateX(2px) scale(1.02);
 
}

.text {
  opacity: 0;
  white-space: nowrap;
;
  transform: translateX(-10px);
}



.is-expanded .logo {
  padding-left: 0.5rem;
}

.is-expanded .logo img {
  width: 70px;
  height: 50px;
}

.is-expanded .menu-toggle {
  transform: translateX(120px) rotate(-180deg);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1.15); }
  40% { transform: translateY(-3px) scale(1.15); }
  60% { transform: translateY(-2px) scale(1.15); }
}
/* Main sidebar transition improvements */
aside {
  display: flex;
  flex-direction: column;
  background: var(--sidebar-bg);
  width: 60px;
  height: 100vh;
  /* Improved transition with better easing and longer duration */
  transition: width 0.4s cubic-bezier(0.23, 1, 0.32, 1), 
              padding 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  z-index: 100;
  cursor: pointer;
  overflow: hidden; /* Prevent content overflow during transition */
}

/* Text elements - staggered transitions for smoother appearance */
.text {
  opacity: 0;
  white-space: nowrap;
  transform: translateX(-10px);
  /* Faster fade out, slower fade in */
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1), 
              transform 0.4s cubic-bezier(0.4, 0, 0.6, 1);
  transition-delay: 0s; /* No delay when collapsing */
}

is_expanded .text{
  display: none;
}
/* Logo transitions */
.logo {
  transition: padding 0.4s cubic-bezier(0.23, 1, 0.32, 1);
 
}

.logo img {

  transition: width 0.4s cubic-bezier(0.23, 1, 0.32, 1),
              height 0.4s cubic-bezier(0.23, 1, 0.32, 1),
              filter 0.3s ease;
  filter: brightness(1);
}



/* Expanded state */
.is-expanded {
  width:180px;

}

.is-expanded .logo {
  padding-left: 0.5rem;
}

.is-expanded .logo img {
  width: 70px;
  height: 50px;
}

/* Text appears with staggered delay when expanding */
.is-expanded .text {
  opacity: 1;
  transform: translateX(0);
  /* Delayed appearance when expanding for smoother effect */
  transition-delay: 0.15s;
}







/* Submenu items also get staggered delays */
.is-expanded .submenu .button:nth-child(1) .text { transition-delay: 0.2s; }
.is-expanded .submenu .button:nth-child(2) .text { transition-delay: 0.25s; }
.is-expanded .submenu .button:nth-child(3) .text { transition-delay: 0.3s; }
.is-expanded .submenu .button:nth-child(4) .text { transition-delay: 0.35s; }



</style>