<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-lg">My Attendance</div>

    <div class="row q-col-gutter-lg">
      <!-- Calendar View -->
      <div class="col-12 col-md-8">
        <q-card class="glass-card q-pa-md" style="min-height: 400px">
          <q-date
            v-model="date"
            :events="events"
            :event-color="getEventColor"
            class="full-width no-shadow bg-transparent text-inherit"
            today-btn
            minimal
            :dark="$q.dark.isActive"
          />
        </q-card>
      </div>

      <!-- Stats / List -->
      <div class="col-12 col-md-4">
        <q-card class="glass-card q-pa-md">
          <div class="text-h6 q-mb-md">Summary</div>

          <q-list separator>
            <q-item>
              <q-item-section avatar>
                <q-icon name="check_circle" color="green" />
              </q-item-section>
              <q-item-section>Present</q-item-section>
              <q-item-section side class="text-weight-bold">12</q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="cancel" color="red" />
              </q-item-section>
              <q-item-section>Absent</q-item-section>
              <q-item-section side class="text-weight-bold">1</q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="schedule" color="orange" />
              </q-item-section>
              <q-item-section>Late</q-item-section>
              <q-item-section side class="text-weight-bold">2</q-item-section>
            </q-item>
          </q-list>

          <div class="q-mt-lg text-caption text-grey">
            * Attendance is updated by your instructors.
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const date = ref(new Date().toISOString().substr(0, 10).replace(/-/g, '/'))
const events = ref([
  '2025/12/01',
  '2025/12/05',
  '2025/12/08',
  '2025/12/12',
  '2025/12/15',
  '2025/12/20',
  '2025/12/29',
])

// Mock logic:
// 2025/12/20 was 'Absent' (red)
// 2025/12/15 was 'Late' (orange)
// Others 'Present' (green)
const getEventColor = (date) => {
  if (date === '2025/12/20') return 'red'
  if (date === '2025/12/15') return 'orange'
  return 'green'
}
</script>

<style scoped>
.glass-card {
  border: 1px solid rgba(128, 128, 128, 0.2);
  backdrop-filter: blur(10px);
}
.body--dark .glass-card {
  background: rgba(255, 255, 255, 0.05);
}
.body--light .glass-card {
  background: white;
}
</style>
