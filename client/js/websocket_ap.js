// function initWS() {
//     setTimeout(testWebSocket(queries, new WebSocket(wsUri)),1000);
// }

var wsUri = "ws://192.168.1.22:8080/socketQueryEngine";//server adress
createWebSocket = function createWebSocket(queryStr) {
    var ws = new WebSocket(wsUri)
    ws.onopen = function(evt) { 
        ws.send(encodeURIComponent(queryStr));
        Session.set("connectionState", {connectionState : "label-info", connectionInfo : "Connecting..."});
    };
    ws.onclose = function(evt) { 
        Session.set("connectionState", {connectionState : "label-default", connectionInfo : "Not connected"});
    };
    ws.onmessage = function(evt) { 
        var obj = eval('(' + evt.data + ')');
        if(obj != null && obj.length == 2){
            var eventType = obj[1];
            if(eventType == "com.quartetfs.biz.pivot.streaming.impl.CellSetEvent"){
                this.currentData = obj[0];//store new data

                //update state
                // main.setState({ data: convert(this.currentData) });
                Session.set("data", convert(this.currentData));
                Session.set("connectionState", {connectionState : "label-success", connectionInfo : "Connected"});
                return;
            }else if(eventType == "com.quartetfs.biz.pivot.streaming.impl.CellEvent"){
                replaceNewCells(this.currentData, obj[0]);

                // main.setState({ data: convert(this.currentData) });
                Session.set("data", convert(this.currentData));
                Session.set("connectionState", {connectionState : "label-info", connectionInfo : "Updated"});
                return;
            }
        }
        Session.set("connectionState", {connectionState : "label-danger", connectionInfo : "Error"});
    };
    ws.onerror = function(evt) { 
        Session.set("connectionState", {connectionState : "label-danger", connectionInfo : "Error"});
    };
    return ws;
}

