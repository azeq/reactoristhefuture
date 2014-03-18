cube = 
{
	"dimensions" : {
		"dimensions" : 
		[
			{
				"name" : "Bookings",
				"type" : "dimension",
				"hierarchies" : [ 
						{ "name" : "Desk", "type" : "hierarchy", "levels" : [ { "name" : "Desk", "type" : "level" }, { "name" : "BookId", "type" : "level" } ] },
						{ "name" : "Status", "type" : "hierarchy", "levels" : [ { "name" : "IsSimulated", "type" : "level" }, { "name" : "Status", "type" : "level" } ] }
					] 
			},
			{
				"name" : "HostName",
				"type" : "dimension",
				"hierarchies" : [ 
						{ "name" : "HostName", "type" : "hierarchy", "levels" : [ { "name" : "HostName", "type" : "level" } ] }
					] 
			},
			{
				"name" : "Time",
				"type" : "dimension",
				"hierarchies" : [ 
						{ "name" : "HistoricalDates", "type" : "hierarchy", "levels" : [ { "name" : "AsOfDate", "type" : "level" } ] },
						{ "name" : "TimeBucket", "type" : "hierarchy", "levels" : [ { "name" : "DateBucket", "type" : "level" }, { "name" : "ValueDate", "type" : "level" } ] },
						{ "name" : "TimeBucketDynamic", "type" : "hierarchy", "levels" : [ { "name" : "TimeBucketDynamic", "type" : "level" } ] }
					] 
			},
			{
				"name" : "Underlyings",
				"type" : "dimension",
				"hierarchies" : [ 
						{ "name" : "Products", "type" : "hierarchy", "levels" : [ { "name" : "ProductType", "type" : "level" }, { "name" : "ProductName", "type" : "level" } ] },
						{ "name" : "Underlyings", "type" : "hierarchy", "levels" : [ { "name" : "UnderlierCurrency", "type" : "level" }, { "name" : "UnderlierType", "type" : "level" }, { "name" : "UnderlierCode", "type" : "level" } ] }
					] 
			}
		] 
	},
	"measures" : [ 
		{ "name" : "pnl.SUM" , "type" : "measure" }, 
		{ "name" : "contributors.COUNT", "type" : "measure" },
		{ "name" : "delta.SUM", "type" : "measure" },
		{ "name" : "pnl.FOREX", "type" : "measure" },
		{ "name" : "gamma.SUM", "type" : "measure" }
	]
};
// console.log(cube);

typeToSubType = { "dimension" : "hierarchies", "hierarchy" : "levels"};

CubeDescription = function(cube){
	this.cube = cube;
};

CubeDescription.prototype.getCube = function(){
	return this.cube;
};

CubeDescription.prototype.getFlatCube = function(){
	return this.flattenItem(this.cube);
};

CubeDescription.prototype.getCubeDescriptionAsArray = function(){
	return this.flattenItemImpl(this.cube, []);
};

CubeDescription.prototype.flattenItem = function(item){
	return this.flattenItemImpl(item, []);
};

//flatten item and turn it into an array {name, type}
//item is a json olap entity
CubeDescription.prototype.flattenItemImpl = function(item, tab){
	for(var key in item){
		if(item.hasOwnProperty(key) && key != "type"){
			if(item[key] instanceof Array){
				item[key].map(function(a){
					this.flattenItemImpl(a, tab);
				}.bind(this));
			}else if(key == "name"){
				tab.push({ "name" : item["name"], "type" : item["type"] });
			}else{
				this.flattenItemImpl(item[key], tab);
			}
		}
	}
	return tab;
};

CubeDescription.prototype.retrieveItemInWholeCube = function (itemName, itemType){
	return this.retrieveItem(this.cube, itemName, itemType);
};

CubeDescription.prototype.retrieveItem = function (item, itemName, itemType){
	return this.retrieveItemImpl(item, itemName, itemType, []);
};

CubeDescription.prototype.retrieveItemImpl = function (item, itemName, itemType, res){
	for(var key in item){
		if(item.hasOwnProperty(key)){
			if(item[key] instanceof Array){
				item[key].map(function(a){
					this.retrieveItemImpl(a, itemName, itemType, res);
				}.bind(this));
			}else if(key == "name" || key == "type"){
				if(item[key] == itemName)
					res.push(item[itemType]);
			}else{
				this.retrieveItemImpl(item[key], itemName, itemType, res);
			}
		}
	}
	return res;
};

CubeDescription.prototype.filterCube = function (pattern){
	return this.filterItems(cube, pattern);
};

CubeDescription.prototype.filterItems = function (items, pattern){
	var re = new RegExp(pattern, "i");
	var res = [];
	//filter on props.items and not state.items
	this.flattenItem(items).map(function(item){
		if(item.name.search(re) >= 0)
			res.push(item);
	});
	return res;
};

SearchBar = function(cube){
	this.cubeDescription = new CubeDescription(cube);
};

SearchBar.prototype.render = function(DOMNodeId) {
	// return Search({cubeDescription: this.cubeDescription});
	return NavBar({cubeDescription: this.cubeDescription});
};

// cubeDescription = new CubeDescription(cube);

// console.log(cubeDescription.retrieveItem(cube, "Bookings", "hierarchies"));//get all below this dim
// console.log(cubeDescription.retrieveItem(cube, "HistoricalDates", "levels"));//get all below this hier
// console.log(cubeDescription.flattenItem(cube));
// console.log(cubeDescription.getCubeDescriptionAsArray());
// console.log(cubeDescription.flattenItem(cube.dimensions.dimensions[0]));//only the elements of "Bookings"
// console.log(cubeDescription.filterItems(cube, "Book"));
