<template>
  <div class="announcement-container">
    <div class="announcement-list" ref="announcementList">
      <transition-group name="announcement-slide" tag="div">
        <div
          v-for="(announcement, index) in announcements"
          :key="index"
          class="announcement"
        >
          {{ announcement }}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      announcements: [
        "公告1：这是第一条公告内容。",
        "公告2：这是第二条公告内容。",
        "公告3：这是第三条公告内容。",
        // 更多公告内容...
      ],
      currentIndex: 0,
      intervalId: null,
    };
  },
  mounted() {
    this.startCarousel();
  },
  methods: {
    startCarousel() {
      this.intervalId = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.announcements.length;
        this.scrollAnnouncement();
      }, 3000); // 每隔3秒切换一条公告
    },
    scrollAnnouncement() {
      const announcementList = this.$refs.announcementList;
      if (announcementList) {
        announcementList.style.transition = "transform 1s";
        announcementList.style.transform = `translateY(-${
          this.currentIndex * 50
        }px)`; // 每条公告的高度为50px
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.intervalId); // 组件销毁前清除定时器
  },
};
</script>

<style>
.announcement-container {
  height: 50px; /* 单行公告高度 */
  overflow: hidden;
  position: relative;
}
.announcement-list {
  display: flex;
  flex-direction: column;
}
.announcement {
  line-height: 50px;
  text-align: center;
}
</style>
