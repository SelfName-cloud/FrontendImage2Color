import React from "react";
import { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import * as bootstrap from 'bootstrap';  

function App ( ) { //TestIt
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isEmailPicked, setIsEmailPicked] = useState(false);

  const [imgPaint, setImgPaint] = useState(null);
  const [isImgPaint, setIsImgPaint] = useState(false);

  const [imgPencil, setImgPencil] = useState(null);
  const [isImgPencil, setIsImgPencil] = useState(false);

  const [click, setClick] = useState(null);
  const [isClick, setIsClick] = useState(false);

  const changeHandler = (event) => {
      setSelectedFile(event.target.files[0]);
      setIsFilePicked(true);
  };

  const changeHandlerEmail = (event) => {
    setSelectedEmail(event.target.value);
    setIsEmailPicked(true);
  };

  const changeHandleClick = (event) =>{
    setIsClick(true);
    document.getElementById('form-enter').reset();
  };

  const handleSubmit = event => {
    event.preventDefault();
    const formData2 = new FormData();
    formData2.append(
      "file",
      selectedFile,
      selectedFile.name
    );
    formData2.append(
      'email',
      selectedEmail
    );
  const requestOptions = {
      method: 'POST',
      headers: { },  
      //mode: 'no-cors',
      body: formData2
  };
  
  const respJson = fetch('http://127.0.0.1:8000/upload', requestOptions)
  .then(response => response.json())
  .then(img => (setImgPaint(img.image_paint.first), setImgPencil(img.image_pencil.first)))
  .then(() => (setIsImgPaint(true), setIsImgPencil(true), setIsClick(false)));//.then(resp => resp.json()).then(r => r.image_paint.first);  

};
//const carousel = new bootstrap.Carousel('carouselExampleFade');

  return (  
  <div>
    
    <br/>
      <form onSubmit={handleSubmit} id='form-enter' class="px-3 py-2">
        <div>
          
          <input name="email" type="email"  onChange={changeHandlerEmail} placeholder="Введите email@example.ru"/>
        </div>
        <br/>
        <div>
          <input name="image" type="file"  onChange={changeHandler} accept=".jpeg, .png, .jpg"/>
          {isFilePicked ? <img src={URL.createObjectURL(selectedFile)} height='64' width='64'/> : <img src='https://images-ext-2.discordapp.net/external/V0MkfdHqX_QPLxSgKofC2RNFWl_hWyBWmk9veU4isfI/https/a.allegroimg.com/original/110735/d9b7ac00438cb5173d7c09f20f4d/SONDA-LAMBDA-BOSCH-0-258-030-290-0258030290' height='64' width='64' />}
        </div>
        <Button type="submit" onClick={changeHandleClick}>Отправить</Button>
      </form>
      <br/>
      <br/>
      <div>
        <div>
          { isClick? <img src='https://i1.wp.com/apollo.iimsol.eu/students/images/loading_1.gif' width='512'/>:<img src='https://i.yapx.ru/Grj9n.gif' width='256'/>}
        </div>
        <br/>
        <div>
          {isImgPaint ? <img src={imgPaint} />: ''}
          {isImgPencil ? <img src={imgPencil} />: ''}
        </div>
      </div>
  </div>
);
// <img src={URL.createObjectURL(selectedFile)} height='64' width='64'/>
//{this.resp.image ? <img src={`data:image/png;base64,${this.state.image_paint.first}`}/>: ''}
//{this.resp.image_pencil ? <img src={`data:image/png;base64,${this.state.image_pencil.first}`}/>: ''}
}
export default App;