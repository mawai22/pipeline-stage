<template>
  <div class="assemblystep-container">
    <my-steps stepNum="2"></my-steps>
    <Row type="flex">
      <Col>
        <span>构建内容：</span>
        <RadioGroup v-model="stepStyle">
          <Radio label="guide">由向导定义构建步骤</Radio>
          <Radio label="user">自定义构建脚本</Radio>
        </RadioGroup>
      </Col>
    </Row>
    <assemblystep-user v-if="stepStyle === 'user'"></assemblystep-user>
    <assemblystep-guide v-if="stepStyle === 'guide'"></assemblystep-guide>
  </div>
</template>
<script>
  import AssemblystepUser from '@/components/assembly/assemblystepuser'
  import AssemblystepGuide from './stage/stage'
  import MySteps from './common/steps'
  export default {
    data() {
      return {
        stepStyle: 'guide',
      }
    },
    components: {
      AssemblystepUser,
      AssemblystepGuide,
      MySteps
    }
  }
</script>
<style>
  .assemblystep-container {
    /*width: 80%;*/
    /*margin: auto;*/
  }
</style>
