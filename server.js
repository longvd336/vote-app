const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
//route
// res.send("<h1>hello world</h1>")
// co the tra ve text or html
// __dirname dan toi file dang chua file code
// res.sendFile(__dirname + "/package.json");
app.use(express.static('views'))
app.use(bodyParser.urlencoded({extended: false}));
var index = 0;

app.get('/', (req, res) => {
    const fileData = fs.readFileSync("questions.json", {encoding:"utf-8"});
    const questionList = JSON.parse(fileData);
    var randomNumber = Math.floor(Math.random()*questionList.length);
    index = randomNumber;
    var randomQuestion = questionList[randomNumber];
    var answerHTML = fs.readFileSync("views/answer.html", {encoding:'utf-8'});
    const changeQuestion = answerHTML.replace('<h1></h1>',`<h1>${randomQuestion.content}</h1>`)
                                    // .replace('/answer-question',`/answer-question/${questionList.indexOf(randomQuestion)}`)
    res.send(changeQuestion);
});
app.get('/ask', (req, res) => {
    res.sendFile(__dirname + '/views/ask.html');

});
// Params question/something

app.get('/question/:questionIndex', (req, res) => {
    const fileData = fs.readFileSync("questions.json", {encoding:"utf-8"});
    const questionList = JSON.parse(fileData);
    const question = questionList[req.params.questionIndex];
    
    if(question){
        const questionDetailHTML = fs.readFileSync("views/questiondetail.html",{encoding:'utf-8'})
        const htmlWithData = questionDetailHTML.replace('question_content', question.content)
                                            .replace('total Vote', question.yes + question.no)
                                            .replace('vote_yes', question.yes)
                                            .replace('vote_no',question.no);
        res.send(htmlWithData);
    }else{
        res.send("question not found!!");
    }
});

// style css : get file vao 
// static file (nodejs)

//backend router

app.post('/add-question', (req, res) => {
    const fileData = fs.readFileSync("questions.json", {encoding:"utf-8"});
    const questionList = JSON.parse(fileData);
    const questionContent = req.body.question;
    questionList.push({
        content: questionContent,
        yes:0,
        no:0,

    });
    fs.writeFileSync("questions.json", JSON.stringify(questionList));
    res.redirect(`/question/${questionList.length - 1}`);
});

app.post('/answer-question', (req, res) => {
    const fileData = fs.readFileSync('questions.json', {encoding:"utf-8"});
    const questionList = JSON.parse(fileData);
    const questionCurrent = questionList[index];
    const chooseYesNo = req.body.choose;

    if(chooseYesNo === 'doicauhoi'){
        res.redirect('/');
    }
    else if(chooseYesNo === 'yes'){
        questionCurrent.yes = questionCurrent.yes + 1 ;
        fs.writeFileSync("questions.json",JSON.stringify(questionList));
        res.redirect(`/question/${index}`);
    }
    else if(chooseYesNo === 'no'){
        questionCurrent.no = questionCurrent.no + 1 ;
        fs.writeFileSync("questions.json",JSON.stringify(questionList));
        res.redirect(`/question/${index}`);
    }
    else{
        res.redirect(`/question/${index}`);
    }
});

app.listen(6969, (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('success!!');
    }
});