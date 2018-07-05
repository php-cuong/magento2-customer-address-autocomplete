# Customer Address Autocomplete Extension for Magento 2
In this module, I used the Maps Javascript API of the Google for autocompleting the customer address. When the customer enter the address in the street field, a list of addresses will be suggested by Google Maps Javascript API.

## How to install or upgrade this extension?
 + Under the root of your website, please run the command lines bellowing:
    - Before installing this extension, make sure that you have installed the PHPCuong_Core module, If you don't install this module yet, please install it by running the command line: **composer require php-cuong/magento2-module-core**
    - Install the PHPCuong_CustomerAddressAutocomplete module:
    - **composer require php-cuong/magento2-customer-address-autocomplete**
    - **php bin/magento setup:upgrade**
    - **php bin/magento setup:static-content:deploy**
    - **php bin/magento setup:di:compile**
    - **php bin/magento indexer:reindex**
    - **php bin/magento cache:flush**

## How to see the results?

### - On the Backend:
- Go to the Admin Panel of the Magento Store and navigate to the GiaPhuGroup → Address Autocomplete

### - On the Storefront:
- Go to the Edit Address page
- Go to the Add New Address page
- Go to the Create New Customer Account page
- Go the the checkout page.
