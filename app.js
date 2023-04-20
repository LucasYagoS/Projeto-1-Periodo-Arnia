//VARIAVEL PARA RECEBER O ID DO USUARIO ATUAL DA API
let userId = 0
//FUNÇÃO QUE PEGA OS USUARIOS DA API
const getPosts = async () => {
    const apiResponse = await fetch('http://localhost:3000/users')
    const users = await apiResponse.json()
    console.log(users)
    return users
}
//FUNÇÃO QUE PEGA UM PACIENTE ESPECIFICO COM BASE NO ID DELE NA API
const getPacient = async (id) => {
    const apiResponse = await fetch(`http://localhost:3000/pacients/${id}`)
    const pacient = await apiResponse.json()
    return pacient
}
const getDoc = async (userId) => {
    const apiResponse = await fetch(`http://localhost:3000/users/${userId}`)
    const doctor = await apiResponse.json()
    return doctor
}
//FUNÇÃO QUE PEGA OS DADOS ESCRITOS PELO USUARIO NA ÁREA DE CADASTRO
const addUser = async () => {
    const password = document.getElementById("inputPassword").value
    const confPass = document.getElementById("inputConfPass").value
    if (password === confPass) {
        const user = {
            "Nome": document.getElementById("inputName").value,
            "Email": document.getElementById("inputEmail").value,
            "Senha": document.getElementById("inputPassword").value,
        }
        await createUser(user)
        location.replace("C:/Users/Lucas Yago/OneDrive/Documentos/GitHub/Projeto-1-Periodo-Arnia/login.html")
    }
}
//FUNÇÃO QUE ADICIONA O OBJETO USUARIO NA API
const createUser = async (user) => {
    await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}
//FUNÇÃO PARA TROCAR DE CADASTRO
const next = () => {
    const div1 = document.getElementById("div1")
    const div2 = document.getElementById("div2")

    div1.style.display = "none"
    div2.style.display = "block"
}
//FUNÇÃO PARA FAZER LOGIN NA CONTA DO USUARIO
const login = async () => {
    const userLogin = document.getElementById("inputLogin").value
    const userPassword = document.getElementById("loginPassword").value
    const apiResponse = await fetch(`http://localhost:3000/users?Email=${userLogin}&Senha=${userPassword}`)
    const users = await apiResponse.json()
    if (users.length > 0) {
        location.replace("C:/Users/Lucas Yago/OneDrive/Documentos/GitHub/Projeto-1-Periodo-Arnia/listarPacientes.html?id=" + users[0].id)
    } else {
        alert("Usuario não encontrado")
    }
}

//FUNÇÃO PARA LISTAR OS PACIENTES NA TELA
const listPacients = async () => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    userId = params.id
    console.log(userId)
    const doctor = await getDoc(userId)
    document.getElementById("docName").innerHTML = doctor.Nome
    const apiResponse = await fetch(`http://localhost:3000/pacients?docId=${userId}`)
    let pacients = await apiResponse.json()
    console.log(pacients)
    const pacientList = document.getElementById("listOfPacients")
    pacients.forEach(pacient => {
        pacientList.innerHTML += `
        <div class="row m-0 p-0">
                            <li class="list-group-item col-2">${pacient.id}</li>
                            <li class="list-group-item col-4">${pacient.nome}</li>
                            <li class="list-group-item col-4">${pacient.cpf}</li>
                            <li class="list-group-item col-2">
                                <img onclick="" src="imgs/form_icon.png" alt="">
                                <img onclick="editPacient(${pacient.id})" src="imgs/edit_icon.png" alt="">
                                <img onclick="delPacient(${pacient.id})" src="imgs/delete_icon.png" alt="">
                            </li>
                        </div>
        `

    });
}
//FUNÇÃO PARA ABRIR O MODAL DE CADASTRO DE PACIENTE
const openModal = () => {
    document.getElementById("modal").style.display = "block"
}
//FUNÇÃO PARA FECHAR O MODAL DE EDITAR PACIENTE
const closeEditModal = () => {
    document.getElementById("editModal").style.display = "none"
}
//FUNÇÃO PARA FECHAR O MODAL DE CADASTRO DE PACIENTE
const closeModal = () => {
    document.getElementById("modal").style.display = "none"
}
//FUNÇÃO PARA CRIAR O OBJETO DE UM NOVO PACIENTE
const addPacient = async () => {
    const pacient = {
        "cpf": document.getElementById("cpf").value,
        "nome": document.getElementById("name").value,
        "nascimento": document.getElementById("birthDate").value,
        "email": document.getElementById("email").value,
        "sexo": document.getElementById("sex").value,
        "nacionalidade": document.getElementById("country").value,
        "naturalidade": document.getElementById("originCountry").value,
        "profissão": document.getElementById("profession").value,
        "escolaridade": document.getElementById("scholarShip").value,
        "estadoCivil": document.getElementById("civilState").value,
        "mae": document.getElementById("mother").value,
        "pai": document.getElementById("father").value,
        "docId": userId
    }

    await createPacient(pacient)
    closeModal()
    location.reload()
}
//FUNÇÃO PARA ADICIONAR O OBJETO DO PACIENTE NA API
const createPacient = async (pacient) => {
    await fetch("http://localhost:3000/pacients", {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pacient)
    });
    clearForm()
}
//FUNÇÃO PARA LIMPAR O FORMULARIO DE CADASTRO
const clearForm = () => {
    document.getElementById("cpf").value = ""
    document.getElementById("name").value = ""
    document.getElementById("birthDate").value = ""
    document.getElementById("email").value = ""
    document.getElementById("sex").value = ""
    document.getElementById("country").value = ""
    document.getElementById("originCountry").value = ""
    document.getElementById("profession").value = ""
    document.getElementById("scholarShip").value = ""
    document.getElementById("civilState").value = ""
    document.getElementById("mother").value = ""
    document.getElementById("father").value = ""
}
//FUNÇÃO PARA DELETAR UM PACIENTE
const delPacient = async (id) => {
    await fetch(`http://localhost:3000/pacients/${id}`, {
        method: 'DELETE'
    })
    location.reload()
}
//VARIAVEL PARA RECEBER O ID DO PACIENTE QUE ESTÁ SENDO EDITADO
let currentId = null
const editPacient = async (id) => {
    const currentPacient = await getPacient(id)
    document.getElementById("cpfEdit").value = currentPacient.cpf
    document.getElementById("nameEdit").value = currentPacient.nome
    document.getElementById("birthDateEdit").value = currentPacient.nascimento
    document.getElementById("emailEdit").value = currentPacient.email
    document.getElementById("sexEdit").value = currentPacient.sexo
    document.getElementById("countryEdit").value = currentPacient.nacionalidade
    document.getElementById("originCountryEdit").value = currentPacient.naturalidade
    document.getElementById("professionEdit").value = currentPacient.profissão
    document.getElementById("scholarShipEdit").value = currentPacient.escolaridade
    document.getElementById("civilStateEdit").value = currentPacient.estadoCivil
    document.getElementById("motherEdit").value = currentPacient.mae
    document.getElementById("fatherEdit").value = currentPacient.pai

    document.getElementById("editModal").style.display = "block"

    currentId = id

}
//FUNÇÃO PARA SALVAR AS ALTERAÇÕES FEITAS NO USUSARIO EM UM OBJETO
const saveNewPacient = async () => {

    const updatedPacient = {
        "cpf": document.getElementById("cpfEdit").value,
        "nome": document.getElementById("nameEdit").value,
        "nascimento": document.getElementById("birthDateEdit").value,
        "email": document.getElementById("emailEdit").value,
        "sexo": document.getElementById("sexEdit").value,
        "nacionalidade": document.getElementById("countryEdit").value,
        "naturalidade": document.getElementById("originCountryEdit").value,
        "profissão": document.getElementById("professionEdit").value,
        "escolaridade": document.getElementById("scholarShipEdit").value,
        "estadoCivil": document.getElementById("civilStateEdit").value,
        "mae": document.getElementById("motherEdit").value,
        "pai": document.getElementById("fatherEdit").value,
        "docId": userId
    }

    await updatePacient(currentId, updatedPacient)
    document.getElementById("editModal").style.display = "none"
}
//FUNÇÃO PARA TROCAR O OJETO MODIFICADO COM O DO PACIENTE EM QUESTÃO NA API
const updatePacient = async (id, updatedPacient) => {
    await fetch(`http://localhost:3000/pacients/${id}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPacient)
    })
}