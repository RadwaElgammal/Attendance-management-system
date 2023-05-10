$(function(){

    (function displayAllEmp()
    {
        createdTable=document.getElementsByTagName("tbody")[0]
        fetch("http://localhost:3000/persons")
        .then((data)=>data.json())
        .then((data)=>{
            if(data.length>0)
            {
                data.forEach(function(employee){
                    createdTr=document.createElement("tr");

                    createdTd1=document.createElement("td")
                    createdTd1.innerText=employee.id
                    createdTd2=document.createElement("td")
                    createdTd2.innerText=employee.firstName
                    createdTd3=document.createElement("td")
                    createdTd3.innerText=employee.lastName
                    createdTd4=document.createElement("td")
                    createdTd4.innerText=employee.email
                    createdTd5=document.createElement("td")
                    createdTd5.innerText=employee.type
                    createdTd6=document.createElement("td")
                    createdTd6.innerText=employee.age
                    createdTd7=document.createElement("td")
                    createdTd7.innerText=employee.userName
                    createdTd8=document.createElement("td")
                    createdTd8.innerText=employee.passWord

                    createdTr.appendChild(createdTd1)
                    createdTr.appendChild(createdTd2)
                    createdTr.appendChild(createdTd3)
                    createdTr.appendChild(createdTd4)
                    createdTr.appendChild(createdTd5)
                    createdTr.appendChild(createdTd6)
                    createdTr.appendChild(createdTd7)
                    createdTr.appendChild(createdTd8)
                    createdTable.appendChild(createdTr)  

                })
    
            }
            else
            {
                alert("No employees to show")
            }
        })
    })()
   
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
