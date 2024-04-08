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
import { pageList, urlGet } from "../api/list";
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
      this.appear(`<div class="details-main details-main-file">
                <h2 id="subtitle">河南省人民政府<br>关于印发河南省优化营商环境创新示范<br>实施方案的通知</h2>
                <h4><span>豫政〔2022〕20号</span></h4>
                <div class="content" id="content">
                    <p>各省辖市人民政府，济源示范区、航空港区管委会，省人民政府有关部门：</p><p>　　现将《河南省优化营商环境创新示范实施方案》印发给你们，请认真贯彻执行。</p><p style="text-align: right;">　　河南省人民政府</p><p style="text-align: right;">　　2022年6月2日</p><p style="text-align: center;">　　<strong>河南省优化营商环境创新示范实施方案</strong></p><p>　　为贯彻落实党中央、国务院关于优化营商环境工作部署，对标国家创新试点改革事项，鼓励有条件的地方开展先行先试，加快政策集成创新，持续优化市场化、法治化、国际化营商环境，制定本方案。</p><p>　　<strong>一、指导思想。</strong>以习近平新时代中国特色社会主义思想为指导，全面贯彻党的十九大和十九届历次全会精神，贯彻落实省委十一届二次全体（扩大）会议暨省委经济工作会议精神，以制度创新为核心，赋予有条件的地方更大改革自主权，对标国际国内一流水平，聚焦市场主体需求，着力提升政务服务能力和水平，降低制度性交易成本，更大激发市场活力和社会创造力，打造审批最少、流程最优、体制最顺、机制最活、效率最高、服务最好的“六最”营商环境，不断推动我省经济社会平稳健康发展。</p><p>　　<strong>二、示范任务和范围。</strong>根据《国务院关于开展营商环境创新试点工作的意见》（国发〔2021〕24号）精神，结合我省实际可先行开展的9个方面共57项改革创新事项。我省对标国内前沿水平，复制推广先进地区16个方面共64项改革创新事项。</p><p>　　<strong>三、主要目标。</strong>经过三年的创新示范，我省创新示范市（区）营商环境竞争力跃居国内前列，政府治理效能全面提升，各类资源要素集聚和配置能力明显增强，形成一系列可复制可推广的制度创新成果和叫响全国的营商品牌;全省市场主体活跃度和发展质量显著提高，市场主体满意度大幅改善，营商环境便利度中西部领先，基本建成“六最”营商环境。</p><p>　　<strong>四、加强组织领导和统筹协调。</strong>省优化营商环境工作领导小组办公室要统筹推进营商环境创新示范工作，做好协调督促、总结评估、复制推广等工作。各成员单位要结合自身职责，协调指导各地推进相关改革，为各地先行先试创造良好条件。要加强数据共享和电子证照应用支撑，扩大部门和地方间系统互联互通和数据共享范围；优化数据资源授权模式，探索实施政务数据、电子证照地域授权和场景授权，将产生于各地方但目前由全省统一管理的相关领域数据和电子证照回流各地；对示范城市需使用的省级主管部门的数据和电子证照，由主管部门通过数据落地或数据核验等方式统一提供给各地。</p><p>　　<strong>五、做好滚动示范和评估推广</strong><strong>。</strong>省优化营商环境工作领导小组办公室要建立改革事项动态更新机制，分批次研究制定改革事项清单，采取批量授权方式，按程序报批后推进实施。每年对创新示范市（区）工作开展情况进行评估，对实践证明行之有效、市场主体欢迎的改革措施要及时在更大范围复制推广，对出现问题和风险的要及时调整或停止实施。重大情况要及时向省优化营商环境工作领导小组报告。</p><p>　　附件：1.可开展的国家营商环境改革创新事项清单</p><p>　　2.国内先进地区营商环境改革创新事项清单</p><p style="text-align: center;"><img src="https://img.henan.gov.cn/9afe780747299e85be30bbbae5566f10?p=0" title="河南省人民政府关于印发河南省优化营商环境创新示范实施方案的通知" alt="河南省人民政府关于印发河南省优化营商环境创新示范实施方案的通知" width="650" height="5336" border="0"></p><p style="text-align: center;"><img src="https://img.henan.gov.cn/42167e0bbdbc766fb004d611487d6a03?p=0" title="河南省人民政府关于印发河南省优化营商环境创新示范实施方案的通知" alt="河南省人民政府关于印发河南省优化营商环境创新示范实施方案的通知" width="700" height="9346" border="0"></p>


            </div>
        </div>`);
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
.chart1 {
}
.font-drawer {
  font-size: 20px;
  font-weight: 600;
}
</style>