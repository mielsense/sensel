import type { Action } from 'svelte/action';
import type { PixelateOptions } from './pixelate.js';

const defaultOptions: PixelateOptions = {
	id: 'pixelate-filter',
	size: 16,
	crossLayers: false,
};

const svgNS = 'http://www.w3.org/2000/svg';

function getFilterContent(options: PixelateOptions): string {
	const { id, size, crossLayers } = options;
	return `
    <defs>
      <filter id="${id}" x="0" y="0" width="1" height="1">
        <feConvolveMatrix kernelMatrix="1 1 1 1 1 1 1 1 1" result="AVG" />
        <feFlood x="1" y="1" width="1" height="1" />
        <feComposite operator="arithmetic" k1="0" k2="1" k3="0" k4="0" width="${size}" height="${size}" />
        <feTile result="TILE" />
        <feComposite in="AVG" in2="TILE" operator="in" k1="0" k2="1" k3="0" k4="0" />
        <feMorphology operator="dilate" radius="${size! / 2}" result="NORMAL" />
        ${
					crossLayers
						? `
          <feConvolveMatrix kernelMatrix="1 1 1 1 1 1 1 1 1" result="AVG" />
          <feFlood x="1" y="1" width="1" height="1" />
          <feComposite in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="0" k4="0" width="${size! / 2}" height="${size}" />
          <feTile result="TILE" />
          <feComposite in="AVG" in2="TILE" operator="in" k1="0" k2="1" k3="0" k4="0" />
          <feMorphology operator="dilate" radius="${size! / 2}" result="FALLBACKX" />
          <feConvolveMatrix kernelMatrix="1 1 1 1 1 1 1 1 1" result="AVG" />
          <feFlood x="1" y="1" width="1" height="1" />
          <feComposite in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="0" k4="0" width="${size}" height="${size! / 2}" />
          <feTile result="TILE" />
          <feComposite in="AVG" in2="TILE" operator="in" k1="0" k2="1" k3="0" k4="0" />
          <feMorphology operator="dilate" radius="${size! / 2}" result="FALLBACKY" />
          <feMerge>
            <feMergeNode in="FALLBACKX" />
            <feMergeNode in="FALLBACKY" />
            <feMergeNode in="NORMAL" />
          </feMerge>
          `
						: `<feMergeNode in="NORMAL" />`
				}
      </filter>
    </defs>
  `;
}

function createFilter(options: PixelateOptions): void {
	if (!document.getElementById(options.id!)) {
		const svg = document.createElementNS(svgNS, 'svg');
		svg.style.position = 'absolute';
		svg.style.width = '0';
		svg.style.height = '0';
		svg.style.overflow = 'visible';
		svg.innerHTML = getFilterContent(options);
		document.body.appendChild(svg);
	}
}

function updateFilter(options: PixelateOptions): void {
	const filterEl = document.getElementById(options.id!);
	if (filterEl) {
		filterEl.innerHTML = `
      <feConvolveMatrix kernelMatrix="1 1 1 1 1 1 1 1 1" result="AVG" />
      <feFlood x="1" y="1" width="1" height="1" />
      <feComposite operator="arithmetic" k1="0" k2="1" k3="0" k4="0" width="${options.size}" height="${options.size}" />
      <feTile result="TILE" />
      <feComposite in="AVG" in2="TILE" operator="in" k1="0" k2="1" k3="0" k4="0" />
      <feMorphology operator="dilate" radius="${options.size! / 2}" result="NORMAL" />
      ${
				options.crossLayers
					? `
        <feConvolveMatrix kernelMatrix="1 1 1 1 1 1 1 1 1" result="AVG" />
        <feFlood x="1" y="1" width="1" height="1" />
        <feComposite in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="0" k4="0" width="${options.size! / 2}" height="${options.size}" />
        <feTile result="TILE" />
        <feComposite in="AVG" in2="TILE" operator="in" k1="0" k2="1" k3="0" k4="0" />
        <feMorphology operator="dilate" radius="${options.size! / 2}" result="FALLBACKX" />
        <feConvolveMatrix kernelMatrix="1 1 1 1 1 1 1 1 1" result="AVG" />
        <feFlood x="1" y="1" width="1" height="1" />
        <feComposite in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="0" k4="0" width="${options.size}" height="${options.size! / 2}" />
        <feTile result="TILE" />
        <feComposite in="AVG" in2="TILE" operator="in" k1="0" k2="1" k3="0" k4="0" />
        <feMorphology operator="dilate" radius="${options.size! / 2}" result="FALLBACKY" />
        <feMerge>
          <feMergeNode in="FALLBACKX" />
          <feMergeNode in="FALLBACKY" />
          <feMergeNode in="NORMAL" />
        </feMerge>
        `
					: `<feMergeNode in="NORMAL" />`
			}
    `;
	}
}

export const pixelate: Action<HTMLElement, PixelateOptions | undefined> = (
	node: HTMLElement,
	options: PixelateOptions = {}
) => {
	let currentOptions: PixelateOptions = { ...defaultOptions, ...options };

	// Create the filter if needed and apply it.
	createFilter(currentOptions);
	node.style.filter = `url(#${currentOptions.id})`;

	return {
		update(newOptions: PixelateOptions = {}) {
			currentOptions = { ...currentOptions, ...newOptions };
			node.style.filter = `url(#${currentOptions.id})`;
			updateFilter(currentOptions);
		},
		destroy() {},
	};
};
