const form = document.querySelector('.php-email-form');
const name = document.getElementById('nameC');
const email = document.getElementById('emailC');
const subject = document.getElementById('subjectC');
const message = document.getElementById('messageC');
const submitButton = document.getElementById('contactUsBtn');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let formData = {
        name = name.value,
        email = email.value,
        subject = subject.value,
        message = message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/contactEmail');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
        console.log(xhr.responseText);
        if (xhr.responseText == 'success') {
            alert('Email Sent!');
            name.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';
        } else {
            alert("There was an issue with your request!");
        }

        xhr.send(JSON.stringify(formData));
    }
});