$(function(){
    //FILTRAGEM DE PREÇO DA PAGINA VENDA
   var currentValue = 0;
   var isDrag = false;
   var precoMaximo = 80000;
   var precoAtual= 0;

   $('.pointer-barra').mousedown(function(){
        isDrag = true;
   })

   $(document).mouseup(function(){
    isDrag = false;
    enableTextSelection();
   })

   $('.barra-preco').mousemove(function(e){
    if(isDrag){
        disableTextSelection();
        var elBase = $(this);
        var mouseX = e.pageX - elBase.offset().left;
        if(mouseX < 0)
            mouseX = 0;
        if(mouseX > elBase.width())
            mouseX = elBase.width();

        $('.pointer-barra').css('left',(mouseX - 13) + 'px')

        currentValue = (mouseX / elBase.width())*100;
        $('.barra-preco-fill').css('width',currentValue + '%');

        precoAtual = (currentValue / 100) * precoMaximo;
        precoAtual = formatarPreco(precoAtual)
        $('.preco-pesquisa').html('R$' + precoAtual);
    }
   })

   function formatarPreco(precoAtual){
        precoAtual = precoAtual.toFixed(2);
        precoArr = precoAtual.split('.');
        var novoPreco = formatarTotal(precoArr);
        return novoPreco
    }
    function formatarTotal(precoArr){
       if(precoArr[0] < 1000){
            return precoArr[0] + ',' + precoArr[1];
        }
        else if (precoArr[0] < 10000){
            return precoArr[0][0] +'.'+ precoArr[0].substr(1,precoArr[0].length) + ',' + precoArr[1];
        }
        else{
            return precoArr[0][0] + precoArr[0][1] +'.'+ precoArr[0].substr(2,precoArr[0].length) + ',' + precoArr[1]
        }
    }
    

   function disableTextSelection(){
        $('body').css('user-select','none');
   }
   function enableTextSelection(){
        $('body').css('user-select','auto');   

   }
   

   //SISTEMA DE SLIDE DA PÁGINA VEICULO SOLO

   var imgShow = 3;
   var maxIndex = Math.ceil($('.mini-img-wraper').length / 3) - 1;
   var curIndex = 0;
   initSlider();
   navigateSlider();
   cliqueSlider();

   function initSlider(){
    var amt = $('.mini-img-wraper').length * 33.3;
    var elScroll = $('.nav-galeria-wraper');
    var elSingle = $('.mini-img-wraper');
    elScroll.css('width',amt + '%');
    elSingle.css('width',33.3*(100/amt)+'%');
   }

   function navigateSlider(){  
        $('.arrow-right-nav').click(function(){
            if(curIndex < maxIndex){
                curIndex ++;
                var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
                $('.nav-galeria').animate({'scrollLeft':elOff+'px'});
            }else{
                console.log('chegamos até o final')
            }
        })
        $('.arrow-left-nav').click(function(){
            if(curIndex > 0){
                curIndex --;
                var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
                $('.nav-galeria').animate({'scrollLeft':elOff+'px'});
            }else{
                console.log('chegamos até o final')
            }
        })
    };

    function cliqueSlider(){
        $('.mini-img-wraper').click(function(){
            $('.mini-img-wraper').css('background-color','transparent');
            $(this).css('background-color','rgb(210,210,210');
            var img = $(this).children().css('background-image');
            $('.foto-destaque').css('background-image',img);
        })
        $('.mini-img-wraper').eq(0).click();
    }
        
    //ROLAGEM INDEX
    $('[goto=contato]').click(function(){
        $('nav a').css('color','black')
        $(this).css('color','#eb2d2d')
        $('html,body').animate({'scrollTop':$('#contato').offset().top})
        return false
    })
    //MENU RESPONSIVO
    $('.mobile').click(function(){
        $(this).find('ul').slideToggle();
    })
    //SISTEMA NAVEGAÇAO DEPOIMENTOS
    var amtDepoimento = $('.depoimento-single p').length;
    var indexDepo = 0
    navegarDepoimentos();
    iniciarDepoimentos()

    function iniciarDepoimentos(){
        $('.depoimento-single p').hide();
        $('.depoimento-single p').eq(0).show();

    }

    function navegarDepoimentos(){
        $('[next]').click(function(){
            indexDepo++;
                if(indexDepo >= amtDepoimento)
                    indexDepo = 0
                $('.depoimento-single p').hide();
                $('.depoimento-single p').eq(indexDepo).show();
            })
        $('[prev]').click(function(){
            indexDepo--;
                if(indexDepo < 0)
                    indexDepo = amtDepoimento - 1;
                $('.depoimento-single p').hide();
                $('.depoimento-single p').eq(indexDepo).show();
        })
    }
    
})