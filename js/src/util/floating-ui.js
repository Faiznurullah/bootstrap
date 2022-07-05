// import {computePosition, flip, shift} from '@floating-ui/dom'
//
//
import { computePosition } from '@floating-ui/dom'
import { getElement, isElement } from './index'
import Manipulator from '../dom/manipulator'

class FloatingUi {
  constructor(element) {
    if (typeof computePosition === 'undefined') {
      throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)')
    }

    this._element = element
  }

  calculate(reference, tooltip, config, extraCss = {}) {
    computePosition(reference, tooltip, config)
      .then(({ x, y, placement, middlewareData }) => {
        const positionCss = {
          left: `${x}px`,
          top: `${y}px`
        }
        console.log(placement, middlewareData) // eslint-disable-line no-console
        Manipulator.setDataAttribute(tooltip, 'placement', placement)
        Object.assign(tooltip.style, { ...positionCss, ...extraCss })
        if (middlewareData.arrow) {
          // Object.assign(arrow.style, {
          //   left: `${x}px`,
          //   top: `${y}px`
          // })
          console.log(middlewareData.arrow) // eslint-disable-line no-console
        }
      })
  }

  getReferenceElement(reference, parent, PluginName) {
    if (reference === 'parent') {
      return parent
    }

    if (isElement(reference)) {
      return getElement(reference)
    }

    if (typeof reference === 'object') {
      if (typeof reference.getBoundingClientRect !== 'function') {
        throw new TypeError(`${PluginName.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`)
      }

      return reference
    }

    return this._element
  }

  getOffset(value) {
    console.log(value) // eslint-disable-line no-console
    if (typeof value === 'function') {
      return popperData => value(popperData, this._element)
    }

    if (typeof value === 'string') {
      console.log('offset', value) // eslint-disable-line no-console
      value = [
        Number.parseInt(value.split(',')[0], 10),
        Number.parseInt(value.split(',')[1] || 0, 10)
      ]
    }

    if (Array.isArray(value)) {
      return {
        mainAxis: Number.parseInt(value.split(',')[0], 10),
        alignmentAxis: Number.parseInt(value.split(',')[1] || 0, 10)
      }
    }

    return value
  }
}

export default FloatingUi
