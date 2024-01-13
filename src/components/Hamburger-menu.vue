<template>
  <div>
    <Menu2Icon
      v-if="!show"
      class="text-white text-[3rem] cursor-pointer my-4 transition-all duration-300 sm:hidden"
      @click="show=true"
      @keydown="show=true"
    />
    <nav
      v-if="show"
      class="fixed top-0 bottom-0 right-0 left-0 bg-black opacity-90 z-10"
    >
      <SquareXIcon
        @click="show=false"
        @keydown="show=false"
        class="text-white text-[3rem] cursor-pointer my-8 ml-auto mr-6 transition-all duration-300"
      />
      <ul class="w-3/4 mt-16 mx-auto text-center text-white">
        <li class="py-4 hover:text-orange-500"><a @click="onClick('A')" @keydown="onClick('A')">運動力学</a></li>
        <li class="py-4 hover:text-orange-500"><a @click="onClick('B')" @keydown="onClick('B')">キネシオロジー</a></li>
        <li class="py-4 hover:text-orange-500"><a @click="onClick('C')" @keydown="onClick('C')">運動生物学</a></li>
        <li class="py-4 hover:text-orange-500"><a @click="onClick('D')" @keydown="onClick('D')">柔軟性</a></li>
        <li class="py-4 hover:text-orange-500"><a href="#">ダミーテキスト</a></li>
        <li class="py-4 hover:text-orange-500"><a href="#">ダミーテキスト</a></li>
        <li class="py-4 hover:text-orange-500"><a href="#">ダミーテキスト</a></li>
        <li
          class="py-4 hover:text-orange-500"
          @click="show=false"
          @keydown="show=false"
        >
          <router-link to="/signup" :class="{ 'hidden' : logStat === true }">
            新規登録
          </router-link>
        </li>
        <li
          class="py-4 hover:text-orange-500"
          @click="show=false"
          @keydown="show=false"
        >
          <router-link to="/login" :class="{ 'hidden' : logStat === true }">
            ログイン
          </router-link>
        </li>
        <li
          class="py-4 hover:text-orange-500"
          @click="show=false"
          @keydown="show=false"
        >
          <router-link to="/" :class="{ 'hidden' : logStat === false }">
            ログアウト
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { Menu2Icon, SquareXIcon } from 'vue-tabler-icons';

export default {
  props: {
    logStat: {
      type: Boolean,
      required: true,
    },
  },
  components: { Menu2Icon, SquareXIcon },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    async onClick(letter) {
      await this.$router.push('/').catch(() => {});
      const target = document.getElementById(letter);
      const HEADER_HEIGHT = 64;
      const PADDING_TOP = 32;
      window.scrollTo({
        top: target.offsetTop - HEADER_HEIGHT - PADDING_TOP,
      });
      this.show = false;
    },
  },
};
</script>
