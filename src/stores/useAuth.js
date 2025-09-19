// authStore.js
import { ref, inject } from 'vue'

// Create a symbol for the auth context
export const AuthSymbol = Symbol('Auth')


// Global auth store instance
const auth = ref({})

export function createAuthStore() {
    const setAuth = (newAuth) => {
        auth.value = newAuth;

        console.log("=== AUTH SET ===")
        console.log("Username:", auth.value.user)
        const firstRole = auth.value.roles?.[0];
        console.log("First role number:", firstRole);
        console.log("Access Token:", auth.value.accessToken)
        console.log("================")
    }

    const clearAuth = () => {
        auth.value = {};
        console.log("none logg")
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