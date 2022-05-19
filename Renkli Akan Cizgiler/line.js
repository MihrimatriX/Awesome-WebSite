"use strict";(function(){var k=false;var s;var g;function h(){s=document.createElement("div");s.style.width="100%";s.style.height="100%";s.id="chromadrencher";if(k){F(s);t()}else{p(s);t()}}function p(H){g=document.createElement("canvas");g.style.width="100%";g.style.height="100%";g.style.backgroundColor="#000";H.appendChild(g);var G=document.getElementsByTagName("script");var I=G[G.length-1];I.parentNode.insertBefore(H,I);var J=g.getBoundingClientRect();g.width=J.width||100;g.height=J.height||100;window.addEventListener("resize",a,false)}var x;var z;var C;function F(I){var H=document.getElementsByTagName("script");var J=H[H.length-1];J.parentNode.insertBefore(I,J);var K=I.getBoundingClientRect();var L=K.width;var G=K.height;C=new THREE.Scene();z=new THREE.OrthographicCamera(L/-2,L/2,G/2,G/-2,0,30);z.rotation.z=Math.PI;z.position.x=L/2;z.position.y=G/2;z.position.z=10;x=new THREE.WebGLRenderer();x.setSize(L,G);I.appendChild(x.domElement);x.render(C,z);window.addEventListener("resize",a,false);g=x.domElement}function f(H,G){H=Math.ceil(H);G=Math.floor(G);return Math.floor(Math.random()*(G-H+1))+H}Array.prototype.shuffle=function(){var I=this.length,H,G;if(I==0){return this}while(--I){H=Math.floor(Math.random()*(I+1));G=this[I];this[I]=this[H];this[H]=G}return this};var A={linedensity:100,lineheight:1024,linewidth:2,tipheight:64,linespeed:10,cspeed:30,linecount:null,tipcount:0,line:null,tip:null,fadeB:null,fadeT:null,cs:null,cs2:null,csback:null,linebatch:null,linebatchS:null,ctime:null,cup:null,linelist:[],frameID:0,fps:0,fpslock:true};function B(){var G="precision highp float;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;attribute vec3 position;attribute vec4 acolor;attribute vec3 offset;attribute float opacity;varying vec4 vacolor;varying float op;void main() {vacolor = acolor;op = opacity;vec4 modelViewPosition = modelViewMatrix * vec4(offset + position, 1.0);gl_Position = projectionMatrix * modelViewPosition;}";var I="precision highp float;varying vec4 vacolor;varying float op;void main() {gl_FragColor = vacolor;gl_FragColor.a *= op;}";var H=new THREE.RawShaderMaterial({vertexShader:G,fragmentShader:I,transparent:true});return H}function i(){var G="precision highp float;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;attribute vec3 position;void main() {vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);gl_Position = projectionMatrix * modelViewPosition;}";var I="precision highp float;uniform vec3 acolor[5];uniform vec3 acolor2[5];uniform float alen;uniform float alen2;uniform float opacity;uniform vec2 resolution;void main() {float div1 = 1.0/(alen-1.0);float div2 = 1.0/(alen2-1.0);float x = gl_FragCoord.x / resolution.x;vec3 color1 = mix(acolor[0],acolor[1], smoothstep(0.0, div1, x));color1 = mix(color1,acolor[2], smoothstep(div1, div1*2.0, x));color1 = mix(color1,acolor[3], smoothstep(div1*2.0, div1*3.0, x));color1 = mix(color1,acolor[4], smoothstep(div1*3.0, div1*4.0, x));vec3 color2 = mix(acolor2[0],acolor2[1], smoothstep(0.0, div2, x));color2 = mix(color2,acolor2[2], smoothstep(div2, div2*2.0, x));color2 = mix(color2,acolor2[3], smoothstep(div2*2.0, div2*3.0, x));color2 = mix(color2,acolor2[4], smoothstep(div2*3.0, div2*4.0, x));gl_FragColor = vec4(mix(color1/255.0, color2/255.0, opacity), 1.0);}";var H=new THREE.RawShaderMaterial({vertexShader:G,fragmentShader:I,transparent:true,blending:THREE.MultiplyBlending,uniforms:{acolor:{value:new Float32Array(5*3)},acolor2:{value:new Float32Array(5*3)},alen:{value:3},alen2:{value:2},opacity:{value:1},resolution:{value:new THREE.Vector2()}}});return H}function e(M,H,G,I,L,K,P){var N=new THREE.InstancedBufferGeometry();var J=new Float32Array([0,0,0,M,0,0,0,H,0,0,H,0,M,0,0,M,H,0]);var O=new Float32Array([G,I,L,K,G,I,L,K,G,I,L,P,G,I,L,P,G,I,L,K,G,I,L,P]);N.addAttribute("position",new THREE.BufferAttribute(J,3));N.addAttribute("acolor",new THREE.BufferAttribute(O,4));return N}function w(O,I,G,J,M,L,H){var K=document.createElement("canvas");K.width=O;K.height=I;var P=K.getContext("2d");var N=P.createLinearGradient(0,0,0,I);N.addColorStop(0,"rgba("+G+","+J+","+M+","+L+")");N.addColorStop(1,"rgba("+G+","+J+","+M+","+H+")");P.fillStyle=N;P.fillRect(0,0,O,I);return K}function y(){var G=[[255,40,100],[255,255,0],[255,150,0],[150,0,255],[150,255,100],[255,0,200],[40,100,255]];G.shuffle();var H=f(3,5);G=G.slice(0,H);return G}function v(K){var O=g.width;var H=g.height;var J;if(K){J=A.cs}else{J=A.cs2}var I=y();var P=J.getContext("2d");P.clearRect(0,0,O,H);var L=O/(I.length-1);var M=0;var N=P.createLinearGradient(0,0,O,0);for(var G=0;G<I.length;G++){N.addColorStop(M,"rgb("+I[G][0]+","+I[G][1]+","+I[G][2]+")");M=M+((L)/O)}P.fillStyle=N;P.fillRect(0,0,O,H);return J}function b(J){var I=y();var G=I.length;var H;for(H=0;H<G;++H){if(J){A.csback.material.uniforms.acolor.value.set(I[H],H*3)}else{A.csback.material.uniforms.acolor2.value.set(I[H],H*3)}}if(J){A.csback.material.uniforms.alen.value=G}else{A.csback.material.uniforms.alen2.value=G}}function E(){A.linecount=A.linedensity*g.width/100;if(A.linelist.length==A.linecount){return}A.tipcount=0;while(A.linelist.length<A.linecount){var H={};H.x=f(0,g.width);H.y=f(0-A.lineheight,g.height);H.sp=5*Math.random()+3;H.op=f(25,255);H.tip=false;H.alpha=f(25,100)/255;if(f(1,10)==10){H.tip=true;H.alpha=220/255}A.linelist.push(H)}while(A.linelist.length>A.linecount){A.linelist.pop()}var G;for(G=A.linelist.length-1;G>=0;G--){if(A.linelist[G].tip){A.tipcount++}}}function d(T){E();A.ctime=0;A.cup=1;var L=A.linelist.length;var O=e(2,1024,1,1,1,0,1);var V=e(2,64,1,1,1,0,1);O.maxInstancedCount=L;var Z=O.addAttribute("opacity",new THREE.InstancedBufferAttribute(new Float32Array(L),1,1));O.addAttribute("offset",new THREE.InstancedBufferAttribute(new Float32Array(3*L),3,1));O.getAttribute("offset").dynamic=true;V.maxInstancedCount=A.tipcount;V.addAttribute("opacity",new THREE.InstancedBufferAttribute(new Float32Array(L),1,1));V.addAttribute("offset",new THREE.InstancedBufferAttribute(new Float32Array(3*L),3,1));V.getAttribute("offset").dynamic=true;var G=B();var Y=new THREE.Mesh(O,G);var M=new THREE.Mesh(V,G);Y.scale.x=A.linewidth/2;M.scale.x=A.linewidth/2;Y.scale.y=A.lineheight/1024;M.scale.y=A.tipheight/64;M.position.z=2;C.add(Y);C.add(M);if(!T){var R=new THREE.PlaneGeometry(g.width,g.height);var I=i();I.uniforms.resolution.value.set(g.width,g.height);var aa=new THREE.Mesh(R,I);aa.position.x=g.width/2;aa.position.y=g.height/2;aa.position.z=1;C.add(aa);A.csback=aa;b(true);b(false)}else{C.add(A.csback)}A.line={geo:O,obj:Y};A.tip={geo:V,obj:M};var N=A.line.geo.getAttribute("opacity").array;var K=A.tip.geo.getAttribute("opacity").array;var Q=0;var J=0;var X,W;for(X=A.linelist.length-1;X>=0;X--){W=A.linelist[X];N[Q++]=W.alpha;if(W.tip){K[J++]=0.6274509}}A.line.geo.getAttribute("opacity").needsUpdate=true;A.tip.geo.getAttribute("opacity").needsUpdate=true;var S=e(g.width,g.height/2,0,0,0,0,1);S.maxInstancedCount=1;S.addAttribute("opacity",new THREE.InstancedBufferAttribute(new Float32Array([1]),1,1));S.addAttribute("offset",new THREE.InstancedBufferAttribute(new Float32Array([0,0,0]),3,1));var H=new THREE.Mesh(S,G);H.position.z=3;H.position.y=g.height/2;var P=e(g.width,g.height/4,0,0,0,0.7,0);P.maxInstancedCount=1;P.addAttribute("opacity",new THREE.InstancedBufferAttribute(new Float32Array([1]),1,1));P.addAttribute("offset",new THREE.InstancedBufferAttribute(new Float32Array([0,0,0]),3,1));var U=new THREE.Mesh(P,G);U.position.z=3;C.add(H);C.add(U)}function n(){var I=A.line.geo.getAttribute("offset").array;var M=A.tip.geo.getAttribute("offset").array;var G=0,N=0;var J=2/A.linewidth;var H=1024/A.lineheight;var O=64/A.tipheight;var L,K;for(L=A.linelist.length-1;L>=0;L--){K=A.linelist[L];I[G++]=K.x*J;I[G++]=K.y*H;G++;if(K.tip){M[N++]=K.x*J;M[N++]=(K.y+A.lineheight-A.tipheight)*O;N++}}A.line.geo.getAttribute("offset").needsUpdate=true;A.tip.geo.getAttribute("offset").needsUpdate=true;A.csback.material.uniforms.opacity.value=A.ctime/255;x.render(C,z)}function r(){A.line=w(A.linewidth,A.lineheight,255,255,255,0,1);A.tip=w(A.linewidth,A.tipheight,255,255,255,0,1);A.fadeB=w(g.width,g.height/2,0,0,0,0,1);A.fadeT=w(g.width,g.height/4,0,0,0,0.7,0);A.cs=document.createElement("canvas");A.cs.width=g.width;A.cs.height=g.height;v(true);A.cs2=document.createElement("canvas");A.cs2.width=g.width;A.cs2.height=g.height;v(false);A.csback=document.createElement("canvas");A.csback.width=g.width;A.csback.height=g.height;E();A.ctime=0;A.cup=1}function l(K){var I,H,G,J;G=g.width;J=g.height;for(I=A.linelist.length-1;I>=0;I--){H=A.linelist[I];H.y=H.y+(H.sp*A.linespeed)*K;if(H.y>J){H.y=0-A.lineheight}}A.ctime=A.ctime+(A.cup*A.cspeed*K);if(A.ctime>255){A.ctime=255;A.cup=-1;if(k){b(true)}else{v(true)}}if(A.ctime<0){A.ctime=0;A.cup=1;if(k){b(false)}else{v(false)}}}function q(L){var J,I,H,M,G,K;G=g.width;K=g.height;H=g.getContext("2d");H.fillStyle="#000";H.fillRect(0,0,G,K);for(J=A.linelist.length-1;J>=0;J--){I=A.linelist[J];H.globalAlpha=I.alpha;H.drawImage(A.line,G-I.x,I.y)}H.globalAlpha=1;M=A.csback.getContext("2d");M.globalAlpha=1;M.drawImage(A.cs,0,0,G,K);M.globalAlpha=A.ctime/255;M.drawImage(A.cs2,0,0,G,K);H.globalCompositeOperation="multiply";H.drawImage(A.csback,0,0,G,K);H.globalCompositeOperation="source-over";H.globalAlpha=0.6274509;for(J=A.linelist.length-1;J>=0;J--){I=A.linelist[J];if(I.tip){H.drawImage(A.tip,G-I.x,I.y+A.lineheight-A.tipheight)}}H.globalAlpha=1;H.drawImage(A.fadeT,0,0);H.drawImage(A.fadeB,0,K-A.fadeB.height)}function D(G){if(G!=A.linedensity){A.linedensity=G;E()}if(k){while(C.children.length>0){C.remove(C.children[0])}d(true)}}function u(J){if(J!=A.lineheight){var G=A.lineheight;A.lineheight=J;if(A.lineheight<128){A.tipheight=A.lineheight/2}else{A.tipheight=64}if(k){A.line.obj.scale.y=J/1024;A.tip.obj.scale.y=A.tipheight/64}else{A.line=w(A.linewidth,A.lineheight,255,255,255,0,1);A.tip=w(A.linewidth,A.tipheight,255,255,255,0,1)}for(var I=0;I<A.linelist.length;I++){var H=A.linelist[I];H.y=H.y+(G-A.lineheight);if((G>J)&&(H.y>g.height)){H.y=0-A.lineheight-(H.y-g.height)}}}}function j(G){if(G<=0||G>8){return}A.linewidth=G;if(k){A.line.obj.scale.x=G/2;A.tip.obj.scale.x=G/2}else{A.line=w(A.linewidth,A.lineheight,255,255,255,0,1);A.tip=w(A.linewidth,A.tipheight,255,255,255,0,1)}}function m(G){if(G!=A.linespeed){A.linespeed=G/3}}function c(G){if(G!=A.cspeed){A.cspeed=G}}function o(G){if((k&&G)||(!k&&!G)){return}window.cancelAnimationFrame(A.frameID);if(s){document.body.removeChild(s)}if(x){x.dispose();x.forceContextLoss();x=null}if(!k&&G){console.log("Enabling WebGL");k=true;h()}if(k&&!G){console.log("Enabling Canvas");k=false;h()}}function a(){if(k){var H=s.getBoundingClientRect();var G=H.width;var J=H.height;z.left=G/-2;z.right=G/2;z.top=J/2;z.bottom=J/-2;z.updateProjectionMatrix();z.position.x=G/2;z.position.y=J/2;x.setSize(G,J);while(C.children.length>0){C.remove(C.children[0])}d()}else{var H=g.getBoundingClientRect();g.width=H.width;g.height=H.height;r()}var I;for(I=A.linelist.length-1;I>=0;I--){A.linelist[I].x=f(0,g.width);A.linelist[I].y=f(0-A.lineheight,g.height)}}function t(){if(k){d()}else{r()}var H=performance.now()/1000;var I=0;A.frameID=window.requestAnimationFrame(G);function G(){A.frameID=window.requestAnimationFrame(G);var J=performance.now()/1000;var K=Math.min(J-H,1);H=J;if(A.fps>0&&A.fpslock){I+=K;if(I<1/A.fps){return}I-=1/A.fps}if(k){l(K);n()}else{l(K);q(K)}}}window.wallpaperPropertyListener={applyUserProperties:function(G){if(G.linecount){D(G.linecount.value)}if(G.lineheight){u(G.lineheight.value)}if(G.linewidth){j(G.linewidth.value)}if(G.linespeed){m(G.linespeed.value)}if(G.colorspeed){c(G.colorspeed.value)}if(G.fpslock){A.fpslock=G.fpslock.value}if(G.rendererpick){var H=G.rendererpick.value;if(H==1){o(true)}if(H==2){o(false)}}},applyGeneralProperties:function(G){if(G.fps){A.fps=G.fps}}};console.log("Chroma Drencher v1.1");h()})();