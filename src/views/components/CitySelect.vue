<template>
  <div class="cent">
    <el-select v-model="localSelectedProvince" @change="handleProvinceChange" :disabled="disabled">
      <el-option
        v-for="province in provinces"
        :key="province"
        :label="province"
        :value="province"
      ></el-option>
    </el-select>

    <el-select v-model="selectedCity" clearable>
      <el-option
        v-for="city in cities[localSelectedProvince]"
        :key="city"
        :label="city"
        :value="city"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { provinceCityGet } from "../../api/list";
export default {
  props: {
    selectedProvince: {
      type: String,
      default: "河南省", // 默认值为 20
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      localSelectedProvince: this.selectedProvince,
      selectedCity: "",
      provinces: ["省份A", "省份B", "省份C"], // 替换为实际的省份数据
      cities: {
        省份A: ["城市A1", "城市A2", "城市A3"], // 替换为实际的城市数据
        省份B: ["城市B1", "城市B2", "城市B3"],
        省份C: ["城市C1", "城市C2", "城市C3"],
      },
    };
  },
  watch: {
    pc() {
      this.selectpc();
    },
    // pcZhe(newValue, oldValue) {
    //   console.log("dddd");
    //   this.selectedProvince = newValue;
    // },
  },

  computed: {
    pc() {
      let pc = "";
      if (this.localSelectedProvince) {
        pc = this.localSelectedProvince;
      }
      if (this.selectedCity) {
        pc = pc + "-" + this.selectedCity;
      }
      return pc;
    },
  },
  methods: {
    handleProvinceChange() {
      this.selectedCity = ""; // 重置选择的城市
    },

    selectpc() {
      this.$emit("procit", this.pc);
    },
  },
  mounted() {
    provinceCityGet().then((res) => {
      this.provinces = res.data.map((item) => item.province);

      this.cities = res.data.reduce((acc, cur) => {
        const province = cur.province;
        const city = cur.city.split("-");
        if (province in acc) {
          acc[province].push(...city);
        } else {
          acc[province] = city;
        }
        return acc;
      }, {});
    });

  },
};
</script>
<style scoped>
.cent {
  display: flex;
  justify-content: space-between;
  width: 38%;
}
</style>