<template>
  <q-card class="glass-card q-mt-lg">
    <q-card-section class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-bolder text-uppercase letter-spacing-1 text-grey-7">
        My Courses
      </div>
      <q-btn flat round dense icon="more_horiz" color="grey-6" />
    </q-card-section>

    <q-card-section v-if="loading">
      <div class="row justify-center q-pa-md">
        <q-spinner color="primary" size="3em" />
      </div>
    </q-card-section>

    <q-card-section v-else-if="courses.length === 0" class="text-center q-pa-xl">
      <div class="empty-state-icon q-mb-md">
        <q-icon name="auto_stories" size="48px" class="text-primary opacity-50" />
      </div>
      <div class="text-h6 text-weight-medium">No courses yet</div>
      <div class="text-body2 text-grey-6 q-mb-md">
        Explore our catalog and start learning today!
      </div>
      <q-btn label="Browse Catalog" color="primary" unelevated rounded no-caps />
    </q-card-section>

    <q-list v-else separator>
      <q-item v-for="course in courses" :key="course.id" class="q-py-md hover-bg">
        <q-item-section avatar>
          <q-avatar rounded color="primary" text-color="white" icon="school" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-bold">{{ course.title }}</q-item-label>
          <q-item-label caption>
            <q-linear-progress
              :value="course.progress / 100"
              class="q-mt-xs"
              rounded
              color="primary"
              track-color="grey-3"
              style="height: 6px"
            />
            <div class="row justify-between q-mt-xs text-caption text-grey-6">
              <span>{{ course.progress }}% Complete</span>
              <span>{{ course.lessons }} Lessons</span>
            </div>
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn flat round icon="chevron_right" color="grey-6" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'

const searchQuery = inject('searchQuery')
const allCourses = ref([])
const loading = ref(true)

const courses = computed(() => {
  if (!searchQuery?.value) return allCourses.value
  const query = searchQuery.value.toLowerCase()
  return allCourses.value.filter((c) => c.title.toLowerCase().includes(query))
})

onMounted(async () => {
  // Simulate API call
  setTimeout(() => {
    allCourses.value = [
      { id: 1, title: 'Introduction to Vue 3', progress: 75, lessons: 12 },
      { id: 2, title: 'Advanced CSS Layouts', progress: 30, lessons: 8 },
      { id: 3, title: 'Supabase Fundamentals', progress: 10, lessons: 5 },
      { id: 4, title: 'UI/UX Design Principles', progress: 0, lessons: 10 },
    ]
    loading.value = false
  }, 1000)
})
</script>

<style scoped>
.glass-card {
  border-radius: 16px;
  background: white; /* Default light mode */
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.body--dark .glass-card {
  background: #1e1e1e; /* Slightly lighter than pure black */
  box-shadow: none; /* Removed muddy shadow */
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.opacity-50 {
  opacity: 0.5;
}

.empty-state-icon {
  background: rgba(var(--q-primary), 0.1);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.hover-bg {
  transition: background 0.2s;
  border-radius: 8px;
}
.hover-bg:hover {
  background: rgba(0, 0, 0, 0.03);
}
.body--dark .hover-bg:hover {
  background: rgba(255, 255, 255, 0.05);
}
</style>
