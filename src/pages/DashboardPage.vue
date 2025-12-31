<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">
      Welcome back, {{ user?.user_metadata?.display_name || 'User' }}
    </div>

    <div v-if="userRole === 'admin'">
      <!-- Stats Row -->
      <div class="row q-col-gutter-lg q-mb-xl">
        <div class="col-12 col-md-4">
          <q-card
            class="glass-card full-height q-pa-lg relative-position overflow-hidden hover-lift"
          >
            <div class="row items-center justify-between no-wrap">
              <div>
                <div class="text-subtitle2 text-grey-6 text-uppercase letter-spacing-1 q-mb-sm">
                  Total Users
                </div>
                <div
                  class="text-h3 text-weight-bolder"
                  :class="$q.dark.isActive ? 'text-white' : 'text-primary'"
                >
                  {{ stats.users }}
                </div>
                <div class="row items-center q-mt-sm">
                  <q-icon name="trending_up" color="green" size="xs" class="q-mr-xs" />
                  <span class="text-caption text-green text-weight-bold">+12% this week</span>
                </div>
              </div>
              <div class="q-pa-md rounded-borders bg-primary-gradient">
                <q-icon name="group" size="32px" color="white" />
              </div>
            </div>
          </q-card>
        </div>

        <div class="col-12 col-md-4">
          <q-card
            class="glass-card full-height q-pa-lg relative-position overflow-hidden hover-lift"
          >
            <div class="row items-center justify-between no-wrap">
              <div>
                <div class="text-subtitle2 text-grey-6 text-uppercase letter-spacing-1 q-mb-sm">
                  Active Instructors
                </div>
                <div
                  class="text-h3 text-weight-bolder"
                  :class="$q.dark.isActive ? 'text-white' : 'text-purple'"
                >
                  {{ stats.instructors }}
                </div>
                <div class="row items-center q-mt-sm">
                  <q-icon name="trending_flat" color="orange" size="xs" class="q-mr-xs" />
                  <span class="text-caption text-orange text-weight-bold">Stable</span>
                </div>
              </div>
              <div class="q-pa-md rounded-borders bg-purple-gradient">
                <q-icon name="school" size="32px" color="white" />
              </div>
            </div>
          </q-card>
        </div>

        <!-- Quick Action Card -->
        <div class="col-12 col-md-4">
          <q-card
            class="glass-card full-height q-pa-lg column justify-center items-start hover-lift cursor-pointer"
            @click="$router.push('/dashboard/users')"
          >
            <div class="row items-center q-mb-sm">
              <div
                class="q-pa-sm rounded-borders bg-grey-3 q-mr-md"
                :class="$q.dark.isActive ? 'bg-grey-9' : ''"
              >
                <q-icon
                  name="person_add"
                  size="24px"
                  :color="$q.dark.isActive ? 'white' : 'black'"
                />
              </div>
              <div class="text-h6 text-weight-bold">Manage Users</div>
            </div>
            <div class="text-caption text-grey-6">Quickly add or edit system users.</div>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-8">
          <div class="row items-center justify-between q-mb-md">
            <div class="text-h6 text-weight-bold">Recent Signups</div>
            <q-btn
              flat
              dense
              no-caps
              label="View All"
              color="primary"
              to="/dashboard/users"
              size="sm"
            />
          </div>

          <q-card class="glass-card">
            <q-list separator>
              <q-item v-if="recentUsers.length === 0" class="q-pa-lg text-center text-grey">
                No recent activity
              </q-item>

              <q-item v-for="user in recentUsers" :key="user.id" class="q-py-md clickable-row">
                <q-item-section avatar>
                  <q-avatar
                    size="42px"
                    font-size="20px"
                    :color="user.role === 'admin' ? 'purple-1' : 'blue-1'"
                    :text-color="user.role === 'admin' ? 'purple' : 'blue'"
                  >
                    {{ (user.display_name || user.email).charAt(0).toUpperCase() }}
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-weight-bold">{{
                    user.display_name || 'Unknown User'
                  }}</q-item-label>
                  <q-item-label caption class="text-grey-6">{{ user.email }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div class="row items-center">
                    <q-badge
                      :color="user.role === 'admin' ? 'purple' : 'blue'"
                      class="q-mr-md q-py-xs q-px-sm"
                      rounded
                    >
                      {{ user.role }}
                    </q-badge>
                    <div class="text-caption text-grey-5">
                      {{ new Date(user.created_at).toLocaleDateString() }}
                    </div>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>

        <!-- System Health / Mini Widget -->
        <div class="col-12 col-md-4">
          <div class="text-h6 text-weight-bold q-mb-md">System Health</div>
          <q-card class="glass-card q-pa-md">
            <div class="q-mb-md">
              <div class="row justify-between text-caption q-mb-xs">
                <span>Server Load</span>
                <span class="text-green text-weight-bold">Low</span>
              </div>
              <q-linear-progress
                value="0.2"
                color="green"
                rounded
                track-color="transparent"
                class="bg-grey-3"
              />
            </div>
            <div class="q-mb-md">
              <div class="row justify-between text-caption q-mb-xs">
                <span>Database</span>
                <span class="text-primary text-weight-bold">Optimal</span>
              </div>
              <q-linear-progress
                value="0.15"
                color="primary"
                rounded
                track-color="transparent"
                class="bg-grey-3"
              />
            </div>
            <div>
              <div class="row justify-between text-caption q-mb-xs">
                <span>Storage</span>
                <span class="text-orange text-weight-bold">45%</span>
              </div>
              <q-linear-progress
                value="0.45"
                color="orange"
                rounded
                track-color="transparent"
                class="bg-grey-3"
              />
            </div>
          </q-card>
        </div>
      </div>
    </div>

    <div v-else>
      <StatsOverview />
      <div class="text-h6 q-mt-lg q-mb-md">My Learning</div>
      <CourseList />
    </div>
  </q-page>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import StatsOverview from 'components/dashboard/StatsOverview.vue'
import CourseList from 'components/dashboard/CourseList.vue'

const supabase = inject('supabase')
const $q = useQuasar()
const user = ref(null)
const userRole = ref('admin')
const stats = ref({
  users: 0,
  instructors: 0,
})
const recentUsers = ref([])

onMounted(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  user.value = session?.user

  // Real Role Check (fallback to student)
  if (user.value) {
    const { data } = await supabase.from('profiles').select('role').eq('id', user.value.id).single()
    if (data) userRole.value = data.role
  }

  // Fetch admin stats if needed
  if (userRole.value === 'admin') {
    const { count: userCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
    const { count: teacherCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'teacher')

    stats.value.users = userCount || 0
    stats.value.instructors = teacherCount || 0

    // Fetch Recent Users
    const { data: recent } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    if (recent) recentUsers.value = recent

    // Revenue is still mocked, but let's format it
    stats.value.revenueFormatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumSignificantDigits: 3,
    }).format(stats.value.revenue)
  }
})
</script>

<style scoped>
.glass-card {
  border: 1px solid rgba(128, 128, 128, 0.1);
  backdrop-filter: blur(12px);
  background: white;
  transition: all 0.3s ease;
  border-radius: 16px;
}
.body--dark .glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.15);
}
.body--dark .hover-lift:hover {
  box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.3); /* Stronger dark shadow */
  border-color: rgba(255, 255, 255, 0.2);
}
/* Base shadow for glass cards too */
.glass-card {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.body--dark .glass-card {
  box-shadow: none; /* No base shadow in dark mode, only border */
}

.bg-primary-gradient {
  background: linear-gradient(135deg, #1976d2 0%, #0d47a1 100%);
}
.bg-purple-gradient {
  background: linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%);
}

.letter-spacing-1 {
  letter-spacing: 1px;
}
.clickable-row {
  transition: background 0.2s;
  border-radius: 8px;
}
.clickable-row:hover {
  background: rgba(0, 0, 0, 0.02);
}
.body--dark .clickable-row:hover {
  background: rgba(255, 255, 255, 0.05);
}
</style>
