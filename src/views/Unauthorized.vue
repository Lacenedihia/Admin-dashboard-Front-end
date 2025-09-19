<template>
  <div class="unauthorized-container">
    <div class="unauthorized-content">
      <h1>Access Denied</h1>
      <p>You don't have permission to access this page.</p>
     
    </div>
  </div>
</template>

<style scoped>
.unauthorized-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.unauthorized-content {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

h1 {
  color: #dc3545;
  margin-bottom: 1rem;
}

p {
  color: #6c757d;
  margin-bottom: 2rem;
}

.return-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #4ac0de;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.return-link:hover {
  background-color: #3aa8c4;
}
</style>