<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>CheapoMail</title>
        <script src="external/jquery.min.js"></script>
        <script src="script.js"></script>
        <link href="styles.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div id="main" >
            <p id="header">CheapoMail</p>
		<div id="login-block" class="login-block">
			<form role="form" id="signInForm" method="POST" action="">
				<h1>Login</h1>
                                <input type="text" value="" placeholder="Username" id="username" /><span id="uerr" class="err"></span><br />
                                <input type="password" value="" placeholder="Password" id="password" /><span id="perr" class="err"></span><br />
				<!--<button id="login-btn">Login</button>-->
				<input type="button" value="Login" id="login-btn" class="input-btn">
			</form>
		</div>
        <div id="reg-block" class="login-block"> 
			<form role="form" id="registerForm" method="POST" action="">
				<h1>Register</h1>
				<input type="text" value="" placeholder="First Name" id="fname" /><span id="ferr" class="err"></span><br />
				<input type="text" value="" placeholder="Last Name" id="lname" /><span id="lerr" class="err"></span><br />
				<input type="text" value="" placeholder="Username" id="rusername" /><span id="ruerr" class="err"></span><br />
				<input type="password" value="" placeholder="Password" id="rpassword" /><span id="rperr" class="err"></span><br />
				<input type="password" value="" placeholder="Confirm Password" id="conf-password" /><span id="cperr" class="err"></span><br />
                                <input type="button" value="Register User" id="register-btn" class="input-btn">
			</form>
		</div>
        <div id="homepage" class="login-block">
            <p id="user" class="user"></p>
            <p id="newMsg" class="user"></p>
            <div id="inbox">
            </div>
            <button id="new-btn" class="admin-btn">New Message</button>
            <button id="sync" class="admin-btn">Sync Messages</button>
            <button id="create-btn" class="admin-btn">Create User</button><br /><br />
            <input type="button" value="Sign Out" id="logout-btn" class="input-btn">
        </div>
        <div id="compose" class="login-block">
                <form role="form" id="messageForm" action="" method="POST">
                    <fieldset>
                    <legend>Compose Message</legend>
                        <input type="text" id="msg-subject" class="form-control" value="" placeholder="Subject">  
                        <input type="text" id="msg-recipients" class="form-control" value="" placeholder="Recipients"> <p id="delimiter">Separate each username with a semicolon (';')</p>
                        <textarea id="msg-body" class="form-control" rows="5" col="20" placeholder="Type message here..."></textarea>
                        <!--<button id="send-btn">Send</button>-->
                        <input type="button" value="Send" id="send-btn" class="input-btn">
                    </fieldset>
                </form>
        </div><!-- end of homepage div-->
        <div id="error" class="sections" class="col-md-6">
        </div>
        <p id="footer">&copy;2015 | 620011825, 620075629, 620053626</p>
        </div><!-- end of main -->
    </body>
</html>