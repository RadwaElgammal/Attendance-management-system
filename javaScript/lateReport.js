
$(function(){
    (async function getAllEmployees(){
        try{
            const response = await fetch ("http://localhost:3000/persons");
            const getAllEmployeesData = await response.json();

            const response2 = await fetch ("http://localhost:3000/attendence");
            const getAllAttendenceData = await response2.json();

            const mergedData = mergeData(getAllEmployeesData,getAllAttendenceData,"userName");
            console.log(mergedData.length)
            if(mergedData.length>0)
            {
                mergedData.forEach(Element=>{
                    createdTr = document.createElement("tr");
                    createdTable=document.getElementsByTagName("tbody")[0];
                    createdTd1=document.createElement("td");
                    createdTd1.innerText=  Element.userName;
                    createdTd2=document.createElement("td");
                    createdTd2.innerText= Element.type;
                    createdTd3=document.createElement("td");
                    createdTd3.innerText=  Element.age;
                    createdTd4=document.createElement("td");
                    createdTd4.innerText= Element.passWord;
                    createdTd5=document.createElement("td");
                    createdTd5.innerText= Element.date;
                    createdTd6=document.createElement("td");
                    createdTd6.innerText= Element.lateTimes;
            
                    createdTr.appendChild(createdTd1);
                    createdTr.appendChild(createdTd2);
                    createdTr.appendChild(createdTd3);
                    createdTr.appendChild(createdTd4);
                    createdTr.appendChild(createdTd5);
                    createdTr.appendChild(createdTd6);
            
                    createdTable.appendChild(createdTr)
       
                })
            }
            else 
            {
                let newElement = document.createElement('div');
                newElement.id = 'myElement';
                document.body.appendChild(newElement);
                mainDiv=document.getElementsByTagName("div")[0];
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
    // $(":text:first").keyup(function(){
    //     var enteredword=$(this).val();
    //     $("tr:gt(0)").each(function(el){
    //        var position=$(el).children()[1].innerText;
    //         if((position.toLowerCase().indexOf(enteredword)!=-1)||(position.toLowerCase().indexOf(enteredword)!=-1 ))
    //        {
    //             $(this).show(1500).css("color","green");
    //        }
    //        else
    //        {
    //             $(this).hide(1500).css("color","red");
    //        }
    //        if(enteredword=="")
    //        {
    //         $(this).show(1000).css("color","black");
    //        }
           
    //     })
    // })
});
























// $(function(){

//     let mapArray=[];
//     (function displayAllEmp()
//     {
//         createdTable=document.getElementsByTagName("tbody")[0]
//         fetch("http://localhost:3000/persons")
//         .then((data)=>data.json())
//         .then((data)=>{
//             if(data.length>0)
//             {
//               mapArray= data.map(function(employee){
//                     return new Object({
//                         userName:employee.userName,
//                         age:employee.age,
//                         type:employee.type,
//                         passWord:employee.passWord,
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
//                 let foundElement=[]
//                 data.forEach(function(elementAttendence){
//                     foundElement= mapArray.find(function(elementPerson){
//                         return elementAttendence.userName==elementPerson.userName

//                     })
//                     createdTr=document.createElement("tr");
//                     createdTable=document.getElementsByTagName("tbody")[0];

//                     createdTd1=document.createElement("td");
//                     createdTd1.innerText=foundElement.userName;
//                     createdTd2=document.createElement("td");
//                     createdTd2.innerText=foundElement.type;
//                     createdTd3=document.createElement("td");
//                     createdTd3.innerText=foundElement.age;
//                     createdTd4=document.createElement("td");
//                     createdTd4.innerText=foundElement.passWord;
//                     createdTd5=document.createElement("td");
//                     createdTd5.innerText=elementAttendence.date;
//                     createdTd6=document.createElement("td");
//                     createdTd6.innerText=elementAttendence.excuseTimes;
             

//                     createdTr.appendChild(createdTd1);
//                     createdTr.appendChild(createdTd2);
//                     createdTr.appendChild(createdTd3);
//                     createdTr.appendChild(createdTd4);
//                     createdTr.appendChild(createdTd5);
//                     createdTr.appendChild(createdTd6);
        

//                     createdTable.appendChild(createdTr);
//                 })

//             })
//         })
//     })()
   
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
//         $("tr:gt(0)").each(function(i,el){
//            var firstName= $(el).children()[0].innerText;
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









// $(function(){

//     let mapArray=[];
//     (function displayAllEmp()
//     {
//         createdTable=document.getElementsByTagName("tbody")[0]
//         fetch("http://localhost:3000/persons")
//         .then((data)=>data.json())
//         .then((data)=>{
//             if(data.length>0)
//             {
//               mapArray= data.map(function(employee){
//                     return new Object({
//                         userName:employee.userName,
//                         age:employee.age,
//                         type:employee.type,
//                         passWord:employee.passWord,
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
//                 let foundElement=[]
//                 data.forEach(function(elementAttendence){
//                     foundElement= mapArray.find(function(elementPerson){
//                         return elementAttendence.userName==elementPerson.userName

//                     })
//                     createdTr=document.createElement("tr");
//                     createdTable=document.getElementsByTagName("tbody")[0];

//                     createdTd1=document.createElement("td");
//                     createdTd1.innerText=foundElement.userName;
//                     createdTd2=document.createElement("td");
//                     createdTd2.innerText=foundElement.type;
//                     createdTd3=document.createElement("td");
//                     createdTd3.innerText=foundElement.age;
//                     createdTd4=document.createElement("td");
//                     createdTd4.innerText=foundElement.passWord;
//                     createdTd5=document.createElement("td");
//                     createdTd5.innerText=elementAttendence.date;
//                     createdTd6=document.createElement("td");
//                     createdTd6.innerText=elementAttendence.lateTimes;
             

//                     createdTr.appendChild(createdTd1);
//                     createdTr.appendChild(createdTd2);
//                     createdTr.appendChild(createdTd3);
//                     createdTr.appendChild(createdTd4);
//                     createdTr.appendChild(createdTd5);
//                     createdTr.appendChild(createdTd6);
        

//                     createdTable.appendChild(createdTr);
//                 })

//             })
//         })
//     })()
   
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
//         $("tr:gt(0)").each(function(i,el){
//            var firstName= $(el).children()[0].innerText;
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
