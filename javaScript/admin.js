$(function(){
    (async function displayPending(){
        let allPendings=await fetch("http://localhost:3000/pending");
        let allPndingsRequests=await allPendings.json();
        console.log()
        if(allPndingsRequests.length>0)
        {
            allPndingsRequests.forEach(function(element){
                createdTr=document.createElement("tr");
                createdTable=document.getElementsByTagName("tbody")[0];
                   
        
                    createdTd1=document.createElement("td");
                    createdTd1.innerText=element.id;
                    createdTd2=document.createElement("td");
                    createdTd2.innerText=element.firstName;
                    createdTd3=document.createElement("td");
                    createdTd3.innerText=element.lastName;
                    createdTd4=document.createElement("td");
                    createdTd4.innerText=element.email;
                    createdTd5=document.createElement("td");
                    createdTd5.innerText=element.type;
                    createdTd6=document.createElement("td");
                    createdTd6.innerText=element.age;
                    createdTd7=document.createElement("td");
                    createdTd7.innerHTML='<i class="fa-sharp fa-solid fa-circle-check"></i>'
                    createdTd8=document.createElement("td");
                    createdTd8.innerHTML='<i class="fa-solid fa-circle-xmark"></i>'
                    
                
                    createdTr.appendChild(createdTd1);
                    createdTr.appendChild(createdTd2);
                    createdTr.appendChild(createdTd3);
                    createdTr.appendChild(createdTd4);
                    createdTr.appendChild(createdTd5);
                    createdTr.appendChild(createdTd6);
                    createdTr.appendChild(createdTd7);
                    createdTr.appendChild(createdTd8);
                    createdTable.appendChild(createdTr);
                    
                   $(createdTd7).children(0).click(function(e){
        
                   //data send to person
                   valueOfEmail=e.target.parentElement.parentElement.children[3].innerText;
                   username=generateUsername(e.target.parentElement.parentElement.children[1].innerText,e.target.parentElement.parentElement.children[2].innerText),
        
                    fetch("http://localhost:3000/persons",{method:"POST",body:JSON.stringify(
                        {
                            id:"",
                            firstName:e.target.parentElement.parentElement.children[1].innerText,
                            lastName:e.target.parentElement.parentElement.children[2].innerText,
                            email:e.target.parentElement.parentElement.children[3].innerText,
                            type:e.target.parentElement.parentElement.children[4].innerText,
                            age:e.target.parentElement.parentElement.children[5].innerText,
                            userName:generateUsername(e.target.parentElement.parentElement.children[1].innerText,e.target.parentElement.parentElement.children[2].innerText),
                            passWord:1234 
                        }
                       
                        ),headers: { "Content-Type": "application/json" }})
                        .then(()=>{
                            //send email
                            sendEmail();
                            //delete from pending after sending to persons
                          fetch(`http://localhost:3000/pending/${e.target.parentElement.parentElement.children[0].innerText}`,{method:"DELETE"})
                        })
                   })
                        //delete this employee at all
                   $(createdTd8).children(0).click(function(e){
                        fetch(`http://localhost:3000/pending/${e.target.parentElement.parentElement.children[0].innerText}`,{method:"DELETE"})
                   })
                }) 
        }

        else
        {
            let newElement = document.createElement('div');
            newElement.id = 'myElement';
            document.body.appendChild(newElement);
            mainDiv=document.getElementById("data")
            mainDiv.innerText="No Requests to show"
        }
  
        
    })();

    $("#requests").click(function(){

        window.location.replace("/htmlPages/adminPage.html")
    })
    $("#empInfo").click(function(){

        window.location.replace("/htmlPages/employeeInfo.html")
    })
    $("#fullReports").click(function(){

        window.location.replace("/htmlPages/fullReport.html")
    })
    $("#lateReport").click(function(){

        window.location.replace("/htmlPages/lateReport.html")
    })
    $("#excuseReport").click(function(){

        window.location.replace("/htmlPages/excuseReport.html")
    })
    $(":text:first").keyup(function(){
        var enteredword=$(this).val();
        $("tr:gt(0)").each(function(i,el){
           var firstName= $(el).children()[0].innerText;
           var position=$(el).children()[1].innerText;
            if((position.toLowerCase().indexOf(enteredword)!=-1)||(position.toLowerCase().indexOf(enteredword)!=-1 ))
           {
                $(this).show(1500).css("color","green");
           }
           else
           {
                $(this).hide(1500).css("color","red");
           }
           if(enteredword=="")
           {
            $(this).show(1000).css("color","black");
           }
           
        })
    })

})



//fun to get random user name 
function generateUsername(firstName, lastName) {
    var randomNum = Math.floor(Math.random() * 9000) + 1000;
    var specialChar = ["!", "$", "#", "@", "&"];
    var randomChar = specialChar[Math.floor(Math.random() * specialChar.length)];
    return firstName + lastName + randomNum + randomChar;
}
//fun to send email 
function sendEmail(){
    Email.send({
        SecureToken :"685e71c2-c873-4b55-90f9-b99a2e3ffeac",
        To :valueOfEmail,
        From : "elgammalr74@gmail.com",
        Subject : "test ",
        Body : `your user name is: ${username} and your password is 123`
    }).then(
      message => alert(message)
    );
}
