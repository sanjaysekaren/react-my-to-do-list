import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardContent,
  Grid,
  Icon,
  TextField,
  Button,
  Divider,
} from "@material-ui/core";
import moment from "moment";

import * as containers from "../index";
import * as Actions from "../../actions";
import "./dashboard.css";

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    let today = new Date();

    this.state = {
      date: moment(today).format("YYYY-MM-DD"),
      time: moment(today).format("hh:mm"),
      listName: "",
      searchText: "",
      showListNameError: false,
      width: 1200,
      height: 0,
    };
  }
  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  handleListNameChange = (e) => {
    this.setState({
      listName: e.target.value,
    });
  };
  handleNewItemtoList = (id, name, date, time) => {
    this.props.handleNewItem(id, name, date, time);
  };
  handleEditItemToList = (listId, itemId, name, date, time) => {
    this.props.handleUpdateItem(listId, itemId, name, date, time);
  };
  handleDeleteList = (listId) => {
    this.props.handleRemoveList(listId);
  };
  handleDeleteItemsinList = (listId, itemsList) => {
    this.props.handleRemoveItemsFromList(listId, itemsList);
  };
  handlesearchTextChange = (e) => {
    this.setState({ searchText: e.target.value });
  };
  handleaddNewList = (name, noOfItems) => {
    if (this.state.listName === "") {
      this.setState({ showListNameError: true });
    } else {
      this.props.addNewList(name, noOfItems);
      this.setState({ listName: "", showListNameError: false });
    }
  };
  render() {
    let isDetailsFetched = false;
    let mainStateList = this.props.componentState.dashboardReducers
      .mainListData;
    let expiredData = this.props.componentState.dashboardReducers.expiredData;
    let fiteredData = this.props.componentState.dashboardReducers.mainListData.filter(
      (list) => list.listName.includes(this.state.searchText)
    );
    let noOfItemInList = mainStateList.length;

    if (noOfItemInList > 0) {
      isDetailsFetched = true;
    }
    let addListCard = (
      <Card>
        <CardContent className="cardStyle">
          <Grid container>
            <Grid item xs={1} sm={1} md={1} lg={1}>
              <div className="listLabelStyle">Add List</div>
            </Grid>
            <Grid item xs sm md lg>
              <div>
                <TextField
                  className="addListStyle"
                  required
                  id="listName"
                  label="Enter List Name"
                  variant="outlined"
                  value={this.state.listName}
                  onChange={this.handleListNameChange}
                />
                {this.state.showListNameError ? (
                  <p>Please enter valid list name!!</p>
                ) : (
                  <p></p>
                )}
              </div>
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  this.handleaddNewList(this.state.listName, noOfItemInList)
                }
                endIcon={<Icon>add_box</Icon>}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
    let searchCard = (
      <Card>
        <CardContent className="cardStyle">
          <Grid container>
            <Grid item xs sm md lg>
              <TextField
                className="searchBoxStyle"
                required
                id="searchBox"
                label="Search for the List"
                variant="filled"
                value={this.state.searchText}
                onChange={this.handlesearchTextChange}
              />
              <Icon style={{ fontSize: 50 }}>search</Icon>
            </Grid>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <Button variant="contained" color="secondary">
              Delete
            </Button>
          </Grid>
        </CardContent>
      </Card>
    );
    let displayFectchedData = (
      <div>
        {mainStateList &&
          mainStateList.map((list) => {
            return (
              <div>
                <containers.ListItem
                  key={list.listId}
                  listItem={list}
                  handleNewItemtoList={this.handleNewItemtoList}
                  handleEditItemToList={this.handleEditItemToList}
                  handleDeleteList={this.handleDeleteList}
                  handleDeleteItemsinList={this.handleDeleteItemsinList}
                />
              </div>
            );
          })}
      </div>
    );
    let displayFilteredData = (
      <div>
        {fiteredData &&
          fiteredData.map((list) => {
            return (
              <div>
                <containers.ListItem
                  key={list.listId}
                  listItem={list}
                  handleNewItemtoList={this.handleNewItemtoList}
                  handleEditItemToList={this.handleEditItemToList}
                  handleDeleteList={this.handleDeleteList}
                  handleDeleteItemsinList={this.handleDeleteItemsinList}
                />
              </div>
            );
          })}
      </div>
    );
    let displayData = isDetailsFetched ? (
      displayFectchedData
    ) : (
      <h4 style={{ fontWeight: "bolder" }}>Add New List Items !!</h4>
    );
    let searchMatched =
      fiteredData.length > 0 ? (
        displayFilteredData
      ) : (
        <h4 style={{ fontWeight: "bolder" }}>No data found!!</h4>
      );
      let dashboardContent = (
          <div>
        {this.state.width<1000? 
            <Card className='screenHandleCard'>
                <CardContent>
                    Sorry for the inconvience!!!
                    Please view on full screen :)
                </CardContent>
            </Card>:
          <Card className="mainCardStyle">
            {addListCard}
            <div>{searchCard}</div>
            <Divider />
            <div>
              {this.state.searchText.length < 0 ? displayData : searchMatched}
              <Divider />
            </div>
            <div>
              <h3 style={{ textAlign: "left", paddingLeft: "2%" }}>
                Expired/Done ListItems
              </h3>
              {expiredData.length > 0 ? (
                <containers.ExpiredList />
              ) : (
                <h4 style={{ fontWeight: "bolder" }}>No Expired Items!!</h4>
              )}
            </div>
          </Card>}</div>
      )
    return (
      <div style={{ backgroundColor: "lightGrey" }}>
          {window.navigator.onLine?dashboardContent:<Card className='screenHandleCard'>
                <CardContent>
                    Kindly turn on your network connection !!!
                </CardContent>
            </Card>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    componentState: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewList: (listName, noOfItemInList) =>
      dispatch(Actions.AddNewList(listName, noOfItemInList)),
    handleNewItem: (id, name, date, time) =>
      dispatch(Actions.AddNewItem(id, name, date, time)),
    handleUpdateItem: (listId, itemId, name, date, time) =>
      dispatch(Actions.UpdateItem(listId, itemId, name, date, time)),
    handleRemoveList: (listId) => dispatch(Actions.deleteCompleteList(listId)),
    handleRemoveItemsFromList: (listId, itemsList) =>
      dispatch(Actions.deleteItemsInList(listId, itemsList)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
