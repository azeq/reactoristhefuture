/** @jsx React.DOM */

Search = React.createClass({
	getInitialState : function() {
		return (
			{ 
				items : this.props.items,
				active : 0
			 }
		);
	},
	onchangeHandler : function() {
		var re = new RegExp(this.refs.search.getDOMNode().value, "i");
		var res = [];
		//filter on props.items and not state.items
		this.props.items.map(function(item){
			if(item.search(re) >= 0)
				res.push(item);
		});
		this.setState({ items : res});
	}, 
	onkeydownHandler: function(event){
		if(event.key == "ArrowDown" || event.key == "ArrowUp"){
			var shift = event.key == "ArrowDown" ? 1 : -1;
			var newActive = this.state.active + shift;
			if(newActive >= 0 && newActive < this.state.items.length)
				this.setState({ active : this.state.active + shift });
		} else if(event.key == "ArrowRight"){
			console.log(event.key);
		} else if(event.key == "Enter"){
			console.log(event.key);
		}
	},	
	render: function () {
		return (
			<div>
				<nav className="navbar navbar-default" role="navigation">
					<div className="container-fluid">
						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<form className="navbar-form navbar-left" role="search">
								<div className="form-group">
									<input ref="search" type="text" className="form-control" placeholder="Search" size="100" onChange={this.onchangeHandler} onKeyDown={this.onkeydownHandler}/>
								</div>
							</form>
						</div>
					</div>
				</nav>
				<List items={this.state.items} active={this.state.active}/>
			</div>
			);
	}
});

List = React.createClass({
	render: function () {
		var createItem = function(itemText, index) {
			var cl = "list-group-item";
			if(index == this.props.active)
				cl += " active";
      		return <a href="#" className={cl}>{itemText}</a>;
    	};
		return (
			<div className="list-group">
				{this.props.items.map(createItem, this)}
			</div>
			);
	}
});


