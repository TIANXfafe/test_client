<template>
<div>
  <h1>项目列表</h1>
  <div class="top-group">
    <el-button type="primary" icon="el-icon-plus" @click="onAddProjectButtonClick">新增项目</el-button>
  </div>
  <el-table :data="projects" style="width: 100%">
    <el-table-column prop="name" label="项目名称" width="180">
      <template slot-scope="scope">
        <router-link :to="'/project/'+scope.row.id">{{scope.row.name}}</router-link>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="类型" width=100>
    </el-table-column>
    <el-table-column label="最后修改时间">
      <template slot-scope="scope">
        {{scope.row.last_update_time}}
      </template>
    </el-table-column>
    <el-table-column prop="description" label="描述">
    </el-table-column>
    <el-table-column label="状态" width="100">
      <template>
        <!-- <el-tag type="success" v-if="scope.row.status==true">可用</el-tag>
        <el-tag type="danger" v-if="scope.row.status==false">禁用</el-tag> -->
        <el-tag type="success">可用</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="300">
      <template slot-scope="scope">
        <el-button @click="onEditProject(scope.row)" size="mini">编辑</el-button>
        <el-button type="danger" size="mini" @click="deleteProject(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

 <el-dialog :title="dialogType === 'add' ? '新增' : '编辑' + '项目'" :visible.sync="addDialogVisiable">
    <el-form ref="projectForm" :model="projectForm" label-width="80px" :rules="projectRules">
      <el-form-item label="名称" prop="name">
        <el-input v-model="projectForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="projectForm.type" placeholder="请选择类型">
          <el-option label="Web" value="web"></el-option>
          <el-option label="App" value="app"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="projectForm.description" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisiable = false">取 消</el-button>
      <el-button type="primary" @click="onSubmitAddProject" :loading="addProjectButtonLoading">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      // 项目列表
      projects: [],
      // 是否显示dialog
      addDialogVisiable: false,
      // dialog类型
      dialogType: "add",
      // 新增、编辑项目表单
      projectForm: {
        id: "",
        name: "",
        type: "",
        description: ""
      },
      // 新增、编辑项目表单规则
      projectRules: {
        name: [
          {required: true,message: "请输入手机号码！",trigger: "blur"}
        ],
        type: [
          {required: true,message: "请选择项目类型！",trigger: "blur"}
        ]
      },
      // 确定按钮是否loading
      addProjectButtonLoading: false
    }
  },
  watch: {
    projects(val) {
      val.length && val.map(item => {
        item.last_update_time = moment(item.last_update_time).format("YYYY-MM-DD HH:mm:ss")
        item.create_time = moment(item.create_time).format("YYYY-MM-DD HH:mm:ss")
      })
      this.projects = val;
    }
  },
  mounted() {
    this.initProjectForm()
  },
  methods: {
    /**
     * 初始化新建项目表单
     */
    initProjectForm() {
      this.projectForm = {
        id: "",
        name: "",
        type: "",
        description: ""
      }
      this.getProjectList()
    },

    /**
     * 获取项目列表
     */
    getProjectList() {
      this.$api.getProjectList().then(res => {
        this.projects = res.data
      })
    },

    /**
     * 新建项目按钮点击事件
     */
    onAddProjectButtonClick() {
      this.addDialogVisiable = true
      this.dialogType = "add"
    },

    /**
     * 新增、编辑项目弹窗确定按钮点击事件
     */
    onSubmitAddProject() {
      this.$refs["projectForm"].validate(valid => {
        if (!valid) {
          return
        }
        this.addProjectButtonLoading = true
        if (this.dialogType === "add") {
          this.$api.addProject(this.projectForm).then(res => {
            console.log('res', res)
            this.addProjectButtonLoading = false
            if (res && res.status === 201) {
              this.addDialogVisiable = false
              this.$message.success("创建成功!")
              this.initProjectForm()
            }
          })
        } else {
          this.$api.editProject(this.projectForm.id, this.projectForm).then(res => {
            if (res) {
              this.addDialogVisiable = false
              this.$message.success("编辑成功!")
              this.initProjectForm()
            }
          })
        }
      })
    },

    /**
     * 编辑按钮点击事件
     */
    onEditProject(project) {
      this.dialogType = "edit"
      this.projectForm = {
        id: project.id,
        name: project.name,
        type: project.type,
        description: project.description
      }
      this.addDialogVisiable = true
    },

    /**
     * 删除按钮点击事件
     */
    deleteProject(id) {
      console.log('id', id)
      this.$api.deleteProject(id).then(res => {
        if (res && res.status === 204) {
          this.$message.success("删除成功!")
          this.initProjectForm()
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.top-group{
  padding: 10px 0;
  text-align: right;
}
</style>
