import React from 'react';
import md5omatic from 'md5-o-matic';
import { uid, type, isPrimitive } from '../helpers/index';
import Highlighter from './highlighter';

const PATH_PREFIX = '.root.';

class Leaf extends React.Component {
    keypath = () => {
        return this._rootPath().substr(PATH_PREFIX.length);
    }

    _rootPath = () => {
        return this.props.prefix + this.props.label;
    }

    getLeafKey = (key, value) => {
        if (isPrimitive(value)) {

            const hash = md5omatic(String(value));

            return `${key}:${hash}`;
        } else {
            return `${key}${[type(value)]}`;
        }
    }

    contains = (string, substring) => {
        return string.indexOf(substring) !== -1;
    }

    getClassName = () => {
        let cn = 'json-inspector__leaf';

        if (this.props.root) {
            cn += ' json-inspector__leaf_root';
        }

        if (this.state.expanded) {
            cn += ' json-inspector__leaf_expanded';
        }

        if (!isPrimitive(this.props.data)) {
            cn += ' json-inspector__leaf_composite';
        }
        return cn;
    }

    toggle = () => {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    _onClick = (data, e) => {
        this.toggle();
        e.stopPropagation();
    }

    state = {
        expanded: true
    }

    static defaultProps = {
        root: false,
        prefix: ''
    }

    data = () => {
        return this.state.original || this.props.data;
    }

    componentDidUpdate(p, s) {
        if (this.props.toggled && s.expanded) {
            this.setState({
                expanded: false
            });
        }
        if (!this.props.toggled && !s.expanded) {
            this.setState({
                expanded: true
            });
        }
    }

    render() {
        const id = `id_${uid()}`;
        const p = this.props;
        const d = {
            path: this.keypath(),
            key: p.label.toString(),
            value: p.data
        };

        const onLabelClick = this._onClick.bind(this, d);

        return (
            <div className={this.getClassName()} id={`leaf-${this._rootPath()}`}>
                <input
                    className="json-inspector__radio"
                    type="radio"
                    name={p.id}
                    id={id}
                    tabIndex={-1}
                />
                <label
                    className="json-inspector__line"
                    htmlFor={id}
                    onClick={onLabelClick}
                >
                    <div className="json-inspector__flatpath">
                        {d.path}
                    </div>
                    <span className="json-inspector__key">
                        {this.format(d.key)}
                    </span>
                    {this.renderTitle()}
                </label>
                {this.renderChildren()}
            </div>

        );
    }

    renderTitle() {
        const data = this.data();
        const t = type(data);

        const items = count => {
            return count + (count === 1 ? ' ' : ' ');
        };

        switch (t) {
        case 'Array':
            return (
                <span className="json-inspector__value json-inspector__value_helper">
                    {`[] ${items(data.length)}`}
                </span>
            );
        case 'Object':
            return (
                <span className="json-inspector__value json-inspector__value_helper">
                    {`{} ${items(Object.keys(data).length)}`}
                </span>
            );
        default:
            return (
                <span className={`json-inspector__value json-inspector__value_${t.toLowerCase()}`}>
                    {this.format(String(data))}
                </span>
            );
        }
    }

    renderChildren() {
        const p = this.props;
        const childPrefix = this._rootPath();
        const data = this.data();

        if (this.state.expanded && !isPrimitive(data)) {
            return Object.keys(data).map(function (key) {
                const value = data[key];

                return (
                    <Leaf
                        data={value}
                        label={key}
                        prefix={childPrefix}
                        onClick={p.onClick}
                        id={p.id}
                        query={p.query}
                        key={this.getLeafKey(key, value)}
                        isExpanded={p.isExpanded}
                        toggled={this.props.toggled}
                        activeColor={p.activeColor}
                    />

                );
            }, this);
        }

        return null;
    }

    format = string => {
        return (
            <Highlighter
                string={string}
                highlight={this.props.query}
                activeColor={this.props.activeColor}
            />
        );
    }
}

export default Leaf;
