import React from "react";
import moment from "moment";
import { Modal, TextField, Button, Grid, Icon } from "@material-ui/core";
import "./modal.css";

class ModalItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.itemDetails.createdDate,
      time: this.props.itemDetails.createdTime,
      itemName: this.props.itemDetails.itemName,
    };
  }
  handleDateChange = (e) => {
    if (e.target.value >= moment(new Date()).format("YYYY-MM-DD")) {
      this.setState({ date: e.target.value });
    } else {
      this.setState({ date: moment(new Date()).format("YYYY-MM-DD") });
    }
  };
  handleTimeChange = (e) => {
    this.setState({ time: e.target.value });
  };
  handleItemName = (e) => {
    this.setState({ itemName: e.target.value });
  };
  handleEditInput = () => {
    this.props.handleEditItemToList(
      this.props.itemDetails.itemId,
      this.state.itemName,
      this.state.date,
      this.state.time
    );
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
    return (
      <div>
        <Modal
          open={this.props.open}
          onClose={this.props.onClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={this.styles.modalStyle} className="paperStyle">
            <div className="editModelStyle">
              <TextField
                required
                id="ItemNameField"
                autoFocus
                label="Enter Item Name"
                variant="outlined"
                value={this.state.itemName}
                onChange={this.handleItemName}
              />
            </div>
            <Grid container>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <TextField
                  id="date1"
                  label="Set Date"
                  type="date"
                  value={this.state.date}
                  InputLabelProps={{ shrink: true }}
                  onChange={this.handleDateChange}
                />
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
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
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Button onClick={() => this.handleEditInput()}>
                  <Icon>save</Icon> Save{" "}
                </Button>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalItem;
