input.onButtonPressed(Button.A, function () {
    START = !(false)
})
let Distance = 0
let START = false
KSRobot_IOT.Wifi_setup(
SerialPin.P15,
SerialPin.P8,
"ASUS_chickenhouse",
"0937675615",
KSRobot_IOT.IOT_Config.STATION
)
START = false
I2C_LCD1602.LcdInit(32)
basic.pause(2000)
I2C_LCD1602.ShowString("Distance:", 0, 0)
I2C_LCD1602.ShowString("Alert disable", 0, 1)
basic.forever(function () {
    Distance = sonar.ping(
    DigitalPin.P13,
    DigitalPin.P13,
    PingUnit.Centimeters
    )
    I2C_LCD1602.ShowString("" + Distance + "   ", 9, 0)
    if (START) {
        I2C_LCD1602.ShowString("enable", 6, 0)
    } else {
        I2C_LCD1602.ShowString("disable", 6, 1)
    }
    basic.pause(1000)
})
basic.forever(function () {
    if (KSRobot_IOT.Wifi_Connection() && START) {
        if (Distance < 20) {
            KSRobot_IOT.IFTTT_set(
            "distance_alert",
            "bSwSN95G-LckAmVAGeWx9i",
            convertToText(Distance)
            )
            basic.pause(2000)
        }
    }
})
