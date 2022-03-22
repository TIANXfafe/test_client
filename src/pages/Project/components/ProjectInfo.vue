<template>
  <div>
    <ul class="project-info-group">
      <li>
        <span class="title">名称：</span>
        <span class="detail">{{project.name}}</span>
      </li>
      <li>
        <span class="title">类型：</span>
        <span class="detail">{{project.type}}</span>
      </li>
      <li>
        <span class="title">介绍：</span>
        <span class="detail">{{project.description}}</span>
      </li>
      <li>
        <span class="title">创建时间：</span>
        <span class="detail">{{project.create_time}}</span>
      </li>
      <li>
        <span class="title">更新时间：</span>
        <span class="detail">{{project.last_update_time}}</span>
      </li>
      <li>
        <span class="title">创建人：</span>
        <span class="detail">{{project.user ? project.user.username : ""}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ProjectInfo",
  props: {
    project: {
      type: Object,
    }
  },
  watch: {
    project(val) {
      val.last_update_time = moment(val.last_update_time).format("YYYY-MM-DD HH:mm:ss")
      val.create_time = moment(val.create_time).format("YYYY-MM-DD HH:mm:ss")
      this.project = val;
    }
  },
}
</script>

<style scoped lang='less'>
.project-info-group{
  li{
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    .title{
      display: inline-block;
      font-weight: 700;
      width: 100px;
    }
  }
}
</style>
