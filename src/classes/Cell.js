import React from 'react';

export default class Cell extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hasMine: props.cell.hasMine,
            isFlaged: props.cell.isFlaged,
            isOpen : props.cell.isOpen,
            id_y : props.cell.id_y,
            id_x : props.cell.id_x,
            adjacent : props.cell.adjacent,
        };
    }

    handleClick = (event) => {
        if(event.shiftKey && !this.state.isOpen){

            this.props.onCellFlagChange(this.props.cell);

        }else if(!this.state.isFlaged && !this.state.isOpen){

            if(this.state.hasMine){

                this.props.onCellExplode(this.props.cell);

            }else{

                this.props.onCellOpen(this.props.cell)
            }
        }
    };

    setOpen = (_isOpen)=>{
        if(_isOpen === this.state.isOpen){
            return
        }
        this.setState({
            isOpen:_isOpen
        });
    };

    setFlaged = (_isFlaged)=>{
        if(_isFlaged === this.state.isFlaged){
            return
        }
        this.setState({
            isFlaged:_isFlaged
        });
    };

    renderNormal = () => {
        let isFlaged = this.state.isFlaged;
        let isOpen = this.state.isOpen;
        let hasMine = this.state.hasMine;
        let superman = this.props.superman;
        let cords = "";// " x: " + this.state.id_x + " y: " + this.state.id_y;//for debug
        if(hasMine && isOpen){
            return (
                <td className="Cell_explode">
                         {"*" + cords}
                </td>
            );
        }
        else if(isOpen){
            return (
               <td className="button_open">
                        {this.state.adjacent + "" + cords}
               </td>
            );
        }else if(isFlaged){
            return (
                <td className="Cell_flag" onClick= {this.handleClick}>
                    {cords}
                </td>
            );
        }else if(superman && hasMine) {
            return (
                <td className="button" onClick={this.handleClick}>
                        *
                </td>
            );
        } else{
            return (
                <td className="button" onClick= {this.handleClick}>
                    {cords}
                </td>
            )
        }
    };

    renderMineExplode = () => {
        return (
            <td className="button" >*</td>
        );
    };


    render() {
        if(this.state.gameOver){
            return this.renderMineExplode();
        }
        return this.renderNormal();
    }
}