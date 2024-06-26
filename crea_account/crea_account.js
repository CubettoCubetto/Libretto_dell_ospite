let urlServer = "https://diegopirovano.pythonanywhere.com"
//urlServer = "http://127.0.0.1:8013"

function startLoading(){
    document.getElementById('loadingDiv').style.display = 'flex'; // Show the loading div
}
function stopLoading(){
    document.getElementById('loadingDiv').style.display = 'none'; // don't show the loading div
}


document.getElementById('createAccountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Check if passwords match
    if (document.getElementById('password').value !== document.getElementById('confirmPassword').value) {
        alert("attenzione: le due password non corrispondono");
        return;
    }

    const formData = new FormData();
    formData.append('formFile', document.getElementById('formFile').files[0]);
    formData.append('text1', document.getElementById('text1').value);
    formData.append('password', document.getElementById('password').value);
    formData.append('text3', document.getElementById('text3').value);
    formData.append('star1', document.getElementById('star1').value);
    formData.append('star2', document.getElementById('star2').value);
    formData.append('star3', document.getElementById('star3').value);
    formData.append('star4', document.getElementById('star4').value);
    formData.append('star5', document.getElementById('star5').value);
    formData.append('name', document.getElementById('name').value);
    formData.append('providedPassword', document.getElementById('providedPassword').value);

    for (const value of formData.values()) {
        console.log(value);
    }
    startLoading()
    fetch(urlServer + "/create_account", {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        
        if(data["status"] != "success"){
            stopLoading()
            alert("attenzione-->"+data["message"])
            return
        }
        // Open the account confirmation page
        window.open("https://cubettocubetto.github.io/Libro_dell_ospite/account_creato/account_creato.html?username=" + data['username'], "_self");
    })
    .catch(error => {
        stopLoading()
        console.error('Error:', error);
    });
});
