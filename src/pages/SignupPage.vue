<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page
        :class="$q.dark.isActive ? 'bg-black text-white' : 'bg-grey-2 text-black'"
        class="flex flex-center relative-position"
      >
        <q-img
          src="~assets/hero_education_bw.png"
          class="fullscreen"
          style="opacity: 0.3; filter: grayscale(100%)"
        />

        <div class="relative-position z-top" style="width: 100%; max-width: 400px">
          <q-card class="glass-card q-pa-lg">
            <q-card-section class="text-center">
              <div class="flex flex-center q-mb-md">
                <q-icon
                  name="person_add"
                  size="48px"
                  :color="$q.dark.isActive ? 'white' : 'primary'"
                />
              </div>
              <div class="text-h5 text-weight-bold q-mb-sm">Create Account</div>
              <div class="text-caption" :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-8'">
                Join the community today
              </div>
            </q-card-section>

            <q-card-section class="q-gutter-y-md">
              <q-input
                v-model="displayName"
                label="Display Name"
                :dark="$q.dark.isActive"
                outlined
                dense
                :color="$q.dark.isActive ? 'white' : 'primary'"
                :class="$q.dark.isActive ? 'input-dark' : ''"
                :rules="[(val) => !!val || 'Display Name is required']"
              />
              <q-input
                v-model="email"
                label="Email"
                :dark="$q.dark.isActive"
                outlined
                dense
                :color="$q.dark.isActive ? 'white' : 'primary'"
                :class="$q.dark.isActive ? 'input-dark' : ''"
                :rules="[(val) => !!val || 'Email is required']"
              />
              <q-input
                v-model="password"
                label="Password"
                type="password"
                :dark="$q.dark.isActive"
                outlined
                dense
                :color="$q.dark.isActive ? 'white' : 'primary'"
                :class="$q.dark.isActive ? 'input-dark' : ''"
                :rules="[
                  (val) => !!val || 'Password is required',
                  (val) => val.length >= 6 || 'Password must be at least 6 characters',
                ]"
              />
            </q-card-section>

            <q-card-section>
              <q-btn
                label="Sign Up"
                class="neo-btn full-width"
                no-caps
                @click="handleSignup"
                :loading="loading"
                :class="$q.dark.isActive ? 'bg-white text-black' : 'bg-black text-white'"
              />
            </q-card-section>

            <q-card-section class="text-center q-pt-none">
              <div
                class="text-caption q-mb-sm"
                :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
              >
                Already have an account?
              </div>
              <q-btn
                flat
                dense
                no-caps
                label="Log In"
                to="/login"
                :color="$q.dark.isActive ? 'white' : 'primary'"
              />
            </q-card-section>
          </q-card>
        </div>

        <!-- Theme Toggle -->
        <q-btn
          fab
          :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'"
          :color="$q.dark.isActive ? 'white' : 'black'"
          :text-color="$q.dark.isActive ? 'black' : 'white'"
          class="fixed-bottom-right q-ma-md z-max"
          @click="toggleTheme"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const supabase = inject('supabase')

const email = ref('')
const password = ref('')
const displayName = ref('')
const loading = ref(false)

function toggleTheme() {
  $q.dark.toggle()
}

const handleSignup = async () => {
  if (!email.value || !password.value) {
    $q.notify({
      type: 'negative',
      message: 'Please fill in all fields',
    })
    return
  }

  loading.value = true

  try {
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          display_name: displayName.value || email.value.split('@')[0],
          role: 'student', // Default role
        },
      },
    })

    if (error) throw error

    $q.notify({
      type: 'positive',
      message: 'Account created! Please log in.',
    })
    router.push('/')
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Signup failed',
    })
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.glass-card {
  backdrop-filter: blur(20px);
  border-radius: 12px;
}

.body--dark .glass-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
}

.body--light .glass-card {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: black;
}

:deep(.q-field--outlined .q-field__control:before) {
  border-color: rgba(128, 128, 128, 0.3);
}

.body--dark :deep(.q-field--outlined .q-field__control:hover:before) {
  border-color: rgba(255, 255, 255, 0.6);
}

.body--light :deep(.q-field--outlined .q-field__control:hover:before) {
  border-color: rgba(0, 0, 0, 0.6);
}

/* Neo-btn adaptation */
.neo-btn {
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 4px;
  border: 2px solid currentColor;
}
</style>
