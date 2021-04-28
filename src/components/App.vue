<template>
  <div>
    <h1
    v-html="message"
    :class="classObject"
    ></h1>
    <p>{{ leads.description }}</p>
    <button @click="changeTextSize">
      large
    </button>
    <button
    @click="addDescription"
    >
    add desciption
    </button>
    <hr>
    <!-- v-showディレクティブは、style属性のdisplayプロパティで表示を切り替えているので、非表示になってもVueインスタンスが破棄されたことにならないので、beforeDestroy、後述するdestroyedライフサイクルフックが実行されない -->
    <child-component
      v-if="isShow"
    >
      <template #head>
        <p>head slot</p>
      </template>
      <template #default>
        <p>main slot</p>
        <p>main slot2</p>
      </template>
      <template #foot>
        <p>foot slot</p>
      </template>
    </child-component>
    <button @click="toggleShow">toggle isShow</button>
    <hr>
    <p v-if="id === 1">1</p>
    <template v-else-if="id === 2">
      <p>2-1</p>
      <p>2-2</p>
      <p>2-3</p>
    </template>
    <p v-else>other</p>
    <hr>
    <template v-for="item in items">
      <child-component
      :key="item.id"
      :title="item.title"
      >
        <span>slot content</span>
      </child-component>
    </template>
    <!-- <hr> -->
    <!-- <button @click="incrementCount">Add to count</button> -->
    <!-- <p>{{ count }}回クリックしました</p> -->
    <hr>
    <!-- 下記をCounter.vueというコンポーネントにする -->
    <!-- <counter
    :count="count"
    @increment="incrementCount"
    >
    </counter> -->
    <counter></counter>
    <hr>
    <input type="text" v-model="inputText">
    <p>computed: {{ getUpperCaseText }}</p>
    <p>methods: {{ showUpperCaseText() }}</p>
    <hr>
    <template v-for="category in categories">
      <p :key="$uuid.v4()">
        {{ category }}
      </p>
    </template>
    <button @click="updateText">update text</button>
    <form>
      <div>
        <span>名前:</span>
        <input-text v-model="form.name"></input-text>
        <p>名前: {{ getInputName }}</p>
      </div>
      <div>
        <span>性別:</span>
        <label>
          男性
          <input type="radio" value="male" v-model="form.sex">
        </label>
        <label>
          女性
          <input type="radio" value="female" v-model="form.sex">
        </label>
        <p>性別: {{ getRadioValue }}</p>
      </div>
      <div>
        <select v-model="form.selected">
          <option disabled value="">--出身地を選択してください--</option>
          <option v-for="option in form.options"
            :value="option.value"
            :key="option.id"
          >
            {{ option.value }}
          </option>
        </select>
        <p>出身地:{{ getSelectValue }}</p>
      </div>
      <div>
        <label>
          <input type="checkbox" v-model="form.checked">
          20際以上です
        </label>
        <p>チェックボックス: {{ getCheckBoxValue }}</p>
      </div>
    </form>
    <hr>
    <article v-for="post in posts" :key="$uuid.v4()">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </article>
  </div>
</template>

<script>
  import ChildComponent from 'Components/ChildComponent';
  import Counter from 'Components/Counter';
  import InputText from 'Components/InputText';
  import axios from 'axios';
  // axios:PromiseベースのHTTPクライアントのモジュール

  export default {
    beforeCreate() {
      console.log('beforeCreate');
      console.log(this.leads); //undefined
    },
    created() {
      console.log('created');
      console.log(this.posts);
      axios.get('/data.json').then(res => {
        this.posts = res.data.posts;
      });
    },
    beforeMount() {
      console.log("beforeMount");
      console.log(this.$el);//undefined
    },
    mounted() {
      console.log('mounted');
      console.log(this.$el);
    },
    beforeUpdate() {
      console.log('beforeUpdate');
    },
    updated() {
      console.log('updated');
    },
    data() {
      return {
        leads: {
          message: '<span>Hello Vue</span>',
          description: '',
        },
        message: '<span>Hello Vue</span>',
        description: '',
        isShow: true,
        id: 2,
        // count: 0,//storで管理するため削除
        inputText: '',
        classObject: {
          'is-green': true,
          },
          items: [
            {
              id: this.$uuid.v4(),
              title: '1番目のリスト',
            },
            {
              id: this.$uuid.v4(),
              title: '2番目のリスト',
            },
            {
              id: this.$uuid.v4(),
              title: '3番目のリスト',
            }
          ],
        form: {
          name: '',
          sex: '',
          selected: '',
          options:[
            {
              id: this.$uuid.v4(),
              value: '東京都',
            },
            {
              id: this.$uuid.v4(),
              value: '埼玉県',
            },
            {
              id: this.$uuid.v4(),
              value: '神奈川県',
            },
            {
              id: this.$uuid.v4(),
              value: '千葉県',
            },
          ],
          checked: false,
        },
        categories: ['Javascript', 'jQuery'],
        components: {
          ChildComponent,
          // ChildComponent: ChildComponent,と同義
          // vue-loaderによって、 'child-component': ChildComponent,と同義になる
          Counter,
          InputText,
        },
        posts: [],
      }
    },
    methods: {
      incrementCount() {
        this.count++;
      },
      showUpperCaseText() {
        const upperCaseText = this.inputText.toUpperCase();
        // console.log(`method: ${upperCaseText}`);
        return upperCaseText;
      },
      addDescription() {
        this.leads.description = 'Vue-lesson';
        // console.log(this);
        // console.log(this.description);
      },
      changeTextSize() {
        this.classObject = {...this.classObject, 'is-large': true};
      },
      toggleShow() {
        this.isShow = !this.isShow;
      },
      updateText() {
        this.categories.splice(1, 1, 'Vue.js');
        //配列名.splice() …… 配列から要素を削除・追加して組み替える
        // $set（配列やオブジェクトの更新）でも可
        // updateText() {
        //   this.$set(this.categories, 1, 'Vue.js');
        // }
        // $set(変更したい配列,インデックス,変更したい値)
      }
    },
    computed: {
      getRadioValue() {
        return this.form.sex;
      },
      getSelectValue() {
        return this.form.selected;
      },
      getCheckBoxValue() {
        return this.form.checked;
      },
      getUpperCaseText() {
        const upperCaseText = this.inputText.toUpperCase();
        // console.log('computed: ${upperCaseText}');
        return upperCaseText;
      },
      getInputName() {
        return this.form.name;
      }
    },
    watch: {
      // メソッド名は監視したいdataのプロパティ名
      // 第1引数には現在の値、第2引数には前回の値
      inputText(value, oldValue) {
        console.log(`value -> ${value}`);
        console.log(`oldValue -> ${oldValue}`);
      },
      'leads.description': {
        handler() {
          console.log('add description');
        },
        deep: true,
        // options引数にdeep: trueを渡すことで、
        // オブジェクトの中のネスト(入れ子)された値の変更を検出できる。
        // ※監視する際のコールバック処理はhandlerに記述します。
      }
    },
    components: {
      ChildComponent,
      Counter,
      InputText,
    }
  }
</script>

<style scoped>
  .is-green {
    color: green;
  }

  .is-large {
    font-size: 48px;
  }

  hr {
    margin: 16px 0;
  }
</style>