<template>
  <div class="page0">
    <el-row>
      <el-col :span="3">
        <el-menu
          :default-active="navIndex"
          class="el-menu-vertical"
          background-color="#03044a"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="0" @click="navIndexChange(0)">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ navName[0] }}</span>
          </el-menu-item>
          <el-menu-item index="1" @click="navIndexChange(1)">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ navName[1] }}</span>
          </el-menu-item>
          <el-menu-item index="2" @click="navIndexChange(2)">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ navName[2] }}</span>
          </el-menu-item>
          <el-menu-item index="3" @click="navIndexChange(3)">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ navName[3] }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <el-row>
          <CitySelect
            style="margin-top: 15px"
            @procit="changProvinceCity"
          ></CitySelect>
        </el-row>
        <el-row>
          <el-table :data="tableData" class="el-table-style" :height="450">
            <el-table-column label="发布日期" width="150">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{
                  scope.row.publish_date
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="标题"> </el-table-column>
            <el-table-column prop="author" label="发布机构" width="200">
            </el-table-column>
            <el-table-column label="源文件" width="100">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="showFile(scope.row.content_source_url)"
                  >查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @prev-click="prevPage"
            @next-click="nextPage"
            @current-change="pageChange"
            :page-size="pageSize"
            style="margin: 20px 0 0 200px"
          >
          </el-pagination>
        </el-row>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>


<script>
import { pageList } from "../api/list";
import CitySelect from "./components/CitySelect.vue";
export default {
  data() {
    return {
      navIndex: "0",
      navName: ["政策文件", "政策解读", "新闻动态", "可视化分析"],
      tag_type: "政策文件",
      postion: "贵州省",
      pageNum: 1,
      pageSize: 10,
      tableData: [],
      total: 1,
    };
  },
  components: {
    CitySelect,
  },

  methods: {
    showFile(url) {
      window.open(url, "_blank");
    },
    pageListShow() {
      let { postion, tag_type, pageNum, pageSize } = this;
      pageList({ postion, tag_type, pageNum, pageSize }).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.tableData;
          this.total = res.data.total;
        } else {
          this.$message.error("获取数据失败，请重试");
        }
      });
    },
    navIndexChange(index) {
      this.tag_type = this.navName[index];
      if (index === 3) {
        this.$router.push({ name: "visual" });
      }
      this.pageNum = 1;
      this.pageListShow();
    },
    changProvinceCity(data) {
      this.postion = data;
      this.pageListShow();
    },
    prevPage() {
      console.log("ssssss");
      this.pageNum = this.pageNum - 1;
    },
    nextPage() {
      console.log("ssssss");
      this.pageNum = this.pageNum + 1;
    },
    pageChange(pageNum) {
      this.pageNum = pageNum;
      this.pageListShow();
    },
  },
  mounted() {
    this.pageListShow();
  },
};
</script>

<style scoped>
.page0 {
  height: 100%;
  width: 100%;
  background: #03044a;
  overflow: hidden;
}
.el-menu-vertical {
  width: 10%;
  border: 0;
}
.flex-bu {
  display: flex;
  justify-content: space-between;
  width: 40%;
}
.el-table-style {
  width: 90%;
  margin-top: 50px;
}
</style>