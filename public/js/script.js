function DataHandler(){ //create the single source of truth
    
    // Navigation
    this.Nav = function(){
        $('nav ul li').on('click', function(){
            $('section').hide();
            var name = $(this).data('name');
            $('#'+name).show();
        });
    };

    this.teams = "";
    //get the data from the JSON file
    this.getData = function(){
        var that = this;
        $.getJSON("data/teams_info.json", function(response){
            that.teams = response;
            that.createTable();
            
        })
    }
    //write teams data into the table
    //Appending league stats to table.

this.createTable = function() {
    var rowArray = [];
    $.each(this.teams.teams, function(i, e) {
        var row = $('<tr>');
        row.append($('<td>').text(e.position));
        row.append($('<td>').text(e.name));
        row.append($('<td>').text(e.goals_scored));
        row.append($('<td>').text(e.wins));
        row.append($('<td>').text(e.loses));
        row.append($('<td>').text(e.ties));
        row.append($('<td>').text(e.points));
        rowArray.push(row);
    });
    $('#leagueTable').append(rowArray);
}; 
    

}
//initialize DataHandler
var dataHandler = new DataHandler();
dataHandler.getData();
dataHandler.Nav();

