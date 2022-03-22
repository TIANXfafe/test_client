<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="项目介绍" name="1">
        <ProjectInfo :project="project"></ProjectInfo>
      </el-tab-pane>
      <el-tab-pane label="项目Host" name="2">
<!--        <HostList :project="project"></HostList>-->
      </el-tab-pane>
      <el-tab-pane label="API接口" name="3">
<!--        <ApiEntry :project="project"></ApiEntry>-->
      </el-tab-pane>
      <el-tab-pane label="测试用例" name="4">
<!--        <CaseEntry :project="project"></CaseEntry>-->
      </el-tab-pane>
      <el-tab-pane label="任务列表" name="5">
<!--        <TaskList :project="project"></TaskList>-->
      </el-tab-pane>
      <el-tab-pane label="运行记录" name="6">
<!--        <RecordList :project="project"></RecordList>-->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProjectInfo from "@/pages/Project/components/ProjectInfo";

export default {
  name: "ProjectDetail",
  components: {
    ProjectInfo
  },
  data() {
    return {
      // 当前选中tab
      activeName: "1",
      // 项目信息
      project: {},
      // 项目id
      projectId: ""
    }
  },
  mounted() {
    const id = this.$route.params.project_id
    this.initData(id)
  },
  methods: {
    initData(id) {
      this.$api.getProjectDetail(id).then(res => {
        if (res && res.status === 200) {
          this.project = res.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
