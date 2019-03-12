const getDefaultShippingAddress = addresses =>
    addresses.find(({ default_shipping }) => default_shipping);

const getDefaultBillingAddress = addresses =>
    addresses.find(({ default_billing }) => default_billing);

export const getCurrentUser = ({ user: { currentUser } }) => currentUser;

export const getAccountAddressList = addresses => [
    {
        title: 'Default Billing Address',
        address: getDefaultBillingAddress(addresses)
    },
    {
        title: 'Default Shipping Address',
        address: getDefaultShippingAddress(addresses)
    }
];
export const getUserInformation = ({ user: { currentUser } }) => {
    const { email, firstname, lastname } = currentUser;

    return {
        email,
        firstname,
        lastname,
        fullname: `${firstname} ${lastname}`
    };
};
