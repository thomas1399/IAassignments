import React from "react"

class CityComponent extends React.Component{
    constructor(){
        super()
        this.state = {
            id: "",
            country: "",
            city: "",
            image: "",
            description: "",
            rating: "",
            editing: false
        }
        this.handleEdit = this.handleEdit.bind(this)
        this.showHideEdit = this.showHideEdit.bind(this)
    }
    componentDidMount(){
        this.setState({
            id: this.props.item.id,
            country: this.props.item.country,
            city: this.props.item.city,
            image: this.props.item.image,
            description: this.props.item.description,
            rating: this.props.item.rating
        })
    }
    showHideEdit(){
        this.setState(prevState => {
            return({
                editing: !prevState.editing
            })
        })
    }
    handleEdit(event){
        const {name, value} = event.target
        this.setState({
            [name]: value,
        })
    }
    render(){
        return(
            <div style={this.props.styling}>
                <h3>{this.state.country + "     " + this.state.city}</h3>
                <img src={this.state.image} alt="something"></img>
                {this.state.editing
                    ?   <div>
                            <form>
                                <input 
                                    name="country" 
                                    value={this.state.country} 
                                    onChange={this.handleEdit} 
                                    placeholder="Country" 
                                />
                                <br />
                                
                                <input 
                                    name="city" 
                                    value={this.state.city}
                                    onChange={this.handleEdit} 
                                    placeholder="City" 
                                />
                                <br />
                                <input 
                                    name="image" 
                                    value={this.state.image}
                                    onChange={this.handleEdit} 
                                    placeholder="Image" 
                                />
                                <br />
                                <textarea 
                                    name="description" 
                                    value={this.state.description}
                                    onChange={this.handleEdit} 
                                    placeholder="Description" 
                                />
                                <br />
                                <input 
                                    name="rating" 
                                    value={this.state.rating}
                                    onChange={this.handleEdit} 
                                    placeholder="Rating"
                                />
                                <br />
                                <button onClick= {this.showHideEdit}>Save</button>
                            </form>
                        </div>
                    :   <div>
                            <p>{this.state.description}</p>
                            <p>Rating: {this.state.rating}</p> 
                            <button onClick={this.showHideEdit}>Edit</button>
                            <button onClick={() => this.props.onDelete(this.props.item.id)}>Delete</button>
                        </div>
                }
            </div>
        )
    }
}

export default CityComponent