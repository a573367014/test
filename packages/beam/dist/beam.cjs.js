"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const F={DataBuffers:"DataBuffers",IndexBuffer:"IndexBuffer",Uniforms:"Uniforms",Textures:"Textures",OffscreenTarget:"OffscreenTarget"},p={vec4:"vec4",vec3:"vec3",vec2:"vec2",int:"int",float:"float",mat4:"mat4",mat3:"mat3",mat2:"mat2",tex2D:"tex2D",texCube:"texCube"},m={Triangles:"Triangles",Lines:"Lines",Repeat:"Repeat",MirroredRepeat:"MirroredRepeat",ClampToEdge:"ClampToEdge",Nearest:"Nearest",Linear:"Linear",NearestMipmapNearest:"NearestMipmapNearest",LinearMipmapNearest:"LinearMipmapNearest",NearestMipmapLinear:"NearestMipmapLinear",LinearMipmapLinear:"LinearMipmapLinear",RGB:"RGB",RGBA:"RGBA",SRGB:"SRGB"},w={contextAttributes:{},extensions:["OES_element_index_uint","WEBGL_depth_texture"]},b=e=>(e&e-1)===0,h=(e,t)=>Object.keys(e).reduce((r,n)=>({...r,[n]:t(e,n)}),{}),H=e=>{const{vec2:t,vec3:r,vec4:n,float:s}=p;return{[t]:2,[r]:3,[n]:4,[s]:1}[e]},Y=e=>{const t=F;let[r,n,s,a]=[{},null,{},{}];for(let f=0;f<e.length;f++){const o=e[f],{type:u}=o;u===t.DataBuffers?r={...r,...o.buffers}:u===t.IndexBuffer?n=o:u===t.Uniforms?s={...s,...o.state}:u===t.Textures&&(a={...a,...o.textures})}return[r,n,s,a]},N=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),y=e=>e.getContext("webgl"),W=(e,t)=>{const r={};return t.extensions.forEach(n=>{r[n]=e.getExtension(n)}),r},M=(e,t,r)=>{const n=e.createShader(t);return e.shaderSource(n,r),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS)?n:(console.error("Error compiling shaders",e.getShaderInfoLog(n)),e.deleteShader(n),null)},V=(e,t,r,n)=>{const s=Object.keys(t).reduce((u,_)=>t[_]?u+`#define ${_} ${t[_]}
`:"",""),a=M(e,e.VERTEX_SHADER,s+r),f=M(e,e.FRAGMENT_SHADER,s+n),o=e.createProgram();return e.attachShader(o,a),e.attachShader(o,f),e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS)?o:(console.error("Error initing program",e.getProgramInfoLog(o)),null)},j=(e,t,r,n,s)=>{const a=V(e,t,n,s),f=h(r.buffers,(u,_)=>({type:u[_].type,location:e.getAttribLocation(a,_)})),o=h({...r.uniforms,...r.textures},(u,_)=>({type:u[_].type,location:e.getUniformLocation(a,_)}));return{program:a,attributes:f,uniforms:o}},z=(e,t)=>{const[r,n,s,a]=t;e.viewport(0,0,e.canvas.width,e.canvas.height),e.clearColor(r,n,s,a),e.clearDepth(1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST)},$=(e,t)=>{const r={};return Object.keys(t).forEach(s=>{const a=e.createBuffer();r[s]=a,P(e,r[s],t[s])}),r},P=(e,t,r)=>{const n=r instanceof Float32Array?r:new Float32Array(r);e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,n,e.STATIC_DRAW)},K=(e,t)=>{e.deleteBuffer(t)},Z=(e,t)=>{const{array:r}=t,n=e.createBuffer();return S(e,n,r),n},S=(e,t,r)=>{const n=r instanceof Uint32Array?r:new Uint32Array(r);e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t),e.bufferData(e.ELEMENT_ARRAY_BUFFER,n,e.STATIC_DRAW)},q=(e,t)=>{e.deleteBuffer(t)},J=e=>{const{extensions:t}=e;return!N&&t.EXT_SRGB?t.EXT_SRGB.SRGB_EXT:e.RGBA},Q=e=>{const{extensions:t}=e;return!N&&t.EXT_SRGB?t.EXT_SRGB.SRGB_ALPHA_EXT:e.RGBA},I=e=>t=>({[m.Repeat]:e.REPEAT,[m.MirroredRepeat]:e.MIRRORED_REPEAT,[m.ClampToEdge]:e.CLAMP_TO_EDGE,[m.Linear]:e.LINEAR,[m.Nearest]:e.NEAREST,[m.NearestMipmapNearest]:e.NEAREST_MIPMAP_NEAREST,[m.LinearMipmapNearest]:e.LINEAR_MIPMAP_NEAREST,[m.NearestMipmapLinear]:e.NEAREST_MIPMAP_LINEAR,[m.LinearMipmapLinear]:e.LINEAR_MIPMAP_LINEAR,[m.RGB]:e.RGB,[m.RGBA]:e.RGBA,[m.SRGB]:J(e),[m.SRGBA]:Q(e)})[t],X=(e,t)=>{const r=e.createTexture();return C(e,r,t),r},L=(e,t)=>{const r=e.createTexture();return G(e,r,t),r},k=(e,t)=>{const r={};return Object.keys(t).forEach(n=>{const s=t[n].image?X(e,t[n]):L(e,t[n]);r[n]=s}),r},D=e=>e&&b(e.width)&&b(e.height)&&e.nodeName!=="VIDEO",C=(e,t,r)=>{const n=I(e),{image:s,flip:a,space:f}=r;let{wrapS:o,wrapT:u,minFilter:_,magFilter:U}=r;if(e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,t),s){a&&e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0);const A=n(f||m.RGBA);e.texImage2D(e.TEXTURE_2D,0,A,A,e.UNSIGNED_BYTE,s),D(s)&&e.generateMipmap(e.TEXTURE_2D),D(s)||(o||(o=m.ClampToEdge),u||(u=m.ClampToEdge),_||(_=m.Linear))}return o&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,n(o)),u&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,n(u)),_&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n(_)),U&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,n(U)),t},G=(e,t,r)=>{const n=I(e),{images:s,level:a,flip:f,wrapS:o,wrapT:u,minFilter:_,magFilter:U,space:A}=r;if(e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_CUBE_MAP,t),o&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_S,n(o)),u&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_T,n(u)),_&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MIN_FILTER,n(_)),U&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAG_FILTER,n(U)),s){f&&e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0);const i=[e.TEXTURE_CUBE_MAP_POSITIVE_X,e.TEXTURE_CUBE_MAP_NEGATIVE_X,e.TEXTURE_CUBE_MAP_POSITIVE_Y,e.TEXTURE_CUBE_MAP_NEGATIVE_Y,e.TEXTURE_CUBE_MAP_POSITIVE_Z,e.TEXTURE_CUBE_MAP_NEGATIVE_Z];let T=0;const R=n(A||m.RGBA);for(let d=0;d<i.length;d++)for(let c=0;c<=a;c++){const E=i[d];e.texImage2D(E,c,R,R,e.UNSIGNED_BYTE,s[T]),T++}}return t},l=(e,t)=>{e.deleteTexture(t)},g=(e,t)=>{const r=e.createFramebuffer(),n=e.createRenderbuffer(),s=e.createTexture(),a=null,{size:f}=t;e.bindTexture(e.TEXTURE_2D,s),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,f,f,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.bindRenderbuffer(e.RENDERBUFFER,n),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT16,f,f),e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,s,0),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,n);const o=e.checkFramebufferStatus(e.FRAMEBUFFER);return e.FRAMEBUFFER_COMPLETE!==o&&console.error("Frame buffer object is incomplete: "+o.toString()),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindTexture(e.TEXTURE_2D,null),e.bindRenderbuffer(e.RENDERBUFFER,null),{fbo:r,rbo:n,colorTexture:s,depthTexture:a}},ee=(e,t)=>{const{size:r}=t,n=e.createFramebuffer(),s=null,a=e.createTexture(),f=e.createTexture();e.bindTexture(e.TEXTURE_2D,a),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,r,r,0,e.RGBA,e.UNSIGNED_BYTE,null),e.bindTexture(e.TEXTURE_2D,f),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT,r,r,0,e.DEPTH_COMPONENT,e.UNSIGNED_SHORT,null),e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,f,0);const o=e.checkFramebufferStatus(e.FRAMEBUFFER);return o!==e.FRAMEBUFFER_COMPLETE&&console.error("framebuffer not complete",o.toString()),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),{fbo:n,rbo:s,colorTexture:a,depthTexture:f}},te=(e,t)=>t.depth?ee(e,t):g(e,t),re=(e,t,r)=>r!==void 0?r:e.uniforms[t].default,ne=(e,t,r,n,s,a)=>{const{schema:f,shaderRefs:o}=t;e.useProgram(o.program),Object.keys(o.attributes).forEach(R=>{if(!f.buffers[R]||f.buffers[R].type===p.index)return;const{location:d}=o.attributes[R],{n:c,type:E}=f.buffers[R],x=c||H(E);e.bindBuffer(e.ARRAY_BUFFER,r[R]),e.vertexAttribPointer(d,x,e.FLOAT,!1,0,0),e.enableVertexAttribArray(d)});const{buffer:u,state:_}=n,{offset:U,count:A}=_;e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,u);let i=-1;Object.keys(o.uniforms).forEach(R=>{const{type:d,location:c}=o.uniforms[R];let E;const x=d===p.tex2D||d===p.texCube;x||(E=re(f,R,s[R]));const v={[p.vec4]:()=>e.uniform4fv(c,E),[p.vec3]:()=>e.uniform3fv(c,E),[p.vec2]:()=>e.uniform2fv(c,E),[p.int]:()=>{!E||typeof E=="number"||typeof E=="string"?e.uniform1i(c,E):e.uniform1iv(c,E)},[p.float]:()=>{!E||typeof E=="number"||typeof E=="string"?e.uniform1f(c,E):e.uniform1fv(c,E)},[p.mat4]:()=>e.uniformMatrix4fv(c,!1,E),[p.mat3]:()=>e.uniformMatrix3fv(c,!1,E),[p.mat2]:()=>e.uniformMatrix2fv(c,!1,E),[p.tex2D]:()=>{i++;const B=a[R];B||console.warn(`Missing texture ${R} at unit ${i}`),e.uniform1i(c,i),e.activeTexture(e.TEXTURE0+i),e.bindTexture(e.TEXTURE_2D,B)},[p.texCube]:()=>{i++;const B=a[R];B||console.warn(`Missing texture ${R} at unit ${i}`),e.uniform1i(c,i),e.activeTexture(e.TEXTURE0+i),e.bindTexture(e.TEXTURE_CUBE_MAP,B)}};(E!==void 0||x)&&v[d]()});const T=f.mode===m.Triangles?e.TRIANGLES:e.LINES;e.drawElements(T,A,e.UNSIGNED_INT,U*4)};class se{constructor(t,r){this.beam=t;const{buffers:n={},uniforms:s={},textures:a={},mode:f=m.Triangles}=r;this.schema={buffers:n,uniforms:s,textures:a,mode:f};const{vs:o,fs:u,defines:_={}}=r;this.shaderRefs=j(t.gl,_,this.schema,o,u)}set(){}}const oe=(e,t,r)=>{const n=F;class s{constructor(){this.state=r,this.type=t}set(i,T){return this.state[i]=T,this}}class a extends s{constructor(){super(),this.buffers=$(e,r)}set(i,T){return this.state[i]=T,P(e,this.buffers[i],T),this}destroy(i){K(e,this.buffers[i]),delete this.state[i]}}class f extends s{constructor(){super();const{offset:i=0,count:T=r.array.length}=r;this.state.offset=i,this.state.count=T,this.buffer=Z(e,r)}set(i){const{offset:T=0,count:R=i.array.length}=i;return this.state.offset=T,this.state.count=R,S(e,this.buffer,i.array),this}destroy(){q(e,this.buffer),delete this.state}}class o extends s{}class u extends s{constructor(){super(),this.textures=k(e,r)}set(i,T){const{textures:R,state:d}=this,c=d[i];let E;if(T.constructor.name!=="Object"){const x=T;E=x.state.depth?x.depthTexture:x.colorTexture}else if(c){const x={...T,flip:c.flip,space:T.space||c.space};c.image?E=C(e,R[i],x):E=G(e,R[i],x)}else E=T.image?X(e,T):L(e,T);return R[i]=E,d[i]={...d[i],...T},this}destroy(i){l(e,this.textures[i]),delete this.state[i]}}class _ extends s{constructor(){super();const{size:i=2048}=this.state;this.state.size=i;const{fbo:T,rbo:R,colorTexture:d,depthTexture:c}=te(e,r);this.fbo=T,this.rbo=R,this.colorTexture=d,this.depthTexture=c}}return{[n.DataBuffers]:()=>new a,[n.IndexBuffer]:()=>new f,[n.Uniforms]:()=>new o,[n.Textures]:()=>new u,[n.OffscreenTarget]:()=>new _}[t]()};class O{constructor(t,r={}){this.gl=y(t),this.config={...w,...r},this.gl.extensions=W(this.gl,this.config)}clear(t=[0,0,0,0]){return z(this.gl,t),this}draw(t,...r){const n=Y(r);return ne(this.gl,t,...n),this}plugin(t){return new se(this,t)}resource(t,r={}){return oe(this.gl,t,r)}define({name:t,onBefore:r,onAfter:n}){this[t]=(s,a=()=>{})=>(r&&r(this.gl,s),a(s),n&&n(this.gl,s),this)}}class ie{constructor(t){this.beam=new O(t)}render(){this.beam.clear()}}const ae=(e,t)=>{const{state:r,colorTexture:n,fbo:s,rbo:a}=t,{size:f}=r;e.viewport(0,0,f,f),e.bindFramebuffer(e.FRAMEBUFFER,s),e.bindRenderbuffer(e.RENDERBUFFER,a),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT16,f,f),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT)},fe=(e,t)=>{const{state:r,fbo:n}=t,{size:s}=r;e.viewport(0,0,s,s),e.bindFramebuffer(e.FRAMEBUFFER,n),e.clear(e.DEPTH_BUFFER_BIT)},Ee={name:"offscreen2D",onBefore(e,t){const{depth:r}=t.state;r?fe(e,t):ae(e,t)},onAfter(e){e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,e.canvas.clientWidth,e.canvas.clientHeight)}};exports.Beam=O;exports.BeamRenderer=ie;exports.GLTypes=m;exports.Offscreen2DCommand=Ee;exports.ResourceTypes=F;exports.SchemaTypes=p;
