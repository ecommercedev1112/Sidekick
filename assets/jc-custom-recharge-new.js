$(document).ready(function(){
 

    console.log("Testing File 2")
    
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

    $(document).on('click', '.jc-custom-rc-radio__pack-item', function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).closest('.jc-custom-rc-radio__packs').find('.jc-custom-rc-radio__pack-item').removeClass('active');
        $(this).addClass('active');
        changePack();
    });

    $(document).on('click', '.jc-custom-rc-radio__plan-item', function(e){
        e.preventDefault();
        e.stopPropagation();
        $('.jc-custom-rc-radio__plan-item').removeClass('active');
        $(this).addClass('active');
        changePlan();
    });

    
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

