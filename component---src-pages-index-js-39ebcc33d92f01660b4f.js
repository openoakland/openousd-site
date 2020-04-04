(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{265:function(e,t,a){"use strict";a.r(t);var r=a(0),i=a.n(r),s=a(61),n=a(253),o=a(659),l=a(660),d=a.n(l),c=function(){var e=o.data;return i.a.createElement(d.a,{fluid:e.placeholderImage.childImageSharp.fluid})},A=a(251),u=(a(262),a(275)),f=a(277),p=a(261),g=a(276);t.default=function(){return i.a.createElement(n.a,{pageClassName:"index-page"},i.a.createElement(A.a,{title:"Home"}),i.a.createElement("div",{className:"hero mx-auto"},i.a.createElement(c,null)),i.a.createElement(u.a,{className:"px-0"},i.a.createElement(f.a,{className:"descriptions justify-content-center mx-0"},i.a.createElement(p.a,{xs:11,md:5,className:"px-md-5 py-md-4 px-3 py-3"},i.a.createElement("h1",{className:""},"What is OpenOUSD?"),i.a.createElement("p",null,"OpenOUSD is a project created out of OpenOakland, a volunteer run group with the mission of increasing access to government through technology. OpenOUSD aims to bring greater transparency to the Oakland Unified School District's central office so that the community can better participate in the discussions about how it can best serve our schools.")),i.a.createElement(p.a,{xs:11,md:5,className:"px-md-5 py-md-4 px-3 py-3"},i.a.createElement("h1",{className:""},"What are central programs?"),i.a.createElement("p",null,"We define a central program as any activity managed by OUSD's central office rather than individual school sites. For example, a staff member working at a school site but hired by the central office would be considered part of a central program. There are more than 50 centrally managed programs at OUSD."),i.a.createElement(s.Link,{to:"/central-programs/"},i.a.createElement(g.a,{variant:"primary",size:"lg",className:"cta"},"Explore OUSD's central programs"))))))}},659:function(e){e.exports=JSON.parse('{"data":{"placeholderImage":{"childImageSharp":{"fluid":{"base64":"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAOABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQFAf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIQAxAAAAFKhNdXRQT/xAAaEAACAgMAAAAAAAAAAAAAAAABEQIDABIx/9oACAEBAAEFAqyVsokh1ZJqXf/EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//EABoQAAICAwAAAAAAAAAAAAAAAAAhARAxQXH/2gAIAQEABj8CwoO7GIc1/8QAGxABAAICAwAAAAAAAAAAAAAAAQARMUEhYdH/2gAIAQEAAT8hVRLh6ljQawHkxS3ca3tEgcFaIrj/2gAMAwEAAgADAAAAEPAf/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAERIf/aAAgBAwEBPxBx7aYf/8QAGREAAgMBAAAAAAAAAAAAAAAAAREAIVGh/9oACAECAQE/EA1VCI7yf//EAB0QAQADAAIDAQAAAAAAAAAAAAEAESExUUFhkcH/2gAIAQEAAT8QMblScupTCe05XFdN/I3EJSCtiIALS2ir3x7l2EDAAc4+S1Wrey5//9k=","aspectRatio":1.3909395973154361,"src":"/openousd-site/static/8536cebd715aa517ba39f851420f144f/8302c/mural.jpg","srcSet":"/openousd-site/static/8536cebd715aa517ba39f851420f144f/4cd1e/mural.jpg 375w,\\n/openousd-site/static/8536cebd715aa517ba39f851420f144f/9f583/mural.jpg 750w,\\n/openousd-site/static/8536cebd715aa517ba39f851420f144f/8302c/mural.jpg 829w","sizes":"(max-width: 829px) 100vw, 829px"}}}}}')},660:function(e,t,a){"use strict";a(6),a(5),a(3),a(57),a(128),a(189);var r=a(15);t.__esModule=!0,t.default=void 0;var i,s=r(a(101)),n=r(a(100)),o=r(a(181)),l=r(a(124)),d=r(a(0)),c=r(a(35)),A=function(e){var t=(0,l.default)({},e),a=t.resolutions,r=t.sizes,i=t.critical;return a&&(t.fixed=a,delete t.resolutions),r&&(t.fluid=r,delete t.sizes),i&&(t.loading="eager"),t.fluid&&(t.fluid=S([].concat(t.fluid))),t.fixed&&(t.fixed=S([].concat(t.fixed))),t},u=function(e){var t=e.fluid,a=e.fixed;return(t&&t[0]||a&&a[0]).src},f=Object.create({}),p=function(e){var t=A(e),a=u(t);return f[a]||!1},g="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,m="undefined"!=typeof window,h=m&&window.IntersectionObserver,b=new WeakMap;function E(e){return e.map((function(e){var t=e.src,a=e.srcSet,r=e.srcSetWebp,i=e.media,s=e.sizes;return d.default.createElement(d.default.Fragment,{key:t},r&&d.default.createElement("source",{type:"image/webp",media:i,srcSet:r,sizes:s}),d.default.createElement("source",{media:i,srcSet:a,sizes:s}))}))}function S(e){var t=[],a=[];return e.forEach((function(e){return(e.media?t:a).push(e)})),[].concat(t,a)}function y(e){return e.map((function(e){var t=e.src,a=e.media,r=e.tracedSVG;return d.default.createElement("source",{key:t,media:a,srcSet:r})}))}function w(e){return e.map((function(e){var t=e.src,a=e.media,r=e.base64;return d.default.createElement("source",{key:t,media:a,srcSet:r})}))}function v(e,t){var a=e.srcSet,r=e.srcSetWebp,i=e.media,s=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(i?'media="'+i+'" ':"")+'srcset="'+(t?r:a)+'" '+(s?'sizes="'+s+'" ':"")+"/>"}var I=function(e,t){var a=(void 0===i&&"undefined"!=typeof window&&window.IntersectionObserver&&(i=new window.IntersectionObserver((function(e){e.forEach((function(e){if(b.has(e.target)){var t=b.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(i.unobserve(e.target),b.delete(e.target),t())}}))}),{rootMargin:"200px"})),i);return a&&(a.observe(e),b.set(e,t)),function(){a.unobserve(e),b.delete(e)}},O=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",r=e.srcSet?'srcset="'+e.srcSet+'" ':"",i=e.title?'title="'+e.title+'" ':"",s=e.alt?'alt="'+e.alt+'" ':'alt="" ',n=e.width?'width="'+e.width+'" ':"",o=e.height?'height="'+e.height+'" ':"",l=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",d=e.loading?'loading="'+e.loading+'" ':"",c=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?v(e,!0):"")+v(e)})).join("")+"<img "+d+n+o+a+r+t+s+i+l+c+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},j=function(e){var t=e.src,a=e.imageVariants,r=e.generateSources,i=e.spreadProps,s=d.default.createElement(C,(0,l.default)({src:t},i));return a.length>1?d.default.createElement("picture",null,r(a),s):s},C=d.default.forwardRef((function(e,t){var a=e.sizes,r=e.srcSet,i=e.src,s=e.style,n=e.onLoad,c=e.onError,A=e.onClick,u=e.loading,f=e.draggable,p=(0,o.default)(e,["sizes","srcSet","src","style","onLoad","onError","onClick","loading","draggable"]);return d.default.createElement("img",(0,l.default)({sizes:a,srcSet:r,src:i},p,{onLoad:n,onError:c,onClick:A,ref:t,loading:u,draggable:f,style:(0,l.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},s)}))}));C.propTypes={style:c.default.object,onError:c.default.func,onClick:c.default.func,onLoad:c.default.func};var x=function(e){function t(t){var a;(a=e.call(this,t)||this).seenBefore=m&&p(t),a.isCritical="eager"===t.loading||t.critical,a.addNoScript=!(a.isCritical&&!t.fadeIn),a.useIOSupport=!g&&h&&!a.isCritical&&!a.seenBefore;var r=a.isCritical||m&&(g||!a.useIOSupport);return a.state={isVisible:r,imgLoaded:!1,imgCached:!1,fadeIn:!a.seenBefore&&t.fadeIn},a.imageRef=d.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,s.default)(a)),a.handleRef=a.handleRef.bind((0,s.default)(a)),a}(0,n.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:p(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},a.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=I(e,(function(){var e=p(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){return t.setState({imgLoaded:e,imgCached:!!t.imageRef.current.currentSrc})}))})))},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=A(e),a=u(t),f[a]=!0,this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=A(this.props),t=e.title,a=e.alt,r=e.className,i=e.style,s=void 0===i?{}:i,n=e.imgStyle,o=void 0===n?{}:n,c=e.placeholderStyle,u=void 0===c?{}:c,f=e.placeholderClassName,p=e.fluid,g=e.fixed,m=e.backgroundColor,h=e.durationFadeIn,b=e.Tag,S=e.itemProp,v=e.loading,I=e.draggable,x=!1===this.state.fadeIn||this.state.imgLoaded,N=!0===this.state.fadeIn&&!this.state.imgCached,R=(0,l.default)({opacity:x?1:0,transition:N?"opacity "+h+"ms":"none"},o),L="boolean"==typeof m?"lightgray":m,B={transitionDelay:h+"ms"},k=(0,l.default)({opacity:this.state.imgLoaded?0:1},N&&B,{},o,{},u),Q={title:t,alt:this.state.isVisible?"":a,style:k,className:f,itemProp:S};if(p){var V=p,D=V[0];return d.default.createElement(b,{className:(r||"")+" gatsby-image-wrapper",style:(0,l.default)({position:"relative",overflow:"hidden"},s),ref:this.handleRef,key:"fluid-"+JSON.stringify(D.srcSet)},d.default.createElement(b,{style:{width:"100%",paddingBottom:100/D.aspectRatio+"%"}}),L&&d.default.createElement(b,{title:t,style:(0,l.default)({backgroundColor:L,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},N&&B)}),D.base64&&d.default.createElement(j,{src:D.base64,spreadProps:Q,imageVariants:V,generateSources:w}),D.tracedSVG&&d.default.createElement(j,{src:D.tracedSVG,spreadProps:Q,imageVariants:V,generateSources:y}),this.state.isVisible&&d.default.createElement("picture",null,E(V),d.default.createElement(C,{alt:a,title:t,sizes:D.sizes,src:D.src,crossOrigin:this.props.crossOrigin,srcSet:D.srcSet,style:R,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,onClick:this.props.onClick,itemProp:S,loading:v,draggable:I})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:O((0,l.default)({alt:a,title:t,loading:v},D,{imageVariants:V}))}}))}if(g){var z=g,T=z[0],P=(0,l.default)({position:"relative",overflow:"hidden",display:"inline-block",width:T.width,height:T.height},s);return"inherit"===s.display&&delete P.display,d.default.createElement(b,{className:(r||"")+" gatsby-image-wrapper",style:P,ref:this.handleRef,key:"fixed-"+JSON.stringify(T.srcSet)},L&&d.default.createElement(b,{title:t,style:(0,l.default)({backgroundColor:L,width:T.width,opacity:this.state.imgLoaded?0:1,height:T.height},N&&B)}),T.base64&&d.default.createElement(j,{src:T.base64,spreadProps:Q,imageVariants:z,generateSources:w}),T.tracedSVG&&d.default.createElement(j,{src:T.tracedSVG,spreadProps:Q,imageVariants:z,generateSources:y}),this.state.isVisible&&d.default.createElement("picture",null,E(z),d.default.createElement(C,{alt:a,title:t,width:T.width,height:T.height,sizes:T.sizes,src:T.src,crossOrigin:this.props.crossOrigin,srcSet:T.srcSet,style:R,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,onClick:this.props.onClick,itemProp:S,loading:v,draggable:I})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:O((0,l.default)({alt:a,title:t,loading:v},T,{imageVariants:z}))}}))}return null},t}(d.default.Component);x.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var N=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string}),R=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string});x.propTypes={resolutions:N,sizes:R,fixed:c.default.oneOfType([N,c.default.arrayOf(N)]),fluid:c.default.oneOfType([R,c.default.arrayOf(R)]),fadeIn:c.default.bool,durationFadeIn:c.default.number,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,crossOrigin:c.default.oneOfType([c.default.string,c.default.bool]),style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,onClick:c.default.func,onStartLoad:c.default.func,Tag:c.default.string,itemProp:c.default.string,loading:c.default.oneOf(["auto","lazy","eager"]),draggable:c.default.bool};var L=x;t.default=L}}]);
//# sourceMappingURL=component---src-pages-index-js-39ebcc33d92f01660b4f.js.map