<!--
 * @Author: Yin Xiang Zheng
 * @LastEditors: Yin Xiang Zheng
 * @LastEditTime: 2021-03-15 16:40:02
-->
<template>
  <div class="page">
    首页 TODO
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
</style>
