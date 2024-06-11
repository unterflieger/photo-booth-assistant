document.addEventListener("DOMContentLoaded", function() {
    // Check for the termsAccepted cookie
    if (!getCookie("termsAccepted")) {
        console.log("No cookie found, showing terms modal.");
        showTermsModal();
    } else {
        console.log("Cookie found, terms already accepted.");
        hideTermsModal();
    }

    document.getElementById('confirmbutton').addEventListener('click', sendData);
    document.getElementById('acceptTerms').addEventListener('click', acceptTerms);
});

function sendData() {
    var vorname = document.getElementById('Vornameinput').value;
    var nachname = document.getElementById('Nachnameinput').value;
    var email = document.getElementById('emailinput').value;
    var confirmEmail = document.getElementById('ConfirmEmailinput').value;
    var number = document.getElementById('numberinput').value;

    if (!vorname || !nachname || !email || !confirmEmail || !number) {
        showPopup("Bitte alle Felder ausfüllen.");
        return;
    }

    if (email !== confirmEmail) {
        showPopup("Die E-Mail-Adressen stimmen nicht überein.");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "save_data.php", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            showPopup("Gesendet!");
            clearTextBoxes();
        } else {
            showPopup("Ups! Fehler: " + xhr.status);
        }
    };
    xhr.send("vorname=" + encodeURIComponent(vorname) + "&nachname=" + encodeURIComponent(nachname) + "&email=" + encodeURIComponent(email) + "&number=" + encodeURIComponent(number));
}

function showPopup(message) {
    var popup = document.getElementById('popup');
    var popupMessage = document.getElementById('popupMessage');
    popupMessage.textContent = message;
    popup.style.display = 'block';
}

function closePopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'none';
}

function clearTextBoxes() {
    document.getElementById('Vornameinput').value = '';
    document.getElementById('Nachnameinput').value = '';
    document.getElementById('emailinput').value = '';
    document.getElementById('ConfirmEmailinput').value = '';
    document.getElementById('numberinput').value = '';
}

function showTermsModal() {
    var termsModal = document.getElementById('termsModal');
    termsModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideTermsModal() {
    var termsModal = document.getElementById('termsModal');
    termsModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function acceptTerms() {
    setCookie("termsAccepted", "true", 30); // Set the cookie before hiding the modal
    console.log("Setting cookie and hiding terms modal.");
    hideTermsModal();
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    console.log(`Cookie set: ${name}=${value}; expires=${expires}`);
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
