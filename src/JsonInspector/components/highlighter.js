import React from 'react';


export default props => {

    const { string, highlight, activeColor } = props;

    const highlightStart = string.search(highlight);

    if (!highlight || highlightStart === -1) {
        return (
            <span>
                {string}
            </span>
        );
    }
    const highlightLength = highlight.source.length;
    const highlightString = string.substr(highlightStart, highlightLength);

    return (
        <span>
            {string.split(highlight).map(function (part, index) {
                return (
                    <span key={index}>
                        {index > 0
                            ? <span
                                className="json-inspector__hl"
                                style={{
                                    background: activeColor
                                }}>
                                {highlightString}
                            </span>
                            : null}
                        {part}
                    </span>
                )
            })
            }
        </span>
    )
}

