import React from 'react';

export default ({search, item })=> {
        return (
            <li onClick={() => search(item.value, item.label)}>
                <span className="pattern__label" style={{ background: item.label }}>{item.value}</span>
            </li>

        );
}
