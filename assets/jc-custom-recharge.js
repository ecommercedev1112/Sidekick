$(document).ready(function() {

    console.log("Testing File 1")

    
    function changePack() {
        const pack = $('.jc-custom-rc-radio__input:checked').next().find('.jc-custom-rc-radio__pack-item.active').data('pack');
        $('.jc-js-quantity-selector').val(pack);
    }

    function changePlan() {
        const plan = $('.jc-custom-rc-radio__plan-item.active').data('plan');
        $(`.rc_widget__option__plans__dropdown>option:eq(${plan})`).prop('selected', true);
    }

    function formatPrice(p) {
        return p.toFixed(2);
    }

    function updateSubscriptionPrices() {
        const subSaveActivePack = $('.jc-custom-subsave .jc-custom-rc-radio__pack-item.active');
        const subSaveComparePrice = subSaveActivePack.find('.jc-custom-rc__compare-price').text().trim();
        const subSaveSalePrice = subSaveActivePack.find('.jc-custom-rc__sale-price').text().trim();

        if (subSaveActivePack.length > 0) {
            $('.jc-custom-subsave .jc-custom-rc__price-box .jc-custom-rc__compare-price').text(subSaveComparePrice);
            $('.jc-custom-subsave .jc-custom-rc__sale-price').first().text(subSaveSalePrice);
        }
    }

    function updateOneTimePrices() {
        const oneTimeActivePack = $('.jc-custom-onetime .jc-custom-rc-radio__pack-item.active');
        const oneTimeComparePrice = oneTimeActivePack.find('.jc-custom-rc__compare-price').text().trim();
        const oneTimeSalePrice = oneTimeActivePack.find('.jc-custom-rc__sale-price').text().trim();

        if (oneTimeActivePack.length > 0) {
            $('.jc-custom-onetime .jc-custom-rc__price-box .jc-custom-rc__sale-price').html(`<span class="compare-price">${oneTimeComparePrice}</span> <span class="sale-price">${oneTimeSalePrice}</span>`);
        }
    }

    function changeVariant() {
        var price = Number($('[data-price-onetime]').text().trim().replace('$', ''));
        $('.jc-custom-rc__compare-price').text(`$${formatPrice(price)}`.replace('.00', ''));
        $('[data-pack="2"]').find('.jc-custom-rc__compare-price').text(`$${formatPrice(price * 2)}`.replace('.00', ''));
        $('[data-pack="3"]').find('.jc-custom-rc__compare-price').text(`$${formatPrice(price * 3)}`.replace('.00', ''));
        $('.jc-custom-onetime').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price)}`.replace('.00', ''));
        $('.jc-custom-onetime').find('[data-pack="1"]').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price)}`.replace('.00', ''));
        $('.jc-custom-onetime').find('[data-pack="2"]').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price * 2 * 0.9)}`.replace('.00', ''));
        $('.jc-custom-onetime').find('[data-pack="3"]').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price * 3 * 0.85)}`.replace('.00', ''));

        $('.jc-custom-subsave').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price * 0.8)}`.replace('.00', ''));
        $('.jc-custom-subsave').find('[data-pack="1"]').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price * 0.8)}`.replace('.00', ''));
        $('.jc-custom-subsave').find('[data-pack="2"]').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price * 2 * 0.8)}`.replace('.00', ''));
        $('.jc-custom-subsave').find('[data-pack="3"]').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price * 3 * 0.8)}`.replace('.00', ''));
    }

    function updateInitialOneTimePrice() {
        // Update to the single pack one-time price on page load
        const singlePack = $('.jc-custom-onetime .jc-custom-rc-radio__pack-item[data-pack="1"]');
        singlePack.addClass('active');
        const oneTimeComparePrice = singlePack.find('.jc-custom-rc__compare-price').text().trim();
        const oneTimeSalePrice = singlePack.find('.jc-custom-rc__sale-price').text().trim();

        if (singlePack.length > 0) {
            $('.jc-custom-onetime .jc-custom-rc__price-box .jc-custom-rc__sale-price').html(`<span class="compare-price">${oneTimeComparePrice}</span> <span class="sale-price">${oneTimeSalePrice}</span>`);
        }
    }

    $(document).on('change', '.single-option-selector__radio', function() {
        changeVariant();
    });

    $(document).on('click', '.jc-custom-rc-radio__pack-item', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if ($(this).closest('.jc-custom-rc-radio').hasClass('jc-custom-subsave')) {
            $(this).closest('.jc-custom-rc-radio__packs').find('.jc-custom-rc-radio__pack-item').removeClass('active');
            $(this).addClass('active');
            changePack();
            updateSubscriptionPrices();
        } else if ($(this).closest('.jc-custom-rc-radio').hasClass('jc-custom-onetime')) {
            $(this).closest('.jc-custom-rc-radio__packs').find('.jc-custom-rc-radio__pack-item').removeClass('active');
            $(this).addClass('active');
            changePack();
            updateOneTimePrices();
        }
    });

    $(document).on('click', '.jc-custom-ra-radio-wrapper', function(e) {
        updateSubscriptionPrices();
        updateOneTimePrices();
    });


    $(document).on('change', '.jc-custom-rc-radio__input', function() {
        if ($('.jc-custom-rc-radio__input:checked').val() == 'subsave') {
            $('.rc-radio__input[value="subsave"]').click();
            $('#subscription-btn').text('Add Subscription to Cart');
            if ($(window).width() < 768) {

                $('#disclaimer-text').html('60-Day Money-Back Guarantee<br> Free U.S. Shipping');
            } else {

                $('#disclaimer-text').text('60-Day Money-Back Guarantee | Free U.S. Shipping');
            }
        } else {
            $('.rc-radio__input[value="onetime"]').click();
            $('#subscription-btn').text('Add to Cart');
            $('#disclaimer-text').text('60-Day Money-Back Guarantee | Free U.S. Shipping Over $60');
            if ($(window).width() < 768) {
                $('#disclaimer-text').html('60-Day Money-Back Guarantee<br>Free U.S. Shipping Over $60');
                $('body, html').scrollTop($('.jc-custom-onetime').position().top + 540);
              } else {
                $('#disclaimer-text').text('60-Day Money-Back Guarantee | Free U.S. Shipping Over $60');
              }
        }
        changePack();
        if ($('.jc-custom-rc-radio__input:checked').val() == 'subsave') {
            updateSubscriptionPrices();
        } else {
            updateOneTimePrices();
        }
    });




    const location_search = window.location.search;

    var searchInterval = setInterval(searchElement, 500);
    function stopSearch() {
        clearInterval(searchInterval);
    }

    function searchElement() {
        if ($('[data-widget-container-wrapper]').length > 0) {
            setTimeout(function() {
                if (location_search.indexOf('?variant=') == -1) {
                    if ($('.single-option-selector__radio[value="2500mg"]').length > 0) $('.single-option-selector__radio[value="2500mg"]').next().click();
                    else $('.jc-input-index-2[name="potency"]').next().click();
                }
                $('.jc-custom-rc-container').show();
                stopSearch();
                changeVariant();
                changePack();
                changePlan();
            }, 100);
        }
    }

    setTimeout(function() {
        stopSearch();
    }, 60000);

    // Initial load: update the one-time price for the single pack
    // updateInitialOneTimePrice();
});




/*

$(document).ready(function(){
 
    function changePack() {
        const pack = $('.jc-custom-rc-radio__input:checked').next().find('.jc-custom-rc-radio__pack-item.active').data('pack');
        $('.jc-js-quantity-selector').val(pack);
    }

    function changePlan() {
        const plan = $('.jc-custom-rc-radio__plan-item.active').data('plan');
        $(`.rc_widget__option__plans__dropdown>option:eq(${plan})`).prop('selected', true);
    }

    function formatPrice(p) {
        return p.toFixed(2);
    }
    function updatePrices() {
        const subSaveActivePack = $('.jc-custom-subsave .jc-custom-rc-radio__pack-item.active');
        console.log("SubSave Active Pack:", subSaveActivePack.length > 0 ? "Found" : "Not Found");
    
        const subSaveComparePrice = subSaveActivePack.find('.jc-custom-rc__compare-price').text().trim();
        console.log("SubSave Compare Price Text:", subSaveComparePrice);
    
        const subSaveSalePrice = subSaveActivePack.find('.jc-custom-rc__sale-price').text().trim();
        console.log("SubSave Sale Price Text:", subSaveSalePrice);
    
        const oneTimeActivePack = $('.jc-custom-onetime .jc-custom-rc-radio__pack-item.active');
        console.log("OneTime Active Pack:", oneTimeActivePack.length > 0 ? "Found" : "Not Found");
    
        const oneTimeComparePrice = oneTimeActivePack.find('.jc-custom-rc__compare-price').text().trim();
        console.log("OneTime Compare Price Text:", oneTimeComparePrice);
    
        const oneTimeSalePrice = oneTimeActivePack.find('.jc-custom-rc__sale-price').text().trim();
        console.log("OneTime Sale Price Text:", oneTimeSalePrice);
    
        // Update the UI only if elements are found
        if (subSaveActivePack.length > 0) {
            $('.jc-custom-subsave .jc-custom-rc__price-box .jc-custom-rc__compare-price').text(subSaveComparePrice);
            $('.jc-custom-subsave .jc-custom-rc__sale-price').first().text(subSaveSalePrice);
        }
    
        if (oneTimeActivePack.length > 0) {
            $('.jc-custom-onetime .jc-custom-rc__price-box .jc-custom-rc__sale-price').html(`<span class="compare-price">${oneTimeComparePrice}</span> <span class="sale-price">${oneTimeSalePrice}</span>`);
        }




        
    }
    
    
    

    function changeVariant() {
        var price = Number($('[data-price-onetime]').text().trim().replace('$',''));
        $('.jc-custom-rc__compare-price').text(`$${formatPrice(price)}`.replace('.00', ''));
        $('[data-pack="2"]').find('.jc-custom-rc__compare-price').text(`$${formatPrice(price * 2)}`.replace('.00', ''));
        $('[data-pack="3"]').find('.jc-custom-rc__compare-price').text(`$${formatPrice(price * 3)}`.replace('.00', ''));
        $('.jc-custom-onetime').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price)}`.replace('.00', ''));
        $('.jc-custom-onetime').find('[data-pack="1"]').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price)}`.replace('.00', ''));
        $('.jc-custom-onetime').find('[data-pack="2"]').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price * 2 * 0.9)}`.replace('.00', ''));
        $('.jc-custom-onetime').find('[data-pack="3"]').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price * 3 * 0.85)}`.replace('.00', ''));

        $('.jc-custom-subsave').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price * 0.8)}`.replace('.00', ''));
        $('.jc-custom-subsave').find('[data-pack="1"]').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price * 0.8)}`.replace('.00', ''));
        $('.jc-custom-subsave').find('[data-pack="2"]').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price * 2 * 0.8)}`.replace('.00', ''));
        $('.jc-custom-subsave').find('[data-pack="3"]').find('.jc-custom-rc__sale-price').text(`$${formatPrice(price * 3 * 0.8)}`.replace('.00', ''));
    }

    $(document).on('change', '.single-option-selector__radio', function(){
        changeVariant();
    });

    $(document).on('click', '.jc-custom-rc-radio__pack-item', function(e) {
        e.preventDefault();
        e.stopPropagation();
        // Distinguish between subsave and onetime pack items
        if($(this).closest('.jc-custom-rc-radio').hasClass('jc-custom-subsave')) {
            // Handle Subscribe & Save packs
            $(this).closest('.jc-custom-rc-radio__packs').find('.jc-custom-rc-radio__pack-item').removeClass('active');
            $(this).addClass('active');
            changePack();
            updatePrices();
        } else if ($(this).closest('.jc-custom-rc-radio').hasClass('jc-custom-onetime')) {
            // Handle One-Time Purchase packs
            $(this).closest('.jc-custom-rc-radio__packs').find('.jc-custom-rc-radio__pack-item').removeClass('active');
            $(this).addClass('active');
            changePack();
            updatePrices();
        }
    });
    

    $(document).on('click', '.jc-custom-ra-radio-wrapper', function(e){

        updatePrices();
    });


    updatePrices();
    
    $(document).on('change', '.jc-custom-rc-radio__input', function(){
        if ($('.jc-custom-rc-radio__input:checked').val() == 'subsave') {
            $('.rc-radio__input[value="subsave"]').click();
            $('#subscription-btn').text('Add Subscription to Cart');
            $('#disclaimer-text').text('60-Day Money-Back Guarantee | Free U.S. Shipping');
           
        } else {
            $('.rc-radio__input[value="onetime"]').click();
            $('#subscription-btn').text('Add to Cart');
            $('#disclaimer-text').text('60-Day Money-Back Guarantee | Free U.S. Shipping Over $60');
            if($(window).width() < 768) {
              $('body, html').scrollTop($('.jc-custom-onetime').position().top + 540);
            }
        }
        changePack();
        
    });

  const location_search = window.location.search;

    var searchInterval = setInterval(searchElement, 500);
    function stopSearch() {
        clearInterval(searchInterval);
    }

    function searchElement() {
        if($('[data-widget-container-wrapper]').length > 0) {
            setTimeout(function(){
              if(location_search.indexOf('?variant=') == -1) {
                if($('.single-option-selector__radio[value="2500mg"]').length > 0) $('.single-option-selector__radio[value="2500mg"]').next().click();
                else $('.jc-input-index-2[name="potency"]').next().click();
              }
              $('.jc-custom-rc-container').show();
              stopSearch();
              changeVariant();
              changePack();
              changePlan();
            }, 100);
        }
    }
    
    setTimeout(function(){
        stopSearch();
    },60000);
});

*/