import React from "react";
import moment from "moment";
import "./listItem.css";

import ModalItem from "../modal/modal";
import {
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Checkbox,
  TextField,
  Grid,
  Button,
  Icon,
  Divider,
} from "@material-ui/core";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      checked: false,
      itemName: "",
      checkedItems: [],
      showItemNameError: false,
      id: -1,
      date: moment(new Date()).format("YYYY-MM-DD"),
      time: moment(new Date()).format("hh:mm"),
      showCheckBoxError: false,
    };
  }
  handleDateChange = (e) => {
    if (e.target.value >= moment(new Date()).format("YYYY-MM-DD")) {
      this.setState({ date: e.target.value });
    } else {
      this.setState({ date: moment(new Date()).format("YYYY-MM-DD") });
    }
  };
  handleCheckBoxChange = (boxid) => {
    // this.setState({ checked: !this.state.checked })
    // if (this.state.checked) {}
    if (this.state.checkedItems.indexOf(boxid) === -1) {
      this.state.checkedItems.push(boxid);
    } else {
      this.setState({
        checkedItems: this.state.checkedItems.filter((id) => id !== boxid),
      });
    }
  };
  handleTimeChange = (e) => {
    this.setState({ time: e.target.value });
  };
  handleEditOpen = (id) => {
    this.setState({ open: true, id });
  };
  handleEditClose = () => {
    this.setState({ open: false });
  };
  handleItemName = (e) => {
    this.setState({ itemName: e.target.value });
  };
  handleForEditItem = (e) => {
    this.setState({ editItemName: e.target.value });
  };

  handleAddItemToList = (name, date, time) => {
    if (name === "") {
      this.setState({ showItemNameError: true });
    } else {
      this.props.handleNewItemtoList(
        this.props.listItem.listId,
        name,
        date,
        time
      );
      this.setState({
        showItemNameError: false,
        itemName: "",
        date: moment(new Date()).format("YYYY-MM-DD"),
        time: moment(new Date()).format("hh:mm"),
      });
    }
  };
  handleEditItemToList = (id, name, date, time) => {
    this.handleEditClose();
    this.props.handleEditItemToList(
      this.props.listItem.listId,
      id,
      name,
      date,
      time
    );
  };
  deleteList = () => {
    this.props.handleDeleteList(this.props.listItem.listId);
  };
  deleteItemsinList = (itemId) => {
    let newArray = [];
    newArray.push(itemId);
    this.props.handleDeleteItemsinList(this.props.listItem.listId, newArray);
  };
  deleteBulkItemsinList = () => {
    if (this.state.checkedItems.length < 1) {
      this.setState({ showCheckBoxError: true });
    } else {
      this.props.handleDeleteItemsinList(
        this.props.listItem.listId,
        this.state.checkedItems
      );
      this.setState({ showCheckBoxError: false, checkedItems: [] });
    }
  };
  getModalStyle = () => {
    const top = 50;
    const left = 50;
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  };
  styles = {
    modalStyle: this.getModalStyle(),
  };

  render() {
    let isItemsPresent = false;
    let displayItems = this.props.listItem.items;
    if (displayItems.length > 0) {
      isItemsPresent = true;
    }
    let displayItemsData = (
      <div className="expansionPanelStyle">
        {displayItems &&
          displayItems.map((item) => {
            return (
              <div key={item.itemId} className="expansionPanelStyle">
                <Grid container>
                  <Grid>
                    <Checkbox
                      onChange={() => this.handleCheckBoxChange(item.itemId)}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </Grid>
                  <Grid item xs sm md lg>
                    {item.itemName}
                  </Grid>
                  <Grid item xs={2} sm={2} md={2} lg={2}>
                    {item.createdDate}
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1}>
                    {item.createdTime}
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Button onClick={() => this.handleEditOpen(item.itemId)}>
                      <Icon>edit</Icon>
                    </Button>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1}>
                    <Button onClick={() => this.deleteItemsinList(item.itemId)}>
                      <Icon>delete_forever</Icon>
                    </Button>
                  </Grid>
                </Grid>
              </div>
            );
          })}
      </div>
    );
    return (
      <div>
        <ModalItem
          key={this.state.id}
          itemDetails={
            displayItems.find((item) => item.itemId === this.state.id) || {}
          }
          open={this.state.open}
          onClose={this.handleEditClose}
          handleEditItemToList={this.handleEditItemToList}
        />
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary
            expandIcon={<Icon>keyboard_arrow_down</Icon>}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div style={{ flexGrow: 1 }}>
              <Grid container>
                <Grid item xs sm md lg className="listLabelStyle">
                  <div className="listNameLabelStyle">
                    {this.props.listItem.listName}
                  </div>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                  {this.props.listItem.createdDate}
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                  {this.props.listItem.createdTime}
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                  <Button onClick={() => this.deleteList()}>
                    <Icon>delete_forever</Icon>
                  </Button>
                </Grid>
              </Grid>
              <Divider />
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {isItemsPresent ? displayItemsData : "Please Add Items !!"}
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Grid container>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <div>
                  <Button
                    color="secondary"
                    onClick={() => this.deleteBulkItemsinList()}
                  >
                    <Icon style={{ fontSize: 40 }}>delete_forever</Icon>Bulk
                    Delete
                  </Button>
                  {this.state.showCheckBoxError ? (
                    <p>Select items!!</p>
                  ) : (
                    <p></p>
                  )}
                </div>
              </Grid>
              <Grid item xs sm md lg>
                <div>
                  <TextField
                    required
                    id="ItemName"
                    label="Enter Item Name"
                    variant="outlined"
                    onChange={this.handleItemName}
                    value={this.state.itemName}
                  />
                  {this.state.showItemNameError ? (
                    <p>Please enter valid item name!!</p>
                  ) : (
                    <p></p>
                  )}
                </div>
              </Grid>

              <Grid item xs={2} sm={2} md={2} lg={2}>
                <TextField
                  id="date1"
                  label="Set Date"
                  type="date"
                  value={this.state.date}
                  InputLabelProps={{ shrink: true }}
                  onChange={this.handleDateChange}
                />
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <TextField
                  id="time1"
                  label="Set Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                  onChange={this.handleTimeChange}
                  value={this.state.time}
                />
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() =>
                    this.handleAddItemToList(
                      this.state.itemName,
                      this.state.date,
                      this.state.time
                    )
                  }
                >
                  Add ListItem
                </Button>
              </Grid>
            </Grid>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

export default ListItem;
