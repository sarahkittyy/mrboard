<template>
<div>
	<h1>404</h1>
</div>
</template>

<script>
export default {
	name: 'Page404',
	mounted() {
		document.title = "404 - Page not found.";
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>