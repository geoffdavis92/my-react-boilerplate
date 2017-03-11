// core @flow
import React, { Component } from 'react'
import { render } from 'react-dom'

import {
	Router,
	Route,
	IndexRoute,
	browserHistory
} from 'react-router'

import AppWrapper from './AppWrapper'
import Home from './views/Home'

render((
	<Router history={browserHistory}>
		<Route path="/" component={AppWrapper}>
			<IndexRoute component={Home}/>
		</Route>
	</Router>
),document.getElementById('root'))