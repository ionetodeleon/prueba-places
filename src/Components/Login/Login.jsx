import React, { useState } from 'react';
import {
    MDBContainer,
    MDBInput,
    MDBBtn,
}
    from 'mdb-react-ui-kit';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

function Login() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function onLogin() {
        setIsLoading(true);
        fetch("https://history-hunters-evening-api.onrender.com/users/login",
            {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: myHeaders
            })
            .then((response) => response.json())
            .then((result) => {
                if(result.status === 200){
                    const data = result.data;
                    sessionStorage.setItem('id',data.user.id);
                    window.location.assign('/');
                }else{
                    alert('Usuario no encontrado');
                }
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error)
            });
    }

    return (
        <>
        {isLoading && <LoadingSpinner />}
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

            <MDBInput wrapperClass='mb-4' onChange={(event) => setEmail(event.target.value)} label='Email address' id='form1' type='email' />
            <MDBInput wrapperClass='mb-4' onChange={(event) => setPassword(event.target.value)} label='Password' id='form2' type='password' />

            <MDBBtn className="mb-4" onClick={onLogin}>Ingresá</MDBBtn>

            <div className="text-center">
                <p>¿No tenés cuenta? <a href="#!">Registrate</a></p>
            </div>

        </MDBContainer>
        </>
    );
}

export default Login;