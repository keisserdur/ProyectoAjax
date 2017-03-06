    var show = 1;
    var size = 0;
    var currentPage = 0;
    var totalPage=0;
    var activities;
(function(){

    
    $( "select" )
    .change(function() {
        var str = "";
        $( "select option:selected" ).each(function() {
          show = $( this ).text();
          currentPage = 0;
          totalPage = Math.ceil(size/show);
          createViewActivities(activities);
        });
    });


    
    getActivities();
    getTeacher();
    
    
    function getActivities(){
        $.ajax({url : "https://hogwarts-keisserdur.c9users.io/admin/index.php",
            method : "POST",
            data : {'ruta' : 'ajaxactividad',
                    'accion' : 'getListJson'
            },
            dataType:'json'
        }).done(function(msg){
            activities=msg.data;
            size = msg.data.length;
            totalPage = Math.floor(size/show);
            createViewActivities(msg.data);
        });
    }
    
    function getTeacher(){
        $.ajax({url : "https://hogwarts-keisserdur.c9users.io/admin/index.php",
            method : "POST",
            data : {'ruta' : 'ajaxprofesor',
                    'accion' : 'getListJson'
            },
            dataType:'json'
        }).done(function(msg){
            createViewTeacher(msg.data);
            getDepartment();
        });
    }
    
    function getDepartment(){
        $.ajax({url : "https://hogwarts-keisserdur.c9users.io/admin/index.php",
            method : "POST",
            data : {'ruta' : 'ajaxgrupo',
                    'accion' : 'getListJson'
            },
            dataType:'json'
        }).done(function(msg){
            createViewDepartment(msg.data);
        });
    }
    
    /*
        day
        description
        endTime
        idActivity
        idGroup
        idTeacher
        photo
        place
        shortTitle
        startTime
    */
    function createViewActivities(msg){
        count = 1;
        
        $('#activities-content').empty();
        
        for(var pos in msg){
            var variance = (currentPage)*show;
            var id = 'a-' + (parseInt(pos)+variance);
            var activity = msg[parseInt(pos)+variance];
            var urlbase = 'https://hogwarts-keisserdur.c9users.io/admin/img/activity/'
            $('#activities-content').append('<div id="' + id + '" class="activity"></div>');
            
            if(activity.photo == "undefined" || activity.photo == "" || activity.photo == "null" || activity.photo == "NULL" || activity.photo == null){
                $('#'+id).append('<img class="activities-photo activities-nopic" alt="imagen de la actividad' + id + '" src="'+ urlbase + 'nopic.jpg">');
            }else{
                $('#'+id).append('<img class="activities-photo" alt="imagen de la actividad' + id + '" src="'+ urlbase + activity.photo + '">');
            }
            
            
            $('#'+id).append('<div class="activities-info"></div>');
            $('#'+id+ ' .activities-info').append('<h1>' + activity.shortTitle +'</h1>');
            $('#'+id+ ' .activities-info').append('<h2><i class="fa fa-user-circle-o fa-fw" aria-hidden="true"></i> ' + activity.idTeacher +'</h2>');
            $('#'+id+ ' .activities-info').append('<p>Dia <span class="activities-red">' + activity.day + '</span> desde  <span class="activities-red">' + activity.startTime +'</span> hasta <span class="activities-red">' + activity.endTime +'</span></p>');
            
            $('#'+id+ ' .activities-info').append('<p>' + activity.description +'</p>');
            $('#'+id+ ' .activities-info').append('<div class="activities-spacing"></div>');
            
            $('#'+id+ ' .activities-info').append('<h3><i class="fa fa-users fa-fw" aria-hidden="true"></i> Grupo ' + activity.idGroup +'</h1>');
            
            if(count+variance>=show){
                break;
            }
            
            count++;
        }
        
        controllerPage();
    };
    
    /*
        admin
        department
        idTeacher
        nick
        password
    */
    function createViewTeacher(msg){
        $('#activities-sidebar').append('<div id="activities-teacher-sidebar" class="acivities-sidebar"></div>');
            
        $('#activities-teacher-sidebar').append('<ul id="activities-teacher-list" class="acivities-teacher-info"></ul>');
        $('#activities-teacher-list').append('<h1>Profesores</h1>');
        for(var pos in msg){
            var id = 't-' + pos;
            var teacher = msg[pos];
            
            $('#activities-teacher-list').append('<li id="' + id + '"><h1>' + teacher.nick +'</h1></li>');
            //$('#'+id+ ' .acivities-teacher-info').append('<h2>Dpt : ' + teacher.department +'</h2>');
        }
    };
    
    /*
        name
        degree
    */
    function createViewDepartment(msg){
        $('#activities-sidebar').append('<div id="activities-group-sidebar" class="acivities-sidebar"></div>');
            
        $('#activities-group-sidebar').append('<ul id="activities-group-list" class="acivities-group-info"></ul>');
        $('#activities-group-list').append('<h1>Departamentos</h1>');
        for(var pos in msg){
            var id = 'g-' + pos;
            var group = msg[pos];
            
            $('#activities-group-list').append('<li id="' + id + '"><h2>' + group.degree + ' ' + group.name + '</h2></li>');
            //$('#'+id+ ' .acivities-teacher-info').append('<h2>Dpt : ' + teacher.department +'</h2>');
        }
    };
    
    
    
    function controllerPage(){
        if(size > show){
            $('#activities-content').append('<div class="activities-control"><a href="" id="pre">Pre</a> <span>' + (parseInt(currentPage)+1) +' / '+totalPage+ '</span> <a href="" id="next">Next</a></div>');
            setActions();
        }
    }
    
    function setActions(){
        $('#pre').off('click');
        $('#next').off('click');
        $('#pre').on('click',function(e){
            e.preventDefault();
            if(currentPage>0){
                currentPage--;
                createViewActivities(activities);
            }
        });
        $('#next').on('click',function(e){
            e.preventDefault();
            if(currentPage<totalPage-1){
                currentPage++;
                createViewActivities(activities);
            }
        });
    }
    
}());