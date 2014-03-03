/** @jsx React.DOM */

ReqButton = React.createClass({
	render: function(){
		return (
			<button className={this.props.className} type="button" onClick={this.props.onclickHandler}>{this.props.title}</button>
			);
	}
});

ReqButtonModal = React.createClass({
	render: function(){
		return (
			<button className={this.props.className} type="button" data-dismiss="modal" onClick={this.props.onclickHandler}>{this.props.title}</button>
			);
	}
});

var RequestButtons = React.createClass({
	changeData: function(dataNew){
		this.props.handler(dataNew);
	},
	render: function(){
		var self = this;
		return (
			<div className={"btn-group"}>
			</div>
			);
	}
});

// instead of using buttons, create some kind of bookmarks
// <ReqButton title={"data AP desk"} className={"btn"} onclickHandler={this.changeData.bind(self, data10)}/>

//Previous buttons used with old cellset format
// <ReqButton title={"Reload"} className={"btn btn-success"} onclickHandler={this.changeData.bind(self, data)}/>
// <ReqButton title={"Add Feb"} className={"btn"} onclickHandler={this.changeData.bind(self, data2)}/>
// <ReqButton title={"Update cells"} className={"btn"} onclickHandler={this.changeData.bind(self, data3)}/>
// <ReqButton title={"Drilldown US"} className={"btn"} onclickHandler={this.changeData.bind(self, data9)}/>
// <ReqButton title={"Rem Jap"} className={"btn"} onclickHandler={this.changeData.bind(self, data4)}/>
// <ReqButton title={"Rem Feb/Add Jap"} className={"btn"} onclickHandler={this.changeData.bind(self, data5)}/>
// <ReqButton title={"Double CJ"} className={"btn"} onclickHandler={this.changeData.bind(self, data6)}/>
// <ReqButton title={"Double CJ2"} className={"btn"} onclickHandler={this.changeData.bind(self, data7)}/>
// <ReqButton title={"Rem USA Jap"} className={"btn"} onclickHandler={this.changeData.bind(self, data8)}/>
// <ReqButton title={"Run WS"} className={"btn btn-primary"} onclickHandler={initWS.bind()}/>
