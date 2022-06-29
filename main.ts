bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Square)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    line = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    bluetooth.uartWriteLine(line)
    if (line == "init") {
        leg_initialize()
        foot_initialize()
    } else {
        cmd = line.split(",")
        if (cmd.length == 3) {
            if (cmd[0] == "L") {
                leg_right_angle = parseFloat(cmd[1]) + (leg_right_angle_init - 90)
                kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo3, leg_right_angle)
                leg_left_angle = parseFloat(cmd[2]) + (leg_left_angle_init - 90)
                kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo1, leg_left_angle)
            } else if (cmd[0] == "F") {
                foot_right_angle = parseFloat(cmd[1]) + (foot_right_angle_init - 90)
                kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo4, foot_right_angle)
                foot_left_angle = parseFloat(cmd[2]) + (leg_left_angle_init - 90)
                kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo2, foot_left_angle)
            }
        }
    }
})
function foot_initialize () {
    foot_left_angle = 90
    foot_right_angle_init = 92
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo4, foot_right_angle_init)
    foot_right_angle = 90
    foot_left_angle_init = 88
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo2, foot_left_angle_init)
}
function leg_initialize () {
    leg_right_angle = 90
    leg_right_angle_init = 85
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo3, leg_right_angle_init)
    leg_left_angle = 90
    leg_left_angle_init = 90
    kitronik_i2c_16_servo.servoWrite(kitronik_i2c_16_servo.Servos.Servo1, leg_left_angle_init)
}
let foot_left_angle_init = 0
let foot_left_angle = 0
let foot_right_angle_init = 0
let foot_right_angle = 0
let leg_left_angle_init = 0
let leg_left_angle = 0
let leg_right_angle_init = 0
let leg_right_angle = 0
let cmd: string[] = []
let line = ""
basic.showIcon(IconNames.House)
bluetooth.startUartService()
leg_initialize()
foot_initialize()
basic.forever(function () {
	
})
