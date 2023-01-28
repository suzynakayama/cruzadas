const questionElement = document.getElementById("question");
const clueBtn = document.getElementById("clue-btn");
const clueElement = document.getElementById("clue");
const answerBtn = document.getElementById("answer-submit");
const answerElement = document.getElementById("answer");
const wrongAnswerElement = document.getElementById("wrong-answer");
const retryBtn = document.getElementById("retry-btn");
const boardArray = [...document.getElementById("board").children[0].children];
const order = [3, 5, 7, 4, 2, 6, 1, 8, 0];
let currentRow = 0;

const questions = {
	0: "Qual é o nome do pai do Arthur Mitsuki?",
	1: "Qual é o sobrenome por parte de pai do Arthur Mitsuki?",
	2: "Qual é o dia do nascimento do Arthur Mitsuki?",
	3: "Qual o primeiro nome do vovô Renato?",
	4: "Qual é o nome da única prima do Arthur Mitsuki?",
	5: "Qual é o nome do primo mais novo do Arthur Mitsuki?",
	6: "Qual é o nome da mamãe?",
	7: "Qual é o nome do primo mais velho do Arthur Mitsuki?",
	8: "Qual é o nome da vovó do Joaquim, da Júlia, do Antônio e do Arthur Mitsuki?",
};

const clues = {
	0: "Nome do dindo do Antônio.",
	1: "Mesmo sobrenome da família da mamãe.",
	2: "4 + 9 + 6",
	3: "Mesmo primeiro nome do dindo do Joaquim.",
	4: "Nome da prima do Joaquim e do Antônio.",
	5: "Nome do irmão do Joaquim.",
	6: "Precisa mesmo de dica???",
	7: "Nome do irmão do Antônio.",
	8: "Nome da mãe da mamãe.",
};

const answers = {
	0: "pedro",
	1: "almeida",
	2: "dezenove",
	3: "carlos",
	4: ["julia", "júlia"],
	5: ["antonio", "antônio"],
	6: "rachel",
	7: "joaquim",
	8: "eloisa",
};

let currentQuestion = questions[order[currentRow]];

const setQuestion = question => {
	if (currentRow < 9) {
		questionElement.innerText = question;
	} else {
		questionElement.innerText = "Parabens!";
	}
};

setQuestion(currentQuestion);

const setAndResetClue = (text, display) => {
	clueElement.innerText = text;
	clueElement.style.display = display;
};

const checkAnswer = answer => {
	console.log(answer);
	if (Array.isArray(answers[order[currentRow]])) {
		return answers[order[currentRow]].includes(answer);
	}
	return answers[order[currentRow]] == answer;
};

const highlightSecretWord = () => {
	for (let i = 0; i < 9; i++) {
		const id = "c4r" + String(i);
		const element = document.getElementById(id);
		setTimeout(() => {
			element.classList.value = "highlight";
		}, i * 120);
	}
};

const setAnswer = answer => {
	const row = boardArray[order[currentRow]];
	const cellsArray = [...row.cells];
	console.log(cellsArray);
	let idx = 0;
	cellsArray.forEach((cell, i) => {
		if (!cell.classList.length) {
			setTimeout(() => {
				cell.classList.value = "filled";
				cell.innerText = answer[idx];
				idx++;
			}, i * 180);
		}
	});
};

const runEnding = () => {
	const element = document.getElementById("topam");
	element.style.visibility = "unset";
	highlightSecretWord();
	const fireworksArray = [...document.getElementById("fireworks").children];
	fireworksArray.forEach(firework => (firework.classList.value = "firework"));
	return;
};

clueBtn.addEventListener("click", () => {
	setAndResetClue(clues[order[currentRow]], "block");
});

retryBtn.addEventListener("click", () => {
	wrongAnswerElement.style.display = "none";
});

answerElement.addEventListener("keyup", ({ key }) => {
	if (key === "Enter") {
		answerBtn.click();
	}
});

answerBtn.addEventListener("click", () => {
	const answer = answerElement.value.toLowerCase();
	if (checkAnswer(answer)) {
		setAnswer(answerElement.value);
		setAndResetClue("", "none");
		answerElement.value = "";
		if (currentRow < 8) currentRow++;
		else setTimeout(() => runEnding(), 1000);
		setQuestion(questions[order[currentRow]]);
	} else {
		wrongAnswerElement.style.display = "block";
		answerElement.value = "";
	}
});
