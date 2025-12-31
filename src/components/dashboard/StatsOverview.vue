<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-md-4">
      <q-card class="glass-card q-pa-md gradient-1 text-white">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h4 text-weight-bold">{{ stats.activeCourses || 0 }}</div>
            <div class="text-subtitle2 opacity-80">Active Courses</div>
          </div>
          <div class="col-auto">
            <div class="icon-box bg-white-20">
              <q-icon name="school" size="24px" />
            </div>
          </div>
        </div>
      </q-card>
    </div>
    <div class="col-12 col-md-4">
      <q-card class="glass-card q-pa-md gradient-2 text-white">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h4 text-weight-bold">{{ stats.overallProgress || 0 }}%</div>
            <div class="text-subtitle2 opacity-80">Overall Progress</div>
          </div>
          <div class="col-auto">
            <div class="icon-box bg-white-20">
              <q-icon name="trending_up" size="24px" />
            </div>
          </div>
        </div>
      </q-card>
    </div>
    <div class="col-12 col-md-4">
      <q-card class="glass-card q-pa-md gradient-3 text-white">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h4 text-weight-bold">{{ stats.completed || 0 }}</div>
            <div class="text-subtitle2 opacity-80">Completed</div>
          </div>
          <div class="col-auto">
            <div class="icon-box bg-white-20">
              <q-icon name="emoji_events" size="24px" />
            </div>
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    default: () => ({
      activeCourses: 0,
      overallProgress: 0,
      completed: 0,
    }),
  },
})
</script>

<style scoped>
.glass-card {
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.gradient-1 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.gradient-2 {
  background: linear-gradient(135deg, #2af598 0%, #009efd 100%);
}
.gradient-3 {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-white-20 {
  background: rgba(255, 255, 255, 0.2);
}

.opacity-80 {
  opacity: 0.8;
}
</style>
