<template lang="">
  <div class="flex flex-col items-center my-20">
    <div class="flex flex-col w-1/4 py-6 px-4 bg-gray-200 rounded-lg shadow-lg">
      <h1 class="text-2xl text-center mb-5">Todo Tracker</h1>
      <span v-if="isShow" class="text-red-500 text-center">Email already registered!!</span>
      <input
        v-model="name"
        type="text"
        placeholder="Enter your username"
        class="w-full p-2 outline-none focus:border focus:border-blue-400 rounded-lg mb-5"
        @focus="handleHide"
      />
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        class="w-full p-2 outline-none focus:border focus:border-blue-400 rounded-lg mb-5"
        @focus="handleHide"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Enter your password"
        class="w-full p-2 outline-none focus:border focus:border-blue-400 rounded-lg mb-5"
        @focus="handleHide"
      />
      <button
        class="text-center bg-blue-400 p-2 text-lg rounded-lg text-white font-bold"
        @click="handleSignIn"
      >
        Signin
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      isShow:false
    };
  },
  methods: {
    async handleSignIn() {
      try {
        await axios.post("https://todo-tracker-backend-production.up.railway.app/user/signin", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.$router.push('/login')
      } catch (error) {
        this.isShow = true
        console.log(error);
      }
    },
    handleHide(){
      this.isShow = false;
    }
  },
};
</script>
