document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('confirmbutton').addEventListener('click', sendData);
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
