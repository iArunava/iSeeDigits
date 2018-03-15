var data = '';

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

  var out_sig = out.map(value => {
    return sigmoid(value)
  });

  var pred_value = -1;
  var gprob = -1;

  console.log(out_sig);

  out_sig.forEach(function (value, index) {
    if (gprob < value) {
      gprob = value;
      pred_value = index;
    }
  });

  speak(pred_value);
  return pred_value;
}

function get_inputs() {
  var pixels = [];
  var gray;
  for (var i=1; i <= 784; ++i) {
    gray = grayscale($('#id--'+i.toString()).css('background-color').slice(4,-1).split(','));
    pixels.push(gray);
  }
  data += pixels.toString() + '\n';
  return math.matrix(pixels);
}

function grayscale(pixels) {
  var sum = 0;
  for (var i in pixels) {
    sum += parseInt(pixels[i]);
  }
  if (sum == 765) sum = 0.01
  else sum = 0.99
  return sum;
}
