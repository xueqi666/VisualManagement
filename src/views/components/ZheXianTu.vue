<template>
  <div>
    <v-chart class="chart" :option="option" ref="chart"></v-chart>
  </div>
</template>

<script>
import { proCityYear } from "../../api/visualData";
export default {
  name: "ZheXian",
  props: ["pc1", "pc2", "pc3", "yearZhe"],
  data() {
    return {
      res: [[], [], []],
    };
  },
  computed: {
    option() {
      return {
        title: {
          text: `各省市招商政策发布情况对比`,
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
              type: ["line", "bar"],
            },
            restore: {},
          },
          right: "50px",
        },
        yAxis: {
          type: "value",
        },
        legend: {
          data: [this.pc1, this.pc2, this.pc3],
        },
        series: [
          {
            name: this.pc1,
            data: this.res[0],
            type: "line",
            itemStyle: { color: "#0000FF" }, // 指定红色
          },
          {
            name: this.pc2,
            data: this.res[1],
            itemStyle: { color: "#FFA500" }, // 指定蓝色
            type: "line",
          },
          {
            name: this.pc3,
            data: this.res[2],
            type: "line",
            itemStyle: { color: "#00FF00" }, // 指定绿色
          },
        ],
      };
    },
    pc() {
      let pc = [];
      pc.push(this.pc1);
      pc.push(this.pc2);
      pc.push(this.pc3);
      return pc;
    },
  },
  watch: {
    pc() {
      this.pageData();
    },
    yearZhe() {
      this.pageData();
    },
  },
  methods: {
    pageData() {
      let publish_date = this.yearZhe;
      let postions = this.pc;
      let promises = [];

      postions.forEach((item, index) => {
        let promise = proCityYear({ postion: item, publish_date }).then(
          (res) => {
            if (res.data.length === 0) {
              this.$message.success(item + "暂无数据");
              return [];
            } else {
              return res.data;
            }
          }
        );
        promises.push(promise);
      });

      Promise.all(promises).then((results) => {
        this.res = results;
      });
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

  margin-top: 30px;
}
</style>