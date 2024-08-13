$(document).ready(function () {

    $('.ui.checkbox').checkbox();
    $('.my-popup').popup();
    $('.ui.dropdown').dropdown({ action: 'select' });


    window.setTimeout(() => {
        $('.ui.dropdown').dropdown({ action: 'select' });
    }, 5000);



    $('#lwcForm').form({
        fields: {
            componentName: {
                identifier: 'componentName',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please enter component name'
                    },
                    {
                        type: 'minLength[2]',
                        prompt: 'Your component must be at least {ruleValue} characters'
                    },
                    {
                        type: 'maxLength[40]',
                        prompt: 'Your component must have at most {ruleValue} characters'
                    }, {
                        type: 'regExp',
                        value: /^[a-z][a-zA-Z_]*$/,
                        prompt: 'Component name must start with a lower case letter and must not contain whitespace and special characters except underscore'
                    }
                ]
            },
        }
    });

    $('#new-lwc-file').form({
        fields: {
            fileName: {
                identifier: 'fileName',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please enter file name'
                    },
                    {
                        type: 'minLength[2]',
                        prompt: 'Your file name must be at least {ruleValue} characters'
                    },
                    {
                        type: 'maxLength[40]',
                        prompt: 'Your file name must have at most {ruleValue} characters'
                    }, {
                        type: 'regExp',
                        value: /^[a-z][a-zA-Z_]*$/,
                        prompt: 'file name must start with a lower case letter and must not contain whitespace and special characters except underscore'
                    }
                ]
            },
        }
    });

    $('#new-lms-form').form({
        fields: {
            lmsName: ['empty', 'minLength[2]', 'maxLength[40]'],
            masterLabel: ['empty', 'minLength[2]', 'maxLength[40]'],
        }
    });

    $('#new-apex-form').form({
        fields: {
            apex: ['empty', 'minLength[2]', 'maxLength[40]']
        }
    });

    $('#new-aura-form').form({
        fields: {
            name: ['empty', 'minLength[2]', 'maxLength[40]']
        }
    });




});