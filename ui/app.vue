<template>
  <div class="min-h-screen flex flex-col">
    <NuxtLoadingIndicator class="bg-rose-600" />
  
    <TheHeader />
  
    <div class="flex-1 bg-slate-50 flex items-center justify-center">
      <NuxtPage />
    </div>
  
    <TheFooter />
  </div>
</template>
