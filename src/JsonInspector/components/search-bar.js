import React from 'react';

export default class extends React.Component {
    state = {
        value: ''
    }

    onChange = e => {
        this.setState({
            value: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.onSubmit(this.state.value, '');
    }

    render() {
        
        return (
            <div>
                <form onSubmit={this.onSubmit} className="json__search__form">
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Enter search text"
                        onChange={e => this.onChange(e)}
                    />
                    <button
                        type="submit"
                        className="btn btn-info"
                        value="Search"
                    >
                        Search
                    </button>
                </form>
            </div>
        )
    }
}

