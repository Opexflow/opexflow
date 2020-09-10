import React, { Component } from "react";
import { Card, CardBody, CardTitle, Button, CardSubtitle } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { NotificationManager } from "../../components/common/react-notifications";

export class NotificationExamples extends Component {
  createNotification = (type, className) => {
    let cName = className || "";
    return () => {
      switch (type) {
        case "primary":
          NotificationManager.primary(
            "This is a notification!",
            "Primary Notification",
            3000,
            null,
            null,
            cName
          );
          break;
        case "secondary":
          NotificationManager.secondary(
            "This is a notification!",
            "Secondary Notification",
            3000,
            null,
            null,
            cName
          );
          break;
        case "info":
          NotificationManager.info("Info message", "", 3000, null, null, cName);
          break;
        case "success":
          NotificationManager.success(
            "Success message",
            "Title here",
            3000,
            null,
            null,
            cName
          );
          break;
        case "warning":
          NotificationManager.warning(
            "Warning message",
            "Close after 3000ms",
            3000,
            null,
            null,
            cName
          );
          break;
        case "error":
          NotificationManager.error(
            "Error message",
            "Click me!",
            5000,
            () => {
              alert("callback");
            },
            null,
            cName
          );
          break;
        default:
          NotificationManager.info("Info message");
          break;
      }
    };
  };
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="alert.react-notifications" />
          </CardTitle>
          <CardSubtitle>
            <IntlMessages id="alert.outline" />
          </CardSubtitle>
          <Button
            outline
            className="mb-3"
            color="primary"
            onClick={this.createNotification("primary")}
          >
            <IntlMessages id="alert.primary" />
          </Button>{" "}
          <Button
            outline
            className="mb-3"
            color="secondary"
            onClick={this.createNotification("secondary")}
          >
            <IntlMessages id="alert.secondary" />
          </Button>{" "}
          <Button
            outline
            className="mb-3"
            color="info"
            onClick={this.createNotification("info")}
          >
            <IntlMessages id="alert.info" />
          </Button>{" "}
          <Button
            outline
            className="mb-3"
            color="success"
            onClick={this.createNotification("success")}
          >
            <IntlMessages id="alert.success" />
          </Button>{" "}
          <Button
            outline
            className="mb-3"
            color="warning"
            onClick={this.createNotification("warning")}
          >
            <IntlMessages id="alert.warning" />
          </Button>{" "}
          <Button
            outline
            className="mb-3"
            color="danger"
            onClick={this.createNotification("error")}
          >
            <IntlMessages id="alert.error" />
          </Button>
          <CardSubtitle>
            <IntlMessages id="alert.filled" />
          </CardSubtitle>
          <Button
            className="mb-3"
            color="primary"
            onClick={this.createNotification("primary", "filled")}
          >
            <IntlMessages id="alert.primary" />
          </Button>{" "}
          <Button
            className="mb-3"
            color="secondary"
            onClick={this.createNotification("secondary", "filled")}
          >
            <IntlMessages id="alert.secondary" />
          </Button>{" "}
          <Button
            className="mb-3"
            color="info"
            onClick={this.createNotification("info", "filled")}
          >
            <IntlMessages id="alert.info" />
          </Button>{" "}
          <Button
            className="mb-3"
            color="success"
            onClick={this.createNotification("success", "filled")}
          >
            <IntlMessages id="alert.success" />
          </Button>{" "}
          <Button
            className="mb-3"
            color="warning"
            onClick={this.createNotification("warning", "filled")}
          >
            <IntlMessages id="alert.warning" />
          </Button>{" "}
          <Button
            className="mb-3"
            color="danger"
            onClick={this.createNotification("error", "filled")}
          >
            <IntlMessages id="alert.error" />
          </Button>
        </CardBody>
      </Card>
    );
  }
}

export default NotificationExamples;
