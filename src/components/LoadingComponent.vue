<template>
    <div class="min-h-screen mt-[230px] w-full bg-gray-50 p-6 space-y-6 animate-pulse">
        <!-- Top Metrics -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="n in 4" :key="'metric-' + n" class="h-[100px] bg-gray-200 rounded-2xl shimmer w-full"></div>
        </div>

        <!-- Header + Buttons -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div class="space-y-2">
                <div class="w-[300px] h-6 bg-gray-200 rounded shimmer"></div>
                <div class="w-[150px] h-4 bg-gray-200 rounded shimmer"></div>
            </div>

            <!-- Conditional rendering: show buttons for `talents` page -->
            <div v-if="type == 'talents'" class="flex gap-2">
                <div class="w-10 h-10 bg-gray-200 rounded shimmer"></div>
                <div class="w-10 h-10 bg-gray-200 rounded shimmer"></div>
                <div class="w-[100px] h-10 bg-gray-200 rounded shimmer"></div>
            </div>

            <!-- For other types -->
            <div v-else class="w-[100px] h-10 bg-gray-200 rounded shimmer"></div>
        </div>

        <!-- Tabs -->
        <div class="flex flex-wrap gap-6">
            <div v-for="n in 4" :key="'tab-' + n" :class="tabClasses[n - 1] + ' bg-gray-200 rounded shimmer'"></div>
        </div>

        <!-- Dynamic Page Content -->
        <div v-if="type == 'talents'">
            <!-- Header -->
            <div class="w-32 h-6 bg-gray-200 rounded shimmer"></div>

            <!-- Talent List -->
            <div class="bg-white rounded-2xl shadow p-6 space-y-6 shimmer">
                <div v-for="n in 5" :key="'talent-' + n" class="flex justify-between items-center border-b pb-4">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div class="w-40 h-5 bg-gray-200 rounded"></div>
                    </div>
                    <div class="w-[80px] h-10 bg-blue-200 rounded"></div>
                </div>
            </div>
        </div>

        <div v-else-if="type == 'job-details'" class="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow">
            <!-- Job Summary Card -->
            <div class="bg-white rounded-2xl p-6 space-y-4 shadow shimmer h-full">
                <div class="w-32 h-5 bg-gray-200 rounded"></div>
                <div class="space-y-3">
                    <div class="h-4 w-full bg-gray-200 rounded"></div>
                    <div class="h-4 w-3/4 bg-gray-200 rounded"></div>
                    <div class="h-4 w-5/6 bg-gray-200 rounded"></div>
                    <div class="h-4 w-2/3 bg-gray-200 rounded"></div>
                </div>
            </div>

            <!-- Included Tests Table -->
            <div class="bg-white rounded-2xl p-6 shadow space-y-6 shimmer h-full">
                <div class="flex justify-between items-center">
                    <div class="w-40 h-5 bg-gray-200 rounded"></div>
                    <div class="w-28 h-8 bg-gray-200 rounded"></div>
                </div>
                <div class="space-y-4">
                    <div v-for="n in 4" :key="'test-row-' + n" class="flex items-center justify-between gap-4">
                        <div class="w-48 h-6 bg-gray-200 rounded"></div>
                        <div class="w-10 h-6 bg-gray-200 rounded"></div>
                        <div class="w-10 h-6 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    type: {
        type: String,
        default: "job-details", // or 'job-details'
    },
});

const tabClasses = ["w-20 h-5", "w-20 h-5", "w-28 h-5", "w-28 h-5"];
</script>

<style scoped>
.loader-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    padding: 2rem;
}

.skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    width: 100%;
    max-width: 1200px;
}

.skeleton-card {
    background-color: #fff;
    padding: 1rem;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 240px;
    position: relative;
    overflow: hidden;
}

.skeleton-header {
    display: flex;
    gap: 0.75rem;
    align-items: center;
}

.skeleton-avatar {
    width: 40px;
    height: 40px;
    background-color: #e5e7eb;
    border-radius: 50%;
}

.skeleton-lines {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.skeleton-line {
    height: 14px;
    background-color: #e5e7eb;
    border-radius: 8px;
}

.skeleton-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: auto;
}

.skeleton-button {
    flex: 1;
    height: 32px;
    background-color: #e5e7eb;
    border-radius: 8px;
}

.shimmer {
    position: relative;
    overflow: hidden;
}
.shimmer::before {
    content: "";
    position: absolute;
    top: 0;
    left: -150px;
    height: 100%;
    width: 150px;
    background: linear-gradient(to right, transparent 0%, #f3f4f6 50%, transparent 100%);
    animation: shimmer 1.2s infinite;
}
@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}
</style>
