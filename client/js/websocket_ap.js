/**
 * Created by smouelhi on 17/02/14.
 */

// function initWS() {
//     setTimeout(testWebSocket(queries, new WebSocket(wsUri)),1000);
// }

var wsUri = "ws://192.168.1.22:8080/socketQueryEngine";//server adress
createWebSocket = function createWebSocket(queryStr, wizard) {
    var ws = new WebSocket(wsUri)
    ws.onopen = function(evt) { 
       ws.send(encodeURIComponent(queryStr));
       wizard.setState({connectState : "label-info", info : "Connecting..."});
    };
    ws.onclose = function(evt) { 
        wizard.setState({connectState : "label-default", info : "Not connected"});
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
                wizard.setState({connectState : "label-success", info : "Connected"});
                return;
            }else if(eventType == "com.quartetfs.biz.pivot.streaming.impl.CellEvent"){
                replaceNewCells(this.currentData, obj[0]);

                // main.setState({ data: convert(this.currentData) });
                Session.set("data", convert(this.currentData));
                wizard.setState({connectState : "label-info", info : "Updated"});
                return;
            }
        }
        wizard.setState({connectState : "label-danger", info : "Error"});
    };
    ws.onerror = function(evt) { 
        wizard.setState({connectState : "label-danger", info : "Error"});
    };
    return ws;
}

