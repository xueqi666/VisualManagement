 <template>
  <div>
    <el-drawer
      :visible.sync="drawerAnalyse"
      direction="ltr"
      :show-close="false"
      size="45%"
    >
      <template #title
        ><div class="font-drawer">{{ pc }}-招商政策分析</div>
      </template>
      <template>
        　
        <div v-html="showText" style="padding: 0 20px"></div>
      </template>
    </el-drawer>
    <el-drawer
      :visible.sync="drawerSuggest"
      direction="ltr"
      :show-close="false"
      size="45%"
    >
      <template #title
        ><div class="font-drawer">{{ pc }}-招商政策建议</div>
      </template>
      <template>
        　
        <div v-html="showText" style="padding: 0 20px"></div>
      </template>
    </el-drawer>
    <el-dialog
      :title="`${year}年${mount}月${pc}招商政策发布情况`"
      :visible.sync="showDailog"
    >
      <el-table :data="tableData" class="el-table-style" :height="450">
        <el-table-column label="发布日期" width="150">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.publish_date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="author" label="发布机构" width="200">
        </el-table-column>
        <el-table-column label="源文件" width="100">
          <template slot-scope="scope">
            <el-button size="mini" @click="showFile(scope.row.url_id)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <i
      class="el-icon-caret-top icon-up"
      @click="changChartUp"
      v-if="chart !== 1"
    ></i>

    <div class="layoutpage" v-if="chart === 1">
      <v-chart class="chart" :option="option" @click="handleChartClick" />

      <div style="width: 40%">
        <div style="display: flex">
          <div class="min-option">
            <el-select v-model="year">
              <el-option
                v-for="item in years"
                :key="item"
                :value="item"
              ></el-option>
            </el-select>
          </div>

          <CitySelect @procit="procit" class="pcity"></CitySelect>
        </div>
        <div style="margin-top: 40px">
          <el-button type="primary" round @click="showAnalyse"
            >{{ pc }}-招商政策分析</el-button
          >
          <el-button type="success" @click="showSuggest" round
            >{{ pc }}-招商政策建议</el-button
          >
        </div>
        <div style="height: 500px; width: 100%">
          <v-chart class="chart1" :option="option1" />
        </div>
      </div>
    </div>

    <div v-else-if="chart === 2" class="layoutpage">
      <ZheXian
        style="width: 65%"
        :pc1="pc1"
        :pc2="pc2"
        :pc3="pc3"
        :yearZhe="yearZhe"
      >
      </ZheXian>
      <div
        style="margin-top: 70px; margin-left: 50px; height: 400px; width: 450px"
      >
        <div class="min-option">
          <el-select v-model="yearZhe">
            <el-option
              v-for="item in years"
              :key="item"
              :value="item"
            ></el-option>
          </el-select>

          <div style="margin-top: 50px">
            <CitySelect
              @procit="pcity1"
              class="pcity"
              :selectedProvince="pcZhe1"
            ></CitySelect>
          </div>
          <div style="margin-top: 50px">
            <CitySelect
              @procit="pcity2"
              class="pcity"
              :selectedProvince="pcZhe2"
            >
            </CitySelect>
          </div>
          <div style="margin-top: 50px">
            <CitySelect
              @procit="pcity3"
              class="pcity"
              :selectedProvince="pcZhe3"
            ></CitySelect>
          </div>
        </div>
      </div>
    </div>

    <i class="el-icon-caret-bottom icon-down" @click="changChartDown"  v-if="chart !== 2"></i>
  </div>
</template>
 
 <script>
import { pageList, urlGet, suggestAnalyseGet } from "../api/list";
import { proCityYear } from "../api/visualData";
import ZheXian from "./components/ZheXianTu.vue";
import CitySelect from "./components/CitySelect.vue";
export default {
  components: {
    CitySelect,
    ZheXian,
  },
  data() {
    return {
      tableData: [],
      mount: 0,
      showDailog: false,
      // f_pc: ["贵州省", "贵州省-贵阳市"],
      timer: null, //settimeout
      showText: "",
      chart: 1,
      pc: "河南省", //省市
      year: 2023,
      years: [2023, 2022, 2021, 2020, 2019, 2018],
      res: [],
      yearZhe: 2023,
      pcZhe1: "河南省",
      pcZhe2: "海南省",
      pcZhe3: "青海省",
      pc1: "河南省",
      pc2: "海南省",
      pc3: "青海省",
      drawerAnalyse: false,
      drawerSuggest: false,
      pageNum: 1,
      pageSize: 10,
      tableData: [],
      total: 1,
      startDate: "",
      endDate: "",
    };
  },
  watch: {
    year() {
      this.pageData();
    },
  },
  computed: {
    option() {
      return {
        title: {
          text: `${this.year}年${this.pc}招商政策发布情况`,
          left: "50px",
        },
        xAxis: {
          type: "category",
          data: [
            "1月份",
            "2月份",
            "3月份",
            "4月份",
            "5月份",
            "6月份",
            "7月份",
            "8月份",
            "9月份",
            "10月份",
            "11月份",
            "12月份",
          ],
        },
        tooltip: {
          trigger: "item",
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            dataView: {},
            magicType: {
              type: ["line", "bar", ""],
            },
            restore: {},
          },
          right: "50px",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "发布政策数量",
            data: this.res,
            type: "bar",
          },
        ],
      };
    },
    option1() {
      let res = this.res;
      let pieData = [
        "1月份",
        "2月份",
        "3月份",
        "4月份",
        "5月份",
        "6月份",
        "7月份",
        "8月份",
        "9月份",
        "10月份",
        "11月份",
        "12月份",
      ].map((item, index) => {
        let value = res[index];
        return {
          name: item,
          value: value,
        };
      });
      return {
        series: {
          roseType: "radius",
          radius: "70%",
          type: "pie",
          data: pieData,
          label: {
            show: true,
            formatter: "{b}:({d}%)",
          },
          selectedMode: "multiple",
          selectedOffset: "30",
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      };
    },
  },
  methods: {
    async showFile(url_id) {
      let { data } = await urlGet({ url_id });

      window.open(data.url, "_blank");
    },
    pageListShow() {
      let postion = this.pc;

      let { tag_type, pageNum, pageSize, startDate, endDate } = this;
      pageList({
        postion,
        tag_type,
        pageNum,
        pageSize,
        startDate,
        endDate,
      }).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.tableData;
          this.total = res.data.total;
        } else {
          this.$message.error("获取数据失败，请重试");
        }
      });
    },
    handleChartClick(params) {
      // 在这里执行柱状图点击事件后的处理逻辑
      console.log("柱状图被点击了", params);
      // params 包含了点击事件的详细信息，例如点击的柱子的索引、数据等
      this.showDailog = true;
      let count = Number(params.name.match(/\d+/g).join(""));

      let mount = count > 9 ? count : "0" + count;
      this.mount = mount;
      this.startDate = this.year + "-" + mount + "-01";
      this.endDate = this.year + "-" + mount + "-28";
      this.pageSize = params.data;
      this.pageListShow();
    },
    showAnalyse() {
      this.drawerAnalyse = true;
      suggestAnalyseGet({ postion: this.pc }).then((res) => {
        this.appear(res.data.analyse || "<h2>暂无分析</h2>");
      });
    },
    showSuggest() {
      this.drawerSuggest = true;
       suggestAnalyseGet({ postion: this.pc }).then((res) => {
        this.appear(res.data.suggest || "<h2>暂无建议</h2>");
      });
    },
    procit(pc) {
      this.pc = pc;

      this.pageData();
    },
    pcity1(pc) {
      this.pc1 = pc;
    },
    pcity2(pc) {
      this.pc2 = pc;
    },
    pcity3(pc) {
      this.pc3 = pc;
    },
    pageData() {
      let publish_date = this.year;
      let postion = this.pc;
      proCityYear({ postion, publish_date }).then((res) => {
        if (res.data.length === 0) {
          this.$message.success("暂无数据");
          this.res = [];
        } else {
          this.res = res.data;
        }
      });
    },
    changChartDown() {
      this.chart = this.chart + 1;
    },
    changChartUp() {
      this.chart = this.chart - 1;
      // this.$router.push("/a");
    },
    pageDataZhe() {
      let publish_date = this.yearZhe;
    },
    appear(content) {
      const _this = this;

      this.showText = "";
      clearTimeout(this.timer);

      var speed = 50; //设置定时的速度 越来越快
      var count = 1;

      content = content.replace(/\/n/g, "<br/>");
      function changeContent() {
        _this.showText = content.substring(0, count); //截取字符串
        count++;

        if (count != content.length + 1) {
          speed -= 1;
          if (speed < 5) speed = 5;

          _this.timer = setTimeout(changeContent, speed);
        }
      }
      changeContent();
    },
  },
  mounted() {
    this.pageData();
  },
};
</script>
 
 <style scoped>
.layoutpage {
  display: flex;
}
.chart {
  height: 600px;
  width: 60%;
  margin-top: 30px;
}

.pcity {
  height: 20px;
  margin-top: 15px;
  width: 400px;
}
.min-option {
  margin-top: 15px;
  width: 100px;
}
.juzhong {
  width: 100px;
  height: 300px;
  margin-top: 200px;

  background-color: red;
  font-size: 50px;
  vertical-align: middle;
  text-align: center;
}
.icon-up {
  font-size: 40px;
  margin-left: 950px;
  position: absolute;
  display: block;
}
.icon-down {
  font-size: 40px;
  margin-left: 950px;
  margin-top: -50px;
  position: absolute;
  display: block;
  cursor: pointer;
}
.icon-down:hover {
  color: #3367d1;
}
.icon-up:hover {
  color: #3367d1;
}

.font-drawer {
  font-size: 20px;
  font-weight: 600;
}
</style>