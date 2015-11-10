var TodoViewModel = function(data) {
    this.name = ko.observable(data.name);
    this.complete = ko.observable(data.complete);
};

var TodoListViewModel = function() {
    var self = this;
    this.todoItems = ko.observableArray();
 
    this.refresh = ko.command(function() {
        //make a call to the server...
        return $.getJSON("/api/todos");
    }).done(function(items) {
        //...and update the todoItems collection when the call returns
        var newItems = [];
        for (var i=0; i < items.length; i++ ){
            newItems.push(new TodoViewModel(items[i]));
        }
        self.todoItems(newItems);
    });
 
    //refresh immediately to load initial data
    this.refresh();
};
 
$(function() {
    var viewModel = new TodoListViewModel();
 
    //insert some fake todo items for now...
    viewModel.todoItems.push(new TodoViewModel({ name: "Pending Item", complete: false }));
    viewModel.todoItems.push(new TodoViewModel({ name: "Completed Item", complete: true }));
 
    ko.applyBindings(viewModel);
});