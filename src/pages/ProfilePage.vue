<template>
  <q-page class="q-pa-md container" style="max-width: 800px; margin: 0 auto">
    <div class="text-h4 text-weight-bolder q-mb-xl ls-tight">Your Profile</div>

    <q-card flat class="glass-card q-pa-lg">
      <q-form @submit="updateProfile" class="q-gutter-md">
        <!-- Email (Read-only) -->
        <div>
          <div class="text-caption text-grey-6 q-mb-xs text-uppercase letter-spacing-2">
            Email Address
          </div>
          <q-input
            v-model="formData.email"
            outlined
            readonly
            disable
            dense
            :bg-color="$q.dark.isActive ? 'transparent' : 'grey-2'"
            :dark="$q.dark.isActive"
            hide-bottom-space
          />
        </div>

        <!-- Display Name -->
        <div>
          <div class="text-caption text-grey-6 q-mb-xs text-uppercase letter-spacing-2">
            Display Name
          </div>
          <q-input
            v-model="formData.displayName"
            outlined
            dense
            :bg-color="$q.dark.isActive ? 'transparent' : 'white'"
            :dark="$q.dark.isActive"
            placeholder="Enter your name"
            :rules="[(val) => !!val || 'Name is required']"
          />
        </div>

        <!-- Role (Read-only indication) -->
        <div>
          <div class="text-caption text-grey-6 q-mb-xs text-uppercase letter-spacing-2">Role</div>
          <q-badge
            :color="$q.dark.isActive ? 'white' : 'black'"
            class="q-py-xs q-px-sm text-subtitle2"
            outline
          >
            {{ userRole }}
          </q-badge>
        </div>

        <div class="q-mt-xl">
          <q-btn
            label="Save Changes"
            type="submit"
            no-caps
            class="neo-btn full-width"
            :loading="loading"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const supabase = inject('supabase')
const loading = ref(false)

const formData = ref({
  email: '',
  displayName: '',
})

const user = ref(null)

const userRole = computed(() => {
  // Check metadata for role, default to User/Admin based on context or 'User'
  return user.value?.user_metadata?.role || 'Admin'
})

onMounted(async () => {
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser()
  if (currentUser) {
    user.value = currentUser
    formData.value.email = currentUser.email
    formData.value.displayName = currentUser.user_metadata?.display_name || ''
  }
})

async function updateProfile() {
  loading.value = true
  try {
    const { error } = await supabase.auth.updateUser({
      data: { display_name: formData.value.displayName },
    })

    if (error) throw error

    $q.notify({
      type: 'positive',
      message: 'Profile updated successfully',
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message,
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.glass-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 0;
}

.body--dark .glass-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.ls-tight {
  letter-spacing: -1px;
}

.letter-spacing-2 {
  letter-spacing: 2px;
}

/* Reusing neo-btn style just to be safe if global css isn't catching specific context */
.neo-btn {
  background: white !important;
  color: black !important;
  border: 3px solid black !important;
  box-shadow: 0 6px 0 black;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 1px;
  border-radius: 0 !important;
  padding: 10px 24px;
}
.neo-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 0 black;
}
.neo-btn:active {
  transform: translateY(4px);
  box-shadow: 0 2px 0 black;
}
</style>
