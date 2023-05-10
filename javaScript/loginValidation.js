
$(function(){

    var authenticated = sessionStorage.getItem('authenticated');
    var accessPermissions = sessionStorage.getItem('accessPermissions');

    $("#login").click(function(){
        userNameValue=$("#userName").val();
        userPass=$("#pass").val();

        fetch(`http://localhost:3000/persons?userName=${userNameValue}&passWord=${userPass}`)
        .then((data)=>data.json())
        .then((data)=>{
            console.log(data)
            if(data.length>0)

            {  
               
                let userObj={userName:userNameValue}
                if(data[0].type=="admin")
                {
                  
                    window.location.replace("/htmlPages/adminPage.html")
                    localStorage.setItem("userName",JSON.stringify(userObj));
                    sessionStorage.setItem('authenticated', true);
                    sessionStorage.setItem('accessPermissions', 'admin');

                }
                else if(data[0].type=="employee")
                {
                   window.location.replace("/htmlPages/employeeProfile.html")
                   localStorage.setItem("userName",JSON.stringify(userObj));
                   sessionStorage.setItem('authenticated', true);
                   sessionStorage.setItem('accessPermissions', 'employee');
                }
                else
                {
                  window.location.replace("/htmlPages/attendancePage.html")
                  localStorage.setItem("userName",JSON.stringify(userObj));
                  sessionStorage.setItem('authenticated', true);
                  sessionStorage.setItem('accessPermissions', 'security');
                }  

            }
            else
            {
                alert("this employee does not exsists")
            }
        })

    })

    
    const user = sessionStorage.getItem('accessPermissions');
    if (window.location.pathname === '/adminPage.html' && user !== 'admin') {
    window.location.href = '/login.html';
}
})