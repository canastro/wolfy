import React from 'react';

import '!style!css!sass!./about.scss';

export default () => (
    <div className="about-container">
        <div className="about-content-container goal-container">
            <h2>Goal</h2>
            <div className="about-content">
                <img
                    className="poster-image"
                    src="/assets/images/poster.png"
                    alt="Poster"
                />
                <p>
                    This is a project built for academic reasons only, and its my
                    attempt to gather multiple sources of knowledge and make wiser
                    decisions on when to buy/sell securities.
                </p>
            </div>
        </div>

        <div className="about-content-container how-works-container">
            <h2>How it works?</h2>
            <p>At the moment this project collects the following information:</p>

            <ul>
                <li>Articles from bloomberg, cnbc, reuters, seeking-alpha, wcj and yahoo</li>
                <li>Tweets</li>
                <li>Ratings</li>
                <li>Prices</li>
            </ul>

            <p>This data is processed in the following ways:</p>

            <ul>
                <li>
                    <strong>Sentiment analysis: </strong>
                    <span>
                        From the articles and tweets is extracted the sentiment.
                        The sentiment of a tweet also reflects the number of followers
                        and the number of favorites (the ratio that this impacts the
                        sentiment still needs some testing to reach more realistic values).
                    </span>
                </li>
                <li>
                    <strong>Technical Analysis: </strong>
                    <span>
                        From the price variations the engine will look for known
                        patterns to trigger alerts of possible changes (WORK IN PROGRESS)
                    </span>
                </li>
                <li>
                    <strong>Neural Network: </strong>
                    <span>
                        Taking advantage of the massive amount of available data,
                        a neural network is fed with prices and it will try to learn to
                        predict how normally price oscillations occur.
                    </span>
                </li>
            </ul>

        </div>

        <div className="about-content-container architecture-container">
            <h2>Architecture</h2>

            <img
                className="architecture-image"
                src="/assets/images/architecture.png"
                alt="Architecture"
            />

            <p>This project is modular and is composed by the following modules:</p>

            <ul>
                <li>
                    <a href="https://github.com/canastro/wolfy-models">wolfy-models: </a>
                    <span>Models used by all of the other modules</span>
                </li>
                <li>
                    <a href="https://github.com/canastro/wolfy-engine">wolfy-engine: </a>
                    <span>
                        Engine that fetches for prices, articles, tweets, ratings
                        and produces reports on these. It also sends a message ZMQ
                        when a new price is fetched
                    </span>
                </li>
                <li>
                    <a href="https://github.com/canastro/wolfy-brain">wolfy-brain: </a>
                    <span>Neural Network that decides if a security should sold or bought</span>
                </li>
                <li>
                    <a href="https://github.com/canastro/wolfy-api">wolfy-api: </a>
                    <span>API built with GraphQL</span>
                </li>
                <li>
                    <a href="https://github.com/canastro/wolfy-inspector">wolfy-inspector: </a>
                    <span>Frontend application with react & redux</span>
                </li>
            </ul>
        </div>

        <div className="about-content-container technology-container">
            <h2>Technology</h2>
            <ul>
                <li>
                    <strong>cheerio: </strong>
                    <span>Used for webscraping</span>
                </li>
                <li>
                    <strong>commander: </strong>
                    <span>Command-line interfaces</span>
                </li>
                <li>
                    <strong>graphql: </strong>
                    <span>
                        GraphQL is a query language which provides a common interface
                        between the client and the server for data fetching and manipulations
                    </span>
                </li>
                <li>
                    <strong>mongodb: </strong>
                    <span>Free and open-source cross-platform nosql database</span>
                </li>
                <li>
                    <strong>nginx: </strong>
                    <span>
                        HTTP and reverse proxy server, a mail proxy server,
                        and a generic TCP/UDP proxy server
                    </span>
                </li>
                <li>
                    <strong>node-schedule: </strong>
                    <span>Job scheduler with DSL similar to unix cronjob</span>
                </li>
                <li>
                    <strong>nodemailer: </strong>
                    <span>To send out emails with the daily reports</span>
                </li>
                <li>
                    <strong>pm2: </strong>
                    <span>
                        Production process manager for Node.js apps
                        with a built-in load balancer
                    </span>
                </li>
                <li>
                    <strong>sentiment: </strong>
                    <span>AFINN-based sentiment analysis library</span>
                </li>
                <li>
                    <strong>shipit: </strong>
                    <span>Universal automation and deployment tool written in JavaScript.</span>
                </li>
                <li>
                    <strong>synaptic: </strong>
                    <span>Architecture-free neural network library</span>
                </li>
                <li>
                    <strong>twit: </strong>
                    <span>Use twitter API</span>
                </li>
                <li>
                    <strong>winston: </strong>
                    <span>Logging</span>
                </li>
                <li>
                    <strong>zmq: </strong>
                    <span>ZeroMQ, a queue library</span>
                </li>
            </ul>
        </div>
    </div>
);
