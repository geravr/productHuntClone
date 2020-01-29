import React, { useContext } from 'react';
import Link from 'next/link';
import Search from '../ui/Search';
import Navigation from './Navigation';
import { HeaderContainer, LeftDivContainer, HeaderStyled, Logo, DivAccount, DivAccountName, Button } from '../ui/StyledComponents';
import { FirebaseContext } from '../../firebase';



const Header = () => {
    const { user, firebase } = useContext(FirebaseContext);
    return ( 
        <HeaderStyled>
            <HeaderContainer>
                <LeftDivContainer>
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>

                    <Search />

                    <Navigation />
                </LeftDivContainer>
                <DivAccount>

                    {user ? (
                        <>
                            <DivAccountName>Hola: {user.displayName}</DivAccountName>

                            <Button
                            bgColor="true"
                            > Cerrar Sesión</Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button
                                bgColor="true"
                                >Login</Button>
                            </Link>
                            <Link href="/new-account">
                                <Button>Crear Cuenta</Button>
                            </Link>
                        </>
                    )}

                    

                    

                </DivAccount>
            </HeaderContainer>
        </HeaderStyled>
     );
}
 
export default Header;