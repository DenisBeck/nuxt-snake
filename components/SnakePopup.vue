<script setup>
const emit = defineEmits(['popupClose'])
</script>

<template>
    <div id="popup" aria-hidden="true" class="popup-overlay">
		<div class="popup-wrapper">
			<div class="popup-content">
				<slot />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.popup-wrapper {
	min-height: 100%;
	flex: 1 1 auto;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-inline: 10px;
}

.popup-overlay .popup-content {
	visibility: visible;
	transform: scale(1);
}
.popup-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	visibility: hidden;
	gap: 30px;
	transform: scale(0);
	transition: transform 0.3s ease 0s;
	background-color: #eee;
	padding: 20px;
	width: fit-content;
	max-width: 900px;
	border-radius: 20px;
}

</style>