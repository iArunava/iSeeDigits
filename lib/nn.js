var wih = math.matrix([[]]);

var who = math.matrix([[]]);

function sigmoid(x) {
  return (1.0/(1 + Math.exp(-x)));
}

function predict() {
  inp = get_inputs();

  var hid = math.multiply(wih, inp);

  var hid_sig = hid.map(value => {
    return sigmoid(value)
  });

  out = math.multiply(who, hid_sig);

  var out_sig = hid.map(value => {
    return sigmoid(value)
  });

  var pred_value = -1;
  var gprob = -1;

  out_sig.forEach(function (value, index) {
    if (gprob < value) {
      gprob = value;
      pred_value = index;
    }
  });

  return pred_value;
}

function get_inputs() {
  var pixels = [];
  var gray;
  for (var i=1; i <= 784; ++i) {
    gray = 255 - grayscale($('#id--'+i.toString()).css('background-color').slice(4,-1).split(','));
    gray = ((gray / 255.0) * 0.99) + 0.01;
    pixels.push(gray);
  }
  return math.matrix(pixels);
}

function grayscale(pixels) {
  var sum = 0;
  for (var i in pixels) {
    sum += parseInt(pixels[i]);
  }
  return sum/3;
}
