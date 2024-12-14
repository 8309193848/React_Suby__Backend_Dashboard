import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';

const Login = ({showWelcomeHandler}) => {
  const [email,setEmail ] =useState("");
  const [password,setPassword]=useState("");

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json();
      if (response.ok) {
        alert('Login success');
        setEmail("");
        setPassword("");
        localStorage.setItem('token', data.token)
        showWelcomeHandler()
      }
      const vendorId=data.vendorId
      console.log("checking for vendorId:",vendorId)
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      const vendorData = await vendorResponse.json();
      if(vendorResponse.ok){
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        localStorage.setItem('firmId',vendorFirmId);
        localStorage.setItem('firmName',vendorFirmName);
        window.location.reload()
     

      }
    } catch (error) {
      console.log(error)
      alert('login fail')

    }
  }

  return (
  <div className="loginSection">
        <form  className='authForm' onSubmit={loginHandler} >
    <h3>Vendor Login</h3><br/>
        <label>Email</label>
        <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your Email'/><br />
        <label>Password</label>
        <input type="Password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your Password'/><br/>
        <div className="btnSubmit">
            <button  type='submit'>Submit</button>
        </div>
    </form>
  </div>

  )
}

export default Login