//Wizard Elements Model

Session.set("wizeb", {rows : [], columns: [], filters: [], measures: []});//init wizard elements

WizardElementBuilder = function(name) {
  this.elements = Session.get(name);
  this.name = name;
};

WizardElementBuilder.prototype.add = function(itemName, itemType) {
	switch(itemType){
		case "measure":
			this.elements.measures.push(itemName);
			break;			
		case "filter":
			this.elements.filters.push(itemName);
			break;
		default:
			this.elements.columns.push(itemName);
			break;
	}
	Session.set(this.name, this.elements);
};

WizardElementBuilder.prototype.get = function(place) {
	switch(place){
		case "columns":
			return this.elements.columns;
		case "rows":
			return this.elements.rows;
		case "measures":
			return this.elements.measures;
		case "filters":
			return this.elements.filters;
	}
	Session.set(name, this.elements);
};

WizardElementBuilder.prototype.reset = function() {
	this.elements.columns = [];
	this.elements.rows = [];
	this.elements.measures = [];
	this.elements.filters = [];
};
