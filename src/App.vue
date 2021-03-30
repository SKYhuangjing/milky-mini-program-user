<!--
 * @Author: Yin Xiang Zheng
 * @LastEditors: Yin Xiang Zheng
 * @LastEditTime: 2021-02-17 21:29:08
-->
<script>
export default {
	created() {
		// 调用API从本地缓存中获取数据
		/*
		 * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
		 * 微信：mpvue === wx, mpvuePlatform === 'wx'
		 * 头条：mpvue === tt, mpvuePlatform === 'tt'
		 * 百度：mpvue === swan, mpvuePlatform === 'swan'
		 * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
		 */

		let logs
		if (mpvuePlatform === 'my') {
			logs = mpvue.getStorageSync({ key: 'logs' }).data || []
			logs.unshift(Date.now())
			mpvue.setStorageSync({
				key: 'logs',
				data: logs,
			})
		} else {
			logs = mpvue.getStorageSync('logs') || []
			logs.unshift(Date.now())
			mpvue.setStorageSync('logs', logs)
		}
	},
	log() {
		console.log(`log at:${Date.now()}`)
	},
}
</script>

<style>
page {
	--button-border-radius: 10px;
	--button-default-color: #f2f3f5;
	--toast-max-width: 100px;
	--toast-background-color: pink;
	--button-primary-background-color: #2140d9;
}
.van-button--large {
	width: 100% !important;
}
.container {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 200rpx 0;
	box-sizing: border-box;
}
.page {
	padding: 16px;
}

.s-card {
	width: 100%;
	background: #ffffff;
	box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
	border-radius: 4px;
}

.s-card .sc-title {
	padding: 14px 12px;
	border-bottom: 1px solid #f5f5f5;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.sc-title-more {
	font-size: 14px;
	color: #999999;
	display: flex;
	align-items: center;
}

.sc-title-text {
	font-size: 17px;
	font-weight: 500;
	color: #333333;
}

.s-card .sc-content {
	padding: 16px 22px;
}

.s-title {
	font-size: 17px;
	font-weight: 500;
	color: #333333;
}

.s-tip-title {
	border-left: 3px solid #2140d9;
	font-size: 13px;
	color: #666666;
	padding-left: 8px;
}
</style>
