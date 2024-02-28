import React from 'react';

interface DecoratorComponentProps {
    children: React.ReactNode;
};

function DecoratorComponent({children}) : React.ReactElement {

    const {children} = props;
    
    return (  
        <div>
            <h1>Decorator Component</h1>
            {children}
        </div>
    );
}

export default DecoratorComponent;{}