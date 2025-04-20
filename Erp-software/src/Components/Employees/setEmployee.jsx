import React from 'react'
import { useState } from 'react'

function SetEmployee() {
    const token = localStorage.getItem("token");

    const [submit, setSubmit]= useState("")
    const [employees, setEmployee] = useState ({

        userName: "",
        name: "",
        age: "",
        email: "",
        phoneNumber: "",
        department: "",
        designation: "",
        skills:[
            {
                skillName:"",
                proficiencyLevel:""
            }
        ],
        education:[
            {
                degree:"",
                institution:"",
                yearOfpassing:"",
                grade:""
            }

        ],
        workExperience:[
            {
                company:"",
                position:"",
                years:""
            }
        ]
    })
    // Handle changes for input fields

    const handleChangeRequired = (e)=>{
setEmployee({...employees, [e.target.name]:e.target.value})
    }

    // Handle changes for array fields
    
const handleArrayChanges =(index, event, field, arrayName)=>{
 let updatedArray = [...employees[arrayName]];
 updatedArray[index][field] = event.target.value;
 setEmployee({...employees, [arrayName]: updatedArray}) 
}

// add new entry to array
const addNewEntry = (arrayName, newObject)=>{
    setEmployee({...employees, [arrayName]: [...employees[arrayName],newObject]})

}
const handleFormSubmit = async(e)=>{
    e.preventDefault()
    try {
        const response = await fetch("http://localhost:8080/employee", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(employees)
          });
          
        if(response.ok){
            setEmployee({
                userName: "",
                name: "",
                age: "",
                email: "",
                phoneNumber: "",
                department: "",
                designation: "",
                skills:[
                    {
                        skillName:"",
                        proficiencyLevel:""
                    }
                ],
                education:[
                    {
                        degree:"",
                        institution:"",
                        yearOfpassing:"",
                        grade:""
                    }
        
                ],
            workExperience:[
                    {
                        company:"",
                        position:"",
                        years:""
                    }
                ]
            })

        }
        setSubmit("Your Form is submitted successfully")

        
    } catch (error) {
        console.log("Error", error)
    }
}


    return (
        <div className='main'>
        <h1>Add New Employee</h1>

        <form  onSubmit={handleFormSubmit}>
        <input type="text" name="userName" placeholder="Username" value={employees.userName} onChange={handleChangeRequired} required />
            <input type="text" name="name" placeholder="Name" value={employees.name} onChange={handleChangeRequired} required />
            <input type="number" name="age" placeholder="Age" value={employees.age} onChange={handleChangeRequired} required />
            <input type="email" name="email" placeholder="Email" value={employees.email} onChange={handleChangeRequired} required />
            <input type="number" name="phoneNumber" placeholder="Phone Number" value={employees.phoneNumber} onChange={handleChangeRequired} required />
            <input type="text" name="department" placeholder="Department" value={employees.department} onChange={handleChangeRequired} required />
            <input type="text" name="designation" placeholder="Designation" value={employees.designation} onChange={handleChangeRequired} required />


            <h4>Skills</h4>
            {employees.skills.map((skill, index) => (
                <div key={index} >
                
                <input type="text"
                 placeholder="SkillName" 
                 value={skill.skillName} 
                 onChange={(e) => handleArrayChanges(index, e, "skillName", "skills")} required />

                <input type="text"
                 placeholder="  proficiencyLevel" 
                 value={skill.proficiencyLevel} 
                 onChange={(e) => handleArrayChanges(index, e, "proficiencyLevel", "skills")} required />
                 </div>
                
            ))}
            <button type="button" onClick={() => addNewEntry("skills", {skillName:"", proficiencyLevel:""})}>Add Skill</button>


{/* ------------------------------------------------------------------------------------------------------------------ */}
<h4> education</h4>
            {employees.education.map((edu, index) => (
                <div key={index} >
                
                <input type="text"
                 placeholder="Degree " 
                 value={edu.degree} 
                 onChange={(e) => handleArrayChanges(index, e, "degree", "education")} required />

                <input type="text"
                 placeholder="  Institution" 
                 value={edu.institution} 
                 onChange={(e) => handleArrayChanges(index, e, "institution", "education")} required />
                <input type="text"
                 placeholder="  yearOfPassing" 
                 value={edu.yearOfpassing} 
                 onChange={(e) => handleArrayChanges(index, e, "yearOfpassing", "education")} required />
                <input type="text"
                 placeholder="  grade" 
                 value={edu.grade} 
                 onChange={(e) => handleArrayChanges(index, e, "grade", "education")} required />
                 </div>
                
            ))}
            <button type="button" onClick={() => addNewEntry("education",{degree:"", institution:"",yearOfpassing:"",grade:""})}>Add Education</button>










{/* ------------------------------------------------------------------------------------------------------------------- */}
<h4>   WorkExperience</h4>
            {employees.workExperience.map(( work, index) => (
                <div key={index} >
                
                <input type="text"
                 placeholder="Company " 
                 value={work.company} 
                 onChange={(e) => handleArrayChanges(index, e, "company", "workExperience")} required />

                <input type="text"
                 placeholder="  Position" 
                 value={work.position} 
                 onChange={(e) => handleArrayChanges(index, e, "position", "workExperience")} required />
                <input type="text"
                 placeholder="  years" 
                 value={work.years} 
                 onChange={(e) => handleArrayChanges(index, e, "years", "workExperience")} required />
               
                 </div>
                
            ))}
            <button type="button" onClick={() => addNewEntry("workExperience", { company: "", position: "", years: "" })}>Add Work Experience</button>
            <button type="submit">Submit</button>
    </form>
        </div>
    )
}

export default SetEmployee
