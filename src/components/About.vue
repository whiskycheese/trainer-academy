<template>
  <section id="about-wrapper" class="mt-[50px] md:mt-[100px] min-h-[1000px] bg-quaternary relative">
    <div class="paddingX paddingY flex gap-4 items-center md:absolute top-0 left-0 md:p-0 z-10">
      <sidebar
        :sameCategoryLessons="sameCategoryLessons"
        @pickLesson="onPickLesson"
      ></sidebar>
      <div id="path" class="text-[1.2rem] text-secondary md:hidden">
        {{ category }} > {{ lesson }}
      </div>
    </div>
    <div id="video-frame" class="h-[40vh] md:h-[60vh] flex justify-center bg-[#222] relative">
      <iframe
        v-if="logStat"
        class="md:w-[60vw] h-full"
        title="lesson-video"
        :src="'https://www.youtube.com/embed/' + video"
        frameborder="0"
        allow="autoplay;
        encrypted-media"
        allowfullscreen
      ></iframe>
      <img v-else class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src="../assets/youtube-icon.png" alt="video icon">
    </div>
    <div class="bg-quaternary px-2 py-4 flex border-b border-gray-300 gap-2 justify-center items-center">
      <div
        class="btn"
        @click="$emit('prevLesson')"
        @keydown="$emit('prevLesson')"
      >
        &laquo;前へ
      </div>
      <div
        v-if="logStat"
        class="btn w-[100px]"
        @click="onComplete"
        @keydown="onComplete"
      >
          <barbell-icon :class="{ 'hidden' : !isCompleted }"/>
          <div :class="{ 'hidden' : isCompleted }">完了</div>
          <div :class="{ 'hidden' : !isCompleted }">DONE</div>
      </div>
      <div v-else class="btn" disabled>
        完了
      </div>
      <div
        class="btn"
        @click="$emit('nextLesson')"
        @keydown="$emit('nextLesson')"
      >
        次へ&raquo;
      </div>
    </div>
    <p class="text-[1.6rem] p-4 leading-1.5 md:w-[60vw] md:mx-auto" v-if="logStat">
      {{ desc }}
    </p>
    <p class="text-[1.6rem] p-4 leading-1.5 md:w-[60vw] md:mx-auto" v-else>
      ログインするとこの動画をご覧になれます。
    </p>
  </section>
</template>

<script>
import firebase from 'firebase/app';
import Sidebar from '@/components/Sidebar.vue';
import { BarbellIcon } from 'vue-tabler-icons';
import { changeCompleteStat } from '../services/firebaseService';

export default {
  components: { Sidebar, BarbellIcon },
  props: {
    lessons: {
      type: Array,
      required: true,
    },
    clickedLesson: {
      type: Object,
      required: true,
    },
    logStat: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    login() {
      if (this.logStat === false) {
        return false;
      }
      return true;
    },
    sameCategoryLessons() {
      const filteredLessons = this.lessons.filter(
        (lesson) => lesson.category === this.clickedLesson.category,
      );
      const sortedLessons = filteredLessons.sort((a, b) => a.id - b.id);
      return sortedLessons;
    },
    isCompleted() {
      return this.clickedLesson.isCompleted;
    },
    id() {
      return this.clickedLesson.id;
    },
    docID() {
      return this.clickedLesson.docID;
    },
    category() {
      return this.clickedLesson.category;
    },
    lesson() {
      return this.clickedLesson.lesson;
    },
    desc() {
      return this.clickedLesson.desc;
    },
    video() {
      return this.clickedLesson.video;
    },
  },
  methods: {
    async onComplete() {
      const changedLogStat = !this.isCompleted;

      const uid = firebase.auth().currentUser?.uid.toString();

      await changeCompleteStat(uid, this.docID, changedLogStat);
      this.$emit('reloadLessons', this.docID);
      console.log('reload request done');
    },
    onPickLesson(docid) {
      this.$emit('pickLesson', docid);
    },
  },
};
</script>
