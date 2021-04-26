<template>
  <div>
    <h1 v-html="message"></h1>
    <hr>
    <child-component></child-component>
  </div>
</template>

<script>
  import ChildComponent from 'Components/ChildComponent';

  export default {
    data() {
      return {
        message: '<span>Hello Vue</span>',
      }
    },
    components: {
      ChildComponent,
    }
  }
</script>

<style scoped>
  h1 {
    color: green;
  }

  hr {
    margin: 16px 0;
  }
</style>