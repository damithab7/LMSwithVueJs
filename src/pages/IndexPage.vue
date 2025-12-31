<template>
  <q-page>
    <!-- Hero Section -->
    <div class="relative-position">
      <q-img src="~assets/hero_education_bw.png" class="fullscreen-hero" style="height: 100vh">
        <div
          class="absolute-full column flex-center text-center q-px-md"
          style="background: rgba(0, 0, 0, 0.4)"
        >
          <div class="hero-content">
            <div class="text-h4 text-md-h3 text-white text-weight-bolder q-mb-md ls-tight">
              Excel. Evolve. <br /><span class="text-grey-5">Empower.</span>
            </div>
            <div
              class="text-subtitle1 text-grey-4 q-mb-xl text-weight-light"
              style="max-width: 600px; margin: 0 auto"
            >
              The premium tuition experience for students who demand excellence. Personalized
              mentorship in a sophisticated environment.
            </div>
            <div class="q-gutter-md">
              <q-btn label="Begin Your Journey" no-caps class="neo-btn" />
              <q-btn label="Explore Programs" no-caps class="neo-btn" />
            </div>
          </div>
        </div>
      </q-img>
    </div>

    <!-- Stats Section -->
    <section class="q-py-xl">
      <div
        class="row q-col-gutter-lg text-center container q-mx-auto q-px-md"
        style="max-width: 1200px"
      >
        <div class="col-12 col-md-4">
          <div class="text-h4 text-weight-bolder">5000+</div>
          <div
            class="text-uppercase text-caption letter-spacing-2"
            :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
          >
            Students Enrolled
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="text-h4 text-weight-bolder">98%</div>
          <div
            class="text-uppercase text-caption letter-spacing-2"
            :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
          >
            Success Rate
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="text-h4 text-weight-bolder">50+</div>
          <div
            class="text-uppercase text-caption letter-spacing-2"
            :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
          >
            Expert Tutors
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="q-py-xl q-px-md">
      <div class="text-center q-mb-xl q-mt-lg q-px-md q-mx-auto" style="max-width: 700px">
        <div class="text-uppercase text-caption text-grey-5 letter-spacing-2 q-mb-sm">
          Our Distinction
        </div>
        <div class="text-h4 text-weight-bold ls-tight">Why ClassMaster?</div>
      </div>

      <div
        class="row q-col-gutter-md q-col-gutter-md-xl container q-mx-auto items-stretch justify-center"
        style="max-width: 1200px"
      >
        <div class="col-12 col-sm-6 col-md-4" v-for="feature in features" :key="feature.title">
          <q-card
            flat
            class="q-pa-lg full-height column items-center text-center glass-card hover-lift non-selectable"
          >
            <q-card-section>
              <div class="icon-circle q-mb-md flex flex-center q-mx-auto">
                <q-icon :name="feature.icon" size="24px" color="black" />
              </div>
              <div class="text-h6 text-weight-bold q-mb-sm">{{ feature.title }}</div>
              <div class="text-caption" :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-7'">
                {{ feature.description }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="q-py-xl">
      <div class="container q-mx-auto q-px-md" style="max-width: 1000px">
        <div class="text-center q-mb-xl q-px-md">
          <div class="text-uppercase text-caption text-grey-5 letter-spacing-2 q-mb-sm">
            Testimonials
          </div>
          <div class="text-h4 text-weight-bold ls-tight">Student Success</div>
        </div>

        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          :control-color="$q.dark.isActive ? 'white' : 'black'"
          arrows
          navigation
          height="650px"
          class="bg-transparent shadow-0"
        >
          <q-carousel-slide :name="1" class="column no-wrap flex-center q-px-none">
            <div class="row items-center q-col-gutter-lg full-width">
              <div class="col-12 col-md-5 text-center">
                <q-avatar size="200px">
                  <img src="~assets/avatar_student_1.png" />
                </q-avatar>
              </div>
              <div class="col-12 col-md-7 text-center text-md-left q-pb-xl">
                <q-icon name="format_quote" size="32px" color="grey-5" class="q-mb-sm" />
                <div class="text-h6 text-weight-medium q-mb-md lh-md">
                  "ClassMaster isn't just a tuition class; it's a mentorship program. The
                  environment inspired me to push my boundaries."
                </div>
                <div class="text-subtitle2 text-weight-bold">- James Anderson</div>
                <div class="text-caption text-grey-7">Engineering Undergraduate</div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="column no-wrap flex-center q-px-none">
            <div class="row items-center q-col-gutter-lg full-width">
              <div class="col-12 col-md-5 text-center">
                <q-avatar size="200px">
                  <img src="~assets/avatar_student_2.png" />
                </q-avatar>
              </div>
              <div class="col-12 col-md-7 text-center text-md-left q-pb-xl">
                <q-icon name="format_quote" size="32px" color="grey-5" class="q-mb-sm" />
                <div class="text-h6 text-weight-medium q-mb-md lh-md">
                  "The structured approach and premium resources made all the difference. I achieved
                  results I didn't think were possible."
                </div>
                <div class="text-subtitle2 text-weight-bold">- Sarah Mitchell</div>
                <div class="text-caption text-grey-7">Medical Student</div>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </section>

    <!-- Contact Section -->
    <section
      id="contact"
      class="q-py-xl q-px-md bg-black text-white text-center relative-position overflow-hidden"
    >
      <div class="absolute-full bg-pattern text-white" style="opacity: 0.05"></div>
      <div class="relative-position z-top">
        <div class="text-h4 text-weight-bolder q-mb-lg ls-tight">Ready to excel?</div>
        <div class="text-subtitle1 text-grey-5 q-mb-xl text-weight-light">
          Join the elite community of learners today.
        </div>
        <q-btn label="Contact Admissions" no-caps class="neo-btn" />

        <div class="column flex-center q-mt-xl text-caption text-grey-6">
          <div class="row q-gutter-x-lg">
            <div>© 2025 ClassMaster.</div>
            <a href="#" class="text-grey-6" style="text-decoration: none">Privacy</a>
            <a href="#" class="text-grey-6" style="text-decoration: none">Terms</a>
          </div>
          <div class="q-mt-xs font-weight-bold">Powered by damithab</div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const slide = ref(1)

const features = [
  {
    icon: 'school',
    title: 'Elite Mentorship',
    description:
      'Direct access to industry-leading educators dedicated to your personal academic growth.',
  },
  {
    icon: 'meeting_room',
    title: 'Premium Facilities',
    description:
      'State-of-the-art learning environments designed to foster focus and collaboration.',
  },
  {
    icon: 'analytics',
    title: 'Precision Analytics',
    description:
      'Data-driven insights into your performance to target areas for maximum improvement.',
  },
]
</script>

<style scoped>
.container {
  width: 100%;
}

.bg-black-overlay {
  background: rgba(0, 0, 0, 0.6);
}

.ls-tight {
  letter-spacing: -1px;
}

.letter-spacing-2 {
  letter-spacing: 2px;
}

.lh-md {
  line-height: 1.4;
}

.border-card {
  border: 1px solid #e0e0e0;
  transition: all 0.4s ease;
}

.hover-lift:hover {
  transform: translateY(-8px);
  border-color: #000;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.icon-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #f5f5f5;
  transition: all 0.4s ease;
}

.hover-lift:hover .icon-circle {
  background: #000;
  color: #fff !important;
}

.hover-lift:hover .icon-circle .q-icon {
  color: #fff !important;
}
</style>
