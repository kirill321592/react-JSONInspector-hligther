import React from 'react';
import Leaf from './components/leaf';
import Search from './components/search-bar';
import PatternsList from './components/patternsList';
import './index.css';

export default class extends React.PureComponent {
    
    static defaultProps = {
        data: null,
        className: '',
        id: `json-${Date.now()}`,
        ignoreCase: false,
        isExpanded: true,
    }

    state = {
        query: this.props.query || '',
        activeColor: "",
        toggled: false
    }

    toggleRoot = () => {
        this.setState((state) => {
            return {toggled: !state.toggled};
          });
    }

    validateQuery = query => {
        return query.length >= 2;
    }

    search = (query, color) => {
        this.setState(() => {
            return {
                query,
                activeColor: color,
                toggled: false
            };
          });
    }

    render() {
        return (
            <div className="json-inspector">
                <div className="row">
                    <div className="col-xs-4 col-sm-4">
                        {this.renderToolbar()}
                        {this.renderPatterns()}
                    </div>
                    {this.renderReport()}
                </div>
            </div>
        )
    }

    renderToolbar() {
        return (
            <div className="json-inspector__toolbar">
                <h3>Filter:</h3>
                <Search
                    onSubmit={this.search}
                    query={this.state.query}
                />
            </div>
        )
    }

    renderPatterns() {
        return (
            <div className="">
                <h3>Patterns:</h3>
                <PatternsList
                    patterns={this.props.patterns}
                    search={this.search}
                />
            </div>
        )
    }

    renderReport() {
        const { data, id, isExpanded, ignoreCase } = this.props;
        const { query } = this.state;

        const isQueryValid = (
            query !== '' &&
            this.validateQuery(query)
        );

        return (
            <div className="col-xs-8 col-sm-8 json__report">
                <div className="row">
                    <div className="col-xs-4 col-sm-4"><h3>Report data:</h3></div>

                    <div className="col-xs-8 col-sm-8 text-right">
                        <button
                            className="btn btn-default"
                            type="button"
                            onClick={() => this.toggleRoot()}>
                            ⇵
                        </button>
                    </div>
                </div>
                <div className="json__wrapper">
                    <Leaf
                        data={data}
                        id={id}
                        query={(
                            isQueryValid
                                ? new RegExp(
                                    query,
                                    (ignoreCase ? 'i' : '')
                                )
                                : null
                        )}
                        label="root"
                        root={true}
                        isExpanded={isExpanded}
                        toggled={this.state.toggled}
                        activeColor={this.state.activeColor}
                    />
                </div>
            </div>
        )
    }
}
