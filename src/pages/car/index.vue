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
        v-for="(item, carIndexs) in cars"
        :index="carIndexs"
        :key="carIndexs"
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
            <span class="price-class">等 </span>
            <span class="price-class"> {{ item.waitMale }}男</span>
            <span class="price-class">{{ item.waitFemale }}女</span>
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
      cars: [
        {
          name: "孽岛疑云",
          desc: "2021.4.7 11:40",
          waitFemale: 0,
          waitMale: 2,
          style: ["小白", "换装"],
        },
        {
          name: "万事屋",
          desc: "2021.4.18 18:40",
          waitFemale: 3,
          waitMale: 1,
          style: ["老手", "勿反串"],
        },
        {
          name: "良辰吉日",
          desc: "2021.4.20 18:40",
          waitFemale: 3,
          waitMale: 3,
          style: ["情感", "小白"],
        },
        {
          name: "黑羊公馆",
          desc: "2021.4.24 18:40",
          waitFemale: 0,
          waitMale: 2,
          style: ["在线", "勿反串"],
        },
        {
          name: "木兮僧",
          desc: "2021.4.26 18:40",
          waitFemale: 2,
          waitMale: 2,
          style: ["CP", "女生"],
        },
        {
          name: "紫藤夫人",
          desc: "2021.4.28 18:40",
          waitFemale: 1,
          waitMale: 2,
          style: ["逻辑", "勿反串"],
        },
      ],
      loading: false,
      finished: false,
    };
  },
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
  margin-right: 2px;
  font-weight: bold;
}
van-tag {
  margin-right: 5px;
}
</style>
