const dbase_mqtt = require('./database_config.js');
const mqtt_connect = require('./mqtt_config.js');

require('dotenv').config()

TOPIC_DIPASENA = process.env.TOPIC;
TOPIC_API = process.env.TOPIC_2;

TS_PATH = process.env.PAYLOAD_DIPASENA_TS// Now using TSjsn;
SUHU_AIR_PATH = process.env.PAYLOAD_DIPASENA_SUHU_AIR //Now using tinggijsn; //change path based on data from raspberrypi
SUHU_RUANG_PATH = process.env.PAYLOAD_DIPASENA_SUHU_RUANG
SALINITAS_PATH = process.env.PAYLOAD_DIPASENA_SALINITAS
OXYGEN_PATH = process.env.PAYLOAD_DIPASENA_DO


var { TS, SUHU_AIR, SUHU_RUANG, SALINITAS, OXYGEN } = [];

module.exports = {
        // MQTT HANDLING
        async incomingData(topic,message){
            if (topic === TOPIC_DIPASENA){
                const payload = JSON.parse(message.toString());
        
                // Checking property of Time, Date, and Waterlevel. so it will never null
                if ((payload.hasOwnProperty(TS_PATH))
                    && (payload.hasOwnProperty(SUHU_AIR_PATH))
                    && (payload.hasOwnProperty(SUHU_RUANG_PATH))
                    && (payload.hasOwnProperty(SALINITAS_PATH))
                    && (payload.hasOwnProperty(OXYGEN_PATH))

                ) {
                    if ((payload[TS_PATH] != null)
                        && (payload[SUHU_AIR_PATH] != null)
                        && (payload[SUHU_RUANG_PATH] != null)
                        && (payload[SALINITAS_PATH] != null)
                        && (payload[OXYGEN_PATH] != null)
                    ) {
                        // Save Payload to variable
                        TS = payload[TS_PATH];
                        SUHU_AIR = parseFloat(payload[SUHU_AIR_PATH]);
                        SUHU_RUANG = parseFloat(payload[SUHU_RUANG_PATH]);
                        SUHU_RUANG = parseFloat(payload[SALINITAS_PATH]);
                        SUHU_RUANG = parseFloat(payload[OXYGEN_PATH]);

                    }
        
                }
                const dataArray = [TS,SUHU_AIR, SUHU_RUANG, SALINITAS, OXYGEN];
                const insertQuery = `INSERT INTO tambak_dipasena(time,suhu_air,suhu_ruang,salinitas,kadar_oksigen) VALUES ($1, $2, $3, $4, $5)`;
                dbase_mqtt.query(insertQuery, dataArray, (err, res) => {
                    if (err) throw err;
                 console.log(`DATA INSERTED TO DATABASE : time = ${TS}, Suhu_Air = ${SUHU_AIR}, Suhu_Ruang = ${SUHU_RUANG}, Salinitas = ${SALINITAS}, Kadar_oksige =${OXYGEN}`);
                });
            }
        }
}