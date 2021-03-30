<!--
 * @Author: Yin Xiang Zheng
 * @LastEditors: Yin Xiang Zheng
 * @LastEditTime: 2021-03-15 16:40:02
-->
<template>
  <div class="page">
    <van-search :value="queryValue" placeholder="请输入搜索关键词" />
    <scroll-view
      scroll-y="true"
      bindscrolltoupper="upper"
      bindscrolltolower="lower"
      bindscroll="scroll"
      :scroll-into-view="toView"
      :scroll-top="scrollTop"
    >
      <block
        v-for="(item, gameIndexs) in games"
        :index="gameIndexs"
        :key="gameIndexs"
      >
        <van-card
          :desc="item.desc"
          :title="item.name"
          thumb="/static/logos/LogoVBlack.svg"
        >
          <view slot="tags">
            <block
              v-for="(item, tagIndexs) in item.style"
              :index="tagIndexs"
              :key="tagIndexs"
            >
              <van-tag plain type="danger">{{ item }}</van-tag>
            </block>
          </view>
          <view slot="price">
            <span class="price-class"> 平日 {{ item.weekdayPrice }}</span>
            <span class="price-class">周末 {{ item.weekendPrice }}</span>
          </view>
        </van-card>
        <van-divider hairline />
      </block>
    </scroll-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryValue: "",
      games: [
        {
          name: "孽岛疑云",
          desc: "豪门本",
          weekdayPrice: 99,
          weekendPrice: 149,
          style: ["古装", "豪门"],
        },
        {
          name: "万事屋",
          desc: "xx",
          weekdayPrice: 99,
          weekendPrice: 149,
          style: ["日式", "情感"],
        },
      ],
      loading: false,
      finished: false,
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    scrollTop() {},
    toView() {},
  },
};
</script>

<style scoped>
.s-swiper {
  width: 100%;
  height: 160px;
  background: #8b9beb;
  border-radius: 4px;
}
.s-swiper .slide-image {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
.s-sc-content {
  display: flex;
}
.CustomerCell {
  margin-right: 24px;
}
.price-class {
  margin-right: 5px;
  font-weight: bold;
}
van-tag {
  margin-right: 5px;
}
</style>
