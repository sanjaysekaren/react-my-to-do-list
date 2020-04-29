import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import "./expiredList.css";

class ExpiredItem extends React.Component {
  render() {
    let listData = this.props.componentState.dashboardReducers.expiredData;
    return (
      <div>
        {listData &&
          listData.map((list) => {
            return (
              <div key={list.listId} className="panelStyle">
                <Grid container>
                  <Grid className="expiredContent" item xs sm md lg>
                    {list[0].listName}
                  </Grid>
                  <Grid className="expiredContent" item xs={3} sm={3} md={3} lg={3} >
                    {list[0].createdDate}
                  </Grid>
                  <Grid className="expiredContent" item xs={3} sm={3} md={3} lg={3} >
                    {list[0].createdTime}
                  </Grid>
                </Grid>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    componentState: state,
  };
};

export default connect(mapStateToProps)(ExpiredItem);
