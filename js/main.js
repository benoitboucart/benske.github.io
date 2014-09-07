$(function() {
	
	var $html = $('html'),
      $gridContainer = $('.rowgrid'),
        // loader = new SVGLoader( 
        //     document.getElementById( 'loader' ), { 
        //         speedIn : 100 
        //     } 
        // ),
        loaderHTML = $('#loader'),
        loader = {
            show: function(){
                loaderHTML.show();
            },
            hide: function(){
              //setTimeout(function(){
                loaderHTML.hide();
              //},200);
            }
        },
        scrollToTop = function(){
            $("html, body").animate({ scrollTop: "0px" }, 0);
        },
        $viewport = $(window),
        breakpoint = 760,
        breakpoint_medium = 1100;

    // 1px bug fix: source: http://www.bsstc.com.au/themes/bsstc2014/js/main.js?m=1390455680
    var calculateSize = function($container){
        var bodyMargin = 22;
        var idealSize = $container.outerWidth();// - bodyMargin * 2;
        var remainder = idealSize%12;
        var toAdd = 12-remainder;
        var newSize = idealSize + toAdd;
        var marginLeft = (toAdd > 0) ? Math.floor(toAdd/2) : 0;
        var marginRight = (toAdd > 0) ? toAdd - marginLeft : 0;
        // Is the ideal size divisible by 12?
        if (remainder == 0)
        {
            $container.css({
                width: '100%',
                margin: '0'
            });
        } else {
            $container.css({
                width: newSize+'px',
                margin: '0px -'+marginRight+'px 0px -'+marginLeft+'px'
            });
        }
    };
    $(window).resize( $.throttle( 250, function(){
        calculateSize($gridContainer);
        $gridContainer.packery('layout');
    } ) );
    var initPlugins = function(){
        // Show burger
        setTimeout(function(){
            $(".burger").addClass('burger--loaded');
            // .on("click", function(){
            //   $(this).toggleClass("burger--open");
            // });
            $html.addClass('loaded');
        }, 200);


        /**
         * jQuery row grid
         */
          // var rowGridOptions = {
          //   minMargin: 0/*5*/, 
          //   maxMargin: 0/*15*/, 
          //   itemSelector: ".rowgrid__item", 
          //   firstItemClass: "first-item"
          // };
          // $(".rowgrid").rowGrid(rowGridOptions);
          // Masonry
        // initialize Masonry after all images have loaded
        imagesLoaded( $gridContainer, function() {
            // --> Masonry
            // $gridContainer.masonry({
            //     //columnWidth: 200,
            //     itemSelector: '.rowgrid__item',
            //     //columnWidth: 50,
            //     // columnWidth: function( containerWidth ) {
            //     //     console.log($gridContainer.outerWidth());
            //     //     return $gridContainer.outerWidth() / 5;
            //     // },
            //     gutterWidth: 0
            // });
            
            --> Packery
            // $gridContainer.packery({
            //     //columnWidth: 200,
            //     itemSelector: '.rowgrid__item',
            //     gutter: 0
            // });
            // 1px bug fix: source: http://www.bsstc.com.au/themes/bsstc2014/js/main.js?m=1390455680
            calculateSize($gridContainer);
            
            $gridContainer.packery({
                "itemSelector": '.rowgrid__item',
                "gutter": 0,
                "isResizeBound": false//,
                //"transitionDuration": "200ms"
            });
            $gridContainer.packery('bindResize');

            // function onLayout() {
            //if($gridContainer.length){

            // Hide loader on load (initially)
            loader.hide();

            //}
            // }
            // $gridContainer.packery( 'on', 'layoutComplete', onLayout );

            // --> Nested
            // $gridContainer.nested({
            //     selector: '.rowgrid__item',
            //     gutter: 0,
            //     minWidth: 150,
            //     resizeToFit: true
            // });
        });


        /**
         * Scroll after....
         */
        if($viewport.width() > breakpoint_medium ){
            var $scroll_container  = $('.l-top').first(),
                scroll_to_height  = $scroll_container.outerHeight(true),
                scroll_container_fixed_height = 87,
                $content_wrapper  = $('.l-main')
            ;

            function checkHeaderBar(){
                if ($(window).scrollTop() > scroll_to_height) {
                    // > scroll_to_height from top - show div
                    if(!$scroll_container.hasClass("l-top--fixed")){
                        $scroll_container.addClass('l-top--fixed').addClass('l-top--animate');
                        $content_wrapper.css({'padding-top':scroll_to_height+ scroll_container_fixed_height + 'px'});
                    }
                }else{
                    if($scroll_container.hasClass("l-top--fixed")){
                        $scroll_container.removeClass('l-top--fixed').removeClass('l-top--animate');
                        $content_wrapper.css({'padding-top':'0px'});
                    }
                }
            }

            $(window).off('scroll').scroll(/*$.debounce(250, */checkHeaderBar/*)*/);
        }



        // Animate SVG
        var speed = 300,
            easing = mina.backout;

        // [].slice.call ( document.querySelectorAll( '#grid > a' ) ).forEach( function( el ) {$
        $('[data-path-hover]').each(function(index, el){
            var $el = $(el), s = Snap( $el.find( 'svg' )[0] ), path = s.select( 'path' ),
                pathConfig = {
                    from : path.attr( 'd' ),
                    to : $el.attr( 'data-path-hover' )
                };

            $el.on( 'mouseenter', function() {
                path.animate( { 'path' : pathConfig.to/*, 'fill': '#fff'*/ }, speed, easing );
            } );

            $el.on( 'mouseleave', function() {
                path.animate( { 'path' : pathConfig.from }, speed, easing );
            } );
        });
        // } );
        

        // Particles
        if($viewport.width() > breakpoint ){
            var $canvasContainer = $('.l-top.hasAnim').first();
            if($canvasContainer.length){
              var COLORS, FRICTION, GRAVITY, MAX_FORCE, NUM_PARTICLES, Particle, TAIL_LENGTH;
                  NUM_PARTICLES = 170;
                  TAIL_LENGTH = 7;
                  MAX_FORCE = 4;
                  FRICTION = 0.75;
                  GRAVITY = 9.81;
              COLORS = ['#FF4746', '#E8DA5E', '#92B55F', '#487D76'];
              Particle = (function() {
                function Particle(x, y, mass) {
                  this.x = x != null ? x : 0.0;this.y = y != null ? y : 0.0;this.mass = mass != null ? mass : 1.0;this.tail = [];this.radius = this.mass * 0.15;this.charge = random([-1, 1]);this.color = random(COLORS);this.fx = this.fy = 0.0;this.vx = this.vy = 0.0;
                }
                return Particle;
              })();
              Sketch.create({
                container: $canvasContainer.get(0),
                particles: [],
                setup: function() {
                  var i, m, x, y, _i, _results; _results = []; for (i = _i = 0; _i <= NUM_PARTICLES; i = _i += 1) { x = random(this.width); y = random(this.height); m = random(0.5, 8.0); _results.push(this.particles.push(new Particle(x, y, m))); } return _results;
                },
                draw: function() {
                  var a, b, dSq, dst, dx, dy, f, fx, fy, i, j, len, p, rad, _i, _j, _k, _len, _ref, _ref1, _results; this.lineCap = this.lineJoin = 'round'; _results = []; for (i = _i = 0; _i <= NUM_PARTICLES; i = _i += 1) { a = this.particles[i]; if (random() < 0.08) { a.charge = -a.charge; } for (j = _j = _ref = i + 1; _j <= NUM_PARTICLES; j = _j += 1) { b = this.particles[j]; dx = b.x - a.x; dy = b.y - a.y; dst = sqrt(dSq = (dx * dx + dy * dy) + 0.1); rad = a.radius + b.radius; if (dst >= rad) { len = 1.0 / dst; fx = dx * len; fy = dy * len; f = min(MAX_FORCE, (GRAVITY * a.mass * b.mass) / dSq); a.fx += f * fx * b.charge; a.fy += f * fy * b.charge; b.fx += -f * fx * a.charge; b.fy += -f * fy * a.charge; } } a.vx += a.fx; a.vy += a.fy; a.vx *= FRICTION; a.vy *= FRICTION; a.tail.unshift({ x: a.x, y: a.y }); if (a.tail.length > TAIL_LENGTH) { a.tail.pop(); } a.x += a.vx; a.y += a.vy; a.fx = a.fy = 0.0; if (a.x > this.width + a.radius) { a.x = -a.radius; a.tail = []; } else if (a.x < -a.radius) { a.x = this.width + a.radius; a.tail = []; } if (a.y > this.height + a.radius) { a.y = -a.radius; a.tail = []; } else if (a.y < -a.radius) { a.y = this.height + a.radius; a.tail = []; } this.strokeStyle = a.color; this.lineWidth = a.radius * 2.0; this.beginPath(); this.moveTo(a.x, a.y); _ref1 = a.tail; for (_k = 0, _len = _ref1.length; _k < _len; _k++) { p = _ref1[_k]; this.lineTo(p.x, p.y); } _results.push(this.stroke()); } return _results;
                }
              });
            }
        }


        /**
         * sidebarEffects.js v1.0.0
         * http://www.codrops.com
         *
         * Licensed under the MIT license.
         * http://www.opensource.org/licenses/mit-license.php
         * 
         * Copyright 2013, Codrops
         * http://www.codrops.com
         */
         var SidebarMenuEffects = (function() {
            // http://coveroverflow.com/a/11381730/989439
            function mobilecheck() {
                var check = false;
                (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
                return check;
            }
            function init() {
                var container = document.getElementById( 'bb-menu-wrapper' ),
                    effect = "bb-menu-effect", //"st-effect-7";//"st-effect-5";
                    buttons = $('.burger'),
                    // event type (if mobile use touch events)
                    eventtype = mobilecheck() ? 'touchstart' : 'click',
                    resetMenu = function() {
                        $(container).removeClass( 'bb-menu-open' );
                    },
                    bodyClickFn = function(evt) {
                        if( !$(evt.target).parent().hasClass('bb-menu') ) {
                            buttons.removeClass('burger--open');
                            resetMenu();
                            setTimeout(function(){
                                $(container).removeClass(effect);
                                //document.removeEventListener( eventtype, bodyClickFn );
                                $(document).on( eventtype, bodyClickFn );
                            }, 350);
                        }
                    };

                $.each(buttons, function( index, el ) {
                    $('.bb-menu').addClass(effect);
                    $(el).on(eventtype, function(evt){
                        if($(container).hasClass('bb-menu-open')){
                            // Continue event propagation
                            return true;
                        }
                        // Sxcroll to top
                        scrollToTop();
                        setTimeout(function(){$(el).addClass('burger--open');}, 20);
                        // Open burger
                        evt.stopPropagation();
                        evt.preventDefault();
                        container.className = 'bb-menu-wrapper'; // clear
                        $(container).addClass(effect);
                        setTimeout( function() {
                            $(container).addClass('bb-menu-open' );
                        }, 0 );
                        $(document).on( eventtype, bodyClickFn );
                    });
                } );
            }
            init();

        })();
    };
    initPlugins();


    // History API
    var siteUrl = 'http://'+(document.location.hostname||document.location.host);

    $(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
        e.preventDefault();
        History.pushState({}, "", this.pathname);
    });

    History.Adapter.bind(window, 'statechange', function(){
       loader.show();
        var State = History.getState();
        scrollToTop();
        $.get(State.url, function(data){
            var matches = data.match(/<title>(.*?)<\/title>/);
            if(matches.length>1){
                document.title = matches[1];
            }
            $('.ajaxed__inner').html($(data).find('.ajaxed__inner'));
            // Grid container update
            $gridContainer = $('.ajaxed__inner').find('.rowgrid')

            initPlugins();
            if($gridContainer.length){
              imagesLoaded( $gridContainer, function() {
                loader.hide();
              });
            } else {
              loader.hide();
            }
            
            //$('.content').html($(data).find('.content'));
            //_gaq.push(['_trackPageview', State.url]);
        });
    });


    // Highlight JS
	//hljs.configure({classPrefix: ''});
	//hljs.initHighlightingOnLoad();


	// VELOCITY ANIM
    // var $stage;
    // /* Colors, prefix finder for transforms */
    // var Colors = {
    //     white: '#fefefe',
    //     blue: '#40cacc'
    // }
    // var prefix = (function () {
    //     var styles = window.getComputedStyle(document.documentElement, ''),
    //         pre = (Array.prototype.slice
    //             .call(styles)
    //             .join('')
    //             .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    //             )[1],
    //         dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
    //     return {
    //         dom: dom,
    //         lowercase: pre,
    //         css: '-' + pre + '-',
    //         js: pre[0].toUpperCase() + pre.substr(1)
    //     };
    // })();

    // var transform = prefix.css+'transform';

    // function createDiv(className) {
    //     var div = document.createElement('div');
    //     if(className) div.className = className;
    //     var $div = $(div);
    //     return $div;
    // }

    // /* Store transform values for CSS manipulation */
    // $.fn.extend({
    //     transform: function(props) {
    //         var _this = this;
    //         for(var i in props) {
    //             _this[i] = props[i];
    //         }
    //         return transformString();

    //         function transformString() {
    //             var string = '';
    //             if(_this.x) string += 'translateX('+_this.x+'px)';
    //             if(_this.y) string += 'translateY('+_this.y+'px)';
    //             if(_this.skewX) string += 'skewX('+_this.skewX+'deg)';
    //             if(_this.skewY) string += 'skewY('+_this.skewY+'deg)';
    //             if(_this.rotation) string += 'rotate('+_this.rotation+'deg)';
    //             if(_this.scale) string += 'scale('+_this.scale+','+_this.scale+')';
    //             return string;
    //         };
    //     }
    // });

    // /* Animation Componenents */
    // function VelocityScene() {
    //     var _this = this;
    //     var $l1outer, $l1inner, $l2, $text, $skewbox;
    //     var letters = [], text = 'WEBBB';

    //     (function() {
    //        initElements();
    //     })();

    //     function initElements() {
    //         $skewbox = createDiv('box');
    //         $stage.append($skewbox);
    //         $skewbox.hide();

    //         $l1outer = createDiv('line');
    //         $l1inner = createDiv('line');
           
    //         $stage.append($l1outer);
    //         $l1outer.append($l1inner);

    //         $l2 = createDiv('line');
            
    //         $stage.append($l2);

    //         $text = createDiv('text');
            
    //         for(var i in text) {
    //             var $l = createDiv();
    //             $l.html(text[i]);
    //             $l.css({
    //             	position: 'relative', 
    //             	float: 'left', 
    //             	display: 'inline-block', 
    //             	width: 'auto', 
    //             	marginRight: 5,//20,
    //                 transform: $l.transform({y: -160})
    //             });
    //             $text.append($l);
    //             letters.push($l);
    //         }
    //         $stage.append($text);

    //     }

    //     this.beginAnimation = function() {
    //     	var boxHeight = 300;
    //         $skewbox.css({
    //         	width: boxHeight, 
    //         	height: 110, 
    //         	background: Colors.blue, 
    //         	left: '50%', 
    //         	marginLeft: -250, 
    //         	top: '50%',
    //             transform: $skewbox.transform({skewY: -9}), 
    //             marginTop: -60 
    //         });
    //         $l1outer.css({
    //         	overflow: 'hidden', 
    //         	width: boxHeight, 
    //         	height: 12, 
    //         	left: '50%', 
    //         	marginLeft: -boxHeight/2,
    //         	top: '50%',
    //         	marginTop: -5, 
    //         	transform: $l1outer.transform({x: boxHeight/2, y: 0}) 
    //         });
    //         $l1inner.css({
    //         	width: boxHeight,
    //         	height: 10,
    //         	top: 1,
    //         	transform: $l1inner.transform({x: -boxHeight, y: 0}),
    //         	background: Colors.white
    //         });
    //         $l2.css({
    //         	width: boxHeight, 
    //         	height: 10, 
    //         	left: '50%', 
    //         	marginLeft: -boxHeight/2, 
    //         	top: '50%', 
    //         	marginTop: -4,
    //             background: Colors.white, 
    //             display: 'none', 
    //             transform: $l2.transform({skewY: -9})
    //         });
    //         $text.css({
    //         	//width: boxHeight, 
    //         	//height: 10, 
    //         	fontSize: 100, 
    //         	lineHeight: 1, 
    //         	color: Colors.white, 
    //         	left: '50%', 
    //         	marginLeft: -236,
    //             top: '21%',//50%', 
    //             marginTop: 0,//-75, 
    //             transform: $text.transform({skewY: -9, y: 70}), 
    //             overflow: 'hidden'
    //         });
    //         $l1outer.show();
    //         $l1inner.show();
    //         $text.show();
          
    //         $l1inner.velocity({
    //         	translateX: [0, -boxHeight], 
    //         	translateY: [0,0]
    //         }, 300, 'easeInOutCubic');
    //         $l1outer.velocity({
    //         	translateX: [0, 250], 
    //         	translateY: [0,0]
    //         }, 300, 'easeInOutCubic');
    //         $l1outer.velocity({
    //         	skewY: -9
    //         }, {
    //         	duration: 400, 
    //         	easing: 'easeInOutQuart', 
    //         	complete: function() {
	   //              $l2.show();
	   //              $l1outer.velocity({
	   //              	translateY: -70
	   //              }, 400, 'easeOutQuart');
	   //              $l2.velocity({
	   //              	translateY: 70, 
	   //              	skewY: [-9,-9]
	   //              }, 400, 'easeOutQuart');
	   //              $text.velocity({
	   //              	height: 160, 
	   //              	skewY: [-9,-9], 
	   //              	translateY: [0,70]
	   //              }, 400, 'easeOutQuart');
	   //              for(var i in letters) {
	   //              	if(typeof letters[i] !== "function"){
	   //                  	letters[i].velocity({
	   //                  		translateY: [0, -160]
	   //                  	}, 250, 'easeOutCubic', 100 + i * 50);
	   //                  }
	   //              }
	   //          }
	   //      });
    //     }

        // this.close = function(callback) {
        //     $text.velocity({height: 10, translateY: [69, 0]}, {duration: 300, easing: 'easeOutCubic'});
        //     for(var i in letters) {
        //     	if(typeof letters[i] !== "function"){
        //         	letters[i].velocity({translateY: [-150, 0]}, 800, 'easeOutCubic');
        //         }
        //     }
        //     $l1outer.velocity({translateY: [0, -70]}, {duration: 300, easing: 'easeOutCubic'});
        //     $l2.velocity({translateY: [0, 70], skewY: [-9,-9]}, {duration: 300, easing: 'easeOutCubic',
        //         complete: function() {
        //             $l1inner.css({height: 110, transform: $l1inner.transform({y: -100, x: 0})});
        //             $l1outer.css({height: 110});
        //             $l2.hide();
        //             $l1outer.velocity({translateY: [-55, 0]}, {duration: 200, easing: 'easeInCubic'});
        //             $l1inner.velocity({translateY: [0, -100]}, {duration: 200, easing: 'easeInCubic', complete: function() {
        //                 $skewbox.show();
        //                 $skewbox.velocity({skewY: [0, -9]}, 200, 'easeInOutSine');
        //                 $l1outer.velocity({skewY: [0, -9]}, {duration: 200, easing: 'easeInOutSine', delay: 100, complete: function() {
        //                     $skewbox.hide();
        //                     $l1outer.velocity({translateX: -80}, {duration: 100, easing: 'easeOutCubic'});
        //                     $l1inner.velocity({translateX: 160}, {duration: 100, easing: 'easeOutCubic', complete: function() {
        //                        callback();
        //                        $l1outer.hide();
        //                        $text.hide();
        //                     }});
        //                 }});

        //             }});
        //     }});
        // }
    // }

    // function VelocityMask() {
    //     var  $text;
    //     var letters = [], text = 'VELOCITY';
    //     (function() {
    //         initElements();
    //     })();

    //     function initElements() {
    //         $text = createDiv('text');
    //         $text.css({width: 500, height: 160, fontSize: 100, color: Colors.blue, left: '50%', marginLeft: -236,
    //             top: '50%', marginTop: -75, transform: $text.transform({skewY: -9}), overflow: 'hidden'});
    //         for(var i in text) {
    //             var $l = createDiv();
    //             var $linner = createDiv();
    //             $l.css({position: 'relative', float: 'left', display: 'inline-block', width: 'auto', overflow: 'hidden', transform: $l.transform({y: -140})});
    //             $linner.css({position: 'relative', float: 'left', display: 'inline-block', width: 'auto', marginRight: 20, transform: $linner.transform({y: 140})});
    //             $linner.html(text[i]);
    //             $l.append($linner);
    //             $text.append($l);
    //             letters.push($l);
    //         }
    //         $stage.append($text);
    //     }

    //     this.animateIn = function() {
    //         $text.show();
    //         for(var i in letters) {
    //         	if(typeof letters[i] !== "function"){
	   //              letters[i].velocity({translateY: [0, -140]}, {duration: 200+i*25, easing: 'easeOutCubic', delay: i*50});
	   //              letters[i].find('div').velocity({translateY: [0, 140]}, {duration: 200+i*25, easing: 'easeOutCubic', delay: i*50});
	   //          }
    //         }

    //         setTimeout(function() {
    //             for(var j in letters) {
    //             	if(typeof letters[i] !== "function"){
	   //                  letters[j].velocity({translateY: 140}, {duration: 250, easing: 'easeInCubic', delay: j*40});
	   //                  letters[j].find('div').velocity({translateY: -140}, {duration: 250, easing: 'easeInCubic', delay: j*40});
	   //              }
    //             }
    //         }, 700);
    //     }
        
    //     this.hide = function() {
    //         $text.hide();
    //     }
    // }

    // function SplitLines() {
    //     var $container;
    //     var _lines = [];

    //     (function() {
    //         initElements();
    //     })();

    //     function initElements() {
    //         $container = createDiv('container');
    //         $container.css({width: 340, height: 110, top: '50%', left: '50%', marginLeft: -170,
    //             marginTop: -60});
    //         $stage.append($container);
    //         $container.hide();

    //         for(var i = 0; i < 68; i++) {
    //             var l = {
    //                 outer: createDiv(),
    //                 inner: createDiv()
    //             }
    //             l.outer.css({width: 5, height: 110, left: i*5});
    //             l.inner.css({background: Colors.white, width: 5, height: 110});
    //             $container.append(l.outer);
    //             l.outer.append(l.inner);
    //             _lines.push(l);
    //         }
    //     }

    //     this.beginAnimation = function(callback) {
    //         $container.show();

    //         setTimeout(function() {
    //             var midway = _lines.length/2;
    //             for(var i in _lines) {
    //             	if(typeof _lines[i] !== "function"){
	   //                  _lines[i].inner.velocity({translateY: -30+(Math.random()*60)}, {duration: 160, easing: 'easeOutQuart'});
	   //                  _lines[i].inner.velocity({translateY: -30+(Math.random()*60)}, {duration: 160, easing: 'easeInOutQuart'});
	   //                  _lines[i].inner.velocity({translateY: (i%2 == 0) ? -200 : 200}, {duration: 400, easing: 'easeInOutQuart'});
	   //                  if(i < midway) {
	   //                      _lines[i].inner.velocity({translateX: '-='+(midway-i)*2*(midway-i)/10+'px'}, {duration: 300, easing: 'easeInOutCubic'});
	   //                  } else {
	   //                      _lines[i].inner.velocity({translateX: '+='+(i-midway)*2*(i-midway)/10+'px'}, {duration: 300, easing: 'easeInOutCubic'});
	   //                  }

	   //                  _lines[i].inner.velocity({translateX: 0}, {duration: 220, easing: 'easeInCubic'});
	   //                  _lines[i].inner.velocity({rotateZ: '360deg', translateY: 0, translateX: -i*5, height: 5}, {duration: 600, easing: 'easeInOutCubic', delay: i*20});
	   //              }
    //             }

    //         }, 30);


    //         $container.velocity({translateX: [160, 0], translateY: [50, 0]}, {duration: 1800, easing: 'easeInOutCubic', delay: 1400, complete: function() {
    //             callback();
    //             $container.hide();
    //         }});
    //     }
        
    //     this.reset = function() {
    //       $container.css({width: 340, height: 110, top: '50%', left: '50%', marginLeft: -170,
    //             marginTop: -60, transform: $container.transform({x: 0, y: 0})});
    //       for(var i = 0; i < 68; i++) {
    //         _lines[i].outer.remove();
    //         var l = {
    //                 outer: createDiv(),
    //                 inner: createDiv()
    //             }
    //             l.outer.css({width: 5, height: 110, left: i*5});
    //             l.inner.css({background: Colors.white, width: 5, height: 110});
    //             $container.append(l.outer);
    //             l.outer.append(l.inner);
    //             _lines[i] = l;
    //       }
    //     }
    // }

    // function Explosion() {
    //     var $container;
    //     var _squares = [];

    //     (function() {
    //         initElements();
    //     })();

    //     function initElements() {
    //         $container = createDiv('container');
    //         $container.css({width: 10, height: 10, top: '50%', left: '50%', marginLeft: -12,
    //             marginTop: -12});
    //         $stage.append($container);
    //         $container.hide();

    //         for(var i = 0; i < 42; i++) {
    //             var s = {
    //                 el: createDiv(),
    //                 scale: 0.3 + Math.random()*0.7,
    //                 x: -200 + Math.random()*400,
    //                 y: -200 + Math.random()*400
    //             }
    //             s.el.css({width: 15, height: 15, backgroundColor: (-1+Math.random()*2 > 0) ? Colors.white : Colors.blue,
    //                 opacity: 0});
    //             $container.append(s.el);
    //             _squares.push(s);
    //         }
    //     }

    //     this.beginAnimation = function(callback) {
    //         $container.show();

    //         for(var i in _squares) {
    //         	if(typeof _squares[i] !== "function"){
	   //              _squares[i].el.show();
	   //              _squares[i].el.velocity({translateY: [_squares[i].y, 0], translateX: [_squares[i].x, 0], opacity: 1, scaleX: _squares[i].scale, scaleY: _squares[i].scale }, {duration: 500, easing: 'easeOutCubic'});
	   //              _squares[i].el.velocity({translateY: $(window).height()/2+50}, {duration: 500, easing: 'easeInCubic', delay: i*30});
    //             }
    //         }
          
    //       setTimeout(function() {
    //         callback();
    //         for(var i in _squares) {
    //     		if(typeof _squares[i] !== "function"){
    //           		_squares[i].el.hide();
    //           	}
    //         }
    //       }, 2400);
    //     }
    // }

    // function initVelocityAnim() {
    //     $stage = createDiv('stage').addClass('stage');
    //     $html.find('.l-top').prepend($stage);
    //     $stage.css({width: '100%', height: '100%'});
      
    //     $restart = createDiv('restart');
    //     $stage.append($restart);
    //     $restart.css({width: 100, height: 40, top: '50%', left: '50%', marginLeft: -50, marginTop: -20, letterSpacing: '1px', 
    //                   background: Colors.white, color: Colors.blue, fontSize: 22, textAlign: 'center', lineHeight: '40px',
    //                   cursor: 'pointer', opacity: 0});
    //     $restart.html('RESTART');
    //     $restart.on('click', restart);
    //     $restart.hide();

    //     var velocityScene = new VelocityScene();
    //     // var velocityMask = new VelocityMask();
    //     // var splitLines = new SplitLines();
    //     // var explosion = new Explosion();
        
    //     animate();
      
    //     function animate() {
    //       setTimeout(velocityScene.beginAnimation, 500);
    //       // setTimeout(velocityMask.animateIn, 1500);
    //       // setTimeout(function() {
    //       //     velocityScene.close(function() {
    //       //         splitLines.beginAnimation(function() {
    //       //           explosion.beginAnimation(showButton);
    //       //         });
    //       //         velocityMask.hide();
    //       //     });
    //       // }, 3500);
    //     }
        

    //     function showButton() {
    //       $restart.css({opacity: 0, transform: $restart.transform({scale: 1})});
    //       $restart.show();
    //       $restart.velocity({opacity: 1}, {duration: 1000});
    //     }

    //     function restart() {
    //       splitLines.reset();
    //       $restart.velocity({scaleX: [0, 1], scaleY: [0, 1]}, {duration: 100, complete: function() {
    //         animate();
    //         $restart.hide();
    //       }})
    //     }
    // }
    // initVelocityAnim();


	// Scroll
	//var $content_main = $('.content--main');
	//Array.prototype.clean = function(deleteValue) { for (var i = 0; i < this.length; i++) { if (this[i] == deleteValue) { this.splice(i, 1); i--; } } return this; };

});
