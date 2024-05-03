# leaflet-arrowheads (v1.4.0)

[GitHub Page](https://github.com/slutske22/leaflet-arrowheads)

Leaflet-Arrowheads is a small plugin for leaflet to quickly draw arrowheads on polylines for vector visualization.

<p align="center">
  <img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/banner.PNG?raw=true" width="100%">
</p>

<h1 align="center">
<a href="https://codesandbox.io/s/leaflet-arrowheads-example-zfxxc">👀 DEMO 👀</a>
</h1>

## Installation

Leaflet-Arrowheads compatible with leaflet 1.7.1+. It has 2 dependencies: [Leaflet](https://leafletjs.com/) itself, and
[Leaflet GeometryUtil](https://github.com/makinacorpus/Leaflet.GeometryUtil).

You can use leaflet-arrowheads by including the JavaScript source file (along with Leaflet GeometryUtil). In this
project the file is `src/js/Libraries/Arrowheads.js`. A change was made to the source file on line 372, which prevents
Geoman from targeting the arrowheads for editing or rotating. There was also a `hasArrowheads()` function added to help
determine if a line has arrowheads associated with it.

You could also use npm to install it:

```
npm install leaflet-arrowheads --save
```

Then you can simply import its content into your project:

```javascript
import 'leaflet-arrowheads';
```

### Without ES6 Imports

Grab the [source file](https://github.com/slutske22/leaflet-arrowheads/blob/master/src/leaflet-arrowheads.js) and include it in your project. You can include the source file in your header, but it must come _after_ a link to [Leaflet GeometryUtil](https://github.com/makinacorpus/Leaflet.GeometryUtil), which must come _after_ a link to the leaflet source. Your main project javascript will come after this, like so:

```html
<head>
  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
  <script src=".../scripts/leaflet.geometryutil.js"></script>
  <script src=".../scripts/leaflet-arrowheads.js"></script>
  <script src=".../yourProjectScript.js" defer></script>
</head>
```

## Usage

Arrowheads can be applied to any polyline, whether unisegmental, multisegmental, continuous, or discontinuous:

```javascript
var myVector = L.polyline([coords]).arrowheads();
```

Arrowheads will be added to your polyline and will automatically be added to and removed from the map when you call add and remove methods on your polyline:

```javascript
myVector.addTo(map) or myVector.remove()
```

If you need to check if a line has arrowheads associated with it:

```javascript
myVector.hasArrowheads(); // returns a bool
```

If you need to access the arrowheads directly, you can call the `.getArrowheads()` method on your polyline.

```javascript
myVector.getArrowheads(); // returns the arrowheads polyline object
myVector.getArrowheads().remove(); // removes arrowheads from map
```

Arrowheads can also be deleted from their parent polyline entirely:

```javascript
myVector.deleteArrowheads();
```

Arrowheads can take a configuration object as its argument:

```javascript
var myVector = L.polyline([ coords ]).arrowheads({ <Options> });
```

You can also use arrowheads on a GeoJSON that contains `LineString` or `MultiLineString` features by adding it as an option:

```javascript
var myGeoJson = L.geoJSON(geoJsonData, { arrowheads: { <Options> } });
```

## Options

Arrowheads offers a variety of options for rendering and styling arrowheads. See the options table below.<br>
<br>
Arrowheads inherit all options from [L.Path](https://leafletjs.com/reference-1.6.0.html#path). Arrowheads also inherit all options from their parent polylines, except `fill`, `fillOpacity`, and `smoothFactor`. These can be changed manually when defining the arrowheads' options, but changing smoothFactor will result in improperly rendered arrows.<br>
<br>

<table>

   <tr>
      <td> <b> Option </b> </td>
      <td> <b> Type </b> </td>
      <td> <b> Default </b> </td>
      <td> <b> Description </b> </td>
   </tr>
   <tr></tr>

   <tr>
      <td> yawn </td>
      <td> Number <i color="grey"> ( Degrees ) </i> </td>
      <td> 60 </td>
      <td>  Defines the width of the opening of the arrowhead, given in degrees.  The larger the angle, the wider the arrowhead. </td>
   </tr>
   <tr></tr>

   <tr>
      <td> size </td>
      <td width="25%"> String <br>
      <i> ( Meters or Percent or Pixels ) </i> </td>
      <td> '15%' </td>
      <td> Determines the size of the arrowhead.  Accepts three types of values: <br>
         <ul>
            <li> A string value which is a number with the suffix 'm' <i>( '1.5m', '20m', '250m', etc. )</i> will render arrows whose size is that many metres. Ideal for maps with low variance in zoom levels. </li>
            <li> A string value which is a number with a percent sign <i>( '15%', '20%', '25%', etc. )</i> will render arrows whose size is that percentage of the size of the parent polyline.  If the polyline has multiple segments, 'size' will take the percent of the average size of the segments. </li>
            <li> A string value which is a number with the suffix 'px' <i>( '20px', '25px', '30px', etc. )</i> will render an arrowhead whose size stays at a constant pixel value, regardless of zoom level.  Will look strange at low zoom levels or for smaller parent vectors.  Ideal for larger parent vectors and at higher zoom levels. </li>
         </ul>
      </td>
   </tr>
   <tr></tr>

   <tr>
      <td> frequency </td>
      <td> Number | String <br>
      <i> ( Number of arrowheads | Meters, Pixels, 'allvertices', 'endonly' ) </i> </td>
      <td> 'allvertices' </td>
      <td> How many arrowheads are rendered on a polyline.  
         <ul>
            <li> 'allvertices' renders an arrowhead on each vertex. </li>
            <li> 'endonly' renders only one at the end.</li>
            <li> A number value renders that number of arrowheads evenly spaces across the polyline.  </li>
            <li>  A string value with suffix 'm' (i.e. <code>'100m'</code>) will render arrowheads spaced evenly along the polyline with roughly that many meters between each one.  </li>
            <li>A string value with suffix 'px' (i.e. <code>'30px'</code>) will render arrowheads spaced evenly with roughly that many pixels between each, regardless of zoom level.</li>
         </ul>
      </td>
   </tr>
   <tr></tr>

   <tr>
      <td> proportionalToTotal </td>
      <td> Boolean </td>
      <td> false </td>
      <td> Only relevant when <code>size</code> is given as a percent. Useful when <code>frequency</code> is set to <code>'endonly'</code>.  Will render the arrowhead(s) with a size proportional to the entire length of the multi-segmented polyline, rather than proportional to the average length of all the segments.</td>
   </tr>
   <tr></tr>

   <tr>
      <td> offsets </td>
      <td> Object <br> <code>{ <br> start?: string; <br> end?: string <br> }</code> </td>
      <td> undefined </td>
      <td> Enables the developer to have the arrowheads start or end at some offset from the start and/or end of the polyline. This option can contain one or both <code>start</code> and <code>end</code> properties.  Each must be a string defining the size of the offset in either meters or pixels (i.e. <code>'100m'</code>, <code>'15px'</code>, etc.)</td>
   </tr>
   <tr></tr>

   <tr>
      <td> perArrowheadOptions </td>
      <td> Function <br> <code>(i: number) => ArrowheadOptions</code> </td>
      <td> undefined </td>
      <td> Enables the developer to customize arrowheads on a one-by-one basis.  Must be in the form of a function of <code>i</code>, which is the index of the arrowhead as it is rendered in the loop through all arrowheads.  Must return an object that is options object, the same type of options object that is the agrument for <code>.arrowheads({ &lt;Options&gt; })</code>.  Cannnot account for <code>frequency</code> or <code>proportionalToTotal</code> from within the <code>perArrowheadOptions</code> callback.  See examples for details.</td>
   </tr>

</table><br>
<br>
There are many different ways to combine these various options.  See examles below.  Many combinations are untested, so if you encounter a problem, open and issue or a PR.

## Examples

A demo project is available for viewing at https://codesandbox.io/s/leaflet-arrowheads-example-zfxxc.
The web page alone without the code: https://zfxxc.csb.app/

There is also a small typescript example sandbox [here](https://codesandbox.io/s/leaflet-arrowheads-ts-example-kwonf).

Polylines in this demo have popups which each contain the code for that polyline. Click around, and feel free to look through the codesandbox for more detail.

<table>
   <tr>
      <td colspan="4"><b>Yawn Options</b></td>
   </tr>
   <tr></tr>
   <tr>
      <td width="35%">
         <pre>L.polyline([]).arrowheads()</pre>
         (Standard option gives 60 degree yawn)
      </td>
      <td>
         <img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/yawn-1.PNG?raw=true" width="100px">
      </td>
      <td width="35%">
         <pre>L.polyline([]).arrowheads({
  yawn: 90
})</pre>
      </td>
      <td>
         <img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/yawn-2.PNG?raw=true" width="100px">
      </td>
   </tr>
   <tr></tr>
   <tr>
      <td><pre>L.polyline([]).arrowheads({
  yawn: 40
})</pre></td>
      <td><img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/yawn-3.PNG?raw=true" width="100px"></td>
      <td><pre>.arrowheads({
  yawn: 40,
  fill: true
})</pre></td>
      <td><img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/yawn-4.PNG?raw=true" width="100px"></td>
   </tr>
</table>

<table>
   <tr>
      <td colspan="4"><b>Color and Fill Options</b></td>
   </tr>
   <tr></tr>
   <tr>
      <td width="35%">
         <pre>L.polyline([]).arrowheads()</pre><br>
         (Standard options makes arrowheads a vector with same color as parent)
      </td>
      <td>
         <img src="https://github.com/slutske22/leaflet-arrowheads/raw/master/images/color-1.PNG" width="100px">
      </td>
      <td width="35%">
         <pre>L.polyline([]).arrowheads({
  fill: true
})</pre>
      </td>
      <td>
         <img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/fill-1.PNG?raw=true" width="100px">
      </td>
   </tr>
   <tr></tr>
   <tr>
      <td><pre>L.polyline([]).arrowheads({
  color: 'black'
})</pre></td>
      <td><img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/color-2.PNG?raw=true" width="100px"></td>
      <td><pre>L.polyline([],{
  color: 'black'
})
    .arrowheads({
       fill: true
    })</pre></td>
      <td><img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/fill-2.PNG?raw=true" width="100px"></td>
   </tr>
   <tr></tr>
   <tr>
      <td><pre>L.polyline([]).arrowheads({
  color: 'black'
})</pre></td>
      <td><img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/fill-3.PNG?raw=true" width="100px"></td>
      <td><pre>L.polyline([]).arrowheads({
  fill: true,
  color: 'black'
  fillColor: 'green'
})</pre></td>
      <td><img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/color-3.PNG?raw=true" width="100px"></td>
   </tr>
</table>

<table width="2000px">
    <tr>
     <td colspan="2"><b>Size Options</b></td>
   </tr>
   <tr></tr>
   <tr>
      <td colspan="2">Setting size to a number or percent will give you a fixed size arrowhead (in meters or percent of the size of the segment, respectively), regardless of zoom size.  See the frequency examples below for a better idea.</td>
   </tr>
   <tr></tr>
   <tr>
      <td>
         <pre>L.polyline([coords]).arrowheads({size: '20px', fill: true})</pre>
      </td>
      <td>
         <img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/size-1.gif?raw=true">
      </td>
   </tr>
</table>

<table>
   <tr><td><b>Frequency Options</b></td></tr>
   <tr></tr>
   <tr><td>    
   Standard option:
      <pre><code>L.polyline([coords], { smoothFactor: 5 })
   .arrowheads({ frequency: 'allvertices' });</code></pre>
      <br>
      <img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/frequency-4.gif?raw=true" width="100%">
   </td></tr>
   <tr></tr>
   <tr><td>    
      <pre><code>L.polyline([coords])
   .arrowheads({ 
      frequency: 'endonly', 
      size: '50%' 
   });</code></pre>
      <img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/frequency-5.PNG?raw=true" width="100%">
   </td></tr>
   <tr></tr>
   <tr><td>
      20 arrowheads evenly distributed
      <pre><code>L.polyline([coords]).arrowheads({ frequency: 20 });</code></pre>
      <img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/frequency-1.PNG?raw=true">
   </td></tr>
   <tr></tr>
   <tr><td>
      Arrowheads every ~500 m evenly distributed
      <pre><code>L.polyline([coords]).arrowheads({ frequency: '500m' });</code></pre>
      <img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/frequency-2.PNG?raw=true">
   </td></tr>
   <tr></tr>
   <tr><td>    
   Arrowheads every 50px regardless of zoom
      <pre><code>L.polyline([coords])
   .arrowheads({ 
      frequency: '50px', 
      size: '12px'
   });</code></pre>
      <img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/frequency-3.gif?raw=true" width="100%">
   </td></tr>
</table>

<table>
   <tr><td><b>Offset Options</b></td></tr>
   <tr></tr>
   <tr><td>    
      <pre><code>L.polyline([coords])
   .arrowheads({ 
      frequency: 'endonly',
      size: '30px',
      offsets: { end: '15px' }
   });</code></pre>
      <img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/offset-end-1.png?raw=true" width="100%">
   </td></tr>
   <tr></tr>
   <tr><td>    
      <pre><code>L.polyline([coords])
   .arrowheads({ frequency: 20,
      size: '300m',
      offsets: { end: '15px' }
   });</code></pre>
      <img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/offset-end-2.png?raw=true" width="100%">
   </td></tr>
   <tr></tr>
   <tr><td>    
      <pre><code>L.polyline([coords1, coords2])
   .arrowheads({ frequency: '1000m',
      size: '300m',
      offsets: { 
         start: '5000m', 
         end: '15px' 
      }
   });</code></pre>
      <img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/offset-both-1.png?raw=true" width="100%">
   </td></tr>
</table>

<table>
   <tr><td><b>Per-Arrowhead Options</b></td></tr>
   <tr></tr>

   <tr><td>    
      <pre><code class="highlight highlight-source-js">L.polyline([coords], { color: 'black', weight: '2' })
   .arrowheads({
      frequency: '500m',
      color: 'darkblue',
      perArrowheadOptions: (i) => ({
         size: i % 3 === 0 ? '30%' : '15%',
         color: i % 2 === 0 ? 'red' : undefined,
         fill: (i + 1) % 4 === 0,
         yawn: (i + 1) % 4 === 0 ? 35 : undefined,
      }),
   });</code></pre>
      <img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/perHatOptions-1.png?raw=true" width="100%">
   </td></tr>
   <tr></tr>

   <tr></tr>
   <tr><td>    
      <pre><code class="highlight highlight-source-js">L.polyline([coords])
   .arrowheads({ 
      size: '20px',
      fill: true,
      yawn: 30,
      frequency: 20,
      perArrowheadOptions: (i) => ({
         color: `rgba(150, 20, ${0 + 20 * i}, 1)`,
      }),
   });</code></pre>
      <img src="https://github.com/slutske22/leaflet-arrowheads/blob/master/images/perHatOptions-2.png?raw=true" width="100%">
   </td></tr>
</table>

## Alternatives

After writing this plugin I discovered [Leaflet.PolylineDecorator](https://github.com/bbecquet/Leaflet.PolylineDecorator). This offers some great methods to decorate your lines, potentially with arrowheads.

## Limitations

Arrowheads sometimes look like they're in slightly the wrong orientation in areas of high curvature. This is because of the way leaflet-arrowheads chooses and interpolates the points that it uses to calculate bearings. This may be able to be improved. Feel free to contribute / open a PR.
