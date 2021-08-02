import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function FetchAPI(){
    const [inputs, setInputs] = useState({});

    const apiPost =  () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "q6y3fbrgqirzumf9o9w8vfbibmg8z5de");
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
      var urlencoded = new URLSearchParams();
      urlencoded.append("documentType", "CC");
      urlencoded.append("documentNumber", inputs.documentNumber);
    
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch("https://api.misdatos.com.co/api/co/consultarNombres", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      };

      const handleChange = (event) => {
        event.persist();
        setInputs((inputs) => ({
          ...inputs,   
          [event.target.name]: event.target.value,
        }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        apiPost();
        console.log(inputs);
      };
      const [isOpen, setIsOpen] = React.useState(false);   
      const showModal = () => {
        setIsOpen(true);
      };

      const hideModal = () => {
        setIsOpen(false);
      };
    
      return (
        <div>

          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          <div>
            <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  name="firstName"
                  placeholder="Nombre"
                  onChange={handleChange}
              />
              <input
                  type="text"
                  name="lastName"
                  placeholder="Apellido"
                  onChange={handleChange}
              />
              <input
                type="number"
                name="documentNumber"
                placeholder="Número de Documento"
                onChange={handleChange}
              />
              <button className="btn btn-success" value="Consultar" onChange={handleChange} onClick={showModal}>
                <FontAwesomeIcon icon={faSearch}/> Consultar
              </button>
              <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header>
                  <Modal.Title>Bienvenido</Modal.Title>
                </Modal.Header>
                <Modal.Body>{inputs.firstName} </Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-outline-danger" onClick={hideModal}>Cancel</button>
                </Modal.Footer>
              </Modal>
            </form>
          </div>
        </div>
      );
}

export default FetchAPI;

