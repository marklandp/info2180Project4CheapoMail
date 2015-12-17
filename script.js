
$(function(){
    $("#reg-block").hide();
    $("#homepage").hide();
    $("#compose").hide();
    $("#create-btn").hide();
    $("#login-btn").click(checkLogin);
    $("#new-btn").click(newMsg);
    $("#create-btn").click(regUser);
    $("#logout-btn").click(signOut);
    $("#send-btn").click(checkMessage);
    $("#register-btn").click(checkRegister);
    $("#sync").click(initInbox);
    
});

function newMsg() {
    $("#homepage").fadeOut(500);
    $("#compose").fadeIn(2500);
};

function signOut() {
    var xr = $.ajax("logout.php")
            .done(function() {
                //console.log(xr);
                $("#login-block").fadeIn(2000);
                $("#homepage").hide();
                $("#compose").hide();
                $("#reg-block").hide();
            });

    //$("#create-btn").show();
};

function checkLogin() {
    var username = document.forms["signInForm"]["username"],
        password = document.forms["signInForm"]["password"],
        check=[username,password],
        uerr = $("#uerr"), perr = $("#perr"),
        err = [uerr,perr],
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
    
    if (valid){
        
        doLogin(username.value, password.value);
        username.value = "";
        password.value = "";
        
    }

}


function doLogin(username, password) {
    var xhr = $.ajax({
        url: "login.php",
        type: "POST",
        data: {
                username: username,
                password: password
            }
    })
            .done(function () {
                var result = xhr.responseText;
               
                if (isNaN(result)) {
                    //$("#error").show();
                    document.getElementById('error').innerHTML=result; 
                    //$("#login-block").hide();
                }else if (result=="") {
                    $("#error").text("Ajax request returned no data");
                } else {
                    $("#login-block").hide();
                    $("#error").hide();
                    $("#homepage").fadeIn(2500);
                    displayUser();
                    isAdmin();
                    initInbox();
                }                
            })
            .fail(userLoginFail);
}

function isAdmin() {
        var checkAdmin = $.ajax({
        url: "who.php",
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

function displayUser() {
        var userName = $.ajax({
        url: "who.php",
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
function initInbox()
{
    var rxml = $.ajax({
        url: "inbox.php",
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
                    document.getElementById('newMsg').innerHTML = "You have <span class=\"numMsg\">"+newMsgs.length+" unread</span> Message!";
                } else {
                    document.getElementById('newMsg').innerHTML = "You have <span class=\"numMsg\">"+newMsgs.length+" unread</span> Messages!";
                }
                //console.log(newMsgs.length);
            });
}

function read(id) {
    $("#body"+id).fadeToggle(1000);
    $("#body").fadeIn(1000);
    $("#tr"+id).removeClass("notRead").addClass("read");
    var newMsgs = $(".notRead");
    if (newMsgs.length==0) {
        document.getElementById('newMsg').innerHTML = "You have no new messages!";
    } else if (newMsgs.length==1){
        document.getElementById('newMsg').innerHTML = "You have <span class=\"numMsg\">"+newMsgs.length+" unread</span> Message!"; 
    } else {
        document.getElementById('newMsg').innerHTML = "You have <span class=\"numMsg\">"+newMsgs.length+" unread</span> Messages!";
    }
        $.ajax({
        url: "inbox.php",
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
    $("#reg-block").fadeIn(2500);
}

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

function checkPass(pass){

	var digit = /\d+/;
	var upper = /[A-Z]+/;
	var lower = /[a-z]+/;
	
	if(!digit.test(pass)){
            return false;
            //alert('Invalid Password\n Password should contain at least one digit');
	} else if(!upper.test(pass)){
            return false;
            //alert('Invalid Password\n Password should contain at least one capital letter');
	} else if(!lower.test(pass)){
            return false;
            //alert('Invalid Password\n Password should contain at least one letter');
	} else if(pass.length < 8 ){
            return false;
            //alert('Invalid Password Length\nEnsure that your password is 8 characters or greater');
	} else {
            return true;
	}
}

function doRegister(fname, lname, username, password) {
    var xhr = $.ajax({
        url: "register.php",
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
                    $("#homepage").fadeIn(2500);
                    $("#reg-block").hide();
                    $("#error").hide();
                    alert("User successfully created!");
                }                
            });
    console.log(xhr);
}


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

function doSend(subject, recipients, body) {
    var xrh = $.ajax({
        url: "message.php",
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
                    $("#homepage").fadeIn(2500);
                    alert("Message successfully sent!");
                }                
            });
}