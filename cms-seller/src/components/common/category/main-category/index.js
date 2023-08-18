import React, { Component } from "react";
import GetCategoryDetails from "../../../services/GetCategoryDetails";
import "../main-category/category.css";
export default class MainCategorylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
    };
  }

  onTextChanged = async (e) => {
    const value = e.target.value;
    this.setState({ text: value });
    let suggestions = [];
    if (value.length > 1) {
      const list = await GetCategoryDetails.getSuggestions(value);
      if (list.code === 200) {
        suggestions = list && list.data.length ? list.data : [];
        this.setState(() => ({ suggestions: suggestions }));
      }
    }
  };

  suggestionSelected(value) {
    this.setState(() => ({
      text: value.Name,
      suggestions: [],
    }));
    this.props.onSelectCategory(value);
  }
  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div className="srchList">
        <ul>
          {suggestions.map((item) => (
            <li onClick={() => this.suggestionSelected(item)}>{item.Name}</li>
          ))}
        </ul>
      </div>
    );
  }
  render() {
    const { text } = this.state;
    return (
      <div className="search_category">
        <input
          value={text}
          onChange={this.onTextChanged}
          type="text"
          placeHolder="Enter your category"
        />
        {this.renderSuggestions()}
      </div>
    );
  }
}
