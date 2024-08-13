/* eslint-disable no-undef */
$(document).ready(function () {


    $(document).on('click', ".copy-to-clipboard", function (event) {
        let copyText = $(this).data("copytext");
        window.navigator.clipboard.writeText(copyText);
        window.Toastify({
            text: 'Session Copied!',
            duration: 3000,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover  
        }).showToast();
    });


    // $(".sidebar-content").resizable({
    //     handleSelector: ".splitter",
    //     resizeHeight: false,
    //     onDrag: function (e, $el, newWidth, newHeight, opt) {
    //         // console.log(newWidth, $(window).width());
    //         // limit box size
    //         if (newWidth < 200) newWidth = 200;
    //         if (newWidth > 400) newWidth = 400;


    //             console.log('newWidth : ',newWidth);

    //         $el.width(newWidth);
    //         //$el.height(newHeight);

    //         //$('.layout-wrapper').width(100 - newWidth);
    //         return false;
    //     }
    // });

    $(document).on('click', ".tree-node", function (event) {

        // event.preventDefault();
        // event.stopPropagation();


        let id = $(this).data("id");
        let icon = $(this).find(".arwicon");

        if (icon.hasClass('codicon-chevron-down')) {
            icon.removeClass('codicon-chevron-down').addClass('codicon-chevron-right');
        } else {
            icon.removeClass('codicon-chevron-right').addClass('codicon-chevron-down');
        }

        $(`[data-parent-id='${id}']`).toggle();
    });


    $(document).on('click', ".folder-node", function (event) {

        let id = $(this).data("id");
        let icon = $(this).find(".codicon");

        if (icon.hasClass('codicon-folder-opened')) {
            icon.removeClass('codicon-folder-opened').addClass('codicon-folder');
        } else {
            icon.removeClass('codicon-folder').addClass('codicon-folder-opened');
        }

        $(`[data-parent-id='${id}']`).toggle();
    });



    $('#filterComponentInput').keyup(function () {
        let searchText = $(this).val();
        $('.child-folder').each(function () {
            let folderOrFileName = $(this).find('.name-of-file').text().toUpperCase();
            let isToggle = folderOrFileName.indexOf(searchText.toUpperCase()) !== -1;
            $(this).toggle(isToggle);
        });
        $('.without-folder-files').each(function () {
            let folderOrFileName = $(this).children('.name-of-file').text().toUpperCase();
            let isToggle = folderOrFileName.indexOf(searchText.toUpperCase()) !== -1;
            $(this).toggle(isToggle);
        });
    });




    $(document).on('click', ".modal-action-btn", function (event) {
        $(`.ui.modal.${$(this).attr("data-modal")}`).modal({ detachable: false }).modal('show');
        $('.select-input').dropdown();

        let cmp = $(this).attr("data-cmp");
        if (cmp === 'LWC') {
            localStorage.setItem('NEW_COMPONENT_FILE', JSON.stringify({ id: $(this).attr("data-id"), label: $(this).attr("data-label") }));
        } else {
            localStorage.setItem('NEW_COMPONENT_FILE', $(this).attr("data-id"));
        }
    });


    $(document).on('click', ".model-close-btn", function (event) {
        $('.ui.modal.active').modal('hide');
    });



    window.addEventListener("offline", (event) => {
        Swal.fire(
            'No Internet',
            'Please check your Internet connection.',
            'error'
        )
    });

    /*--- Block Access ---*/

    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    }, true);

    function ctrlShiftKey(e, keyCode) {
        return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
    }

    $(document).keydown(function (event) {
        if (
            event.keyCode === 123 ||
            ctrlShiftKey(event, 'I') ||
            ctrlShiftKey(event, 'J') ||
            ctrlShiftKey(event, 'C') ||
            (event.ctrlKey && event.keyCode === 'U'.charCodeAt(0))
        ) {
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
                icon: "info",
                title: "CTRL + S | ⌘ + S",
                text: "Use inside the code editor area to save code.",
            });
            return false;
        }

    });






});