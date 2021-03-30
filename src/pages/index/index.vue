<!--
 * @Author: Yin Xiang Zheng
 * @LastEditors: Yin Xiang Zheng
 * @LastEditTime: 2021-03-15 16:40:02
-->
<template>
  <div class="page">
    ${店家名}
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

    <div style="margin-top: 12px">
      <div class="s-card">
        <div class="sc-title">
          <div class="sc-title-text">头条</div>
        </div>
        <div class="sc-content s-sc-content">
          <div class="CustomerCell">
            <CustomerCell
              @clickHandle="scanQrCodeHandle"
              :text="'扫一扫'"
              :url="'https://huhuiyun.oss-cn-shanghai.aliyuncs.com/static/%E6%89%AB%E4%B8%80%E6%89%AB.svg'"
            ></CustomerCell>
          </div>
          <div class="CustomerCell">
            <CustomerCell
              @clickHandle="publicAnnouncementHandle"
              :text="'公示公告'"
              :url="'https://huhuiyun.oss-cn-shanghai.aliyuncs.com/static/%E5%8A%A8%E6%80%81%E5%85%AC%E5%91%8A.svg'"
            ></CustomerCell>
          </div>
        </div>
      </div>

      <div class="s-card">
        <div class="sc-title">
          <div class="sc-title-text">当前热推</div>
        </div>
        <div class="sc-content s-sc-content">
          <div class="CustomerCell">
            <CustomerCell
              @clickHandle="scanQrCodeHandle"
              :text="'万事屋'"
              :url="'https://huhuiyun.oss-cn-shanghai.aliyuncs.com/static/%E7%A4%BE%E5%8C%BA%E7%AE%A1%E7%90%86.svg'"
            ></CustomerCell>
          </div>
          <div class="CustomerCell">
            <CustomerCell
              @clickHandle="publicAnnouncementHandle"
              :text="'黑羊公馆'"
              :url="'https://huhuiyun.oss-cn-shanghai.aliyuncs.com/static/%E5%A4%A7%E6%A5%BC%2C%E5%BB%BA%E7%AD%91.svg'"
            ></CustomerCell>
          </div>
          <div class="CustomerCell">
            <CustomerCell
              @clickHandle="publicAnnouncementHandle"
              :text="'蛊魂灵'"
              :url="'https://huhuiyun.oss-cn-shanghai.aliyuncs.com/static/%E5%A4%A7%E6%A5%BC%2C%E5%BB%BA%E7%AD%91.svg'"
            ></CustomerCell>
          </div>
        </div>
      </div>
    </div>
    <div>
      <map
        class="map"
        :markers="marker"
        :scale="scale"
        :latitude="latitude"
        :longitude="longitude"></map>
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
            content: "莫慌·探谜推理剧社",
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
          url:
            "https://huhuiyun.oss-cn-shanghai.aliyuncs.com/static/FoVjqPJ5uXGo16reLHPS9E5CUuci_FoVjqPJ5uXGo16reLHPS9E5CUuci_FoVjqPJ5uXGo16reLHPS9E5CUuci.jpeg",
        },
        {
          url:
            "https://huhuiyun.oss-cn-shanghai.aliyuncs.com/static/FoVjqPJ5uXGo16reLHPS9E5CUuci_FoVjqPJ5uXGo16reLHPS9E5CUuci_FoVjqPJ5uXGo16reLHPS9E5CUuci.jpeg",
        },
        {
          url:
            "https://huhuiyun.oss-cn-shanghai.aliyuncs.com/static/FoVjqPJ5uXGo16reLHPS9E5CUuci_FoVjqPJ5uXGo16reLHPS9E5CUuci_FoVjqPJ5uXGo16reLHPS9E5CUuci.jpeg",
        },
      ],
    };
  },
  components: { CustomerCell },
  created() {},
  mounted() {},
  methods: {
    scanQrCodeHandle() {
      // 只允许从相机扫码
      wx.scanCode({
        onlyFromCamera: true,
        success(res) {
          const { result } = res;
          try {
            const parsed = JSON.parse(result);
            const { flowId, currentNode, ownersGroup } = parsed;
            if (!flowId || !currentNode) {
              Notify({
                type: "warning",
                message: "错误的二维码类型！",
              });
              return;
            }
            let url = `/pages/relatedDocuments/main?flowId=${flowId}&currentNode=${currentNode}`;
            if (ownersGroup) {
              url = `/pages/relatedDocuments/main?flowId=${flowId}&currentNode=${currentNode}&ownersGroup=${ownersGroup}`;
            }
            mpvue.navigateTo({
              url,
            });
          } catch (error) {
            Notify({
              type: "warning",
              message: "错误的二维码类型！",
            });
          }
        },
        fail(err) {
          console.log("scanCode->err", err);
        },
      });
    },
    publicAnnouncementHandle() {
      mpvue.navigateTo({ url: "/pages/publicAnnouncement/main" });
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
