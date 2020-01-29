import React from 'react';
import Link from 'next/link';
import { NavHeader } from '../ui/StyledComponents';

const Navigation = () => {
    return ( 
        <NavHeader>
            <Link href="/"><a>Inicio</a></Link>
            <Link href="/popular"><a>Populares</a></Link>
            <Link href="/new-product"><a>Nuevo Producto</a></Link>
        </NavHeader>
     );
}
 
export default Navigation;