var net = require('net');
var firmata = require('firmata');

// TCP連線設定
var options = {
  host: 'YOUR_ARDUINO_IP',  //whatever host
  port: 5055  //任意的port，但必需和你設在 /etc/ser2net.conf 的port要一致
};

// 建立一個TCP連線
var client = net.connect(options, function() { //'connect' listener
  console.log('connected to server!');

  var socketClient = this;

  // Firmata 透過TCP 的 Serial 來傳送
  var board = new firmata.Board(socketClient, function(err){
    if (err) {
      console.log("error happened: " + err);
      return;
    }

    // Arduino連線成功，進行第一個 Blink的lab
    console.log("connected to Arduino!");
    board.pinMode(13, board.MODES.OUTPUT);
    var isOn = true;
    setInterval(function () {
      if(isOn) {
        board.digitalWrite(13, board.LOW);
        isOn = false;
      } else {
        board.digitalWrite(13, board.HIGH);
        isOn = true;
      }
    }, 500);

  });
});
