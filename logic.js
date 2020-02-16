function startQuiz() {
   $('.larger-container').on('click', '.js-start-btn', function (event){
       $('.container').hide()
       createForm();
   });
}


//purpose of this function is to loop through the object STORE and populate the values for each question
function createChoices() {
    let question = STORE.questions[STORE.currentQuestion];
    for(let i=0; i<question.choices.length; i++){
        $('.optionContainer').append(`
        <input type='radio' name='options' id='option${i + 1}' value='${question.choices[i]}'>
        <label for='option${i + 1}'>${question.choices[i]}</label>
        <br>
        `);
    }
}

function updateCounters(){
    $('.js-number').text(`Question #: ${STORE.currentQuestion + 1}/${STORE.questions.length}`);
    $('.js-score').text(`Current Score: ${STORE.score}/${STORE.questions.length}`);
}


function finalPage(){
    $('.questionContainer').hide();
    $('.optionContainer').hide();
    $('.submitContainer').hide();
    $('.finalScore').append(`
    <p>Hope you learned everything you needed for the real test!</p>
    <p>Final Score</p>
    ${STORE.score}/${STORE.questions.length}
    <br>
    <button type='button' id='restart'>Restart</button>`
    )
};



//function is used for inserting the form onto the html
function createForm() {
    let question = STORE.questions[STORE.currentQuestion];
        let questionnaire = $(
            `<form class='js-form'>
                <fieldset>
                    <div class='questionContainer'>
                        <legend class='questionLegend'>${question.question}</legend>
                    </div>
                    <div class='optionContainer'>
                    </div>
                    <div class='submitContainer'>
                        <button typ='submit' id='answer'>Submit</button>
                        <button type='button' id='next'>Next</button>
                    </div>
                    <div class='finalScore'>
                    </div>
                </fieldset>
            </form>`
        );
    $('main').html(questionnaire);
    createChoices();
    updateCounters();
    $('#next').hide();
}

function nextButton(){
    $('body').on('click', '#next', function(event){
        event.preventDefault();
        if(STORE.currentQuestion === 10){
            finalPage();
        }
        else {
            STORE.currentQuestion++;
        createForm();
        }
    });
}


//purpose of this function is to capture the value of the checked choice then compare it to the correctAnswer in the array. Based on the answer it will prompt either right or wrong
//the counter for currentQuestion should increase and also bring back the next button
function submitButton(){
    $('body').on('submit', '.js-form', function(event) {
        event.preventDefault();
        let curQues = STORE.questions[STORE.currentQuestion];
        let pickedChoice = $('input:checked');
        let pickedValue = pickedChoice.val();
        let correct = STORE.questions[STORE.currentQuestion].correctAnswer;
        if(!pickedValue){
            alert('Please choose an option');
            return;
        }
        if(pickedValue === correct){
            alert('wow you got it right');
            STORE.score++;
        }
        else {
            alert(`better luck next time, the right answer is "${correct}"`);
        }
        $('#answer').hide();
        $('#next').show();
    })
}


function restart(){
    $('body').on('click', '#restart', function(event){
        event.preventDefault();
        STORE.currentQuestion = 0
        STORE.score = 0
        createForm();
    })
}


function handleQuizApp() {
    startQuiz();
    submitButton();
    nextButton();
    restart();
}


$(handleQuizApp);


