var padHeightWidth = 28;
var padHolderHeight;
var temp = -1;
var borderShape = 1; // 1 -> square || 0 -> circle
var borderVisible = 0; // 1 -> border is visible || 0 -> border is invisible
var colorArray = ['red', 'blue', 'yellow', 'violet', 'gray', 'green'];
var colorDic = {'red' : '#fc6041', 'yellow' : '#f1ff59', 'blue' : '#639fff', 'gray' : '#b9bbbf', 'green' : '#a3ff66', 'violet' : '#7759ff'};
var randColor = colorArray[Math.ceil(Math.random() * 5)];
var colorHex = colorDic[randColor];
var mouseDown = 0;
var correctClick = false;
var incorrectClick = false;

$(document).ready(() => {
  changePadHeightWidth();
  /* Setting a random color for each time the site is loaded */
	// Setting the color on the navbar
	removeClassesStartingWith($('#id--chosen-color-display'));
	$('#id--chosen-color-display').addClass('html--color-' + randColor);

	// Setting the chosen color tick on the chosen color
	$('.html--display-inline-block-color-chosen').removeClass('html--display-inline-block-color-chosen').addClass('html--display-none-color-chosen');
  $('#id--color-chosen-representator li .html--color-' + randColor + ' + .glyphicon-ok').addClass('html--display-inline-block-color-chosen');
});

$('body').mousedown(function() {
  mouseDown = 1;
});

$('body').mouseup(() => {
  mouseDown = 0;
});

var changePadHeightWidth = function() {

	var padHolderHeight = parseInt($('#id--the-pad-holder').css('height').substr(0, 3));

  clearPad();

	// Checking if the border shape is circle
	if (borderShape == 0) {
		$('#id--fa-shape').trigger('click');
		borderShape = 0; // Maintaining the borderShape value, as it was changed when the click was triggred
	}

	// Checking if border is visible
	if (borderVisible == 1) {
		$('#id--glyph-ok-border').trigger('click');
		borderVisible = 1; // Maintaining the borderVisible value, as it was changed when the click was triggered
	}

  var posId = 1;
	for (var i = 0; i < padHeightWidth; i++) {
		$("#id--the-pad").append('<div class="html--div-pad-row html--div-pad-row-num-' + i + '"></div>');
		for (var j = 0; j < padHeightWidth; j++) {
			$('#id--the-pad .html--div-pad-row-num-' + i).append(`<div ondragstart="return false" id="id--${posId}" class="html--div-block html--float-left"></div>`);
      ++posId;
		}
	}

	$('.html--div-block').css({
		'height': ((padHolderHeight-10)/padHeightWidth) + 'px',
		'width': ((padHolderHeight-10)/padHeightWidth) + 'px'
		});

	$('#id--grid-number').html(padHeightWidth);

	// Checking if the border shape is circle
	if (borderShape == 0) $('#id--fa-shape').trigger('click');

	// Checking if border is visible
	if (borderVisible == 1) $('#id--glyph-ok-border').trigger('click');

	// Enabling hover effect over html--div-block
	$('.html--div-block').hover(function() {
    if (!mouseDown) return;
		if (randColor == 'rainbow') {
			colorHex = colorDic[colorArray[Math.floor(Math.random() * colorArray.length)]];
		} else {
			colorHex = colorDic[randColor];
		}
		$(this).css('background-color', colorHex);
	});
};

$("#id--glyph-ok-border").on('click', function() {

		if ($('#id--glyph-ok-border .glyphicon-ok').hasClass('html--display-none')) {
			$('#id--glyph-ok-border .glyphicon-ok').removeClass('html--display-none').addClass('html--display-inline-block');
			$('.html--div-block').css('border', '1.0px solid #a7adb7');
			borderVisible = 1;
		} else {
			$('#id--glyph-ok-border .glyphicon-ok').removeClass('html--display-inline-block').addClass('html--display-none');
			$('.html--div-block').css('border', '1px solid transparent');
			borderVisible = 0;
		}
});

$('#id--fa-shape').on('click', function() {

		if ($('#id--fa-shape .fa').hasClass('fa-square')) {
			$('#id--fa-shape .fa').removeClass('fa-square').addClass('fa-circle');
			$('.html--div-block').css('border-radius', '50%');
			borderShape = 0;
		} else {
			$('#id--fa-shape .fa').removeClass('fa-circle').addClass('fa-square');
			$('.html--div-block').css('border-radius', '0%');
			borderShape = 1;
		}
});

// Enabling change of colors from navbar
	$('#id--color-chosen-representator > ul li').on('click', function() {

		// Assumes that html--color-* is the last class applied on the i rag
		randColor = $(this).find('i').attr('class').split(' ').pop().split('-').pop();

		/* Setting a random color for each time the site is loaded */
		// Setting the color on the navbar
		removeClassesStartingWith($('#id--chosen-color-display'));
		$('#id--chosen-color-display').addClass('html--color-' + randColor);

		// Setting the chosen color tick on the chosen color
		$('.html--display-inline-block-color-chosen').removeClass('html--display-inline-block-color-chosen').addClass('html--display-none-color-chosen');
		$('#id--color-chosen-representator li .html--color-' + randColor + ' + .glyphicon-ok').addClass('html--display-inline-block-color-chosen');
});

$('#id--predict-btn').click(() => {
  includeLastData();
  pred_value = predict().toString();
  triggerSnackbar(pred_value);
  $('#id--prediction').html(pred_value);
});

function includeLastData() {
  correctClick = false;
  incorrectClick = false;
  if (tempData !== '') {
    if (tempData[tempData.length-1] != '\n') {
      tempData += '\n';
    }
    data += tempData;
    tempData = '';
  }
}

var removeClassesStartingWith = function (element) {
	if (element == undefined) return;

	element.attr('class', function (index, oneClass) {
		return oneClass.replace(/(^|\s)html--color-\S+/g, '');
	});
};

function download(filename) {
  includeLastData();
  text = data;
  var ele = document.createElement('a');
  ele.setAttribute('href', 'data:text/csv;charset=utf-8, ' + encodeURIComponent(text));
  ele.setAttribute('download', filename);

  ele.style.display = 'none';
  document.body.appendChild(ele);

  ele.click();
  document.body.removeChild(ele);
  $('#li--cleardata').trigger('click');
}

$('#li--clearpad').click(function() {
  $('.html--div-block').css('background', '#fff')
})

$('#li--getdata').click(() => {
  download('data.csv', data);
});

$('#li--cleardata').click(() => {
  data = '';
});

$('#id--correct-match').click(() => {
  if (correctClick) return;
  correctClick = true;
  var pred_value = $('#id--prediction').html();
  tempData += ','+pred_value.toString() + '\n';
});

$('#id--incorrect-match').click(() => {
  if (incorrectClick) return;
  incorrectClick = true;
  var target = $('#id--target-value').val();
  alert(target);
  tempData += ','+target.toString() + '\n';
});

function clearPad() {
	// Clearing the previous blocks
	$("#id--the-pad").html('');
	$('#id--the-pad').html('');
}

function triggerSnackbar(text) {
  $('#snackbar').html('<p> I know! Its ' + text.toString() + ' </p>');
  $('#snackbar').addClass('show');
  setTimeout(function() {
    $('#snackbar').removeClass('show');
  }, 3000);
}
