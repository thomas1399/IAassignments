import React from "react"
import CityComponent from "./CityComponent"
import data from "../data/citiesShort"
import AddCityComponent from "./AddCityComponent"

class CitiesComponent extends React.Component{
    constructor(){
        super()
        this.state = {
            cities: data,
            showAdd: false
        }
        this.addCityCallback = this.addCityCallback.bind(this)
        this.handleAddClick = this.handleAddClick.bind(this)
    }
    handleAddClick(event){
        event.preventDefault()
        this.state.showAdd
        ? this.setState({showAdd:false})
        : this.setState({showAdd:true}) 
    }
    addCityCallback(callbackData){
        
        this.setState(prevState =>{
            const newState = prevState.cities
            newState.push(callbackData)
            //alert(newState)
            return({
                cities: newState,
                showAdd:callbackData.showAdd
            })
        })
        
    }
    componentDidMount(){
        //alert(this.state.cities[this.state.cities.length - 1].city)

    }
    render(){
        const cityList = this.state.cities.map(item => <CityComponent key={item.id} item={item} />)
        return(
        <div>
            {this.state.showAdd 
            ?   <div>
                    <button onClick={this.handleAddClick}>Cancel</button>
                    <AddCityComponent currId = {this.state.cities.length} addCityCallback={this.addCityCallback}/>
                </div>
            : 
                <button onClick={this.handleAddClick}>Add new entry</button>}
            {cityList}
        </div>
        )
    }
}

export default CitiesComponent