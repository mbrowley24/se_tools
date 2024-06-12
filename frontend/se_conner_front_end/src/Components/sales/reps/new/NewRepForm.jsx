// import React, {useState} from "react";
// import RoleSelection from "./RoleSelection";
// import useSalesRep from "../../../../hooks/useSalesRep";
// import EmailField from "./EmailField";

// function NewRepForm({inputChange, submit, data}){
//     const {validSalesRep, nameValidation, emailValidation, phoneNumberValidation, quotaValidation} = useSalesRep();
//     const [valid, setValid] = useState({
//         email: false,
//         role: false
//     });

//     return(
//         <form onSubmit={submit}>
//             <div>
//                 <label>First Name</label>
//                 <input type="text"
//                         value={data.first_name}
//                         name="first_name"
//                         onChange={(e) => inputChange(e)}
//                 />
//                 <div className="error">
//                     <p>{nameValidation(data.first_name) ? "" : "Required"}</p>
//                 </div>
//             </div>
//             <div>
//                 <label>Last Name</label>
//                 <input type="text"
//                         value={data.last_name}
//                         name="last_name"
//                         onChange={(e) => inputChange(e)}
//                         />
//                 <div className="error">
//                     <p>{nameValidation(data.last_name) ? "" : "Required"}</p>
//                 </div>
//             </div>
//             <div>
//                 <EmailField email={data.email}
//                     label={true}
//                     inputChange={inputChange} 
//                     valid={valid}
//                     setValid={setValid}/>
//                 <div className="error">
//                     <p>{emailValidation(data.email) ? "" : "Required"}</p>
//                 </div>
//             </div>
//             <div>
//                 <label>Phone</label>
//                 <input type="tel"
//                         value={data.phone} 
//                         name="phone"
//                         pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
//                         onChange={(e) => inputChange(e)}
//                 />
//                 <div className="error">
//                     <p>{phoneNumberValidation(data.phone)? "" : "Required xxx-xxx-xxxx"}</p>
//                 </div>
//             </div>
//             <div>
//                 <RoleSelection
//                     data={data.role}
//                     label={true}
//                     validIsRole={setValid}
//                     inputChange={inputChange}
//                 />
//                 <div className="error">
//                     <p>{valid.role ? "" : "Required"}</p>
//                 </div>
//             </div>
//             <div>
//                 <label>Quota</label>
//                 <input type="text"
//                         value={data.quota} 
//                         name="quota"
//                         onChange={(e) => inputChange(e)}
//                         />
//                 <div className="error">
//                     <p>{quotaValidation(data.quota) ? "" : "Required"}</p>
//                 </div>
//             </div>
//             <div className="submit">
//                 <button 
//                     type="submit"
//                     disabled={!validSalesRep(data)}
//                     >Submit</button>
//             </div>
//         </form>
//     )
// }
// export default NewRepForm;