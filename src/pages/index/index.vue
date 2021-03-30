<!--
 * @Author: Yin Xiang Zheng
 * @LastEditors: Yin Xiang Zheng
 * @LastEditTime: 2021-03-15 16:40:02
-->
<template>
  <div class="page">
    <span style="font-weight: bold">莫慌探谜推理剧社</span>
    <van-icon style="float: right" name="share-o" @click="onClick" />
    <van-share-sheet
      :show="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
      @close="onClose"
    />
    <swiper
      class="s-swiper"
      indicator-dots="true"
      autoplay="true"
      interval="5000"
      duration="1000"
    >
      <block v-for="(item, index) in movies" :index="index" :key="index">
        <swiper-item>
          <image :src="item.url" class="slide-image" mode="aspectFill" />
        </swiper-item>
      </block>
    </swiper>
    <van-notice-bar left-icon="volume-o" text="开发测试中, 请支持莫慌" />
    <div style="margin-top: 12px">
      <div class="s-card">
        <div class="sc-title">
          <div class="sc-title-text">当前热推</div>
        </div>
        <div class="sc-content s-sc-content">
          <div class="CustomerCell">
            <CustomerCell
              @clickHandle="scanQrCodeHandle"
              :text="'万事屋'"
              :url="'/static/tabs/logoBlack.png'"
            ></CustomerCell>
          </div>
          <div class="CustomerCell">
            <CustomerCell
              @clickHandle="publicAnnouncementHandle"
              :text="'黑羊公馆'"
              :url="'/static/tabs/logoBlack.png'"
            ></CustomerCell>
          </div>
          <div class="CustomerCell">
            <CustomerCell
              @clickHandle="publicAnnouncementHandle"
              :text="'蛊魂灵'"
              :url="'/static/tabs/logoBlack.png'"
            ></CustomerCell>
          </div>
        </div>
      </div>
      <div class="s-card">
        <div class="sc-title">
          <div class="sc-title-text">联系我们</div>
        </div>
        <van-cell-group>
          <van-cell
            title="微信号"
            icon="chat-o"
            value="18817577050"
            @click="onCopyClick('18817577050')"
          />
          <van-cell
            title="手机号"
            icon="phone-o"
            value="18817577050"
            @click="onCopyClick('18817577050')"
          />
          <van-cell
            title="地址"
            icon="location-o"
            value="怡景大厦西北门地下酒窖左侧"
            @click="onCopyClick('怡景大厦西北门地下酒窖左侧')"
          />
        </van-cell-group>
      </div>
    </div>
    <div>
      <map
        class="map"
        :markers="marker"
        :scale="scale"
        :latitude="latitude"
        :longitude="longitude"
      ></map>
    </div>
  </div>
</template>

<script>
import CustomerCell from "@/components/CustomerCell.vue";
export default {
  data() {
    return {
      marker: [
        {
          callout: {
            content: "莫慌探谜推理剧社",
            padding: 12,
            display: "ALWAYS",
            fontSize: 14,
            textAlign: "center",
            borderRadius: 5,
            borderWidth: 2,
            bgColor: "#ffffff",
          },
          latitude: 31.273092,
          longitude: 121.47798,
          width: 10,
          height: 18,
        },
      ],
      scale: 16,
      latitude: 31.273092,
      longitude: 121.47798,
      movies: [
        {
          url: "/static/images/demo1.jpeg",
        },
        {
          url: "/static/images/demo2.jpeg",
        },
      ],
      showShare: false,
      options: [
        { name: "微信", icon: "wechat", openType: "share" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
    };
  },
  components: { CustomerCell },
  created() {},
  mounted() {},
  methods: {
    onClick(event) {
      this.showShare = true;
    },

    onClose() {
      this.showShare = false;
    },
    onSelect(event) {
      Toast(event.detail.name);
      this.onClose();
    },
    onCopyClick(value) {
      mpvue.setClipboardData({
        data: value,
        success(res) {
          console.log(value);
        },
      });
    },
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
.map {
  width: auto;
  height: 200px;
}
</style>
