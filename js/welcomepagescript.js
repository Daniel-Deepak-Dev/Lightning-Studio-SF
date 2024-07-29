$(function () {

    $("body").on("contextmenu", function () {
        return false;
    });

    $(document).keydown(function (event) {
        if ((event.ctrlKey && event.shiftKey && (event.which == 73 || event.key.toLowerCase() == 'i')) || (event.which == 123 || event.key == 'F12')) {
            event.preventDefault();
        }
    });
});

// document.addEventListener("DOMContentLoaded", () => {
   
//     function counter(id, start, end, duration) {
//         let obj = document.getElementById(id),
//             current = start,
//             range = end - start,
//             increment = end > start ? 1 : -1,
//             step = Math.abs(Math.floor(duration / range)),
//             timer = setInterval(() => {
//                 current += increment;
//                 obj.textContent = current;
//                 if (current == end) {
//                     clearInterval(timer);
//                 }
//             }, step);
//     }

//     // counter("total_downloaded", 0, 50000, 50);

// });


