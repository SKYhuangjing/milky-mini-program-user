<!--
 * @Author: Yin Xiang Zheng
 * @LastEditors: Yin Xiang Zheng
 * @LastEditTime: 2021-03-15 16:37:01
-->
<template>
	<div>
		<div class="icon-block" @click="$emit('clickHandle')">
			<img class="" :src="url" />
			<br />
			<span>{{ text }}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CustomerCell',
	props: {
		url: {
			default: 'black',
		},
		text: {
			default: 'circle',
		},
	},
	data() {
		return {
			a: 'asdasdasd',
		}
	},
	methods: {},
}
</script>

<style>
.icon-block {
	display: inline-block;
	min-width: 44px;
	text-align: center;
}
.icon-block img {
	width: 54rpx;
	height: 54rpx;
	display: inline-block;
}
.icon-block span {
	font-size: 12px;
	font-weight: 400;
	color: #333333;
}
</style>>
