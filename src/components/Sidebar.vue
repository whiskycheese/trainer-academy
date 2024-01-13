<template>
  <section class="relative">
    <Menu2Icon
      class="p-2 md:m-4 text-[12px] w-16 h-16 text-secondary cursor-pointer border-2 border-secondary rounded-full flex justify-center items-center hover:opacity-90"
      @click="show=true"
      onkeydown="show=true"
    />
    <nav
      v-if="show"
      class="fixed top-0 bottom-0 right-0 left-0 md:absolute md:top-0 md:left-0 md:right-auto md:bottom-auto md:h-[calc(100vh-100px)] md:w-[20vw] bg-primary md:bg-white pt-12 px-6 z-50 text-quaternary md:text-primary"
    >
      <XIcon
        class="md:m-4 text-[12px] w-16 h-16 text-secondary cursor-pointer border-2 border-secondary rounded-full flex justify-center items-center hover:opacity-90 md:absolute md:top-0 md:left-0"
        @click="show=false"
        @keydown="show=false"
      />
      <div
        id="completion-rate"
        class="p-8 border-b-2 border-[#eee] md:border-primary flex items-center gap-2 text-[1.8rem]"
      >
        達成率：
        <meter class="h-[50px]" :value="completeRate" min="0" max="100"></meter>
      </div>
      <ul>
        <li
          v-for="(lesson, index) in sameCategoryLessons"
          :key="lesson.id"
          :class="{ 'line-through': lesson.isCompleted }"
          class="pt-8 hover:text-secondary"
          @click="$emit('pickLesson', lesson.docID)"
          @keydown="$emit('pickLesson', lesson.docID)"
        >
          <a href="#" class="flex gap-2">
            <div>#{{ index + 1 }}</div>
            <div>{{ lesson.lesson }}</div>
          </a>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
import { Menu2Icon, XIcon } from 'vue-tabler-icons';

export default {
  components: { Menu2Icon, XIcon },
  props: {
    sameCategoryLessons: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    completeRate() {
      const completedLessons = this.sameCategoryLessons.filter(
        (lesson) => lesson.isCompleted === true,
      );
      const completedRate = (completedLessons.length / this.sameCategoryLessons.length) * 100;
      return completedRate;
    },
  },
};
</script>
