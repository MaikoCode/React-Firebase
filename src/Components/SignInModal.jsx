import React, {useContext, useRef, useState} from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'


export default function SignInModal() {

  const {modalState, toggleModals, signIn} = useContext(UserContext)
  const [validation, setValidation] = useState("")
  const inputs = useRef([])
  const formRef = useState()
  const navigate = useNavigate()



  const addInputs = el => {
    if(el && !inputs.current.includes(el)){
        inputs.current.push(el)
    }
  }

  const handleForm = async (e) => {
    e.preventDefault()


    try{

        const cred = await signIn(inputs.current[0].value, inputs.current[1].value)
        setValidation("")
        toggleModals("close")   
        navigate("/private/private-home")

    }catch(err){

       setValidation("Wopsy, email and/or password incorrect")

    }
  }

 

  return (
    <>
    {modalState.signInModal && (

   
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
                                    <label htmlFor="signInEmail" className='form-label'>Email adress</label>
                                    <input ref={addInputs} name="email" type="email" className='form-control' id='signInEmail' required />
                                </div>

                                <div className='mb-3'>
                                    <label htmlFor="signInPwd" className='form-label'>Password</label>
                                    <input  ref={addInputs} name="pwd" type="password" className='form-control' id='signInPwd' required />
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
