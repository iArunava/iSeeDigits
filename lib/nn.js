var wih = math.matrix([[]]);

var who = math.matrix([[]]);

function sigmoid(x) {
  return (1.0/(1 + Math.exp(-x)));
}

function predict(inp) {
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
