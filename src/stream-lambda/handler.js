module.exports.streamer = function(event, context, callback) {
    console.log("STREAM LAMBDA: ", JSON.stringify(event, null, 2));
    event.Records.forEach(function(record) {
        console.log('STREAM LAMBDA RECORD LOG: ', record.eventID);
        console.log('STREAM LAMBDA RECORD LOG: ', record.eventName);
        console.log('STREAM LAMBDA RECORD LOG: ', record);
    });
    callback(null, "message");
};