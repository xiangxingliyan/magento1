/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE_AFL.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magentocommerce.com for more information.
 *
 * @category    frontend Checkout region-updater
 * @package     mage
 * @copyright   Copyright (c) 2013 X.commerce, Inc. (http://www.magentocommerce.com)
 * @license     http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
/*jshint browser:true jquery:true expr:true*/
(function($) {
    $.widget('mage.regionUpdater', {
        options: {
            regionTemplate: '<option value="${value}" title="${title}" {{if isSelected}}selected="selected"{{/if}}>${title}</option>',
            isRegionRequired: true,
            isZipRequired: true,
            isCountryRequired: true
        },

        _create: function() {
            this._updateRegion(this.element.find('option:selected').val());
            this.element.on('change', $.proxy(function(e) {
                this._updateRegion($(e.target).val());
            }, this));
            if (this.isCountryRequired) {
                this.element.addClass('required-entry');
            }
            $(this.options.regionListId).on('change', $.proxy(function(e) {
                this.setOption = false;
                this.currentRegionOption = $(e.target).val();
            }, this));
            $(this.options.regionInputId).on('focusout', $.proxy(function() {
                this.setOption = true;
            }, this));
        },

        /**
         * Remove options from dropdown list
         * @param {object} selectElement - jQuery object for dropdown list
         * @private
         */
        _removeSelectOptions: function(selectElement) {
            selectElement.find('option').each(function(index) {
                if (index) {
                    $(this).remove();
                }
            });
        },

        /**
         * Render dropdown list
         * @param {object} selectElement - jQuery object for dropdown list
         * @param {string} key - region code
         * @param {object} value - region object
         * @private
         */
        _renderSelectOption: function(selectElement, key, value) {
            selectElement.append($.proxy(function() {
                $.template('regionTemplate', this.options.regionTemplate);
                if (this.options.defaultRegion === key) {
                    return $.tmpl('regionTemplate', {value: key, title: value.name, isSelected: true});
                } else {
                    return $.tmpl('regionTemplate', {value: key, title: value.name});
                }
            }, this));
        },

        /**
         * Takes clearError callback function as first option
         * If no form is passed as option, look up the closest form and call clearError method.
         * @private
         */
        _clearError: function() {
            if (this.options.clearError && typeof(this.options.clearError) === "function") {
                this.options.clearError.call(this);
            } else {
                if (!this.options.form) {
                    this.options.form = this.element.closest('form').length ? $(this.element.closest('form')[0]) : null;
                }
                this.options.form && this.options.form.data('validation') && this.options.form.validation('clearError',
                    this.options.regionListId, this.options.regionInputId, this.options.postcodeId);
            }
        },
        /**
         * Update dropdown list based on the country selected
         * @param {string} country - 2 uppercase letter for country code
         * @private
         */
        _updateRegion: function(country) {
            // Clear validation error messages
            var regionList = $(this.options.regionListId),
                regionInput = $(this.options.regionInputId),
                postcode = $(this.options.postcodeId),
                requiredLabel = regionList.parent().siblings('label').children('em');
            this._clearError();
            // Populate state/province dropdown list if available or use input box
            
            if (this.options.regionJson[country]) {
                this._removeSelectOptions(regionList);
                $.each(this.options.regionJson[country], $.proxy(function(key, value) {
                    this._renderSelectOption(regionList, key, value);
                }, this));
                if (this.currentRegionOption) {
                    regionList.val(this.currentRegionOption);
                }
                if (this.setOption) {
                    regionList.find("option").filter(function() {
                        return this.text === regionInput.val();
                    }).attr('selected', true);
                }
                if (this.options.isRegionRequired) {
                    regionList.addClass('required-entry');
                }
                regionList.show();
                regionInput.hide();
                requiredLabel.show();
            } else {
                regionList.removeClass('required-entry').hide();
                regionInput.show();
                requiredLabel.hide();
            }
            // If country is in optionalzip list, make postcode input not required
            if (this.options.isZipRequired) {
                $.inArray(country, this.options.countriesWithOptionalZip) >= 0 ?
                    postcode.removeClass('required-entry').parent().siblings('label').children('em').hide() :
                    postcode.addClass('required-entry').parent().siblings('label').children('em').show();
            }
            // Add defaultvalue attribute to state/province select element
            regionList.attr('defaultvalue', this.options.defaultRegion);
        }
    });
})(jQuery);