function DataHandler(){ //create the single source of truth
    
    var that = this;
    var teams;

    // Navigation
    $('#lowerNav ul li, #upperNav ul li, #continue').on('click', function(){
        $("section").hide( "blind", {direction: "horizontal"}, 700 );
        var name = $(this).data('name');
        $("#"+name).show( "fold", {horizFirst: true}, 700 );
        $('#upperNav').removeClass('open'); 
        
    });

    $('#continue').on('click', function(){
        $('#lowerNav, #upperNav').fadeIn(1000);
    });

    $.getJSON("data/teams_info.json", function(response){
            that.teams = response;
            that.createTable();   
        })
    
    $('.navbar-toggler').on('click', function(event) {
    event.preventDefault();
    $(this).closest('.navbar-minimal').toggleClass('open');
    
    })
    
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



