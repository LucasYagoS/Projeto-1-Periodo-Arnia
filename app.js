const getPosts = async () => {
    const apiResponse = await fetch('http://localhost:3000/users')
    const users = await apiResponse.json()
    console.log(users)
    return users
}

const addPacient = async () => {
    const password = document.getElementById("inputPassword").value
    const confPass = document.getElementById("inputConfPass").value
    if (password === confPass) {
        const user = {
            "Nome": document.getElementById("inputName").value,
            "Email": document.getElementById("inputEmail").value,
            "Senha": document.getElementById("inputPassword").value,
            "Pacientes": []
        }
        await createPacient(user)
        location.replace("C:/Users/Lucas Yago/OneDrive/Documentos/GitHub/Projeto-1-Periodo-Arnia/login.html")
    }
}

const createPacient = async (pacient) => {
    await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pacient)
    });
}

const next = () => {
    const div1 = document.getElementById("div1")
    const div2 = document.getElementById("div2")

    div1.style.display = "none"
    div2.style.display = "block"
}

const login = async () => {
    const apiResponse = await fetch('http://localhost:3000/users')
    const users = await apiResponse.json()
    const userLogin = document.getElementById("inputLogin").value
    const userPassword = document.getElementById("loginPassword").value
    users.forEach(user => {
        if (user.Email === userLogin && user.Senha === userPassword) {
            location.replace("C:/Users/Lucas Yago/OneDrive/Documentos/GitHub/Projeto-1-Periodo-Arnia/listarPacientes.html?id=" + user.id)
        }
    });
}

const listPacients = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const userId = params.id;
    console.log(userId);
}

