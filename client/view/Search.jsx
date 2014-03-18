/** @jsx React.DOM */

Search = React.createClass({
	getInitialState : function() {
		return (
			{ 
				items : this.props.cubeDescription.getFlatCube(),
				active : 0
			 }
		);
	},
	setListVisibility: function(visibility) {
		this.refs.list.getDOMNode().style.visibility = visibility;
	},
	onchangeHandler: function() {
		var res = this.props.cubeDescription.filterCube(this.refs.search.getDOMNode().value);
		this.setState({ items : res, active : 0});
	}, 
	onkeydownHandler: function(event){
		if(event.key == "ArrowDown" || event.key == "ArrowUp"){
			var shift = event.key == "ArrowDown" ? 1 : -1;
			var newActive = this.state.active + shift;
			if(newActive >= 0 && newActive < this.state.items.length)
				this.setState({ active : this.state.active + shift });
		} else if(event.key == "ArrowRight"){
			if(this.state.items.length > 0){
				this.refs.search.getDOMNode().value = "";//reset search
				var item = this.state.items[this.state.active];
				var newItems = this.props.cubeDescription.retrieveItemInWholeCube(item.name, typeToSubType[item.type]);
				newItems = this.props.cubeDescription.flattenItem(newItems);
				if(newItems.length > 0){
					//add filter item to the list
					newItems.splice(0, 0, { type : "filter", name : "Create filter" });
					this.setState({ items : newItems, active : 0 });
				}
			}
		} else if(event.key == "ArrowLeft"){
			this.setState({ items : this.props.cubeDescription.getFlatCube(), active : 0 });
		} else if(event.key == "Enter"){
			if(this.state.items.length > 0){
				var item = this.state.items[this.state.active];
				console.log("Add "+item.name+" "+item.type+" to the view");
				return false;//to not reload the page when enter is pressed
			}
		}
	},	
	render: function () {
		return (
			<div>
				<input ref="search" type="text" className="search-size form-control" placeholder="Search" 
				onChange={this.onchangeHandler} 
				onKeyDown={this.onkeydownHandler}
				onFocus={this.setListVisibility.bind(this, "visible")}
				onBlur={this.setListVisibility.bind(this, "hidden")}/>

				<List ref="list" items={this.state.items} active={this.state.active} />
			</div>
			);
	}
});

List = React.createClass({
	buildItem: function (classNameLink, classNameIcon, type, name){
		return (<a href="#" className={classNameLink} key={type+"/"+name}>
				<span className={classNameIcon}></span>{"   "}{name}
				</a>);
	},
	render: function () {
		var createItem = function(item, index) {
			var cl = "list-group-item";
			if(index == this.props.active)
				cl += " active";

			var gly = "glyphicon";
			switch(item.type){
				case "dimension":
					gly += " glyphicon-certificate";
					break;
				case "hierarchy":
					gly += " glyphicon-magnet";
					break;
				case "level":
					gly += " glyphicon-leaf";
					break;			
				case "measure":
					gly += " glyphicon-screenshot";
					break;
				case "filter":
					gly += " glyphicon-cog";
					cl += " list-group-item-warning";
					break;
			}

      		return this.buildItem(cl, gly, item.type, item.name);
    	};
		return (
			<div className="list-group search-list search-size">
				{this.props.items.map(createItem, this)}
			</div>
		);
	}
});

NavBar = React.createClass({
	render: function(){
		return(
			<div>
				<nav className="navbar navbar-default" role="navigation">
					<div className="container-fluid">

						<div className="navbar-header">
							<div className="btn-group">
								<button type="button" className="btn btn-default navbar-btn">
									<span className="glyphicon glyphicon-th-large"></span>
								</button>		
								<button type="button" className="btn btn-default navbar-btn">
									<span className="glyphicon glyphicon-cog"></span>
								</button>
							</div>
						</div>

						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<form className="navbar-form navbar-left" role="search">
								<div className="form-group">
									<Search cubeDescription={this.props.cubeDescription}/>
								</div>
							</form>

							<ul className="nav navbar-nav navbar-right">
								<li className="dropdown">
									<a href="#ss" className="dropdown-toggle" data-toggle="dropdown">Wizard <b className="caret"></b></a>
									<ul className="dropdown-menu">
										<div style={{ width: 400, padding: 10 }}>
											<Wizard/>
										</div>
									</ul>
								</li>

								<li className="dropdown">
									<a href="#ss" className="dropdown-toggle" data-toggle="dropdown">Bookmarks <b className="caret"></b></a>
									<ul className="dropdown-menu">
										<div style={{ width: 400, padding: 10 }}>
											<BookmarksHolder/>
										</div>
									</ul>
								</li>
							</ul>
						</div>

					</div>
				</nav>
			</div>
		);
	}
});


