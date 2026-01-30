<script lang="ts">
	import type { Labels, Carta } from '$lib/internal';
	import { handleArrowKeysNavigation } from '$lib/internal';

	interface Props {
		carta: Carta;
		tab: 'write' | 'preview';
		labels: Labels;
	}

	let { carta, tab = $bindable(), labels }: Props = $props();

	let visibleIcons = $derived([...carta.icons]);
	let toolbarHeight = $state(0);
	let iconsHidden = $state(false);
	let showMenu = $state(false);
</script>

<div class="carta-toolbar" role="toolbar" bind:clientHeight={toolbarHeight}>
	<div class="carta-toolbar-left">
		<button
			type="button"
			tabindex={0}
			class={tab === 'write' ? 'carta-active' : ''}
			onclick={() => (tab = 'write')}
			onkeydown={handleArrowKeysNavigation}
		>
			{labels.writeTab}
		</button>
		<button
			type="button"
			tabindex={-1}
			class={tab === 'preview' ? 'carta-active' : ''}
			onclick={() => (tab = 'preview')}
			onkeydown={handleArrowKeysNavigation}
		>
			{labels.previewTab}
		</button>
	</div>

	<div class="carta-toolbar-right">
		{#if tab === 'write'}
			{#each visibleIcons as icon, index}
				{@const label = labels.iconsLabels[icon.id] ?? icon.label}
				<button
					class="carta-icon"
					tabindex={index == 0 ? 0 : -1}
					title={label}
					aria-label={label}
					onclick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						carta.input && icon.action(carta.input);
						carta.input?.update();
						carta.input?.textarea.focus();
					}}
					onkeydown={handleArrowKeysNavigation}
				>
					<icon.component />
				</button>
			{/each}
			{#if iconsHidden}
				{@const label = labels.iconsLabels['menu'] ?? 'Menu'}
				<button
					class="carta-icon"
					tabindex={-1}
					title={label}
					aria-label={label}
					onkeydown={handleArrowKeysNavigation}
					onclick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						showMenu = !showMenu;
					}}
				>
					menu icon
				</button>
			{/if}
		{/if}
	</div>
</div>

{#if showMenu && iconsHidden}
	<div class="carta-icons-menu" style="top: {toolbarHeight}px;">
		{#each carta.icons.filter((icon) => !visibleIcons.includes(icon)) as icon}
			{@const label = labels.iconsLabels[icon.id] ?? icon.label}

			<button
				class="carta-icon-full"
				aria-label={label}
				onclick={(e) => {
					e.stopPropagation();
					e.preventDefault();
					carta.input && icon.action(carta.input);
					carta.input?.update();
					carta.input?.textarea.focus();
					showMenu = false;
				}}
				onkeydown={handleArrowKeysNavigation}
			>
				<icon.component />
				<span>{label}</span>
			</button>
		{/each}
	</div>
{/if}
