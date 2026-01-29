<script lang="ts">
	import { MarkdownEditor } from '$lib';
	import { Carta } from '$lib/internal/carta';
	import ToggleTheme from './ToggleTheme.svelte';
	import sampleText from './sample.md?raw';
	import '$lib/default.css';

	const carta = new Carta();
</script>

<main class="">
	<ToggleTheme />
	<MarkdownEditor value={sampleText} placeholder="Some text..." mode="split" {carta} />
</main>
