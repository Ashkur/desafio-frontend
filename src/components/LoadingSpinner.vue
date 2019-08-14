<template>
<div class="h-screen w-full absolute flex flex-col items-center justify-center bg-blue-400">
    <div class="loader"></div>
</div>
</template>

<style >

.loader {
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db; 
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>