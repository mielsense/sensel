import type { Action } from 'svelte/action';
import type { GrainedOptions } from './grained.js';

const grained = (function () {
  function grained(ele: HTMLElement | string, opt: any) {
    let element = null,
      elementId = null,
      selectorElement = null;

    if (typeof ele === 'string') {
      element = document.getElementById(ele.split('#')[1]);
    } else if (typeof ele === 'object') {
      element = ele;
    }

    if (!element) {
      console.error('Grained: cannot find the element with id ' + ele);
      return;
    } else {
      elementId = element.id;
    }

    if (element.style.position !== 'absolute') {
      element.style.position = 'relative';
    }

    const prefixes = ['', '-moz-', '-o-animation-', '-webkit-', '-ms-'];

    const options = {
      animate: true,
      patternWidth: 100,
      patternHeight: 100,
      grainOpacity: 0.1,
      grainDensity: 1,
      grainWidth: 1,
      grainHeight: 1,
      grainChaos: 0.5,
      grainSpeed: 20,
      ...opt,
    };

    const generateNoise = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = options.patternWidth;
      canvas.height = options.patternHeight;
      for (
        let w = 0;
        w < options.patternWidth;
        w += options.grainDensity
      ) {
        for (
          let h = 0;
          h < options.patternHeight;
          h += options.grainDensity
        ) {
          const rgb = (Math.random() * 256) | 0;
          ctx.fillStyle =
            'rgba(' + [rgb, rgb, rgb, options.grainOpacity].join() + ')';
          ctx.fillRect(w, h, options.grainWidth, options.grainHeight);
        }
      }
      return canvas.toDataURL('image/png');
    };

    function addCSSRule(
      sheet: CSSStyleSheet,
      selector: string,
      rules: string,
      index?: number,
    ) {
      const ins = selector.length ? `${selector}{${rules}}` : rules;
      if ('insertRule' in sheet) {
        sheet.insertRule(ins, index || 0);
      } else if ('addRule' in sheet) {
        sheet.addRule(selector, rules, index || 0);
      }
    }

    const noise = generateNoise();

    let animation = '';
    const keyFrames = [
      '0%:-10%,10%',
      '10%:-25%,0%',
      '20%:-30%,10%',
      '30%:-30%,30%',
      '40%::-20%,20%',
      '50%:-15%,10%',
      '60%:-20%,20%',
      '70%:-5%,20%',
      '80%:-25%,5%',
      '90%:-30%,25%',
      '100%:-10%,10%',
    ];

    let pre = prefixes.length;
    while (pre--) {
      animation += '@' + prefixes[pre] + 'keyframes grained{';
      for (const keyFrame of keyFrames) {
        const keyVal = keyFrame.split(':');
        animation += keyVal[0] + '{';
        animation +=
          prefixes[pre] + 'transform:translate(' + keyVal[1] + ');';
        animation += '}';
      }
      animation += '}';
    }

    let animationAdded = document.getElementById('grained-animation');
    if (animationAdded) {
      animationAdded.parentElement?.removeChild(animationAdded);
    }
    let style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'grained-animation';
    style.innerHTML = animation;
    document.body.appendChild(style);

    let styleAdded = document.getElementById(
      'grained-animation-' + elementId,
    );
    if (styleAdded) {
      styleAdded.parentElement?.removeChild(styleAdded);
    }

    style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'grained-animation-' + elementId;
    document.body.appendChild(style);

    let rule = 'background-image: url(' + noise + ');';
    rule +=
      'position: fixed;content: "";height: 300%;width: 300%;left: -100%;top: -100%;';
    rule += 'pointer-events: none;z-index: -1;';

    pre = prefixes.length;
    if (options.animate) {
      while (pre--) {
        rule += prefixes[pre] + 'animation-name:grained;';
        rule += prefixes[pre] + 'animation-iteration-count: infinite;';
        rule +=
          prefixes[pre] +
          'animation-duration: ' +
          options.grainChaos +
          's;';
        rule +=
          prefixes[pre] +
          'animation-timing-function: steps(' +
          options.grainSpeed +
          ', end);';
      }
    }

    selectorElement = '#' + elementId + '::before';
    addCSSRule(style.sheet!, selectorElement, rule);
  }

  return grained;
})();

export const grainedAction: Action<HTMLElement, GrainedOptions | undefined> = (
  node: HTMLElement,
  options: GrainedOptions = {},
) => {
  if (!node.id) {
    node.id = 'grained-' + Math.random().toString(36).substr(2, 9);
  }

  // Initialize grained
  grained(node, options);

    return {
        destroy() {
            // Cleanup
            const styleElement = document.getElementById(
                'grained-animation-' + node.id,
            );
            if (styleElement) {
                styleElement.parentElement?.removeChild(styleElement);
            }
        },
        update(newOptions: GrainedOptions = {}) {
            grained(node, newOptions);
        }
    }
}
