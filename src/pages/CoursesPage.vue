<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-lg">
      <div class="text-subtitle1 text-weight-bolder text-uppercase letter-spacing-1 text-grey-7">
        My Courses
      </div>
    </div>

    <!-- Course Grid -->
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-6 col-md-4" v-for="course in courses" :key="course.id">
        <q-card class="glass-card full-height column">
          <q-img :src="course.image" :ratio="16 / 9">
            <div class="absolute-bottom text-subtitle2 text-left">
              {{ course.category }}
            </div>
          </q-img>

          <q-card-section>
            <div class="text-h6 q-mb-xs">{{ course.title }}</div>
            <div class="text-caption text-grey-6">{{ course.author }}</div>

            <q-linear-progress
              :value="course.progress / 100"
              class="q-mt-md"
              rounded
              color="primary"
              track-color="grey-3"
            />
            <div class="row justify-between q-mt-xs text-caption text-grey-6">
              <span>{{ course.progress }}% Complete</span>
            </div>
          </q-card-section>

          <q-card-actions class="q-mt-auto" align="right">
            <q-btn flat color="primary" label="Continue" no-caps />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, inject, computed } from 'vue'

const searchQuery = inject('searchQuery')

// We could remove search ref, but let's just make courses computed

// Mock Data
const allCourses = ref([
  {
    id: 1,
    title: 'Advanced Mathematics',
    author: 'Dr. Smith',
    category: 'Science',
    progress: 75,
    image: 'https://cdn.quasar.dev/img/parallax1.jpg',
  },
  {
    id: 2,
    title: 'Physics 101',
    author: 'Prof. Johnson',
    category: 'Science',
    progress: 45,
    image: 'https://cdn.quasar.dev/img/parallax2.jpg',
  },
  {
    id: 3,
    title: 'World History',
    author: 'Mrs. Davis',
    category: 'History',
    progress: 10,
    image: 'https://cdn.quasar.dev/img/parallax1.jpg',
  },
])

const courses = computed(() => {
  if (!searchQuery?.value) return allCourses.value
  const query = searchQuery.value.toLowerCase()
  return allCourses.value.filter(
    (c) => c.title.toLowerCase().includes(query) || c.category.toLowerCase().includes(query),
  )
})
</script>

<style scoped>
.glass-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}
.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
.body--dark .glass-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: none; /* Removed muddy shadow */
}
</style>
