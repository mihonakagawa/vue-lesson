<template>
  <div>
    <button @click="incrementCount">Add to count</button>
    <p>{{ count }}回クリックされました</p>
  </div>
</template>

<script>
export default {
  props: {
    count: Number,
  },
  methods: {
    incrementCount() {
      // this.count++;
      this.$emit('increment');
    }
  }
}
</script>