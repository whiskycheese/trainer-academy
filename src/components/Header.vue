<template>
  <header class="overflow-hidden z-50 w-full fixed top-0 shadow-2xl">
    <div class="h-[50px] paddingX bg-primary flex flex-row items-center py-4">
      <router-link to="/" class="mr-auto">
        <h1>
          <img
            src="../assets/logo-ta.png"
            alt="trainer academy"
            class="w-[250px] min-w-[200px] object-contain"
          >
        </h1>
      </router-link>
      <div
        class="min-w-[90px] poppins font-bold text-center text-quaternary text-[1.6rem] transition-all duration-300 cursor-pointer sm:block hidden"
        :class="{ 'md:hidden' : logStat === false }"
        @click="onClickLogOut"
        @keydown="onClickLogOut"
      >
        Logout
      </div>
      <router-link to="/login">
        <div
          class="min-w-[90px] h-full leading-16 poppins font-bold text-center text-quaternary text-[1.6rem] transition-all duration-300 cursor-pointer sm:block hidden"
          :class="{ 'md:hidden' : logStat === true }"
        >
          Login
        </div>
      </router-link>
      <router-link to="/signup">
        <div
          class="min-w-[90px] h-full leading-16 poppins font-bold text-center text-quaternary text-[1.6rem] transition-all duration-300 cursor-pointer md:block hidden"
          :class="{ 'md:hidden' : logStat === true }"
        >
          Signup
        </div>
      </router-link>
      <hamburger-menu :logStat="logStat"></hamburger-menu>
    </div>
    <nav class="h-[50px] hidden md:block text-[1.4rem] cursor-pointer bg-secondary">
      <ul class="flex flex-row">
        <li class="nav-links hover:bg-tertiary">
          <a @click="onClick('A')" @keydown="onClick('A')">運動力学</a>
        </li>
        <li class="nav-links hover:bg-tertiary">
          <a @click="onClick('B')" @keydown="onClick('B')">キネシオロジー</a>
        </li>
        <li class="nav-links hover:bg-tertiary">
          <a @click="onClick('C')" @keydown="onClick('C')">運動生物学</a>
        </li>
        <li class="nav-links hover:bg-tertiary">
          <a @click="onClick('D')" @keydown="onClick('D')">柔軟性</a>
        </li>
        <li class="nav-links hover:bg-tertiary">
          <a href="#">ダミーテキスト</a>
        </li>
        <li class="nav-links hover:bg-tertiary">
          <a href="#">ダミーテキスト</a>
        </li>
        <li class="nav-links hover:bg-tertiary">
          <a href="#">ダミーテキスト</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import firebase from 'firebase/app';
import HamburgerMenu from '@/components/Hamburger-menu.vue';

export default {
  components: { HamburgerMenu },
  props: {
    logStat: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    async onClick(letter) {
      await this.$router.push('/');
      const target = document.getElementById(letter);
      const HEADER_HEIGHT = 112;
      const PADDING_TOP = 32;
      window.scrollTo({
        top: target.offsetTop - HEADER_HEIGHT - PADDING_TOP,
      });
    },
    onClickLogOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log(this.logStat);
        })
        .catch((error) => {
          console.error('ログアウトエラー', error);
        });
    },
  },
};
</script>

<style scoped>
.nav-links {
  width: calc(100% / 7);
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
