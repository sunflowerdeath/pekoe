import React from 'react'
import $ from 'jquery'

import {Snackbar, SnackbarContainer} from 'clear-ui-material/lib/snackbar'
import {Toast, ToastContainer} from 'clear-ui-material/lib/toast'
import RaisedButton from 'clear-ui-material/lib/button/raisedButton'

import DocPage from '../../../../docPage'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'
import Example from '../../../../example'
import PropsDoc from '../../../../propsDoc'

import materialDocs from '../../../../../docgen/material.json'
let toastPropsDoc = materialDocs['toast/toast.js'].props

import NotificationDemo from '../../../../demos/notificationDemo'

class ToastDemo extends NotificationDemo {
	static defaultProps = {
		buttonText: 'Show toast',
		children: 'Toast text'
	}

	static childComponents = {
		button: <RaisedButton/>,
		notification: <Toast/>,
	}
}

class SnackbarDemo extends NotificationDemo {
	static defaultProps = {
		buttonText: 'Show snackbar',
		children: 'Snackbar text'
	}

	static childComponents = {
		button: <RaisedButton/>,
		notification: <Snackbar/>,
	}
}

export default class SnackbarDoc extends React.Component {
	render() {
		let snackbarContainer = $.Deferred()
		let toastContainer = $.Deferred()
		let leftBottomContainer = $.Deferred()

		return <DocPage>
			<h1>Material<DocPage.ArrowIcon/>Snackbar & Toast</h1>

			<SnackbarContainer ref={(ref) => { snackbarContainer.resolve(ref) }}/>
			<ToastContainer ref={(ref) => { toastContainer.resolve(ref) }}/>

			{`
			Snackbars provide lightweight feedback about an operation by showing
			a brief message at the bottom of the screen. Snackbars can contain an action.
			`}

			<a
				href='https://www.google.com/design/spec/components/snackbars-toasts.html'
				target='blank'
			>
				Snackbar and toast specification
			</a>

			<h2>Toast</h2>

			<Example>
				<Example.Demo>
					<ToastDemo container={toastContainer}/>
				</Example.Demo>
				<Example.Code lang='js'>{`
					import {Toast, ToastContainer} from 'clear-ui-material/lib/toast'
					let toastContainer = $.Deferred()

					<ToastContainer ref={(ref) => { toastContainer.resolve(ref) }}/>
					<Button onTap={() => { this.setState({open: true}) }}>Show toast</Button>
					<Toast
						container={toastContainer}
						open={this.state.open}
						onClose={() => { this.setState({open: false}) }}
					>
						Toast text
					</Toast>
				`}</Example.Code>
			</Example>

			{`
			Snackbars and toasts require creating special containers.
			You can read more about containers on the page
			[Base > Notifications](#/docs/base/notifications).
			`}

			<h3>Action and close button</h3>

			<Example>
				<Example.Demo>
					<ToastDemo container={toastContainer}
						action='Action'
						onActionTap={() => { console.log('tap') }}
						showCloseButton={true}
						buttonText={'Toast with buttons'}
					>
						Toast with action and close button
					</ToastDemo>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Toast
						...
						action='Action'
						onActionTap={() => { ... }}
						showCloseButton={true}
					>
						Toast with action and close button
					</Toast>
				`}</Example.Code>
			</Example>

			<h2>Snackbar</h2>

			{`
			Snackbar appears at the bottom center of the screen,
			and is a bit wider than a toast.
			`}

			<Example>
				<Example.Demo>
					<SnackbarDemo container={snackbarContainer}/>
				</Example.Demo>
				<Example.Code lang='js'>{`
					import {Snackbar, SnackbarContainer} from 'clear-ui-material/lib/snackbar'
					let snackbarContainer = $.Deferred()

					<SnackbarContainer ref={(ref) => { snackbarContainer.resolve(ref) }}/>
					<Button onTap={() => { this.setState({open: true}) }}>Show snackbar</Button>
					<Snackbar
						container={snackbarContainer}
						open={this.state.open}
						onClose={() => { this.setState({open: false}) }}
					>
						Snackbar text
					</Snackbar>
				`}</Example.Code>
			</Example>

			{`
			As a toast, snackbar also can have action and close button.
			`}

			<Example>
				<Example.Demo>
					<SnackbarDemo container={snackbarContainer}
						action='test'
						onActionTap={() => { console.log('tap') }}
						showCloseButton={true}
						buttonText={'Snackbar with buttons'}
					>
						Snackbar with close button and action
					</SnackbarDemo>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Snackbar
						...
						action='test'
						onActionTap={() => { ... }}
						showCloseButton={true}
					>
						Snackbar with close button and action
					</Snackbar>
				`}</Example.Code>
			</Example>

			<h3>Multiline snackbar</h3>

			{`When snackbar has more than one line of text, it should have bigger paddings`}

			<Example>
				<Example.Demo>
					<SnackbarDemo container={snackbarContainer} multiline={true}
						buttonText='Multiline snackbar'>
						Snackbars provide lightweight feedback about an operation
						by showing a brief message at the bottom of the screen.
						Snackbars can contain an action.
					</SnackbarDemo>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Snackbar multiline={true} ...>
						...
					</Snackbar>
				`}</Example.Code>
			</Example>

			<h3>Mobile snackbar</h3>

			{`On the mobile platform snackbar takes up full width of the screen.`}

			<Example>
				<Example.Demo>
					<SnackbarDemo container={snackbarContainer} mobile={true}
						buttonText='Mobile snackbar'>
						Mobile snackbar
					</SnackbarDemo>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Snackbar mobile={true} ...>Mobile snackbar</Snackbar>
				`}</Example.Code>
			</Example>

			<h2>Toast API</h2>

			{`
			Extends
			<a href='#/docs/base/notification'>Base > Notification</a>
			`}

			<h3>Props</h3>
			<PropsDoc doc={toastPropsDoc}/>

			<h2>ToastContainer API</h2>

			{`
			Extends
			<a href='#/docs/base/notification'>
				Base > Notification > SingleNotificationContainer
			</a>
			`}

			<h2>Snackbar API</h2>

			{`
			Extends
			<a href='#/docs/material/snackbar'>Material > Toast</a>
			`}

			<h3>Props</h3>
			<ApiDoc>
				<ApiDocRow name='mobile' type='boolean'>{`
					Variation of the snackbar for the mobile platform that
					takes up full width of the screen.
				`}</ApiDocRow>
			</ApiDoc>

			<h2>SnackbarContainer API</h2>

			{`
			Extends
			<a href='#/docs/base/notification'>
				Base > Notification > SingleNotificationContainer
			</a>
			`}
		</DocPage>
	}
}
