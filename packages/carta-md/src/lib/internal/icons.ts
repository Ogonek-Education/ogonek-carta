import type { InputEnhancer } from './input';
import type { IconProps } from '@ogonek-education/ogonek-m3';

export const materialIcons = [
	'strikethrough_s',
	'format_h1',
	'format_h2',
	'format_h3',
	'format_bold',
	'format_italic',
	'format_quote,',
	'link',
	'format_list_bulleted',
	'format_list_numbered'
];

/**
 * Editor toolbar icon information.
 */
export interface CartaIcon {
	/**
	 * The icon's unique identifier.
	 */
	readonly id: string;
	/**
	 * Callback function to execute when the icon is clicked.
	 * @param input InputEnhancer instance
	 */
	readonly action: (input: InputEnhancer) => void;
	readonly icon: IconProps;
	/**
	 * The icon label (used as aria-label).
	 */
	readonly label?: string;
}

export const defaultIcons = [
	{
		id: 'title',
		action: (input) => input.toggleLinePrefix('###'),
		icon: { name: 'format_h3' },
		label: 'Title'
	},
	{
		id: 'bold',
		action: (input) => input.toggleSelectionSurrounding('**'),
		icon: { name: 'format_bold' },
		label: 'Bold'
	},
	{
		id: 'italic',
		action: (input) => input.toggleSelectionSurrounding('*'),
		icon: { name: 'format_italic' },
		label: 'Italic'
	},
	{
		id: 'strikethrough',
		action: (input) => input.toggleSelectionSurrounding('~~'),
		icon: { name: 'strikethrough_s' },
		label: 'Strikethrough'
	},
	{
		id: 'quote',
		action: (input) => input.toggleLinePrefix('>'),
		icon: { name: 'format_quote' },
		label: 'Quote'
	},
	{
		id: 'link',
		action: (input) => {
			input.toggleSelectionSurrounding(['[', ']']);
			const position = input.getSelection().end + 1;
			input.insertAt(position, '(url)');
			input.textarea.setSelectionRange(position + 1, position + 4);
		},
		icon: { name: 'link' },
		label: 'Link'
	},
	{
		id: 'bulletedList',
		action: (input) => input.toggleLinePrefix('- ', 'detach'),
		icon: { name: 'format_list_bulleted' },
		label: 'Bulleted list'
	},
	{
		id: 'numberedList',
		action: (input) => input.toggleLinePrefix('1. ', 'detach'),
		icon: { name: 'format_list_numbered' },
		label: 'Numbered list'
	}
] as const satisfies readonly CartaIcon[];

export type DefaultIconId = (typeof defaultIcons)[number]['id'] | 'menu';
