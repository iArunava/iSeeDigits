var synth = window.speechSynthesis;
var TEXT = 'I Know! Its ';

function speak(pred) {
  var text = TEXT + pred.toString() + '.';

  var utter = new SpeechSynthesisUtterance(text);

  voices = synth.getVoices();

  utter.voice = voices[13];
  
  synth.speak(utter);
}
