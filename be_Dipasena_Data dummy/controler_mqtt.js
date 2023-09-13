const dbase_mqtt = require('./database_config.js');
const mqtt_connect = require('./mqtt_config.js');

require('dotenv').config()

TOPIC_DIPASENA = process.env.TOPIC;
TOPIC_API = process.env.TOPIC_2;

TS_PATH = process.env.PAYLOAD_DIPASENA_TS// Now using TSjsn;
HUMIDITY_PATH = process.env.PAYLOAD_DIPASENA_HUMIDITY //Now using tinggijsn; //change path based on data from raspberrypi
PRESSURE_PATH = process.env.PAYLOAD_DIPASENA_PRESSURE
TEMP_PATH = process.env.PAYLOAD_DIPASENA_TEMP
PHSENSOR_PATH = process.env.PAYLOAD_DIPASENA_PHSENSOR
TDSSENSOR_PATH = process.env.PAYLOAD_DIPASENA_TDSSENSOR
NH3_PATH = process.env.PAYLOAD_DIPASENA_NH3_SENSOR
DO_PATH = process.env.PAYLOAD_DIPASENA_DISSOX_SENSOR
WTEMP_PATH = process.env.PAYLOAD_DIPASENA_WTEMP_SENSOR

var { TS, HUMIDITY, PRESSURE, TEMP, PH, TDS, NH3, DO, WTEMP } = [];

module.exports = {
        // MQTT HANDLING
        async incomingData(topic,message){
            if (topic === TOPIC_DIPASENA){
                const payload = JSON.parse(message.toString());
        
                // Checking property of Time, Date, and Waterlevel. so it will never null
                if ((payload.hasOwnProperty(TS_PATH))
                    && (payload.hasOwnProperty(HUMIDITY_PATH))
                    && (payload.hasOwnProperty(PRESSURE_PATH))
                    && (payload.hasOwnProperty(TEMP_PATH))
                    && (payload.hasOwnProperty(PHSENSOR_PATH))
                    && (payload.hasOwnProperty(TDSSENSOR_PATH))
                    && (payload.hasOwnProperty(NH3_PATH))
                    && (payload.hasOwnProperty(DO_PATH))
                    && (payload.hasOwnProperty(WTEMP_PATH))
                ) {
                    if ((payload[TS_PATH] != null)
                        && (payload[HUMIDITY_PATH] != null)
                        && (payload[PRESSURE_PATH] != null)
                        && (payload[TEMP_PATH] != null)
                        && (payload[PHSENSOR_PATH] != null)
                        && (payload[TDSSENSOR_PATH] != null)
                        && (payload[NH3_PATH] != null)
                        && (payload[DO_PATH] != null)
                        && (payload[WTEMP_PATH] != null)
                    ) {
                        // Save Payload to variable
                        TS = payload[TS_PATH];
                        HUMIDITY = parseFloat(payload[HUMIDITY_PATH]);
                        PRESSURE = parseFloat(payload[PRESSURE_PATH]);
                        TEMP = parseFloat(payload[TEMP_PATH]);
                        P= parseFloat(payload[PHSENSOR_PATH]);
                        PH=P/1000;
                        TDS = parseFloat(payload[TDSSENSOR_PATH]);
                        NH3 = parseFloat(payload[NH3_PATH]);
                        DO = parseFloat(payload[DO_PATH]);
                        WTEMP = parseFloat(payload[WTEMP_PATH]);
                    }
        
                }
                const dataArray = [TS, HUMIDITY, PRESSURE, TEMP, PH, TDS, NH3, DO, WTEMP];
                const insertQuery = `INSERT INTO dipasena(time, humidity,pressure,temperature,ph,tds,amonia,kadar_oksigen,temp_air) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9)`;
                dbase_mqtt.query(insertQuery, dataArray, (err, res) => {
                    if (err) throw err;
                //  console.log(`DATA INSERTED TO DATABASE : Time = ${TS}, humidity = ${HUMIDITY}, pressure = ${PRESSURE}, temperature = ${TEMP}, pH = ${PH}, tds = ${TDS},amonia=${NH3},kadar_oksigen=${DO},temp_air=${WTEMP}`);
                });
            }
        }
}