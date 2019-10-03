$(document).ready(function () {

    $("#questions-container").hide();
    $("#doneButton").hide();

    var game = {
        questions: [{
            question: 'Which of the following numbers did Michael Jordan wear on his jersey for the majority of his NBA career?',
            possibilities: [' 23 ', ' 45 ', ' 11 ', ' 33 '],
            id: 'question-one',
            answer: 0
        }, {
            question: 'Who was the 35th President of the United States?',
            possibilities: [' Teddy Roosevelt ', ' Dwight Eisenhower ', ' John F. Kennedy ', ' Ronald Reagan '],
            id: 'question-two',
            answer: 2
        }, {
            question: 'In what year did women in the United States gain the right to vote?',
            possibilities: [' 1913 ', ' 1920 ', ' 1928 ', ' 1931 '],
            id: 'question-three',
            answer: 1
        }, {
            question: 'Which letter of the alphabet does not appear the name of any US state?',
            possibilities: [' Z ', ' Q ', ' K ', ' X '],
            id: 'question-four',
            answer: 1
        }, {
            question: 'Which of these films won best picture in 1995? (Hint: These were the 4 nominated films for that year!)?',
            possibilities: [' The Shawshank Redemption ', ' Four Weddings and a Funeral ', ' Pulp Fiction ', ' Forrest Gump '],
            id: 'question-five',
            answer: 3
        }, {
            question: 'Which of these is identified as an ewe?',
            possibilities: [' Female sheep ', ' Male sheep ', ' Female goat ', ' Male goat '],
            id: 'question-six',
            answer: 0
        }, {
            question: 'Who famously said, Give me liberty or give me death!?',
            possibilities: [' Bejamin Franklin ', ' Samuel Adams ', ' Thomas Paine ', ' Patrick Henry '],
            id: 'question-seven',
            answer: 3
        }, {
            question: 'What is the longest running television show still on the air?',
            possibilities: [' Law & Order: Special Victims Unit ', ' South Park ', ' The Simpsons ', ' NCIS '],
            id: 'question-eight',
            answer: 2
        }, ]
    }

    var counter;
    $('.startGame').on("click", run);

    var number = 45;

    function decrement() {
        $('.wrapper').show();

        $(this).hide();

        number--;
        $('#timeLeft').html('<h2>' + number + " seconds" + '</h2>');
        if (number === 0) {
            alert("Time's up!");
            clearInterval(counter);
            stop();
        }
    }

    function run() {
        $("#questions-container").show();
        $("#doneButton").show();
        $(".startGame").hide();
        clearInterval(counter);
        counter = setInterval(decrement, 1000);
    }

    function formTemplate(data) {

        var qString = "<form id='questionOne'><br><br>" + data.question + "<br>";

        var possibilities = data.possibilities;

        for (var i = 0; i < possibilities.length; i++) {
            var possible = possibilities[i];
            console.log(possible);
            qString = qString + "<input type='radio' name='" + data.id + "' value=" + i + ">" + possible;

        }
        return qString + "</form>";
    }
    window.formTemplate = formTemplate;

    function buildQuestions() {
        var questionHTML = ''
        for (var i = 0; i < game.questions.length; i++) {
            questionHTML = questionHTML + formTemplate(game.questions[i]);
        }
        $('#questions-container').append(questionHTML);

    }

    function isCorrect(question) {
        var answers = $('[name=' + question.id + ']');
        var correct = answers.eq(question.answer);
        var isChecked = correct.is(':checked');
        return isChecked;
    }

    buildQuestions();

    function checkAnswers() {

        var correct = 0;
        var incorrect = 0;
        var unAnswered = 0;

        for (var i = 0; i < game.questions.length; i++) {
            if (isCorrect(game.questions[i])) {
                correct++;
            } else {
                if (checkAnswered(game.questions[i])) {
                    incorrect++;
                } else {
                    unAnswered++;
                }
            }

        }
        $('.results').html('Correct: ' + correct + "<br>" + 'Incorrect: ' + incorrect + "<br>" + 'Unanswered: ' + unAnswered);
    }

    function checkAnswered(question) {
        var anyAnswered = false;
        var answers = $('[name=' + question.id + ']');

        for (var i = 0; i < answers.length; i++) {
            if (answers[i].checked) {
                anyAnswered = true;
            }
        }
        return anyAnswered;
    }

    $('#doneButton').on('click', function () {
        $("#questions-container").hide();
        $("#timeLeft").hide();
        $("#doneButton").hide();
        checkAnswers();
        stop();
        $("#messageDiv").html("Your Results:");
    })
});