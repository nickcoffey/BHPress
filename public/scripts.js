function sendMail() {
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var email = $("#email").val();
    // var phone = $("#phone").val();
    var details = $("#details").val();
    
    if(validateMail(fname, lname, email, details)) {
        $("#mail-loader").show(); // show spinner
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
            $("#mail-loader").hide(); // hide spinner
            if (res.code == 200) {
                $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
                    $("#success-alert").slideUp(500);
                });
            } else if (res.code == 500) {
                $("#fail-alert").fadeTo(5000, 500).slideUp(500, function () {
                    $("#fail-alert").slideUp(500);
                });
            }
        });
    
        // Email failed
        request.fail((jqXHR, res) => {
            $("#mail-loader").hide(); // hide spinner
            console.log(res.msg);
            $("#fail-alert").fadeTo(5000, 500).slideUp(500, function () {
                $("#fail-alert").slideUp(500);
            });
        });
        clearMailFields();
    }
}

function validateMail(fname, lname, email, details) {
    var isValidArray = [];
    if (fname == '' || fname == undefined || fname == null) { // fname is blank
        $("#fname-required").css("display", "inline");
        $("#fname").addClass("is-invalid"); 
        isValidArray.push(false);
    } else { // field is valid
        $("#fname-required").css("display", "none");
        $("#fname").removeClass("is-invalid");
    } 

    if(lname == '' || lname == undefined || lname == null) { // lname is blank
        $("#lname-required").css("display", "inline");
        $("#lname").addClass("is-invalid");
        isValidArray.push(false);
    } else { // field is valid
        $("#lname-required").css("display", "none");
        $("#lname").removeClass("is-invalid");
    }
    
    if(email == '' || email == undefined || email == null) { // email is blank
        $("#email-required").css("display", "inline");
        $("#email").addClass("is-invalid");
        isValidArray.push(false);
    } else { // field is valid
        $("#email-required").css("display", "none");
        $("#email").removeClass("is-invalid");
    }
    
    if(details == '' || details == undefined || details == null) {  // message is blank
        $("#message-required").css("display", "inline");
        $("#details").addClass("is-invalid");
        isValidArray.push(false);
    } else { // field is valid
        $("#message-required").css("display", "none");
        $("#details").removeClass("is-invalid");
    }

    if (isValidArray.includes(false)) { // if any field is invalid
        return false;
    }
    return true; // all fields are invalid
    
}

function clearMailFields() {
    $("#fname").val("");
    $("#lname").val("");
    $("#email").val("");
    $("#phone").val("");
    $("#details").val("");
}

// Hide navbar collapse on link click
$('.navbar-nav>li>a').on('click', function () {
    $('.navbar-collapse').collapse('hide');
});

window.onload = function typewriter() {
    var textArray = "bh | press".split('');
    var text = '';
    var header = '';
    textArray.forEach((character, index, array) => {
        this.setTimeout(() => {
            text = text + character;
            header = text + '|';
            $("#desktop-header").text(header);
            if (index === array.length - 1) { // on last loop remove cursor
                $("#desktop-header").text(text);
            }
        }, index * 250);
    });
}