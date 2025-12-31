<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-lg">My Classes Schedule</div>

    <q-card class="glass-card">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="upcoming" label="Upcoming" />
        <q-tab name="past" label="Past" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated class="bg-transparent">
        <q-tab-panel name="upcoming">
          <q-list separator>
            <q-item v-for="n in 3" :key="n">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" icon="event" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Advanced Mathematics - Session {{ n }}</q-item-label>
                <q-item-label caption>Dr. Smith • Tomorrow, 10:00 AM</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn outline color="primary" label="Join" size="sm" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="past">
          <div class="text-center text-grey q-pa-md">No past classes history.</div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const tab = ref('upcoming')
</script>

<style scoped>
.glass-card {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.body--dark .glass-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
