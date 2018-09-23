var employeeList = [
	['dee', 	'Does nothing, but has connections on the board', true],	
	['john', 	'Watering plants, they are people as well you know', false],
	['joshua', 	'Is the backbone of this company', true],
	['roland', 	'Loves baseball! Trade cards all day long', false],
	['jasmine', 'Head of storage', true],
	['dwight', 	'Assistant to the regional manager', true],
	['creed', 	'Has Ligma', false],
	['leslie', 	'Over enthusiastic', true],
	['gilfoyle','Writes wonderful code', true],
	['bob', 	'Haunts people, very discomforting', false],
	['abed', 	'Daydreamer', false],
	['chang', 	'A big distraction', false],
	['jaime', 	'Can be trusted with the right arm', true],
	['morty', 	'The youngest ', false],
	['richmond','Only works at night ', true],
	['elliot', 	"You don't want him on your bad side", true],	 
	['dale', 	'On point', true],
	['blake', 	'Smokes a lot of weed', false],
	['neal', 	'Gets out of control sometimes', false],
	['skyler', 	'Best accountant', true]

];
var employeePressed = 0;
var totalScore = [];


$(document).ready(function() {
	$('.start-game').click(function() {
		$(this).parents('.dialog').fadeOut(200);
		$('.questGoodBadEmployee').delay(200).fadeIn(100);
	});

	$('.start-questGoodBadEmployee').click(function() {
		$(this).parents('.dialog').fadeOut();
		questGoodBadEmployee();
		$('.person-list.good-bad').delay(300).fadeIn(300);
	});
});


function questGoodBadEmployee() {

	for (i = 0; i < employeeList.length; i++ ) {
		var element = $(document.createElement('div')).addClass('person').html('<div class="name"><span>'+ employeeList[i][0] + '</span><br/>'
				+ employeeList[i][1] + '</div><div class="hidden"><div class="person-button good">Good</div><div class="person-button bad">Bad</div></div>');
		$('.person-list.good-bad').append(element);
	}
	$('.person-button').click(function() {
		if ($(this).hasClass('good')) {
			$(this).parents('.person').addClass('pressed good-employee');
		} else {
			$(this).parents('.person').addClass('pressed bad-employee');
		}

		// Check if all button is pressed
		employeePressed++;

		if (employeePressed == employeeList.length) {
		// if (employeePressed == 2) {
			var employeeScore = 0;
			var z = 0;
			$('.person-list.good-bad .person').each(function() {
				if ($(this).hasClass('good-employee')) {
					if (employeeList[z][2]) {
						employeeScore = employeeScore + 5;
					}
				} else {
					if (!employeeList[z][2]) {
						employeeScore = employeeScore + 5;
					}
				}
				z++;
			});
			totalScore.push(employeeScore);

			$('.person-list.good-bad').fadeOut(300);
			sendDialog(
				'questRemeberTheirNames',	
				'Yes unfortunately that is your team, so do you remember their names? Meeting in 2...<br/> ' +
				'<div class="dialog-button start-questRemeberTheirNames">Wait what?</div>'
			);

			$('.start-questRemeberTheirNames').click(function () {
				questRemeberTheirNames();
			});
		}

	});
}

function questRemeberTheirNames() {
	$('.questRemeberTheirNames').fadeOut(300);
	$('.name-quest').fadeIn(300);

	var xTime = 120;
	var timer = setInterval(timer, 1000);

	function timer() {
		xTime--;
		$('.the-timer span').html(xTime);
		if (xTime < 1) {
			clearInterval(timer)
			questRemeberTheirNamesEnd(checkTheScore());
		}
	}

	$('.name-quest-input').focus();

	var knownEmployees = [];
	$('form').submit(function(e) {
		e.preventDefault();
		var value = $('.name-quest-input').val();
		value = value.toLowerCase();
		for (i = 0; i < employeeList.length; i++ ) {
			if (value == employeeList[i][0])  {
				if ($.inArray(value, knownEmployees) == -1) {
					knownEmployees.push(value);
					$('.name-quest-list').append('<div class="person"><span>'+ value + '</span></div>');
				}
			}
		}

		if ($.inArray(value, knownEmployees) >  -1) {
		} else {
			$('.name-quest-message').html('There is no <span>'+ value +'</span> here...').show().delay(1000).fadeOut(200);
		}
		$('.name-quest-input').val('');

		if (knownEmployees.length > 19) {
			questRemeberTheirNamesEnd(checkTheScore());
		}

	});
	function checkTheScore() {
		var nameScore = 0;
		$('.person-list.name-quest-list .person').each(function() {
			nameScore = nameScore + 5;
		});
		totalScore.push(nameScore);
		return nameScore; 
	}
	function questRemeberTheirNamesEnd(score) {
		clearInterval(timer);
		$('.name-quest-input').attr("disabled", true);
		if (score > 60) {
			var msg = 'A man of the people!';
		} else {
			var msg = 'Well that went admirably...';
		}

		sendDialog(
			'questRemeberTheirNames',	
			 msg + '<br/><br/> Now you have to know who to say Yes or No to. <br/>' + 
			'<div class="dialog-button start-questMeeting">Okey</div>'
		);
		$('.start-questMeeting').click(function() {
			$('.questRemeberTheirNames').fadeOut();
			questMeeting();
		});
	}
}

function questMeeting() {
	$('.name-quest').fadeOut(300);
	$('.meeting-quest').delay(300).fadeIn(300);

	var meetingPersons = [];
	var meetingScore = 0;

	var xTime = 60;
	var timer = setInterval(timer, 1000);

	function timer() {
		xTime--;
		$('.the-timer span').html(xTime);
		if (xTime < 1) {
			clearInterval(timer)
			meetingEnd();
		}
	}

	for (i = 0; i < employeeList.length; i++) {
		var element = $(document.createElement('div')).addClass('person p'+i).html('<div class="name"><span>'+ employeeList[i][0] 
			+ '</span></div><div class="hidden"><div class="person-button clear-meeting yes">Yes</div><div class="person-button clear-meeting no">No</div></div>');
		$('.meeting-quest .person-list').append(element);
		meetingPersons.push('p'+i);
	}

	var meetingTalk = setInterval(meetingTalk, 2000);

	function meetingTalk() {
		for (i = 0; i < 3; i++) {
			var oneRandomPerson = Math.floor((Math.random() * meetingPersons.length));
			if (!$('.p' + oneRandomPerson).hasClass('good-meeting') && !$('.p' + oneRandomPerson).hasClass('bad-meeting')) {
				$('.p' + oneRandomPerson).addClass('good-meeting');
			}
		}
		for (i = 0; i < 5; i++) {
			var oneRandomPerson = Math.floor((Math.random() * meetingPersons.length));
			if (!$('.p' + oneRandomPerson).hasClass('good-meeting') && !$('.p' + oneRandomPerson).hasClass('bad-meeting')) {
				$('.p' + oneRandomPerson).addClass('bad-meeting');
			}
		}
	}

	$('.clear-meeting').click(function() {
		if ($(this).parents('.person').hasClass('good-meeting')) {
			if ($(this).hasClass('yes')) {
				meetingScore = meetingScore + 10;
			} else {
				meetingScore = meetingScore - 10;
			}
		}

		if ($(this).parents('.person').hasClass('bad-meeting')) {
			if ($(this).hasClass('yes')) {
				meetingScore = meetingScore - 10;
			}
		}
		$('.meeting-score').text(meetingScore);
		$(this).parents('.person').removeClass('bad-meeting good-meeting');
	});

	function meetingEnd() {

		if (meetingScore > 500) {
			totalScore.push(100);
		} else if (meetingScore > 200) {
			totalScore.push(75);
		} else if (meetingScore > 100) {
			totalScore.push(50);
		} else {
			totalScore.push(10);
		}

		clearInterval(meetingTalk)
		$('.person').removeClass('bad-meeting good-meeting');
		sendDialog(
			'questMeeting',
			'Meeting is over, who knows what will happen now...<br/> <br/> You should finish those pie charts before the review. Only the good once of course...<br/>' + 
			'<div class="dialog-button start-questPieCharts">Okey</div>'
		);
		$('.start-questPieCharts').click(function() {
			$('.questMeeting').fadeOut();
			questPieCharts();
		});
	}
}

function questPieCharts() {
	$('.meeting-quest').fadeOut(300);
	$('.pie-quest').delay(300).fadeIn(300);

	var xTime = 15;
	var timer = setInterval(timer, 1000);

	function timer() {
		xTime--;
		$('.pie-quest .the-timer span').html(xTime);
		if (xTime < 1) {
			clearInterval(timer)
			endPie();
		}
	}

	var myPies = [];
	var aPiePiece = 0;
	var aPieScore = 0;

	for (i = 0; i < 36; i++) {
		$('.pie-quest-content').append('<div class="pie-part pie'+ i +'"></div>');
		myPies.push('pie'+i);
	}

	for (i = 0; i < 1; i++) {
		var oneRandomPie = Math.floor((Math.random() * myPies.length));
		$('.pie-part.pie'+oneRandomPie).addClass('green');
	}
	$('.pie-quest-content').on('click', '.green', function() {
		$('.pie-part').removeClass('green');
		for (i = 0; i < 1; i++) {
			var oneRandomPie = Math.floor((Math.random() * myPies.length));
			$('.pie-part.pie'+oneRandomPie).addClass('green');
		}
		aPiePiece++;
		if (aPiePiece == 3) {
			aPiePiece = 0;
			aPieScore = aPieScore + 1;
			$('.pie-score').append('<div class="pie-full"></div>');
		}
	});

	function endPie() {
		if (aPieScore > 8) {
			totalScore.push(100);
		} else if(aPieScore > 6) {
			totalScore.push(75);
		} else if(aPieScore > 4) {
			totalScore.push(50);
		} else {
			totalScore.push(10);
		}

		$('.pie-part').removeClass('green');
		sendDialog(
			'questPieCharts',
			'Look at that! Time for the board to review your time at the company, good luck!<br/> <div class="dialog-button start-questReview">Okey</div>'
		);
		$('.start-questReview').click(function() {
			$('.questPieCharts').fadeOut(300);
			questReview();
		});
	}
} 

function questReview() {
	$('.pie-quest').fadeOut(300);
	$('.review-quest').delay(300).fadeIn(300);

	var scoreText = [];

	for (i = 0; i < totalScore.length; i++ ) {
		if (totalScore[i] > 90) {
			scoreText.push('Marvelous');
		} else if (totalScore[i] > 70) {
			scoreText.push('Good');
		} else if (totalScore[i] > 40) {
			scoreText.push('Mediocre');
		} else {			
			scoreText.push('Garbage');
		}
	}

	scoreSum = totalScore.reduce((a, b) => a + b, 0);
	var msg = ''
	if (scoreSum > 250) {
		msg = '<br/><h2>CONGRATULATIONS!</h2><br/>'
	} else {
		msg = '<br/><h2>YOU ARE FIRED!</h2><br/>'
	}
	msg += 'Sincerely the board';
	msg += '<br/><br/><div class="dialog-button thanks-for-playing">Thanks for playing</div>';

	$('.review-quest-the-review .dividing span').text(scoreText[0]);
	$('.review-quest-the-review .knowing span').text(scoreText[1]);
	$('.review-quest-the-review .listener span').text(scoreText[2]);
	$('.review-quest-the-review .piechart span').text(scoreText[3]);

	$('.review-go-on').click(function() {
		$(this).remove();
		$('.review-quest-the-review').append(msg);
	});
	$('.review-quest').on('click', '.thanks-for-playing', function() {
		$('.review-quest').fadeOut(1000);
		endCredit();
	});
}

function endCredit() {
	$('.end-credit').delay(1000).fadeIn(1000);
}

function sendDialog(customClass, msg) {
	var element = $(document.createElement('div')).addClass('dialog ' + customClass).html(msg).hide().delay(300).fadeIn(300);
	$('body').append(element);
}


