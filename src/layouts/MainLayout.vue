<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      :class="$q.dark.isActive ? 'text-white' : 'text-black glass-header-light'"
      class="glass-header"
      height-hint="48"
    >
      <q-toolbar style="min-height: 48px">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          class="q-mr-sm lt-md"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-subtitle1 text-weight-bold row items-center no-wrap">
          <q-icon name="local_library" size="20px" class="q-mr-sm" />
          ClassMaster
        </q-toolbar-title>

        <q-space />

        <div class="gt-sm row items-center q-gutter-x-md">
          <q-btn
            flat
            rounded
            no-caps
            label="Home"
            to="/"
            class="text-caption hover-text-primary transition-colors"
            :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-8'"
          />
          <q-btn
            flat
            rounded
            no-caps
            label="Distinction"
            href="#features"
            class="text-caption hover-text-primary transition-colors"
            :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-8'"
          />
          <q-btn
            flat
            rounded
            no-caps
            label="Success Stories"
            href="#testimonials"
            class="text-caption hover-text-primary transition-colors"
            :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-8'"
          />
          <q-btn
            flat
            rounded
            no-caps
            label="Contact"
            href="#contact"
            class="text-caption hover-text-primary transition-colors"
            :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-8'"
          />
        </div>

        <q-space />

        <div class="row items-center q-gutter-x-sm">
          <q-btn
            flat
            round
            dense
            :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'"
            @click="toggleTheme"
            :color="$q.dark.isActive ? 'grey-5' : 'grey-8'"
          />
          <q-btn
            v-if="!user"
            flat
            rounded
            no-caps
            label="Log In"
            to="/login"
            class="text-caption gt-xs"
            :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'"
          />
          <q-btn
            v-else
            flat
            rounded
            no-caps
            label="Account"
            to="/dashboard"
            class="text-caption gt-xs"
            :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'"
          />
          <q-btn
            label="Enroll Now"
            no-caps
            class="neo-btn gt-xs"
            size="sm"
            padding="4px 12px"
            :class="$q.dark.isActive ? 'bg-white text-black' : 'bg-black text-white'"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      class="bg-black text-white"
      :width="250"
      overlay
      behavior="mobile"
    >
      <q-list padding>
        <q-item-label header class="text-grey-5"> Menu </q-item-label>

        <q-item clickable v-ripple to="/" active-class="text-white bg-grey-9">
          <q-item-section avatar>
            <q-icon name="home" color="white" />
          </q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>

        <q-item clickable v-ripple href="#features">
          <q-item-section avatar>
            <q-icon name="star" color="white" />
          </q-item-section>
          <q-item-section>Distinction</q-item-section>
        </q-item>

        <q-item clickable v-ripple href="#testimonials">
          <q-item-section avatar>
            <q-icon name="thumb_up" color="white" />
          </q-item-section>
          <q-item-section>Success Stories</q-item-section>
        </q-item>

        <q-item clickable v-ripple href="#contact">
          <q-item-section avatar>
            <q-icon name="mail" color="white" />
          </q-item-section>
          <q-item-section>Contact</q-item-section>
        </q-item>
      </q-list>

      <div class="q-pa-md absolute-bottom">
        <q-btn label="Enroll Now" class="full-width neo-btn" no-caps />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const leftDrawerOpen = ref(false)
const supabase = inject('supabase')
const user = ref(null)

// Set dark mode active by default for that futuristic look
$q.dark.set(true)

onMounted(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  user.value = session?.user || null

  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user || null
  })
})

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleTheme() {
  $q.dark.toggle()
}
</script>

<style scoped>
.glass-header {
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-header-light {
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.neo-btn {
  border-radius: 4px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.transition-colors {
  transition: color 0.3s ease;
}
.hover-text-primary:hover {
  color: var(--q-primary) !important;
}
</style>
