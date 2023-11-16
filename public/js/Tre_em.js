document.addEventListener("DOMContentLoaded", function () {
 
    var aoLink = document.querySelector('.danhmuc ul li:nth-child(1) a');
    var quanLink = document.querySelector('.danhmuc ul li:nth-child(2) a');
    var aoSection = document.querySelector('.listItem-container.shirt');
    var quanSection = document.querySelector('.listItem-container.trousers');

    
    aoLink.addEventListener("click", function (event) {
        event.preventDefault(); 
        scrollSmoothly(aoSection);
    });

  
    quanLink.addEventListener("click", function (event) {
        event.preventDefault();
        scrollSmoothly(quanSection);
    });


    function scrollSmoothly(element) {
        window.scrollTo({
            behavior: 'smooth',
            top: element.offsetTop - document.querySelector('header').offsetHeight 
        });
    }
});
