# 利用TCP來實現Firmata 協定 （Wifi Serial）

## 利用Wift的通道來實現Firmata協定與操控

1. 先設定好讓Arduino可連上wifi
2. 先照著這裡[做法](https://create.arduino.cc/projecthub/mohanp/windows-remote-arduino-yun-wifi-and-networkserial-b3290a)， 進行到`Testing with Windows Remote Arduino Experience`前停止，好讓arduino以TCP socket來實現Serial port communication(第2步用記憶卡擴充容量可以不用進行)。 **注意：因為你將以root登入arduino，一切操作務必再三思考再進行，以免毀滅變磚**
2. 下載這個github專案到你的電腦裡
3. 進到此專案的資料夾，輸入 `npm install`
4. 安裝完後，執行 `node firmataTCP.js`，將裡面的YOUR_ARDUINO_IP換成你的Arduino IP，再使用js透過TCP的Firmata來控制LED閃爍(第一個 lab)
