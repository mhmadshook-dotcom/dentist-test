import { useEffect, useState } from "react";

export default function PatientsList() {
  const [patients, setPatients] = useState([]);

  useEffect(()=>{ 
      fetch("https://mydentclinic.site/api/patients", {
      method: "GET",
      headers: {
      "Authorization": "Bearer 2|Jv2P7w9F5DCKCikjsAsbtSwsRrIy9GXtHAoc3bWi5670ee63",
      "Accept": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setPatients(data.data);
    })
    .catch(err => console.log(err));
  
      return ()=>{return false}  
      } ,[])

  return (
    <div>
      <h1>Patients</h1>
      {patients.map(p => (
        <div key={p.id}>
          {p.id} - {p.name} - {p.age} - {p.sex} - {p.email} - {p.mobile} - {p.adress} - {p.other_midical_condition}
        </div>
      ))}
    </div>
  );
}
