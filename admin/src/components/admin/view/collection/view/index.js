import React, { Component } from "react";
import { GetCollection } from "../../../../services";
import {
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardMedia,
  Grid,
} from "@material-ui/core";
import ItemCreate from "./item";
import { NotificationManager } from "react-notifications";
import swal from "sweetalert";
export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  handleBack() {
    this.props.history.goBack();
  }
  async componentDidMount() {
    this.getItemList();
  }
  async getItemList() {
    const collectionId = window.location.pathname.split("/").pop();
    let list = await GetCollection.getItemList(collectionId);
    this.setState({ list: list.data });
  }
  handlDeleteById(data) {
    let list = { id: data.id, thumbnail: data.thumbnail };
    swal({
      title: "Are you sure?",
      text: "You want to delete item from the collection ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = GetCollection.deleteItem(list);
        if (value) {
          NotificationManager.success("successfully Deleted");
          // window.location.reload();
          this.setState({ isLoaded: false });
        } else {
          this.setState({ isLoaded: false });
          NotificationManager.error("error");
        }
      } else {
        this.setState({ isLoaded: false });
      }
    });
  }
  render() {
    let segment_str = window.location.pathname; // return segment1/segment2/segment3/segment4
    let segment_array = segment_str.split("/");
    let title = segment_array[segment_array.length - 2];
    const { list } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6 mt-3 ">
            <ItemCreate />
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i class="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mt-30 mb-30">
              <div className="card-title-2 bg-light">
                <h4>{title}</h4>
              </div>
              <div className="card-body-table p-2">
                <Grid container spacing={3}>
                  {list && list.length
                    ? list.map((row, index) => (
                        <Grid
                          item
                          xs={3}
                          sm={3}
                          md={3}
                          lg={3}
                          xl={3}
                          key={index}
                        >
                          <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                image={row.thumbnail}
                                alt={row.name}
                              />
                              {/* <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {row.name}
                            </Typography>
                          </CardContent> */}
                            </CardActionArea>
                            <CardActions>
                              <Button
                                size="small"
                                color="primary"
                                onClick={() => this.handlDeleteById(row)}
                              >
                                Delete
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))
                    : null}
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
