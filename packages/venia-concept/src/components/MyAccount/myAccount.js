import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'src/drivers';
import classify from 'src/classify';
import { loadingIndicator } from 'src/components/LoadingIndicator';
import ContactInformation from './ContactInformation';
import AddressBook from './AddressBook';
import Newsletter from './Newsletter';
import defaultClasses from './myAccount.css';
import { getAccountAddressList } from 'src/selectors/user';
import userDetailQuery from '../../queries/getUserDetail.graphql';

class MyAccount extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            root: PropTypes.string,
            title: PropTypes.string
        })
    };

    render() {
        const { classes } = this.props;

        return (
            <section className={classes.root}>
                <h1 className={classes.title}>My Account</h1>
                <Query query={userDetailQuery}>
                    {({ loading, error, data }) => {
                        if (error) {
                            return (
                                <div className={classes.fetchError}>
                                    Data Fetch Error: <pre>{error.message}</pre>
                                </div>
                            );
                        }
                        if (loading) {
                            return loadingIndicator;
                        }

                        const { customer } = data;
                        const { addresses } = customer || {};

                        return (
                            <div className={classes.content}>
                                <ContactInformation user={customer} />
                                <AddressBook
                                    addresses={
                                        addresses &&
                                        getAccountAddressList(addresses)
                                    }
                                />
                                <Newsletter user={customer} />
                            </div>
                        );
                    }}
                </Query>
            </section>
        );
    }
}

export default classify(defaultClasses)(MyAccount);
