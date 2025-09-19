<template>
  <footer class="app-footer">
    <div class="footer-content">
      <!-- 👉 Footer: left content -->
      <div class="footer-left">
        <span class="copyright-text">
          &copy; {{ new Date().getFullYear() }} Made 
          <VIcon
            icon="bx-heart"
            color="error"
            size="1.25rem"
            class="heart-icon"
          />
          By
          <a
            href="https://www.go-platform.com"
            target="_blank"
            rel="noopener noreferrer"
            class="company-link"
          >
            Go Platform
          </a>
        </span>
      </div>

      <!-- 👉 Footer: right content -->
      <div class="footer-right">
        <nav class="footer-links">
          <a
           href="https://www.go-platform.com"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            License
          </a>
         
          
          <a
            href="https://www.go-platform.com"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            Support
          </a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: rgba(var(--v-theme-surface), 0.75);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 0 24px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.03);
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
}

.footer-content {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.footer-left {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: rgba(var(--v-theme-on-surface), 0.7);
  flex-wrap: wrap;
}

.copyright-text {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

.heart-icon {
  margin: 0 4px;
  transition: transform 0.2s ease, color 0.2s ease;
}

.heart-icon:hover {
  transform: scale(1.2);
  color: #ff4d4f !important;
}

.company-link {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.company-link:hover {
  color: rgba(var(--v-theme-primary), 0.8);
  text-decoration: underline;
}

.footer-right {
  display: none;
}

.footer-links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.footer-link {
  color: rgba(var(--v-theme-on-surface), 0.7);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: rgb(var(--v-theme-primary));
  text-decoration: underline;
}

@media (min-width: 960px) {
  .footer-right {
    display: flex;
    align-items: center;
  }
}

@media (max-width: 599px) {
  .app-footer {
    height: auto;
    padding: 12px 16px;
    justify-content: center;
  }

  .footer-content {
    flex-direction: column;
    align-items: center;
    gap: 6px;
    text-align: center;
  }

  .footer-links {
    justify-content: center;
  }

  .copyright-text {
    justify-content: center;
  }
}

</style>