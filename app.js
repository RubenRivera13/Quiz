const questions = [
    {categoria:"HTML", pregunta:"¿Etiqueta para título principal?", opciones:["<h1>", "<title>" ,"<header>" ,"<h6>"], respuesta:0, explicacion:"<h1> es el encabezado principal."},
    {categoria:"HTML", pregunta:"¿Etiqueta para enlaces?", opciones:["<a>", "<link>", "<href>", "<url>"], respuesta:0, explicacion:"<a> crea enlaces."},

    {categoria:"CSS", pregunta:"¿Propiedad para el color de texto?", opciones:["background", "color", "font", "text"], respuesta:1, explicacion:"color cambia el color del texto."},
    {categoria:"CSS", pregunta:["¿Qué incluye el modelo de caja?"], opciones:["margin", "padding", "border", "todas"], respuesta:3, explicacion:"incluye todas."},

    {categoria:"JS", pregunta:"Tipos de dato número?", opciones:["int", "number", "float", "double"], respuesta:1, explicacion:"Js usa number."},
    {categoria:"JS", pregunta:"¿Evento click?", opciones:["onchange", "onclick", "onhover", "onpress"], respuesta:1, explicacion:"onclick maneja click."},

    {categoria:"Git", pregunta:"Comando para guardar cambios", opciones:["git save", "git commit", "git push", "git add"], respuesta:1, explicacion:"commit guarda cambios."},
    {categoria:"Git", pregunta:"Comando para subir a remoto", opciones:["git upload", "git send", "git push", "git sync"], respuesta:2, explicacion:"push sube los cambios."},

    {categoria:"Terminal", pregunta:"¿Listar archivos?", opciones:["ls", "dir", "list", "show"], respuesta:0, explicacion:"ls lista los archivos"},
    {categoria:"Terminal", pregunta:"¿Como cambias de carpetas?", opciones:["cd", "mv", "cp", "open"], respuesta:0, explicacion:"cd cambia directorio."},

    {categoria:"Internet", pregunta:"¿Protocolo web?", opciones:["FTP", "HTTP", "SSH", "TCP"], respuesta:1, explicacion:"HTTP es web."},
    {categoria:"Internet", pregunta:"¿Qué es una URL?", opciones:["Dirección web", "Servidor", "Código", "Archivo"], respuesta:0, explicacion:"URL es dirección."}
]

let current = 0;
let score = 0;

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-bnt");
const restartBtn = document.getElementById("restart-btn");

startBtn.onclick = () => {
    showScreen("quiz_screen");
    renderQuestions();
}

nextBtn.onclick = () => {
    current++;
    if(current < questions.length){
        renderQuestions();
    }else{
        showResult();
    }
}

restartBtn.onclick = () => location.reload();

function renderQuestions() {
    nextBtn.classList.add("hidden");
    const q = questions[current];

    document.getElementById("categori").textContent = q.categoria;
    document.getElementById("question").textContent = q.pregunta;
    document.getElementById("progress-text").textContent = `Pregunta ${current+1} de ${questions.length}`;
    document.getElementById("score").textContent = `Puntaje: ${score}`;

    document.getElementById("progress-fill").style.width = `${(current/questions.length) * 100}%`;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.opciones.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => handleAnswer(i, btn);
        optionsDiv.appendChild(btn);
    })

    document.getElementById("explanation").textContent = "";
}

function handleAnswer(index, btn){
    const q = questions[current];
    const buttons = document.querySelectorAll("#options button");

    buttons.forEach(b => b.disabled = true);

    if(index === q.respuesta) {
        btn.classList.add("correct");
        score++;
    }else{
        btn.classList.add("wrong");
        buttons[q.respuesta].classList.add("correct");
    }

    document.getElementById("score").textContent = `Puntaje: ${score}`;
    document.getElementById("explanation").textContent =  q.explicacion;

    nextBtn.classList.remove("hidden");
}

function showResult(){
    showScreen("result-screen");

    document.getElementById("final-score").textContent = `Obtuviste ${score} de ${questions.length}`;

    let msg = "";
    if(score > 9){
        msg = "Excelenet"
    }else if(score > 6){
        msg = "Bien echo";
    }else{
        msg = "Sigue practicando"
    }

    document.getElementById("final-message").textContent = msg;
}

function showScreen(id){
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}