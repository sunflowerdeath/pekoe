import React from 'react'

import BaseMenu from 'clear-ui-base/lib/menu'
import transferProps from 'clear-ui-base/lib/utils/transferProps'
import MenuItem from './item'
import MenuLabel from './label'

const TRANSFERED_PROPS = ['indent', 'height', 'padding', 'multiline']

class Menu extends BaseMenu {
	static defaultProps = {
		itemType: MenuItem
	}

	render() {
		let container = super.container()

		let content = React.Children.Map(container.props.children, (elem) => {
			if (elem.type === Label || elem.type === Item) {
				return transferProps(this, elem, TRANSFERED_PROPS)
			} else {
				return elem
			}
		})

		return React.cloneElement(container, null, content)
	}
}

export default Menu
export {MenuItem, MenuLabel}
