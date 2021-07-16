export const config = {
    local: {},
    development: {},
    production: {}
};

export const GoPilotStyles = `
    .gh-portal-header-msg {
      text-align: center;
      max-width: 420px;
      margin:10px auto;
    }  
  `;

function setupGoPilotApi({siteUrl = process.env.REACT_APP_GOPILOT_API_SITE_URL}) {
    const apiPath = 'api/member-portal';

    function endpointFor({type, resource}) {
        if (type === 'members') {
            return `${siteUrl.replace(/\/$/, '')}/${apiPath}/${resource}/${window.SiteId}`;
        }
    }

    function makeRequest({url, method, headers = {}, credentials, body}) {
        const options = {
            method,
            headers,
            credentials,
            body
        };
        return fetch(url, options);
    }
    const api = {};

    api.settings = {
        read() {
            const url = endpointFor({type: 'members', resource: 'settings'});
            return makeRequest({
                url,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Failed to fetch settings data');
                }
            });
        }
    };

    api.init = async () => {
        const [{portalSettings}] = await Promise.all([
            api.settings.read()
        ]);
        //console.log(portalSettings);
        return {portalSettings};
    };

    return api;
}

export default setupGoPilotApi;
