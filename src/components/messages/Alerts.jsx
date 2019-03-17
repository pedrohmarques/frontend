import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
 
class Alert extends React.Component {
  Message(type){
    return props => {
        switch (type) {
            case 'info':
              NotificationManager.info(props.message);
              break;
            case 'success':
              NotificationManager.success(props.message, props.title);
              break;
            case 'warning':
              NotificationManager.warning(props.message, 'Close after 3000ms', 3000);
              break;
            case 'error':
              NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
              });
              break;
          }
    }
  }
 
  render() {
    return (
      <div>
          {this.Message(this.props.type)}
          <NotificationContainer />
      </div>
    );
  }
}
 
export default Alert;