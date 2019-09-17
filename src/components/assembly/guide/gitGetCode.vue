<template>
  <Form :label-width="150">
      <FormItem label="自定义名称">
        <Input placeholder="请输入自定义的名称" v-model="gitCode.stepName" style="width: 200px"></Input>
      </FormItem>
    <FormItem label="Repositories">
      <Row >
        <FormItem label="Repository url:">
            <Input placeholder="请输入地址" style="width: 200px"/>
        </FormItem>
        <FormItem label="Credentials:">
          <Modal
            title="Title"
            v-model="modal9"
            :styles="{top: '20px'}">
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
          </Modal>
           <Select placeholder="请输入人员" style="width: 200px" multiple>
                <Option :value="1">c</Option>
                <Option :value="2">b</Option>
                <Option :value="3">a</Option>
            </Select>
            <Button size="small">
                <Icon type="plus" color="blue" size="16"></Icon>
              
            </Button>

        </FormItem>
        <FormItem label="brance:">
            <Input placeholder="请输入分支" style="width: 200px"/>
        </FormItem>
     
      </Row>
    </FormItem>
    <FormItem>
      <Button type="success">新建</Button>
      <Button type="warning">修改</Button>
    </FormItem>

  </Form>
</template>
<script>
  export default {
    data() {
      return {
        gitCode: {

        }
      }
    }
  }
</script>
<style scoped>
  .form-label {
    display: inline-block;
    width: 100px;
    text-align: right;
  }
</style>
