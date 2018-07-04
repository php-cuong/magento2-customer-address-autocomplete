/**
 * GiaPhuGroup Co., Ltd.
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the GiaPhuGroup.com license that is
 * available through the world-wide-web at this URL:
 * https://www.giaphugroup.com/LICENSE.txt
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category    PHPCuong
 * @package     PHPCuong_CustomerAddressAutocomplete
 * @copyright   Copyright (c) 2018-2019 GiaPhuGroup Co., Ltd. All rights reserved. (http://www.giaphugroup.com/)
 * @license     https://www.giaphugroup.com/LICENSE.txt
 */
define([
  'jquery',
  'googleMapPlaceLibrary'
], function ($) {
  "use strict";
  $.widget('phpcuong.checkoutAddressAutofill', {
    options: {
      loopShipping: 0,
      loopBilling: 0,
      componentForm: {
        street_number: 'street_1',
        route: 'route',
        locality: 'city',
        administrative_area_level_2: 'city',
        administrative_area_level_1: 'region',
        country: 'country',
        postal_code: 'zip'
      },
      shippingAutocomplete: null,
      billingAutocomplete: null,
      billingStreetFound: false
    },

    /**
     *
     * @private
     */
    _create: function () {
      var self = this;
      this._initShippingAutocomplete();

      $(document).on('change', 'select[name="billing_address_id"]', function() {
        if ($(this).find('option:last').prop('selected')) {
          self._initBillingAutocomplete();
        }
      });

      $(document).on('click', 'input[name="billing-address-same-as-shipping"], .action-edit-address', function() {
        self._initBillingAutocomplete();
      });
    },

    /**
     * Fill in shipping address
     *
     * @private
     */
    _fillInShippingAddress() {
      // Get the place details from the autocomplete object.
      var place = this.options.shippingAutocomplete.getPlace();
      // Get each component of the address from the place details
      // and fill the corresponding field on the form.
      for (var i = place.address_components.length-1; i >= 0; i--) {
        var addressType = place.address_components[i].types[0];
        var long_name = place.address_components[i].long_name;
        var short_name = place.address_components[i].short_name;
        if (this.options.componentForm[addressType] && long_name) {
          if (this.options.componentForm[addressType] == 'country') {
            $('#shipping-new-address-form select[name="country_id"]').val(short_name).trigger('change');
          } else if (this.options.componentForm[addressType] == 'region') {
            $('#shipping-new-address-form input[name="region"]').val(long_name).trigger('keyup');
            if ($('#shipping-new-address-form select[name="region_id"] option:contains('+long_name+')')) {
              $('#shipping-new-address-form select[name="region_id"] option:contains('+long_name+')').prop('selected', true).trigger('change');
            }
          } else if (this.options.componentForm[addressType] == 'route') {
            $('#shipping-new-address-form input[name="street[0]"]').val(long_name).trigger('keyup').trigger('keyup');
          } else if (this.options.componentForm[addressType] == 'street_1') {
            $('#shipping-new-address-form input[name="street[0]"]').val(long_name + ' '+ $('#shipping-new-address-form input[name="street[0]"]').val()).trigger('keyup');
          } else if (this.options.componentForm[addressType] == 'zip') {
            $('#shipping-new-address-form input[name="postcode"]').val(long_name).trigger('keyup');
          } else {
            $('#shipping-new-address-form input[name="'+this.options.componentForm[addressType]+'"]').val(long_name).trigger('keyup');
          }
        }
      }
    },

    /**
     * Fill in billing address
     *
     * @private
     */
    _fillInBillingAddress() {
      // Get the place details from the autocomplete object.
      var place = this.options.billingAutocomplete.getPlace();
      // Get each component of the address from the place details
      // and fill the corresponding field on the form.
      for (var i = place.address_components.length-1; i >= 0; i--) {
        var addressType = place.address_components[i].types[0];
        var long_name = place.address_components[i].long_name;
        var short_name = place.address_components[i].short_name;
        if (this.options.componentForm[addressType] && long_name) {
          if (this.options.componentForm[addressType] == 'country') {
            $('#billing-new-address-form select[name="country_id"]').val(short_name).trigger('change');
          } else if (this.options.componentForm[addressType] == 'region') {
            $('#billing-new-address-form input[name="region"]').val(long_name).trigger('keyup');
            if ($('#billing-new-address-form select[name="region_id"] option:contains('+long_name+')')) {
              $('#billing-new-address-form select[name="region_id"] option:contains('+long_name+')').prop('selected', true).trigger('change');
            }
          } else if (this.options.componentForm[addressType] == 'route') {
            $('#billing-new-address-form input[name="street[0]"]').val(long_name).trigger('keyup').trigger('keyup');
          } else if (this.options.componentForm[addressType] == 'street_1') {
            $('#billing-new-address-form input[name="street[0]"]').val(long_name + ' '+ $('#billing-new-address-form input[name="street[0]"]').val()).trigger('keyup');
          } else if (this.options.componentForm[addressType] == 'zip') {
            $('#billing-new-address-form input[name="postcode"]').val(long_name).trigger('keyup');
          } else {
            $('#billing-new-address-form input[name="'+this.options.componentForm[addressType]+'"]').val(long_name).trigger('keyup');
          }
        }
      }
    },

    /**
     * Get place for shipping address
     *
     * @private
     */
    _initShippingAutocomplete() {
      var self = this;
      this.options.shippingFunctions = setInterval(function() {
        var street = $('#shipping-new-address-form').find('input[name="street[0]"]')[0];
        if (street) {
          self.options.shippingAutocomplete = new google.maps.places.Autocomplete(
            street,
            {types: ['geocode']}
          );
          self.options.shippingAutocomplete.inputId = street.id;
          self.options.shippingAutocomplete.setComponentRestrictions({'country': self._getCountriesCodeArray()});
          google.maps.event.addListener(self.options.shippingAutocomplete, 'place_changed', function () {
            self._fillInShippingAddress();
          });
          clearInterval(self.options.shippingFunctions);
        }
        self.options.loopShipping = self.options.loopShipping + 1;
        if (self.options.loopShipping >= 11) {
          clearInterval(self.options.shippingFunctions);
        }
      }, 2000);
    },

    /**
     * Get place for billing address
     *
     * @private
     */
    _initBillingAutocomplete() {
      var self = this;
      if (!this.options.billingStreetFound) {
        this.options.billingFunctions = setInterval(function() {
          var street = $('#billing-new-address-form').find('input[name="street[0]"]')[0];
          if (street) {
            self.options.billingAutocomplete = new google.maps.places.Autocomplete(
              street,
              {types: ['geocode']}
            );
            self.options.billingAutocomplete.inputId = street.id;
            self.options.billingAutocomplete.setComponentRestrictions({'country': self._getCountriesCodeArray()});
            google.maps.event.addListener(self.options.billingAutocomplete, 'place_changed', function () {
              self._fillInBillingAddress();
            });
            clearInterval(self.options.billingFunctions);
            self.options.billingStreetFound = true;
          }
          self.options.loopBilling = self.options.loopBilling + 1;
          if (self.options.loopBilling >= 11) {
            clearInterval(self.options.billingFunctions);
          }
        }, 2000);
      }
    },

    /**
     * Convert countries code to array
     *
     * @private
     */
    _getCountriesCodeArray() {
      var countries = this.options.countries;
      return countries.split(',');
    }
  });
  return $.phpcuong.checkoutAddressAutofill;
});

