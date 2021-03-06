import React from "react"

class AddCityComponent extends React.Component{
    constructor(){
        super()
        this.state = {
            id:"",
            country: "",
            city: "",
            image: "",
            description: "",
            rating: "",
            showAdd: false

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.standardText = this.standardText.bind(this)
    }


    handleChange(event){
        const{name, value} = event.target
        this.setState({
            [name] : value
        })
    }
    standardText(text){
        text = text.toLowerCase()
        text = text[0].toUpperCase() + text.slice(1)
        return text 
    }
    handleSubmit(event){
        event.preventDefault()
        const newObject = this.state
        //alert(newObject.city)
        newObject.country = this.standardText(newObject.country)
        newObject.city = this.standardText(newObject.city)

        newObject.id = this.props.currId + 1
        this.props.addCityCallback(newObject)
    }
    render(){
        return(
        <div>
            <form>
                <div className="form-group">
                    <input 
                    className="form-control"
                    name="country" 
                    value={this.state.country} 
                    onChange={this.handleChange} 
                    placeholder="Country" 
                    />
                </div>
                
                <div className="form-group">
                    <input 
                    name="city" 
                    className="form-control"
                    value={this.state.city}
                    onChange={this.handleChange} 
                    placeholder="City" 
                    />
                </div>
                
                <div className="form-group">
                    <input 
                        name="image" 
                        className="form-control"
                        value={this.state.image}
                        onChange={this.handleChange} 
                        placeholder="Image" 
                    />
                </div>
                
                <div className="form-group">
                    <textarea 
                        className="form-control"
                        name="description" 
                        value={this.state.description}
                        onChange={this.handleChange} 
                        placeholder="Description" 
                    />
                </div>
                
                <div className="form-group">
                    <input 
                        className="form-control"
                        name="rating" 
                        value={this.state.rating}
                        onChange={this.handleChange} 
                        placeholder="Rating"
                    />
                </div>
                
                <button className="btn btn-primary" onClick= {this.handleSubmit}>Submit</button>
            </form>
        </div>)
    }
}

export default AddCityComponent