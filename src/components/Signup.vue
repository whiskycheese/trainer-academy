<template>
  <section class="pt-8 px-4 mt-[50px] md:mt-[100px] h-[100vh]">
    <h2 class="text-[2rem] text-center mt-12">新規登録</h2>
    <form @submit.prevent="onSubmitSignup" class="w-[300px] mx-auto">
      <label for="usermail">
        <p class="text-[1.6rem] mt-12">メールアドレス</p>
        <input class="px-2 text-[1.4rem] w-full leading-[35px] border-2 border-[#eee] rounded-lg mt-2" id="usermail" type="email" placeholder="Your mail here..." v-model="usermail" />
      </label>
      <label for="userpass">
        <p class="text-[1.6rem] mt-12">パスワード</p>
        <input class="px-2 text-[1.4rem] w-full leading-[35px] border-2 border-[#eee] rounded-lg mt-2" id="userpass" type="password" placeholder="Your password here..." v-model="userpass" />
      </label>
      <p
        v-if="isFailed"
        class="text-tertiary"
        role="alert"
      >
      新規登録に失敗しました。
      </p>
      <button class="px-8 py-4 w-[100px] mx-auto text-center poppins bg-gradient-to-r from-secondary to-tertiary text-[1.6rem] font-bold text-quaternary text-primary rounded-2xl mt-12 cursor-pointer transition-all duration-300 block" type="submit" :class="{ 'btn-disabled': isPosting }">
        Signup
      </button>
    </form>
  </section>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import { createUser } from '@/services/firebaseService';

const IS_DEFAULT = 'IS_DEFAULT';
const IS_POSTING = 'IS_POSTING';
const IS_FAILED = 'IS_FAILED';

export default {
  data() {
    return {
      usermail: '',
      userpass: '',
      currentState: IS_DEFAULT,
    };
  },
  computed: {
    isPosting() {
      return this.currentState === IS_POSTING;
    },
    isFailed() {
      return this.currentState === IS_FAILED;
    },
  },
  methods: {
    // 状態を変更する
    toDefault() {
      this.currentState = IS_DEFAULT;
    },
    toPosting() {
      this.currentState = IS_POSTING;
    },
    toFailed() {
      this.currentState = IS_FAILED;
    },
    clearForm() {
      this.usermail = '';
      this.userpass = '';
    },
    onSubmitSignup() {
      this.toPosting();
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.usermail, this.userpass)
        .then(async () => {
          console.log('新規登録しました');
          const uid = firebase.auth().currentUser?.uid.toString();
          await createUser(uid);
          this.$emit('forceUserLessons');
          this.toDefault();
          this.clearForm();
          this.$router.push('/');
        })
        .catch((error) => {
          console.error('新規登録エラー', error);
          this.toFailed();
        });
    },
  },
};
</script>
