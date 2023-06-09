import React, {useContext, useRef, useState} from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'


export default function SignUpModal() {

  const {modalState, toggleModals, signUp} = useContext(UserContext)
  const [validation, setValidation] = useState("")
  const inputs = useRef([])
  const formRef = useState()
  const navigate = useNavigate()

//   console.log(signUp)

//   console.log(JSON.stringify(import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY))
//   console.log(import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY)


  const addInputs = el => {
    if(el && !inputs.current.includes(el)){
        inputs.current.push(el)
    }
  }

  const handleForm = async (e) => {
    e.preventDefault()

    if((inputs.current[1].value.length || (inputs.current[1].value.length)) < 6){
        setValidation("6 characters min")
        return
    }
    else if(inputs.current[1].value !== inputs.current[2].value){
        setValidation("Password do not match")
        return
    }

    try{

        const cred = await signUp(inputs.current[0].value, inputs.current[1].value)
        formRef.current.reset()
        setValidation("")
        toggleModals("close")   
        navigate("/private/private-home")

    }catch(err){

        if(err.code === "auth/invalid-email"){
            setValidation("Email format invalid")
        }

        if(err.code === "auth/email-already-in-use"){
            setValidation("Email already use")
        }

    }
  }

 

  return (
    <>
    {modalState.signUpModal && (

   
        <div className='position-fixed top-0 vw-100 vh-100'>
            <div onClick={() => toggleModals("close")} className='w-100 h-100 bg-dark bg-opacity-75'></div>
                <div className='position-absolute top-50 start-50 translate-middle' style={{minWidth: "400px"}}>
                    <div className='modal-dialog bg-light p-4'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>Sign Up</h5>
                                <button onClick={() => toggleModals("close")} className='btn-close'></button>
                            </div>

                            <div className="modal-body">

                            <form onSubmit={handleForm} ref={formRef} className='sign-up-form'>
                                <div className='mb-3'>
                                    <label htmlFor="signUpEmail" className='form-label'>Email adress</label>
                                    <input ref={addInputs} name="email" type="email" className='form-control' id='signUpEmail' required />
                                </div>

                                <div className='mb-3'>
                                    <label htmlFor="signUpPwd" className='form-label'>Password</label>
                                    <input  ref={addInputs} name="pwd" type="password" className='form-control' id='signUpPwd' required />
                                </div>

                                <div className='mb-3'>
                                    <label htmlFor="repeatPwd" className='form-label'>Repeat Password</label>
                                    <input ref={addInputs} name="pwd" type="password" className='form-control' id='repeatPwd' required />
                                    <p className='text-danger mt-1'>{validation}</p>
                                </div>
                               

                                <button className="btn btn-primary">Submit</button>
                            </form>

                            </div>
                        </div>
                    </div>
                </div>
        </div>
        )}
    </>
  )
}
