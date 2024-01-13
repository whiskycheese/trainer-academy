<template>
  <div id="app">
    <Header :logStat="logStat" />
    <router-view
      :lessons="lessons"
      :clickedLesson="clickedLesson"
      :logStat="logStat"
      @setLesson="onSetLesson"
      @reloadLessons="onReloadLessons"
      @nextLesson="onNextLesson"
      @prevLesson="onPrevLesson"
      @pickLesson="onPickLesson"
      @forceUserLessons="forceUserLessons">
    ></router-view>
    <div
      class="px-8 py-4 fixed bottom-10 right-10 bg-green-500 font-bold text-center rounded-2xl transition-all duration-700"
      :class="{ 'opacity-0 translate-x-[200px]' : showMessage === false }"
    >
      {{ messageText }}
    </div>
    <Footer />
  </div>
</template>

<script>
import firebase from 'firebase/app';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { getLessons, getUserLessons } from '@/services/firebaseService';

export default {
  components: { Header, Footer },
  data() {
    return {
      lessons: [],
      clickedLesson: {},
      currentUID: null,
      logStat: '',
      messageText: '',
      showMessage: false,
    };
  },
  async created() {
    console.log('created');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('状態：ログイン');
        this.currentUID = firebase.auth().currentUser?.uid.toString();
        this.toUserLessons();
        this.toLoggedIn();
        this.handleShowMessage();
      } else {
        console.log('状態：ログアウト');
        this.currentUID = null;
        this.toLessons();
        this.toLoggedOut();
        this.handleShowMessage();
      }
    });
  },
  methods: {
    handleShowMessage() {
      if (this.currentUID !== null) {
        this.messageText = 'ログインしました';
      } else {
        this.messageText = 'ログアウトしました';
      }
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 5000);
    },
    async toUserLessons() {
      this.lessons = await getUserLessons(this.currentUID).catch(() => {
        console.log('エラーです');
      });
    },
    async toLessons() {
      this.lessons = await getLessons().catch(() => {
        console.log('エラーです');
      });
    },
    async toLoggedIn() {
      this.logStat = true;
    },
    async toLoggedOut() {
      this.logStat = false;
    },
    async forceUserLessons() {
      console.log(this.currentUID);
      this.lessons = await getUserLessons(this.currentUID).catch(() => {
        console.log('エラーです');
      });
    },
    onSetLesson(id) {
      this.clickedLesson = this.lessons.find((lesson) => lesson.docID === id);
      this.$router.push('/about');
    },
    async onReloadLessons(docid) {
      this.lessons = await getUserLessons(this.currentUID).catch(() => {
        console.log('エラーです');
      });
      this.clickedLesson = this.lessons.find((lesson) => lesson.docID === docid);
    },
    onNextLesson() {
      const lessons = this.lessons.filter(
        (lesson) => lesson.category === this.clickedLesson.category,
      );
      const sortedLessons = lessons.sort((a, b) => a.id - b.id);
      const index = sortedLessons.findIndex(({ docID }) => docID === this.clickedLesson.docID) + 1;
      if (index === sortedLessons.length) {
        return;
      }
      this.clickedLesson = sortedLessons[index];
    },
    onPrevLesson() {
      const lessons = this.lessons.filter(
        (lesson) => lesson.category === this.clickedLesson.category,
      );
      const sortedLessons = lessons.sort((a, b) => a.id - b.id);
      const index = sortedLessons.findIndex(({ docID }) => docID === this.clickedLesson.docID) - 1;
      if (index === -1) {
        return;
      }
      this.clickedLesson = sortedLessons[index];
    },
    onPickLesson(docid) {
      const lessons = this.lessons.filter(
        (lesson) => lesson.category === this.clickedLesson.category,
      );
      const sortedLessons = lessons.sort((a, b) => a.id - b.id);
      const index = sortedLessons.findIndex(({ docID }) => docID === docid);
      this.clickedLesson = sortedLessons[index];
    },
  },
};

</script>
