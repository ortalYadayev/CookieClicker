<template>
  <div class="tw-flex">
    <SidebarMenu />
    <MobileNavigation />
  </div>
</template>

<script>
import SidebarMenu from './SideBarMenu';
import MobileNavigation from './MobileNavigation';

export default {
  name: 'Navigation',
  components: {
    SidebarMenu,
    MobileNavigation,
  }
}
</script>
