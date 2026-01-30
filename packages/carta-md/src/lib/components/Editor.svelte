<script lang="ts">
	import type { Carta } from '../internal/carta';
	import type { TextAreaProps } from '../internal/textarea-props';
	import { onMount } from 'svelte';
	import { defaultLabels, type Labels } from '../internal/labels';
	import Renderer from '../internal/components/Renderer.svelte';
	import Input from '../internal/components/Input.svelte';
	import Toolbar from '../internal/components/Toolbar.svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		carta: Carta;
		theme?: string;
		value?: string;
		disableToolbar?: boolean;
		placeholder?: string;
		selectedTab?: 'write' | 'preview';
		userLabels?: Partial<Labels>;
	} & HTMLAttributes<HTMLTextAreaElement>;

	let {
		carta,
		theme = 'default',
		value = $bindable(''),
		disableToolbar = false,
		placeholder = '',
		selectedTab = 'write',
		userLabels = {},
		...textAreaProps
	}: Props = $props();

	const labels = $derived({
		...defaultLabels,
		...userLabels
	});

	let editorElem: HTMLDivElement;
	let inputElem: HTMLDivElement | undefined = $state();
	let rendererElem: HTMLDivElement | undefined = $state();

	onMount(() => carta.$setElement(editorElem));
</script>

<div bind:this={editorElem} class="carta-editor carta-theme__{theme}">
	{#if !disableToolbar}
		<Toolbar {carta} {labels} bind:tab={selectedTab} />
	{/if}

	<div class="carta-wrapper">
		<div class="carta-container">
			<Input
				{carta}
				hidden={!(selectedTab == 'write')}
				bind:value
				bind:elem={inputElem}
				{...textAreaProps}
			></Input>
			<Renderer {carta} {value} hidden={!(selectedTab == 'preview')} bind:elem={rendererElem}
			></Renderer>
		</div>
	</div>
</div>
