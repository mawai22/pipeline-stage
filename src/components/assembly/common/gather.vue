<template>
  <div class="gather-wrapper">
    <p 
        v-for="(item, index) in lists"
        :key="index"
        :style="{'margin-bottom': '5px'}">
        <Input v-model = 'item.path' 
        >
    
    <Button slot="append" 
            :style="{'color':'white','background': '#ed3f14', 'border-color': '#ed3f14'}"
            @click="deleteItemHandle(item)"
    >删除</Button>
  </Input>
    </p>

    <Input  v-model="path">
      <Button slot="append" 
             :style="{'color':'white','background': '#2d8cf0', 'border-color': '#2d8cf0'}"
             @click="addItemHandle" 
              >新增</Button>
    </Input>

  </div>
</template>
<script>
  export default {
    data(){
      return {
        path: ''
      }
    },
    methods: {
      addItemHandle(){
        this.$store.dispatch('addGather', {path: this.path});
        this.path = '';
      },
      deleteItemHandle(info){
        this.$store.dispatch('deleteGather', info);
      }
    },
    computed: {
      lists(){
        return this.$store.getters.gatherList;
      }
    }
  }
</script>

<style scoped>

</style>