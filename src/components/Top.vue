<template>
  <div class="bg-primary">
    <div>
      <main class="h-screen relative">
        <div class="bg-main-visual h-full bg-top bg-cover" />
        <div class="w-full h-full bg-rock-pattern opacity-90 pc-triangle-path bg-cover absolute top-0 left-0 z-5" />
        <h2 class="font-bold text-[1.6rem] md:text-[3.5rem] text-secondary absolute bottom-20 left-20 z-6">
          パーソナルトレーナー<br class="block md:hidden"/>
          目指すなら<br/>
          オンライン学習の時代！
        </h2>
      </main>
      <section class="paddingX paddingY">
        <div class="max-w-7xl flex flex-wrap gap-[40px] mx-auto">
          <div id="A" class="animated w-full md:w-[calc((100%-40px)/2)]">
            <lesson @setLesson="onSetLesson" :eachLessons="lessonA" :lessonHead="lessonHeadA">
            </lesson>
          </div>
          <div id="B" class="animated w-full md:w-[calc((100%-40px)/2)]">
            <lesson @setLesson="onSetLesson" :eachLessons="lessonB" :lessonHead="lessonHeadB">
            </lesson>
          </div>
          <div class="animated w-full md:w-[calc((100%-40px)/2)]">
            <lesson id="C" @setLesson="onSetLesson" :eachLessons="lessonC" :lessonHead="lessonHeadC">
            </lesson>
          </div>
          <div class="animated w-full md:w-[calc((100%-40px)/2)]">
            <lesson id="D" @setLesson="onSetLesson" :eachLessons="lessonD" :lessonHead="lessonHeadD">
            </lesson>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Lesson from '@/components/Lesson.vue';

export default {
  components: { Lesson },
  props: {
    lessons: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      lessonHeadA: { image: 'sprint.jpg', title: '運動力学', id: 'A' },
      lessonHeadB: { image: 'kine.jpg', title: 'キネシオロジー', id: 'B' },
      lessonHeadC: { image: 'muscle.jpg', title: '運動生理学', id: 'C' },
      lessonHeadD: { image: 'yoga.jpg', title: '柔軟性', id: 'D' },
    };
  },
  computed: {
    lessonA() {
      const filteredLessons = this.lessons.filter((lesson) => lesson.category === '運動力学');
      return filteredLessons.sort((a, b) => a.id - b.id);
    },
    lessonB() {
      const filteredLessons = this.lessons.filter((lesson) => lesson.category === 'キネシオロジー');
      return filteredLessons.sort((a, b) => a.id - b.id);
    },
    lessonC() {
      const filteredLessons = this.lessons.filter((lesson) => lesson.category === '運動生理学');
      return filteredLessons.sort((a, b) => a.id - b.id);
    },
    lessonD() {
      const filteredLessons = this.lessons.filter((lesson) => lesson.category === '柔軟性');
      return filteredLessons.sort((a, b) => a.id - b.id);
    },
  },
  methods: {
    onSetLesson(id) {
      this.$emit('setLesson', id);
    },
  },
};
</script>
