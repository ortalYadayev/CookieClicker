<template>
  <div>
    <div class="tw-flex tw-flex-col lg:tw-flex-row">
      <div class="tw-flex tw-flex-1 tw-bg-white tw-shadow-md">
        <Tabs class="tw-min-h-12 tw-w-full">
          <Tab name="Reward Stock" query="stock">
            <RewardStock />
          </Tab>
          <Tab name="Promo Codes" query="promo-codes">
            <PromoCodes />
          </Tab>
          <Tab name="Users" query="users">
            <Users />
          </Tab>
          <Tab name="Announcement Banner" query="announcement-banner">
            <AnnouncementBanner />
          </Tab>
          <Tab v-if="$store.getters.isRoleSuperAdmin" name="Currencies" query="currencies">
            <Currencies />
          </Tab>
          <Tab v-if="$store.getters.isRoleSuperAdmin" name="Supplier Panel" query="suppliers">
            <Suppliers />
          </Tab>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Tab from '@/components/Tab'
import Tabs from "@/components/Tabs";
import RewardStock from '@/components/Admin/RewardStock';
import PromoCodes from '@/components/Admin/PromoCodes';
import Users from '@/components/Admin/Users';
import AnnouncementBanner from '@/components/Admin/AnnouncementBanner';
import Currencies from '@/components/Admin/Currencies';
import Suppliers from '@/components/Admin/Suppliers';

export default {
  name: 'Admin',
  title: 'Admin',
  components: {
    Tab,
    Tabs,
    RewardStock,
    PromoCodes,
    Users,
    AnnouncementBanner,
    Currencies,
    Suppliers,
  },
}
</script>