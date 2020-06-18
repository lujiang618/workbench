<template>
  <v-tabs active-tab-key="1">
    <v-tab-pane tab-key="1" icon="apple" tab="选项卡一">选项卡一内容</v-tab-pane>
    <v-tab-pane tab-key="2" icon="android" tab="选项卡二">选项卡二内容</v-tab-pane>
  </v-tabs>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>

</style>
