import React from 'react'
import $ from 'jquery'
import {Motion, spring} from 'react-motion'

import {ZContextLayer} from '../zContext'
import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ChildComponentsMixin from '../utils/childComponentsMixin'
import Animation from '../animation'
import {slide, scale, fade} from '../animation/functions'

@mixin(StylesMixin, ChildComponentsMixin)
export default class SideNav extends React.Component {
	static displayName = 'SideNav'

	static propTypes = {
		/** Controls whether SideNav is opened or not. */
		open: React.PropTypes.bool,

		/**
		 * Function that is called when SideNav requests close after clicking outside
		 * or pressing `Esc` key.
		 */
		onClose: React.PropTypes.bool,

		closeOnEsc: React.PropTypes.bool,

		closeOnClickOutside: React.PropTypes.bool,

		/** Width of the SideNav (value of the CSS-property width). */
		width: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),

		/**
		 * Type of opening and closing animation.
		 * Possible values: 'fade', 'slide', or false for no animation.
		 */
		animation: React.PropTypes.oneOf(['fade', 'slide'])
	}

	static defaultProps = {
		closeOnClickOutside: true,
		closeOnEsc: true,
		animation: 'fade',
		width: 280
	}

	static styles = (props) => {
		let root = {
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			willChange: 'opacity'
		}

		let sideNav = {
			position: 'fixed',
			top: 0,
			left: 0,
			width: props.width,
			height: '100%',
			willChange: 'left',
			boxSizing: 'border-box'
		}

		return {root, sideNav}
	}

	static childComponents = {
		animation: (props) => {
			if (props.animation === 'slide') {
				return React.createElement(Animation, {
					fn: slide,
					params: {side: 'right', distance: 100, unit: '%'}
				})
			}
		}
	}

	componentDidMount() {
		if (this.props.open) this.open()
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.open && nextProps.open) this.open()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.open && !this.props.open) this.close()
	}

	componentWillUnmount() {
		this.close()
	}

	render() {
		let sideNav = React.cloneElement(this.renderSideNav(), {
			ref: (ref) => { this.sideNavRef = ref }
		})

		let root = React.DOM.div({
			style: this.styles.root,
			onClick: this.onClick.bind(this),
			ref: (ref) => { this.rootElemRef = ref }
		}, sideNav)

		let layer = React.createElement(ZContextLayer, {
			type: 'modal',
			closeOnEsc: this.props.closeOnEsc,
			open: this.props.open,
			onClose: this.onClose.bind(this)
			// onRender: this.onRender.bind(this)
		}, root)
		
		if (this.props.animation) {
			let motion = React.createElement(Motion, {
				defaultStyle: {progress: 0},
				style: {
					progress: spring(this.props.open ? 1 : 0, {stiffness: 320, damping: 30})
				},
				onRest: () => {
					// end close animation
					if (!this.props.open) this.setState({showLayer: false})
				}
			}, (value) => {
				let isClosing = !this.props.open && value.progress !== 0

				let sideNavAnimation = this.props.animation === 'fade' ?
					sideNav :
					React.cloneElement(
						this.getChildComponent('animation'),
						{progress: value.progress},
						sideNav
					)

				return React.createElement(
					Animation,
					{fn: fade, progress: value.progress},
					React.cloneElement(root, null, sideNavAnimation)
				)
			})

			return React.cloneElement(layer, {
				open: this.state.showLayer
			}, motion)
		} else {
			return layer
		}
	}

	renderSideNav() {
		return React.DOM.div({
			style: this.styles.sideNav,
			ref: (ref) => { this.rootElemRef = ref }
		}, this.props.children)
	}

	onClick(event) {
		if (this.props.closeOnClickOutside) {
			if (event.target === this.rootElemRef) this.onClose()
		}
	}

	onClose() {
		if (this.props.onClose) this.props.onClose()
	}

	open() {
		this.setState({showLayer: true})
		$('body').css({overflow: 'hidden'})
	}

	close() {
		$('body').css({overflow: ''})
	}
}
