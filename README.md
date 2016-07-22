# 使用TCP來實現Firmata 協定 （Wifi Serial）

## 環境需求

Node.js 4.x 以上



## 安裝ser2net

1. 先設定好讓Arduino可連上wifi，並記好其連上後的IP (例：192.168.XX.XX)

2. 需要在Yun的linux（linino）上安裝套件並設定好，以讓Serial  port通過TCP socket傳出來，原文[做法](https://create.arduino.cc/projecthub/mohanp/windows-remote-arduino-yun-wifi-and-networkserial-b3290a)如此，以下我簡介。

3. 因為需要通過 `ssh` 來連線到 Arduino裡的linino，windows請下載 PuTTY，自己查一下如何連到 SSH，如果用linux/MAC就是 `ssh root@192.168.XX.XX`。連線帳號是`root`，密碼就是設定Arduino時輸入的密碼。

4. **注意：因為你將以root登入arduino，一切操作務必再三確認這是可以的再進行，以免整塊板子毀滅變磚，這是可能發生的**

5. 連線後會看到類似![連線畫面](http://www.homautomation.org/wp-content/uploads/2013/10/Capture-d%E2%80%99%C3%A9cran-2013-10-01-%C3%A0-20.43.49.png)

6. 首先更新opkg的repo，在~#後輸入`opkg update`，enter

7. 完成後安裝套件ser2net，輸入`opkg install ser2net`

8. 安裝後要修改`/etc/ser2net.conf`這檔案，輸入`vi /etc/ser2net.conf`（按tab有自動完成），會用vi編緝器打開該檔案，按`i`進入輸入模式，按`esc`會回到命令模式，你可以把所有內容都comment起（加#），在最後面加上
   `5055:raw:0:/dev/ttyATH0:115200`
   並存檔 （按esc一下回到命令模式，再輸入`:wq`，enter存檔離開）

9. 設定開機後自動執行ser2net：
   如前一步驟，`vi /etc/rc.local`來編緝開機檔，只要在最後一行`exit 0`前一行加上`ser2net`即可存檔離開，可能會像

   ​
   ![rc.local範例](https://hackster.imgix.net/uploads/image/file/103964/rc.local.png)

10. 最後要關掉現有的serial port（隨時可回復），`vi /etc/inittab`將`ttyATH0::askfirst:/bin/ash —login` 這一行註解起來（前面加#)，`:wq`存檔離開。

11. 重啟Arduino，等到開機完成，可以用telnet（windows用PuTTY）來連上去測試是否有成功開通：`telnet 192.168.XX.XX 5055`



## 修改StandardFirmata 之程式碼

1. 打開Arduino IDE，選擇草稿簿裡的*StandardFirmataPlus*（若你使用的是Arduino Yun），第783行開始，修改成如下

   ```
     // to use a port other than Serial, such as Serial1 on an Arduino Leonardo or Mega,
     // Call begin(baud) on the alternate serial port and pass it to Firmata to begin like this:
      Serial1.begin(115200);
      do {
       while (Serial1.available() > 0 ) {
         Serial.read();
       }
       delay(1000);
      } while(Serial1.available() > 0);

      Firmata.begin(Serial1);
     // However do not do this if you are using SERIAL_MESSAGE

     //Firmata.begin(57600);
     //while (!Serial) {
       //; // wait for serial port to connect. Needed for ATmega32u4-based boards and Arduino 101
     //}

     systemResetCallback();  // reset to default config
   ```

   ​

2. 完成後燒錄進Arduino

3. 下載這個github的專案到你的電腦裡

4. 進到此專案的資料夾，輸入 `npm install`

5. 安裝完後，，將裡面的YOUR_ARDUINO_IP換成你的Arduino IP，執行 `node firmataTCP.js`，便能開心地使用js透過Wifi版本的Firmata來控制你的Arduino（此範例為Blink demo）



## 錯誤排除

如果執行node後，遇到拒絕連線訊息如下：

```shell
Error: connect ECONNREFUSED 192.168.XXX.XXX:5055
```

很有可能是linino的ser2net沒有run起來，請ssh回去檢查。