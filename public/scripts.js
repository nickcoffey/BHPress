function openGallery(evt, galleryID) {
    // Declare all variables
    var i, galleryContent, galleryLinks;

    // Get all elements with class="gallery shown" and hide them
    galleryContent = document.getElementsByClassName("gallery shown");
    for (i = 0; i < galleryContent.length; i++) {
        galleryContent[i].className = "gallery";
    }

    // Get all elements with class="galleryLinks" and remove the class "active"
    galleryLinks = document.getElementsByClassName("navlink");
    for (i = 0; i < galleryLinks.length; i++) {
        galleryLinks[i].className = galleryLinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(galleryID).className = "gallery shown";
    evt.currentTarget.className += " active";
}

function sendMail() {
    var request = $.ajax({
        type: "POST",
        url: "/send-email",
        data: {
            fname: $("#fname").val(),
            lname: $("#lname").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            details: $("#details").val(),
        },
        dataType: "json"
    });

    // Email sent
    request.done((res) => {
        console.log(res);
        clearMailFields();
    });

    // Email failed
    request.fail((jqXHR, textStatus) => {
        console.log(textStatus);
    });
}

function clearMailFields() {
    $("#fname").val() = "";
    $("#lname").val() = "";
    $("#email").val() = "";
    $("#phone").val() = "";
    $("#details").val() = "";
}