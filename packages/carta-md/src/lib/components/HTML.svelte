<!--
  @component
  A basic component to render pre-rendered HTML content with a specific theme.
-->

<script lang="ts">
	let { html }: { html: string } = $props();
</script>

<div class="prose">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html html}
</div>
