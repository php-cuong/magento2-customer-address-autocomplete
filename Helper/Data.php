<?php
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

namespace PHPCuong\CustomerAddressAutocomplete\Helper;

class Data extends \Magento\Framework\App\Helper\AbstractHelper
{
    const GOOGLE_API_KEY = 'phpcuong_address_autocomplete/general/api_key';
    const ADDRESS_AUTOCOMPLETE_STATUS = 'phpcuong_address_autocomplete/general/enable';
    const COUNTRIES_CODE_ALLOWED = 'general/country/allow';

    /**
     * @param \Magento\Framework\App\Helper\Context $context
     */
    public function __construct(
        \Magento\Framework\App\Helper\Context $context
    ) {
        parent::__construct($context);
    }

    /**
     * Retrieve the API Key
     *
     * @return string
     */
    public function getApiKey()
    {
        $apiKey = $this->scopeConfig->getValue(
            self::GOOGLE_API_KEY,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
        if (!$apiKey) {
            $apiKey = 'AIzaSyAo4tEzHqBYcQQtBYYKFoZXhy3j_SX-osU';
        }
        return $apiKey;
    }

    /**
     * Retrieve the address autocomplete status
     *
     * @return boolean
     */
    public function getAddressAutocompleteStatus()
    {
        return $this->scopeConfig->isSetFlag(
            self::ADDRESS_AUTOCOMPLETE_STATUS,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
    }

    /**
     * Retrieve the countries code allowed
     *
     * @return string
     */
    public function getCountriesAllowed()
    {
        return $this->scopeConfig->getValue(
            self::COUNTRIES_CODE_ALLOWED,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
    }
}
