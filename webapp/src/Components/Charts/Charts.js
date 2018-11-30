import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import WorkingTile from '../WorkingTile/WorkingTile';
import Plotly from '../Plotly/Plotly';
import maxesDataSelector from '../../redux/selectors/maxesDataSelector';
import searchToData from '../../redux/selectors/searchToData';
import configs from '../../configs';
import Alert from '../Alert/Alert';

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: undefined,
    };
  }

  showAlert = (alert, clb = false) => {
    this.setState({
      alert,
    });
    setTimeout(() => {
      this.setState({
        alert: false,
      });
      if (clb) clb();
    }, 1200);
  };

  handleSync = async () => {
    const token = localStorage.getItem('token');
    const {
      user: { id },
    } = this.props;
    const response = await fetch(`${configs.authUrl}sync`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Baerer ${token}`,
      },
      body: JSON.stringify({ user_id: id }),
    });
    if (response.status === 200) {
      this.showAlert({
        className: 'alert-success',
        text: 'Success: your data will be synced!',
      });
    } else {
      this.showAlert({
        className: 'alert-danger',
        text: 'Warning: something went wrong. Data will bot be synced!',
      });
    }
  };

  render() {
    const { data, title } = this.props.models[this.props.currentModel] || {
      data: [],
      title: 'None',
    };
    const { alert } = this.state;
    return (
      <Container id="workspace">
        {alert ? <Alert className={alert.className} text={alert.text} /> : ''}
        <Row>
          <Col lg="4">
            <WorkingTile>
              <h3>
                {title}
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisi in augue
                eleifend pulvinar nec a neque. Pellentesque lacus lorem, porttitor id turpis
                consectetur, aliquet condimentum turpis. Vestibulum ante ipsum primis in faucibus
                orci luctus et ultrices posuere cubilia Curae; Praesent id ornare nisl. Ut id luctus
                felis. Praesent imperdiet nisi in orci suscipit eleifend. Proin laoreet, magna in
                blandit ullamcorper, lorem dolor rutrum velit, a iaculis erat urna porttitor nisl.
              </p>
              <button
                onClick={this.handleSync}
                type="submit"
                className="btn btn-dark-green green-button mx-auto d-block"
              >
                Sync
              </button>
            </WorkingTile>
          </Col>
          <Col lg="8">
            <WorkingTile>
              <h3>
                {title}
              </h3>
              <Plotly data={data} />
            </WorkingTile>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <WorkingTile>
              <h3>
Export
              </h3>
              <button type="submit" className="btn btn-dark-green green-button mx-auto d-block">
                Export CSV
              </button>
            </WorkingTile>
          </Col>
          <Col lg="8">
            <WorkingTile>
              <Row
                style={{
                  alignItems: 'center',
                }}
              >
                <Col>
                  <h3>
Support
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisi in augue
                    eleifend pulvinar nec a neque. Pellentesque lacus lorem, porttitor id turpis
                    consectetur, aliquet condimentum turpis.
                  </p>
                </Col>

                <Col xs="auto">
                  <FontAwesome name="question-circle" className="green-icon" />
                </Col>
              </Row>
            </WorkingTile>
          </Col>
        </Row>
      </Container>
    );
  }
}

Charts.propTypes = {
  currentModel: PropTypes.string.isRequired,
  models: PropTypes.shape({
    maxes: PropTypes.shape({
      data: PropTypes.array,
      title: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = ({ models, router, user }) => ({
  ...searchToData(router),
  user,
  models: {
    maxes: {
      data: maxesDataSelector(models.maxes),
      title: 'Maxes Model',
    },
  },
});

export default connect(mapStateToProps)(Charts);
