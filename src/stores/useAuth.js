// authStore.js
import { ref, inject } from 'vue'

// Create a symbol for the auth context
export const AuthSymbol = Symbol('Auth')

// Initialize auth from localStorage if available
const getInitialAuth = () => {
    try {
        const stored = localStorage.getItem('auth')
        return stored ? JSON.parse(stored) : {}
    } catch (error) {
        console.error('Error loading auth from localStorage:', error)
        return {}
    }
}

// Global auth store instance
const auth = ref(getInitialAuth())

export function createAuthStore() {
    const setAuth = (newAuth) => {
        auth.value = newAuth;

        // Persist to localStorage
        try {
            localStorage.setItem('auth', JSON.stringify(newAuth))
        } catch (error) {
            console.error('Error saving auth to localStorage:', error)
        }

        console.log("=== AUTH SET ===")
        console.log("Username:", auth.value.user)
        const firstRole = auth.value.roles?.[0];
        console.log("First role number:", firstRole);
        console.log("Access Token:", auth.value.accessToken)
        console.log("================")
    }

    const clearAuth = () => {
        auth.value = {};

        // Remove from localStorage
        try {
            localStorage.removeItem('auth')
        } catch (error) {
            console.error('Error removing auth from localStorage:', error)
        }

        console.log("User logged out")
        console.log(auth.value)
    }

    const isAuthenticated = () => {
        const firstRole = auth.value.roles?.[0];
        return firstRole === 2001;
    }

    return {
        auth,
        setAuth,
        clearAuth,
        isAuthenticated
    }
}

// Export the global store instance
export const globalAuthStore = createAuthStore()

export function useAuth() {
    const context = inject(AuthSymbol)
    if (!context) {
        throw new Error('useAuth must be used within a component that has auth provided')
    }
    return context
}