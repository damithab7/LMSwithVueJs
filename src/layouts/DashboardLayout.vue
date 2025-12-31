<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="glass-header"
      :class="$q.dark.isActive ? 'text-white' : 'text-black'"
      height-hint="48"
    >
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title v-if="$q.screen.gt.xs"> {{ pageTitle }} </q-toolbar-title>

        <q-space />

        <!-- Search Bar (Premium) -->
        <q-input
          dense
          borderless
          v-model="searchQuery"
          placeholder="Search..."
          class="q-mr-md search-input"
        >
          <template v-slot:prepend>
            <q-icon name="search" class="q-pl-md" :color="$q.dark.isActive ? 'grey-5' : 'grey-7'" />
          </template>
        </q-input>

        <div class="row items-center q-gutter-x-sm">
          <q-btn
            flat
            round
            dense
            :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'"
            @click="toggleTheme"
            :color="$q.dark.isActive ? 'grey-5' : 'grey-7'"
          />

          <!-- Profile Icon -->
          <q-btn
            flat
            round
            dense
            icon="account_circle"
            to="/dashboard/profile"
            :color="$q.dark.isActive ? 'grey-1' : 'grey-9'"
          >
            <q-tooltip>Profile</q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            icon="logout"
            @click="handleLogout"
            :color="$q.dark.isActive ? 'grey-5' : 'grey-7'"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above class="sidebar-premium">
      <q-list padding class="q-py-lg">
        <q-item-label
          header
          class="text-subtitle2 text-weight-bold text-uppercase letter-spacing-1 q-mb-sm q-px-lg"
          :class="$q.dark.isActive ? 'text-grey-6' : 'text-grey-7'"
        >
          Menu
        </q-item-label>

        <q-item
          clickable
          v-ripple
          to="/dashboard"
          exact
          active-class="active-menu-item"
          class="menu-item q-mx-md q-mb-xs"
        >
          <q-item-section avatar><q-icon name="dashboard" size="20px" /></q-item-section>
          <q-item-section class="text-weight-medium">Overview</q-item-section>
        </q-item>

        <!-- Student Only -->
        <template v-if="userRole === 'student'">
          <q-item
            clickable
            v-ripple
            to="/dashboard/classes"
            active-class="active-menu-item"
            class="menu-item q-mx-md q-mb-xs"
          >
            <q-item-section avatar><q-icon name="class" size="20px" /></q-item-section>
            <q-item-section class="text-weight-medium">My Classes</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/dashboard/attendance"
            active-class="active-menu-item"
            class="menu-item q-mx-md q-mb-xs"
          >
            <q-item-section avatar><q-icon name="today" size="20px" /></q-item-section>
            <q-item-section class="text-weight-medium">Attendance</q-item-section>
          </q-item>
        </template>

        <!-- Courses -->
        <q-item
          clickable
          v-ripple
          to="/dashboard/courses"
          active-class="active-menu-item"
          class="menu-item q-mx-md q-mb-xs"
        >
          <q-item-section avatar><q-icon name="library_books" size="20px" /></q-item-section>
          <q-item-section class="text-weight-medium">Courses</q-item-section>
        </q-item>

        <!-- Instructor Section -->
        <div v-if="userRole === 'teacher'" class="q-mt-lg">
          <q-item-label
            header
            class="text-subtitle2 text-weight-bold text-uppercase letter-spacing-1 q-mb-sm q-px-lg"
            :class="$q.dark.isActive ? 'text-grey-6' : 'text-grey-7'"
          >
            Instructor
          </q-item-label>
          <q-item
            clickable
            v-ripple
            to="/dashboard/payments"
            active-class="active-menu-item"
            class="menu-item q-mx-md q-mb-xs"
          >
            <q-item-section avatar><q-icon name="payments" size="20px" /></q-item-section>
            <q-item-section class="text-weight-medium">Payments</q-item-section>
          </q-item>
        </div>

        <!-- Admin / Management Section -->
        <div v-if="userRole === 'admin'" class="q-mt-lg">
          <q-item-label
            header
            class="text-subtitle2 text-weight-bold text-uppercase letter-spacing-1 q-mb-sm q-px-lg"
            :class="$q.dark.isActive ? 'text-grey-6' : 'text-grey-7'"
          >
            Management
          </q-item-label>

          <q-item
            clickable
            v-ripple
            to="/dashboard/users"
            active-class="active-menu-item"
            class="menu-item q-mx-md q-mb-xs"
          >
            <q-item-section avatar><q-icon name="people" size="20px" /></q-item-section>
            <q-item-section class="text-weight-medium">Users</q-item-section>
          </q-item>

          <q-item clickable v-ripple class="menu-item q-mx-md q-mb-xs">
            <q-item-section avatar><q-icon name="analytics" size="20px" /></q-item-section>
            <q-item-section class="text-weight-medium">Analytics</q-item-section>
          </q-item>
        </div>

        <q-separator class="q-my-md" />

        <q-item clickable v-ripple to="/" class="menu-item q-mx-md q-mb-xs">
          <q-item-section avatar><q-icon name="home" size="20px" /></q-item-section>
          <q-item-section class="text-weight-medium">Back to Home</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, inject, onMounted, provide, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const supabase = inject('supabase')
const router = useRouter()
const route = useRoute()

const pageTitle = computed(() => route.meta.title || 'ClassMaster Dashboard')
const leftDrawerOpen = ref(false)
// Mock role for demo, normally get from user metadata or context
const userRole = ref('student')
const searchQuery = ref('')
provide('searchQuery', searchQuery)

onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    // Check if profile exists
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

    if (profile) {
      userRole.value = profile.role
    } else {
      // Self-repair: Create missing profile
      // If email is the specific test one, make admin, else student
      const role = user.email === 'test@dsb.lk' ? 'admin' : 'student'
      const { error } = await supabase.from('profiles').insert({
        id: user.id,
        email: user.email,
        display_name: user.user_metadata?.display_name || user.email.split('@')[0],
        role: role,
      })

      if (!error) {
        userRole.value = role
        $q.notify({ type: 'positive', message: 'Profile restored successfully' })
        // Refresh page to load menus correctly if needed
        window.location.reload()
      } else {
        console.error('Profile creation failed', error)
      }
    }
  }
})

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleTheme() {
  $q.dark.toggle()
}

async function handleLogout() {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>

<style scoped>
.glass-header {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
/* Premium Search Input */
:deep(.search-input .q-field__control) {
  border-radius: 12px !important;
  border: 1px solid transparent;
  transition: all 0.3s ease;
  overflow: hidden; /* Ensure overlapping backgrounds don't bleed */
}
.body--light .glass-header {
  background: rgba(255, 255, 255, 0.7);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.body--light :deep(.search-input .q-field__control) {
  background: rgba(0, 0, 0, 0.03); /* Very subtle grey */
}
.body--dark :deep(.search-input .q-field__control) {
  background: #212121; /* Dark grey matching bg-grey-9 */
}

:deep(.search-input .q-field__control:hover) {
  background: rgba(0, 0, 0, 0.05);
}
.body--dark :deep(.search-input .q-field__control:hover) {
  background: rgba(255, 255, 255, 0.05);
}
:deep(.search-input .q-field__control:before),
:deep(.search-input .q-field__control:after) {
  display: none !important; /* Remove default underline/borders */
}
:deep(.search-input.q-field--focused .q-field__control) {
  background: transparent;
  border: 1px solid var(--q-primary);
  /* Removed box-shadow to fix visual artifacts */
  box-shadow: none;
}

/* Sidebar Styling */
.sidebar-premium {
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}
.body--dark .sidebar-premium {
  background: #0f0f0f; /* Deeper black */
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.menu-item {
  border-radius: 8px;
  color: #666;
  transition: all 0.2s;
}
.body--dark .menu-item {
  color: #aaa;
}
.menu-item:hover {
  background: rgba(0, 0, 0, 0.03);
  color: #000;
}
.body--dark .menu-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.active-menu-item {
  background: rgba(25, 118, 210, 0.1) !important;
  color: var(--q-primary) !important;
}
.body--dark .active-menu-item {
  background: rgba(25, 118, 210, 0.2) !important;
  color: #64b5f6 !important; /* Lighter blue for dark mode */
}
.letter-spacing-1 {
  letter-spacing: 1px;
}
</style>
