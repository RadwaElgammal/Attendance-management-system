window.addEventListener("load",function(){
    let firstName=this.document.getElementById("firstName");
    let lastName=this.document.getElementById("lastName");
    let address=this.document.getElementById("address");
    let email=this.document.getElementById("email")
    let age=this.document.getElementById("age")
    let userPass=this.document.getElementById("pass")
    let firstNameMessage=document.getElementsByTagName("small")[0];
    let lastNameMessage=document.getElementsByTagName("small")[1];
    let addressMessage=document.getElementsByTagName("small")[2];
    let emailMessage=document.getElementsByTagName("small")[3];
    let ageMessage=document.getElementsByTagName("small")[4];
     roleRadios = document.getElementsByTagName("role");
     role1= this.document.getElementById("role1");
     role2= this.document.getElementById("role2");
     form = document.querySelector('form');
    
    //******************************************************************************* */
    firstName.focus();
    firstName.addEventListener('blur',function(){
        if(validationForFirstName()){
            firstName.style.border= "2px solid green";
            firstNameMessage.style.display="none";
        }
        else{

            firstName.style.border= "2px solid red";
            firstNameMessage.style.display="block";
            firstNameMessage.style.color="red";
            firstNameMessage.innerText="Please enter valid Name";
        }
    })//end of firstName
    lastName.addEventListener('blur',function(){
        if(validationForLastName()){
            lastName.style.border= "2px solid green";
            lastNameMessage.style.display="none";
        }
        else{

            lastName.style.border= "2px solid red";
            lastNameMessage.style.display="block";
            lastNameMessage.style.color="red";
            lastNameMessage.innerText="Please enter valid Name";
        }
    })//end of lastName
    address.addEventListener('blur',function(){
        if(validationForAddress()){
            address.style.border= "2px solid green";
            addressMessage.style.display="none";
        }
        else{

            address.style.border= "2px solid red";
            addressMessage.style.display="block";
            addressMessage.style.color="red";
            addressMessage.innerText="Enter valid Address like Dakahlia,Mansoura";
        }
    })//end of address
    email.addEventListener('blur',function(){
        if(validationForEmail()){
            email.style.border= "2px solid green";
            emailMessage.style.display="none";
        }
        else{

            email.style.border= "2px solid red";
            emailMessage.style.display="block";
            emailMessage.style.color="red";
            emailMessage.innerText=" Please Enter a valid email";
        }
    })//end of email
    age.addEventListener('blur',function(){
        if(validationForAge()){
            age.style.border= "2px solid green";
            ageMessage.style.display="none";
        }
        else{
            age.style.border= "2px solid red";
            ageMessage.style.display="block";
            ageMessage.style.color="red";
            ageMessage.innerText=" Age must be between 25 to 60";
        }
    });
  
////////////////////////////////////////////////////////end of validation
    $("#register").click(function(){
        if(validationForFirstName()&&validationForLastName()&&validationForAddress()&&validationForEmail()&&validationForAge()&&validateForm()){
            let objectsent={
                id:"",
                firstName:$(firstName).val(),
                lastName:$(lastName).val(),
                address:$(address).val(),
                email:$(email).val(),
                age:$(age).val(),
                type:$("input[name=yourType]:checked").val(),
            };
            //*********************** logic of email in registeration ***************************************/
            /*if email exsists in persons already will case an error but if 
            her register with it before before admin approve it he could register
            with the same email again incase he want to change his data like mistake
            in firstName or password and then admin will approve about the correct
            one and ignore the other one */
            //**************************************************************/

            //validation email  
            $.getJSON("/dataBase/db.json",function(data){
                var emailArray=[];
                for(var i =0;i<data.persons.length;i++)
                { 
                    emailArray.push(data.persons[i].email); 
                }
                result= emailArray.includes(objectsent.email,0);
                if(result)
                {
                    email.style.border= "2px solid red";
                    emailMessage.style.display="block";
                    emailMessage.style.color="red";
                    emailMessage.innerText="This Email is used before ";
                }
                else
                {
                    $.ajax({
                        url:" http://localhost:3000/pending",
                        type:"POST",
                        data:objectsent,
                    })
                }
           });
           alert("Registered successed wait for user name and password ")
        }
        
       
    })

})//end of load

/////////////////////////////////////functions/////////////////////////////////
function validationForFirstName(){
    firstNamePattern=/^[a-zA-Z]{4,10}$/;      
    return firstName.value.match(firstNamePattern);
}//fun for first name


function validationForLastName(){
    lastNamePattern=/^[a-zA-Z]{6,20}$/;      
    return lastName.value.match(lastNamePattern);
}//fun for first name


function validationForAddress(){
    addressPattern=/[A-z]+([,]+)/;      
    return address.value.match(addressPattern);
}//fun foe address

function validationForEmail(){
    emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;      
    return email.value.match(emailPattern)
}//fun of email

function validationForAge(){
    if(age.value>=25&& age.value<=60)
    {
        return true;
    }
}//fun of age

  function validateForm(form) {
   
    if(role1.checked||role2.checked)
    {
        return true 
    }
    else 
    {
        alert ('Please choose a role before signing up.')
        return false 
    }
  }




