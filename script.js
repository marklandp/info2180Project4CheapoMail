
 //This file performs all ajax based requests and implements all button functions. 
 

$(function(){
    $("#reg-block").hide();
    $("#homepage").hide();
    $("#compose").hide();
    $("#create-btn").hide();
    $("#login-btn").click(checkLogin);          //line 34
    $("#new-btn").click(newMsg);                //line 297
    $("#create-btn").click(regUser);            //line 190
    $("#logout-btn").click(signOut);            //line 20
    $("#send-btn").click(checkMessage);         //line 304
    $("#register-btn").click(checkRegister);    //line 196  
    $("#sync").click(initInbox);                //line 133
    $("#new-btn").hover(function () {
        this.src = 'external/composehover.png';
        var id=$(this).attr('id');
        $("#" + id).addClass('hover');
    }, function () {
        this.src = 'external/compose.png';
        var id=$(this).attr('id');
        $("#" + id).removeClass('hover');
    });
    $("#create-btn").hover(function () {
        this.src = 'external/new-user-hover.png';
        var id=$(this).attr('id');
        $("#" + id).addClass('hover');
    }, function () {
        this.src = 'external/new-user.png';
        var id=$(this).attr('id');
        $("#" + id).removeClass('hover');
    });
    $("#sync").hover(function () {
        this.src = 'external/synchover.png';
        var id=$(this).attr('id');
        $("#" + id).addClass('hover');
    }, function () {
        this.src = 'external/sync.png';
        var id=$(this).attr('id');
        $("#" + id).removeClass('hover');
    });
});

function signOut() {
    var xr = $.ajax("ajax/logout.php")
            .done(function() {
                //console.log(xr);
                $("#login-block").fadeIn(2000);
                $("#homepage").hide();
                $("#compose").hide();
                $("#reg-block").hide();
            });

    //$("#create-btn").show();
};

//verifies form fields are not empty. Any empty field is given a red background
function checkLogin() {
    var username = document.forms["signInForm"]["username"],
        password = document.forms["signInForm"]["password"],
        check=[username,password],
        uerr = $("#uerr"), perr = $("#perr"),
        err = [uerr,perr],
        valid=true;
     
    for(var i=0;i<check.length;i++)
    {
        if(check[i].value == null || check[i].value == "")
        {
            valid=false;
            check[i].style.backgroundColor="red";
            err[i].text("Empty Field!");
        }
        else{
            check[i].style.backgroundColor="white";
            err[i].text("");
        }
    }
    
    if (valid){
        
        doLogin(username.value, password.value);
        username.value = "";
        password.value = "";
        
    }

}

//actual login function
function doLogin(username, password) {
    var xhr = $.ajax({
        url: "ajax/login.php",
        type: "POST",
        data: {
                username: username,
                password: password
            }
    })
            .done(function () {
                var result = xhr.responseText;
               
                if (isNaN(result)) {
                    document.getElementById('error').innerHTML=result; 
                }else if (result=="") {
                    $("#error").text("Ajax request returned no data");
                } else {
                    $("#login-block").hide();
                    $("#error").hide();
                    $("#homepage").fadeIn(1150);
                    displayUser();
                    isAdmin();
                    initInbox();
                }                
            })
            .fail(userLoginFail);
}

//checks if user who just logged in is admin user. Admin user has username=admin and id=1
function isAdmin() {
        var checkAdmin = $.ajax({
        url: "ajax/who.php",
        type: "POST",
        data: {
            admin: "check"
        }
    })
            .always(function () {
                var result = checkAdmin.responseText;
                if (result == "admin") {
                    $("#create-btn").show();
                } else {
                    $("#create-btn").hide();
                }
                //console.log(checkAdmin);
            });
}

//loads the currently logged in usere's name on the homepage 
function displayUser() {
        var userName = $.ajax({
        url: "ajax/who.php",
        type: "POST",
        data: {
            admin: "no"
        }
    })
            .always(function () {
                var result = userName.responseText;
                document.getElementById('user').innerHTML = "Welcome <span class=\"numMsg\">"+result+"</span>";
                $("title").text("CheapoMail | "+result);
                              
            });
}

//loads the logged in user's 10 most recent messages as well as displays a message informing the user of any new messages
function initInbox()
{
    var rxml = $.ajax({
        url: "ajax/inbox.php",
        type: "POST",
        data: {
            isRead: "no",
            msg: "none"
        }
    })
            .done(function () {
                var result = rxml.responseText;
                document.getElementById('inbox').innerHTML = result;
                $(".body").hide();
                var newMsgs = $(".notRead");
                if (newMsgs.length==0) {
                    document.getElementById('newMsg').innerHTML = "You have no new messages!";
                } else if (newMsgs.length==1){
                    document.getElementById('newMsg').innerHTML = "You have <span class=\"numMsg\">"+newMsgs.length+" unread</span> Message! <img alt=\"new message\" src=\"external/email-alert.png\" >";
                } else {
                    document.getElementById('newMsg').innerHTML = "You have <span class=\"numMsg\">"+newMsgs.length+" unread</span> Messages! <img alt=\"new message\" src=\"external/email-alert.png\" >";
                }
                //console.log(newMsgs.length);
            });
}

//flags messages as read when a users clicks on a message and updates corresponding unread message count
function read(id) {
    $("#body"+id).fadeToggle(1000);
    $("#body").fadeIn(1000);
    $("#tr"+id).removeClass("notRead").addClass("read");
    var newMsgs = $(".notRead");
    if (newMsgs.length==0) {
        document.getElementById('newMsg').innerHTML = "You have no new messages!";
    } else if (newMsgs.length==1){
        document.getElementById('newMsg').innerHTML = "You have <span class=\"numMsg\">"+newMsgs.length+" unread</span> Message! <img alt=\"new message\" src=\"external/email-alert.png\">"; 
    } else {
        document.getElementById('newMsg').innerHTML = "You have <span class=\"numMsg\">"+newMsgs.length+" unread</span> Messages! <img alt=\"new message\" src=\"external/email-alert.png\">";
    }
        $.ajax({
        url: "ajax/inbox.php",
        type: "POST",
        data: {
            isRead: "yes",
            msg: ""+id
        }
    })
            .fail(function() {
                $("#error").show();
                $("#error").text("Failed to register read!");
            });
}

function userLoginFail() {
    alert("unable to login");
}

function regUser() {
    $("#homepage").hide();
    $("#reg-block").fadeIn(1150);
}

//checks for empty fields on the register user page. Also makes sure the same password was entered twice
function checkRegister() {
    
    var fname = document.forms["registerForm"]["fname"],
        lname = document.forms["registerForm"]["lname"],
        username = document.forms["registerForm"]["rusername"],
        password = document.forms["registerForm"]["rpassword"],
        cpassword = document.forms["registerForm"]["conf-password"],
        check=[fname,lname,username,password,cpassword],
        ferr = $("#ferr"), lerr = $("#lerr"), uerr = $("#ruerr"), perr = $("#rperr"), cperr = $("#cperr"),
        err = [ferr,lerr,uerr,perr,cperr],
        valid=true;
    // add validation
     
    for(var i=0;i<check.length;i++)
    {
        if(check[i].value == null || check[i].value == "")
        {
            valid=false;
            check[i].style.backgroundColor="red";
            err[i].text("Empty Field!");
        }
        else{
            check[i].style.backgroundColor="white";
            err[i].text("");
        }
    }
    if (password.value == cpassword.value){
        if (checkPass(password.value)){
            if (valid) {
                doRegister(fname.value, lname.value, username.value, password.value);
                fname.value = "";
                lname.value = "";
                username.value = "";
                password.value = "";
                cpassword.value = "";
            }
        } else {
            $("#cperr").text("Password error!");
        }
    } else {
        $("#cperr").text("Password mismatch!");
    }
}

/*checks the make sure password is at least 8 characters long, 
*has at least one uppercase, one lowercase and one digit. no sybols/non-alphanumeric characters allowed
*/
function checkPass(pass){

	var digit = /\d+/;
	var upper = /[A-Z]+/;
	var lower = /[a-z]+/;
	
	if(!digit.test(pass)){
            return false;
	} else if(!upper.test(pass)){
            return false;
	} else if(!lower.test(pass)){
            return false;
	} else if(pass.length < 8 ){
            return false;
	} else {
            return true;
	}
}

//actual registration function
function doRegister(fname, lname, username, password) {
    var xhr = $.ajax({
        url: "ajax/register.php",
        type: "POST",
        data: {
                firstname: fname,
                lastname: lname,
                username: username,
                password: password
            }
    })
            .always(function () {
                var result = xhr.responseText;
               
                if (isNaN(result)) {
                    //$("#error").show();
                    document.getElementById('error').innerHTML=result; 
                    //$("#login-block").hide();
                }else if (result=="") {
                    $("#error").text("Ajax request returned no data");
                } else {
                    $("#homepage").fadeIn(1150);
                    $("#reg-block").hide();
                    $("#error").hide();
                    alert("User successfully created!");
                }                
            });
    console.log(xhr);
}

function newMsg() {
    $("#homepage").fadeOut(500);
    $("#compose").fadeIn(1150);
};


//checks for empty fields when composing new message
function checkMessage() {
    var subject = document.forms['messageForm']['msg-subject'],
        recipients = document.forms['messageForm']['msg-recipients'],
        body = document.forms['messageForm']['msg-body'],
        valid=true,
        check=[subject,recipients,body];
    
        
    // add validation
    for(var i=0;i<check.length;i++)
    {
        if(check[i].value==null||check[i].value==""){
            valid=false;
            check[i].style.backgroundColor="red";
        }
        else{
            check[i].style.backgroundColor="white";
        }
    }
            
        
    if(valid){
    doSend(subject.value, recipients.value, body.value);
    subject.value = "";
    recipients.value = "";
    body.value = "";
    }
}

//sends message
function doSend(subject, recipients, body) {
    var xrh = $.ajax({
        url: "ajax/message.php",
        type: "POST",
        data: {
                subject: subject,
                recipients: recipients,
                body: body,
            }
    })
            .always(function () {
                var result = xrh.responseText;
               
                if (isNaN(result)) {
                    $("#error").show();
                    document.getElementById('error').innerHTML=result; 
                    //$("#login-block").hide();
                }else if (result=="") {
                    $("#error").show();
                    $("#error").text("Ajax request returned no data");
                } else {
                    $("#compose").hide();
                    $("#error").hide();
                    $("#homepage").fadeIn(1150);
                    alert("Message successfully sent!");
                }                
            });
}