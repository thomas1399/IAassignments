import React from "react"

class SearchBar extends React.Component{
    constructor() {
        super();
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
      }
      
      handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
      }
      
      render() {
        return (
          <div className="col-sm-4 col-md-4">
            <form className="form-group">
              <input
                className="form-control mt-2 w-100"
                type="text"
                placeholder="Search..."
                value={this.props.filterText}
                onChange={this.handleFilterTextChange}
              />
            </form>
          </div>
          
        );
      }
}

export default SearchBar