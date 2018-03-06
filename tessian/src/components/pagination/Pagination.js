/* This component divides the queries into 5 sets
   and creates a pagination for a more one page navigation
   @properties: elements = an array of elements to calculate
                           the pagination.
   @Returns: When a link is click returns the index of the items
             to be rendered.
*/
import React, {Component} from 'react';
import './Pagination.css';

class Pagination extends Component {
  constructor(props){
    super(props)
    this.per_page = 5;
    this.pages = [];
    this.renderPages = this.renderPages.bind(this);
  }

  render(){
    this.renderPages();
    return (
      <div className="Pagination col-sm-12">
        <div className="row justify-content-center">
          <nav>
            <ul className="pagination">
              {this.pages}
            </ul>
          </nav>
        </div>
      </div>
    );
  }

  renderPages(){
    // Calculates the amount of pages per elements.
    this.pages=[];
    let pagesNumber = Math.ceil(this.props.elements.length / this.per_page);
    for(let i=1; i<= pagesNumber; i++){
      this.pages.push(<li key={i} className="page-item">
                        <a className="page-link" onClick={this.props.handlePagination} href="#">{i}</a></li>);
    }
  }
}

export default Pagination;