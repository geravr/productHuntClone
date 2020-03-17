import React from 'react';
import { MDBContainer, MDBRow } from 'mdbreact';

const Spinner = () => {
    return (
        <MDBContainer>
            <MDBRow center>
                <div className="lds-ellipsis mt-5">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </MDBRow>
        </MDBContainer>
    );
}
 
export default Spinner;