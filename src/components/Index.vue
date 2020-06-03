<template>
  <div id="index">
    Index
	<el-button @click="fun">取 消</el-button>
  </div>
</template>
<script type="text/javascript">
import {listuser} from '../api'

  export default {
    mounted() {
      this.open();
    },
    methods: {
       open() {
        const h = this.$createElement;

        this.$notify({
          title: '标题名称',
          message: h('i', { style: 'color: teal'}, '欢迎进入程序的世界'),
          offset: 200
        });
      },
      fun() {
        // var qs = require('qs');
        // var params = qs.stringify({
        //     a: '',
        // });
        console.log("dun");
        listuser().then(result => {
          console.log(result);
        }).catch(function (error) {
            console.log("22");
            console.log(error);
        });
      }
    }
  }
</script>
