import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {localData, serverData} from '../services/DataService';
import Container from '../components/Container';
import Button from '../components/Button';
import {downstreamSyncWithServer} from '../util/Sync';
import MenuItem from '../components/MenuItem';


class newWelcomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  goToSignin = () => {
    this.props.navigator.push({
      screen: 'Ihc.SigninScreen',
      title: 'Signin'
    });
  }

  goToSelectPatient = () => {
    this.props.navigator.push({
      screen: 'Ihc.PatientSelectScreen',
      title: 'Select patient'
    });
  }

  goToMedicationInventory = () => {
    this.props.navigator.push({
      screen: 'Ihc.MedicationInventoryScreen',
      title: 'Medication Inventory'
    });
  }

  upload = () => {
    this.props.setLoading(true);
    this.props.isUploading(true);
    this.props.clearMessages();

    const patients = localData.getPatientsToUpload();
    serverData.updatePatients(patients)
      .then(() => {
        // View README: Handle syncing the tablet, point 3 for explanation
        if(this.props.loading) {
          localData.markPatientsUploaded();
          this.props.setLoading(false);
          this.props.setSuccessMessage('Uploaded successfully');
        }
      })
      .catch(err => {
        if(this.props.loading) {
          this.props.setLoading(false);
          this.props.setErrorMessage(err.message);
        }
      });
  }

  download = () => {
    this.props.setLoading(true);
    this.props.isUploading(false);
    this.props.clearMessages();

    downstreamSyncWithServer()
      .then((failedPatientKeys) => {
        // View README: Handle syncing the tablet, point 3 for explanation
        if(this.props.loading) {
          if(failedPatientKeys.length > 0) {
            throw new Error(`${failedPatientKeys.length} patients failed to download. Try again`);
          }

          this.props.setLoading(false);
          this.props.setSuccessMessage('Downloaded successfully');
        }
      })
      .catch(err => {
        if(this.props.loading) {
          this.props.setLoading(false);
          this.props.setErrorMessage(err.message);
        }
      });

  }

  render() {
    return (
      <Container>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={this.goToSignin} style={styles.TouchableOpacityStyle}>
            <MenuItem itemImage={require('../images/WelcomeScreen/CheckInPatient.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goToSelectPatient} style={styles.TouchableOpacityStyle}>
            <MenuItem itemImage={require('../images/WelcomeScreen/PatientList.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goToSignin} style={styles.TouchableOpacityStyle}>
            <MenuItem itemImage={require('../images/WelcomeScreen/Labs.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goToMedicationInventory} style={styles.TouchableOpacityStyle}>
            <MenuItem itemImage={require('../images/WelcomeScreen/Pharmacy.png')}/>
          </TouchableOpacity>

        </View>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  menuContainer: {
    height: 600,
    width: 1000,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: '15%',
    marginTop: 50,
  },
  TouchableOpacityStyle: {
    height: '50%',
    width: '50%',
  },
});

import { setLoading, clearMessages } from '../reduxActions/containerActions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  setLoading: (val) => dispatch(setLoading(val)),
  clearMessages: () => dispatch(clearMessages())
});

export default connect(null, mapDispatchToProps)(newWelcomeScreen);
