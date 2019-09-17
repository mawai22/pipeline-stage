<template>
  <div class="assembly-container">
    <div class="assembly-selection">
      <Row>
        <Col span="6">
          <span>项目名称:</span>
          <Select style="width:150px" v-model="prj">
            <Option v-for="item in prjList" :value="item.name" :key="item.name">{{item.name}}</Option>
          </Select>
        </Col>
        <Col span="6">
          <span>模块名称:</span>
          <Select style="width: 150px" v-model="model">
            <Option v-for="item in modelList" :value="item.name" :key="item.name">{{item.name}}</Option>
          </Select>
        </Col>
        <Col span="6">
          <span>代码仓库:</span>
          <Select style="width: 150px" v-model="house">
            <Option v-for="item in houselist" :value="item.name" :key="item.name">{{item.name}}</Option>
          </Select>
        </Col>
      </Row>
    </div>
    <div class="assembly-btn">
      <!--<router-link to="/assembly/create">-->
      <Button type="success" @click="clickCreate">添加流水线</Button>
    </div>
    <div class="assembly-items">
      <div class="assembly-title">
        <Row type="flex" justify="space-between">
          <Col :span="colNum">流水线名称</Col>
          <Col :span="colNum">关联代码库</Col>
          <Col :span="colNum">项目名称</Col>
          <Col :span="colNum">模块名称</Col>
          <Col :span="colNum">最新构建时间</Col>
          <Col :span="colNum">最新构建结果</Col>
          <Col :span="colNum">创建人</Col>
          <Col :span="colNum">操作</Col>
        </Row>
      </div>
      <div class="assembly-item" v-for="pipeitem in pipeline" :key="pipeitem.id">
        <Row type="flex" justify="space-between" class="assembly-top">
          <Col :span="colNum">
            <router-link @click.native="gotoDetail(pipeitem)"
                         :to="{path: '/assembly/detail', query:{name:pipeitem.name,id:pipeitem.id}}">
              {{pipeitem.name}}
            </router-link>
          </Col>
          <Col :span="colNum" v-text="pipeitem.codeHouse"></Col>
          <Col :span="colNum" v-text="pipeitem.prjName">新党群</Col>
          <Col :span="colNum" v-text="pipeitem.modelName">账号模块</Col>
          <Col :span="colNum" v-text="pipeitem.lastBuildTime">2018-8-11 14:38</Col>
          <Col :span="colNum" v-text="pipeitem.lastBuildResult">成功</Col>
          <Col :span="colNum" v-text="pipeitem.createdPeople">豆子</Col>
          <Col :span="colNum" class="assembly-item-btn">
            <Button size="small" type="warning">编辑</Button>
            <Button type="error" size="small" @click="openDelModal(pipeitem)">删除</Button>
            <Button size="small" type="info" class="icon-state" shape="circle" icon="plus-round"
                    @click="pipeitem.isShow = true"
                    v-show="!pipeitem.isShow">
            </Button>
            <Button size="small" class="icon-state" type="info" shape="circle" icon="minus-round"
                    @click="pipeitem.isShow = false"
                    v-show="pipeitem.isShow">
            </Button>
          </Col>
        </Row>
        <div v-if="pipeitem.isShow">
          <Row class="assembly-row-title">
            <Col>tpm_pre_submit最近3次构建</Col>
          </Row>
          <Row type="flex" justify="space-between" class="code-row-bg assembly-list-title">
            <Col :span="colNum">构建编号</Col>
            <Col :span="colNum">构建时间</Col>
            <Col :span="colNum">构建结果</Col>
            <Col :span="colNum">构建触发人</Col>
          </Row>
          <Row type="flex" justify="space-between" class="code-row-bg "
               v-for="house in pipeitem.houseList" :key="house.number">
            <Col :span="colNum" v-text="house.number">40</Col>
            <Col :span="colNum" v-text="house.time">2018-4-11 14:38</Col>
            <Col :span="colNum" v-text="house.info">成功</Col>
            <Col :span="colNum" v-text="house.people">橘子</Col>
          </Row>
          <Row class="assembly-row-title">
            <Col>对应部署环境下应用访问地址</Col>
          </Row>
          <Row type="flex" justify="space-between" class="code-row-bg assembly-list-title">
            <Col :span="colNum">应用名称</Col>
            <Col :span="colNum">部署时间</Col>
            <Col :span="colNum">应用访问地址</Col>
            <Col :span="colNum">容器地址</Col>
          </Row>
          <Row type="flex" justify="space-between" class="code-row-bg"
               v-for="(yingyong,index) in pipeitem.yingyongList" :key="index">
            <Col :span="colNum" v-text="yingyong.yyName"></Col>
            <Col :span="colNum" v-text="yingyong.time"></Col>
            <Col :span="colNum" v-text="yingyong.url"></Col>
            <Col :span="colNum" v-text="yingyong.boxUrl"></Col>
          </Row>
        </div>
      </div>
    </div>
    <Modal width="360px" v-model="isOpenDel">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除流水线</span>
      </p>
      <div style="text-align:center">
        <p>你将要删除{{curPipe.name}}</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="deletePipe">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {pipeline} from '@/base/commonparam'
  import {setBreadList} from './common/js/bread'

  export default {
    data() {
      return {
        isOpenDel: false,
        colNum: 3,
        prj: '项目1',
        model: '模块1',
        house: '仓库1',
        prjList: [
          {name: '项目1'},
          {name: '项目2'}
        ],
        modelList: [
          {name: '模块1'},
          {name: '模块2'}
        ],
        houselist: [
          {name: '仓库1'},
          {name: '仓库2'}
        ],
        pipeline: [],
        curPipe: {}
      }
    },
    created() {
      this.pipeline = pipeline;
    },
    methods: {
      // 跳转到流水线的详情页面
      gotoDetail(curPipeline) {
        let curChoise = [
          {name: 'prj', value: this.prj},
          {name: 'model', value: this.model},
          {name: 'house', value: this.house},
          {name: 'new', value: curPipeline.name}
        ]
        setBreadList(curChoise);
      },

      // 跳转到新建页面
      clickCreate() {
        this.$router.push({path: '/assembly/create'});
        let curChoise = [
          {name: 'prj', value: this.prj},
          {name: 'model', value: this.model},
          {name: 'house', value: this.house},
          {name: 'new', value: '新建流水线'}
        ]
        setBreadList(curChoise);
      },

      openDelModal(curPipe) {
        this.isOpenDel = true;
        this.curPipe = curPipe;
      },

      // 删除当前的某一个流水线
      deletePipe() {
        let index = this._findListIndex(this.pipeline, 'id', this.curPipe.id);
        if (index < 0) {
          return;
        }
        this.isOpenDel = false;
        this.pipeline.splice(index, 1);
      },

      _findListIndex(list, key, value) {
        return list.findIndex((item) => item[key] === value);
      }
    }
  }
</script>
<style scoped>
  .assembly-selection {
    margin: 20px 0;
  }

  .assembly-title {
    border: 1px solid #21488a;
    margin: 10px 0;
    padding: 10px 0;
    text-align: center;
    font-weight: bold;
  }

  .assembly-item {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #21488A;
    box-shadow: 8px 8px 5px #21488A;
    position: relative;
  }

  .assembly-top {
    font-weight: 600;
    text-align: center;
  }

  .assembly-row-title {
    font-weight: 600;
    text-align: left;
  }

  .assembly-list-title {
    color: #21488A;
  }

  .assembly-item-btn {
    position: relative;
  }
  .icon-state{
    position: absolute;
    top: -15px;
    right: -15px;
  }
</style>
