import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './containers/app';
import HomeContainer from './containers/home/home';
import StockContainer from './containers/stock';
import TweetContainer from './containers/tweet';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomeContainer} />
        <Route path="/stock/:symbol" component={StockContainer} />
        <Route path="/stock/:symbol/tweets" component={TweetContainer} />
    </Route>
);
