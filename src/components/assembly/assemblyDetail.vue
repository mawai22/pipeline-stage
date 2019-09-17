<template>
  <div>
    <bread></bread>
    <div class="detail-box">
      <Row>
        <Col span="2">流水线描述</Col>
        <Col span="20">本条流水线为新建党群项目account模块代码，只要有该模块的gerri提交，就会触发此流水线</Col>
      </Row>
      <div class="detail-view">
        <h4>流水线Stage View (只显示最近五次的构建)</h4>
        <ul class="detail-view-left">
          <li class="view-left-des">
            <span>fadafdafadfad</span>
          </li>
          <li class="view-left-li" v-for="item in viewList" :key="item.title">
            <div class="view-left-content">
              <div class="view-left-lf">
                <span class="view-left-data">Jul 30</span>
                <span class="view-left-time">18:08</span>
              </div>
              <div class="view-left-rg">
                <span>1</span>
                <span>commit</span>
              </div>
              <div class="view-tips">
                <Button type="primary" size="small" shape="circle" v-text="`#${item}`"
                        @click="gotoBuilding(item)"></Button>
              </div>
            </div>
          </li>
        </ul>
        <div class="detail-view-right">
          <Row class="view-table-title">
            <Col :span="viewTableCols"
                 v-for="item in viewTable"
                 :key="item.title"
                 v-text="item.title"
            ></Col>
          </Row>
          <Row class="view-table-process">
            <Col class="view-process-col"
                 :span="viewTableCols"
                 v-for="item in viewTable"
                 :key="item.title">
              <Progress
                :percent="item.process"
                :stroke-width="5"></Progress>
            </Col>
          </Row>
          <Row class="view-table-content">
            <Col class="table-content-col"
                 :span="viewTableCols"
                 v-for="item in viewTable"
                 :key="item.title">
              <Row
                v-for="(col, colIndex) in item.list"
                :key="colIndex"
                class="table-col-row">
                <Col class="table-cell">
                  <div class="table-cell-bg" :style="{width: col.process + '%'}" v-text="col.time"></div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div class="detail-history">
      <h4>构建历史列表(其他)</h4>
      <Table :columns="historyTitle" :data="historyList"></Table>
    </div>
  </div>
</template>

<script>
  import {getBread, pushBread} from './common/js/bread'
  import Bread from './common/bread'

  export default {
    data() {
      return {
        curBuildId: '343',
        viewList: [1, 2, 3, 4, 5],  // view List 循环
        viewTableCols: 4,
        viewTable: [    // table的内容
          {
            title: '从git获取代码',
            process: 20,
            list: [
              {time: '5s', process: 40},
              {time: '10s', process: 76},
              {time: '1s', process: 47},
              {time: '2s', process: 61},
              {time: '11s', process: 45},
            ]
          },
          {
            title: '添加node_modules',
            process: 25,
            list: [
              {time: '5s', process: 40},
              {time: '10s', process: 80},
              {time: '1s', process: 89},
              {time: '2s', process: 43},
              {time: '11s', process: 70},
            ]
          },
          {
            title: 'build项目',
            process: 30,
            list: [
              {time: '5s', process: 20},
              {time: '10s', process: 30},
              {time: '1s', process: 40},
              {time: '2s', process: 15},
              {time: '11s', process: 90},
            ]
          },
          {
            title: '代码打包',
            process: 90,
            list: [
              {time: '5s', process: 30},
              {time: '10s', process: 8},
              {time: '1s', process: 46},
              {time: '2s', process: 94},
              {time: '11s', process: 39},
            ]
          },
          {
            title: '源代码代码备份',
            process: 40,
            list: [
              {time: '5s', process: 10},
              {time: '10s', process: 30},
              {time: '1s', process: 56},
              {time: '2s', process: 40},
              {time: '11s', process: 50},
            ]
          },
          {
            title: '启动项目',
            process: 40,
            list: [
              {time: '5s', process: 50},
              {time: '10s', process: 60},
              {time: '1s', process: 20},
              {time: '2s', process: 85},
              {time: '11s', process: 10},
            ]
          },
        ],
        historyTitle: [
          {
            title: '状态',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              return h('Icon', {
                props: {
                  type: "record",
                  color: params.row.status === 'Y' ? '#19be6b' : '#ed3f14'
                },
              })
            }
          },
          {
            title: '构建号',
            key: 'number',
            align: 'center'
          },
          {
            title: '提交',
            key: 'submit',
            align: 'center'
          },
          {
            title: '提交消息',
            key: 'msg',
            align: 'center'
          },
          {
            title: '构建时间',
            key: 'date',
            align: 'center'
          },
          {
            title: '持续时间',
            key: 'delayed',
            align: 'center'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'info'
                },
                on: {
                  click: () => {
                    this.gotoBuilding(params.row.number)
                  }
                }
              }, '构建详情')
            }
          }
        ],
        historyList: [
          {status: 'Y', number: 38, submit: '-', msg: '由xiebei启动', date: '2018-08-11', delayed: '33ms'},
          {status: 'N', number: 37, submit: '-', msg: '修改首页', date: '2018-08-10', delayed: '3423ms'},
          {status: 'Y', number: 36, submit: '-', msg: '修改***模块', date: '2018-08-09', delayed: '33ms'},
          {status: 'Y', number: 35, submit: '-', msg: '修改bug', date: '2018-08-01', delayed: '33ms'},
        ]
      }
    },
    methods: {
      gotoBuilding(number) {
        this.$router.push({path: '/assembly/build'});
        pushBread('build', number);
      }
    },
    components: {
      Bread
    }
  }
</script>

<style scoped>
  .detail-view {
    margin: 20px 0;
    position: relative;
    overflow: hidden;
  }

  .detail-view h4 {
    margin-bottom: 10px;
  }

  .detail-view-left {
    float: left;
    width: 200px;
  }

  .view-left-des {
    height: 100px;
    text-align: center;
  }

  .detail-view-right {
    float: left;
    width: calc(100% - 200px);
    border: 1px solid #ccc;
  }

  .view-left-li {
    border-bottom: 1px solid #eee;
  }

  .view-left-content {
    position: relative;
    margin: 8px auto;
    width: 120px;
    border-radius: 5px;
    /*overflow: hidden;*/
    background-color: #ccc;
    border: 1px solid #ccc;
    zoom: 1;
  }

  .view-left-content:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
  }

  .view-tips {
    position: absolute;
    top: -12px;
    left: -30px;
  }

  .view-left-lf, .view-left-rg {
    float: left;
    width: 50%;
    height: 50px;
  }

  .view-left-lf span, .view-left-rg span {
    display: block;
    height: 25px;
    text-align: center;
  }

  .view-left-data {
    background-color: #f8f8f8;
  }

  .view-left-time {
    background-color: #f9f9f9;
  }

  .view-left-rg span {
    color: #fff;
  }

  .view-table-title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    border: 1px solid #333;
  }

  .view-process-col {
    padding: 10px;
    border: 1px solid #ccc;
  }

  .table-content-col {
    border-right: 1px solid #ccc;
  }

  .table-col-row {
    height: 60px;
    text-align: center;
    line-height: 50px;
    /*background-color: #f8f8f8;*/
    margin: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .table-cell {
    height: 100%;
  }

  .table-cell-bg {
    width: auto;
    height: 100%;
    background-color: #DBDBDB;
  }

  .detail-history {
    padding: 0 20px;
  }

  .detail-history h4 {
    margin-bottom: 20px;
  }
</style>
