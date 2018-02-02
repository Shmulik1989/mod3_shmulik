function DataHandler(){ //Create the single source of truth.
    
    var that = this;
    var teams;

    // Navigation

    $('#lowerNav ul li, #fifaRulesNav, #logout, #loginPage, #continue').on('click', function(){
        $("section").hide( "blind", {direction: "horizontal"}, 700 );
        var name = $(this).data('name');
        $("#"+name).show( "fold", {horizFirst: true}, 700 );
        $('#upperNav').removeClass('open');
        $('.active').removeClass('active');
        $(this).addClass('active');
        
    });
    
    $('#continue').on('click', function(){
        $('#lowerNav, #upperNav').fadeIn(1000);
        $('.active').removeClass('active');
        $('[data-name="homepage"]').addClass('active');
        
    });

    //Upper navbar open and close toggler.

    $('.navbar-toggler').on('click', function(event) {
        event.preventDefault();
        $(this).closest('.navbar-minimal').toggleClass('open');
            
    });

    //Removal of lower and upper navbar when leaving to login page.

    $('#loginPage').on('click', function() {
    $('#lowerNav, #upperNav').hide();

    });
        
    //Get the JSON file with the league standings data.

    $.getJSON("data/teams_info.json", function(response){
            that.teams = response;
            that.createTable();
            that.chatNav();   
        })
    
//Create the standings table from the JSON file using a each loop.    
    
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


    this.chatNav = function() {
        $('#messageBoard').on('click', function() {            
            if (firebase.auth().currentUser) {
                $('section').hide();
                $('#message').show();
                $('.open').removeClass('open');
            } else {
                alert('This feature is for registerd users only');
                $('.open').removeClass('open');

            }

        });
    };
};

   
//initialize DataHandler
var dataHandler = new DataHandler();