import React from "react"
import CityComponent from './CityComponent'

class CityTable extends React.Component{
    constructor(){
        super()
        this.state = {
            rows: []
        }
        this.modifyText = this.modifyText.bind()
    }
    componentDidMount(){
        this.setState(() => {
            const newRows = []
            this.props.items.forEach((item) => {
                newRows.push(
                    <CityComponent styling={{display: "auto"}} key={item.id} item={item} onDelete={this.props.onDelete}/>
                )
            })
            return({
                rows: newRows
            })
        })
    }
    modifyText(text){
        const capitalized = text.charAt(0).toUpperCase() + text.slice(1)
        return capitalized
    }
    UNSAFE_componentWillReceiveProps({filterText}){ // i know it's not supposed to be used, but for the sake of this not dying horribly 
        this.setState(() => { //i had to use it(and also i didn't manage to do it another way)
            const newRows = []
            if(filterText.length === 0){
                this.props.items.forEach((item) => {
                    newRows.push(
                        <CityComponent styling={{display: "block"}} key={item.id} item={item} onDelete={this.props.onDelete}/>
                    )
                })
                return({
                    rows: newRows
                })
            }
            else{
                this.props.items.forEach((item) => {
                    if(item.country.indexOf(this.modifyText(filterText)) === -1 
                    && item.city.indexOf(this.modifyText(filterText)) === -1 )
                        newRows.push(
                            <CityComponent styling={{display: "none"}} key={item.id} item={item} onDelete={this.props.onDelete}/>
                        )
                    else
                        newRows.push(
                            <CityComponent styling={{display: "block"}} key={item.id} item={item} onDelete={this.props.onDelete}/>
                        )    
                })
                return({
                    rows: newRows
                })
            }
        })
    }
    render(){
        
        return(
            <div className="row">
                {this.state.rows}
            </div>
            
        )
    }
}

export default CityTable