
<template>
  <div>
  <my-steps stepNum="1"></my-steps>
    <bread></bread>
    <Form class="form" ref="formValidate" :label-width="120">
      <FormItem label="流水线名称" prop="name">
        <Input placeholder="请输入流水线名称" style="width: 50%"></Input>
      </FormItem>
      <FormItem label="流水线描述" prop="name">
        <Input placeholder="请输入流水线描述" style="width: 50%" type="textarea"></Input>
      </FormItem>
      <Row class="form-box">
        <FormItem label="源码管理" prop="">
          <Row>
            <Col>
            <Select style="width:50%">
              <Option value="1" v-text="'ClearCase'"></Option>
              <Option value="2" v-text="'Git'"></Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col>
          <FormItem label="选择代码工程">
            <Select style="width:50%">
              <Option value="1">{{'BKJG/dsvc'}}</Option>
              <Option value="2">{{'BKJG/AgileMng'}}</Option>
              <Option value="3">{{'BKJG/PARTY-MASSES/account'}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
        <FormItem label="选择分支">
          <Select style="width:50%">
            <Option value="1" v-text="'dev'"></Option>
            <Option value="2" v-text="'master'"></Option>
            <Option value="3" v-text="'dev_03'"></Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col>
      <FormItem label="git credential">
        <Select style="width:50%">
          <Option value="1" v-text="'lizhuo.zh/******'"></Option>
          <Option value="2" v-text="'xiebei.zh/******'"></Option>
          <Option value="3" v-text="'dev_03'"></Option>
        </Select>
      </FormItem>
    </Col>
  </Row>
</FormItem>
</Row>
<Row class="form-box">
  <FormItem label="环境变量">
    <Row>
      <span>java版本</span>
      <Select style="width: 50%">
        <Option value="1">jdk1.8</Option>
        <Option value="2">jdk</Option>
      </Select>
    </Row>
    <Row style="margin:10px 0">
      <span>其他变量</span>
      <Input type="textarea" style="width: 50%"></Input>
    </Row>
  </FormItem>
</Row>
<Row class="form-box">
  <FormItem label="触发条件">
    <RadioGroup v-model="trigger">
      <Radio label="gerrit">Gerrit Trigger</Radio>
      <Radio label="scm">轮询SCM</Radio>
      <Radio label="timer">定时</Radio>
    </RadioGroup>
    <div class="" v-if="trigger === 'gerrit'">
      <Row>
        <Col>
        <FormItem label="Gerrit Server">
          <Select style="width:50%">
            <Option value="1" v-text="'Gerrit 128.194.10.127'"></Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col>
      <FormItem label="选择代码工程">
        <Select style="width:50%">
          <Option value="1" v-text="'BKJG/PARTY-MASSES'"></Option>
          <Option value="1" v-text="'BKJG'"></Option>
        </Select>
      </FormItem>
    </Col>
  </Row>
  <Row>
    <Col>
    <FormItem label="选择分支">
      <Select style="width:50%">
        <Option value="1" v-text="'dev'"></Option>
        <Option value="1" v-text="'dev_03'"></Option>
      </Select>
    </FormItem>
  </Col>
</Row>
<Row>
  <Col>
  <FormItem label="触发策略">
    <CheckboxGroup>
      <Checkbox label="">提交Gerrit后</Checkbox>
      <Checkbox label="">提交Git库后</Checkbox>
    </CheckboxGroup>
  </FormItem>
</Col>
</Row>
</div>

<div v-if="trigger === 'scm'">
  <Row>
    <CheckboxGroup>
      <Checkbox label="">周一</Checkbox>
      <Checkbox label="">周二</Checkbox>
      <Checkbox label="">周三</Checkbox>
      <Checkbox label="">周四</Checkbox>
      <Checkbox label="">周五</Checkbox>
      <Checkbox label="">周六</Checkbox>
      <Checkbox label="">周日</Checkbox>
    </CheckboxGroup>
  </Row>
  <Row>
    触发时间：
    <TimePicker format="HH:mm" type="timerange" placement="bottom-end" placeholder="Select time"
    style="width: 168px"></TimePicker>
  </Row>
</div>

<div v-if="trigger === 'timer'">
  <Row>
    <CheckboxGroup>
      <Checkbox label="">周一</Checkbox>
      <Checkbox label="">周二</Checkbox>
      <Checkbox label="">周三</Checkbox>
      <Checkbox label="">周四</Checkbox>
      <Checkbox label="">周五</Checkbox>
      <Checkbox label="">周六</Checkbox>
      <Checkbox label="">周日</Checkbox>
    </CheckboxGroup>
  </Row>
  <Row>
    触发时间：
    <TimePicker format="HH:mm" placeholder="Select time" style="width: 112px"></TimePicker>
  </Row>
</div>
</FormItem>
</Row>
<FormItem>
  <Button type="primary" @click="handleSubmit()">确定</Button>
  <Button type="ghost" style="margin-left: 8px">重置</Button>
</FormItem>
</Form>
</div>
</template>
<script>
  import Bread from './common/bread'
  import MySteps from './common/steps'

  export default {
    data() {
      return {
        trigger: 'gerrit',  // 触发条件
      }
    },
    methods: {
      handleSubmit(name) {
        this.$router.push({path: '/assembly/step'})
      }
    },
    components: {
      Bread,
      MySteps
    }
  }
</script>
<style scoped>
.form{
  width: 80%;
  margin: 0 auto;
}
.form-box {
  padding: 10px 0;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ccc;
}
</style>
