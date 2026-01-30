<script lang="ts">
	import { Editor } from '$lib/components';
	import { Carta } from '$lib/internal/carta';
	import ToggleTheme from './ToggleTheme.svelte';
	import sampleText from './sample.md?raw';
	import '$lib/default.css';

	const carta = new Carta();
</script>

<main class="">
	<ToggleTheme />
	<Editor value={sampleText} placeholder="Some text..." {carta} />
</main>
