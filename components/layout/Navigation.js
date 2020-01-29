import React, { useContext } from 'react';
import Link from 'next/link';
import { NavHeader } from '../ui/StyledComponents';
import { FirebaseContext } from '../../firebase';

const Navigation = () => {

    const { user } = useContext(FirebaseContext);
    
    return ( 
        <NavHeader>
            <Link href="/"><a>Inicio</a></Link>
            <Link href="/popular"><a>Populares</a></Link>
            {user && (
                <Link href="/new-product"><a>Nuevo Producto</a></Link>
            )}
        </NavHeader>
     );
}
 
export default Navigation;