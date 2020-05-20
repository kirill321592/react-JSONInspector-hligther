import React from 'react';
import Pattern from './patternItem';

export default props => {

    const { patterns, search } = props;

    return (
        <ul className="patternsList">
            {patterns.map((item, index) => {
                return (
                    <Pattern
                        key={index}
                        item={item}
                        search={search}
                    />
                );
            })
            }
        </ul>
    )

};
