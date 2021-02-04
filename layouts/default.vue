<template>
  <div class="container">
    <!-- SVG Icons -->
    <app-icons />

    <!-- Header -->
    <app-header />

    <!-- Control panel -->
    <app-controls />

    <!-- Toast -->
    <app-toast />

    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import AppIcons from '@/components/common/icons'
import AppHeader from '@/components/common/header'
import AppControls from '@/components/common/controls'
import AppToast from '@/components/common/toast'

export default {
  components: {
    AppIcons,
    AppHeader,
    AppControls,
    AppToast
  }
}
</script>