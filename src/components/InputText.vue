<template>
  <input type="text" v-model="computedValue">
</template>

<script>
export default {
  props: {
    value: String,
  },
  computed: {
      computedValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
        // getは、値を参照する時に呼び出されるメソッドで、setは値を更新するときに呼び出されるメソッド
      }
    }
  }
}
</script>