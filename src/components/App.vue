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
    <child-component
      v-show="isShow"
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
    <hr>
    <button @click="incrementCount">Add to count</button>
    <p>{{ count }}回クリックしました</p>
    <hr>
    <input type="text" v-model="inputText">
    <p>computed: {{ getUpperCaseText }}</p>
    <p>methods: {{ showUpperCaseText() }}</p>
    <hr>
    <form>
      <div>
        <span>名前:</span>
        <input type="text"
        :value="form.name"
        >
        <p>名前: {{ getInputName }}</p>
      </div>
    </form>
    <hr>
    <template v-for="category in categories">
      <p :key="$uuid.v4()">
        {{ category }}
      </p>
    </template>
    <button @click="updateText">update text</button>
    <hr>
  </div>
</template>

<script>
  import ChildComponent from 'Components/ChildComponent';

  export default {
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
        count: 0,
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
          },
          categories: ['Javascript', 'jQuery'],
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
        this.classObject = Object.assign({}, this.classObject, {
          'is-large': true,
        });
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