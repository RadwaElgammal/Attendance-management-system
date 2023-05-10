

$(function(){
    (async function getAllEmployees(){
        try{
            const response = await fetch ("http://localhost:3000/persons");
            const getAllEmployeesData = await response.json();

            const response2 = await fetch ("http://localhost:3000/attendence");
            const getAllAttendenceData = await response2.json();

            const mergedData = mergeData(getAllEmployeesData,getAllAttendenceData,"userName");
          
            if(mergedData.length>0)
            {
                mergedData.forEach(Element=>{
                    createdTr = document.createElement("tr");
                    createdTable=document.getElementsByTagName("tbody")[0];
                    createdTd1=document.createElement("td");
                    createdTd1.innerText=  Element.firstName;
                    createdTd2=document.createElement("td");
                    createdTd2.innerText= Element.lastName;
                    createdTd3=document.createElement("td");
                    createdTd3.innerText=  Element.userName;
                    createdTd4=document.createElement("td");
                    createdTd4.innerText= Element.type;
                    createdTd5=document.createElement("td");
                    createdTd5.innerText= Element.age;
                    createdTd6=document.createElement("td");
                    createdTd6.innerText= Element.passWord;
                    createdTd7=document.createElement("td");
                    createdTd7.innerText= Element.date;
                    createdTd8=document.createElement("td");
                    createdTd8.innerText= Element.attendanceTime;
                    createdTd9=document.createElement("td");
                    createdTd9.innerText= Element.leaveTime;
                    createdTd10=document.createElement("td");
                    createdTd10.innerText=  Element.lateTimes;
                    createdTd11=document.createElement("td");
                    createdTd11.innerText= Element.excuseTimes;
                    createdTd12=document.createElement("td");
                    createdTd12.innerText= Element.attendenceTimes;
            
                    createdTr.appendChild(createdTd1);
                    createdTr.appendChild(createdTd2);
                    createdTr.appendChild(createdTd3);
                    createdTr.appendChild(createdTd4);
                    createdTr.appendChild(createdTd5);
                    createdTr.appendChild(createdTd6);
                    createdTr.appendChild(createdTd7);
                    createdTr.appendChild(createdTd8);
                    createdTr.appendChild(createdTd9);
                    createdTr.appendChild(createdTd10);
                    createdTr.appendChild(createdTd11);
                    createdTr.appendChild(createdTd12);
            
                    createdTable.appendChild(createdTr)
       
                })
            }
            else
            {
                let newElement = document.createElement('div');
                newElement.id = 'myElement';
                document.body.appendChild(newElement);
                mainDiv=document.getElementById("data")
                mainDiv.innerText="No data to show"
            }
          
        }
        catch
        {
            console.log("error")
        }
    })()

    function mergeData(data1, data2, keyField) {
        const mergedData = [];
      
        data1.forEach(item1 => {
          const matchingItem = data2.find(item2 => item2[keyField] === item1[keyField]);
      
          if (matchingItem) {
            mergedData.push(Object.assign({}, item1, matchingItem));
          }
        });
      
        return mergedData;
      }
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
           var position=$(el).children()[0].innerText;
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
});

// $(function(){

//     let mapArray=[];
//     (async function displayAllEmp()
//     {
//         createdTable=document.getElementsByTagName("tbody")[0]
//         fetch("http://localhost:3000/persons")
//         .then((data)=>data.json())
//         .then((data)=>{
//             if(data.length>0)
//             {
//                 console.log(data)
//               mapArray= data.map(function(employee){
//                     return new Object({
//                         userName:employee.userName,
//                         age:employee.age,
//                         type:employee.type,
//                         passWord:employee.passWord,
//                         firstName:employee.firstName,
//                         lastName:employee.lastName
//                     })
//               })
//             }
//             else
//             {
//                 alert("No employees to show")
//             }
//         }).then(()=>{
//             fetch("http://localhost:3000/attendence")
//             .then((data)=>data.json())
//             .then((data)=>{
//                 console.log(data)
//                  foundElement=[]
//                  data.forEach(function(elementAttendence){
//                        foundElement= mapArray.find(function(elementPerson){
//                         console.log(elementAttendence)
//                        return  elementAttendence.userName==elementPerson.userName
                        
//                     })
                  
//                 })

//             }).then(()=>{
//                 console.log(foundElement)
//                 // console.log(employee)
//                 myfun()
//             })
//         })
//     })()

//     function myfun (){

//                     console.log(foundElement)
//                     createdTr=document.createElement("tr");
//                     createdTable=document.getElementsByTagName("tbody")[0];
//                     createdTd1=document.createElement("td");
//                     createdTd1.innerText=foundElement.firstName;
//                     createdTd2=document.createElement("td");
//                     createdTd2.innerText=foundElement.lastName;

//                     createdTd3=document.createElement("td");
//                     createdTd3.innerText=foundElement.userName;
//                     createdTd4=document.createElement("td");
//                     createdTd4.innerText=foundElement.type;
//                     createdTd5=document.createElement("td");
//                     createdTd5.innerText=foundElement.age;
//                     createdTd6=document.createElement("td");
//                     createdTd6.innerText=foundElement.passWord;
//                     createdTd7=document.createElement("td");
//                     createdTd7.innerText=elementAttendence.date;
//                     createdTd8=document.createElement("td");
//                     createdTd8.innerText=elementAttendence.attendanceTime;
//                     createdTd9=document.createElement("td");
//                     createdTd9.innerText=elementAttendence.leaveTime;
//                     createdTd10=document.createElement("td");
//                     createdTd10.innerText=elementAttendence.lateTimes;
//                     createdTd11=document.createElement("td");
//                     createdTd11.innerText=elementAttendence.excuseTimes;
//                     createdTd12=document.createElement("td");
//                     createdTd12.innerText=elementAttendence.attendenceTimes;

//                     createdTr.appendChild(createdTd1);
//                     createdTr.appendChild(createdTd2);
//                     createdTr.appendChild(createdTd3);
//                     createdTr.appendChild(createdTd4);
//                     createdTr.appendChild(createdTd5);
//                     createdTr.appendChild(createdTd6);
//                     createdTr.appendChild(createdTd7);
//                     createdTr.appendChild(createdTd8);
//                     createdTr.appendChild(createdTd9);
//                     createdTr.appendChild(createdTd10);
//                     createdTr.appendChild(createdTd11);
//                     createdTr.appendChild(createdTd12);


//                     createdTable.appendChild(createdTr);
//     }
   
//     $("#requests").click(function(){

//         window.location.replace("/htmlPages/adminPage.html")
//     })
//     $("#empInfo").click(function(){

//         window.location.replace("/htmlPages/employeeInfo.html")
//     })
//     $("#fullReports").click(function(){

//         window.location.replace("/htmlPages/fullReport.html")
//     })
//     $("#lateReport").click(function(){

//         window.location.replace("/htmlPages/lateReport.html")
//     })
//     $("#excuseReport").click(function(){

//         window.location.replace("/htmlPages/excuseReport.html")
//     })
//     $(":text:first").keyup(function(){
//         var enteredword=$(this).val();
//         $("tr:gt(0)").each(function(el){
//            var position=$(el).children()[1].innerText;
//             if((position.toLowerCase().indexOf(enteredword)!=-1)||(position.toLowerCase().indexOf(enteredword)!=-1 ))
//            {
//                 $(this).show(1500).css("color","green");
//            }
//            else
//            {
//                 $(this).hide(1500).css("color","red");
//            }
//            if(enteredword=="")
//            {
//             $(this).show(1000).css("color","black");
//            }
           
//         })
//     })

    
// })








