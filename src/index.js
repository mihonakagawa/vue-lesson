import Vue from 'vue';
import uuid from 'vue-uuid';

import MyApp from 'Components/App';

Vue.use(uuid);

new Vue({
  el: '#app',
  components: {
    MyApp
  },
  template: '<my-app></my-app>',
});