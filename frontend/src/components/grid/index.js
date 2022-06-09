import { DataGrid } from "devextreme-react";
import React, { Component } from 'react';

/**
 * Wrapper for DataGrid.
 */
class Grid extends Component {

    timeoutDelay = 100;
    grid = null;

    constructor(props) {
        super(props);
        this.setHeight = this.setHeight.bind(this);
        this.state = {
            height: '100%'
        };
    }

    setHeight() {
        let headers = document.getElementsByClassName('App-header');
        if (headers.length === 1) {
            let h = (window.innerHeight);
            if (headers[0].offsetHeight > 0) { h -= headers[0].offsetHeight; }
            this.setState({ height: h });
        }
    }

    render() {
        this.grid = <DataGrid
            {...this.props}
            height={this.state.height}
        ></DataGrid>;
        return (
            this.grid
        )
    }

    componentDidMount() {
        setTimeout(() => {
            // this.setHeight();
        }, this.timeoutDelay);
    }

}

export default Grid;