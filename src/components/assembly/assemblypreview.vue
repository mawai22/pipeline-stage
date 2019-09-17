<template>
  <div>
    <Row>
      <Input type="textarea" :autosize="true" disabled v-html="codeData"/>
    </Row>
    <Row style="margin-top:30px">
      <Button type="primary" @click="handleSubmit()">确定</Button>
      <Button type="ghost" style="margin-left: 8px">重置</Button>
    </Row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        codeData: "\n" +
        "node('master') {\n" +
        "    def WORKSPACE = env.WORKSPACE\n" +
        "    def base_dir = '/home/vmduser/workspace/awards_test'\n" +
        "    env.BASE_DIR = base_dir\n" +
        "    echo WORKSPACE\n" +
        "    echo BASE_DIR\n" +
        "    \n" +
        "    stage('从git获取代码'){\n" +
        "        git credentialsId: '6e5d30a8-5e46-44cb-9176-a454d19c1de3', url: 'ssh://lizhuo.zh@128.32.171.222:29418/BKJG/awards'\n" +
        "    }\n" +
        "    stage('复制代码到awards_test工作空间'){\n" +
        "        echo 'starting sh script....'\n" +
        "        sh '''\n" +
        "            rm -fr ${BASE_DIR}/apps\n" +
        "            rm -fr ${BASE_DIR}/README.md\n" +
        "            rm -fr ${BASE_DIR}/requirements.txt\n" +
        "            rm -fr ${BASE_DIR}/setup.py\n" +
        "            rm -fr ${BASE_DIR}/wsgi_handler.py\n" +
        "            cp -r  ${WORKSPACE}/*  ${BASE_DIR}'''\n" +
        "    }\n" +
        "}"
      }
    },
    methods: {
      handleSubmit() {
      this.$router.push({path: '/assembly'})
      }
    }
  }
</script>
