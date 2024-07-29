$(function () {
    $('.ui.accordion').accordion({
        exclusive: false
    });
    $('.ui.dropdown').dropdown();

    $('.popup_msg').popup();

    let clipboard = new ClipboardJS('.clipboard-copy');

    $(document).mouseup(function (e) {
        $(document).unbind('mousemove');
    });


    $("#devToolOpenButton").click(function () {
        $("#dev-tool").show(500);
    });
    $("#devToolCloseButton").click(function () {
        $("#dev-tool").hide(500);
    });





    function deployConfirmation(e) {
        localStorage.setItem('deployconfirm', e.target.checked);
    }

    const deploymentConfirmation = document.querySelector('#deploymentConfirmation');
    deploymentConfirmation.addEventListener('change', deployConfirmation, false);

    // COLOR

    /*  const BACKGROUND_COLOR = '#ffffff';
     const FONT_COLOR = '#3c4858';


     let root = document.documentElement;
     document.querySelector('#backgroundColorInput').addEventListener('change', function(event) {
         let colorCode = event.target.value;
         root.style.setProperty('--bg-color', colorCode);
         localStorage.setItem('editorbgcolor', colorCode);
     }, false);

     document.querySelector('#fontColorInput').addEventListener('change', function(event) {
         let colorCode = event.target.value;
         root.style.setProperty('--font-color', colorCode);
         localStorage.setItem('editorfontcolor', colorCode);
     }, false);

     const editorBGColor = localStorage.getItem('editorbgcolor') ? localStorage.getItem('editorbgcolor') : BACKGROUND_COLOR;
     root.style.setProperty('--bg-color', editorBGColor);
     document.getElementById("backgroundColorInput").value = editorBGColor;

     const editorFontColor = localStorage.getItem('editorfontcolor') ? localStorage.getItem('editorfontcolor') : FONT_COLOR;
     root.style.setProperty('--font-color', editorFontColor);
     document.getElementById("fontColorInput").value = editorFontColor;


     document.querySelector('#editorDefaultSetting').addEventListener('click', function() {
         root.style.setProperty('--bg-color', BACKGROUND_COLOR);
         root.style.setProperty('--font-color', FONT_COLOR);
         localStorage.setItem('editorbgcolor', BACKGROUND_COLOR);
         localStorage.setItem('editorfontcolor', FONT_COLOR);
         document.getElementById("backgroundColorInput").value = BACKGROUND_COLOR;
         document.getElementById("fontColorInput").value = FONT_COLOR;
         toggleSwitch.checked = false;
         localStorage.setItem('browsertheme', 'light');
     }, false); */

    //filter
    $('#filterComponentInput').keyup(function () {
        let searchText = $(this).val();
        $('.all-apex-classes').each(function () {
            let currentApexClass = $(this).children('.class-names').text().toUpperCase();
            console.log('currentLiText : ', currentApexClass);
            let showCurrentApex = currentApexClass.indexOf(searchText.toUpperCase()) !== -1;
            $(this).toggle(showCurrentApex);
        });

        $('.allComponentNames').each(function () {
            let currentLiText = $(this).children().children('.folder-names').text().toUpperCase();
            let showCurrentLi = currentLiText.indexOf(searchText.toUpperCase()) !== -1;
            $(this).toggle(showCurrentLi);
        });

    });

    $('.main-folders').click(function () {
        let icon = $(this).children('.fal');
        let currentCategoryId = $(this).data('id');
        let contentId = $(this).data('contentId');
        let toggle = ($(this).data('toggle') == 'off' ? 'on' : 'off');

        //For Close open all category 
        $(".main-folders").each(function () {
            if ($(this).data('id') != currentCategoryId) {
                let child = $(this).children('.fal');
                child.removeClass('fa-chevron-down')
                child.addClass('fa-chevron-right');
                $(this).data('toggle', 'off');
                $('#' + $(this).data('contentId')).hide(500);
            }
        });

        if (icon.hasClass('fa-chevron-right')) {
            icon.removeClass('fa-chevron-right');
            icon.addClass('fa-chevron-down');
        } else {
            icon.removeClass('fa-chevron-down')
            icon.addClass('fa-chevron-right');
        }

        if (toggle == 'on') {
            $('#' + contentId).show(200);
        } else {
            $('#' + contentId).hide(200)
        }

        $(this).data('toggle', toggle);

    });


    $('#lmsAddNewFieldBtn').click(function () {
        let uid = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
        let html = '<tr id="faqs-row' + uid + '">';
        html += '<td><input name="fieldName" placeholder="Name" type="text" required="" autocomplete="off" maxlength="40" data-id="' + uid + '"></td>';
        html += '<td><input name="description" placeholder="Description" type="text" autocomplete="off" maxlength="255" data-id="' + uid + '"></td>';
        html += '<td class="center aligned" ><button id="#faqs-row' + uid + '" class="ui mini negative basic button lmsFieldRowRemove">Remove</button></td>';

        html += '</tr>';
        $('#lmsFieldTable tbody').append(html);
    });



    $(document).on("click", "button.lmsFieldRowRemove", function () {
        $($(this).attr('id')).remove();
    });


    $('#retrieveComponentMenu').click(function () {
        $('.retrieveMetadataModal').modal('show');
    });
    

    //All
    $(".all-metadata-retrieve-checkbox").click(function () {
        $(`input[name='${$(this).val()}']`).prop('checked', $(this).prop('checked'));
    });
    //LWC
    $(document).on('click', '.lwcMetadataCheckbox', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        var allChecked = $('.lwcMetadataCheckbox:checked').length === $('.lwcMetadataCheckbox').length;
        $("input[name='lwc-all-metadata']").prop('checked', allChecked);
    });
    //Apex
    $(document).on('click', '.apexMetadataCheckbox', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        var allChecked = $('.apexMetadataCheckbox:checked').length === $('.apexMetadataCheckbox').length;
        $("input[name='apex-all-metadata']").prop('checked', allChecked);
    });
    //LMS
    $(document).on('click', '.lmsMetadataCheckbox', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        var allChecked = $('.lmsMetadataCheckbox:checked').length === $('.lmsMetadataCheckbox').length;
        $("input[name='lms-all-metadata']").prop('checked', allChecked);
    });
    //filter
    $('#metadataRetrieveSearchInput').keyup(function () {
        let searchText = $(this).val();
        $('.lwcMetadataCheckbox, .apexMetadataCheckbox, .lmsMetadataCheckbox').each(function () {
            let value = $(this).val();
            let isToggle = value.toUpperCase().indexOf(searchText.toUpperCase()) !== -1;
            $(this).parents(".item").toggle(isToggle);
        });
    });





    /*--- Block Access ---*/

    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    }, true);

    $(document).keydown(function (event) {
        if ((event.ctrlKey && event.shiftKey && (event.key.toLowerCase() == 'i' || event.key.toLowerCase() == 'j'))
            || (event.which == 123 || event.key == 'F12')) {
            event.preventDefault();

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Access is denied!'
            })
        }
        if (event.ctrlKey && (event.which == 83 || event.key.toLowerCase() == 's')) {
            event.preventDefault();

            Swal.fire({
                title: 'CTRL + S | ⌘ + S',
                icon: 'info',
                html: 'Use inside the code editor area to save code.',
            })
            return false;
        }

        if (event.ctrlKey && (event.which == 87 || event.key.toLowerCase() == 'w')) {
            event.preventDefault();
            alert('It is possible that you may lose some source code, because of this you can not leave the editor using keyboard shortcuts.')
            return false;
        }
    });

    window.addEventListener("offline", (event) => {
        Swal.fire(
            'No Internet',
            'Please check your Internet connection.',
            'error'
        )
    });


});