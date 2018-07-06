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
  $.widget('phpcuong.addressAutofill', {
    options: {
      componentForm: {
        street_number: 'street_1',
        route: 'route',
        locality: 'city',
        administrative_area_level_2: 'city',
        administrative_area_level_1: 'region',
        country: 'country',
        postal_code: 'zip'
      },
      autocomplete: null
    },

    /**
     *
     * @private
     */
    _create: function () {
      var self = this;
      this.options.autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('street_1'),
        {types: ['geocode']}
      );
      // When the user selects an address from the dropdown, populate the address
      // fields in the form.
      this.options.autocomplete.addListener('place_changed', function() {
        // Get the place details from the autocomplete object.
        var place = self.options.autocomplete.getPlace();
        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = place.address_components.length-1; i >= 0; i--) {
          var addressType = place.address_components[i].types[0];
          var long_name = place.address_components[i].long_name;
          var short_name = place.address_components[i].short_name;
          if (self.options.componentForm[addressType] && long_name) {
            if (self.options.componentForm[addressType] == 'country') {
              $('#'+self.options.componentForm[addressType]).val(short_name).trigger('change');
            } else if (self.options.componentForm[addressType] == 'region') {
              $('#'+self.options.componentForm[addressType]).val(long_name).trigger('change');
              if ($('#region_id option:contains('+long_name+')')) {
                $('#region_id option:contains('+long_name+')').prop('selected', true);
              }
            } else if (self.options.componentForm[addressType] == 'route') {
              $('#street_1').val(long_name).trigger('keyup');
            } else if (self.options.componentForm[addressType] == 'street_1') {
              $('#'+self.options.componentForm[addressType]).val(long_name + ' '+ $('#'+self.options.componentForm[addressType]).val());
            } else {
              $('#'+self.options.componentForm[addressType]).val(long_name).trigger('keyup');
            }
          }
        }
      });
      this.options.autocomplete.setComponentRestrictions({'country': this._getCountriesCodeArray()});
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
  return $.phpcuong.addressAutofill;
});
