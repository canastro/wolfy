import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './containers/app';
import Home from './containers/home/home';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
    </Route>
);
