<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-lg">Payments & Earnings</div>

    <div class="row q-col-gutter-md q-mb-xl">
      <div class="col-12 col-md-4">
        <q-card class="bg-green-6 text-white q-pa-md">
          <div class="text-h4 text-weight-bold">$1,250</div>
          <div class="text-subtitle2">Total Earnings</div>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="bg-blue-6 text-white q-pa-md">
          <div class="text-h4 text-weight-bold">$450</div>
          <div class="text-subtitle2">Pending Payout</div>
        </q-card>
      </div>
    </div>

    <div class="text-h6 q-mb-md">Transaction History</div>
    <q-card class="glass-card">
      <q-list separator>
        <q-item v-for="n in 5" :key="n">
          <q-item-section>
            <q-item-label>Course Sale: Advanced Physics</q-item-label>
            <q-item-label caption>Today, 2:30 PM</q-item-label>
          </q-item-section>
          <q-item-section side class="text-green-5 text-weight-bold"> +$50.00 </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup></script>

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
