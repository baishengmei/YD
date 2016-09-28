import React, { PropTypes, Component } from 'react';
import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import RefreshIndicator from 'material-ui/RefreshIndicator';

class MyTable extends Component {

  constructor() {
    super();
    this.loadingHeight = '120px';
    this.loadingStyles = {
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    };
  }

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    headerColumnsData: PropTypes.array.isRequired,
    tableData: PropTypes.array,
    onCellClick: PropTypes.func
  };

  getHeaderColumns() {
    return this.props.headerColumnsData.map((col, index) => {
      return col.tooltip ?
        (<TableHeaderColumn style={{textAlign: 'center'}} key={index} tooltip={col.tooltip}>{col.content}</TableHeaderColumn>) :
        (<TableHeaderColumn style={{textAlign: 'center'}} key={index}>{col.content}</TableHeaderColumn>);
    });
  }

  getBodyRows() {
    let { isLoading, tableData, headerColumnsData } = this.props;
    let colSpan = headerColumnsData.length;
    let h = this.loadingHeight;
    let loadingStyles = this.loadingStyles;

    if ( isLoading ) {
      return [0].map( () => (
        <TableRow key={0} striped={false}>
          <TableRowColumn key={0} colSpan={colSpan} style={{position: 'relative', height: h, textAlign: 'center'}}>
            <RefreshIndicator size={50} left={0} top={0} status="loading" style={loadingStyles} />
          </TableRowColumn>
        </TableRow>
      ));
    } else if ( !tableData ) {
      return [0].map ( () => (
        <TableRow key={0} striped={false}>
          <TableRowColumn colSpan={colSpan} style={{textAlign: 'center', fontSize: '20px'}} key={0}>数据加载失败</TableRowColumn>
        </TableRow>
      ));
    } else if ( tableData.length === 0 ) {
      return [0].map ( () => (
        <TableRow key={0} striped={false}>
          <TableRowColumn colSpan={colSpan} style={{textAlign: 'center', fontSize: '20px'}} key={0}>无数据</TableRowColumn>
        </TableRow>
      ));
    } else {
      return tableData.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {
            row.map( (col, colIndex) => <TableRowColumn style={{textAlign: 'center', cursor: col.canHover ? 'pointer' : 'auto'}} key={colIndex}>{col.content || col}</TableRowColumn> )
          }
        </TableRow>
      ));
    }
  }

  render() {
    let bodyRows = this.getBodyRows();
    let bodyHeight = 'auto';

    return (
      <div className={"Table"}>
        <Table
          height={bodyHeight}
          fixedHeader={false}
          fixedFooter={false}
          selectable={false}
          multiSelectable={false}
          onCellClick={this.props.onCellClick}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}>
            <TableRow displayBorder={true}>
              {this.getHeaderColumns()}
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            showRowHover={false}
            stripedRows={bodyRows.length > 1}>
            {bodyRows}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default MyTable;