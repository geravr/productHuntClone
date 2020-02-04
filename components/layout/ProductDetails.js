import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale'
import {  MDBRow, MDBCol, MDBMask, MDBIcon, MDBView } from "mdbreact";

const ProductDetails = ({product}) => {
  
    const { id, comments, date, description, company, name, url, imageUrl, productVotes } = product;

    return (
      <>
        <MDBCol md="12">
          <div
            style={{
              borderBottom: "1px solid #e0e0e0",
              marginBottom: "1.5rem"
            }}
          >
            <MDBRow>
              <MDBCol md="2">
                <MDBView hover rounded className="z-depth-1-half mb-4">
                  <img className="img-fluid img-thumbnail" src={imageUrl} alt="" />
                  <a href="#!">
                    <MDBMask overlay="white-slight" className="waves-light" />
                  </a>
                </MDBView>
              </MDBCol>
              <MDBCol md="9">
                <h5>{name}</h5>
                <div className="d-flex justify-content-between">
                  <MDBCol size="11" className="text-truncate pl-0 mb-3">
                    <a href="#!" className="dark-grey-text">
                      {description}
                    </a>
                  </MDBCol>
                  <MDBCol className="mt-n4">
                    <p className="text-center">
                      <MDBIcon icon="caret-up" size="lg" />
                    </p>
                    <p className="mt-n4 text-center">{productVotes}</p>
                  </MDBCol>
                </div>
                <div className="mt-n3" ri>
                  <p>
                    <MDBIcon icon="comment" />
                    {` ${comments.length}`}
                  </p>
                </div>
                <p className="dark-grey-text">
                  Publicado hace:{" "}
                  {formatDistanceToNow(new Date(date), { locale: es })}
                </p>
              </MDBCol>
            </MDBRow>
          </div>
        </MDBCol>
      </>
    );
}
 
export default ProductDetails;