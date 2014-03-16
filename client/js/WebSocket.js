//shortcut
function updateConnectionInfo(connectionStateStatus, connectionInfoStatus){
    Session.set("connectionState", {connectionState : connectionStateStatus, connectionInfo : connectionInfoStatus});
}

APWebSocket = function(query){
    this.adress = "ws://192.168.1.22:8080/socketQueryEngine";//server adress;
    this.query = query;
    this.ws = null;
};

APWebSocket.prototype.run = function() {
    this.ws = new WebSocket(this.adress);
    this.ws.onopen = function(evt) { 
        this.onopen(this.ws, evt);
    }.bind(this);
    this.ws.onclose = function(evt) { 
       this.onclose(this.ws, evt);
    }.bind(this);
    this.ws.onmessage = function(evt) { 
        this.onmessage(this.ws, evt);
    }.bind(this);
    this.ws.onerror = function(evt) { 
        this.onerror(this.ws, evt);
    }.bind(this);
};

APWebSocket.prototype.onopen = function(ws, evt) {
  ws.send(encodeURIComponent(this.query));
  updateConnectionInfo("label-info", "Connecting...");
};

APWebSocket.prototype.onmessage = function(ws, evt) {
    var obj = eval('(' + evt.data + ')');
    if(obj != null && obj.length == 2){
        var eventType = obj[1];
        if(eventType == "com.quartetfs.biz.pivot.streaming.impl.CellSetEvent"){
                this.currentData = obj[0];//store new data
                // console.log(JSON.stringify(this.currentData));
                //update state
                Session.set("data", this.currentData);
                updateConnectionInfo("label-success", "Connected");
                return;
            }else if(eventType == "com.quartetfs.biz.pivot.streaming.impl.CellEvent"){
                replaceNewCells(this.currentData, obj[0]);

                // main.setState({ data: convert(this.currentData) });
                Session.set("data", this.currentData);
                updateConnectionInfo("label-info", "Updated");
                return;
            }
        }
        updateConnectionInfo("label-danger", "Error");
};

APWebSocket.prototype.onclose = function(ws, evt) {
    updateConnectionInfo("label-default", "Not connected");
};

APWebSocket.prototype.onerror = function(ws, evt) {
    updateConnectionInfo("label-danger", "Error");
};

APWebSocket.prototype.stop = function() {
    this.ws.close();
};

MainWebSocket = (function () {
    var instance;
    var query;

    function createInstance(query) {
        this.query = query;
        return new APWebSocket(this.query);
    }

    return {
        getInstance: function (query) {
            if(query !== undefined && query !== null){
                if (!instance) {
                    instance = createInstance(query);
                }else{
                    if(this.query !== query){
                        instance.stop();
                        instance = createInstance(query);
                    }
                }
            }
            return instance;
        }
    };
})();


function run() {

    var instance1 = Singleton.getInstance();
    var instance2 = Singleton.getInstance();

    alert("Same instance? " + (instance1 === instance2));  
}

