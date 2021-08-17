import React, { useEffect, useState } from 'react'
import './App.css'
import { Container, FormControl, Image } from 'react-bootstrap'
import  QRCode from 'qrcode'

function App() {
  const [input, setInput] = useState({
    ssid:"",
    password:"",
    encryption:""
  });
  const [qrUrl,setQrUrl] = useState("");
  useEffect(() => {
    if(input.ssid.trim().length == 0 || input.password.trim().length == 0 || input.encryption.trim().length == 0 || input.encryption.trim() == "NA"){
      console.log("ikkadundi");
      setQrUrl("");
    }
    else{
      console.log(input.ssid,input.encryption,input.password);
      QRCode.toDataURL(`WIFI:S:${input.ssid};T:${input.encryption};P:${input.password};;`,(err,url)=>{
        setQrUrl(url);
      });
    }
  }, [input]);
  const handleInputValue = (event)=>{
    setInput({...input ,[event.target.name]:event.target.value});
  }

  return (
    <Container className="my-5">
      <FormControl name="ssid" onChange={handleInputValue} value={input.ssid} className="my-3" placeholder="Enter SSID"></FormControl>
      <FormControl name="password" onChange={handleInputValue} value={input.password} className="my-3" placeholder="Enter Password"></FormControl>
      <select name="encryption" onChange={handleInputValue}>
        <option value="NA">Select Encryption</option>
        <option value="WPA">WPA</option>
        <option value="WPS">WPS</option>
      </select>
        <br/><br/>
      <Image src={qrUrl}></Image>
    </Container>
  )
}
//<!--<FormControl name="encryption" onChange={handleInputValue} value={input.encryption} className="my-3" placeholder="Select Encryption"></FormControl>-->

export default App
