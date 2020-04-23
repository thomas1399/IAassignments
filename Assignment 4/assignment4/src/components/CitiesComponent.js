import React from "react"
import data from "../data/citiesVeryLong"
import AddCityComponent from "./AddCityComponent"
import CityTable from "./CityTable"
import SearchBar from "./SearchBar"

class CitiesComponent extends React.Component{
    constructor(){
        super()
        this.state = {
            cities: data,
            showAdd: false,
            filterText:""
        }
        this.addCityCallback = this.addCityCallback.bind(this)
        this.handleAddClick = this.handleAddClick.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleSort = this.handleSort.bind(this)
    }
    handleFilterTextChange(filterText) {
        this.setState({
          filterText: filterText
        });
      }
    handleAddClick(event){
        event.preventDefault()
        this.setState(prevState => {
            return({ showAdd: !prevState.showAdd})
        })
    }
    handleSort(){
        this.setState(prevState => {
            const sorted = prevState.cities.sort((a,b) => (a.country > b.country) ? 1 : -1)
            return({
                cities: sorted
            })
        })
    }
    handleDelete(itemId){
        //alert(itemId)
        const newCities = this.state.cities.filter(item => item.id !== itemId)
        this.setState({cities: newCities})
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
        // const cityList = this.state.cities.map(item => <CityComponent key={item.id} item={item} onDelete={this.handleDelete}/>)
        return(
        <div className="container-fluid">
            <div className="navbar row">
                {this.state.showAdd 
                ?   <div>
                        <button className="btn btn-secondary mb-3" onClick={this.handleAddClick}>Cancel</button>
                        <AddCityComponent currId = {this.state.cities.length} addCityCallback={this.addCityCallback}/>
                    </div>
                : 
                    <div className="col-sm-4 col-md-4 text-center pb-1">
                        <button className="btn btn-primary" onClick={this.handleAddClick}>Add new entry</button>
                    </div>
                }
                {/* {cityList} */}
                <div className="col-sm-4 col-md-4 text-center pb-1">
                    <button className="btn btn-primary " onClick={this.handleSort}>Sort list</button>
                </div>
                <SearchBar filterText = {this.state.filterText} onFilterTextChange = {this.handleFilterTextChange}/>
            </div>
            <div className="container">
                <div className="row">
                    <CityTable items={this.state.cities} onDelete ={this.handleDelete} filterText = {this.state.filterText}/>
                </div>
            </div>
            
        </div>
        )
    }
}

export default CitiesComponent