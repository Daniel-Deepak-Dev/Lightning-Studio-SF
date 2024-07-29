/**
 * Created by nisarahmad.ajmer@gmail.com on March 8,2020.
 */


/* SHow Message alert */

function showErrorMessage(msg) {
    $.uiAlert({ textHead: "Error", text: msg, bgcolor: '#DB2828', textcolor: '#fff', position: 'top-right', icon: 'remove circle', time: 10, })
}

function showWarningMessage(msg) {
    $.uiAlert({ textHead: 'Warning', text: msg, bgcolor: '#F2711C', textcolor: '#fff', position: 'top-right', icon: 'warning sign', time: 10, })
}

function showInfoMessage(msg) {
    $.uiAlert({ textHead: 'Information', text: msg, bgcolor: '#55a9ee', textcolor: '#fff', position: 'top-right', icon: 'info circle', time: 5, })
}

function showSuccessMessage(msg) {
    $.uiAlert({ textHead: 'Success', text: msg, bgcolor: '#19c3aa', textcolor: '#fff', position: 'top-right', icon: 'checkmark box', time: 5, })
}
/* ============================= jQuery ======================================= */

//document.addEventListener('contextmenu', event => event.preventDefault());

/* ------------------------------------------- SNIPPET -------------------------------------------  */


const HTML_FILE = {
    "LWC forEach": {
        "prefix": "lightning-forEach",
        "body": [
            "<template if:true={${1:contactsList}} for:each={${1:contactsList}} for:item=\"con\" for:index=\"index\">",
            "   <li key={con.Id}>",
            "        {con.Name}",
            "   </li>",
            "</template>"
        ],
        "description": "LWC forEach"
    },

    "LWC iterator": {
        "prefix": "lightning-iterator",
        "body": [
            "<template if:true={${1:contacts}} iterator:${2:iteratorName}={${1:contacts}}>",
            "    <li key={${2:iteratorName}.value.Id}>",
            "        <div if:true={${2:iteratorName}.first} class=\"list-first\"></div>",
            "            <!--{iteratorName.index} || {iteratorName.value.propertyName}-->",
            "            {${2:iteratorName}.value.Name}",
            "        <div if:true={${2:iteratorName}.last} class=\"list-last\"></div>",
            "    </li>",
            "</template>"
        ],
        "description": "LWC iterator"
    },
    "LWC modal": {
        "prefix": "lightning-modal",
        "body": [
            '<template>',
            '\t<lightning-modal-header label="My Modal Heading"></lightning-modal-header>',
            '\t\t<lightning-modal-body>',
            '\t\t\t<!-- Body here -->',
            '\t\t</lightning-modal-body>',
            '\t\t<lightning-modal-footer>',
            '\t\t\t<!-- Footer here --> ',
            '\t</lightning-modal-footer>',
            '</template>'
        ],
        "description": "LWC modal"
    },

    "LWC elseif": {
        "prefix": "lwc-elseif",
        "body": [
            "<template lwc:if={${1:property1}}>",
            "\tStatement1",
            "</template>",
            "<template lwc:elseif={${1:property2}}>",
            "\tStatement2",
            "</template>",
            "<template lwc:else>",
            "\tStatement3",
            "</template>"
        ],
        "description": "LWC elseif"
    },

    "lightning-accordion": {
        "prefix": "lightning-accordion",
        "body": [
            "<lightning-accordion allow-multiple-sections-open active-section-name=\"A\" onsectiontoggle={${1:handleSectionToggle}} >",
            "\t<lightning-accordion-section name=\"A\" label=\"Accordion Title A\">",
            "\t\t<p>This is the content area for section A.</p>",
            "\t</lightning-accordion-section>",
            "\t<lightning-accordion-section name=\"B\" label=\"Accordion Title B\">",
            "\t\t<p>This is the content area for section B.</p>",
            "\t</lightning-accordion-section>",
            "\t<lightning-accordion-section name=\"C\" label=\"Accordion Title C\">",
            "\t\t<p>This is the content area for section C.</p>",
            "\t</lightning-accordion-section>",
            "</lightning-accordion>"
        ],
        "description": "lightning-accordion"
    },
    "lightning-accordion-section": {
        "prefix": "lightning-accordion-section",
        "body": [
            "<lightning-accordion active-section-name=\"A\">",
            "\t<lightning-accordion-section name=\"A\" label=\"Accordion Title A\">",
            "\t\t<lightning-button-menu slot=\"actions\" alternative-text=\"Show menu\" icon-size=\"x-small\" menu-alignment=\"auto\">",
            "\t\t\t<lightning-menu-item value=\"New\" label=\"Menu Item One\"></lightning-menu-item>",
            "\t\t\t<lightning-menu-item value=\"Edit\" label=\"Menu Item Two\"></lightning-menu-item>",
            "\t\t</lightning-button-menu>",
            "\t\t<p>This is the content area for section A.</p>",
            "\t</lightning-accordion-section>",
            "</lightning-accordion>"
        ],
        "description": "lightning-accordion-section"
    },
    "lightning-avatar": {
        "prefix": "lightning-avatar",
        "body": [
            "<lightning-avatar src=\"${1:https://www.lightningdesignsystem.com/assets/images/avatar2.jpg}\"></lightning-avatar><!-- Basic -->",
            "<lightning-avatar size=\"medium\" src=\"${1:https://www.lightningdesignsystem.com/assets/images/avatar2.jpg}\" initials=\"JD\" fallback-icon-name=\"standard:person_account\" ></lightning-avatar><!-- Avatar Sizes -->",
            "<lightning-avatar variant=\"circle\" src=\"${1:https://www.lightningdesignsystem.com/assets/images/avatar2.jpg}\" initials=\"AW\" fallback-icon-name=\"standard:person_account\"></lightning-avatar><!-- Avatar Variants -->",
            "<lightning-avatar src=\"${1:/bad/image/url.jpg}\" initials=\"Sa\" fallback-icon-name=\"standard:account\" alternative-text=\"Salesforce\" ></lightning-avatar><!-- Avatar Initials -->",
            "<lightning-avatar src=\"${1:/bad/image/url.jpg}\" initials=\"\" fallback-icon-name=\"standard:account\" alternative-text=\"Salesforce\"></lightning-avatar><!-- Avatar Icons -->"
        ],
        "description": "lightning-avatar"
    },
    "lightning-badge": {
        "prefix": "lightning-badge",
        "body": ["<lightning-badge label=\"${1:Alpha}\"></lightning-badge>"],
        "description": "lightning-badge"
    },
    "lightning-breadcrumb": {
        "prefix": "lightning-breadcrumb",
        "body": [
            "<lightning-breadcrumbs>",
            "\t<lightning-breadcrumb",
            "\t\tlabel=\"Parent Account\"",
            "\t\thref=\"path/to/place/1\"",
            "\t\tonclick={${1:handleNavigateToCustomPage1}}>",
            "\t</lightning-breadcrumb>",
            "\t<lightning-breadcrumb",
            "\t\tlabel=\"Case\"",
            "\t\thref=\"path/to/place/2\"",
            "\t\tonclick={${1:handleNavigateToCustomPage2}}>",
            "\t</lightning-breadcrumb>",
            "</lightning-breadcrumbs>"
        ],
        "description": "lightning-breadcrumb"
    },

    "lightning-button": {
        "prefix": "lightning-button",
        "body": [
            "<lightning-button variant=\"${1|base,neutral,brand,destructive,success,inverse|}\" label=\"${2:labelName}\" title=\"${3:titleName}\" onclick={${4:handleClick}}></lightning-button>"
        ],
        "description": "lightning-button"
    },
    "lightning-button-group": {
        "prefix": "lightning-button-group",
        "body": [
            "<lightning-button-group>",
            "\t<lightning-button label=\"${1:Refresh}\"></lightning-button>",
            "\t<lightning-button label=\"${2:Edit}\"></lightning-button>",
            "\t<lightning-button label=\"${3:Save}\"></lightning-button>",
            "</lightning-button-group>"
        ],
        "description": "lightning-button-group"
    },

    "lightning-button-icon": {
        "prefix": "lightning-button-icon",
        "body": [
            "<lightning-button-icon variant=\"${1|base,container,border-filled,border-inverse,bare-inverse|}\" size=\"${2|xx-small,x-small,small,medium,large|}\" icon-name=\"${3:utility:down}\" alternative-text=\"${4:opne}\"></lightning-button-icon>"
        ],
        "description": "lightning-button-icon"
    },

    "lightning-button-icon-stateful": {
        "prefix": "lightning-button-icon-stateful",
        "body": [
            "<lightning-button-icon-stateful icon-name=\"${1:utility:like}\" selected={likeState} onclick={handleLikeButtonClick} alternative-text=\"Like\"></lightning-button-icon-stateful>"
        ],
        "description": "lightning-button-icon-stateful"
    },
    "lightning-button-menu-1": {
        "prefix": "lightning-button-menu",
        "body": [
            "<lightning-button-menu alternative-text=\"Show menu\">",
            "\t<lightning-menu-item value=\"MenuItemOne\" label=\"Menu Item One\"></lightning-menu-item>",
            "\t<lightning-menu-item value=\"MenuItemTwo\" label=\"Menu Item Two\"></lightning-menu-item>",
            "\t<lightning-menu-item value=\"MenuItemThree\" label=\"Menu Item Three\"></lightning-menu-item>",
            "</lightning-button-menu>"
        ],
        "description": "lightning-button-menu"
    },
    "lightning-button-menu-2": {
        "prefix": "lightning-button-menu-with-icon",
        "body": [
            "<lightning-button-menu alternative-text=\"Show menu\" variant=\"border-filled\" icon-name=\"utility:settings\">",
            "\t<lightning-menu-item value=\"MenuItemOne\" label=\"Menu Item One\"></lightning-menu-item>",
            "\t<lightning-menu-item value=\"MenuItemTwo\" label=\"Menu Item Two\"></lightning-menu-item>",
            "\t<lightning-menu-item value=\"MenuItemThree\" label=\"Menu Item Three\"></lightning-menu-item>",
            "</lightning-button-menu>"
        ],
        "description": "lightning-button-menu"
    },
    "lightning-button-stateful": {
        "prefix": "lightning-button-stateful",
        "body": [
            "<lightning-button-stateful",
            "\tlabel-when-off=\"Follow\"",
            "\tlabel-when-on=\"Following\"",
            "\tlabel-when-hover=\"Unfollow\"",
            "\ticon-name-when-off=\"utility:add\"",
            "\ticon-name-when-on=\"utility:check\"",
            "\ticon-name-when-hover=\"utility:close\"",
            "\tselected={isSelected}",
            "\tonclick={handleClick}>",
            "</lightning-button-stateful>"
        ],
        "description": "lightning-button-stateful"
    },
    "lightning-card-2": {
        "prefix": "lightning-card",
        "body": [
            "<lightning-card  variant=\"Narrow\"  title=\"Hello\" icon-name=\"standard:account\">",
            "\t<lightning-button-icon  icon-name=\"utility:down\" variant=\"border-filled\" alternative-text=\"Show More\" slot=\"actions\"></lightning-button-icon>",
            "\t<p class=\"slds-p-horizontal_small\">Card Body Narrow (custom component)</p>",
            "\t<p slot=\"footer\">Card Footer</p>",
            "</lightning-card>"
        ],
        "description": "lightning-card"
    },
    "lightning-checkbox-group": {
        "prefix": "lightning-checkbox-group",
        "body": [
            "<lightning-checkbox-group ",
            "\tname=\"Checkbox Group\"",
            "\tlabel=\"Checkbox Group\"",
            "\toptions={${1:options}}",
            "\tvalue={$2value}",
            "\tonchange={$3handleChange}>",
            "</lightning-checkbox-group>"
        ],
        "description": "lightning-checkbox-group"
    },
    "lightning-radio-group": {
        "prefix": "lightning-radio-group",
        "body": [
            "<lightning-radio-group ",
            "name=\"radioGroup\"",
            "label=\"Radio Group\"",
            "options={${1:options}}",
            "value={value}",
            "type=\"radio\">",
            "</lightning-radio-group>"
        ],
        "description": "lightning-radio-group"
    },
    "lightning-combobox": {
        "prefix": "lightning-combobox",
        "body": [
            "<lightning-combobox",
            "\tname=\"progress\"",
            "\tlabel=\"Status\"",
            "\tvalue={$3value}",
            "\tplaceholder=\"Select Progress\"",
            "\toptions={${1:options}}",
            "\tonchange={${2:handleChange}} ></lightning-combobox>"
        ],
        "description": "lightning-combobox"
    },
    "lightning-datatable": {
        "prefix": "lightning-datatable",
        "body": [
            "<lightning-datatable",
            "\tkey-field=\"id\"",
            "\tdata={${1:dataList}}",
            "\tshow-row-number-column",
            "\trow-number-offset={${2:rowOffset}}",
            "\thide-checkbox-column",
            "\tcolumns={${3:columnsList}}",
            "\tonrowaction={${4:handleRowAction}}>",
            "</lightning-datatable>"
        ],
        "description": "lightning-datatable"
    },
    "lightning-file-upload": {
        "prefix": "lightning-file-upload",
        "body": [
            "<lightning-file-upload",
            "\tlabel=\"Attach receipt\"",
            "\tname=\"fileUploader\"",
            "\taccept=\".csv,.doc,.xsl,.pdf\"",
            "\trecord-id=\"${1:XXXXXXXX98766}\"",
            "\tonuploadfinished={${2:handleUploadFinished}}",
            "\tmultiple>",
            "</lightning-file-upload>"
        ],
        "description": "lightning-file-upload"
    },
    "lightning-helptext": {
        "prefix": "lightning-helptext",
        "body": [
            "<lightning-helptext content=\"${1:The tooltip displays on the lower left of the icon or above the icon if space is available. It automatically adjusts its position according to the viewport.}\"></lightning-helptext> "
        ],
        "description": "lightning-helptext"
    },
    "lightning-icon": {
        "prefix": "lightning-icon",
        "body": [
            "<lightning-icon icon-name=\"${1:doctype:image}\" alternative-text=\"Doc image\" ></lightning-icon>",
            "<!--More icon please visit : https://www.lightningdesignsystem.com/icons/ -->"
        ],
        "description": "lightning-icon"
    },

    "lightning-input": {
        "prefix": "lightning-input",
        "body": [
            "<lightning-input type=\"${1|text,date,datetime,time,color,file,password,tel,url,number,checkbox,checkbox-button,toggle,search|}\" variant=\"${2|standard,label-inline,label-hidden,label-stacked|}\" name=\"${3:name}\" label=\"${4:label}\" placeholder=\"${5:type here...}\"></lightning-input>"
        ],
        "description": "lightning-input"
    },

    "lightning-input-address": {
        "prefix": "lightning-input-address",
        "body": [
            "<lightning-input-address",
            "\taddress-label=\"${1:Address}\"",
            "\tstreet-label=\"${2:Street}\"",
            "\tcity-label=\"${3:City}\"",
            "\tcountry-label=\"${4:Country}\"",
            "\tprovince-label=\"${5:Province}\"",
            "\tpostal-code-label=\"${6:PostalCode}\"",
            "\tstreet=\"${7:121 Spear St.}\"",
            "\tcity=\"${8:San Francisco}\"",
            "\tcountry=\"${9:US}\"",
            "\tprovince=\"${10:CA}\"",
            "\tpostal-code=\"${11:94105}\"",
            "\trequired",
            "\tfield-level-help=\"${12:Help Text for inputAddress field}\" ></lightning-input-address>"
        ],
        "description": "lightning-input-address"
    },
    "lightning-input-location": {
        "prefix": "lightning-input-location",
        "body": [
            "<lightning-input-location label=\"${1:No default coordinates}\" latitude=\"-15.1234\" longitude=\"99.5517\"></lightning-input-location>"
        ],
        "description": "lightning-input-location"
    },
    "lightning-input-name": {
        "prefix": "lightning-input-name",
        "body": [
            "<lightning-input-name",
            "\tlabel=\"${1:Default Input Name Field}\"",
            "\tfirst-name=\"$2John\"",
            "\tmiddle-name=\"$3Middleton\"",
            "\tlast-name=\"$4Doe\"",
            "\tinformal-name=\"$5Jo\"",
            "\tsuffix=\"$6The 3rd\"",
            "\tsalutation=\"$7Mr.\"",
            "\toptions={salutationOptions} ></lightning-input-name>"
        ],
        "description": "lightning-input-name"
    },
    "lightning-input-rich-text": {
        "prefix": "lightning-rich-text-area",
        "body": [
            "<lightning-input-rich-text ",
            "placeholder=\"${1:Type something interesting}\"",
            "value={$2myVal}",
            "formats={$3formats}>",
            "</lightning-input-rich-text>"
        ],
        "description": "lightning-input-rich-text"
    },
    "lightning-textarea": {
        "prefix": "lightning-textarea",
        "body": [
            "<lightning-textarea name=\"${1:inputname}\" label=\"Enter some text\" placeholder=\"type here...\" value=\"\"></lightning-textarea>"
        ],
        "description": "lightning-textarea"
    },
    "lightning-layout": {
        "prefix": "lightning-layout",
        "body": [
            "<lightning-layout multiple-rows>",
            "\t<lightning-layout-item size=\"12\" padding=\"${1|around-small,around-medium,around-large,horizontal-small,horizontal-medium,horizontal-large|}\" small-device-size=\"3\" medium-device-size=\"6\" large-device-size=\"3\" >",
            "\t\t<div class=\"custom-box\">1</div>",
            "\t</lightning-layout-item>",
            "\t<lightning-layout-item size=\"12\" padding=\"around-small\" small-device-size=\"3\" medium-device-size=\"6\" large-device-size=\"3\">",
            "\t\t<div class=\"custom-box\">2</div>",
            "\t</lightning-layout-item>",
            "\t<lightning-layout-item size=\"12\" padding=\"around-small\" small-device-size=\"3\" medium-device-size=\"6\" large-device-size=\"3\">",
            "\t\t<div class=\"custom-box\">3</div>",
            "\t</lightning-layout-item>",
            "\t<lightning-layout-item size=\"12\" padding=\"around-small\" small-device-size=\"3\" medium-device-size=\"6\" large-device-size=\"3\">",
            "\t\t<div class=\"custom-box\">4</div>",
            "\t</lightning-layout-item>",
            "</lightning-layout>"
        ],
        "description": "lightning-layout"
    },
    "lightning-pill": {
        "prefix": "lightning-pill",
        "body": [
            "<lightning-pill label=\"${1:With only remove handler}\" onremove={$2handleRemove}></lightning-pill>"
        ],
        "description": "lightning-pill"
    },
    "lightning-record-edit-form": {
        "prefix": "lightning-record-edit-form",
        "body": [
            "<lightning-record-edit-form id=\"recordViewForm\"",
            "\t\t\trecord-id=\"${1:003R00000000000000}\"",
            "\t\t\trecord-type-id=\"012R00000000000000\"",
            "\t\t\tobject-api-name=\"Contact\">",
            "\t<lightning-messages></lightning-messages>",
            "\t<lightning-input-field field-name=\"FirstName\"></lightning-input-field>",
            "\t<lightning-input-field field-name=\"LastName\"></lightning-input-field>",
            "\t<lightning-input-field field-name=\"Birthdate\"></lightning-input-field>",
            "\t<lightning-input-field field-name=\"Phone\"></lightning-input-field>",
            "\t<!--Picklist-->",
            "\t<lightning-input-field field-name=\"Level__c\"></lightning-input-field>",
            "\t<!-- submit -->",
            "\t<lightning-button type=\"submit\" label=\"Update record\"></lightning-button>",
            "</lightning-record-edit-form>"
        ],
        "description": "lightning-record-edit-form"
    },
    " lightning-record-view-form": {
        "prefix": "lightning-record-view-form",
        "body": [
            "<lightning-record-view-form",
            "\t\t\trecord-id=\"${1:001XXXXXXXXXXXXXXX}\"",
            "\t\t\tobject-api-name=\"$2Contact\">",
            "\t<div class=\"slds-box slds-theme_default\">",
            "\t\t<lightning-output-field field-name=\"Name\"></lightning-output-field>",
            "\t\t<lightning-output-field field-name=\"Phone\"></lightning-output-field>",
            "\t\t<lightning-output-field field-name=\"Email\"></lightning-output-field>",
            "\t\t<lightning-output-field field-name=\"Birthdate\"></lightning-output-field>",
            "\t\t<lightning-output-field field-name=\"LeadSource\"></lightning-output-field>",
            "\t</div>",
            "</lightning-record-view-form>"
        ],
        "description": " lightning-record-view-form"
    },
    "lightning-progress-indicator": {
        "prefix": "lightning-progress-indicator",
        "body": [
            "<lightning-progress-indicator current-step=\"3\" type=\"${1|base,path|}\" has-error=\"true\" variant=\"base\">",
            "\t<lightning-progress-step label=\"Step 1\" value=\"1\"></lightning-progress-step>",
            "\t<lightning-progress-step label=\"Step 2\" value=\"2\"></lightning-progress-step>",
            "\t<lightning-progress-step label=\"Step 3\" value=\"3\"></lightning-progress-step>",
            "\t<lightning-progress-step label=\"Step 4\" value=\"4\"></lightning-progress-step>",
            "</lightning-progress-indicator>"
        ],
        "description": "lightning-progress-indicator"
    },

    "lightning-slider": {
        "prefix": "lightning-slider",
        "body": [
            "<lightning-slider label=\"Volume\" value=\"40\"></lightning-slider>",
            "<!-- <lightning-slider label=\"Volume\" value=\"40\" type=\"vertical\" size=\"small\" variant=\"label-hidden\"></lightning-slider> -->"
        ],
        "description": "lightning-slider"
    },
    "lightning-spinner": {
        "prefix": "lightning-spinner",
        "body": [
            "<lightning-spinner alternative-text=\"Loading\" size=\"large\"></lightning-spinner>"
        ],
        "description": "lightning-spinner"
    },

    "lightning-tabset": {
        "prefix": "lightning-tabset",
        "body": [
            "<lightning-tabset variant=\"${1|standard,scoped,vertical|}\" active-tab-value=\"${2:two}\">",
            "\t<lightning-tab label=\"Item One\" value=\"one\">",
            "\t\tOne Content !",
            "\t</lightning-tab>",
            "\t<lightning-tab label=\"Item Two\" value=\"two\">",
            "\t\tTwo Content !",
            "\t</lightning-tab>",
            "\t<lightning-tab label=\"Item Three\" value=\"three\">",
            "\t\tThree Content !",
            "\t</lightning-tab>",
            "</lightning-tabset>"
        ],
        "description": "lightning-tabset"
    },

    "lightning-vertical-navigation": {
        "prefix": "lightning-vertical-navigation",
        "body": [
            "<lightning-vertical-navigation>",
            "\t<lightning-vertical-navigation-section label=\"Reports\">",
            "\t\t<lightning-vertical-navigation-item label=\"Recent\" name=\"recent\"></lightning-vertical-navigation-item>",
            "\t\t<lightning-vertical-navigation-item label=\"Created by Me\" name=\"created\"></lightning-vertical-navigation-item>",
            "\t\t<lightning-vertical-navigation-item label=\"Private Reports\" name=\"private\"></lightning-vertical-navigation-item>",
            "\t\t<lightning-vertical-navigation-item label=\"Public Reports\" name=\"public\"></lightning-vertical-navigation-item>",
            "\t\t<lightning-vertical-navigation-item label=\"All Reports\" name=\"all\"></lightning-vertical-navigation-item>",
            "\t</lightning-vertical-navigation-section>",
            "</lightning-vertical-navigation>"
        ],
        "description": "lightning-vertical-navigation"
    },
    "lightning-dual-listbox": {
        "prefix": "lightning-dual-listbox",
        "body": [
            "<lightning-dual-listbox ",
            "\tname=\"${1:languages}\"",
            "\tlabel=\"Select Languages\"",
            "\tsource-label=\"Available\"",
            "\tselected-label=\"Selected\"",
            "\tfield-level-help=\"This is a dual listbox\"",
            "\toptions={options}",
            "\tonchange={handleChange}>",
            "</lightning-dual-listbox>"
        ],
        "description": "lightning-dual-listbox"
    },

    "SLDS Modal": {
        "prefix": "slds:modal",
        "body": [
            "<div class=\"custom-modal\">",
            "\t<section role=\"dialog\" class=\"slds-modal slds-fade-in-open\">",
            "\t\t<div class=\"slds-modal__container\">",
            "\t\t\t<header class=\"slds-modal__header\">",
            "\t\t\t\t<span class=\"slds-modal__close\">",
            "\t\t\t\t\t<lightning-icon icon-name=\"utility:close\" variant=\"inverse\" alternative-text=\"close\"></lightning-icon>",
            "\t\t\t\t</span>",
            "\t\t\t\t<h2 class=\"slds-text-heading_medium slds-hyphenate\">${1:Modal Header}</h2>",
            "\t\t\t</header>",
            "\t\t\t<div class=\"slds-modal__content slds-p-around_medium\">",
            "\t\t\t\t$2<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>",
            "\t\t\t</div>",
            "\t\t\t<footer class=\"slds-modal__footer\">",
            "\t\t\t\t<lightning-button label=\"Cancel\" title=\"Cancel\" class=\"slds-m-right_small\"></lightning-button>",
            "\t\t\t\t<lightning-button variant=\"brand\" label=\"Save\" title=\"Save\"></lightning-button>",
            "\t\t\t</footer>",
            "\t\t</div>",
            "\t</section>",
            "\t<div class=\"slds-backdrop slds-backdrop_open\"></div>",
            "</div>"
        ],
        "description": "SLDS Modal"
    },

    "SLDS Select": {
        "prefix": "slds:select",
        "body": [
            "<div class=\"slds-form-element\">",
            "\t<label class=\"slds-form-element__label\">${1:Select Label}</label>",
            "\t<div class=\"slds-form-element__control\">",
            "\t\t<div class=\"slds-select_container\">",
            "\t\t\t<select class=\"slds-select\">",
            "\t\t\t\t<option value=\"\">Please select</option>",
            "\t\t\t\t<option>Option One</option>",
            "\t\t\t\t<option>Option Two</option>",
            "\t\t\t\t<option>Option Three</option>$2",
            "\t\t\t</select>",
            "\t\t</div>",
            "\t</div>",
            "</div>"
        ],
        "description": "SLDS Select"
    },

    "SLDS Table": {
        "prefix": "slds:table",
        "body": [
            "<table class=\"slds-table slds-table_cell-buffer slds-table_bordered\">",
            "\t<thead>",
            "\t\t<tr class=\"slds-line-height_reset\">",
            "\t\t\t<th scope=\"col\"> ${1:Opportunity Name} </th>",
            "\t\t\t<th scope=\"col\"> Account Name </th>",
            "\t\t\t<th scope=\"col\"> Close Date </th>",
            "\t\t\t<th scope=\"col\"> Stage </th>",
            "\t\t\t<th scope=\"col\"> Confidence </th>",
            "\t\t\t<th scope=\"col\"> Amount </th>",
            "\t\t\t<th scope=\"col\"> Contact </th>",
            "\t\t</tr>",
            "\t</thead>",
            "\t<tbody>",
            "\t\t<tr class=\"slds-hint-parent\">",
            "\t\t\t<th scope=\"row\"> Cloudhub </th>",
            "\t\t\t<th scope=\"row\"> Cloudhub </th>",
            "\t\t\t<th scope=\"row\"> 4/14/2015 </th>",
            "\t\t\t<th scope=\"row\"> Prospecting </th>",
            "\t\t\t<th scope=\"row\"> 20% </th>",
            "\t\t\t<th scope=\"row\"> $25k </th>",
            "\t\t\t<th scope=\"row\"> test@cloudhub.com </th>",
            "\t\t</tr>",
            "\t</tbody>",
            "</table>"
        ],
        "description": "SLDS Table"
    }
}


const JAVASCRIPT_FILE = {
    "console Log": {
        "prefix": "c:log",
        "body": ["console.log('OUTPUT : ',$1);"],
        "description": "console Log"
    },
    "console table": {
        "prefix": "c:table",
        "body": ["console.table($1);"],
        "description": "console table"
    },
    "console_error": {
        "prefix": "c:error",
        "body": ["console.error('OUTPUT: ',$1);"],
        "description": "console_error"
    },
    "console_info": {
        "prefix": "c:info",
        "body": ["console.info('OUTPUT: ',$1);"],
        "description": "console_info"
    },
    "console_warning": {
        "prefix": "c:warn",
        "body": ["console.warn('OUTPUT: ',$1);"],
        "description": "console_warning"
    },
    "JSON-1": {
        "prefix": "json:stringify-and-parse",
        "body": ["JSON.parse(JSON.stringify($1))"],
        "description": "JSON.parse(JSON.stringify(data))"
    },
    "JSON-2": {
        "prefix": "json:parse",
        "body": ["JSON.parse($1);"],
        "description": "JSON.parse(data)"
    },
    "JSON-3": {
        "prefix": "json:stringify",
        "body": ["JSON.stringify($1);"],
        "description": "JSON.stringify(data)"
    },
    "LWC uiRecordApi": {
        "prefix": "imp:LWC-uiRecordApi",
        "body": [
            "import { getRecord, createRecord, updateRecord, deleteRecord, getRecordUi, getFieldValue, getFieldDisplayValue, getRecordCreateDefaults, createRecordInputFilteredByEditedFields, generateRecordInputForCreate, generateRecordInputForUpdate } from 'lightning/uiRecordApi';",
            "/* https://developer.salesforce.com/docs/platform/lwc/guide/reference-lightning-ui-api-record.html */"
        ],
        "description": "LWC uiRecordApi"
    },
    "LWC uiObjectInfoApi": {
        "prefix": "imp:LWC-ObjectInfoApi",
        "body": [
            "import { getObjectInfo, getObjectInfos, getPicklistValues, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';",
            "/* https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_lightning_ui_api_object_info */"
        ],
        "description": "LWC uiObjectInfoApi"
    },
    "LWC navigation": {
        "prefix": "imp:LWC-Navigation",
        "body": ["import { ${1:NavigationMixin} } from 'lightning/navigation';"],
        "description": "LWC navigation"
    },
    "LWC modal": {
        "prefix": "imp:LWC-Modal",
        "body": ["import LightningModal from 'lightning/modal';"],
        "description": "LWC modal"
    },
    "LWC datatable": {
        "prefix": "imp:LWC-datatable",
        "body": ["import LightningDatatable from 'lightning/datatable';"],
        "description": "LWC datatable"
    },
    "LWC APEX": {
        "prefix": "imp:LWC-ApexClass",
        "body": [
            "import getApexData from '@salesforce/apex/${1:apexControllerName}.${2:methodName}';"
        ],
        "description": "LWC APEX"
    },
    "LWC ListView": {
        "prefix": "imp:LWC-Listview",
        "body": ["import { ${1:getListUi} } from 'lightning/uiListApi';"],
        "description": "LWC ListView"
    },
    "LWC pub sub library": {
        "prefix": "imp:LWC-Pubsub-Library",
        "body": ["import ${1:pubsub} from 'c/${1:pubsub}';"],
        "description": "LWC pub sub library"
    },
    "LWC toastMessages": {
        "prefix": "imp:LWC-ToastMessage",
        "body": [
            "import { ShowToastEvent } from 'lightning/platformShowToastEvent';"
        ],
        "description": "LWC toastMessages"
    },
    "LWC Prompt Modals": {
        "prefix": "imp:LWC-PromptModal",
        "body": [
            "import LightningPrompt from 'lightning/prompt';"
        ],
        "description": "LWC Prompt Modals"
    },
    "LWC Confirm Modals": {
        "prefix": "imp:LWC-ConfirmModal",
        "body": [
            "import LightningConfirm from 'lightning/confirm';"
        ],
        "description": "LWC Confirm Modals"
    },
    "LWC Alert Modals": {
        "prefix": "imp:LWC-AlertModal",
        "body": [
            "import LightningAlert from 'lightning/alert';"
        ],
        "description": "LWC Alert Modals"
    },
    "LWC Toast Container": {
        "prefix": "imp:LWC-ToastContainer",
        "body": [
            "import ToastContainer from 'lightning/toastContainer';"
        ],
        "description": "LWC Toast Container"
    },
    "LWC Toast Container": {
        "prefix": "imp:LWC-fileDownload",
        "body": [
            "import { generateUrl } from 'lightning/fileDownload';",
            "// Download a file in an LWR site in Experience Cloud.",
            "// const url = generateUrl(recordId);",
            "// window.open(url);"
        ],
        "description": "LWC File Download"
    },
    "LWC GraphQL": {
        "prefix": "imp:LWC-graphql",
        "body": [
            "import { gql, graphql, refreshGraphQL } from 'lightning/uiGraphQLApi';",
            "/* More info: https://developer.salesforce.com/docs/platform/lwc/guide/reference-graphql.html */"
        ],
        "description": "LWC GraphQL"
    },
    "LWC uiAppsApi": {
        "prefix": "imp:LWC-getNavItems",
        "body": [
            "import { getNavItems } from 'lightning/uiAppsApi'"
        ],
        "description": "LWC uiAppsApi"
    },
    "LWC uiListsApi": {
        "prefix": "imp:LWC-uiListsApi",
        "body": [
            "import { getListInfoByName, getListInfosByName } from 'lightning/uiListsApi'",
            "/* More info: https://developer.salesforce.com/docs/platform/lwc/guide/reference-get-list-info-by-name.html */"
        ],
        "description": "LWC uiListsApi"
    },
    "LWC RefreshEvent ": {
        "prefix": "imp:LWC-RefreshEvent",
        "body": [
            "import { RefreshEvent,  registerRefreshHandler, unregisterRefreshHandler, REFRESH_ERROR, REFRESH_COMPLETE, REFRESH_COMPLETE_WITH_ERRORS  } from 'lightning/refresh';",
            "/* More:- https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.data_refreshview_api */"
        ],
        "description": "LWC RefreshEvent"
    },
    "salesforce-label": {
        "prefix": "imp:LWC-CustomLabel",
        "body": [
            "import ${1:labelName} from '@salesforce/label/${2:labelReference}';",
            "// Example :- import greeting from '@salesforce/label/c.greeting';"
        ],
        "description": "@salesforce/label"
    },
    "salesforce-resourceUrl": {
        "prefix": "imp:LWC-ResourceUrl",
        "body": [
            "import ${1:resourceName} from '@salesforce/resourceUrl/$2resourceReference';",
            "// Example :- import TRAILHEAD_LOGO from '@salesforce/resourceUrl/trailhead_logo';"
        ],
        "description": "@salesforce/resourceUrl"
    },
    "salesforce-schema": {
        "prefix": "imp:LWC-SalesforceSchema",
        "body": [
            "import ${1:objectName} from '@salesforce/schema/$2objectApiName';",
            "import $3FIELD_NAME from '@salesforce/schema/$4object.fieldApiName';"
        ],
        "description": "@salesforce/schema"
    },

    "salesforce-formFactor": {
        "prefix": "imp:LWC-client-formFactor",
        "body": ["import FORM_FACTOR from '@salesforce/client/formFactor';"],
        "description": "@salesforce/client/formFactor"
    },

    "salesforce-community": {
        "prefix": "imp:LWC-Community",
        "body": [
            "import communityId from '@salesforce/community/Id';",
            "import communityPath from '@salesforce/community/basePath'"
        ],
        "description": "@salesforce/community"
    },

    "salesforce-messageChannel": {
        "prefix": "imp:LWC-messageChannel",
        "body": [
            "import ${1:channelName} from '@salesforce/messageChannel/${2:channelReference}';",
            "/* https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_salesforce_modules */"
        ],
        "description": "@salesforce/messageChannel"
    },

    "salesforce-userPermission": {
        "prefix": "imp:LWC-userPermission",
        "body": [
            "import hasViewSetup from '@salesforce/userPermission/ViewSetup';",
            "/* https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_get_permissions */"
        ],
        "description": "@salesforce/userPermission"
    },

    "salesforce-customPermission": {
        "prefix": "imp:LWC-customPermission",
        "body": [
            "import ${1:hasPermission} from '@salesforce/customPermission/${2:PermissionName}';",
            "/* https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_salesforce_modules */"
        ],
        "description": "@salesforce/customPermission"
    },

    "salesforce-i18n": {
        "prefix": "imp:LWC-i18n",
        "body": [
            "import ${1:internationalizationPropertyName} from '@salesforce/i18n/${2:internationalizationProperty}';",
            "/* POSSIBLE_VALUES => lang, dir, locale, currency, firstDayOfWeek, timeZone */",
            "/*MORE: https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_i18n*/"
        ],
        "description": "@salesforce/i18n"
    },

    "salesforce-user": {
        "prefix": "imp:LWC-User",
        "body": ["import ${1:userId} from '@salesforce/user/Id';"],
        "description": "@salesforce/user"
    },
    "LWC WireMethod (non parametric)": {
        "prefix": "wire:without-param",
        "body": [
            "@wire(${1:apexMethodName})",
            "wiredData({ error, data }) {",
            "  if (data) {",
            "    console.log('Data', data);",
            "  } else if (error) {",
            "    console.error('Error:', error);",
            "  }",
            "}"
        ],
        "description": "LWC WireMethod (non parametric)"
    },
    "LWC WireMethod (Parametric)": {
        "prefix": "wire:with-param",
        "body": [
            "@wire(${1:apexMethodName}, { ${2:paramName}: '$paramName' })",
            "wiredData({ error, data }) {",
            "  if (data) {",
            "    console.log('Data', data);",
            "  } else if (error) {",
            "     console.error('Error:', error);",
            "  }",
            "}"
        ],
        "description": "LWC WireMethod (Parametric)"
    },
    "LWC (apex Imperative Method)": {
        "prefix": "apex:without-param",
        "body": [
            "${1:apexMethodName}()",
            "  .then(result => {",
            "    console.log('Result', result);",
            "  })",
            "  .catch(error => {",
            "    console.error('Error:', error);",
            "});"
        ],
        "description": "LWC (apex Imperative Method)"
    },
    "LWC (apex Imperative param Method)": {
        "prefix": "apex:with-param",
        "body": [
            "${1:apexMethodName}({ ${2:paramName}: ${3:paramValue} })",
            "  .then(result => {",
            "    console.log('Result', result);",
            "  })",
            "  .catch(error => {",
            "    console.error('Error:', error);",
            "});"
        ],
        "description": "LWC (apex Imperative Method)"
    },
    "LWC @api getter and setter": {
        "prefix": "api:getter-setter",
        "body": [
            "@api",
            "get ${1:itemName}() {",
            "\treturn this.${1:itemName};",
            "}",
            "set ${1:itemName}(value) {",
            "\t${3:this.result} = value;",
            "}"
        ],
        "description": "@api getter and setter"
    },
    "api function": {
        "prefix": "api:function",
        "body": ["@api ${1:functionName}(${2:params}) {", "\t//code$3", "}"],
        "description": "@api function"
    },
    "api flexipageRegionWidth ": {
        "prefix": "api:variable",
        "body": ["@api ${1:variableName};"],
        "description": "@api variable"
    },
    "api variable": {
        "prefix": "api:variable",
        "body": ["@api flexipageRegionWidth;"],
        "description": "@api flexipageRegionWidth "
    },

    "Array-1": {
        "prefix": "arr:forEach-with-index",
        "body": [
            "${1:array}.forEach(function (currentItem, index){",
            "\t//TODO : currentItem",
            "});"
        ],
        "description": "Array forEach"
    },
    "Array-2": {
        "prefix": "arr:forEach",
        "body": [
            "${1:array}.forEach(currentItem => {",
            "\t//TODO : currentItem",
            "});"
        ],
        "description": "Array forEach"
    },
    "Array-3": {
        "prefix": "arr:forLoop",
        "body": ["for (let i = 0; i < ${1:array}.length; i++) {", "\t//code", "}"],
        "description": "Array forloop"
    },
    "Array-4": {
        "prefix": "arr:filter",
        "body": [
            "let ${1:newArray} = ${2:array}.filter(item => {",
            "\treturn condition;",
            "});"
        ],
        "description": "Array filter"
    },
    "Array-5": {
        "prefix": "arr:map",
        "body": [
            "let ${1:mappedArray} =  ${2:array}.map(item => {",
            "\treturn condition;",
            "});"
        ],
        "description": "Array map"
    },
    "Array-6": {
        "prefix": "arr:reduce",
        "body": [
            "let ${1:reducedArray} = ${2:array}.reduce(item => {",
            "return condition;",
            "});"
        ],
        "description": "Array reduce"
    },
    "Array-7": {
        "prefix": "arr:forIn",
        "body": [
            "for (let ${1:key} in ${2:source}) {",
            "\tif (${2:source}.hasOwnProperty(${1:key})) {",
            "\t\t${0}",
            "\t}",
            "}"
        ],
        "description": "Array for in"
    },
    "Array-8": {
        "prefix": "arr:forOf",
        "body": ["for (const ${1:key} of ${2:source}) {", "\t${0}", "}"],
        "description": "Array for of"
    },
    "Array-9": {
        "prefix": "arr:find",
        "body": ["${1:iterable}.find((${2:item}) => {", "\t${0}", "})"],
        "description": "Array find"
    },
    "Array-10": {
        "prefix": "arr:every",
        "body": ["${1:iterable}.every((${2:item}) => {", "\t${0}", "})"],
        "description": "Array every"
    },
    "Array-11": {
        "prefix": "arr:some",
        "body": ["${1:iterable}.some((${2:item}) => {", "\t${0}", "})"],
        "description": "Array"
    },
    "Array-12": {
        "prefix": "arr:findIndex",
        "body": [
            "const index = ${1:array}.findIndex(item => item.fieldName > 1000);"
        ],
        "description": "Array findIndex"
    },
    "tryCatchFinally": {
        "prefix": "tcf",
        "body": [
            "try {",
            "\t${0}",
            "} catch (${1:error}) {\n",
            "} finally {\n",
            "}"
        ],
        "description": "try catch finally"
    },
    "querySelector-1": {
        "prefix": "query:Selector",
        "body": ["this.template.querySelector('${1:document}');"],
        "description": "querySelector"
    },
    "querySelectorAll": {
        "prefix": "query:SelectorAll",
        "body": ["this.template.querySelectorAll('${1:document}');"],
        "description": "querySelectorAll"
    },
    "querySelector-2": {
        "prefix": "query:Selector-getAttribute",
        "body": [
            "this.template.querySelector('${1:document}').getAttribute('${2:attrName}');"
        ],
        "description": "getAttribute"
    },
    "querySelector-3": {
        "prefix": "query:Selector-removeAttribute",
        "body": [
            "this.template.querySelector('${1:document}').removeAttribute('${2:attrName}');"
        ],
        "description": "removeAttribute"
    },
    "querySelector-4": {
        "prefix": "query:Selector-setAttribute",
        "body": [
            "this.template.querySelector('${1:document}').setAttribute('${2:attrName}', ${3:value});"
        ],
        "description": "setAttribute"
    },

    "Lifecycle Hooks-1": {
        "prefix": "met:constructor",
        "body": ["constructor() {", "\tsuper();", "\t${1://code}", "}"],
        "description": "constructor"
    },
    "Lifecycle Hooks-2": {
        "prefix": "met:render",
        "body": ["render(){", "\t${1://code}", "}"],
        "description": "render"
    },
    "Lifecycle Hooks-3": {
        "prefix": "met:renderedCallback",
        "body": ["renderedCallback(){", "\t${1://code}", "}"],
        "description": "renderedCallback"
    },
    "Lifecycle Hooks-6": {
        "prefix": "met:errorCallback",
        "body": [
            "errorCallback(error, stack) {",
            "\t${1:this.error} = error;",
            "}"
        ],
        "description": "errorCallback"
    },
    "Lifecycle Hooks-7": {
        "prefix": "met:connectedCallback",
        "body": ["connectedCallback() {", "\t${1://code}", "}"],
        "description": "connectedCallback"
    },
    "Lifecycle Hooks-8": {
        "prefix": "met:disconnectedCallback",
        "body": ["disconnectedCallback() {", "\t${1://code}", "}"],
        "description": "disconnectedCallback"
    },

    "event-1": {
        "prefix": "evt:preventDefault",
        "body": ["event.preventDefault();"],
        "description": "preventDefault"
    },
    "event-2": {
        "prefix": "evt:stopPropagation",
        "body": ["event.stopPropagation();"],
        "description": "stopPropagation"
    },
    "event-3": {
        "prefix": "evt:dataSet",
        "body": ["event.currentTarget.dataset;"],
        "description": "dataSet"
    },

    "promise": {
        "prefix": "promise",
        "body": "return new Promise((resolve, reject) => {\n\tresolve(${1})\n});",
        "description": "Creates and returns a new Promise in the standard ES6 syntax"
    },
    "thenCatch": {
        "prefix": "thenc",
        "body": ".then((${1:result}) => {\n\t${2}\n}).catch((${3:err}) => {\n\t${4}\n});",
        "description": "Add the .then and .catch methods to handle promises"
    },
    "Alert Modals": {
        "prefix": "lwc:alertModal",
        "body": [
            "await LightningAlert.open({",
            "\tmessage: 'This is the alert message.',",
            "\ttheme: 'error', // a red theme intended for error states",
            "\tlabel: 'Error!', // this is the header text",
            "});"
        ],
        "description": "Alert Modals"
    },
    "Confirm Modals": {
        "prefix": "lwc:confirmModal",
        "body": [
            "const result = await LightningConfirm.open({",
            "\tmessage: 'this is the prompt message',",
            "\tvariant: 'headerless',",
            "\tlabel: 'this is the aria-label value',",
            "});"
        ],
        "description": "Confirm Modals"
    },
    "Prompt Modals": {
        "prefix": "lwc:promptModal",
        "body": [
            "LightningPrompt.open({",
            "\tmessage: 'this is the prompt message',",
            "\t//theme defaults to \"default\"",
            "\tlabel: 'Please Respond', // this is the header text",
            "\tdefaultValue: 'initial input value', //this is optional",
            "}).then((result) => {",
            "\t//Prompt has been closed",
            "\t//result is input text if OK clicked",
            "\t//and null if cancel was clicked",
            "});",
            "//more info: https://developer.salesforce.com/docs/component-library/bundle/lightning-prompt/documentation"
        ],
        "description": "Prompt Modals"
    },
    "Platform Show Toast Event": {
        "prefix": "lwc:toastEvent",
        "body": [
            "const event = new ShowToastEvent({",
            "\ttitle: 'Success!',",
            "\tmessage: 'Record created!', ",
            "\tvariant : 'success'         ",
            "});",
            "this.dispatchEvent(event);"
        ],
        "description": "Platform Show Toast Event"
    },
    "Custom Event - Child to parent": {
        "prefix": "lwc:customEvent",
        "body": [
          "const customEvent = new CustomEvent('${1:eventname}', {",
          "\tdetail: {",
          "\t\tmessage: 'any message'",
          "\t}",
          "\t//bubbles: true,",
          "\t//composed: true",
          "})",
          "this.dispatchEvent(customEvent);"
        ],
        "description": "Custom Event - Child to parent"
      }
}


const XML_FILE = {
    "LWC targets": {
        "prefix": "lwc-target",
        "body": [
            "<targets>",
            "\t<target>lightning__RecordPage</target>",
            "\t<target>lightning__AppPage</target>",
            "\t<target>lightning__HomePage</target>",
            "\t<!--<target>lightning__Tab</target>-->",
            "\t<!--<target>lightning__Inbox</target>-->",
            "\t<!--<target>lightning__UtilityBar</target>-->",
            "\t<!--<target>lightning__FlowScreen</target>-->",
            "\t<!--<target>lightningSnapin__ChatMessage</target>-->",
            "\t<!--<target>lightningSnapin__Minimized</target>-->",
            "\t<!--<target>lightningSnapin__PreChat</target>-->",
            "\t<!--<target>lightningSnapin__ChatHeader</target>-->",
            "\t<!--<target>lightningCommunity__Page</target>-->",
            "\t<!--<target>lightningCommunity__Default</target>-->",
            "\t<!--<target>lightningCommunity__Page_Layout</target>-->",
            "\t<!--<target>lightningCommunity__Theme_Layout</target>-->",
            "\t<!--<target>lightningStatic__Email</target>-->",
            "\t<!--<target>lightning_VoiceExtension</target>-->",
            "\t<!--<target>analytics__Dashboard</target>-->",
            "\t<!--<target>lightning__RecordAction</target>-->",
            "</targets>"
        ],
        "description": "LWC targets"
    },
    "LWC design attributes": {
        "prefix": "lwc-design-attribute",
        "body": [
            "<!-- Configuring the design attributes -->",
            "<targetConfigs>",
            "\t<targetConfig targets=\"lightning__HomePage,lightning__RecordPage\">",
            "\t\t<property name=\"strName\" type=\"String\" default=\"Salesforce Code Crack\" label=\"Enter the Employee Name\"/>",
            "\t\t<property name=\"showDetails\" type=\"Boolean\" default=\"true\" label=\"Do you want to Show Details ?\"/>",
            "\t\t<property name=\"empName\" type=\"String\" default=\"\" label=\"Enter Employee Name\"/>",
            "\t\t<property name=\"empDepartment\" type=\"String\" default=\"\" label=\"Enter Employee Department\"/>",
            "\t\t<property name=\"empLocation\" type=\"String\" label=\"Enter Employee Location\" datasource=\"Hyderabad, Delhi, Pune, Noida\"/>",
            "\t\t<property name=\"empAge\" type=\"integer\" label=\"Enter Employee Age\"/>",
            "\t\t<property name=\"empGender\" type=\"String\" label=\"Enter Employee Gender\" datasource=\"Male, Female\"/>",
            "\t</targetConfig>",
            "</targetConfigs>"
        ],
        "description": "LWC design attributes"
    },
    "LWC Quick Actions": {
        "prefix": "lwc-quick-action",
        "body": [
            "<!-- Configuring the Quick Actions -->",
            "<targetConfigs>",
            "\t<targetConfig targets=\"lightning__RecordAction\">",
            "\t\t<actionType>Action</actionType>",
            "\t</targetConfig>",
            "</targetConfigs>"
        ],
        "description": "LWC Quick Actions"
    }
}

const APEX_ANNOTATIONS = [{
    label: '@AuraEnabled',
    insertText: '@AuraEnabled',
    documentation: 'AuraEnabled Method'
},
{
    label: '@AuraEnabled(cacheable=true)',
    insertText: '@AuraEnabled(cacheable=true)',
    documentation: 'AuraEnabled Method'
},
{
    label: '@AuraEnabled(continuation=true cacheable=true)',
    insertText: '@AuraEnabled(continuation=true cacheable=true)',
    documentation: 'AuraEnabled Method'
},
{
    label: '@Future',
    insertText: '@future',
    documentation: 'Future Method'
},
{
    label: '@InvocableMethod',
    insertText: '@InvocableMethod',
    documentation: 'Invocable Method'
},
{
    label: '@InvocableVariable',
    insertText: '@InvocableVariable',
    documentation: 'Invocable Variable Method'
},
{
    label: '@Deprecated',
    insertText: '@Deprecated',
    documentation: 'Deprecated Method'
},
{
    label: '@IsTest',
    insertText: '@IsTest',
    documentation: 'IsTest Method'
},
{
    label: '@JsonAccess',
    insertText: '@JsonAccess',
    documentation: 'JSON Access Method'
},
{
    label: '@NamespaceAccessible',
    insertText: '@NamespaceAccessible',
    documentation: 'Namespace Accessible Method'
},
{
    label: '@ReadOnly',
    insertText: '@ReadOnly',
    documentation: 'Read Only Method'
},

{
    label: '@RemoteAction',
    insertText: '@RemoteAction',
    documentation: 'Remote Action Method'
},
{
    label: '@SuppressWarnings',
    insertText: '@SuppressWarnings',
    documentation: 'Suppress Warnings Method'
},
{
    label: '@ReadOnly',
    insertText: '@ReadOnly',
    documentation: 'Read Only Method'
},
{
    label: '@TestSetup',
    insertText: '@TestSetup',
    documentation: 'Test Setup Method'
},
{
    label: '@TestVisible',
    insertText: '@TestVisible',
    documentation: 'Test Visible Method'
},
{
    label: '@RestResource',
    insertText: "@RestResource(urlMapping='/yourUrl')",
    documentation: 'Rest Resource'
},
{
    label: '@HttpPost',
    insertText: '@HttpPost',
    documentation: 'Http Post Method'
},
{
    label: '@HttpGet',
    insertText: '@HttpGet',
    documentation: 'Http Get Method'
},
{
    label: '@HttpPatch',
    insertText: '@HttpPatch',
    documentation: 'Http Patch Method'
},
{
    label: '@HttpPut',
    insertText: '@HttpPut',
    documentation: 'Http Put Method'
},
{
    label: '@HttpDelete',
    insertText: '@HttpDelete',
    documentation: 'Http Delete Method'
}
];

const APEX_CLASS_DEFINITION = [{
    label: 'public',
    insertText: 'public',
    documentation: 'public class'
},
{
    label: 'private',
    insertText: 'private',
    documentation: 'private class'
},
{
    label: 'global',
    insertText: 'global',
    documentation: 'global class'
},
{
    label: 'virtual',
    insertText: 'virtual',
    documentation: 'virtual class'
},
{
    label: 'abstract',
    insertText: 'abstract',
    documentation: 'abstract class'
},
{
    label: 'with sharing',
    insertText: 'with sharing',
    documentation: 'with sharing class'
},
{
    label: 'without sharing',
    insertText: 'without sharing',
    documentation: 'without sharing class'
},
{
    label: 'implements',
    insertText: 'implements InterfaceNameList',
    documentation: 'implements InterfaceNameList'
},
{
    label: 'interface',
    insertText: 'interface InterfaceName',
    documentation: 'interface InterfaceName'
},
{
    label: 'extends ',
    insertText: 'extends ClassName',
    documentation: 'extends  class'
},
{
    label: 'protected',
    insertText: 'protected',
    documentation: 'protected variable'
},
{
    label: 'final',
    insertText: 'final',
    documentation: 'final variable'
},
{
    label: 'static',
    insertText: 'static',
    documentation: 'static variable'
},
{
    label: 'override',
    insertText: 'override',
    documentation: 'override Methods'
}, {
    label: 'Blob',
    insertText: 'Blob',
    documentation: 'Blob -primitive data type'
},
{
    label: 'Boolean',
    insertText: 'Boolean',
    documentation: 'Boolean -primitive data type'
},
{
    label: 'Date',
    insertText: 'Date',
    documentation: 'Date -primitive data type'
},
{
    label: 'Datetime',
    insertText: 'Datetime',
    documentation: 'Datetime -primitive data type'
},
{
    label: 'Decimal',
    insertText: 'Decimal',
    documentation: 'Decimal -primitive data type'
},
{
    label: 'Double',
    insertText: 'Double',
    documentation: 'Double -primitive data type'
},
{
    label: 'ID',
    insertText: 'ID',
    documentation: 'ID -primitive data type'
},
{
    label: 'Integer',
    insertText: 'Integer',
    documentation: 'Integer -primitive data type'
},
{
    label: 'Long',
    insertText: 'Long',
    documentation: 'Long -primitive data type'
},
{
    label: 'Object',
    insertText: 'Object',
    documentation: 'Object -primitive data type'
},
{
    label: 'String',
    insertText: 'String',
    documentation: 'String -primitive data type'
},
{
    label: 'Time',
    insertText: 'Time',
    documentation: 'Time -primitive data type'
},
{
    label: 'return',
    insertText: 'return',
    documentation: 'return type'
},
{
    label: 'insert',
    insertText: 'insert',
    documentation: 'insert DML'
},
{
    label: 'upsert',
    insertText: 'upsert',
    documentation: 'upsert DML'
},
{
    label: 'update',
    insertText: 'update',
    documentation: 'update DML'
},
{
    label: 'delete',
    insertText: 'delete',
    documentation: 'delete DML'
},
{
    label: 'sObject',
    insertText: 'sObject',
    documentation: 'sObject Type'
},
{
    label: 'void',
    insertText: 'void',
    documentation: 'void'
}
];

const APEX_FILE = [{
    label: 'List',
    insertText: 'List<sObject> sObjects = new List<sObject>();',
    documentation: 'sObject List'
},
{
    label: 'Set',
    insertText: 'Set<String> setName = new Set<String>();',
    documentation: 'Set'
},
{
    label: 'Map',
    insertText: 'Map<String, sObject> mapName = new Map<String, sObject>();',
    documentation: 'Map'
},
{
    label: 'If Statement',
    insertText: 'if(Boolean_condition){\n\n}',
    documentation: 'if -control flow statements'
}, {
    label: 'If-Else Statement',
    insertText: 'if(Boolean_condition){\n\n}else{\n\n}',
    documentation: 'If-Else -control flow statements'
}, {
    label: 'Else-if Statement',
    insertText: 'if(Boolean_condition){\n\n}else if(Boolean_condition){\n\n}else{\n\n}',
    documentation: 'Else-if -control flow statements'
}, {
    label: 'Switch Statement',
    insertText: 'switch on expression {\n\twhen value1 {\n\t\t//code block 1\n\t}\twhen value2 {\n\t\t//code block 2\n\t}\twhen value3 {\n\t\t//code block 3\n\t}\twhen else {\n\t\t//code block 4\n\t}\n}',
    documentation: 'Switch Statements -control flow statements'
},
{
    label: 'Do-While Loops',
    insertText: 'do{\n\t//code_block\n} while (Boolean_condition);',
    documentation: 'Do-While Loops -control flow statements'
},
{
    label: 'While Loops',
    insertText: 'while (condition) {\n\t//code_block\n}',
    documentation: 'While Loops -control flow statements'
},
{
    label: 'For Loops',
    insertText: 'for (Listener variable : [list_set_map_or_soql_query]) {\n\t//code_block\n}',
    documentation: 'For Loops -control flow statements'
},
];

const APEX_DATABASE_CLASS = [{
    "label": "Database.convertLead(leadToConvert, allOrNone)",
    "insertText": "Database.convertLead(leadToConvert, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.convertLead(leadsToConvert, allOrNone)",
    "insertText": "Database.convertLead(leadsToConvert, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.countQuery(query)",
    "insertText": "Database.countQuery(query)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.delete(recordToDelete, allOrNone)",
    "insertText": "Database.delete(recordToDelete, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.delete(recordsToDelete, allOrNone)",
    "insertText": "Database.delete(recordsToDelete, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.delete(recordID, allOrNone)",
    "insertText": "Database.delete(recordID, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.delete(recordIDs, allOrNone)",
    "insertText": "Database.delete(recordIDs, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.deleteAsync(sobjects, callback)",
    "insertText": "Database.deleteAsync(sobjects, callback)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.deleteAsync(sobject, callback)",
    "insertText": "Database.deleteAsync(sobject, callback)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.deleteAsync(sobjects)",
    "insertText": "Database.deleteAsync(sobjects)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.deleteAsync(sobject)",
    "insertText": "Database.deleteAsync(sobject)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.deleteImmediate(sobjects)",
    "insertText": "Database.deleteImmediate(sobjects)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.deleteImmediate(sobject)",
    "insertText": "Database.deleteImmediate(sobject)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.emptyRecycleBin(recordIds)",
    "insertText": "Database.emptyRecycleBin(recordIds)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.emptyRecycleBin(obj)",
    "insertText": "Database.emptyRecycleBin(obj)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.emptyRecycleBin(listOfSObjects)",
    "insertText": "Database.emptyRecycleBin(listOfSObjects)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.executeBatch(batchClassObject)",
    "insertText": "Database.executeBatch(batchClassObject)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.executeBatch(batchClassObject, scope)",
    "insertText": "Database.executeBatch(batchClassObject, scope)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.getAsyncDeleteResult(deleteResult)",
    "insertText": "Database.getAsyncDeleteResult(deleteResult)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.getAsyncDeleteResult(asyncLocator)",
    "insertText": "Database.getAsyncDeleteResult(asyncLocator)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.getAsyncLocator(result)",
    "insertText": "Database.getAsyncLocator(result)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.getAsyncSaveResult(saveResult)",
    "insertText": "Database.getAsyncSaveResult(saveResult)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.getAsyncSaveResult(asyncLocator)",
    "insertText": "Database.getAsyncSaveResult(asyncLocator)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.getDeleted(sObjectType, startDate, endDate)",
    "insertText": "Database.getDeleted(sObjectType, startDate, endDate)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.getQueryLocator(listofQueries)",
    "insertText": "Database.getQueryLocator(listofQueries)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.getQueryLocator(query)",
    "insertText": "Database.getQueryLocator(query)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.getUpdated(sobjectType, startDate, endDate)",
    "insertText": "Database.getUpdated(sobjectType, startDate, endDate)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.insert(recordToInsert, allOrNone)",
    "insertText": "Database.insert(recordToInsert, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.insert(recordsToInsert, allOrNone)",
    "insertText": "Database.insert(recordsToInsert, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.insert(recordToInsert, dmlOptions)",
    "insertText": "Database.insert(recordToInsert, dmlOptions)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.insert(recordsToInsert, dmlOptions)",
    "insertText": "Database.insert(recordsToInsert, dmlOptions)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.insertAsync(sobjects, callback)",
    "insertText": "Database.insertAsync(sobjects, callback)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.insertAsync(sobject, callback)",
    "insertText": "Database.insertAsync(sobject, callback)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.insertAsync(sobjects)",
    "insertText": "Database.insertAsync(sobjects)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.insertAsync(sobject)",
    "insertText": "Database.insertAsync(sobject)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.insertImmediate(sobjects)",
    "insertText": "Database.insertImmediate(sobjects)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.insertImmediate(sobject)",
    "insertText": "Database.insertImmediate(sobject)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.merge(masterRecord, duplicateId)",
    "insertText": "Database.merge(masterRecord, duplicateId)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.merge(masterRecord, duplicateRecord)",
    "insertText": "Database.merge(masterRecord, duplicateRecord)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.merge(masterRecord, duplicateIds)",
    "insertText": "Database.merge(masterRecord, duplicateIds)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.merge(masterRecord, duplicateRecords)",
    "insertText": "Database.merge(masterRecord, duplicateRecords)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.merge(masterRecord, duplicateId, allOrNone)",
    "insertText": "Database.merge(masterRecord, duplicateId, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.merge(masterRecord, duplicateRecord, allOrNone)",
    "insertText": "Database.merge(masterRecord, duplicateRecord, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.merge(masterRecord, duplicateIds, allOrNone)",
    "insertText": "Database.merge(masterRecord, duplicateIds, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.merge(masterRecord, duplicateRecords, allOrNone)",
    "insertText": "Database.merge(masterRecord, duplicateRecords, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.query(queryString)",
    "insertText": "Database.query(queryString)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.rollback(databaseSavepoint)",
    "insertText": "Database.rollback(databaseSavepoint)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.setSavepoint()",
    "insertText": "Database.setSavepoint()",
    "documentation": "Database Class methods"
}, {
    "label": "Database.undelete(recordToUndelete, allOrNone)",
    "insertText": "Database.undelete(recordToUndelete, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.undelete(recordsToUndelete, allOrNone)",
    "insertText": "Database.undelete(recordsToUndelete, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.undelete(recordID, allOrNone)",
    "insertText": "Database.undelete(recordID, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.undelete(recordIDs, allOrNone)",
    "insertText": "Database.undelete(recordIDs, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.update(recordToUpdate, allOrNone)",
    "insertText": "Database.update(recordToUpdate, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.update(recordsToUpdate, allOrNone)",
    "insertText": "Database.update(recordsToUpdate, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.update(recordToUpdate, dmlOptions)",
    "insertText": "Database.update(recordToUpdate, dmlOptions)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.update(recordsToUpdate, dmlOptions)",
    "insertText": "Database.update(recordsToUpdate, dmlOptions)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.upsert(recordToUpsert, externalIdField, allOrNone)",
    "insertText": "Database.upsert(recordToUpsert, externalIdField, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.upsert(recordsToUpsert, externalIdField, allOrNone)",
    "insertText": "Database.upsert(recordsToUpsert, externalIdField, allOrNone)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.updateAsync(sobjects, callback)",
    "insertText": "Database.updateAsync(sobjects, callback)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.updateAsync(sobject, callback)",
    "insertText": "Database.updateAsync(sobject, callback)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.updateAsync(sobjects)",
    "insertText": "Database.updateAsync(sobjects)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.updateAsync(sobject)",
    "insertText": "Database.updateAsync(sobject)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.updateImmediate(sobjects)",
    "insertText": "Database.updateImmediate(sobjects)",
    "documentation": "Database Class methods"
}, {
    "label": "Database.updateImmediate(sobject)",
    "insertText": "Database.updateImmediate(sobject)",
    "documentation": "Database Class methods"
}];

const APEX_USER_INFO_CLASS = [{
    "label": "UserInfo.getDefaultCurrency()",
    "insertText": "UserInfo.getDefaultCurrency()",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.getFirstName()",
    "insertText": "UserInfo.getFirstName()",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.getLanguage()",
    "insertText": "UserInfo.getLanguage()",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.getLastName()",
    "insertText": "UserInfo.getLastName()",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.getLocale()",
    "insertText": "UserInfo.getLocale()",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.getName()",
    "insertText": "UserInfo.getName()",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.getOrganizationId()",
    "insertText": "UserInfo.getOrganizationId()",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.getOrganizationName()",
    "insertText": "UserInfo.getOrganizationName()",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.getProfileId()",
    "insertText": "UserInfo.getProfileId()",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.getSessionId()",
    "insertText": "UserInfo.getSessionId()",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.getTimeZone()",
    "insertText": "UserInfo.getTimeZone()",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.getUiTheme()",
    "insertText": "UserInfo.getUiTheme()",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.getUiThemeDisplayed()",
    "insertText": "UserInfo.getUiThemeDisplayed()",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.getUserEmail()",
    "insertText": "UserInfo.getUserEmail()",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.getUserId()",
    "insertText": "UserInfo.getUserId()",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.getUserName()",
    "insertText": "UserInfo.getUserName()",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.getUserRoleId()",
    "insertText": "UserInfo.getUserRoleId()",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.getUserType()",
    "insertText": "UserInfo.getUserType()",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.isCurrentUserLicensed(namespace)",
    "insertText": "UserInfo.isCurrentUserLicensed(namespace)",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.isCurrentUserLicensedForPackage(packageID)",
    "insertText": "UserInfo.isCurrentUserLicensedForPackage(packageID)",
    "documentation": "UserInfo Class methods"
}, {
    "label": "UserInfo.isMultiCurrencyOrganization()",
    "insertText": "UserInfo.isMultiCurrencyOrganization()",
    "documentation": "UserInfo Class methods"
}]

const APEX_SYSTEM_CLASS = [{
    "label": "System.abortJob(jobId)",
    "insertText": "System.abortJob(jobId)",
    "documentation": "System Class methods"
}, {
    "label": "System.assert(condition, msg)",
    "insertText": "System.assert(condition, msg)",
    "documentation": "System Class methods"
}, {
    "label": "System.assertEquals(expected, actual, msg)",
    "insertText": "System.assertEquals(expected, actual, msg)",
    "documentation": "System Class methods"
}, {
    "label": "System.assertNotEquals(expected, actual, msg)",
    "insertText": "System.assertNotEquals(expected, actual, msg)",
    "documentation": "System Class methods"
}, {
    "label": "System.currentPageReference()",
    "insertText": "System.currentPageReference()",
    "documentation": "System Class methods"
}, {
    "label": "System.currentTimeMillis()",
    "insertText": "System.currentTimeMillis()",
    "documentation": "System Class methods"
}, {
    "label": "System.debug(msg)",
    "insertText": "System.debug(msg)",
    "documentation": "System Class methods"
}, {
    "label": "System.debug(logLevel, msg)",
    "insertText": "System.debug(logLevel, msg)",
    "documentation": "System Class methods"
}, {
    "label": "System.enqueueJob(queueableObj)",
    "insertText": "System.enqueueJob(queueableObj)",
    "documentation": "System Class methods"
}, {
    "label": "System.equals(obj1, obj2)",
    "insertText": "System.equals(obj1, obj2)",
    "documentation": "System Class methods"
}, {
    "label": "System.getApplicationReadWriteMode()",
    "insertText": "System.getApplicationReadWriteMode()",
    "documentation": "System Class methods"
}, {
    "label": "System.getQuiddityShortCode(QuiddityValue)",
    "insertText": "System.getQuiddityShortCode(QuiddityValue)",
    "documentation": "System Class methods"
}, {
    "label": "System.hashCode(obj)",
    "insertText": "System.hashCode(obj)",
    "documentation": "System Class methods"
}, {
    "label": "System.isBatch()",
    "insertText": "System.isBatch()",
    "documentation": "System Class methods"
}, {
    "label": "System.isFunctionCallback()",
    "insertText": "System.isFunctionCallback()",
    "documentation": "System Class methods"
}, {
    "label": "System.isFuture()",
    "insertText": "System.isFuture()",
    "documentation": "System Class methods"
}, {
    "label": "System.isQueueable()",
    "insertText": "System.isQueueable()",
    "documentation": "System Class methods"
}, {
    "label": "System.isRunningElasticCompute()",
    "insertText": "System.isRunningElasticCompute()",
    "documentation": "System Class methods"
}, {
    "label": "System.isScheduled()",
    "insertText": "System.isScheduled()",
    "documentation": "System Class methods"
}, {
    "label": "System.movePassword(targetUserId,sourceUserId)",
    "insertText": "System.movePassword(targetUserId,sourceUserId)",
    "documentation": "System Class methods"
}, {
    "label": "System.now()",
    "insertText": "System.now()",
    "documentation": "System Class methods"
}, {
    "label": "System.process(workItemIds, action, comments, nextApprover)",
    "insertText": "System.process(workItemIds, action, comments, nextApprover)",
    "documentation": "System Class methods"
}, {
    "label": "System.purgeOldAsyncJobs(dt)",
    "insertText": "System.purgeOldAsyncJobs(dt)",
    "documentation": "System Class methods"
}, {
    "label": "System.requestVersion()",
    "insertText": "System.requestVersion()",
    "documentation": "System Class methods"
}, {
    "label": "System.resetPassword(userId, sendUserEmail)",
    "insertText": "System.resetPassword(userId, sendUserEmail)",
    "documentation": "System Class methods"
}, {
    "label": "System.resetPasswordWithEmailTemplate(userId, sendUserEmail, emailTemplateName)",
    "insertText": "System.resetPasswordWithEmailTemplate(userId, sendUserEmail, emailTemplateName)",
    "documentation": "System Class methods"
}, {
    "label": "System.runAs(version)",
    "insertText": "System.runAs(version)",
    "documentation": "System Class methods"
}, {
    "label": "System.runAs(userSObject)",
    "insertText": "System.runAs(userSObject)",
    "documentation": "System Class methods"
}, {
    "label": "System.schedule(jobName, cronExpression, schedulableClass)",
    "insertText": "System.schedule(jobName, cronExpression, schedulableClass)",
    "documentation": "System Class methods"
}, {
    "label": "System.scheduleBatch(batchable, jobName, minutesFromNow)",
    "insertText": "System.scheduleBatch(batchable, jobName, minutesFromNow)",
    "documentation": "System Class methods"
}, {
    "label": "System.scheduleBatch(batchable, jobName, minutesFromNow, scopeSize)",
    "insertText": "System.scheduleBatch(batchable, jobName, minutesFromNow, scopeSize)",
    "documentation": "System Class methods"
}, {
    "label": "System.setPassword(userId, password)",
    "insertText": "System.setPassword(userId, password)",
    "documentation": "System Class methods"
}, {
    "label": "System.submit(workItemIds, comments, nextApprover)",
    "insertText": "System.submit(workItemIds, comments, nextApprover)",
    "documentation": "System Class methods"
}, {
    "label": "System.today()",
    "insertText": "System.today()",
    "documentation": "System Class methods"
}];

const APEX_STRING_CLASS = [{
    "label": "String.abbreviate(maxWidth)",
    "insertText": "String.abbreviate(maxWidth)",
    "documentation": "String Class methods"
}, {
    "label": "String.abbreviate(maxWidth, offset)",
    "insertText": "String.abbreviate(maxWidth, offset)",
    "documentation": "String Class methods"
}, {
    "label": "String.capitalize()",
    "insertText": "String.capitalize()",
    "documentation": "String Class methods"
}, {
    "label": "String.center(size)",
    "insertText": "String.center(size)",
    "documentation": "String Class methods"
}, {
    "label": "String.center(size, paddingString)",
    "insertText": "String.center(size, paddingString)",
    "documentation": "String Class methods"
}, {
    "label": "String.charAt(index)",
    "insertText": "String.charAt(index)",
    "documentation": "String Class methods"
}, {
    "label": "String.codePointAt(index)",
    "insertText": "String.codePointAt(index)",
    "documentation": "String Class methods"
}, {
    "label": "String.codePointBefore(index)",
    "insertText": "String.codePointBefore(index)",
    "documentation": "String Class methods"
}, {
    "label": "String.codePointCount(beginIndex, endIndex)",
    "insertText": "String.codePointCount(beginIndex, endIndex)",
    "documentation": "String Class methods"
}, {
    "label": "String.compareTo(secondString)",
    "insertText": "String.compareTo(secondString)",
    "documentation": "String Class methods"
}, {
    "label": "String.contains(substring)",
    "insertText": "String.contains(substring)",
    "documentation": "String Class methods"
}, {
    "label": "String.containsAny(inputString)",
    "insertText": "String.containsAny(inputString)",
    "documentation": "String Class methods"
}, {
    "label": "String.containsIgnoreCase(substring)",
    "insertText": "String.containsIgnoreCase(substring)",
    "documentation": "String Class methods"
}, {
    "label": "String.containsNone(inputString)",
    "insertText": "String.containsNone(inputString)",
    "documentation": "String Class methods"
}, {
    "label": "String.containsOnly(inputString)",
    "insertText": "String.containsOnly(inputString)",
    "documentation": "String Class methods"
}, {
    "label": "String.containsWhitespace()",
    "insertText": "String.containsWhitespace()",
    "documentation": "String Class methods"
}, {
    "label": "String.countMatches(substring)",
    "insertText": "String.countMatches(substring)",
    "documentation": "String Class methods"
}, {
    "label": "String.deleteWhitespace()",
    "insertText": "String.deleteWhitespace()",
    "documentation": "String Class methods"
}, {
    "label": "String.difference(secondString)",
    "insertText": "String.difference(secondString)",
    "documentation": "String Class methods"
}, {
    "label": "String.endsWith(suffix)",
    "insertText": "String.endsWith(suffix)",
    "documentation": "String Class methods"
}, {
    "label": "String.endsWithIgnoreCase(suffix)",
    "insertText": "String.endsWithIgnoreCase(suffix)",
    "documentation": "String Class methods"
}, {
    "label": "String.equals(secondString)",
    "insertText": "String.equals(secondString)",
    "documentation": "String Class methods"
}, {
    "label": "String.equals(stringOrId)",
    "insertText": "String.equals(stringOrId)",
    "documentation": "String Class methods"
}, {
    "label": "String.equalsIgnoreCase(secondString)",
    "insertText": "String.equalsIgnoreCase(secondString)",
    "documentation": "String Class methods"
}, {
    "label": "String.escapeCsv()",
    "insertText": "String.escapeCsv()",
    "documentation": "String Class methods"
}, {
    "label": "String.escapeEcmaScript()",
    "insertText": "String.escapeEcmaScript()",
    "documentation": "String Class methods"
}, {
    "label": "String.escapeHtml3()",
    "insertText": "String.escapeHtml3()",
    "documentation": "String Class methods"
}, {
    "label": "String.escapeHtml4()",
    "insertText": "String.escapeHtml4()",
    "documentation": "String Class methods"
}, {
    "label": "String.escapeJava()",
    "insertText": "String.escapeJava()",
    "documentation": "String Class methods"
}, {
    "label": "String.escapeSingleQuotes(stringToEscape)",
    "insertText": "String.escapeSingleQuotes(stringToEscape)",
    "documentation": "String Class methods"
}, {
    "label": "String.escapeUnicode()",
    "insertText": "String.escapeUnicode()",
    "documentation": "String Class methods"
}, {
    "label": "String.escapeXml()",
    "insertText": "String.escapeXml()",
    "documentation": "String Class methods"
}, {
    "label": "String.format(stringToFormat, formattingArguments)",
    "insertText": "String.format(stringToFormat, formattingArguments)",
    "documentation": "String Class methods"
}, {
    "label": "String.fromCharArray(charArray)",
    "insertText": "String.fromCharArray(charArray)",
    "documentation": "String Class methods"
}, {
    "label": "String.getChars()",
    "insertText": "String.getChars()",
    "documentation": "String Class methods"
}, {
    "label": "String.getCommonPrefix(strings)",
    "insertText": "String.getCommonPrefix(strings)",
    "documentation": "String Class methods"
}, {
    "label": "String.getLevenshteinDistance(stringToCompare)",
    "insertText": "String.getLevenshteinDistance(stringToCompare)",
    "documentation": "String Class methods"
}, {
    "label": "String.getLevenshteinDistance(stringToCompare, threshold)",
    "insertText": "String.getLevenshteinDistance(stringToCompare, threshold)",
    "documentation": "String Class methods"
}, {
    "label": "String.hashCode()",
    "insertText": "String.hashCode()",
    "documentation": "String Class methods"
}, {
    "label": "String.indexOf(substring)",
    "insertText": "String.indexOf(substring)",
    "documentation": "String Class methods"
}, {
    "label": "String.indexOf(substring, index)",
    "insertText": "String.indexOf(substring, index)",
    "documentation": "String Class methods"
}, {
    "label": "String.indexOfAny(substring)",
    "insertText": "String.indexOfAny(substring)",
    "documentation": "String Class methods"
}, {
    "label": "String.indexOfAnyBut(substring)",
    "insertText": "String.indexOfAnyBut(substring)",
    "documentation": "String Class methods"
}, {
    "label": "String.indexOfChar(character)",
    "insertText": "String.indexOfChar(character)",
    "documentation": "String Class methods"
}, {
    "label": "String.indexOfChar(character, startIndex)",
    "insertText": "String.indexOfChar(character, startIndex)",
    "documentation": "String Class methods"
}, {
    "label": "String.indexOfDifference(stringToCompare)",
    "insertText": "String.indexOfDifference(stringToCompare)",
    "documentation": "String Class methods"
}, {
    "label": "String.indexOfIgnoreCase(substring)",
    "insertText": "String.indexOfIgnoreCase(substring)",
    "documentation": "String Class methods"
}, {
    "label": "String.indexOfIgnoreCase(substring, startPosition)",
    "insertText": "String.indexOfIgnoreCase(substring, startPosition)",
    "documentation": "String Class methods"
}, {
    "label": "String.isAllLowerCase()",
    "insertText": "String.isAllLowerCase()",
    "documentation": "String Class methods"
}, {
    "label": "String.isAllUpperCase()",
    "insertText": "String.isAllUpperCase()",
    "documentation": "String Class methods"
}, {
    "label": "String.isAlpha()",
    "insertText": "String.isAlpha()",
    "documentation": "String Class methods"
}, {
    "label": "String.isAlphaSpace()",
    "insertText": "String.isAlphaSpace()",
    "documentation": "String Class methods"
}, {
    "label": "String.isAlphanumeric()",
    "insertText": "String.isAlphanumeric()",
    "documentation": "String Class methods"
}, {
    "label": "String.isAlphanumericSpace()",
    "insertText": "String.isAlphanumericSpace()",
    "documentation": "String Class methods"
}, {
    "label": "String.isAsciiPrintable()",
    "insertText": "String.isAsciiPrintable()",
    "documentation": "String Class methods"
}, {
    "label": "String.isBlank(inputString)",
    "insertText": "String.isBlank(inputString)",
    "documentation": "String Class methods"
}, {
    "label": "String.isEmpty(inputString)",
    "insertText": "String.isEmpty(inputString)",
    "documentation": "String Class methods"
}, {
    "label": "String.isNotBlank(inputString)",
    "insertText": "String.isNotBlank(inputString)",
    "documentation": "String Class methods"
}, {
    "label": "String.isNotEmpty(inputString)",
    "insertText": "String.isNotEmpty(inputString)",
    "documentation": "String Class methods"
}, {
    "label": "String.isNumeric()",
    "insertText": "String.isNumeric()",
    "documentation": "String Class methods"
}, {
    "label": "String.isNumericSpace()",
    "insertText": "String.isNumericSpace()",
    "documentation": "String Class methods"
}, {
    "label": "String.isWhitespace()",
    "insertText": "String.isWhitespace()",
    "documentation": "String Class methods"
}, {
    "label": "String.join(iterableObj, separator)",
    "insertText": "String.join(iterableObj, separator)",
    "documentation": "String Class methods"
}, {
    "label": "String.lastIndexOf(substring)",
    "insertText": "String.lastIndexOf(substring)",
    "documentation": "String Class methods"
}, {
    "label": "String.lastIndexOf(substring, endPosition)",
    "insertText": "String.lastIndexOf(substring, endPosition)",
    "documentation": "String Class methods"
}, {
    "label": "String.lastIndexOfChar(character)",
    "insertText": "String.lastIndexOfChar(character)",
    "documentation": "String Class methods"
}, {
    "label": "String.lastIndexOfChar(character, endIndex)",
    "insertText": "String.lastIndexOfChar(character, endIndex)",
    "documentation": "String Class methods"
}, {
    "label": "String.lastIndexOfIgnoreCase(substring)",
    "insertText": "String.lastIndexOfIgnoreCase(substring)",
    "documentation": "String Class methods"
}, {
    "label": "String.lastIndexOfIgnoreCase(substring, endPosition)",
    "insertText": "String.lastIndexOfIgnoreCase(substring, endPosition)",
    "documentation": "String Class methods"
}, {
    "label": "String.left(length)",
    "insertText": "String.left(length)",
    "documentation": "String Class methods"
}, {
    "label": "String.leftPad(length)",
    "insertText": "String.leftPad(length)",
    "documentation": "String Class methods"
}, {
    "label": "String.leftPad(length, padStr)",
    "insertText": "String.leftPad(length, padStr)",
    "documentation": "String Class methods"
}, {
    "label": "String.length()",
    "insertText": "String.length()",
    "documentation": "String Class methods"
}, {
    "label": "String.mid(startIndex, length)",
    "insertText": "String.mid(startIndex, length)",
    "documentation": "String Class methods"
}, {
    "label": "String.normalizeSpace()",
    "insertText": "String.normalizeSpace()",
    "documentation": "String Class methods"
}, {
    "label": "String.offsetByCodePoints(index, codePointOffset)",
    "insertText": "String.offsetByCodePoints(index, codePointOffset)",
    "documentation": "String Class methods"
}, {
    "label": "String.remove(substring)",
    "insertText": "String.remove(substring)",
    "documentation": "String Class methods"
}, {
    "label": "String.removeEnd(substring)",
    "insertText": "String.removeEnd(substring)",
    "documentation": "String Class methods"
}, {
    "label": "String.removeEndIgnoreCase(substring)",
    "insertText": "String.removeEndIgnoreCase(substring)",
    "documentation": "String Class methods"
}, {
    "label": "String.removeStart(substring)",
    "insertText": "String.removeStart(substring)",
    "documentation": "String Class methods"
}, {
    "label": "String.removeStartIgnoreCase(substring)",
    "insertText": "String.removeStartIgnoreCase(substring)",
    "documentation": "String Class methods"
}, {
    "label": "String.repeat(numberOfTimes)",
    "insertText": "String.repeat(numberOfTimes)",
    "documentation": "String Class methods"
}, {
    "label": "String.repeat(separator, numberOfTimes)",
    "insertText": "String.repeat(separator, numberOfTimes)",
    "documentation": "String Class methods"
}, {
    "label": "String.replace(target, replacement)",
    "insertText": "String.replace(target, replacement)",
    "documentation": "String Class methods"
}, {
    "label": "String.replaceAll(regExp, replacement)",
    "insertText": "String.replaceAll(regExp, replacement)",
    "documentation": "String Class methods"
}, {
    "label": "String.replaceFirst(regExp, replacement)",
    "insertText": "String.replaceFirst(regExp, replacement)",
    "documentation": "String Class methods"
}, {
    "label": "String.reverse()",
    "insertText": "String.reverse()",
    "documentation": "String Class methods"
}, {
    "label": "String.right(length)",
    "insertText": "String.right(length)",
    "documentation": "String Class methods"
}, {
    "label": "String.rightPad(length)",
    "insertText": "String.rightPad(length)",
    "documentation": "String Class methods"
}, {
    "label": "String.rightPad(length, padStr)",
    "insertText": "String.rightPad(length, padStr)",
    "documentation": "String Class methods"
}, {
    "label": "String.split(regExp)",
    "insertText": "String.split(regExp)",
    "documentation": "String Class methods"
}, {
    "label": "String.split(regExp, limit)",
    "insertText": "String.split(regExp, limit)",
    "documentation": "String Class methods"
}, {
    "label": "String.splitByCharacterType()",
    "insertText": "String.splitByCharacterType()",
    "documentation": "String Class methods"
}, {
    "label": "String.splitByCharacterTypeCamelCase()",
    "insertText": "String.splitByCharacterTypeCamelCase()",
    "documentation": "String Class methods"
}, {
    "label": "String.startsWith(prefix)",
    "insertText": "String.startsWith(prefix)",
    "documentation": "String Class methods"
}, {
    "label": "String.startsWithIgnoreCase(prefix)",
    "insertText": "String.startsWithIgnoreCase(prefix)",
    "documentation": "String Class methods"
}, {
    "label": "String.stripHtmlTags()",
    "insertText": "String.stripHtmlTags()",
    "documentation": "String Class methods"
}, {
    "label": "String.substring(startIndex)",
    "insertText": "String.substring(startIndex)",
    "documentation": "String Class methods"
}, {
    "label": "String.substring(startIndex, endIndex)",
    "insertText": "String.substring(startIndex, endIndex)",
    "documentation": "String Class methods"
}, {
    "label": "String.substringAfter(separator)",
    "insertText": "String.substringAfter(separator)",
    "documentation": "String Class methods"
}, {
    "label": "String.substringAfterLast(separator)",
    "insertText": "String.substringAfterLast(separator)",
    "documentation": "String Class methods"
}, {
    "label": "String.substringBefore(separator)",
    "insertText": "String.substringBefore(separator)",
    "documentation": "String Class methods"
}, {
    "label": "String.substringBeforeLast(separator)",
    "insertText": "String.substringBeforeLast(separator)",
    "documentation": "String Class methods"
}, {
    "label": "String.substringBetween(tag)",
    "insertText": "String.substringBetween(tag)",
    "documentation": "String Class methods"
}, {
    "label": "String.substringBetween(open, close)",
    "insertText": "String.substringBetween(open, close)",
    "documentation": "String Class methods"
}, {
    "label": "String.swapCase()",
    "insertText": "String.swapCase()",
    "documentation": "String Class methods"
}, {
    "label": "String.toLowerCase()",
    "insertText": "String.toLowerCase()",
    "documentation": "String Class methods"
}, {
    "label": "String.toLowerCase(locale)",
    "insertText": "String.toLowerCase(locale)",
    "documentation": "String Class methods"
}, {
    "label": "String.toUpperCase()",
    "insertText": "String.toUpperCase()",
    "documentation": "String Class methods"
}, {
    "label": "String.toUpperCase(locale)",
    "insertText": "String.toUpperCase(locale)",
    "documentation": "String Class methods"
}, {
    "label": "String.trim()",
    "insertText": "String.trim()",
    "documentation": "String Class methods"
}, {
    "label": "String.uncapitalize()",
    "insertText": "String.uncapitalize()",
    "documentation": "String Class methods"
}, {
    "label": "String.unescapeCsv()",
    "insertText": "String.unescapeCsv()",
    "documentation": "String Class methods"
}, {
    "label": "String.unescapeEcmaScript()",
    "insertText": "String.unescapeEcmaScript()",
    "documentation": "String Class methods"
}, {
    "label": "String.unescapeHtml3()",
    "insertText": "String.unescapeHtml3()",
    "documentation": "String Class methods"
}, {
    "label": "String.unescapeHtml4()",
    "insertText": "String.unescapeHtml4()",
    "documentation": "String Class methods"
}, {
    "label": "String.unescapeJava()",
    "insertText": "String.unescapeJava()",
    "documentation": "String Class methods"
}, {
    "label": "String.unescapeUnicode()",
    "insertText": "String.unescapeUnicode()",
    "documentation": "String Class methods"
}, {
    "label": "String.unescapeXml()",
    "insertText": "String.unescapeXml()",
    "documentation": "String Class methods"
}, {
    "label": "String.valueOf(dateToConvert)",
    "insertText": "String.valueOf(dateToConvert)",
    "documentation": "String Class methods"
}, {
    "label": "String.valueOf(datetimeToConvert)",
    "insertText": "String.valueOf(datetimeToConvert)",
    "documentation": "String Class methods"
}, {
    "label": "String.valueOf(decimalToConvert)",
    "insertText": "String.valueOf(decimalToConvert)",
    "documentation": "String Class methods"
}, {
    "label": "String.valueOf(doubleToConvert)",
    "insertText": "String.valueOf(doubleToConvert)",
    "documentation": "String Class methods"
}, {
    "label": "String.valueOf(integerToConvert)",
    "insertText": "String.valueOf(integerToConvert)",
    "documentation": "String Class methods"
}, {
    "label": "String.valueOf(longToConvert)",
    "insertText": "String.valueOf(longToConvert)",
    "documentation": "String Class methods"
}, {
    "label": "String.valueOf(toConvert)",
    "insertText": "String.valueOf(toConvert)",
    "documentation": "String Class methods"
}, {
    "label": "String.valueOfGmt(datetimeToConvert)",
    "insertText": "String.valueOfGmt(datetimeToConvert)",
    "documentation": "String Class methods"
}];

const APEX_DATETIME_CLASS = [{
    "label": "Datetime.addDays(additionalDays)",
    "insertText": "Datetime.addDays(additionalDays)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.addHours(additionalHours)",
    "insertText": "Datetime.addHours(additionalHours)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.addMinutes(additionalMinutes)",
    "insertText": "Datetime.addMinutes(additionalMinutes)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.addMonths(additionalMonths)",
    "insertText": "Datetime.addMonths(additionalMonths)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.addSeconds(additionalSeconds)",
    "insertText": "Datetime.addSeconds(additionalSeconds)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.addYears(additionalYears)",
    "insertText": "Datetime.addYears(additionalYears)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.date()",
    "insertText": "Datetime.date()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.dateGMT()",
    "insertText": "Datetime.dateGMT()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.day()",
    "insertText": "Datetime.day()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.dayGmt()",
    "insertText": "Datetime.dayGmt()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.dayOfYear()",
    "insertText": "Datetime.dayOfYear()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.dayOfYearGmt()",
    "insertText": "Datetime.dayOfYearGmt()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.format()",
    "insertText": "Datetime.format()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.format(dateFormatString)",
    "insertText": "Datetime.format(dateFormatString)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.format(dateFormatString, timezone)",
    "insertText": "Datetime.format(dateFormatString, timezone)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.formatGmt(dateFormatString)",
    "insertText": "Datetime.formatGmt(dateFormatString)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.formatLong()",
    "insertText": "Datetime.formatLong()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.getTime()",
    "insertText": "Datetime.getTime()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.hour()",
    "insertText": "Datetime.hour()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.hourGmt()",
    "insertText": "Datetime.hourGmt()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.isSameDay(dateToCompare)",
    "insertText": "Datetime.isSameDay(dateToCompare)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.millisecond()",
    "insertText": "Datetime.millisecond()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.millisecondGmt()",
    "insertText": "Datetime.millisecondGmt()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.minute()",
    "insertText": "Datetime.minute()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.minuteGmt()",
    "insertText": "Datetime.minuteGmt()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.month()",
    "insertText": "Datetime.month()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.monthGmt()",
    "insertText": "Datetime.monthGmt()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.newInstance(milliseconds)",
    "insertText": "Datetime.newInstance(milliseconds)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.newInstance(date, time)",
    "insertText": "Datetime.newInstance(date, time)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.newInstance(year, month, day)",
    "insertText": "Datetime.newInstance(year, month, day)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.newInstance(year, month, day, hour, minute, second)",
    "insertText": "Datetime.newInstance(year, month, day, hour, minute, second)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.newInstanceGmt(date, time)",
    "insertText": "Datetime.newInstanceGmt(date, time)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.newInstanceGmt(year, month, date)",
    "insertText": "Datetime.newInstanceGmt(year, month, date)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.newInstanceGmt(year, month, date, hour, minute, second)",
    "insertText": "Datetime.newInstanceGmt(year, month, date, hour, minute, second)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.now()",
    "insertText": "Datetime.now()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.parse(datetimeString)",
    "insertText": "Datetime.parse(datetimeString)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.second()",
    "insertText": "Datetime.second()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.secondGmt()",
    "insertText": "Datetime.secondGmt()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.time()",
    "insertText": "Datetime.time()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.timeGmt()",
    "insertText": "Datetime.timeGmt()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.valueOf(dateTimeString)",
    "insertText": "Datetime.valueOf(dateTimeString)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.valueOf(fieldValue)",
    "insertText": "Datetime.valueOf(fieldValue)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.valueOfGmt(dateTimeString)",
    "insertText": "Datetime.valueOfGmt(dateTimeString)",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.year()",
    "insertText": "Datetime.year()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Datetime.yearGmt()",
    "insertText": "Datetime.yearGmt()",
    "documentation": "Datetime Class methods"
}, {
    "label": "Time.addHours(additionalHours)",
    "insertText": "Time.addHours(additionalHours)",
    "documentation": "Time Class methods"
}, {
    "label": "Time.addMilliseconds(additionalMilliseconds)",
    "insertText": "Time.addMilliseconds(additionalMilliseconds)",
    "documentation": "Time Class methods"
}, {
    "label": "Time.addMinutes(additionalMinutes)",
    "insertText": "Time.addMinutes(additionalMinutes)",
    "documentation": "Time Class methods"
}, {
    "label": "Time.addSeconds(additionalSeconds)",
    "insertText": "Time.addSeconds(additionalSeconds)",
    "documentation": "Time Class methods"
}, {
    "label": "Time.hour()",
    "insertText": "Time.hour()",
    "documentation": "Time Class methods"
}, {
    "label": "Time.millisecond()",
    "insertText": "Time.millisecond()",
    "documentation": "Time Class methods"
}, {
    "label": "Time.minute()",
    "insertText": "Time.minute()",
    "documentation": "Time Class methods"
}, {
    "label": "Time.newInstance(hour, minutes, seconds, milliseconds)",
    "insertText": "Time.newInstance(hour, minutes, seconds, milliseconds)",
    "documentation": "Time Class methods"
}, {
    "label": "Time.second()",
    "insertText": "Time.second()",
    "documentation": "Time Class methods"
}, {
    "label": "Date.addDays(additionalDays)",
    "insertText": "Date.addDays(additionalDays)",
    "documentation": "Date Class methods"
}, {
    "label": "Date.addMonths(additionalMonths)",
    "insertText": "Date.addMonths(additionalMonths)",
    "documentation": "Date Class methods"
}, {
    "label": "Date.addYears(additionalYears)",
    "insertText": "Date.addYears(additionalYears)",
    "documentation": "Date Class methods"
}, {
    "label": "Date.day()",
    "insertText": "Date.day()",
    "documentation": "Date Class methods"
}, {
    "label": "Date.dayOfYear()",
    "insertText": "Date.dayOfYear()",
    "documentation": "Date Class methods"
}, {
    "label": "Date.daysBetween(secondDate)",
    "insertText": "Date.daysBetween(secondDate)",
    "documentation": "Date Class methods"
}, {
    "label": "Date.daysInMonth(year, month)",
    "insertText": "Date.daysInMonth(year, month)",
    "documentation": "Date Class methods"
}, {
    "label": "Date.format()",
    "insertText": "Date.format()",
    "documentation": "Date Class methods"
}, {
    "label": "Date.isLeapYear(year)",
    "insertText": "Date.isLeapYear(year)",
    "documentation": "Date Class methods"
}, {
    "label": "Date.isSameDay(dateToCompare)",
    "insertText": "Date.isSameDay(dateToCompare)",
    "documentation": "Date Class methods"
}, {
    "label": "Date.month()",
    "insertText": "Date.month()",
    "documentation": "Date Class methods"
}, {
    "label": "Date.monthsBetween(secondDate)",
    "insertText": "Date.monthsBetween(secondDate)",
    "documentation": "Date Class methods"
}, {
    "label": "Date.newInstance(year, month, day)",
    "insertText": "Date.newInstance(year, month, day)",
    "documentation": "Date Class methods"
}, {
    "label": "Date.parse(stringDate)",
    "insertText": "Date.parse(stringDate)",
    "documentation": "Date Class methods"
}, {
    "label": "Date.today()",
    "insertText": "Date.today()",
    "documentation": "Date Class methods"
}, {
    "label": "Date.toStartOfMonth()",
    "insertText": "Date.toStartOfMonth()",
    "documentation": "Date Class methods"
}, {
    "label": "Date.toStartOfWeek()",
    "insertText": "Date.toStartOfWeek()",
    "documentation": "Date Class methods"
}, {
    "label": "Date.valueOf(stringDate)",
    "insertText": "Date.valueOf(stringDate)",
    "documentation": "Date Class methods"
}, {
    "label": "Date.valueOf(fieldValue)",
    "insertText": "Date.valueOf(fieldValue)",
    "documentation": "Date Class methods"
}, {
    "label": "Date.year()",
    "insertText": "Date.year()",
    "documentation": "Date Class methods"
}];

const SOQL_SYNTAX = [{
    label: 'SELECT',
    insertText: 'SELECT',
    documentation: 'SOQL Syntax '
},
{
    label: 'FROM',
    insertText: 'FROM',
    documentation: 'SOQL Syntax '
},
{
    label: 'WHERE',
    insertText: 'WHERE',
    documentation: 'SOQL Syntax '
},
{
    label: 'WITH',
    insertText: 'WITH',
    documentation: 'SOQL Syntax '
},
{
    label: 'GROUP BY',
    insertText: 'GROUP BY',
    documentation: 'SOQL Syntax '
},
{
    label: 'ORDER BY',
    insertText: 'ORDER BY',
    documentation: 'SOQL Syntax '
},
{
    label: 'ASC',
    insertText: 'ASC',
    documentation: 'SOQL Syntax '
},
{
    label: 'DESC',
    insertText: 'DESC',
    documentation: 'SOQL Syntax '
},
{
    label: 'LIMIT',
    insertText: 'LIMIT',
    documentation: 'SOQL Syntax '
},
{
    label: 'OFFSET',
    insertText: 'OFFSET',
    documentation: 'SOQL Syntax '
},
{
    label: 'VIEW',
    insertText: 'VIEW',
    documentation: 'SOQL Syntax '
},
{
    label: 'LIKE',
    insertText: 'LIKE',
    documentation: 'SOQL Syntax '
},
{
    label: 'TRUE',
    insertText: 'TRUE',
    documentation: 'SOQL Syntax '
},
{
    label: 'FALSE',
    insertText: 'FALSE',
    documentation: 'SOQL Syntax '
},
{
    label: 'IN',
    insertText: 'IN',
    documentation: 'SOQL Syntax '
},
{
    label: 'NOT IN',
    insertText: 'NOT IN',
    documentation: 'SOQL Syntax '
},
{
    label: 'INCLUDES',
    insertText: 'INCLUDES',
    documentation: 'SOQL Syntax '
},
{
    label: 'EXCLUDES',
    insertText: 'EXCLUDES',
    documentation: 'SOQL Syntax '
},

{
    label: 'AND',
    insertText: 'AND',
    documentation: 'SOQL Syntax '
},
{
    label: 'OR',
    insertText: 'OR',
    documentation: 'SOQL Syntax '
},
{
    label: 'YESTERDAY',
    insertText: 'YESTERDAY',
    documentation: 'SOQL Syntax '
},
{
    label: 'TODAY',
    insertText: 'TODAY',
    documentation: 'SOQL Syntax '
},
{
    label: 'TOMORROW',
    insertText: 'TOMORROW',
    documentation: 'SOQL Syntax '
},
{
    label: 'LAST_WEEK',
    insertText: 'LAST_WEEK',
    documentation: 'SOQL Syntax '
},
{
    label: 'THIS_WEEK',
    insertText: 'THIS_WEEK',
    documentation: 'SOQL Syntax '
},
{
    label: 'NEXT_WEEK',
    insertText: 'NEXT_WEEK',
    documentation: 'SOQL Syntax '
},
{
    label: 'LAST_MONTH',
    insertText: 'LAST_MONTH',
    documentation: 'SOQL Syntax '
},


{
    label: 'THIS_MONTH',
    insertText: 'THIS_MONTH',
    documentation: 'SOQL Syntax '
},
{
    label: 'NEXT_MONTH',
    insertText: 'NEXT_MONTH',
    documentation: 'SOQL Syntax '
},
{
    label: 'LAST_90_DAYS',
    insertText: 'LAST_90_DAYS',
    documentation: 'SOQL Syntax '
},
{
    label: 'NEXT_90_DAYS',
    insertText: 'NEXT_90_DAYS',
    documentation: 'SOQL Syntax '
},
{
    label: 'LAST_N_DAYS:n',
    insertText: 'LAST_N_DAYS:n',
    documentation: 'SOQL Syntax '
},
{
    label: 'NEXT_N_DAYS:n',
    insertText: 'NEXT_N_DAYS:n',
    documentation: 'SOQL Syntax '
},
{
    label: 'LAST_MONTH',
    insertText: 'LAST_MONTH',
    documentation: 'SOQL Syntax '
},
{
    label: 'NEXT_N_WEEKS:n',
    insertText: 'NEXT_N_WEEKS:n',
    documentation: 'SOQL Syntax '
},
{
    label: 'LAST_N_WEEKS:n',
    insertText: 'LAST_N_WEEKS:n',
    documentation: 'SOQL Syntax '
},
{
    label: 'NEXT_N_MONTHS:n',
    insertText: 'NEXT_N_MONTHS:n',
    documentation: 'SOQL Syntax '
},
{
    label: 'LAST_N_MONTHS:n',
    insertText: 'LAST_N_MONTHS:n',
    documentation: 'SOQL Syntax '
},
{
    label: 'THIS_QUARTER',
    insertText: 'THIS_QUARTER',
    documentation: 'SOQL Syntax '
},
{
    label: 'LAST_MONTH',
    insertText: 'LAST_MONTH',
    documentation: 'SOQL Syntax '
},
{
    label: 'LAST_QUARTER',
    insertText: 'LAST_QUARTER',
    documentation: 'SOQL Syntax '
},
{
    label: 'NEXT_QUARTER',
    insertText: 'NEXT_QUARTER',
    documentation: 'SOQL Syntax '
},
{
    label: 'LAST_MONTH',
    insertText: 'LAST_MONTH',
    documentation: 'SOQL Syntax '
},
{
    label: 'NEXT_N_QUARTERS:n',
    insertText: 'NEXT_N_QUARTERS:n',
    documentation: 'SOQL Syntax '
},
{
    label: 'LAST_N_QUARTERS:n',
    insertText: 'LAST_N_QUARTERS:n',
    documentation: 'SOQL Syntax '
},
{
    label: 'LAST_MONTH',
    insertText: 'LAST_MONTH',
    documentation: 'SOQL Syntax '
},
{
    label: 'THIS_YEAR',
    insertText: 'THIS_YEAR',
    documentation: 'SOQL Syntax '
},
{
    label: 'LAST_YEAR',
    insertText: 'LAST_YEAR',
    documentation: 'SOQL Syntax '
},
{
    label: 'NEXT_YEAR',
    insertText: 'NEXT_YEAR',
    documentation: 'SOQL Syntax '
},


{
    label: 'NEXT_N_YEARS:n',
    insertText: 'NEXT_N_YEARS:n',
    documentation: 'SOQL Syntax '
},
{
    label: 'LAST_N_YEARS:n',
    insertText: 'LAST_N_YEARS:n',
    documentation: 'SOQL Syntax '
},
{
    label: 'THIS_FISCAL_QUARTER',
    insertText: 'THIS_FISCAL_QUARTER',
    documentation: 'SOQL Syntax '
},
{
    label: 'NEXT_YEAR',
    insertText: 'NEXT_YEAR',
    documentation: 'SOQL Syntax '
},
{
    label: 'LAST_FISCAL_QUARTER',
    insertText: 'LAST_FISCAL_QUARTER',
    documentation: 'SOQL Syntax '
},
{
    label: 'NEXT_FISCAL_QUARTER',
    insertText: 'NEXT_FISCAL_QUARTER',
    documentation: 'SOQL Syntax '
},
{
    label: 'NEXT_N_FISCAL_​QUARTERS:n',
    insertText: 'NEXT_N_FISCAL_​QUARTERS:n',
    documentation: 'SOQL Syntax '
},
{
    label: 'LAST_N_FISCAL_​QUARTERS:n',
    insertText: 'LAST_N_FISCAL_​QUARTERS:n',
    documentation: 'SOQL Syntax '
},
{
    label: 'THIS_FISCAL_YEAR',
    insertText: 'THIS_FISCAL_YEAR',
    documentation: 'SOQL Syntax '
},
{
    label: 'LAST_FISCAL_YEAR',
    insertText: 'LAST_FISCAL_YEAR',
    documentation: 'SOQL Syntax '
},
{
    label: 'NEXT_FISCAL_YEAR',
    insertText: 'NEXT_FISCAL_YEAR',
    documentation: 'SOQL Syntax '
},

{
    label: 'NEXT_N_FISCAL_​YEARS:n',
    insertText: 'NEXT_N_FISCAL_​YEARS:n',
    documentation: 'SOQL Syntax '
},
{
    label: 'LAST_N_FISCAL_​YEARS:n',
    insertText: 'LAST_N_FISCAL_​YEARS:n',
    documentation: 'SOQL Syntax '
},
{
    label: 'FIELDS(ALL)',
    insertText: 'FIELDS(ALL)',
    documentation: 'SOQL Syntax '
},
{
    label: 'FIELDS(CUSTOM)',
    insertText: 'FIELDS(CUSTOM)',
    documentation: 'SOQL Syntax '
},
{
    label: 'FIELDS(STANDARD)',
    insertText: 'FIELDS(STANDARD)',
    documentation: 'SOQL Syntax '
}
];

const LIGHTING_SNIPPET = {
    HTML_FILE,
    JAVASCRIPT_FILE,
    XML_FILE,
    APEX_FILE,
    APEX_ANNOTATIONS: [...APEX_ANNOTATIONS, ...APEX_CLASS_DEFINITION, ...APEX_DATABASE_CLASS, ...APEX_USER_INFO_CLASS, ...APEX_SYSTEM_CLASS, ...APEX_STRING_CLASS, ...APEX_DATETIME_CLASS, ...SOQL_SYNTAX]
};


/* ----------------------------------------------------------------------- */