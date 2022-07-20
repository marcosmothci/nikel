const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();



// LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const session = document.getElementById("session-input").checked; 

    const account = getAccount(email);
    
    if (!account) {
        alert("Opps! Verifique o usuário ou a senha")
        return;
    }

    if (account) {
        if(account.password !== password) {
            alert("Opps! Verifique o usuário ou a senha")
            return;

        }

        saveSession (email, session);


        window.location.href = "home.html";
    }


    



})

// CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e){
  e.preventDefault();

  const email = document.getElementById("email-create-input").value;
  const password = document.getElementById("password-create-input").value;


  if(email.length < 5) {
    alert("Preencha com um e-mail válido!");
    return;
  }

  if(password.length < 6) {
    alert("Escolha uma senha com no mínimo 6 dígitos")
    return;
  }

  saveAccount({
    login: email, 
    password: password,
    transactions: []
  })
  
  myModal.hide();

  alert("Conta criada com sucesso!")

});

function saveAccount(data) {
   localStorage.setItem(data.login, JSON.stringify(data)); 
}

function saveSession (data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
        
    }
    
    sessionStorage.setItem("logged", data);


}


function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session; 

    
    }

    if (logged) {
        saveSession(logged, session);
        
        window.location.href = "home.html"
    }

}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    } 

    return "";


}