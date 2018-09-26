function openGallery(evt, galleryID) {
    // Declare all variables
    var i, galleryContent, galleryLinks;

    // Get all elements with class="gallery shown" and hide them
    galleryContent = document.getElementsByClassName("gallery col-12 shown");
    for (i = 0; i < galleryContent.length; i++) {
        galleryContent[i].className = "gallery col-12";
    }

    // Get all elements with class="galleryLinks" and remove the class "active"
    galleryLinks = document.getElementsByClassName("navlink");
    for (i = 0; i < galleryLinks.length; i++) {
        galleryLinks[i].className = galleryLinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(galleryID).className = "gallery col-12 shown";
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
        $("#emailAlert").text(res.msg);
        if (res.code == 200) {
            $("#emailAlert").addClass("success");
        } else if(res.code == 500) {
            $("#emailAlert").addClass("failure");
        }
    });

    // Email failed
    request.fail((jqXHR, res) => {
        console.log(res.msg);
        $("#emailAlert").text("Email failed to send. Please try again or email us directly at email@email.com");
        $("#emailAlert").addClass("failure");
    });

    clearMailFields();
}

function clearMailFields() {
    $("#fname").text("");
    $("#lname").text("");
    $("#email").text("");
    $("#phone").text("");
    $("#details").text("");
}