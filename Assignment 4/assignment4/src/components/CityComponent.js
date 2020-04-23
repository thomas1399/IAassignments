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
            <div style={this.props.styling} className="col-sm-12 col-md-6 col-lg-4 text-center mt-3 border-bottom pb-3">
                <h3>{this.state.country + "     " + this.state.city}</h3>
                <img className="img-responsive img-thumbnail text-center" src={this.state.image} alt="something"></img>
                {this.state.editing
                    ?   <div>
                            <form>
                                <div className="form-group">
                                    <input 
                                    className="form-control"
                                    name="country" 
                                    value={this.state.country} 
                                    onChange={this.handleEdit} 
                                    placeholder="Country" 
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <input 
                                    name="city" 
                                    className="form-control"
                                    value={this.state.city}
                                    onChange={this.handleEdit} 
                                    placeholder="City" 
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <input 
                                        name="image" 
                                        className="form-control"
                                        value={this.state.image}
                                        onChange={this.handleEdit} 
                                        placeholder="Image" 
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <textarea 
                                        className="form-control"
                                        name="description" 
                                        value={this.state.description}
                                        onChange={this.handleEdit} 
                                        placeholder="Description" 
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <input 
                                        className="form-control"
                                        name="rating" 
                                        value={this.state.rating}
                                        onChange={this.handleEdit} 
                                        placeholder="Rating"
                                    />
                                </div>
                            
                                <button className="btn btn-primary" onClick= {this.showHideEdit}>Save</button>
                            </form>
                        </div>
                    :   <div>
                            <p className="lead text-center">{this.state.description}</p>
                            <p className="font-weight-bold">Rating: {this.state.rating}</p> 
                            <button className="btn btn-primary m-1" onClick={this.showHideEdit}>Edit</button>
                            <button className="btn btn-secondary m-1" onClick={() => this.props.onDelete(this.props.item.id)}>Delete</button>
                        </div>
                }
            </div>
        )
    }
}

export default CityComponent