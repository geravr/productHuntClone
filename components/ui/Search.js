import React from 'react';
import { FormHeader, InputText, InputSubmit } from './StyledComponents';

const Search = () => {
    return ( 
        <FormHeader>
            <InputText type="text" placeholder="Buscar productos" />
            <InputSubmit type="submit">Buscar</InputSubmit>
        </FormHeader>
     );
}
 
export default Search;