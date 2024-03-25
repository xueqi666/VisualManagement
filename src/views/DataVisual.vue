 <template>
  <div>
    <i
      class="el-icon-caret-top icon-up"
      @click="changChartUp"
      v-if="chart !== 1"
    ></i>

    <div class="layoutpage" v-if="chart === 1">
      <v-chart class="chart" :option="option" />

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
          <el-button  type="primary" round>{{ pc }}-招商政策分析</el-button>
          <el-button type="success" round>{{ pc }}-招商政策建议</el-button>
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

    <i class="el-icon-caret-bottom icon-down" @click="changChartDown"></i>
  </div>
</template>
 
 <script>
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
      // f_pc: ["贵州省", "贵州省-贵阳市"],
      chart: 1,
      pc: "贵州省", //省市
      year: 2023,
      years: [2023, 2022, 2021, 2020, 2019, 2018],
      res: [],
      yearZhe: 2023,
      pcZhe1: "贵州省",
      pcZhe2: "青海省",
      pcZhe3: "青海省",
      pc1: "贵州省",
      pc2: "青海省",
      pc3: "青海省",
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
.chart1 {
}
</style>