const scroller = scrollama();
// token is restricted to the https://lobenichou.github.io/cuny-mbx-2019/ url.
// Replace with your own token.
const accessToken = 'pk.eyJ1IjoibG9iZW5pY2hvdSIsImEiOiJjanY1d2t3bWEwY3lmNGVxbmJscHF2em93In0.FOQFZHTiTTTkEZHliSjh9Q';

// Map style - update if you create your own.This one is public and should work with your token
const mapStyle = 'mapbox://styles/lobenichou/cjv2qx627b01b1ftlxxj9ukyi';

// If you upload the data into a new style, you will have to update the name of the layers. Make sure they match the id of your layers in Studio (or here if you use addLayer()). You will also have to re-style the data. Check the data folder for the json files for each layer. It contains the expressions used to the properties. You can copy and paste  it into Studio by clicking on "</>" or use it in Mapbox GL JS.
const circleLayer = 'income-per-station-cir';
const hexLayer = 'income-per-station-hex';
const subwayLineLayer = 'subway-lines';

// access token
mapboxgl.accessToken = accessToken;

// map config
const map = new mapboxgl.Map({
  container: 'map',
  style: mapStyle,
  center: [-73.908533, 40.752069],
  zoom: 10.5
});


// function to reset map to original position
const mapReset = () => {
  map.easeTo({
    center: [-73.908533, 40.752069],
    zoom: 10,
    pitch: 0
  });
};

// wait for map to finish load before adding interactions
map.on('load', () => {
  // Create a popup, but don't add it to the map yet.
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  // A map event -- on mouseenter
  map.on('mouseenter', circleLayer, (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';
    console.log(e)
    // const coordinates = e.features[0].geometry.coordinates.slice();
    // const description = d3.format("($,.2f")(e.features[0].properties.incomeMed);
    const description = e.features[0].properties.incomeMed;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(e.lngLat)
      .setHTML(description)
      .addTo(map);
  });

  map.on('mouseleave', circleLayer, () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  map.on('mouseenter', hexLayer, (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = d3.format("($,.2f")(e.features[0].properties.incomeMed);

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(e.lngLat)
      .setHTML(description)
      .addTo(map);
  });

  map.on('mouseleave', hexLayer, () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  // list of layer ids - used to create our buttons and toggle visiblity
  const toggleableLayerIds = [hexLayer, circleLayer, subwayLineLayer];

  toggleableLayerIds.forEach((toggleableLayerId) => {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = toggleableLayerId;
    link.id = toggleableLayerId;
    link.className = map.getLayoutProperty(toggleableLayerId, 'visibility') === 'visible' ? 'active': '';

    link.onclick = function(e) {
      const clickedLayer = this.textContent;
      const visibility = map.getLayoutProperty(clickedLayer, 'visibility');
      e.preventDefault();
      e.stopPropagation();

      if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.className = '';
      } else {
        this.className = 'active';
        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
      }
    };

    const layers = document.getElementById('menu');
    layers.appendChild(link);
  });

  // scrollama object
  scroller
    .setup({
      step: '.step'
    })
    // decide what to do when our step enters the viewport
    .onStepEnter(response => {
      const currentStep = response.element.dataset.step;
      const currentDirection = response.direction;
      const directionIs = (step, direction) => {
        return currentStep === step && currentDirection === direction;
      };

      if (directionIs('b', 'down') || directionIs('b', 'up')) {
        map.flyTo({
          center: [-73.977402, 40.746748],
          zoom: 13,
          pitch: 45,
          bearing: 30
        });
      } else if (directionIs('a', 'up')) {
        mapReset();
      } else if (directionIs('c', 'down') || directionIs('c', 'up')) {
        map.flyTo({
          center: [-73.928041, 40.856540],
          zoom: 13,
          pitch: 0
        });
        map.setLayoutProperty(circleLayer, 'visibility', 'visible');
        map.setLayoutProperty(hexLayer, 'visibility', 'none');
      } else if (directionIs('d', 'down') || directionIs('d', 'up')) {
        map.easeTo({
          center: [-73.977402, 40.746748],
          zoom: 11,
          pitch: 45,
          bearing: 30
        })
        map.setLayoutProperty(circleLayer, 'visibility', 'none');
        map.setLayoutProperty(hexLayer, 'visibility', 'visible');
      } else if (directionIs('e', 'down')) {
        mapReset();
        toggleableLayerIds.forEach((toggleableLayerId) => {
          document.getElementById(toggleableLayerId).className = map.getLayoutProperty(toggleableLayerId, 'visibility') === 'visible' ? 'active': '';
        })
      }
    });
});

// setup resize event
window.addEventListener('resize', scroller.resize);
