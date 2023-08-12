<template>
  <div id="app">
    <h1>双向绑定测试</h1>
    <h2>{{ message }}</h2>
    <div>
      <input v-model="message" />
    </div>
    <hr />
    <h1>按钮测试</h1>
    <h2>计数:{{ account }}</h2>
    <div>
      <button @click="onClick">add</button>
    </div>
    <hr />
    <h1>路由测试</h1>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/posts">Posts</router-link>
      </li>
    </ul>
    <!-- 路由出口 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "Romy",
      account: 0,
    };
  },
  methods: {
    onClick() {
      this.account += 1;
    },
  },
};
</script>

<style></style>
