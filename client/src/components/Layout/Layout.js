import React from 'react'


const layout = ({ children }) => {

    const styles = {
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#649173',  /* fallback for old browsers */
        background: '-webkit-linear-gradient(to right, #DBD5A4, #649173)',  /* Chrome 10-25, Safari 5.1-6 */
        background: 'linear-gradient(to right, #DBD5A4, #649173)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }

    return (
        <div style={styles}>
            {children}
        </div>
    )
}

export default layout