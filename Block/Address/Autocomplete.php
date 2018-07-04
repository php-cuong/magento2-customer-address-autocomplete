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

namespace PHPCuong\CustomerAddressAutocomplete\Block\Address;

class Autocomplete extends \Magento\Framework\View\Element\Template
{
    /**
     * @var \PHPCuong\CustomerAddressAutocomplete\Helper\Data
     */
    protected $addressAutocompleteHelperData;

    /**
     * @var \Magento\Framework\Locale\ResolverInterface
     */
    protected $_localeResolver;

    /**
     * @param \Magento\Framework\View\Element\Template\Context $context
     * @param \PHPCuong\CustomerAddressAutocomplete\Helper\Data $addressAutocompleteHelperData
     * @param \Magento\Framework\Locale\ResolverInterface $localeResolver
     */
    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \PHPCuong\CustomerAddressAutocomplete\Helper\Data $addressAutocompleteHelperData,
        \Magento\Framework\Locale\ResolverInterface $localeResolver
    ) {
        $this->addressAutocompleteHelperData = $addressAutocompleteHelperData;
        $this->_localeResolver = $localeResolver;
        parent::__construct($context);
    }

    /**
     * Retrieve the address autocomplete status
     *
     * @return boolean
     */
    public function showAddressAutocomplete()
    {
        $moduleName     = $this->getRequest()->getModuleName();
        $controllerName = $this->getRequest()->getControllerName();
        $actionName     = $this->getRequest()->getActionName();
        $currentPage = $moduleName.'_'.$controllerName.'_'.$actionName;
        $array = [
            'customer_account_create',
            'customer_address_edit',
            'customer_address_new',
            'customer_address_form',
            'checkout_index_index'
        ];
        if (in_array($currentPage, $array)
            && $this->addressAutocompleteHelperData->getAddressAutocompleteStatus()
        ) {
            return true;
        }
        return false;
    }

    /**
     * Check if the current page is the checkout page
     *
     * @return boolean
     */
    public function isCheckoutPage()
    {
        $moduleName     = $this->getRequest()->getModuleName();
        $controllerName = $this->getRequest()->getControllerName();
        $actionName     = $this->getRequest()->getActionName();
        $currentPage = $moduleName.'_'.$controllerName.'_'.$actionName;
        $array = [
            'checkout_index_index'
        ];
        if (in_array($currentPage, $array)) {
            return true;
        }
        return false;
    }

    /**
     * Retrieve the API Key
     *
     * @return string
     */
    public function getApiKey()
    {
        return $this->addressAutocompleteHelperData->getApiKey();
    }

    /**
     * Retrieve the locate
     *
     * @return string
     */
    public function getLocate()
    {
        return $this->_localeResolver->getLocale();
    }

    /**
     * Retrieve the countries code allowed
     *
     * @return string
     */
    public function getCountriesAllowed()
    {
        return $this->addressAutocompleteHelperData->getCountriesAllowed();
    }
}
