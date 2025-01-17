import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const ROOT_DIV_ID = 'ghost-portal-root';

function addRootDiv() {
    const elem = document.createElement('div');
    elem.id = ROOT_DIV_ID;
    document.body.appendChild(elem);
}

function getSiteUrl() {
    /**
     * @type {HTMLElement}
     */
    const scriptTag = document.querySelector('script[data-ghost]');
    if (scriptTag) {
        return scriptTag.dataset.ghost;
    }
    return '';
}

function handleTokenUrl() {
    const url = new URL(window.location.href);
    if (url.searchParams.get('token')) {
        url.searchParams.delete('token');
        window.history.replaceState({}, document.title, url.href);
    }
}

function setup() {
    addRootDiv();
    handleTokenUrl();
}

function init() {
    let customSiteUrl = getSiteUrl();
    //customSiteUrl = 'https://dev.gopilot.net/blog/';
    const siteUrl = customSiteUrl || window.location.origin;
    //console.log(siteUrl);
    //const siteUrl = 'https://dev.gopilot.net/blog';
    setup();
    ReactDOM.render(
        <React.StrictMode>
            <App siteUrl={siteUrl} customSiteUrl={customSiteUrl} />
        </React.StrictMode>,
        document.getElementById(ROOT_DIV_ID)
    );
}

init();
