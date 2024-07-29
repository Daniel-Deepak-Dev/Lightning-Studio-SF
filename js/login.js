$(document).ready(function () {


    $("body").on("contextmenu", function () {
        return false;
    });

    $(document).keydown(function (event) {
        if ((event.ctrlKey && event.shiftKey && (event.which == 73 || event.key.toLowerCase() == 'i')) || (event.which == 123 || event.key == 'F12')) {
            event.preventDefault();
        }
    });

    function getOrgInfoAndBulidEditor(sid, url) {
        let conn = new jsforce.Connection({
            serverUrl: url,
            instanceUrl: url,
            sessionId: sid,
            version: '54.0',
        });

        conn.query("SELECT Id, Name, PrimaryContact FROM Organization LIMIT 1", function (err, result) {
            if (err) { return alert(err); }
            console.log("result", result);

            if (result.done && result.totalSize > 0) {
                let org = result.records[0];
                let session = { sid, url, id: org.Id, org: org.Name, user: org.PrimaryContact };
                let info = {}
                info[org.Id] = session;
                //Get & Set Storage
                chrome.storage.local.get("SalesforceLWCEditor", function (res) {
                    if (Object.keys(res).length === 0 && res.constructor === Object) {
                        chrome.storage.local.set({ SalesforceLWCEditor: JSON.stringify(info) }, function () { });
                    } else {
                        let organization = JSON.parse(res.SalesforceLWCEditor);
                        organization[org.Id] = session;
                        chrome.storage.local.set({ SalesforceLWCEditor: JSON.stringify(organization) }, function () { });
                    } let width = (window.screen && window.screen.width) ? window.screen.width : 1280;
                    let height = (window.screen && window.screen.height) ? window.screen.height : 800;
                    chrome.windows.create({ url: chrome.extension.getURL('index.html?orgId=' + org.Id), type: "popup", focused: true, height, width }, function (res) {
                        chrome.tabs.getCurrent(function (tab) {
                            chrome.tabs.remove(tab.id, function () { });
                        });
                    });
                }); //storage 
            }
        });
    }


    var selectedORG = null;
    $('.selection.dropdown').dropdown({
        values: [
            {
                name: 'Production',
                value: 'production',
                selected: true
            },
            {
                name: 'Sandbox',
                value: 'sandbox'
            },
            {
                name: 'Custom Domain',
                value: 'custom'
            },
            {
                name: 'Authorize org using Session Id',
                value: 'SessionId'
            }
        ],
        onChange: function (value, text, $selectedItem) {
            console.log(value);
            selectedORG = value;
            $('#button_name').html(`${(value != 'SessionId' ? 'Authenticate' : 'Process')}`);
            $('.custom_url').hide();
            $('.session_input').hide();
            if (value == 'custom') {
                $('.custom_url').show();
            } else if (value == 'SessionId') {
                $('.session_input').show();
            }
        },
        direction: 'upward'

    });

    $('#button_name').click(function () {
        let domainURL = null;
        if (selectedORG == 'custom') {
            domainURL = $('#custom_salesforce_domain').val();
            if (domainURL == '' || !domainURL) {
                return alert('Please enter a valid salesforce custom domain URL and domain must be salesforce classic domain.');
            }
        }

        if (selectedORG == 'SessionId') {
            let url = $('#salesforce_session_domain').val();
            let sid = $('#salesforce_session_id').val();
            if (url && sid) {
                getOrgInfoAndBulidEditor(sid, url);
            } else {
                return alert('Please enter a valid Salesforce Classic Domain and Session ID.');
            }
        } else {
            switch (selectedORG) {
                case 'custom':
                    domainURL = $('#custom_salesforce_domain').val();
                    break;
                case 'sandbox':
                    domainURL = 'https://test.salesforce.com';
                    break;
                default:
                    domainURL = 'https://login.salesforce.com';
                    break;
            }
            window.open(domainURL + '/services/oauth2/authorize?response_type=code&client_id=3MVG9YDQS5WtC11qRJv6ZxTRLGBVC825YxgFp9Di3X9uNIGA1V2xLQYYAj3cB77wAIoKJd9Iklvt0TQgrLBso&redirect_uri=https://dream-world-developer-edition.ap4.force.com/SalesforceLWCEditorCallback&state=chrome-extension://' + location.hostname + '/callback.html&&scope=openid&nonce=salesforcelwceditor', '_parent')

        }
    });
});
