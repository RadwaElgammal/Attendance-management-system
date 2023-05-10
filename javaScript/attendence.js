
$(function(){

    //get current day
    let date =new Date();
    let currentDate=date.toLocaleString();
    let currentDay=currentDate.split(",")[0];

    let currenttime=new Date();
    let currentTime=currenttime.getHours();
   
    
    //start time for employees
    let starttime=new Date();
    starttime.setHours(9,0,0,0);
    let startTime=starttime.getHours()


    //late time
    let latetime=new Date();
    latetime.setHours(9,30,0,0);
    let lateTime=latetime.getHours()

    //end time of work
    let endtime=new Date();
    endtime.setHours(15,30,0,0);
    let endTime=endtime.getHours()

    let attendanceTime=0;
    let excuseTime=0;
    let lateTimes=0; 


    $("#confirm").click(function(){

        let valueEntered=document.getElementsByTagName("input")[0].value;

        fetch(`http://localhost:3000/persons?userName=${valueEntered}`)
            .then((data)=>data.json())
            .then((data)=>{
                if(data.length>0)
                {
                    let empId=data[0].id
                    // console.log(data[0].userName)
                    fetch(`http://localhost:3000/attendence?userName=${data[0].userName}`)
                    .then((data)=>data.json())
                    .then((data)=>{
                        if(data.length>0)
                        {
                                result= data.findLast((element =>element.userName == data[0].userName ))
                                // console.log(result)
                                const  attID = result.id
                               
                                if((currentDay!=result.date&&result.leaveTime!="")||(currentDay==result.date&&result.attendanceTime==""))
                                {
                                    if(currentTime>=startTime&& currentTime<=lateTime)
                                    {
                                        attendanceTime++
                                        fetch("http://localhost:3000/attendence",{method:"POST",body:JSON.stringify(
                                            {
                                                
                                                id:"",
                                                empID:empId,
                                                userName:valueEntered,
                                                date:currentDay,
                                                attendanceTime:currentTime,
                                                leaveTime:"",
                                                attendenceTimes:attendanceTime,
                                                excuseTimes: 0,
                                                lateTimes: 0
                                            }
                                        ),headers:{"Content-Type": "application/json"}})
                                        .then(()=>{
                                            alert("have a nice day")
                                        })
                                    }//arrive on time
                                    else if(currentTime>=lateTime&& currentTime<=endTime)
                                    {
                                        ++ lateTimes
                                        attendanceTime++
                                        fetch("http://localhost:3000/attendence",{method:"POST",body:JSON.stringify(
                                            {
                                                id:"",
                                                empID:empId,
                                                userName:valueEntered,
                                                date:currentDay,
                                                attendanceTime:currentTime,
                                                leaveTime:"",
                                                attendenceTimes: attendanceTime,
                                                excuseTimes: "",
                                                lateTimes: lateTimes
                                            }
                                        ),headers:{"Content-Type": "application/json"}})
                                        .then(()=>{
                                            alert("you are late")
                                        })
                                    }//arrive late
                                    else if(currentTime>endTime&&currentTime>startTime)
                                    {
                                        alert("out of work time")
                                    }
                                }//log in
                                else if(currentDay==result.date&& result.leaveTime=="")
                                {
                                    if(currentTime>=endTime)
                                    {
                                        fetch(`http://localhost:3000/attendence/${attID}`, {
                                            method: 'PATCH',
                                            body: JSON.stringify({
                                            leaveTime:currentTime
                                            }), 
                                            headers: {'Content-type': 'application/json; charset=UTF-8', }
                                            }).then(()=>{
                                                alert("Good bye")
                                            })
                                    }//left on time

                                    else if(currentTime<endTime)
                                    {
                                        ++excuseTime
                                        let patchedData = {leaveTime:currentTime,excuseTimes:excuseTime}
                                        fetch(`http://localhost:3000/attendence/${attID}`, {
                                            method: 'PATCH',
                                            headers: {'Content-type': 'application/json'},
                                            body: JSON.stringify( patchedData),
                                        }).then(()=>{
                                            alert(" you left early! Good bye")
                                        })
                                    }//left early
                                }//log out
                                else if(currentDay==result.date&& result.leaveTime!=0)
                                {
                                    alert("you logged out before!")
                                }
                            
                        }//in attendence old employee
                        else
                        {
                            fetch(`http://localhost:3000/persons?userName=${valueEntered}`)
                            .then((data)=>data.json())
                            .then((data)=>{
                                console.log("new attendence")
                                {
                                    if(currentTime>=startTime&& currentTime<=lateTime)
                                    {
                                        console.log("new attendence2")

                                        attendanceTime++
                                        fetch("http://localhost:3000/attendence",{method:"POST",body:JSON.stringify(
                                            {
                                                
                                                id:"",
                                                empID:empId,
                                                userName:valueEntered,
                                                date:currentDay,
                                                attendanceTime:currentTime,
                                                leaveTime:"",
                                                attendenceTimes:attendanceTime,
                                                excuseTimes: 0,
                                                lateTimes: 0
                                            }
                                        ),headers:{"Content-Type": "application/json"}})
                                        .then(()=>{
                                            alert("have a nice day")
                                        })
                                    }//arrive on time
                                    else if(currentTime>=lateTime&& currentTime<=endTime)
                                    {
                                        console.log("new attendence3")
                                        ++lateTimes
                                        ++attendanceTime
                                        fetch("http://localhost:3000/attendence",{method:"POST",body:JSON.stringify(
                                            {
                                                id:"",
                                                empID:empId,
                                                userName:valueEntered,
                                                date:currentDay,
                                                attendanceTime:currentTime,
                                                leaveTime:"",
                                                attendenceTimes: attendanceTime,
                                                excuseTimes: "",
                                                lateTimes: lateTimes
                                            }
                                        ),headers:{"Content-Type": "application/json"}})
                                        .then(()=>{
                                            alert("you are late")
                                        })
                                    }//arrive late
                                    else if(currentTime>endTime&&currentTime>startTime)
                                    {
                                        console.log("new attendence4")
                                        alert("out of work time")
                                    }
                                }//log in for first time
                            })

                        }//not in attendence new employee
                    })
                }
                else
                {
                    alert("this employee does not exsists")
                }
            })
    })


    $("#showtable").one("click",function(){
        fetch("http://localhost:3000/attendence")
        .then((data)=>data.json())
        .then((data)=>{
           
            if(data.length>0)
            {
                let createdTable=document.getElementsByTagName("tbody")[0];
                data.forEach(function(element){
                    if(currentDay==element.date)
                    {
                        console.log("true")
                        createdTr=document.createElement("tr");
                        createdTd1=document.createElement("td");
                        createdTd1.innerText=element.id;
                        createdTd2=document.createElement("td");
                        createdTd2.innerText=element.userName;
                        createdTd3=document.createElement("td");
                        createdTd3.innerText=element.date;
                        createdTd4=document.createElement("td");
                        createdTd4.innerText=element.attendanceTime;
                        createdTd5=document.createElement("td");
                        createdTd5.innerText=element.leaveTime;

                        createdTr.appendChild(createdTd1);
                        createdTr.appendChild(createdTd2);
                        createdTr.appendChild(createdTd3);
                        createdTr.appendChild(createdTd4);
                        createdTr.appendChild(createdTd5);
                        createdTable.appendChild(createdTr)
                    } 
                   
                })
            }
            else
            {
                let newElement = document.createElement('div');
                newElement.id = 'myElement';
                document.body.appendChild(newElement);
                mainDiv=document.getElementById("data")
                mainDiv.innerText="No attendence for today to show "
            }
           
        })
        
    })

})


