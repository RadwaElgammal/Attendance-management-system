$(function(){
    (function displayEmployeeData(){
        let userNameFromLocal=JSON.parse(localStorage.getItem("userName")) 
        let valueOfUserName= userNameFromLocal.userName

        $("span:first").text(" "+valueOfUserName).css("color","red");

        
    $("input:eq(0)").change(function(){
        let dayDate=new Date($(this).val()) 
        var month=dayDate.getMonth()+1;
        var year=dayDate.getFullYear();
        var day=dayDate.getDate();
        let fullDay=[month,day,year].join('/');
        
        fetch(`http://localhost:3000/attendence?userName=${valueOfUserName}&date=${fullDay}`)
        .then((data)=>data.json())
        .then((data)=>{
            if(data.length>0)
            {
                createdTable.innerHTML="";

                let createdTable=document.getElementsByTagName("tbody")[0]
                createdTr=document.createElement("tr");
                createdTd1=document.createElement("td");
                createdTd1.innerText=data[0].date;
                createdTd2=document.createElement("td");
                createdTd2.innerText=data[0].attendanceTime;
                createdTd3=document.createElement("td");
                createdTd3.innerText=data[0].leaveTime;
                createdTd4=document.createElement("td");
                createdTd4.innerText=data[0].lateTimes;
                createdTd5=document.createElement("td");
                createdTd5.innerText=data[0].excuseTimes;

                createdTr.appendChild(createdTd1);
                createdTr.appendChild(createdTd2);
                createdTr.appendChild(createdTd3);
                createdTr.appendChild(createdTd4);
                createdTr.appendChild(createdTd5);
                console.log(createdTr)
                createdTable.appendChild(createdTr)

            }
            else
            {
                alert("you was absent that day")
            }
        })       

    })//end of daily

    $("input:eq(1)").change(function(){
        let dayDate=new Date($(this).val()) 
        var month=dayDate.getMonth()+1;
        var year=dayDate.getFullYear();
        var day=dayDate.getDate();
         startDate=[month,day,year].join('/');
    })
    $("input:eq(2)").change(function(){
        let dayDate=new Date($(this).val()) 
        var month=dayDate.getMonth()+1;
        var year=dayDate.getFullYear();
        var day=dayDate.getDate();
         endDate=[month,day,year].join('/');
        
        fetch(`http://localhost:3000/attendence?_expand=person&date_gte=${startDate}&date_lte=${endDate}&userName=${valueOfUserName}`)
        .then((data)=>data.json())
        .then((data)=>{
            if(data.length>0)
            {
                //console.log(data);
                let createdTable=document.getElementsByTagName("tbody")[0]
                if(createdTable.children[0]==1)
                {

                    createdTr=document.createElement("tr");
                    createdTd1=document.createElement("td");
                    createdTd1.innerText=data[0].date;
                    createdTd2=document.createElement("td");
                    createdTd2.innerText=data[0].attendanceTime;
                    createdTd3=document.createElement("td");
                    createdTd3.innerText=data[0].leaveTime;
                    createdTd4=document.createElement("td");
                    createdTd4.innerText=data[0].lateTimes;
                    createdTd5=document.createElement("td");
                    createdTd5.innerText=data[0].excuseTimes;
    
                    createdTr.appendChild(createdTd1);
                    createdTr.appendChild(createdTd2);
                    createdTr.appendChild(createdTd3);
                    createdTr.appendChild(createdTd4);
                    createdTr.appendChild(createdTd5);
                    console.log(createdTr)
                    createdTable.appendChild(createdTr)
                }
                else
                {
                    createdTable.innerHTML="";

                    createdTr=document.createElement("tr");
                    createdTd1=document.createElement("td");
                    createdTd1.innerText=data[0].date;
                    createdTd2=document.createElement("td");
                    createdTd2.innerText=data[0].attendanceTime;
                    createdTd3=document.createElement("td");
                    createdTd3.innerText=data[0].leaveTime;
                    createdTd4=document.createElement("td");
                    createdTd4.innerText=data[0].lateTimes;
                    createdTd5=document.createElement("td");
                    createdTd5.innerText=data[0].excuseTimes;
    
                    createdTr.appendChild(createdTd1);
                    createdTr.appendChild(createdTd2);
                    createdTr.appendChild(createdTd3);
                    createdTr.appendChild(createdTd4);
                    createdTr.appendChild(createdTd5);
                    console.log(createdTr)
                    createdTable.appendChild(createdTr)

                }
               

           }
           else
           {
                alert("No data to show select another range")
           }
           
       }) //end of monthly report      

    })
    })() 
 
})