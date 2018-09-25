function openGallery(evt, galleryID) {
    // Declare all variables
    var i, galleryContent, galleryLinks;

    // Get all elements with class="galleryContent" and hide them
    galleryContent = document.getElementsByClassName("gallery");
    for (i = 0; i < galleryContent.length; i++) {
        galleryContent[i].style.display = "none";
    }

    // Get all elements with class="galleryLinks" and remove the class "active"
    galleryLinks = document.getElementsByClassName("navlink");
    for (i = 0; i < galleryLinks.length; i++) {
        galleryLinks[i].className = galleryLinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(galleryID).style.display = "block";
    evt.currentTarget.className += " active";
}