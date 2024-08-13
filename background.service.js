/* eslint-disable eqeqeq */
/* eslint-disable strict */
/* eslint-disable no-undef */
"use strict";

function init(instance) {
    if (navigator.userAgent.indexOf("Win") != -1) {
        chrome.windows.create({ url: chrome.runtime.getURL('index.html?instance=' + instance), type: "popup", focused: true, state: 'maximized' }, function (res) { });
    } else {
        let width = 1280;
        let height = 800;
        chrome.windows.create({ url: chrome.runtime.getURL('index.html?instance=' + instance), type: "popup", focused: true, height, width }, function (res) { });
    }
}

chrome.action.onClicked.addListener((tab) => {
    (async () => {
        let sessionCookie = await getSessionId(tab);
        init(btoa(JSON.stringify(sessionCookie)));
    })();
});

function getSessionId(tab) {
    return new Promise((resolve, reject) => {
        const currentDomain = new URL(tab.url);
        const orderedDomains = ["salesforce.com", "salesforce-setup.com", "cloudforce.com", "salesforce.mil", "cloudforce.mil", "sfcrmproducts.cn"];

        chrome.cookies.get({ url: currentDomain.origin, name: "sid" }, cookie => {
            const [oid] = cookie.value.split("!");
            orderedDomains.forEach(currentDomain => {
                chrome.cookies.getAll({ name: "sid", domain: currentDomain.hostname, secure: true }, cookies => {
                    let sessionCookie = cookies.find(c => c.value.startsWith(oid + "!") && orderedDomains.some(dmn => c.domain.endsWith(dmn)));
                    if (sessionCookie) {
                        resolve({ oid, domain: sessionCookie.domain, sid: sessionCookie.value })
                    }
                });
            });

        });
    });
}

function getPageStateMatcher(urlContains) {
    return new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostSuffix: urlContains },
    });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.disable();
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        let domainRules = {
            conditions: [
                getPageStateMatcher('.salesforce.com'),
                getPageStateMatcher('.salesforce-setup.com'),
                getPageStateMatcher('.visual.force.com'),
                getPageStateMatcher('.vf.force.com'),
                getPageStateMatcher('.lightning.force.com'),
                getPageStateMatcher('.cloudforce.com'),
                getPageStateMatcher('.visualforce.com'),
                getPageStateMatcher('.sfcrmapps.cn'),
                getPageStateMatcher('.sfcrmproducts.cn'),
                getPageStateMatcher('.salesforce.mil'),
                getPageStateMatcher('.visual.force.mil'),
                getPageStateMatcher('.vf.force.mil'),
                getPageStateMatcher('.lightning.force.mil'),
                getPageStateMatcher('.cloudforce.mil'),
                getPageStateMatcher('.visualforce.mil'),
                getPageStateMatcher('.crmforce.mil')
            ],
            actions: [new chrome.declarativeContent.ShowAction()],
        };
        let rules = [domainRules];
        chrome.declarativeContent.onPageChanged.addRules(rules);
    });
});
