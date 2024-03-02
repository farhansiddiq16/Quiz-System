import inquirer from "inquirer";
const apilink = "https://opentdb.com/api.php?amount=6&category=17&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
let data = await fetchData(apilink);
let startQuiz = async () => {
    let score = 0;
    let name = await inquirer.prompt({
        type: "input",
        name: "fname",
        message: "What is your name?"
    });
    for (let i = 1; i <= 5; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answers.map((val) => val),
        });
        if (ans.quiz == data[i].correct_answer) {
            ++score;
            console.log("Correct");
        }
        else {
            console.log(`Wrong! the answer is ${data[i].correct_answer}`);
        }
    }
    console.log(`Dear ${name.fname} , your score is ${score} out of 5`);
};
startQuiz();
