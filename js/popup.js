var app = angular.module('myApp', ["chromeForce"]);
app.controller('myCtrl', function ($scope, $http, $q, $interval, chromeService) {


    $scope.conn;
    $scope.organization;
    $scope.codeEditor;
    $scope.lightningWebComponents;
    $scope.apexClasses = [];
    $scope.lightningMessageChannels = [];


    $scope.salesforceAPIVersion = "57.0";


    $scope.formatMapping = { 'xml': 'xml', 'svg': 'xml', 'html': 'html', 'js': 'javascript', 'json': 'json', 'css': 'css', 'apex': 'apex' };
    $scope.tabList = [];
    $scope.sourceCodeHolder = {};
    $scope.lastUpdatedSourceCodeHolder = {};
    $scope.data = {};
    $scope.trackComponentChanges = {};
    $scope.loader = false;

    $scope.messages = null;

    $scope.pathFolderName = null;
    $scope.pathFileName = null;

    $scope.isWordWrap = false;

    $scope.session = '';

    $scope.codeGraphQLEditor = null;
    $scope.codeGraphQLOutputEditor = null;
    $scope.codeGraphQLVariableEditor = null;
    $scope.jsonFormatterEditor = null;
    $scope.diffCheckerEditor = null;



    function init() {

        chrome.storage.local.get("SalesforceLWCEditor", function (res) {
            let orgId = window.location.search.split('orgId=')[1];
            let allOrganizationInfo = JSON.parse(res.SalesforceLWCEditor) || {};
            $scope.organization = allOrganizationInfo[orgId];

            $scope.conn = new jsforce.Connection({
                serverUrl: $scope.organization.url,
                instanceUrl: $scope.organization.url,
                sessionId: $scope.organization.sid,
                version: $scope.salesforceAPIVersion,
            });
            $scope.session = `${$scope.organization.url}/secur/frontdoor.jsp?sid=${$scope.organization.sid}`;
            createEditor();

        }); //str
    } //init


    /* ------------------------------------------ API Function  ------------------------------------------ */

    function lwcComponentOnInitConfig(result) {
        const icons = {
            js: 'js', html: 'html', css: 'css', xml: 'xml', svg: 'svg'
        }
        let data = {};
        result.records.forEach((com, index) => {
            let key = com.LightningComponentBundleId;
            let fileName = com.FilePath.split("/");
            let innerKey = fileName[fileName.length - 1];
            let ext = com.FilePath.split(".")
            let fileFormat = ext[ext.length - 1];
            let fileIcon = icons[fileFormat];


            let innerObj = { label: com.LightningComponentBundle.DeveloperName, value: { ...com, fileFormat, fileIcon } };
            let obj = {};
            let totalRecordCount = (result.records.length - 1);
            obj['folder'] = com.LightningComponentBundle.DeveloperName;
            if (data.hasOwnProperty(key)) {
                obj = Object.assign({}, data[key]);
                obj[innerKey] = innerObj;
                data[key] = obj;
            }
            obj[innerKey] = innerObj
            data[key] = obj;
            if (totalRecordCount === index) {
                $scope.lightningWebComponents = JSON.parse(JSON.stringify(data));
                $scope.loader = false;
                $scope.$apply();
            }
        });


    }

    function getMetadataRecords(query) {
        return new Promise((resolve, reject) => {
            $scope.conn.tooling.query(query, function (err, res) {
                if (err) {
                    reject(err);
                } else if (res) {
                    let lwcData = JSON.parse(JSON.stringify(res));
                    if (!res.done && res.nextRecordsUrl) {
                        $scope.conn.requestGet(res.nextRecordsUrl, (err, nextResult) => {
                            if (err) {
                                return console.error(err);
                            }
                            res.records = [...res.records, ...nextResult.records];
                            resolve(res);
                        });
                    } else {
                        resolve(res);
                    }
                }
            });
        });
    }



    function orgConfigurationInit() {

        $scope.loader = true;
        $scope.$apply();

        //Apex
        let apexQuery = "SELECT Id, Name, ApiVersion, Status FROM ApexClass WHERE ManageableState IN ('unmanaged', 'beta') ORDER BY Name";
        let lightningMessageChannelQuery = "SELECT Id, DeveloperName FROM LightningMessageChannel WHERE ManageableState != 'installed' ORDER BY MasterLabel";
        let query = "SELECT Id,FilePath,Format,LightningComponentBundleId,LightningComponentBundle.ManageableState,LightningComponentBundle.DeveloperName FROM LightningComponentResource WHERE LightningComponentBundle.ManageableState != 'installed' ORDER BY LightningComponentBundle.DeveloperName, Format";


        Promise.all([getMetadataRecords(apexQuery), getMetadataRecords(lightningMessageChannelQuery), getMetadataRecords(query)]).then((values) => {
            //apex
            if (values[0].size > 0) {
                $scope.apexClasses = values[0].records;
            }
            //LMS
            if (values[1].size > 0) {
                $scope.lightningMessageChannels = values[1].records;
            }
            //LWC
            if (values[2].size > 0) {
                lwcComponentOnInitConfig(values[2]);
            } else {
                $scope.loader = false;
                $scope.messages = [{
                    message: 'Org has been successfully connected. No LWC component found.',
                    type: 'success_message',
                    dateTime: new Date()
                }];
                $("#dev-tool").show(500);
                $scope.$apply();
            }//else

            contextMenus();

        }).catch((error) => {
            console.error(error.message);
            errorMessageShow(error.message + '. Please re-connect or refresh editor.');
            Swal.fire(
                'Error',
                error.message,
                'error'
            )
        });;


        // return false;
        // //apex
        // $scope.conn.tooling.query(apexQuery, function (err, res) {
        //     if (err) {
        //         console.log('err : ', err);
        //     } else if (res) {
        //         $scope.apexClasses = res.records;
        //         $scope.$apply();
        //     }

        //     console.log('APEX : ', err, res);
        // });

        // //Lightning Message Channels
        // $scope.conn.tooling.query(lightningMessageChannelQuery, function (err, res) {
        //     if (err) return console.error(err);
        //     if (res.size > 0) {
        //         $scope.lightningMessageChannels = res.records;
        //         $scope.$apply();
        //     }
        //     console.log('LMS : ', err, res);
        // }); //con


        // /** Get LWC ***********/
        // $scope.conn.tooling.query(query, function (err, res) {
        //     if (err) {
        //         errorMessageShow(err.message + '. Please re-connect or refresh editor.');
        //         Swal.fire(
        //             'Error',
        //             err.message,
        //             'error'
        //         )
        //         return console.error(err.message);
        //     }

        //     if (res.records.length == 0) {
        //         $scope.loader = false;
        //         $scope.messages = [{
        //             message: 'Org has been successfully connected. No LWC component found.',
        //             type: 'success_message',
        //             dateTime: new Date()
        //         }];
        //         $("#dev-tool").show(500);
        //         $scope.$apply();
        //     }


        //     console.log('LWC : ', err, res);

        //     let icons = {
        //         js: 'js',
        //         html: 'html',
        //         css: 'css',
        //         xml: 'xml',
        //         svg: 'svg'
        //     }
        //     let data = {};
        //     res.records.forEach((com, index) => {
        //         let key = com.LightningComponentBundleId;
        //         let fileName = com.FilePath.split("/");
        //         let innerKey = fileName[fileName.length - 1];
        //         let ext = com.FilePath.split(".")
        //         let fileFormat = ext[ext.length - 1];
        //         let fileIcon = icons[fileFormat];


        //         let innerObj = { label: com.LightningComponentBundle.DeveloperName, value: { ...com, fileFormat, fileIcon } };
        //         let obj = {};
        //         obj['folder'] = com.LightningComponentBundle.DeveloperName;
        //         if (data.hasOwnProperty(key)) {
        //             obj = Object.assign({}, data[key]);
        //             obj[innerKey] = innerObj;
        //             data[key] = obj;
        //         }
        //         obj[innerKey] = innerObj
        //         data[key] = obj;
        //         if ((res.totalSize - 1) === index) {
        //             $scope.lightningWebComponents = JSON.parse(JSON.stringify(data));
        //             $scope.loader = false;
        //             $scope.$apply();
        //         }
        //     });
        // }); //con 

        // contextMenus();

    } //fun



    $scope.getComponent = function (element) {

        $scope.loader = true;

        let componentId = element.dataset.id;
        let fileFormat = element.dataset.format;
        let index = -1;

        [...document.querySelectorAll('.file-sections .ui.list')].forEach(element => {
            if (element.dataset.id == componentId) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });


        if ($scope.tabList.length) {
            index = $scope.tabList.findIndex(tab => tab.componentId === componentId);
        } //if
        if (index != -1) {
            $scope.activeTab($scope.tabList[index].componentId);
        } else {
            let query = `SELECT LightningComponentBundleId,FilePath,Format,source FROM LightningComponentResource WHERE Id ='${componentId}'`;
            $scope.conn.tooling.query(query, function (err, res) {
                if (err) { return console.error(err); }
                if (res.done) {
                    let data = res.records[0];
                    let fileSource = data.Source;
                    let LightningComponentBundleId = data.LightningComponentBundleId;
                    let path = data.FilePath.split('/');
                    let folderName = path[path.length - 2];
                    let fileName = path[path.length - 1];
                    let ext = fileName.split('.');
                    let extension = fileName.includes('js-meta.xml') ? 'xml' : ext[ext.length - 1];

                    $scope.pathFolderName = folderName;
                    $scope.pathFileName = fileName;

                    $scope.sourceCodeHolder[componentId] = { fileSource, fileFormat };
                    $scope.tabList.map(obj => { obj.isOpenState = false });
                    $scope.tabList = [...$scope.tabList, { label: element.dataset.fileName, componentId, LightningComponentBundleId, isOpenState: true, folderName, fileName, extension }];

                    $scope.data[componentId] = { model: monaco.editor.createModel(fileSource, $scope.formatMapping[fileFormat]), state: null };
                    setEditorValue(componentId, fileFormat);
                    $scope.$apply();
                } //if
            }); //api
        } //else
    } //fun

    $scope.saveConfirmation = async function () {
        const DeploymentConfirmation = localStorage.getItem('deployconfirm') ? localStorage.getItem('deployconfirm') : null;
        if (DeploymentConfirmation) {
            $scope.saveCode();
        } else {
            $('.ui.saveConfirmation').modal({
                onApprove: function () {
                    $scope.saveCode();
                }
            }).modal('show');
        }
    }

    function getTodayDate() {
        return new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
    }

    function isNotEmptyElements(element) {
        return (element && element.length > 0);
    }

    function updateParentXMLConfiguration(bundleId, metadata) {
        $scope.conn.requestPatch('/services/data/v50.0/tooling/sobjects/LightningComponentBundle/' + bundleId, { Metadata: metadata }, function (err, res) { }) //requestPatch
    }

    function createMetadataContainer(Name) {
        return new Promise((resolve, reject) => {
            $scope.conn.tooling.sobject('MetadataContainer').create({ Name }, function (err, res) {
                if (err) {
                    console.log('MetadataContainer : ', err);
                } else {
                    resolve((res && res.id ? res.id : null));
                }
            }); //Api
        }); //Promise
    }

    function deleteMetadataContainer(MetadataContainerId) {
        return new Promise((resolve, reject) => {
            $scope.conn.tooling.sobject('MetadataContainer').delete(MetadataContainerId, function (err, res) {
                if (err) {
                    console.log('deleteMetadataContainer : ', err);
                } else {
                    console.log('deleteMetadataContainer : ', res);
                } //else
            }) //Delete
        }); //Promise
    }

    function createApexClassMember(data) {
        return new Promise((resolve, reject) => {
            $scope.conn.tooling.sobject('ApexClassMember').create(data, function (err, res) {
                if (err) {
                    console.log('ApexClassMember : ', err);
                } else {
                    resolve((res ? data.MetadataContainerId : null));
                }
            });
        });
    }


    function createContainerAsyncRequest(MetadataContainerId) {
        return new Promise((resolve, reject) => {
            $scope.conn.tooling.sobject('ContainerAsyncRequest').create({ MetadataContainerId, isCheckOnly: false }, function (err, res) {
                if (err) {
                    console.log('ContainerAsyncRequest : ', err);
                } else {
                    resolve((res && res.id ? res.id : null));
                } //else
            }) //containerAsyncRequest
        });
    }

    function checkContainerAsyncRequest(containerAsyncRequestId) {
        let query = "SELECT Id, MetadataContainerId, State, ErrorMsg, DeployDetails FROM ContainerAsyncRequest WHERE Id='" + containerAsyncRequestId + "'";
        $scope.conn.tooling.query(query, function (err, res) {
            if (err) {
                console.log('Check_ContainerAsyncRequest : ', err);
            } else if (res && res.records.length) {
                let obj = res.records[0];
                if (obj.State == 'Completed') {
                    deleteMetadataContainer(obj.MetadataContainerId);
                    $scope.loader = false;
                    $scope.$apply();
                    tata.success('Success', 'Apex Changes Deployed.', {
                        progress: true,
                        duration: 2000,
                        position: 'tr',
                        animate: 'slide',
                        onClick: null,
                        onClose: null,
                        closeBtn: false
                    });
                } else if (obj.State == 'Error' || obj.State == 'Failed' || obj.State == 'Invalidated' || obj.State == 'Aborted') {
                    $scope.loader = false;
                    $scope.$apply();
                    tata.error(obj.State, 'Something is wrong in apex.', {
                        progress: true,
                        duration: 3000,
                        position: 'tr',
                        onClick: null,
                        onClose: null,
                        closeBtn: false
                    });


                    switch (obj.State) {
                        case 'Error':
                            errorMessageShow('Error—an unexpected error occurred: ' + obj.ErrorMsg);
                            break;
                        case 'Failed':
                            if (obj.hasOwnProperty('DeployDetails') && obj.DeployDetails.hasOwnProperty('allComponentMessages') && obj.DeployDetails.allComponentMessages.length) {
                                let errorMsg = [];
                                let editorErrorShow = []
                                obj.DeployDetails.allComponentMessages.forEach(msg => {
                                    errorMsg.push({ message: `LineNumber: ${msg.lineNumber} ➡️ ${msg.problem}`, type: 'error_message', dateTime: getTodayDate() });
                                    editorErrorShow.push({
                                        startLineNumber: msg.lineNumber,
                                        startColumn: msg.columnNumber,
                                        message: msg.problem
                                    })
                                });
                                const model = $scope.codeEditor.getModel();
                                if (model && model.getVersionId() && editorErrorShow.length) {
                                    monaco.editor.setModelMarkers(model, 'apexError', editorErrorShow);
                                }
                                $scope.messages = errorMsg;
                                $scope.$apply();
                                $("#dev-tool").show(500);
                            }

                            break;
                        case 'Invalidated':
                            errorMessageShow('Salesforce canceled the job because the results might not be valid. Please try again.')
                            break;
                        case 'Aborted':
                            errorMessageShow('Salesforce aborted the job because the results might not be valid. Please try again.')
                            break;
                        default:
                        // code block
                    } //switch

                    deleteMetadataContainer(obj.MetadataContainerId);
                } else {
                    window.setTimeout((id) => {
                        checkContainerAsyncRequest(id);
                    }, 2000, obj.Id);
                }
            }
        }) //Api
    }


    function getAllComponentFile(lightningComponentBundleId) {
        return new Promise((resolve, reject) => {
            let query = "SELECT Id,FilePath,Format,source FROM LightningComponentResource WHERE LightningComponentBundleId = '" + lightningComponentBundleId + "' AND LightningComponentBundle.ManageableState != 'installed' ORDER BY LightningComponentBundle.DeveloperName, Format";
            $scope.conn.tooling.query(query, function (err, res) {
                if (err) return console.error(err);
                resolve(res.records);
            }); //con
        });
    }

    function filterOpenComponentFile(parentId, resource) {
        return new Promise((resolve, reject) => {
            let openComponents = $scope.tabList.filter(tab => tab.LightningComponentBundleId === parentId);
            let packageXML = '';
            let metadata = [];
            if (openComponents.length) {
                packageXML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
                                <Package xmlns="http://soap.sforce.com/2006/04/metadata">
                                    <types>
                                        <members>${openComponents[0].folderName}</members>
                                        <name>LightningComponentBundle</name>
                                    </types>
                                    <version>${$scope.salesforceAPIVersion}</version>
                                </Package>`;

                openComponents.forEach(currentItem => {
                    let sourceCode = $scope.data[currentItem.componentId].model.getValue();
                    metadata.push({
                        FilePath: 'lwc/' + currentItem.folderName + '/' + currentItem.fileName,
                        Source: sourceCode
                    }) //array
                }); //forEach

                let data = resource.filter((elem) => !openComponents.find(({ componentId }) => elem.Id === componentId));
                if (data.length) {
                    data.forEach(obj => {
                        metadata.push({
                            FilePath: obj.FilePath,
                            Source: obj.Source
                        }) //array
                    }); //forEach
                } //data
                resolve({ packageXML, metadata })
            } //if
        }); //Promise
    }


    $scope.retrieveLightningMessageChannel = function (element, lmsId) {

        let index = -1;
        if ($scope.tabList.length) {
            index = $scope.tabList.findIndex(tab => tab.componentId === lmsId);
        } //if

        if (index != -1) {
            $scope.activeTab($scope.tabList[index].componentId);
        } else {
            $scope.loader = true;

            new Promise(function (resolve, reject) {
                let lmsQuery = "SELECT Id, DeveloperName, MasterLabel, IsExposed, Description FROM LightningMessageChannel WHERE ManageableState != 'installed' AND Id = '" + lmsId + "' ORDER BY MasterLabel";
                $scope.conn.tooling.query(lmsQuery, function (err, res) {
                    if (err) {
                        console.log('err : ', err);
                        reject(err)
                    } else if (res && res.records.length) {
                        resolve(res.records[0]);
                    }
                }); //api

            }).then(data => { // (**)
                let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<LightningMessageChannel xmlns="http://soap.sforce.com/2006/04/metadata">`;
                xml += (data.MasterLabel ? `\n\t<masterLabel>${data.MasterLabel}</masterLabel>` : '');
                xml += (data.IsExposed ? `\n\t<isExposed>${data.IsExposed}</isExposed>` : '');
                xml += (data.Description ? `\n\t<description>${data.Description}</description>` : '');
                //------------------------------------
                let lightningMessageFieldQuery = "SELECT Id, FieldName, Description FROM LightningMessageField WHERE LightningMessageChannelId = '" + lmsId + "' ORDER BY FieldName";
                $scope.conn.tooling.query(lightningMessageFieldQuery, function (err, res) {
                    if (err) return console.error(err);
                    if (res.size > 0) {
                        console.log('res.records : ', res.records);
                        res.records.forEach(f => {
                            xml += `\n\t<lightningMessageFields>\n\t\t<fieldName>${f.FieldName}</fieldName>\n\t\t<description>${f.Description}</description>\n\t</lightningMessageFields>`;
                        });
                    }

                    xml += `\n</LightningMessageChannel>`;
                    //--------------------------
                    let fileSource = xml;
                    let LightningComponentBundleId = data.Id;
                    let folderName = 'LightningMessageChannel';
                    let fileName = data.DeveloperName;
                    let fileFormat = 'xml';
                    $scope.pathFolderName = folderName;
                    $scope.pathFileName = fileName;

                    $scope.sourceCodeHolder[data.Id] = { fileSource, fileFormat };
                    $scope.tabList.map(obj => { obj.isOpenState = false });
                    $scope.tabList = [...$scope.tabList, { label: fileName + '.messageChannel-meta.xml', componentId: data.Id, LightningComponentBundleId, isOpenState: true, folderName, fileName, extension: 'xml' }];

                    $scope.data[data.Id] = { model: monaco.editor.createModel(fileSource, 'xml'), state: null };
                    setEditorValue(data.Id, 'apex');
                    $scope.loader = false;
                    $scope.$apply();

                }); //con

            });

        }

        //---------------------------------------------------------------------------------
    }


    $scope.packagePicker = function () {

        // Closure to capture the file information.
        function handleFile(f) {
            // var $title = $("<h4>", {
            //     text: f.name
            // });
            // var $fileContent = $("<ul>");
            // $result.append($title);
            // $result.append($fileContent);

            var dateBefore = new Date();
            JSZip.loadAsync(f)                                   // 1) read the Blob
                .then(function (zip) {
                    var dateAfter = new Date();
                    // $title.append($("<span>", {
                    //     "class": "small",
                    //     text: " (loaded in " + (dateAfter - dateBefore) + "ms)"
                    // }));

                    zip.forEach(function (relativePath, zipEntry) {  // 2) print entries
                        console.log('relativePath: ', relativePath, 'zipEntry: ', zipEntry);
                        // $fileContent.append($("<li>", {
                        //     text: zipEntry.name
                        // }));
                    });
                }, function (e) {
                    // $result.append($("<div>", {
                    //     "class": "alert alert-danger",
                    //     text: "Error reading " + f.name + ": " + e.message
                    // }));
                });
        }

        var files = document.querySelector('#packagepicker').files[0];
        console.log('files : ', files);
        handleFile(files);
        /* for (var i = 0; i < files.length; i++) {
            console.log(files[i]);
        } */
    }

    function getCheckedMetdataValue(className) {
        let components = [];
        $(`.${className}:checked`).each(function () {
            components.push($(this).val());
        });
        return components;
    }


    function metadataRetrieve(packageConfig) {
        $scope.loader = true;

        $scope.conn.metadata.retrieve({
            apiVersion: $scope.salesforceAPIVersion,
            singlePackage: false,
            unpackaged: {
                types: packageConfig
            }
        }).complete(function (err, result) {
            if (err) {
                console.log('ERROR : ', err.message);
                toastMessage('error', (err.message || 'Metadata retrieve operation failed.'));
            } else if (result.success) {
                let today = moment().format('llll').replace(/:/g, '꞉');

                const binaryData = atob(result.zipFile); // Decoded string   
                // Create a Uint8Array from the binary data
                const uint8Array = new Uint8Array(binaryData.length);
                for (let i = 0; i < binaryData.length; i++) {
                    uint8Array[i] = binaryData.charCodeAt(i);
                }
                // Create a Blob from the binary data
                const zipBlob = new Blob([uint8Array], { type: 'application/zip' });
                saveAs(zipBlob, 'LightningStudioBackup - ' + today + '.zip');
                toastMessage('Success', 'Metadata successfully retrieved.')
            }//if
            $scope.loader = false;
            $scope.$apply();
        });
    }


    $scope.retrieveComponents = function () {

        const LWC_PACKAGE_NAME = 'LightningComponentBundle';
        const LMS_PACKAGE_NAME = 'LightningMessageChannel';
        const APEX_PACKAGE_NAME = 'ApexClass';
        let lwcMetadataCheckbox = $('.lwcMetadataCheckbox:checked').length === $('.lwcMetadataCheckbox').length;
        let lmsMetadataCheckbox = $('.lmsMetadataCheckbox:checked').length === $('.lmsMetadataCheckbox').length;
        let apexMetadataCheckbox = $('.apexMetadataCheckbox:checked').length === $('.apexMetadataCheckbox').length;
        let types = [];

        //LWC
        if (lwcMetadataCheckbox) {
            types.push({ 'members': ['*'], 'name': LWC_PACKAGE_NAME });
        } else {
            let lwcSelectedMembers = getCheckedMetdataValue('lwcMetadataCheckbox');
            if (lwcSelectedMembers && lwcSelectedMembers.length) {
                types.push({ 'members': lwcSelectedMembers, 'name': LWC_PACKAGE_NAME });
            }
        }

        if (lmsMetadataCheckbox) {
            types.push({ 'members': ['*'], 'name': LMS_PACKAGE_NAME });
        } else {
            let lmsSelectedMembers = getCheckedMetdataValue('lmsMetadataCheckbox');
            if (lmsSelectedMembers && lmsSelectedMembers.length) {
                types.push({ 'members': lmsSelectedMembers, 'name': LMS_PACKAGE_NAME });
            }
        }

        if (apexMetadataCheckbox) {
            types.push({ 'members': ['*'], 'name': APEX_PACKAGE_NAME });
        } else {
            let apexSelectedMembers = getCheckedMetdataValue('apexMetadataCheckbox');
            if (apexSelectedMembers && apexSelectedMembers.length) {
                types.push({ 'members': apexSelectedMembers, 'name': APEX_PACKAGE_NAME });
            }
        }

        console.log('types : ', types);
        // return false;

        if (types.length > 0) {
            metadataRetrieve(types);
        } else {
            toastMessage('info', 'Nothing downloaded At least one component must be selected to download.');
        }


    }

    function deployComponent(data) {
        return new Promise((resolve, reject) => {
            let zip = new JSZip();
            zip.file('package.xml', data.packageXML);
            data.metadata.forEach(lwc => {
                zip.file(lwc.FilePath, lwc.Source);
            });
            zip.generateAsync({ type: "base64" }).then(function (blob) {
                $scope.conn.metadata.deploy(blob, { singlePackage: true, rollbackOnError: true }).complete(function (err, result) {
                    if (err) {
                        console.log('[SALESFORCE_LWC_EDITOR] Error', err);
                        $scope.loader = false;
                        $scope.$apply();
                        reject(err);
                    }
                    if (result) {
                        //console.log('[SALESFORCE_LWC_EDITOR] result', result);
                        resolve(result);
                    }
                });
            });
        }); //Promise
    }

    function deploymentDetails(res) {
        $scope.loader = false;
        $scope.$apply();

        if (res.success) {
            tata.success(res.status, 'All changes deployed.', {
                progress: true,
                duration: 2000,
                position: 'tr',
                animate: 'slide',
                onClick: null,
                onClose: null,
                closeBtn: false
            });
        } else if (res.status == 'Failed') {
            tata.error(res.status, 'Deployment ' + res.status, {
                progress: true,
                duration: 3000,
                position: 'tr',
                onClick: null,
                onClose: null,
                closeBtn: false
            });
            let msg = `<div class="error">Please find the error of the deployment
                                <a href="${$scope.conn.instanceUrl}/changemgmt/monitorDeploymentsDetails.apexp?retURL=/changemgmt/monitorDeployment.apexp&asyncId=${res.id}" target="_blank">Click Here</a>
                        </div>`
            $("#metadataErrors").html(msg);
            $("#dev-tool").show(500);
        } else {
            tata.log(res.status, 'Deployment ' + res.status, {
                progress: true,
                duration: 3000,
                position: 'tr',
                onClick: null,
                onClose: null,
                closeBtn: false
            });
            let msg = `<div class="error">The deployment is in the "queue" phase so <a href="${$scope.conn.instanceUrl}/changemgmt/monitorDeploymentsDetails.apexp?retURL=/changemgmt/monitorDeployment.apexp&asyncId=${res.id}" target="_blank">Click Here</a> to find out the status of the deployment.
            </br>
            If the deployment status is "Succeeded", you can continue your development.
            </div>`
            $("#metadataErrors").html(msg);
            $("#dev-tool").show(500);
        }

    }

    function standardLWCDeployment(parentId) {
        getAllComponentFile(parentId)
            .then(resource => {
                return filterOpenComponentFile(parentId, resource);
            }).then(data => {
                return deployComponent(data);
            }).then(res => {
                deploymentDetails(res);
            }).catch(error => {
                console.log('error : ', error);
                if (error.includes('Process Id')) {
                    let id = error.split('=')[1].trim();
                    deploymentDetails({ success: false, status: 'Pending', id });
                } else {
                    errorMessageShow(error);
                    $scope.loader = false;
                    $scope.$apply();
                }
            });
    }

    function deployLightningMessageChannel(path, sourceCode) {
        return new Promise((resolve, reject) => {
            let zip = new JSZip();
            zip.file('package.xml', `<?xml version="1.0" encoding="UTF-8"?>
            <Package xmlns="http://soap.sforce.com/2006/04/metadata">
                <types>
                    <members>*</members>
                    <name>LightningMessageChannel</name>
                </types>
                <version>${$scope.salesforceAPIVersion}</version>
            </Package>`);

            zip.file(path, sourceCode);
            zip.generateAsync({ type: "base64" }).then(function (blob) {
                $scope.conn.metadata.deploy(blob, { singlePackage: true, rollbackOnError: true }).complete(function (err, result) {
                    if (err) {
                        console.log('[SALESFORCE_LWC_EDITOR] Error', err);
                        $scope.loader = false;
                        $scope.$apply();
                        reject(err);
                    }
                    if (result) {
                        //console.log('[SALESFORCE_LWC_EDITOR] result', result);
                        resolve(result);
                    }
                });
            });
        }); //Promise
    }


    function getCurrentSourceCode(cmpId) {
        return new Promise((resolve, reject) => {
            let query = `SELECT Id, source, Format,LightningComponentBundleId, LightningComponentBundle.DeveloperName FROM LightningComponentResource WHERE Id = '${cmpId}'`;
            $scope.conn.tooling.query(query, function (err, res) {
                if (err) {
                    console.error(err.message);
                }
                resolve(res.records[0].Source);
            });
        });
    }


    const hasCodeConflict = (oldCode, newCode) => {
        const dmp = new diff_match_patch();
        const diffs = dmp.diff_main(oldCode, newCode);
        dmp.diff_cleanupSemantic(diffs);

        let diffLineCount = 0;
        diffs.forEach(diff => {
            const [op, text] = diff;
            if (op === 1 || op === -1) {
                const lines = text.split('\n');
                diffLineCount += lines.length - 1;
            }
        });

        return !(diffLineCount === 0);
    }


    $scope.saveCode = async function () {
        let dateTime = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
        let activeIndex = $scope.tabList.findIndex(tab => tab.isOpenState);
        $("#metadataErrors").html('');

        if (activeIndex !== -1) {
            $scope.messages = [];
            $scope.loader = true;
            $scope.$apply();

            let activeTab = $scope.tabList[activeIndex];
            let parentId = $scope.tabList[activeIndex].LightningComponentBundleId;

            if (activeTab.folderName == 'LightningMessageChannel') {


                deployLightningMessageChannel(`messageChannels/${$scope.tabList[activeIndex].label}`, $scope.data[parentId].model.getValue()).then((value) => {
                    console.log('LMS==>', value);
                    deploymentDetails(value);
                }).catch((error) => {
                    if (error.includes('Process Id')) {
                        let id = error.split('=')[1].trim();
                        deploymentDetails({ success: false, status: 'Pending', id });
                    } else {
                        errorMessageShow(error);
                        $scope.loader = false;
                        $scope.$apply();
                    }
                });


            } else if (activeTab.folderName == 'Apex') {
                const model = $scope.codeEditor.getModel();
                if (model && model.getVersionId()) {
                    monaco.editor.setModelMarkers(model, 'apexError', []);
                }

                let sourceCode = $scope.data[parentId].model.getValue();
                createMetadataContainer(parentId).then(MetadataContainerId => {
                    return createApexClassMember({ MetadataContainerId, ContentEntityId: parentId, Body: sourceCode });
                }).then(MetadataContainerId => {
                    return createContainerAsyncRequest(MetadataContainerId);
                }).then(containerAsyncRequestId => {
                    checkContainerAsyncRequest(containerAsyncRequestId);
                }).catch(error => {
                    $scope.loader = false;
                    $scope.$apply();
                    alert('Something is wrong. Please refresh and try again!');
                })

            } else {
                let isStandardDeployment = $('#LWCStandardDeployment').is(':checked');
                // let isDetectConflicts = $('#detectCodeConflictInput').is(':checked');

                /* let cmpId = $scope.tabList[activeIndex].componentId;
                 let clientSourceCode = $scope.data[cmpId].model.getValue();
                 if (true) {
                     let lastSavedCode = $scope.lastUpdatedSourceCodeHolder.hasOwnProperty(cmpId) ? $scope.lastUpdatedSourceCodeHolder[cmpId] : null;
                     if (lastSavedCode) {
                         getCurrentSourceCode(cmpId).then((oldCode) => {
                             console.log('oldCode : ', oldCode);
                             if (hasCodeConflict(oldCode, clientSourceCode)) {
 
                                 $('.diffHunkModal').modal({ closable: false }).modal('show');
                                 const diffEditor = monaco.editor.createDiffEditor(document.getElementById('diffHunkEditor'), {
                                     readOnly: true
                                 });
                                 const originalContent = monaco.editor.createModel(oldCode, 'javascript');
                                 const modifiedContent = monaco.editor.createModel(clientSourceCode, 'javascript');
                                 diffEditor.setModel({
                                     original: originalContent,
                                     modified: modifiedContent,
                                 });
                                 // // Dispose of the models and editor
                                 // originalContent.dispose();
                                 // modifiedContent.dispose();
                                 // editor.dispose(); 
                             }//if 
 
                         });
                     } else {
                         $scope.lastUpdatedSourceCodeHolder[cmpId] = clientSourceCode;
                     }
                 }//if 
                 */


                if (isStandardDeployment) {
                    standardLWCDeployment(parentId);
                } else {

                    let openComponents = $scope.tabList.filter(tab => tab.LightningComponentBundleId === parentId);
                    let allFiles = [];
                    let componentMetadata = null;
                    openComponents.forEach(obj => {
                        let sourceCode = $scope.data[obj.componentId].model.getValue();
                        allFiles.push({ Id: obj.componentId, Source: sourceCode });
                        /*  Parent XML Configuration - Start*/
                        componentMetadata = {};
                        if (obj.fileName.includes(".js-meta.xml")) {
                            let parser = new DOMParser();
                            let xmlDoc = parser.parseFromString(sourceCode, "text/xml");

                            let apiVersionTag = xmlDoc.getElementsByTagName("apiVersion");
                            let isExposedTag = xmlDoc.getElementsByTagName("isExposed");
                            let masterLabelTag = xmlDoc.getElementsByTagName("masterLabel");
                            let descriptionTag = xmlDoc.getElementsByTagName("description");
                            let targets = xmlDoc.getElementsByTagName("targets");

                            if (isNotEmptyElements(isExposedTag)) {
                                componentMetadata.isExposed = (isExposedTag[0].textContent.toLowerCase() == 'true');
                            }
                            if (isNotEmptyElements(apiVersionTag)) {
                                componentMetadata.apiVersion = apiVersionTag[0].textContent;
                            }
                            if (isNotEmptyElements(masterLabelTag)) {
                                componentMetadata.masterLabel = masterLabelTag[0].textContent;
                            }
                            if (isNotEmptyElements(descriptionTag)) {
                                componentMetadata.description = descriptionTag[0].textContent;
                            }

                            let xmlTargets = [];
                            if (isNotEmptyElements(targets) && targets[0].childNodes && targets[0].childNodes.length) {
                                targets[0].childNodes.forEach(target => {
                                    if ((target.nodeType !== target.TEXT_NODE) && (target.nodeType !== target.COMMENT_NODE)) {
                                        xmlTargets.push(target.textContent);
                                    };
                                })
                            }
                            if (isNotEmptyElements(xmlTargets)) {
                                componentMetadata.targets = {
                                    target: xmlTargets
                                }
                            }
                            /*  Parent XML Configuration - End*/
                        } //if xml file

                    }) //for


                    $scope.conn.tooling.sobject('LightningComponentResource').update(allFiles, { allOrNone: true, allowRecursive: true }, function (err, res) {

                        if (err) {
                            apiErrorMessageShow(err);
                        } else {
                            if (componentMetadata) {
                                updateParentXMLConfiguration(parentId, componentMetadata);
                            }

                            let isError = false;
                            let msg = res.map(cmp => {
                                let obj = $scope.tabList.filter(tabs => tabs.componentId === cmp.id);
                                if (!cmp.success) {
                                    isError = true;
                                }
                                return {
                                    message: obj[0].label + ' ' + (cmp.success ? 'successfully deployed source' : (cmp.errors.length ? cmp.errors[0].message : 'something is wrong')),
                                    type: (cmp.success ? 'success_message' : 'error_message'),
                                    dateTime
                                };
                            }) //for
                            $scope.messages = msg;

                            if (isError) {
                                tata.error('Error', 'Please check the output console.', {
                                    progress: true,
                                    duration: 2000,
                                    position: 'tr',
                                    onClick: null,
                                    onClose: null,
                                    closeBtn: false
                                });
                                $("#dev-tool").show(500);
                            } else {
                                tata.success('Success', 'All Changes Deployed.', {
                                    progress: true,
                                    duration: 2000,
                                    position: 'tr',
                                    animate: 'slide',
                                    onClick: null,
                                    onClose: null,
                                    closeBtn: false
                                });
                            }
                            $scope.loader = false;
                            $scope.$apply();
                        } //else
                    }); //tooling
                } //Inner else
            }

        } //if
    } //meth


    function buildXMLFile(apiVersion, isExposed, masterLabel, description, targets) {
        let xml = '<?xml version="1.0"?>\n<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">';
        xml += '\n\t<apiVersion>' + apiVersion + '.0</apiVersion>';
        xml += '\n\t<isExposed>' + isExposed + '</isExposed>';
        if (masterLabel && masterLabel.trim().length) {
            xml += '\n\t<masterLabel>' + masterLabel + '</masterLabel>';
        }
        if (description && description.trim().length) {
            xml += '\n\t<description>' + description + '</description>';
        }
        if (targets.length) {
            xml += '\n' + targets;
        }
        xml += '\n</LightningComponentBundle>';
        return xml;
    }

    function createNewComponent() {
        let name = $('#newComponentName').val();
        let masterLabel = $('#componentMasterLabel').val();
        let apiVersion = $('#componentApiVersion').val();
        let description = $('#componentDescription').val();
        let isExposed = $('#isExposed').is(':checked');


        var xmlTargets = [];
        $.each($("input[name='xmlTargets[]']:checked"), function () {
            xmlTargets.push($(this).val());
        });

        let allTargets = '';
        if (xmlTargets.length) {
            let target = xmlTargets.map(item => {
                return `<target>${item}</target>`;
            });
            allTargets = `\t<targets>\n\t\t${target.join('\n\t\t')}\n\t</targets>`;
        }

        if (!validateName(name)) {
            errorMessageShow('Only Alphabets, _(underscore) allowed in the component name');
            return;
        }

        if (name.length && name.trim().length) {
            $scope.loader = true;
            $scope.$apply();

            let lowerCasedComponentName = fileNameFormat(name);
            let folderName = lowerCasedComponentName[0].toUpperCase() + lowerCasedComponentName.substring(1, lowerCasedComponentName.length);


            let componentMetadata = {};
            componentMetadata.apiVersion = parseInt(apiVersion);
            componentMetadata.isExposed = isExposed;
            if (masterLabel && masterLabel.trim().length) {
                componentMetadata.masterLabel = masterLabel;
            }
            if (description && description.trim().length) {
                componentMetadata.description = description;
            }
            if (xmlTargets.length) {
                componentMetadata.targets = {
                    target: xmlTargets
                }
            }



            $scope.conn.tooling.sobject('LightningComponentBundle').insert({ FullName: lowerCasedComponentName, Metadata: componentMetadata }, function (err, res) {
                if (err) {
                    console.log(err);
                    apiErrorMessageShow(err);
                    return console.error(err);
                }

                if (!res.success) {
                    return console.log('error');
                }
                let parentId = res.id;
                let path = 'lwc/' + lowerCasedComponentName + '/' + lowerCasedComponentName;

                let metaXMLFile = buildXMLFile(apiVersion, isExposed, masterLabel, description, allTargets);

                const TOOLING_API_URL = `/services/data/v${$scope.salesforceAPIVersion}/tooling/sobjects/LightningComponentResource`;

                let LightningComponentResourceFiles = [{
                    'method': 'POST',
                    'url': TOOLING_API_URL,
                    'referenceId': '100',
                    'body': {
                        "FilePath": path + '.js',
                        "Format": "js",
                        "Source": "import { LightningElement } from 'lwc';\nexport default class " + folderName + " extends LightningElement {\n\n}",
                        "LightningComponentBundleId": parentId
                    }
                },
                {
                    'method': 'POST',
                    'url': TOOLING_API_URL,
                    'referenceId': '101',
                    'body': {
                        "FilePath": path + '.html',
                        "Format": "html",
                        "Source": '<template>\n\n</template>',
                        "LightningComponentBundleId": parentId
                    }
                },
                {
                    'method': 'POST',
                    'url': TOOLING_API_URL,
                    'referenceId': '102',
                    'body': {
                        "FilePath": path + '.js-meta.xml',
                        "Format": "xml",
                        "Source": metaXMLFile,
                        "LightningComponentBundleId": parentId
                    }
                }
                ];

                // Create CSS
                if ($('#withCSS').is(':checked')) {
                    LightningComponentResourceFiles.push({
                        'method': 'POST',
                        'url': TOOLING_API_URL,
                        'referenceId': '104',
                        'body': {
                            "FilePath": path + '.css',
                            "Format": "css",
                            "Source": '.dummy{\n\tcolor : black;\n}',
                            "LightningComponentBundleId": parentId
                        }
                    });
                }
                // Create SVG
                if ($('#withSVG').is(':checked')) {
                    LightningComponentResourceFiles.push({
                        'method': 'POST',
                        'url': TOOLING_API_URL,
                        'referenceId': '105',
                        'body': {
                            "FilePath": path + '.svg',
                            "Format": "svg",
                            "Source": '<svg>\n</svg>',
                            "LightningComponentBundleId": parentId
                        }
                    });
                }

                $scope.conn.requestPost(`/services/data/v${$scope.salesforceAPIVersion}/tooling/composite`, { 'allOrNone': false, 'compositeRequest': LightningComponentResourceFiles }, function (err, res) {
                    if (res) {
                        let msg = [];
                        res.compositeResponse.forEach(cmp => {
                            if (!cmp.body.success) {
                                console.log(cmp);
                                msg.push({ message: cmp.body[0].message, type: 'error_message', dateTime: getTodayDate() });
                            }
                        }); //for
                        if (msg.length) {
                            $scope.messages = [...msg];
                            $("#dev-tool").show(500);
                            $scope.loader = false;
                            $scope.$apply();
                        } else {
                            getComponentsAfterInsert(parentId);
                            apiSuccessMessageShow(`"${folderName}" component has been successfully created`);
                        }
                    } else {
                        console.error(err);
                        apiErrorMessageShow(err);
                        $scope.loader = false;
                        $scope.$apply();
                        return console.error(err);
                    } //else
                }) //requestPost
            }); //outer-tooling 
        } //if
    }

    function getComponentsAfterInsert(lightningComponentBundleId) {

        let query = "SELECT Id,FilePath,Format,LightningComponentBundleId,LightningComponentBundle.ManageableState,LightningComponentBundle.DeveloperName FROM LightningComponentResource WHERE LightningComponentBundleId = '" + lightningComponentBundleId + "' AND LightningComponentBundle.ManageableState != 'installed' ORDER BY LightningComponentBundle.DeveloperName, Format";
        $scope.conn.tooling.query(query, function (err, res) {
            if (err) {
                return console.error(err);
            }

            let icons = {
                js: 'js',
                html: 'html',
                css: 'css',
                xml: 'xml',
                svg: 'svg'
            }

            let data = {};
            let htmlFileId = null,
                htmlFileName = null;
            res.records.forEach((com, index) => {
                let key = com.LightningComponentBundleId;
                let fileName = com.FilePath.split("/");
                let innerKey = fileName[fileName.length - 1];
                let ext = com.FilePath.split(".")
                let fileFormat = ext[ext.length - 1];
                let innerObj = { label: com.LightningComponentBundle.DeveloperName, value: { ...com, fileFormat, fileIcon: icons[fileFormat] } };
                if (com.Format == 'html') {
                    htmlFileId = com.Id;
                    htmlFileName = com.LightningComponentBundle.DeveloperName;
                }
                let obj = {};
                obj['folder'] = com.LightningComponentBundle.DeveloperName;
                if (data.hasOwnProperty(key)) {
                    obj = Object.assign({}, data[key]);
                    obj[innerKey] = innerObj;
                    data[key] = obj;
                }
                obj[innerKey] = innerObj
                data[key] = obj;
                if ((res.totalSize - 1) === index) {
                    $scope.lightningWebComponents = { ...data, ...$scope.lightningWebComponents };
                    if (htmlFileId && htmlFileName) {
                        $scope.getComponent({ dataset: { id: htmlFileId, format: 'html', fileName: htmlFileName + '.html' } });
                    }
                    $scope.$apply();
                }
            });
        }); //con


    }


    function handleCreateNewFile(obj) {

        const dummyBody = {
            css: '.dummy{\n\tcolor : blue;\n}',
            svg: '<svg>\n\n</svg>',
            js: 'console.log("Hello World");',
            html: '<template>\n\n</template>'
        }

        let icons = {
            js: 'js',
            html: 'html',
            css: 'css',
            xml: 'xml',
            svg: 'svg'
        }


        let fileName = $('#newFileName').val();
        if (fileName.length && fileName.trim().length) {
            let ext = $('#fileFormat').val();
            fileName = fileNameFormat(fileName);
            let cmpInfo = {
                LightningComponentBundleId: obj.id,
                Format: ext,
                FilePath: 'lwc/' + obj.folder + '/' + fileName + '.' + ext,
                Source: dummyBody[ext]
            }; //comp

            $scope.conn.tooling.sobject('LightningComponentResource').insert(cmpInfo, function (err, res) {
                if (err) {
                    apiErrorMessageShow(err);
                    return console.error(err.message);
                }

                let component = Object.assign({}, $scope.lightningWebComponents[obj.id]);
                let fileNames = fileName + '.' + ext;
                component[fileNames] = { label: obj.folder, value: { Id: res.id, FilePath: cmpInfo.FilePath, Format: cmpInfo.Format, fileFormat: $scope.formatMapping[cmpInfo.Format], fileIcon: icons[ext] } };


                $scope.lightningWebComponents[obj.id] = component;
                let data = Object.assign({}, $scope.lightningWebComponents);
                $scope.lightningWebComponents = null;
                $scope.$apply();
                $scope.lightningWebComponents = data;
                $scope.getComponent({ dataset: { id: res.id, format: cmpInfo.Format, fileName: fileNames } });
                $('#newFileName').val('');
                apiSuccessMessageShow(`${fileNames} File has been successfully created`);
                $scope.$apply();
            }); //tooling
        } //if
    } //method

    function handleFileRename(obj) {
        let fileName = $('#fileRename').val();
        if (fileName.length && fileName.trim().length) {
            fileName = fileNameFormat(fileName);
            let cmpInfo = {
                Id: obj.id,
                FilePath: 'lwc/' + obj.folder + '/' + fileName + '.' + obj.format
            };

            $scope.conn.tooling.sobject('LightningComponentResource').update(cmpInfo, function (err, res) {
                if (err) {
                    apiErrorMessageShow(err);
                    return console.error(err);
                }

                $('#fileRename').val('');
                let component = Object.assign({}, $scope.lightningWebComponents[obj.folderId]);
                let file = Object.assign({}, component[obj.fileName]);
                file.value.FilePath = cmpInfo.FilePath;
                delete component[obj.fileName];
                let label = fileName + '.' + obj.format;
                component[label] = file;
                $scope.lightningWebComponents[obj.folderId] = component;
                let data = Object.assign({}, $scope.lightningWebComponents);

                //if tab in already open file
                let index = $scope.tabList.findIndex(tab => tab.componentId === res.id);
                if (index != -1) {
                    $scope.tabList[index].label = label;
                }
                apiSuccessMessageShow(`File name was successfully changed from "${obj.fileName}" to "${label}".`);
                $scope.refresh(data);
            }); //tooling

        }
    }

    function handleDeleteFile(obj) {
        $scope.conn.tooling.sobject('LightningComponentResource').delete(obj.id, function (err, res) {
            if (err) {
                apiErrorMessageShow(err);
                return console.error(err);
            }

            let component = Object.assign({}, $scope.lightningWebComponents[obj.folderId]);
            delete component[obj.fileName];
            $scope.lightningWebComponents[obj.folderId] = component;
            let data = Object.assign({}, $scope.lightningWebComponents);
            //if tab in already open file
            apiSuccessMessageShow(obj.fileName + ' is deleted successfully.')
            $scope.removeFileFromTab(obj.id);
            $scope.refresh(data);
        }); //tooling
    }

    function getFileBackup(obj) {
        let query = `SELECT LightningComponentBundleId,FilePath,Format,source FROM LightningComponentResource WHERE Id ='${obj.id}'`;
        $scope.conn.tooling.query(query, function (err, res) {
            if (err) { return console.error(err); }
            if (res.done) {
                let fileSource = res.records[0].Source;
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileSource));
                element.setAttribute('download', obj.fileName);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
            } //if
        })
    }

    function getFullFolderBackup(componentId) {

        let query = `SELECT FilePath,Source,LightningComponentBundle.DeveloperName FROM LightningComponentResource WHERE LightningComponentBundleId = '${componentId}' AND LightningComponentBundle.ManageableState != 'installed'`;
        $scope.conn.tooling.query(query, function (err, res) {
            if (err) {
                apiErrorMessageShow(err);
                return console.error(err);
            }
            if (res.done && res.size) {
                try {
                    let fileName = res.records[0].LightningComponentBundle.DeveloperName;
                    let zip = new JSZip();
                    res.records.forEach(lwc => {
                        zip.file(lwc.FilePath, lwc.Source);
                    });
                    let content = zip.generateAsync({ type: "blob" })
                        .then(function (blob) {
                            let today = moment().format('llll').replace(/:/g, '꞉');
                            saveAs(blob, fileName + ' - ' + today + '.zip');
                        });
                } catch (error) {
                    console.log('error : ', error);
                } //try
            }
        }); //con
    }

    function deleteFolder(Id) {
        $scope.conn.tooling.sobject('LightningComponentBundle').delete(Id, {}, function (err, res) {
            if (err) {
                apiErrorMessageShow(err);
                return console.error(err);
            }
            let component = Object.assign({}, $scope.lightningWebComponents);
            let deletedComponentName = component[Id].folder;
            delete component[Id];
            let deletedOpenComponents = $scope.tabList.filter(tabs => tabs.LightningComponentBundleId === Id);
            if (deletedOpenComponents.length) {
                deletedOpenComponents.forEach(obj => {
                    $scope.removeFileFromTab(obj.componentId);
                });
            }
            apiSuccessMessageShow(`"${deletedComponentName}" component has been successfully deleted`);
            $scope.refresh(component);
        }) //tool
    }



    /************************ APEX CLSS***************************** */

    $scope.getApexClass = function (element, apexClassId) {

        let index = -1;
        if ($scope.tabList.length) {
            index = $scope.tabList.findIndex(tab => tab.componentId === apexClassId);
        } //if
        if (index != -1) {
            $scope.activeTab($scope.tabList[index].componentId);
        } else {
            $scope.loader = true;
            let apexQuery = "SELECT Id, Name, ApiVersion, Status, Body FROM ApexClass WHERE Id ='" + apexClassId + "'";
            $scope.conn.tooling.query(apexQuery, function (err, res) {
                if (err) {
                    console.log('err : ', err);
                } else if (res && res.records.length) {
                    console.log('Class : ', res.records[0]);

                    let data = res.records[0];
                    let fileSource = data.Body;
                    let LightningComponentBundleId = data.Id;
                    let folderName = 'Apex';
                    let fileName = data.Name;
                    let fileFormat = 'apex';
                    $scope.pathFolderName = folderName;
                    $scope.pathFileName = fileName + '.cls';

                    $scope.sourceCodeHolder[data.Id] = { fileSource, fileFormat };
                    $scope.tabList.map(obj => { obj.isOpenState = false });
                    $scope.tabList = [...$scope.tabList, { label: fileName + '.cls', componentId: data.Id, LightningComponentBundleId, isOpenState: true, folderName, fileName, extension: 'apex' }];

                    $scope.data[data.Id] = { model: monaco.editor.createModel(fileSource, 'apex'), state: null };
                    setEditorValue(data.Id, 'apex');
                    $scope.loader = false;
                    $scope.$apply();

                }
            }); //api
        }
    }


    function sortApexClasses(a, b) {
        // Use toUpperCase() to ignore character casing
        const bandA = a.Name.toUpperCase();
        const bandB = b.Name.toUpperCase();

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison;
    }

    $scope.findCodeInMetadata = function () {
        let scrKey = $('#findCodeInLightningComponents').val();

        if (scrKey == '' || !scrKey || scrKey.length === 0) {
            return null;
        }

        $('#searching_output').html('')
        $("#searching_loader").toggle();

        /** Get LWC ***********/
        let query = `SELECT Source, Format, LightningComponentBundle.ManageableState,LightningComponentBundle.DeveloperName FROM LightningComponentResource WHERE LightningComponentBundle.ManageableState != 'installed' AND Format IN ('html','js') ORDER BY LightningComponentBundle.DeveloperName`;
        $scope.conn.tooling.query(query, function (err, res) {
            $("#searching_loader").toggle();
            if (res && res.size > 0) {
                var strRegExPattern = '\\b' + scrKey + '\\b';
                let searchResults = res.records.filter(cmp => {
                    return (cmp.Source && cmp.Source.match(new RegExp(strRegExPattern, 'i')));
                })


                if (searchResults.length) {
                    let table = `<table class="ui celled compact teal table">
                                    <thead>
                                        <tr>
                                            <th>Component Name</th>
                                            <th>Component Type</th>
                                            <th>File Format</th>
                                        </tr>
                                    </thead>
                                    <tbody>`;

                    searchResults.forEach(x => {
                        table += `<tr>
                    <td data-label="Component Name">${x.LightningComponentBundle.DeveloperName}</td>
                    <td data-label="Component Type">LWC</td>
                    <td data-label="File Format">${x.Format.toUpperCase()}</td>
                    </tr>`;
                    });

                    table += `</tbody>
                </table>`;

                    $('#searching_output').html(table);


                } else {
                    console.log('OUTPUT : HELL', $('#searching_output'));
                    $('#searching_output').html('<div class="ui yellow message">No result found.</div>');
                    console.log('OUTPUT : HEL2L');
                }
            } else {
                $('#searching_output').html('<div class="ui red message">No Lightning Web Components available for search.</div>')
            }

        })
    }

    function createNewApexClass() {
        let apexClassName = $('#newApexClassName').val();

        if (!validateName(apexClassName)) {
            errorMessageShow('Only Alphabets, _(underscore) allowed in the apex class name');
            return;
        }

        if (apexClassName && apexClassName.trim().length) {

            $scope.loader = true;
            $scope.$apply();

            apexClassName = apexClassName.trim().replaceAll(' ', '');
            let apexBody = [
                `public class ${apexClassName} {`,
                "",
                "}"
            ].join('\n');

            $scope.conn.tooling.sobject('ApexClass').create({ body: apexBody }, function (err, res) {
                if (err) {
                    console.log(err);
                    toastMessage('error', 'Something is wrong');
                    console.log('OUTPUT : ', apexClassName);
                    errorMessageShow(err);
                    $scope.loader = false;
                    $scope.$apply();
                }
                console.log(res);
                if (res && res.success) {

                    toastMessage('success', 'Apex class successfully created');

                    let apexClassId = res.id;
                    $scope.pathFolderName = 'Apex';
                    $scope.pathFileName = apexClassName + '.cls';

                    $scope.sourceCodeHolder[apexClassId] = { fileSource: apexBody, fileFormat: 'apex' };
                    $scope.tabList.map(obj => { obj.isOpenState = false });
                    $scope.tabList = [...$scope.tabList, { label: apexClassName + '.cls', componentId: apexClassId, LightningComponentBundleId: apexClassId, isOpenState: true, folderName: 'Apex', fileName: apexClassName, extension: 'apex' }];

                    $scope.data[apexClassId] = { model: monaco.editor.createModel(apexBody, 'apex'), state: null };


                    let _ApexClasses = [...$scope.apexClasses, { Id: apexClassId, Name: apexClassName, Status: 'Active' }];
                    _ApexClasses.sort(sortApexClasses);
                    $scope.apexClasses = [..._ApexClasses];


                    setEditorValue(apexClassId, 'apex');
                    $scope.loader = false;
                    $scope.$apply();

                }

            }); //api
        } //if
    }

    function apiErrorMessageShow(err) {

        tata.error('Error', 'Please check the output console.', {
            progress: true,
            duration: 2000,
            position: 'tr',
            animate: 'slide',
            onClick: null,
            onClose: null,
            closeBtn: false
        })

        $scope.messages = [{ message: err.message, type: 'error_message', dateTime: getTodayDate() }];
        $("#dev-tool").show(500);
        $scope.loader = false;
        $scope.$apply();
    }


    function errorMessageShow(message) {
        $scope.messages = [{ message: message, type: 'error_message', dateTime: getTodayDate() }];
        $("#dev-tool").show(500);
        $scope.loader = false;
        $scope.$apply();
    }

    function apiSuccessMessageShow(message) {
        $scope.messages = [{ message, type: 'success_message', dateTime: getTodayDate() }];
        $("#dev-tool").show(500);
        $scope.loader = false;
        $scope.$apply();
    }


    function toastMessage(type, message) {
        if (type.toLowerCase() == 'error') {
            tata.error('Error', message, {
                progress: true,
                duration: 3000,
                position: 'tr',
                onClick: null,
                onClose: null,
                closeBtn: false
            });
        } else if (type.toLowerCase() == 'info') {
            tata.log('Info', message, {
                progress: true,
                duration: 5000,
                position: 'tr',
                onClick: null,
                onClose: null,
                closeBtn: false
            });
        } else {
            tata.success('Success', message, {
                progress: true,
                duration: 2000,
                position: 'tr',
                animate: 'slide',
                onClick: null,
                onClose: null,
                closeBtn: false
            });
        }
    }


    /* ------------------------------------------ Editor Function  ------------------------------------------ */

    function createEditor() { //CODE EDITOR

        require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs' } });
        window.MonacoEnvironment = { getWorkerUrl: () => proxy };
        let proxy = URL.createObjectURL(new Blob([`self.MonacoEnvironment = { baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min' };
                                                importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs/base/worker/workerMain.min.js');`], { type: 'text/javascript' }));
        require(["vs/editor/editor.main"], function () {
            /******************************** */
            try {
                // Register a completion item provider for the new language
                //HTML
                monaco.languages.registerCompletionItemProvider('html', {
                    provideCompletionItems: () => {
                        let HTML_SNIPPET = [{
                            label: 'for:each',
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: 'for:each={${1:array}}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        }, {
                            label: 'for:item',
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: 'for:item="${1:obj}"',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        }, {
                            label: 'for:index',
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: 'for:index="${1:index}"',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        }, {
                            label: 'if:true',
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: 'if:true={${1:variable}}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        }, {
                            label: 'if:false',
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: 'if:false={${1:variable}}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        }, {
                            label: 'lwc:if',
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: 'lwc:if={${1:variable}}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        }, {
                            label: 'lwc:elseif',
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: 'lwc:elseif={${1:variable}}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        }, {
                            label: 'lwc:else',
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: 'lwc:else',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        }, {
                            label: 'lwc:ref',
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: 'lwc:ref={${1:my-element}}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        }];

                        for (const key in LIGHTING_SNIPPET.HTML_FILE) {
                            if (LIGHTING_SNIPPET.HTML_FILE.hasOwnProperty(key)) {
                                const element = LIGHTING_SNIPPET.HTML_FILE[key];
                                HTML_SNIPPET.push({
                                    label: element.prefix,
                                    kind: monaco.languages.CompletionItemKind.Snippet,
                                    insertText: (typeof element.body == 'object' ? element.body.join('\n') : element.body),
                                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                    documentation: element.description
                                })
                            }
                        }
                        return { suggestions: HTML_SNIPPET };
                    }
                });
                // JAVASCRIPT
                monaco.languages.registerCompletionItemProvider('javascript', {
                    provideCompletionItems: () => {
                        let JS_SNIPPET = [];
                        for (const key in LIGHTING_SNIPPET.JAVASCRIPT_FILE) {
                            if (LIGHTING_SNIPPET.JAVASCRIPT_FILE.hasOwnProperty(key)) {
                                const element = LIGHTING_SNIPPET.JAVASCRIPT_FILE[key];
                                JS_SNIPPET.push({
                                    label: element.prefix,
                                    /*kind: monaco.languages.CompletionItemKind.Snippet,*/
                                    insertText: (typeof element.body == 'object' ? element.body.join('\n') : element.body),
                                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                    documentation: element.description
                                })
                            }
                        }
                        return { suggestions: JS_SNIPPET };
                    }
                });
                // XML
                monaco.languages.registerCompletionItemProvider('xml', {
                    provideCompletionItems: () => {
                        let XML_SNIPPET = [];
                        for (const key in LIGHTING_SNIPPET.XML_FILE) {
                            if (LIGHTING_SNIPPET.XML_FILE.hasOwnProperty(key)) {
                                const element = LIGHTING_SNIPPET.XML_FILE[key];
                                XML_SNIPPET.push({
                                    label: element.prefix,
                                    kind: monaco.languages.CompletionItemKind.Snippet,
                                    insertText: (typeof element.body == 'object' ? element.body.join('\n') : element.body),
                                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                    documentation: element.description
                                })
                            }
                        }
                        return { suggestions: XML_SNIPPET };
                    }
                }); //xml

                // JAVASCRIPT
                monaco.languages.registerCompletionItemProvider('apex', {
                    provideCompletionItems: () => {
                        let APEX_SNIPPET = [];
                        /* APEX_ANNOTATIONS */
                        LIGHTING_SNIPPET.APEX_ANNOTATIONS.forEach(obj => {
                            APEX_SNIPPET.push({
                                label: obj.label,
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: obj.insertText,
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                documentation: obj.insertTex
                            })
                        });

                        /* APEX_SNIPPET */
                        LIGHTING_SNIPPET.APEX_FILE.forEach(obj => {
                            APEX_SNIPPET.push({
                                label: obj.label,
                                /*kind: monaco.languages.CompletionItemKind.Snippet,*/
                                insertText: obj.insertText,
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                documentation: obj.insertTex
                            })
                        });
                        return { suggestions: APEX_SNIPPET };
                    }
                }); //apex


            } catch (error) {
                console.log('OUTPUT : ', error);
            }

            /* ------------------------------------------------------------- */

            $scope.codeEditor = monaco.editor.create(document.getElementById('lwc_editor'), {
                modal: null,
                value: 'Salesforce LWC Code Editor',
                theme: 'vs-light',
                minimap: {
                    enabled: false
                },
                multiCursorModifier: true,
                smoothScrolling: true,
                mouseWheelZoom: false,
                matchBrackets: true,
                "bracketPairColorization.enabled": true,
                highlightBrackets: 'always',
                bracketMatching: "always",
                guides: {
                    bracketPairs: "active"
                },
                colorDecorators: true,
                /*wordWrap: 'on'*/
                cursorBlinking: 'expand',
                automaticLayout: true, // the important part
                autoClosingBrackets: true,
                //fontLigatures: false,
                //fontFamily: "JetBrains Mono"
            });


            window.onresize = function () {
                $scope.codeEditor.layout();
            };
            $scope.codeEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function () {
                $scope.saveConfirmation();
            });

            loadThemeList();

            /*GraphQL Editor--------------------------------------------------------------------------*/
            let gqlSample = `query accounts {
                uiapi {
                    query {
                        Account {
                            edges {
                                node {
                                    Id
                                    Name { value }
                                }
                            }
                        }
                    }
                }
            }`;
            $scope.codeGraphQLEditor = monaco.editor.create(document.getElementById('grapql_editor'), {
                modal: null,
                value: gqlSample,
                theme: 'vs-light',
                language: 'graphql',
                formatOnPaste: true,
                minimap: {
                    enabled: false
                },
                multiCursorModifier: false,
                smoothScrolling: true,
                mouseWheelZoom: false,
                matchBrackets: true,
                "bracketPairColorization.enabled": true,
                highlightBrackets: 'always',
                bracketMatching: "always",
                guides: {
                    bracketPairs: "active"
                },
                colorDecorators: true,
                cursorBlinking: 'expand',
                automaticLayout: true, // the important part
                autoClosingBrackets: true,
            });

            /*GraphQL OutputEditor------------------------------------------------------------------*/
            $scope.codeGraphQLOutputEditor = monaco.editor.create(document.getElementById('grapql_output_editor'), {
                modal: null,
                value: '',
                theme: 'vs-light',
                language: 'json',
                formatOnPaste: true,
                minimap: {
                    enabled: false
                },
                multiCursorModifier: false,
                smoothScrolling: true,
                mouseWheelZoom: false,
                matchBrackets: true,
                "bracketPairColorization.enabled": true,
                highlightBrackets: 'always',
                bracketMatching: "always",
                guides: {
                    bracketPairs: "active"
                },
                readOnly: true,
                colorDecorators: true,
                cursorBlinking: 'expand',
                automaticLayout: true, // the important part
                autoClosingBrackets: true,
            });
            /*GraphQL Variable Editor------------------------------------------------------------------*/
            $scope.codeGraphQLVariableEditor = monaco.editor.create(document.getElementById('grapql_variable_editor'), {
                modal: null,
                value: '',
                theme: 'vs-light',
                language: 'json',
                formatOnPaste: true,
                minimap: {
                    enabled: false
                },
                multiCursorModifier: false,
                smoothScrolling: true,
                mouseWheelZoom: false,
                matchBrackets: true,
                highlightBrackets: 'always',
                bracketMatching: "always",
                guides: {
                    bracketPairs: "active"
                },
                colorDecorators: true,
                cursorBlinking: 'expand',
                automaticLayout: true, // the important part
                autoClosingBrackets: true,
            });
            /*-------------------------------------------------------------------------------------*/



        });
        orgConfigurationInit();
    }

    $scope.handleDocumentFormat = function () {
        $scope.codeEditor.getAction('editor.action.formatDocument').run();
    }
    $scope.handleCommandPalette = function () {
        $scope.codeEditor.getAction('editor.action.quickCommand').run();
    }

    $scope.editorZoomIn = function () {
        $scope.codeEditor.getAction('editor.action.fontZoomIn').run();
    }

    $scope.editorZoomOut = function () {
        $scope.codeEditor.getAction('editor.action.fontZoomOut').run();
    }



    $scope.handleWordWraping = function () {
        $scope.isWordWrap = !$scope.isWordWrap;
        $scope.codeEditor.updateOptions({ wordWrap: ($scope.isWordWrap ? "on" : "off") });
    }

    $scope.isActiveCompareCodeEditor = false

    $scope.handleCodeCompare = function (element) {

        /* $scope.isActiveCompareCodeEditor = false;
        if (element.classList.contains("active")) {
            element.classList.remove('active');
        } else {
            element.classList.add('active');
            $scope.isActiveCompareCodeEditor = true;
        }


        let activeIndex = $scope.tabList.findIndex(tab => tab.isOpenState);

        if (activeIndex !== -1) {

            let activeTab = $scope.tabList[activeIndex];
            console.log('activeTab : ', activeTab);
            let extension = $scope.tabList[activeIndex].extension;

            let sourceCode = $scope.data[$scope.tabList[activeIndex].componentId].model.getValue();

            $("#lwc_editor").hide();
            //$scope.codeEditor
            let originalModel = monaco.editor.createModel(sourceCode, extension);
            let modifiedModel = monaco.editor.createModel(
                'Paste your code here',
                extension
            );

            let diffEditor = monaco.editor.createDiffEditor(document.getElementById('compare_editor'), {
                // You can optionally disable the resizing
                enableSplitViewResizing: true,
                automaticLayout: true,// the important part
                originalEditable: false, // for left pane
                readOnly: false,         // for right pane
                renderSideBySide: true
            });
            diffEditor.setModel({
                original: originalModel,
                modified: modifiedModel
            });

            $("#compare_editor").show();

            diffEditor.layout();
        } */
    }

    $scope.preventDefault = function (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function createNewLightningMessageChannel() {
        let name = $('#lms_Name').val();
        let masterLabel = $('#lms_MasterLabel').val();
        let description = $('#lms_Description').val();
        let exposed = $('#lms_isExposed').val();

        var fieldsDataMap = new Map();
        $("#lmsFieldTable tbody tr").each(function () {
            $(this).find("input").each(function (index) {

                let tagName = $(this).attr("name");

                let key = $(this).attr("data-id");
                if (!fieldsDataMap.has(key)) {
                    fieldsDataMap.set(key, {});
                }

                let val = $(this).val();
                let obj = fieldsDataMap.get(key)
                obj[tagName] = ((tagName == 'fieldName') ? val : val.replaceAll(/\s/g, ''));
                fieldsDataMap.set(key, obj);
            });
        })


        let metadata = {
            masterLabel, description, isExposed: JSON.parse(exposed),
            lightningMessageFields: Array.from(fieldsDataMap.values()).filter(item => {
                return (item.fieldName != '' && item.fieldName.trim().length > 0);
            })
        }

        if (!validateName(name)) {
            errorMessageShow('Only Alphabets, _(underscore) allowed in the Lightning Message Channel name');
            return;
        }

        if (name.length && name.trim().length) {
            $scope.conn.tooling.sobject('LightningMessageChannel').insert({ FullName: name, Metadata: metadata }, function (err, res) {
                console.log('OUTPUT : ', res);
                console.log('err : ', err);

                if (err) {
                    console.log(err)
                    apiErrorMessageShow(err);
                    return console.error(err);
                }
                if (!res.success) {
                    return console.log('error');
                }
                $scope.retrieveLightningMessageChannel(null, res.id);
            })

        }
    }

    $scope.createLightningMessageChannel = function (e) {
        $('.lightningMessageChannel.modal').modal({
            onApprove: function () {
                createNewLightningMessageChannel();
            }
        }).modal('show');
    }

    $scope.createComponent = function (e) {
        $('.newComponent.modal').modal({
            onApprove: function () {
                createNewComponent();
            }
        }).modal('show');
    }

    $scope.createApexClass = function (e) {
        $('.newApexClass.modal').modal({
            onApprove: function () {
                createNewApexClass();
            }
        }).modal('show');
    }

    $scope.findStringInLWC = function (e) {
        $('.findCodeInLWC.modal').modal({
            /*  onApprove: function () {
                 findCodeInMetadata()
             } */
        }).modal('show');
    }


    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    $scope.handleGraphQLTab = function (e) {
        $("#welcome-page, #new-editor-panel,#menu-bar").hide();
        $("#grapql-editor-page").removeClass('hide');
    }

    $scope.handleGraphQLAPI = function (e) {

        let gqlQuery = $scope.codeGraphQLEditor.getValue();
        let gqlVarible = $scope.codeGraphQLVariableEditor.getValue();

        let variables = {};
        if (gqlVarible && gqlVarible != '' && isJsonString(gqlVarible)) {
            variables = JSON.parse(gqlVarible);
        }

        if (gqlQuery != null && gqlQuery.trim().length > 0) {

            $scope.loader = true;

            let host = new URL($scope.organization.url).host;
            var baseURL = host.replace(".salesforce.com", "");
            const api = new SalesforceApi($scope.organization.sid, baseURL, $q, $http);

            var graphql = JSON.stringify({
                query: gqlQuery,
                variables
            });


            api.callRestApi("/graphql", "POST", graphql).then(function (response) {
                $scope.codeGraphQLOutputEditor.getModel().setValue(JSON.stringify(response.data, null, 2));
                $scope.loader = false;
            }).catch(error => {
                console.error('Error:', error);
                $scope.loader = false;
            });
        } else {
            alert("Please write a valid query");
        }

    }



    const mergeDiffChanges = () => {
        const modifiedContent = $scope.diffCheckerEditor.getModifiedEditor().getValue();
        const originalContent = $scope.diffCheckerEditor.getOriginalEditor().getValue();


        const dmp = new diff_match_patch();
        const diffs = dmp.diff_main(originalContent, modifiedContent);
        console.log('diffs : ', diffs);
        dmp.diff_cleanupSemantic(diffs);

        // let diffLineCount = 0;
        // diffs.forEach(diff => {
        //     const [op, text] = diff;
        //     if (op === 1 /* Insertion */ || op === -1 /* Deletion */) {
        //         // Count lines in inserted or deleted text
        //         const lines = text.split('\n');
        //         diffLineCount += lines.length - 1;
        //     }
        // });

        // console.log('Number of differing lines:', diffLineCount);


    }




    const updateDiffCheckerLanguage = (language = 'text/plain') => {
        try {
            let originalCode = $scope.diffCheckerEditor.getOriginalEditor().getModel().getValue();
            let modifiedCode = $scope.diffCheckerEditor.getModifiedEditor().getModel().getValue();
            // Dispose of the existing models
            $scope.diffCheckerEditor.getOriginalEditor().getModel().dispose();
            $scope.diffCheckerEditor.getModifiedEditor().getModel().dispose();
            // Create new models with the desired language
            const originalModel = monaco.editor.createModel(originalCode, language);
            const modifiedModel = monaco.editor.createModel(modifiedCode, language);

            // Set new models for the editors
            $scope.diffCheckerEditor.setModel({
                original: originalModel,
                modified: modifiedModel
            });

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message
            })
        }
    }

    $scope.handleDiffChecker = function (e) {
        $('.ui.diffCheckerModal').modal({
            closable: false
        }).modal('show');

        $scope.diffCheckerEditor = monaco.editor.createDiffEditor(document.getElementById('diffCheckerEditor'), {
            automaticLayout: true,
            originalEditable: true,
            contextmenu: false
        });
        const originalContent = monaco.editor.createModel("", 'text/plain');
        const modifiedContent = monaco.editor.createModel("", 'text/plain');
        $scope.diffCheckerEditor.setModel({
            original: originalContent,
            modified: modifiedContent,
        });

        document.getElementById('diffCheckerLanguage').addEventListener('change', (event) => updateDiffCheckerLanguage(event.target.value));
        /* document.getElementById('mergeCodeDiff').addEventListener('click', () => mergeDiffChanges()); */
        document.getElementById('diffCheckerClose').addEventListener('click', () => {
            $scope.diffCheckerEditor.dispose();
            $('.ui.diffCheckerModal').modal('hide');
        })



    }


    $scope.handleJSONFormatter = function (e) {
        $('.ui.jsonFormatterModal').modal({
            closable: false
        }).modal('show');


        $scope.jsonFormatterEditor = monaco.editor.create(document.getElementById('jsonFormatterEditor'), {
            automaticLayout: true,
            language: "json",
            contextmenu: false,
            value: "",
        });
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
        });

        const formatJSON = (spacing = 0) => {
            try {
                const model = $scope.jsonFormatterEditor.getModel();
                const current = JSON.parse(model.getValue())
                model.setValue(JSON.stringify(current, null, spacing));
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops Invalid JSON!',
                    text: err.message
                })
            }
        }

        document.getElementById('json-minify').addEventListener('click', () => formatJSON())
        document.getElementById('json-beautify').addEventListener('click', () => formatJSON(4))
        document.getElementById('json-clear').addEventListener('click', () => {
            $scope.jsonFormatterEditor.getModel().setValue("");
        })
        document.getElementById('json-formatter-close').addEventListener('click', () => {
            $scope.jsonFormatterEditor.dispose();
            $('.ui.jsonFormatterModal').modal('hide');
        });

    }




    function handleFolderActions(action, dataset) {
        if (action == 'folder_NawFile') {
            $('.ui.newFile').modal({
                onApprove: function () {
                    handleCreateNewFile(dataset);
                }
            }).modal('show');

        } else if (action == 'folder_Download') {
            getFullFolderBackup(dataset.id);
        } else if (action == 'folder_Delete') {
            $('.ui.deleteConfirmation').modal({
                onApprove: function () {
                    deleteFolder(dataset.id);
                }
            }).modal('show');

        } else if (action == 'file_Rename') {
            $('#oldFileName').val(dataset.fileName);
            $('.ui.fileRename').modal({
                onApprove: function () {
                    handleFileRename(dataset);
                }
            }).modal('show');

        } else if (action == 'file_Download') {
            getFileBackup(dataset);

        } else if (action == 'file_Delete') {
            $('.ui.deleteConfirmation').modal({
                onApprove: function () {
                    handleDeleteFile(dataset);
                }
            }).modal('show');

        } else if (action == 'editor_theme') {
            $('.editor-themes.modal').modal({
                inverted: true,
                dimmerSettings: { opacity: 0 },
                transition: 'horizontal flip',
            }).modal('show');

        } else if (action == 'abouts') {
            $('.about.modal').modal({
                transition: 'horizontal flip',
            }).modal('show');
        }
    }

    function setEditorValue(desiredModelId, format) {
        hideWelComePage();

        let currentState = $scope.codeEditor.saveViewState();
        let currentModel = $scope.codeEditor.getModel();

        for (const id in $scope.data) {
            if (currentModel == $scope.data[id].model) {
                $scope.data[id].state = currentState;
            }
        }

        $scope.codeEditor.setModel($scope.data[desiredModelId].model);
        $scope.codeEditor.restoreViewState($scope.data[desiredModelId].state);
        //$scope.codeEditor.layout();
        $scope.codeEditor.focus();


        $scope.data[desiredModelId].model.onDidChangeContent((event) => {
            $scope.trackComponentChanges[desiredModelId] = true;
        });
        console.log('OUTPUT : ', $scope.codeEditor.getModel());
        window.setTimeout(function () {
            [...document.querySelectorAll('.tabs-container .tabs')].forEach(element => {
                if (element.classList.contains('active')) {
                    element.scrollIntoView({ block: "end", inline: "nearest" });
                }
            });
        }, 300); //setTimeOut

        $scope.loader = false;
    } //fun

    $scope.activeTab = function (id) {
        $scope.tabList.map(obj => { obj.isOpenState = (obj.componentId == id) });
        let data = $scope.sourceCodeHolder[id];
        setEditorValue(id, data.fileFormat);

        let index = $scope.tabList.findIndex(tab => tab.componentId === id);
        $scope.pathFolderName = $scope.tabList[index].folderName;
        $scope.pathFileName = $scope.tabList[index].fileName;

        [...document.querySelectorAll('.file-sections .ui.list')].forEach(element => {
            if (element.dataset.id == id) {
                element.classList.add('active');
                element.scrollIntoView({ block: "end", inline: "nearest" });
            } else {
                element.classList.remove('active');
            }
        });
    }


    $scope.handleDownloadOpenedFile = function () {
        let activeIndex = $scope.tabList.findIndex(tab => tab.isOpenState);
        if (activeIndex !== -1) {
            let activeTab = $scope.tabList[activeIndex];
            let code = $scope.data[activeTab.componentId].model.getValue();

            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
            element.setAttribute('download', activeTab.label);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    }


    $scope.removeFileFromTab = function (id) {
        let index = $scope.tabList.findIndex(obj => obj.componentId === id);
        $scope.tabList.splice(index, 1);
        if ($scope.tabList.length) {
            index = (index == 0 ? 0 : (index > 0 ? --index : ++index));
            let id = $scope.tabList[index].componentId;
            $scope.activeTab(id);
        } else {
            $scope.pathFolderName = null;
            $scope.pathFileName = null;
            clearEditor();
        }
        //$scope.$apply();
    }

    function noComponentSelectedCallback() {
        $("#welcome-page").show();
        $("#new-editor-panel,#menu-bar").hide();

        [...document.querySelectorAll('.file-sections .ui.list')].forEach(element => {
            if (element.classList.contains('active')) {
                element.classList.remove('active');
            }
        });
    }

    $scope.removeComponentFromTab = function (id) {
        if ($scope.trackComponentChanges.hasOwnProperty(id)) {

            if (window.confirm('Are you sure you want to leave this file?')) {
                delete $scope.trackComponentChanges[id];
                $scope.removeFileFromTab(id);
            }

            /* $('.ui.tabRemoveConfirmation').modal({
                onApprove: function() {
                    delete $scope.trackComponentChanges[id];
                    $scope.removeFileFromTab(id);
                }
            }).modal('show'); */
        } else {
            $scope.removeFileFromTab(id);
        }

        console.log('OUTPUT : ', $scope.tabList);
        if (!$scope.tabList.length) {
            noComponentSelectedCallback();
        }
    } //fun

    $scope.refresh = function (data) {
        $scope.lightningWebComponents = null;
        $scope.$apply();
        $scope.lightningWebComponents = data;
        $scope.$apply();
    } //fun

    function clearEditor() {
        $scope.codeEditor.setModel(null);
        $scope.codeEditor.restoreViewState(null);
        $scope.codeEditor.focus();
    } //fun

    function fileNameFormat(fileName) {
        let name = fileName = fileName[0].toLowerCase() + fileName.substring(1, fileName.length);
        name = fileName.replace(/\s+/g, '');
        return name;
    }

    const validateName = function (name) {
        var pattern = new RegExp(/^[a-z0-9_]+$/i);
        return pattern.test(name);
    }

    function showMiniMap() {
        if (window.monaco) {
            monaco.editor.defineTheme(theme, data);
        }
    }

    /* document.getElementById('editorMiniMap').addEventListener('change', function(e) {
        $scope.codeEditor.updateOptions({ minimap: { enabled: e.target.checked } });
        localStorage.setItem('editorminimap', e.target.checked); //editortheme
    });
    
    document.getElementById('themes-lang').addEventListener('change', function(ev) {
        var val = ev.target.value;
        monaco.editor.setTheme(val);
        localStorage.setItem('editortheme', val); //editortheme
    }); */

    function loadThemeList() {
        const themeMap = {
            "active4d": "Active4D",
            "all-hallows-eve": "All Hallows Eve",
            "amy": "Amy",
            "birds-of-paradise": "Birds of Paradise",
            "blackboard": "Blackboard",
            "brilliance-black": "Brilliance Black",
            "brilliance-dull": "Brilliance Dull",
            "chrome-devtools": "Chrome DevTools",
            "clouds-midnight": "Clouds Midnight",
            "clouds": "Clouds",
            "cobalt": "Cobalt",
            "cobalt2": "Cobalt2",
            "dawn": "Dawn",
            "dracula": "Dracula",
            "dreamweaver": "Dreamweaver",
            "eiffel": "Eiffel",
            "espresso-libre": "Espresso Libre",
            "github-dark": "GitHub Dark",
            "github-light": "GitHub Light",
            "github": "GitHub",
            "idle": "IDLE",
            "katzenmilch": "Katzenmilch",
            "kuroir-theme": "Kuroir Theme",
            "lazy": "LAZY",
            "magicwb--amiga-": "MagicWB (Amiga)",
            "merbivore-soft": "Merbivore Soft",
            "merbivore": "Merbivore",
            "monokai-bright": "Monokai Bright",
            "monokai": "Monokai",
            "night-owl": "Night Owl",
            "nord": "Nord",
            "oceanic-next": "Oceanic Next",
            "pastels-on-dark": "Pastels on Dark",
            "slush-and-poppies": "Slush and Poppies",
            "solarized-dark": "Solarized-dark",
            "solarized-light": "Solarized-light",
            "spacecadet": "SpaceCadet",
            "sunburst": "Sunburst",
            "textmate--mac-classic-": "Textmate (Mac Classic)",
            "tomorrow-night-blue": "Tomorrow-Night-Blue",
            "tomorrow-night-bright": "Tomorrow-Night-Bright",
            "tomorrow-night-eighties": "Tomorrow-Night-Eighties",
            "tomorrow-night": "Tomorrow-Night",
            "tomorrow": "Tomorrow",
            "twilight": "Twilight",
            "upstream-sunburst": "Upstream Sunburst",
            "vibrant-ink": "Vibrant Ink",
            "xcode-default": "Xcode_default",
            "zenburnesque": "Zenburnesque",
            "iplastic": "iPlastic",
            "idlefingers": "idleFingers",
            "krtheme": "krTheme",
            "monoindustrial": "monoindustrial"
        };

        for (let theme in themeMap) {
            if (themeMap.hasOwnProperty(theme)) {
                $.getJSON("../themes/" + themeMap[theme] + ".json", function (data) {
                    if (window.monaco) {
                        monaco.editor.defineTheme(theme, data);
                    }
                }).fail(function () {
                    console.log("An error has occurred.");
                });
            }
        }
        userSelectedThemes();
    }

    function userSelectedThemes() {
        const editorTheme = localStorage.getItem('editortheme') ? localStorage.getItem('editortheme') : null;
        const editorMinimap = (localStorage.getItem('editorminimap') == 'true');
        if (window.monaco) {
            setTimeout(() => {
                $scope.codeEditor.updateOptions({ minimap: { enabled: editorMinimap } });
            }, 1000);

            if (editorTheme) {
                setTimeout(() => {
                    monaco.editor.setTheme(editorTheme);
                    $('select[name^="editor-themes-lang"] option[value="' + editorTheme + '"]').attr("selected", "selected");
                }, 1000);
            } //if
        } //if

    }

    function closeLoder() {
        $scope.loader = false;
        $scope.$apply();

        Swal.fire(
            'Oops...',
            'Maybe there is some uncommitted work pending. Please Please wait for commit response or wait before calling out.',
            'question'
        )
    }

    //New
    $(document).keydown(function (event) {
        if (event.ctrlKey && (event.which == 78 || event.key.toLowerCase() == 'n')) {
            event.preventDefault();
            $('.newComponent.modal').modal({
                onApprove: function () {
                    createNewComponent();
                }
            }).modal('show');
            return false;
        } else if (event.ctrlKey && (event.which == 81 || event.key.toLowerCase() == 'q')) {
            closeLoder()
        }

    });

    function hideWelComePage() {
        $("#grapql-editor-page").addClass('hide');
        $("#welcome-page").hide();
        $("#new-editor-panel,#menu-bar").show();
    }

    function contextMenus() {
        try {
            const editorTheme = localStorage.getItem('editortheme') ? localStorage.getItem('editortheme') : 'vs';
            const editorMinimap = (localStorage.getItem('editorminimap') == 'true');
            if (window.monaco) {
                setTimeout(() => {
                    $scope.codeEditor.updateOptions({ minimap: { enabled: editorMinimap } });
                }, 1000);

                if (editorTheme && editorTheme != 'vs') {
                    setTimeout(() => {
                        monaco.editor.setTheme(editorTheme);
                        $('select[name^="editor-themes-lang"] option[value="' + editorTheme + '"]').attr("selected", "selected");
                    }, 1000);
                } //if
            } //if

            //Editor Settings
            $.contextMenu({
                selector: '#editor-setting',
                trigger: 'left',
                callback: function (key, options) {
                    //handleFolderActions(key, null);
                },
                items: {
                    "editor_theme": {
                        name: "Color Theme",
                        type: "select",
                        selected: editorTheme,
                        options: {
                            "vs": "Default - Light",
                            "vs-dark": "Default - Dark",
                            "hc-black": "High Contrast - Black",
                            "active4d": "Active4D",
                            "all-hallows-eve": "All Hallows Eve",
                            "amy": "Amy",
                            "birds-of-paradise": "Birds of Paradise",
                            "blackboard": "Blackboard",
                            "brilliance-black": "Brilliance Black",
                            "brilliance-dull": "Brilliance Dull",
                            "chrome-devtools": "Chrome DevTools",
                            "clouds-midnight": "Clouds Midnight",
                            "clouds": "Clouds",
                            "cobalt": "Cobalt",
                            "cobalt2": "Cobalt2",
                            "dawn": "Dawn",
                            "dracula": "Dracula",
                            "dreamweaver": "Dreamweaver",
                            "eiffel": "Eiffel",
                            "espresso-libre": "Espresso Libre",
                            "github-dark": "GitHub Dark",
                            "github-light": "GitHub Light",
                            "github": "GitHub",
                            "idle": "IDLE",
                            "katzenmilch": "Katzenmilch",
                            "kuroir-theme": "Kuroir Theme",
                            "lazy": "LAZY",
                            "magicwb--amiga-": "MagicWB (Amiga)",
                            "merbivore-soft": "Merbivore Soft",
                            "merbivore": "Merbivore",
                            "monokai-bright": "Monokai Bright",
                            "monokai": "Monokai",
                            "night-owl": "Night Owl",
                            "nord": "Nord",
                            "oceanic-next": "Oceanic Next",
                            "pastels-on-dark": "Pastels on Dark",
                            "slush-and-poppies": "Slush and Poppies",
                            "solarized-dark": "Solarized-dark",
                            "solarized-light": "Solarized-light",
                            "spacecadet": "SpaceCadet",
                            "sunburst": "Sunburst",
                            "textmate--mac-classic-": "Textmate (Mac Classic)",
                            "tomorrow-night-blue": "Tomorrow-Night-Blue",
                            "tomorrow-night-bright": "Tomorrow-Night-Bright",
                            "tomorrow-night-eighties": "Tomorrow-Night-Eighties",
                            "tomorrow-night": "Tomorrow-Night",
                            "tomorrow": "Tomorrow",
                            "twilight": "Twilight",
                            "upstream-sunburst": "Upstream Sunburst",
                            "vibrant-ink": "Vibrant Ink",
                            "xcode-default": "Xcode_default",
                            "zenburnesque": "Zenburnesque",
                            "iplastic": "iPlastic",
                            "idlefingers": "idleFingers",
                            "krtheme": "krTheme",
                            "monoindustrial": "monoindustrial"
                        },
                        events: {
                            change: function (e) {
                                let theme = $(e.target).find(":selected").val();
                                monaco.editor.setTheme(theme);
                                localStorage.setItem('editortheme', theme); //editortheme
                            }
                        }
                    },
                    "sep1": "---------",
                    'editor_minmap': {
                        name: "Show Minimap",
                        type: "checkbox",
                        selected: editorMinimap,
                        events: {
                            click: function (e) {
                                let isShow = $(this).prop('checked');
                                $scope.codeEditor.updateOptions({ minimap: { enabled: isShow } });
                                localStorage.setItem('editorminimap', isShow); //editortheme
                            }
                        }
                    }
                }
            });

            //Folder Settings
            $.contextMenu({
                selector: '.context-menu-folder',
                trigger: 'right',
                callback: function (key, options) {
                    handleFolderActions(key, $(this).data());
                },
                items: {
                    "folder_NawFile": { name: "New File" },
                    "folder_Download": { name: "Download" },
                    "sep1": "---------",
                    'folder_Delete': { name: "Delete" }
                }
            });


            //File Settings
            $.contextMenu({
                selector: '.context-menu-file',
                trigger: 'right',
                callback: function (key, options) {
                    handleFolderActions(key, $(this).data());
                },
                items: {
                    "file_Rename": { name: "Rename" },
                    "file_Download": { name: "Download" },
                    "sep1": "---------",
                    'file_Delete': { name: "Delete" }
                }
            });
        } catch (error) {
            console.log('ERROR CTX : ', error);
        }
    } //cntext


    function jQueryCustomFunction() {

        $('#vertical-divider').mousedown(function (e) {
            var min = 100;
            var max = 400;
            var mainmin = 255;
            e.preventDefault();
            $(document).mousemove(function (e) {
                e.preventDefault();
                var x = e.pageX - $('#sidebar-panel').offset().left;
                if (x > min && x < max && e.pageX < ($(window).width() - mainmin)) {
                    $('#sidebar-panel').css("width", x);
                    let leftSide = ($('#sidebar-panel').width() + $('#sidebar-panel').offset().left);
                    $('#new-editor-panel').css("left", leftSide);
                    $('#new-editor-panel').css("width", 'calc(100% - ' + leftSide + 'px)');
                    $('.folder-names').css("width", (x - 45));
                    $('.filesNames').css("width", (x - 60));
                    $scope.codeEditor.layout();
                }
            })
        });

        var isActive = true;
        $("#toggleFolderTreeCiew").click(function () {
            $("#sidebar-panel").toggle();
            $(this).toggleClass('active-side-panel');
            if (isActive) {
                $('#new-editor-panel').css("left", 48);
                $('#new-editor-panel').css("width", 'calc(100% - 48px)');
            } else {
                let leftSide = ($('#sidebar-panel').width() + $('#sidebar-panel').offset().left);
                $('#new-editor-panel').css("left", leftSide);
                $('#new-editor-panel').css("width", 'calc(100% - ' + leftSide + 'px)');
            }
            $scope.codeEditor.layout();
            isActive = !isActive;
        });

    }


    init();
    jQueryCustomFunction();

});