<template>
  <div>
    <bread></bread>
    <div class="build-box">
      <h4>本次构建产物</h4>
      <Table :columns="colListProdruct" :data="productList">
      </Table>
      <Page class="build-page" :page-size="pageSize"
            :total="productList.length?productList.length:1" show-total show-elevator></Page>
    </div>
    <div class="build-box">
      <h4>本次变更</h4>
      <Table :columns="colListCommit" :data="commitList">
      </Table>
      <Page class="build-page" :page-size="pageSize"
            :total="commitList.length?commitList.length:1" show-total show-elevator></Page>
    </div>
    <div class="build-box">
      <h4>流水线各阶段详情</h4>
      <Steps class="steps-box" :current="stepsList.length + 1">
        <Step title="开始" icon="record"></Step>
        <Step class="build-page-item"
              v-for="(step,index) in stepsList"
              :key="step.id"
              :icon="curStepIndex===index?'ios-circle-filled':'ios-checkmark'"
              :status="curStepIndex===index?'error':'process'"
              :title="step.title"
              @click.native="clickStep(step,index)"></Step>
        <Step title="结束" icon="record"></Step>
      </Steps>
    </div>
    <div class="build-box">
      <h4 v-text="curStep.title"></h4>
      <Collapse>
        <Panel
          v-for="(item, index) in curStep.classList"
          :key="item.classTitle">
          <span v-text="item.classTitle"></span>
          <p slot="content" v-text="item.content"></p>
        </Panel>
      </Collapse>
    </div>
  </div>
</template>

<script>
  import {deleteBread} from './common/js/bread'
  import Bread from './common/bread'

  export default {
    data() {
      return {
        curStepIndex: 0,
        curStep: {},
        pageSize: 3,     // 分页显示条数
        colListProdruct: [  // 本次构建产物得表头
          {
            title: '名称',
            key: 'name',
          },
          {
            title: '大小',
            key: 'size'
          },
          {
            title: '操作',
            render: (h, params) => {
              return h('a', {
                domProps: {
                  href: '#'
                }
              }, '下载')
            }
          }
        ],
        productList: [  // 产物列表
          {
            name: 'Root.war',
            size: '87.73MB'
          },
          {
            name: 'account-fortify.fpr',
            size: '366kb'
          },
          {
            name: 'account-fortify.fpr',
            size: '366kb'
          }
        ],
        colListCommit: [
          {
            title: '提交commit-id',
            key: 'id'
          },
          {
            title: '提交人',
            key: 'peopleName'
          },
          {
            title: '提交信息',
            key: 'info'
          }
        ],
        commitList: [
          {
            id: 'b7ccf79',
            peopleName: 'xiebei.zh',
            info: '第一次提交得工程代码'
          },
          {
            id: 'fdafa23',
            peopleName: 'lizhuo.zh',
            info: '修改首页信息'
          },
          {
            id: 'fajdlkfjf',
            peopleName: 'xiebei.zh',
            info: '更新参数'
          },
        ],
        stepsList: [
          {
            id: 1,
            title: '从git获取代码',
            status: 'Y',
            classList: [
              {
                classTitle: 'git的第一个步骤',
                content: '这是git的第一个步骤哦哦哦'
              },
              {
                classTitle: 'git的第二个步骤',
                content: '这是git的第二个步骤哦哦哦'
              },
            ]
          },
          {
            id: 2,
            title: 'node_modules',
            status: 'Y',
            classList: [
              {
                classTitle: '添加node_modules的第一个步骤',
                content: '这是添加node_modules的第一个步骤哦哦哦'
              },
              {
                classTitle: '添加node_modules的第二个步骤',
                content: '这是添加node_modules的第二个步骤哦哦哦'
              },
            ]
          },
          {
            id: 3,
            title: 'build项目',
            status: 'Y',
            classList: [
              {
                classTitle: 'build项目的第一个步骤',
                content: '这是build项目的第一个步骤哦哦哦'
              },
              {
                classTitle: 'build项目的第二个步骤',
                content: '这是build项目的第二个步骤哦哦哦'
              }
            ]
          }
        ]
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.name === "assembly_detail" && from.name === 'assembly_build') {
        deleteBread('build');
      }
      next();
    },
    created() {
      this.curStep = this.stepsList[0]
    },
    methods: {
      clickStep(step, index) {
        this.curStepIndex = index;
        this.curStep = step;
      }
    },
    components: {
      Bread
    }
  }
</script>

<style scoped>
  .build-box {
    margin-top: 10px;
    overflow: hidden;
  }

  .build-box h4 {
    margin-bottom: 10px;
  }

  .build-page {
    margin-top: 10px;
    float: right;
  }

  .steps-box {
    width: 80%;
    margin: 30px auto;
  }

  .build-page-item {
    font-size: 30px;
  }
</style>
