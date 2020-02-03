import styled from '@emotion/styled';

export const Logo = styled.p`
    color: var(--naranja);
    font-size: 3rem;
    font-family: 'Roboto Slab', serif;
    line-height: 0;
    font-weight: 700;
    margin-bottom: 0;
    
    &:hover {
        cursor: pointer;
    }
`;
export const FormHeader = styled.form`
    position: relative;
`;
export const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 300px;
`;
export const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: white;
    border: none;
    text-indent: -9999px;

    &:hover {
        cursor: pointer;
    }
`;
export const Input = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;

    label {
        flex: 0 0 150px;
        font-size: 1.8rem;
    }
    input, textarea {
        flex: 1;
        padding: 1rem;
    }
    textarea {
        height: 200px;
    }
`;
export const InputSubmitForm = styled.input`
    background-color: var(--naranja);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: #FFF;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;

    &:hover {
        cursor: pointer;
    }
`;
export const Form = styled.form`
    input:focus:not([readonly]) {
        border-bottom: 1px solid #ff8a65  !important;
        box-shadow: 0 1px 0 0 #ff8a65  !important;
    }
    i.active, label.active {
        color: #ff8a65  !important;
    }
    textarea:focus:not([readonly]) {
        border-bottom: 1px solid #ff8a65  !important;
        box-shadow: 0 1px 0 0 #ff8a65  !important;
    }
    .logo-icon {
    color: #ff8a65 !important;
    }
    input.input-file {
        
    }
`;