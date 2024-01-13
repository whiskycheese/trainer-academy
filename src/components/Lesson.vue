<template>
  <section class="mb-8 bg-quaternary rounded-3xl overflow-hidden">
    <div class="relative overflow-hidden ">
      <img
        :src="require(`../assets/${lessonHead.image}`)"
        alt="catgory image"
        class="grayscale hover:grayscale-0 hover:scale-105 w-full object-cover"
      >
      <h2 class="text-[1.6rem] text-primary bg-secondary px-6 py-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl transition-all duration-300 pointer-events-none">  {{ lessonHead.title }}
      </h2>
    </div>
    <ul class="px-4 pt-4">
      <li
        v-for="(lesson, index) in eachLessons"
        :key="index"
        class="px-4 py-2 flex flex-row items-center leading-4 cursor-pointer border-b border-[#ccc] "
        @click="$emit('setLesson', lesson.docID)"
        @keydown="$emit('setLesson', lesson.docID)"
      >
        <a href="#" class="w-[90%] mr-auto flex items-start gap-3 leading-normal font-bold">
          <span class="text-secondary">
            #{{ index + 1 }}
          </span>
          {{ lesson.lesson }}
        </a>
        <span
          class="text-secondary flex flex-col items-center opacity-0"
          :class="{ 'opacity-100': lesson.isCompleted }"
        >
          <BarbellIcon/>DONE
        </span>
      </li>
    </ul>
  </section>
</template>

<script>
import { BarbellIcon } from 'vue-tabler-icons';

export default {
  components: { BarbellIcon },
  props: {
    eachLessons: {
      type: Array,
      required: true,
    },
    lessonHead: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isHovered: false,
    };
  },
  computed: {
    title() {
      return this.firstLesson.category;
    },
  },
};
</script>
